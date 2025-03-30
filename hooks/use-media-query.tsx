"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // 서버 사이드에서는 window가 없으므로 체크
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)

      // 초기값 설정
      setMatches(media.matches)

      // 변경 감지 함수
      const listener = (e: MediaQueryListEvent) => {
        setMatches(e.matches)
      }

      // 이벤트 리스너 등록
      media.addEventListener("change", listener)

      // 클린업 함수
      return () => {
        media.removeEventListener("change", listener)
      }
    }
  }, [query])

  return matches
}

