"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import CustomLogo from "@/components/icons/custom-logo"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log({ email, password, rememberMe })
  }

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Back button */}
        <div className="p-6">
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 text-rose-600 font-medium"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} />
              <span>돌아가기</span>
            </motion.button>
          </Link>
        </div>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            className="w-full max-w-md space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo and title */}
            <div className="text-center">
              <motion.div
                className="flex items-center justify-center gap-2 mb-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <CustomLogo width={80} height={80} primaryColor="#db2777" strokeColor="#f43f5e" strokeWidth={2.5} />
              </motion.div>
              <motion.h1
                className="text-3xl font-bold text-rose-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                페어링 BOOK에 오신 것을 환영합니다
              </motion.h1>
              <motion.p
                className="mt-2 text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                계정에 로그인하여 당신의 이야기를 계속하세요
              </motion.p>
            </div>

            {/* Login form */}
            <motion.form
              className="mt-8 space-y-6"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    이메일
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    placeholder="이메일 주소를 입력하세요"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      비밀번호
                    </label>
                    <Link href="/forgot-password" className="text-sm text-rose-500 hover:text-rose-600">
                      비밀번호를 잊으셨나요?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                      placeholder="비밀번호를 입력하세요"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-rose-500 focus:ring-rose-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      로그인 상태 유지
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  로그인
                </motion.button>
              </div>

              {/* Social login divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">또는</span>
                </div>
              </div>

              {/* Social login buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">Google로 계속하기</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"
                      fill="#1877F2"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">Meta로 계속하기</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" fill="#03C75A" />
                    <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z" fill="#FFFFFF" />
                  </svg>
                  <span className="text-gray-700 font-medium">Naver로 계속하기</span>
                </button>
              </div>
            </motion.form>

            {/* Sign up link */}
            <motion.div
              className="text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className="text-sm text-gray-600">
                계정이 없으신가요?{" "}
                <Link href="/signup" className="font-medium text-rose-500 hover:text-rose-600">
                  회원가입
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Decorative background */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-200">
          {/* Decorative elements */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: Math.random() * 0.5 + 0.2,
                scale: Math.random() * 1.5 + 0.5,
              }}
              transition={{
                delay: i * 0.1,
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                repeatDelay: Math.random() * 5,
              }}
            >
              {i % 4 === 0 ? (
                <CustomLogo
                  width={Math.random() * 30 + 20}
                  height={Math.random() * 30 + 20}
                  primaryColor="rgba(219, 39, 119, 0.6)"
                  strokeColor="rgba(244, 63, 94, 0.6)"
                  strokeWidth={2}
                />
              ) : (
                <span className="text-rose-300" style={{ fontSize: `${Math.random() * 2 + 1}rem` }}>
                  {["♥", "✨", "♡"][i % 3]}
                </span>
              )}
            </motion.div>
          ))}

          {/* Quote */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <motion.div
              className="bg-white/30 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-md text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <p className="text-xl text-rose-800 font-medium italic">
                "책은 당신의 마음속에 심어진 씨앗이며, 그 씨앗은 언젠가 꽃을 피울 것입니다."
              </p>
              <div className="mt-4 flex justify-center items-center gap-2">
                <CustomLogo width={32} height={32} primaryColor="#db2777" strokeColor="#f43f5e" strokeWidth={2} />
                <p className="text-rose-600 font-semibold">페어링 BOOK</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

