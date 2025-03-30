"use client"

import { useRef, useEffect, useCallback } from "react"

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const lastCall = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastArgs = useRef<Parameters<T> | null>(null)

  // 클린업 함수
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // 쓰로틀링된 콜백 함수
  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      const timeSinceLastCall = now - lastCall.current

      // 마지막 호출 시간 저장
      lastArgs.current = args

      // 딜레이보다 적게 지났으면 타임아웃 설정
      if (timeSinceLastCall < delay) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
          lastCall.current = Date.now()
          if (lastArgs.current) {
            callback(...lastArgs.current)
          }
          timeoutRef.current = null
        }, delay - timeSinceLastCall)

        return
      }

      // 딜레이보다 많이 지났으면 바로 실행
      lastCall.current = now
      callback(...args)
    },
    [callback, delay],
  )

  return throttledCallback
}

