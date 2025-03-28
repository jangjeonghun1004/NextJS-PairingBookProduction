"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedBackground from "./animated-background"
import CustomLogo from "./icons/custom-logo"
import { useTheme } from "./theme-provider"
import LoggedInHero from "./logged-in-hero"

export default function HeroSection() {
  const [animationStage, setAnimationStage] = useState(0)
  const [visible, setVisible] = useState(false)
  const { logoColor, logoStrokeColor } = useTheme()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Handle drawing animation completion
  const handleDrawingComplete = useCallback(() => {
    // 즉시 다음 애니메이션 단계로 넘어감 (setTimeout 제거)
    setAnimationStage(2) // Transform to full text
  }, [])

  useEffect(() => {
    setVisible(true)

    // 데모 목적으로 로그인 상태 시뮬레이션
    // 실제 구현에서는 세션/쿠키/토큰 등으로 확인
    const simulateLogin = () => {
      // 로그인 상태를 false로 설정
      setIsLoggedIn(false)
    }

    simulateLogin()

    // Start the animation sequence
    const timer1 = setTimeout(() => {
      setAnimationStage(1) // Show logo with drawing animation
    }, 500)

    return () => {
      clearTimeout(timer1)
    }
  }, [])

  // 로그인 상태일 경우 LoggedInHero 컴포넌트 렌더링
  if (isLoggedIn) {
    return <LoggedInHero />
  }

  // More dynamic animation variants
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const titleCharVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 }, // scale 대신 y 값 사용
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
        delay: 1.2,
      },
    },
  }

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Animated background only in hero section */}
      <AnimatedBackground particleCount={60} elementCount={20} elements={["♥", "✨", "∞", "♡"]} />

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/70 pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full px-4 mt-16">
        <div className="text-center space-y-8">
          <div className="h-24 md:h-32 flex items-center justify-center relative">
            <AnimatePresence>
              {/* Stage 1: Drawing animation of logo */}
              {animationStage >= 1 && animationStage < 2 && (
                <motion.div
                  key="logo-drawing"
                  className="absolute"
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 1.5,
                    x: -100,
                    filter: "blur(10px)",
                    transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <CustomLogo
                    width={140} // 크기를 100에서 140으로 증가
                    height={140} // 크기를 100에서 140으로 증가
                    primaryColor="#ff69b4" // 고정 색상 적용
                    strokeColor="rgb(223, 29, 71)" // 고정 색상 적용
                    strokeWidth={3}
                    drawingAnimation={true}
                    drawingDuration={0.8}
                    onDrawingComplete={handleDrawingComplete}
                  />
                </motion.div>
              )}

              {/* Stage 2: Full text transformation */}
              {animationStage >= 2 && (
                <motion.div
                  key="fullTitle"
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.h1
                    className="text-5xl md:text-7xl font-bold text-rose-600 tracking-tight drop-shadow-md flex items-center justify-center gap-2"
                    variants={titleContainerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Animate each character separately */}
                    {"페어링".split("").map((char, index) => (
                      <motion.span key={`char-${index}`} variants={titleCharVariants} className="inline-block">
                        {char}
                      </motion.span>
                    ))}
                    <motion.span
                      className="inline-flex items-center ml-2"
                      initial={{ scale: 1.5, opacity: 0, x: -20 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        x: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.6,
                        },
                      }}
                    >
                      {"BOOK".split("").map((char, index) => (
                        <motion.span
                          key={`book-char-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                              delay: 0.8 + index * 0.1,
                              type: "spring",
                              stiffness: 300,
                              damping: 15,
                            },
                          }}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.span>
                  </motion.h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.p
            className="text-lg md:text-xl text-rose-800 font-medium leading-relaxed drop-shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={
              animationStage >= 2
                ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: 0.9,
                    },
                  }
                : {}
            }
          >
            책속에서 시작된 운명적인 만남
          </motion.p>

          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate={animationStage >= 2 ? "visible" : "hidden"}
            className="inline-block"
          >
            <motion.button
              className="px-8 py-3 bg-rose-500 text-white rounded-full font-medium shadow-lg hover:bg-rose-600 transition-colors duration-300 transform-gpu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              시작하기
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

