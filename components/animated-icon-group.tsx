"use client"

import React from "react"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedIconGroupProps {
  children: ReactNode
}

export default function AnimatedIconGroup({ children }: AnimatedIconGroupProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  }

  // Convert children to array to map over them
  const childrenArray = React.Children.toArray(children)

  return (
    <motion.div className="flex items-center justify-center gap-4 mb-6" variants={containerVariants}>
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={iconVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

