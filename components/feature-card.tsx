"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  direction?: "left" | "right"
}

export default function FeatureCard({ icon, title, description, direction = "left" }: FeatureCardProps) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -70 : 70,
      y: 20,
      rotate: direction === "left" ? -5 : 5,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
      },
    },
  }

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
    <motion.div
      className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }}
    >
      <motion.div className="flex justify-center mb-4" variants={iconVariants} whileHover="hover">
        {icon}
      </motion.div>
      <motion.h3 className="text-xl font-semibold mb-2 text-violet-600 text-center" variants={textVariants}>
        {title}
      </motion.h3>
      <motion.p className="text-violet-800/90 text-center" variants={textVariants}>
        {description}
      </motion.p>
    </motion.div>
  )
}

