"use client"

import { useEffect, useRef } from "react"

interface AnimatedBackgroundProps {
  particleCount?: number
  elementCount?: number
  elements?: string[]
  colorStart?: string
  colorMiddle?: string
  colorEnd?: string
}

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  speedX: number
  speedY: number
  opacity: number
  opacityChange: number
  acceleration: number
  direction: number
  spin: number
  spinSpeed: number
}

interface FloatingElement {
  x: number
  y: number
  size: number
  baseSize: number
  text: string
  color: string
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  scale: number
  scaleDirection: number
  opacity: number
  wobble: number
  wobbleSpeed: number
}

export default function AnimatedBackground({
  particleCount = 60,
  elementCount = 20,
  elements = ["♥", "✨", "📚", "♡"],
  colorStart = "#fff0f5",
  colorMiddle = "#ffb6c1",
  colorEnd = "#ffc0cb",
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Background animation
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const floatingElements: FloatingElement[] = []

    // Update particle and element colors to match rose theme (version 16)
    // Create particles with more dynamic properties
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1, // Larger particles
        color: `rgba(244, 63, 94, ${Math.random() * 0.6 + 0.2})`, // More vibrant rose-500
        speedX: (Math.random() * 1.2 - 0.6) * (Math.random() > 0.8 ? 2 : 1), // More varied speeds
        speedY: (Math.random() * 1.2 - 0.6) * (Math.random() > 0.8 ? 2 : 1),
        opacity: Math.random() * 0.8 + 0.2,
        opacityChange: Math.random() * 0.01 * (Math.random() > 0.5 ? 1 : -1),
        acceleration: Math.random() * 0.0005 + 0.0001, // Particles can accelerate
        direction: Math.random() * Math.PI * 2, // Random direction in radians
        spin: 0, // For spinning effect
        spinSpeed: (Math.random() - 0.5) * 0.01, // Speed of spin
      })
    }

    // Create floating elements with more dynamic properties
    for (let i = 0; i < elementCount; i++) {
      const baseSize = Math.random() * 24 + 16 // Larger size range (16-40)
      floatingElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: baseSize,
        baseSize: baseSize,
        text: elements[Math.floor(Math.random() * elements.length)],
        color: `rgba(219, 39, 119, ${Math.random() * 0.6 + 0.4})`, // More vibrant rose-600
        speedX: (Math.random() * 1.5 - 0.75) * (Math.random() > 0.7 ? 2 : 1), // More varied speeds
        speedY: (Math.random() * 1.5 - 0.75) * (Math.random() > 0.7 ? 2 : 1),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5, // Faster rotation
        scale: 1,
        scaleDirection: Math.random() > 0.5 ? 0.005 : -0.005, // Pulsing effect
        opacity: Math.random() * 0.5 + 0.5,
        wobble: 0, // For wobble effect
        wobbleSpeed: Math.random() * 0.05 + 0.01, // Speed of wobble
      })
    }

    // Animation loop with more dynamic effects
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, colorStart)
      gradient.addColorStop(0.5, colorMiddle)
      gradient.addColorStop(1, colorEnd)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw particles with enhanced effects
      particles.forEach((particle) => {
        ctx.beginPath()

        // Update glow effect color
        const glow = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius * 2)
        glow.addColorStop(0, `rgba(244, 63, 94, ${particle.opacity})`) // rose-500
        glow.addColorStop(1, "rgba(244, 63, 94, 0)")

        ctx.fillStyle = glow
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2)
        ctx.fill()

        // Draw the particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2)
        ctx.fill()

        // Draw the particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Update position with more dynamic movement
        // Apply acceleration in current direction
        particle.speedX += Math.cos(particle.direction) * particle.acceleration
        particle.speedY += Math.sin(particle.direction) * particle.acceleration

        // Apply some drag to prevent infinite acceleration
        particle.speedX *= 0.99
        particle.speedY *= 0.99

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Spin the direction
        particle.direction += particle.spinSpeed

        // Randomly change direction occasionally
        if (Math.random() > 0.99) {
          particle.direction = Math.random() * Math.PI * 2
          particle.acceleration = Math.random() * 0.0005 + 0.0001
        }

        // Update opacity for twinkling effect
        particle.opacity += particle.opacityChange
        if (particle.opacity > 0.9 || particle.opacity < 0.2) {
          particle.opacityChange = -particle.opacityChange
        }

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })

      // Draw floating elements with enhanced effects
      floatingElements.forEach((element) => {
        ctx.save()

        // Apply wobble effect
        element.wobble += element.wobbleSpeed
        const wobbleX = Math.sin(element.wobble) * 3
        const wobbleY = Math.cos(element.wobble) * 2

        ctx.translate(element.x + wobbleX, element.y + wobbleY)
        ctx.rotate((element.rotation * Math.PI) / 180)
        ctx.scale(element.scale, element.scale)

        // Add shadow/glow effect
        ctx.shadowColor = element.color
        ctx.shadowBlur = 15

        ctx.font = `${element.size}px Arial`
        ctx.fillStyle = element.color
        ctx.globalAlpha = element.opacity
        ctx.fillText(element.text, 0, 0)
        ctx.globalAlpha = 1
        ctx.shadowBlur = 0
        ctx.restore()

        // Update position with more dynamic movement
        element.x += element.speedX
        element.y += element.speedY
        element.rotation += element.rotationSpeed

        // Pulsing size effect
        element.scale += element.scaleDirection
        if (element.scale > 1.2 || element.scale < 0.8) {
          element.scaleDirection = -element.scaleDirection
        }

        // Occasionally change direction for more dynamic movement
        if (Math.random() > 0.995) {
          element.speedX = (Math.random() * 1.5 - 0.75) * (Math.random() > 0.7 ? 2 : 1)
          element.speedY = (Math.random() * 1.5 - 0.75) * (Math.random() > 0.7 ? 2 : 1)
          element.rotationSpeed = (Math.random() - 0.5) * 1.5
          element.wobbleSpeed = Math.random() * 0.05 + 0.01
        }

        // Wrap around screen
        if (element.x < -50) element.x = canvas.width + 50
        if (element.x > canvas.width + 50) element.x = -50
        if (element.y < -50) element.y = canvas.height + 50
        if (element.y > canvas.height + 50) element.y = -50
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
  }, [particleCount, elementCount, elements, colorStart, colorMiddle, colorEnd])

  return (
    <>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }} />
    </>
  )
}

