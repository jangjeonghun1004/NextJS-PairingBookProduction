"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import CustomLogo from "@/components/icons/custom-logo"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset logic here
    console.log({ email })
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/login">
            <motion.button
              className="flex items-center gap-2 text-rose-600 font-medium"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} />
              <span>로그인으로 돌아가기</span>
            </motion.button>
          </Link>
        </div>

        {/* Card container */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo and title */}
          <div className="text-center mb-8">
            <motion.div
              className="flex items-center justify-center gap-2 mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CustomLogo width={60} height={60} primaryColor="#db2777" strokeColor="#f43f5e" strokeWidth={2.5} />
            </motion.div>
            <motion.h1
              className="text-2xl font-bold text-rose-600 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              비밀번호 찾기
            </motion.h1>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {isSubmitted
                ? "이메일로 비밀번호 재설정 링크를 보냈습니다."
                : "가입하신 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다."}
            </motion.p>
          </div>

          {!isSubmitted ? (
            <motion.form
              className="space-y-6"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    placeholder="이메일 주소를 입력하세요"
                  />
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  비밀번호 재설정 링크 보내기
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              className="text-center space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center">
                <CheckCircle size={60} className="text-green-500" />
              </div>

              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">{email}</span>로 비밀번호 재설정 링크를 보냈습니다.
                </p>
                <p className="text-gray-600 text-sm">이메일을 확인하고 링크를 클릭하여 비밀번호를 재설정하세요.</p>
              </div>

              <div className="pt-4">
                <Link href="/login">
                  <motion.button
                    className="text-rose-600 font-medium hover:text-rose-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    로그인 페이지로 돌아가기
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Help text */}
        <motion.p
          className="text-center text-sm text-gray-600 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          이메일을 받지 못하셨나요? 스팸 폴더를 확인하시거나{" "}
          <Link href="#" className="text-rose-500 hover:text-rose-600 font-medium">
            고객센터에 문의
          </Link>
          하세요.
        </motion.p>
      </div>
    </div>
  )
}

