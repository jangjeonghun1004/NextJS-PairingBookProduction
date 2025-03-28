"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function AnimatedButton({ children, className = "", onClick }: AnimatedButtonProps) {
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3,
      },
    },
  }

  return (
    <motion.button
      className={`px-10 py-4 bg-rose-500 text-white rounded-full font-medium text-lg shadow-lg hover:bg-rose-600 transition-colors duration-300 ${className}`}
      variants={buttonVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

