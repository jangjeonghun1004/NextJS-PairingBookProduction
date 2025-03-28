"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"

export type ToastType = "success" | "error" | "info"

interface ToastNotificationProps {
  message: string
  type?: ToastType
  duration?: number
  onClose?: () => void
  isVisible: boolean
}

export default function ToastNotification({
  message,
  type = "success",
  duration = 3000,
  onClose,
  isVisible,
}: ToastNotificationProps) {
  const [visible, setVisible] = useState(isVisible)

  useEffect(() => {
    setVisible(isVisible)

    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false)
        if (onClose) onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500" size={20} />
      case "error":
        return <AlertCircle className="text-red-500" size={20} />
      case "info":
        return <Info className="text-blue-500" size={20} />
      default:
        return <CheckCircle className="text-green-500" size={20} />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "error":
        return "bg-red-50 border-red-200"
      case "info":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-green-50 border-green-200"
    }
  }

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-green-800"
      case "error":
        return "text-red-800"
      case "info":
        return "text-blue-800"
      default:
        return "text-green-800"
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 max-w-sm w-full mx-auto z-50 ${getBgColor()} rounded-lg shadow-lg border p-4`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">{getIcon()}</div>
            <div className={`flex-1 ${getTextColor()}`}>
              <p className="font-medium">{message}</p>
            </div>
            <button
              onClick={() => {
                setVisible(false)
                if (onClose) onClose()
              }}
              className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

