"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { motion } from "framer-motion"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  variant?: "default" | "fromLeft" | "fromRight" | "fromBottom" | "scale"
}

export default function ScrollReveal({ children, delay = 0, className = "", variant = "default" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element enters the viewport
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once it's visible, we don't need to observe it anymore
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      {
        // Element is considered "visible" when it's 10% in view
        threshold: 0.1,
        // Start observing a bit before the element enters the viewport
        rootMargin: "0px 0px -10% 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  // Different animation variants
  const variants = {
    default: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    fromLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    fromRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    fromBottom: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  }

  const selectedVariant = variants[variant]

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={selectedVariant}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1], // Custom ease curve for smoother animation
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

