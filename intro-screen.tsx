"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function IntroScreen() {
  const [visible, setVisible] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setVisible(true)

    // Background animation
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 50

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        color: `rgba(255, 182, 193, ${Math.random() * 0.5 + 0.1})`,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      })
    }

    // Create floating elements
    const floatingElements: FloatingElement[] = []
    const elementCount = 15
    const elements = ["♥", "✨", "∞", "♡"]

    for (let i = 0; i < elementCount; i++) {
      floatingElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 14 + 8,
        text: elements[Math.floor(Math.random() * elements.length)],
        color: `rgba(219, 112, 147, ${Math.random() * 0.4 + 0.1})`,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#fff0f5")
      gradient.addColorStop(0.5, "#ffb6c1")
      gradient.addColorStop(1, "#ffc0cb")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })

      // Draw floating elements
      floatingElements.forEach((element) => {
        ctx.save()
        ctx.translate(element.x, element.y)
        ctx.rotate((element.rotation * Math.PI) / 180)
        ctx.font = `${element.size}px Arial`
        ctx.fillStyle = element.color
        ctx.fillText(element.text, 0, 0)
        ctx.restore()

        // Update position and rotation
        element.x += element.speedX
        element.y += element.speedY
        element.rotation += element.rotationSpeed

        // Wrap around screen
        if (element.x < 0) element.x = canvas.width
        if (element.x > canvas.width) element.x = 0
        if (element.y < 0) element.y = canvas.height
        if (element.y > canvas.height) element.y = 0
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="h-screen w-full overflow-hidden relative">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-pink-100/70" />

      <div className="relative h-full w-full flex items-center justify-center">
        <div className="max-w-3xl w-full px-4">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-rose-600 tracking-tight drop-shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Love <span className="inline-block transform hover:scale-110 transition-transform duration-300">∞</span>{" "}
              STORY
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-rose-800 font-medium leading-relaxed drop-shadow-sm"
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              당신의 이야기 속에서 운명적인 만남이 피어납니다. 지금 그 이야기를 펼쳐보세요.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <button className="px-8 py-3 bg-rose-500 text-white rounded-full font-medium shadow-lg hover:bg-rose-600 transition-colors duration-300 transform hover:scale-105">
                시작하기
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center text-rose-500 text-sm font-medium">
        <p>© 2025 Love Story. All rights reserved.</p>
      </div>
    </div>
  )
}

// Types
interface Particle {
  x: number
  y: number
  radius: number
  color: string
  speedX: number
  speedY: number
}

interface FloatingElement {
  x: number
  y: number
  size: number
  text: string
  color: string
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
}

