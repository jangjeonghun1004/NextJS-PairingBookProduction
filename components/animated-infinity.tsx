"use client"

import { type CSSProperties, useEffect, useState } from "react"

interface AnimatedInfinityProps {
  className?: string
  style?: CSSProperties
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl"
  color?: string
  drawingAnimation?: boolean
  drawingDuration?: number
  onDrawingComplete?: () => void
}

export default function AnimatedInfinity({
  className = "",
  style,
  size = "xl",
  color = "#db2777",
  drawingAnimation = false,
  drawingDuration = 2,
  onDrawingComplete,
}: AnimatedInfinityProps) {
  const [isAnimating, setIsAnimating] = useState(drawingAnimation)

  useEffect(() => {
    if (drawingAnimation) {
      setIsAnimating(true)
    }
  }, [drawingAnimation])

  const handleAnimationEnd = () => {
    setIsAnimating(false)
    if (onDrawingComplete) {
      onDrawingComplete()
    }
  }

  const sizeClasses = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
    "8xl": "text-8xl",
  }

  return (
    <span
      className={`font-bold ${sizeClasses[size]} ${className}`}
      style={{
        ...style,
        ...(isAnimating
          ? {
              WebkitTextStroke: "1px currentColor",
              color: "transparent",
              animation: `drawInfinityText ${drawingDuration}s forwards`,
            }
          : {
              color: color,
            }),
      }}
      onAnimationEnd={handleAnimationEnd}
    >
      ∞
      {isAnimating && (
        <style jsx>{`
          @keyframes drawInfinityText {
            0% {
              color: transparent;
              text-shadow: none;
            }
            90% {
              color: transparent;
              text-shadow: 0 0 5px ${color}40;
            }
            100% {
              color: ${color};
              text-shadow: 0 0 2px ${color}20;
            }
          }
        `}</style>
      )}
    </span>
  )
}

