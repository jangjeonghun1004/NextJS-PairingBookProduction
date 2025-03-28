"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedTextProps {
  children: ReactNode
  className?: string
}

export default function AnimatedText({ children, className = "" }: AnimatedTextProps) {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.p className={className} variants={textVariants}>
      {children}
    </motion.p>
  )
}

