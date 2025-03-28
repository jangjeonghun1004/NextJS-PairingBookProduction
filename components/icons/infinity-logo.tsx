"use client"

import type { CSSProperties } from "react"

interface InfinityLogoProps {
  color?: string
  secondaryColor?: string
  width?: number | string
  height?: number | string
  className?: string
  style?: CSSProperties
  strokeWidth?: number
  animated?: boolean
  drawingAnimation?: boolean
  drawingDuration?: number
  onDrawingComplete?: () => void
}

export default function InfinityLogo({
  color = "currentColor",
  secondaryColor,
  width = 40,
  height = 24,
  className = "",
  style,
  strokeWidth = 2.5,
  animated = false,
  drawingAnimation = false,
  drawingDuration = 2,
  onDrawingComplete,
}: InfinityLogoProps) {
  // Use the provided secondaryColor or default to the main color
  const secondColor = secondaryColor || color

  // Calculate path length for drawing animation
  // The infinity path is approximately 240 units long
  const pathLength = 240

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={secondColor || color} />
        </linearGradient>
      </defs>

      {drawingAnimation ? (
        // Drawing animation version
        <>
          <path
            d="M24 24C24 32.8366 16.8366 40 8 40C3.58172 40 0 36.4183 0 32C0 27.5817 3.58172 24 8 24C12.4183 24 16 27.5817 16 32C16 36.4183 19.5817 40 24 40C32.8366 40 40 32.8366 40 24C40 15.1634 47.1634 8 56 8C60.4183 8 64 11.5817 64 16C64 20.4183 60.4183 24 56 24C51.5817 24 48 20.4183 48 16C48 11.5817 44.4183 8 40 8C31.1634 8 24 15.1634 24 24Z"
            stroke="url(#infinityGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength}
            style={{
              animation: `drawInfinity ${drawingDuration}s ease-in-out forwards`,
            }}
            onAnimationEnd={onDrawingComplete}
          />
          <style jsx>{`
            @keyframes drawInfinity {
              0% {
                stroke-dashoffset: ${pathLength};
              }
              100% {
                stroke-dashoffset: 0;
              }
            }
          `}</style>
        </>
      ) : animated ? (
        // Regular animated version with flowing effect
        <>
          <path
            d="M24 24C24 32.8366 16.8366 40 8 40C3.58172 40 0 36.4183 0 32C0 27.5817 3.58172 24 8 24C12.4183 24 16 27.5817 16 32C16 36.4183 19.5817 40 24 40C32.8366 40 40 32.8366 40 24C40 15.1634 47.1634 8 56 8C60.4183 8 64 11.5817 64 16C64 20.4183 60.4183 24 56 24C51.5817 24 48 20.4183 48 16C48 11.5817 44.4183 8 40 8C31.1634 8 24 15.1634 24 24Z"
            stroke="url(#infinityGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="240"
            strokeDashoffset="0"
            style={{
              animation: "dash 2s linear infinite",
            }}
          />
          <style jsx>{`
            @keyframes dash {
              from {
                stroke-dashoffset: 240;
              }
              to {
                stroke-dashoffset: 0;
              }
            }
          `}</style>
        </>
      ) : (
        // Static version
        <path
          d="M24 24C24 32.8366 16.8366 40 8 40C3.58172 40 0 36.4183 0 32C0 27.5817 3.58172 24 8 24C12.4183 24 16 27.5817 16 32C16 36.4183 19.5817 40 24 40C32.8366 40 40 32.8366 40 24C40 15.1634 47.1634 8 56 8C60.4183 8 64 11.5817 64 16C64 20.4183 60.4183 24 56 24C51.5817 24 48 20.4183 48 16C48 11.5817 44.4183 8 40 8C31.1634 8 24 15.1634 24 24Z"
          stroke="url(#infinityGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

