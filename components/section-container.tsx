"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface SectionContainerProps {
  title: string
  children: ReactNode
  id?: string
  bgColor?: string
}

export default function SectionContainer({ title, children, id, bgColor = "bg-white" }: SectionContainerProps) {
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
    <section id={id} className={`min-h-screen w-full flex items-center justify-center py-16 ${bgColor}`}>
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
    </section>
  )
}

