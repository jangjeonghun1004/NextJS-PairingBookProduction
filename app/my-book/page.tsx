"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Book, ChevronRight, Sparkles } from "lucide-react"
import Navbar from "@/components/navbar"

export default function MyBookPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-24 px-4 pb-16">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/">
            <button className="flex items-center gap-2 text-rose-600 font-medium">
              <ArrowLeft size={18} />
              <span>홈으로 돌아가기</span>
            </button>
          </Link>
        </div>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">나만의 책 만들기</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            질문에 답변하고 당신만의 이야기를 담은 특별한 책을 만들어보세요. 당신의 생각과 감정이 담긴 책은 소중한
            기록이 됩니다.
          </p>
        </motion.div>

        {/* Book Creation Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
            onClick={() => router.push("/my-book/create")}
          >
            <div className="p-6">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <Book className="text-rose-600" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">새 책 만들기</h2>
              <p className="text-gray-600 mb-4">질문에 답변하고 당신만의 이야기를 담은 특별한 책을 만들어보세요.</p>
              <button className="flex items-center text-rose-600 font-medium">
                <span>시작하기</span>
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
            onClick={() => router.push("/my-book/library")}
          >
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="text-blue-600" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">내 책 보기</h2>
              <p className="text-gray-600 mb-4">이전에 만든 책들을 확인하고 다시 읽어보세요.</p>
              <button className="flex items-center text-blue-600 font-medium">
                <span>책장 열기</span>
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Book Preview */}
        <motion.div
          className="bg-white rounded-xl shadow-sm p-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">책 미리보기</h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-48 h-64 bg-blue-500 rounded-md shadow-md relative flex flex-col items-center justify-center p-4">
              <div className="text-xs text-white opacity-70 mb-16">페어링북</div>
              <div className="text-xl font-bold text-white mb-2">페어링 북</div>
              <div className="text-sm text-white opacity-70">홍길동</div>
              <div className="w-24 h-24 bg-white rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Book cover image"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 mb-4">
                당신만의 이야기를 담은 특별한 책을 만들어보세요. 질문에 답변하면 자동으로 책이 완성됩니다. 표지 색상과
                이미지를 선택할 수 있으며, 완성된 책은 언제든지 다시 볼 수 있습니다.
              </p>
              <button
                className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                onClick={() => router.push("/my-book/create")}
              >
                나만의 책 만들기
              </button>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="bg-white rounded-xl shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">책 만들기 특징</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-100 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">맞춤형 질문</h3>
              <p className="text-sm text-gray-600">
                자신을 발견할 수 있는 다양한 질문들에 답변하며 자신만의 이야기를 만들어갑니다.
              </p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">커스텀 디자인</h3>
              <p className="text-sm text-gray-600">
                책 표지 색상과 이미지를 선택하여 당신만의 독특한 책을 디자인할 수 있습니다.
              </p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">영구 보관</h3>
              <p className="text-sm text-gray-600">만든 책은 계정에 저장되어 언제든지 다시 읽어볼 수 있습니다.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

