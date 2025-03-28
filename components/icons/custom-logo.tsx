"use client"

import { type CSSProperties, useEffect, useRef } from "react"

interface CustomLogoProps {
  primaryColor?: string
  strokeColor?: string
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

export default function CustomLogo({
  primaryColor = "transparent", 
  strokeColor = "rgb(223, 29, 71)", 
  width = 180,
  height = 180,
  className = "",
  style,
  strokeWidth = 2,
  animated = false,
  drawingAnimation = false,
  drawingDuration = 2,
  onDrawingComplete,
}: CustomLogoProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!drawingAnimation || !svgRef.current) return

    // Get all path elements for animation
    const paths = svgRef.current.querySelectorAll("path, line")

    // Calculate total length of all paths
    let totalLength = 0
    const pathLengths: number[] = []

    paths.forEach((path) => {
      // Type assertion to SVGGeometryElement to access getTotalLength
      const svgPath = path as SVGGeometryElement
      const length = svgPath.getTotalLength()
      pathLengths.push(length)
      totalLength += length

      // Type assertion to HTMLElement to access style property
      const pathElement = path as HTMLElement
      pathElement.style.strokeDasharray = `${length}`
      pathElement.style.strokeDashoffset = `${length}`
      pathElement.style.animation = `drawPath ${drawingDuration}s forwards ease-in-out`
      pathElement.style.animationDelay = `${pathLengths.length * (drawingDuration / paths.length)}s`
    })

    // Handle animation completion
    const lastPath = paths[paths.length - 1] as HTMLElement
    if (lastPath) {
      lastPath.addEventListener("animationend", () => {
        if (onDrawingComplete) {
          onDrawingComplete()
        }
      })
    }

    return () => {
      if (lastPath) {
        lastPath.removeEventListener("animationend", onDrawingComplete || (() => {}))
      }
    }
  }, [drawingAnimation, drawingDuration, onDrawingComplete])

  return (
    <>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        viewBox="0 0 72 72"
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          <g id="line">
            <path
              id="svg_2"
              d="m36,32.51c4.335,-4.336 8.841,-9.096 15.73,-9.096c7.226,0 12.24,5.271 12.24,12.58c-0.05592,7.058 -5.863,12.71 -12.92,12.58c-5.006,0 -8.99,-3.178 -12.47,-6.532m-2.581,-2.564c-4.335,4.335 -8.841,9.096 -15.73,9.096c-7.141,0 -12.24,-5.271 -12.24,-12.58c0.05558,-7.058 5.863,-12.71 12.92,-12.58c5.02,0 9.012,3.194 12.49,6.558m-3.476,3.475c-2.586,-2.503 -5.447,-4.932 -9.102,-4.932c-4.129,0.0055 -7.474,3.351 -7.48,7.48c-0.2047,4.113 3.108,7.542 7.226,7.48c4.844,0.0005 8.754,-4.166 11.98,-7.48m9.401,2.521c2.594,2.513 5.462,4.959 9.129,4.959c4.129,-0.0052 7.476,-3.351 7.482,-7.48l0.0004,0c0.2047,-4.113 -3.108,-7.542 -7.226,-7.48c-4.846,0 -8.756,4.165 -11.99,7.48"
              strokeWidth={strokeWidth + 0.5}
              strokeLinecap="round"
              fill="none"
              stroke={strokeColor}
            />
            <line
              fill="none"
              id="svg_3"
              strokeWidth={strokeWidth + 0.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              y2="32.51"
              y1="36"
              x2="36"
              x1="32.6"
              stroke={strokeColor}
            />
            <line
              fill="none"
              id="svg_4"
              strokeWidth={strokeWidth + 0.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              y2="36"
              y1="39.49"
              x2="39.4"
              x1="36"
              stroke={strokeColor}
            />
          </g>
        </g>
      </svg>

      {drawingAnimation && (
        <style jsx global>{`
          @keyframes drawPath {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      )}

      {animated && !drawingAnimation && (
        <style jsx global>{`
          #svg_2, #svg_3, #svg_4 {
            animation: pulse 2s infinite alternate;
          }
          
          @keyframes pulse {
            from {
              stroke-opacity: 0.6;
              stroke-width: ${strokeWidth};
            }
            to {
              stroke-opacity: 1;
              stroke-width: ${strokeWidth * 1.5}px;
            }
          }
        `}</style>
      )}
    </>
  )
}