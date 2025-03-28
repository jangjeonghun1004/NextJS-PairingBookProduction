"use client"

import { motion } from "framer-motion"
import CustomLogo from "./icons/custom-logo"

export default function Footer() {
  return (
    <motion.div
      className="py-8 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="text-center text-violet-500 text-sm font-medium">
        <p>© 2025 페어링 BOOK. All rights reserved.</p>
        <div className="mt-2 flex justify-center">
          <CustomLogo width={40} height={40} primaryColor="#8b5cf6" strokeColor="#a78bfa" />
        </div>
      </div>
    </motion.div>
  )
}

