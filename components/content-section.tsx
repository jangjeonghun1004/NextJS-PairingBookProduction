"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import ScrollReveal from "./scroll-reveal"

interface ContentSectionProps {
  title: string
  children: ReactNode
  className?: string
  delay?: number
}

export default function ContentSection({ title, children, className = "", delay = 0 }: ContentSectionProps) {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const titleVariants = {
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
    <ScrollReveal
      delay={delay}
      variant="scale"
      className={`min-h-screen w-full flex items-center justify-center py-16 ${className}`}
    >
      <div className="max-w-3xl w-full px-4">
        <motion.div
          className="text-center space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-rose-600 tracking-tight drop-shadow-sm"
            variants={titleVariants}
          >
            {title}
          </motion.h2>

          <motion.div className="text-lg text-rose-800" variants={containerVariants}>
            {children}
          </motion.div>
        </motion.div>
      </div>
    </ScrollReveal>
  )
}

