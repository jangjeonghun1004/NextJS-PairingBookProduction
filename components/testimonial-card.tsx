"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  initials: string
  name: string
  quote: string
  rating?: number
  delay?: number
}

export default function TestimonialCard({ initials, name, quote, rating = 5, delay = 0 }: TestimonialCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay,
      },
    },
  }

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  const starsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    }),
  }

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div className="flex items-center mb-4" variants={textVariants}>
        <motion.div
          className="w-12 h-12 rounded-full bg-rose-200 flex items-center justify-center mr-4"
          variants={avatarVariants}
        >
          <span className="text-rose-600 font-bold">{initials}</span>
        </motion.div>
        <div>
          <motion.h4 className="font-semibold text-rose-700" variants={textVariants}>
            {name}
          </motion.h4>
          <motion.div className="flex" variants={starsContainerVariants}>
            {Array.from({ length: rating }).map((_, i) => (
              <motion.div key={i} variants={starVariants} custom={i}>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      <motion.p className="text-rose-800/90 italic" variants={textVariants}>
        "{quote}"
      </motion.p>
    </motion.div>
  )
}

