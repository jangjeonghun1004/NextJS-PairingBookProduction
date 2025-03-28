"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight, Download, Heart, Share2 } from "lucide-react"
import Navbar from "@/components/navbar"
import ToastNotification from "@/components/toast-notification"

// 샘플 책 데이터
const SAMPLE_BOOK = {
  id: "1",
  title: "페어링 북",
  author: "김페어",
  coverColor: "bg-blue-500",
  textColor: "text-white",
  coverImage: null,
  createdAt: "2023년 12월 15일",
  chapters: [
    {
      id: "charm",
      title: "이성을 설레게 하는 나의 매력",
      content: `학구적인 면모가 있지만
공정적이고 활동적인 매력도 있습니다.
큰 키와 관련된 체형,
깔끔한 이미지에서 나오는 첫인상.
그리고 사랑과 응원을 평생 받고 성장했기에
몸에 배어있는 배려심, 포용력, 다정함.
저를 알아갈수록
꾸준한 설렘을 느끼게 될 겁니다.`,
    },
    {
      id: "values",
      title: "내가 중요하게 생각하는 가치",
      content:
        "정직과 신뢰를 가장 중요하게 생각합니다. 관계에서 거짓말은 용납할 수 없으며, 서로 신뢰할 수 있는 관계를 만들고 싶습니다. 또한 서로의 성장을 응원하고 지지하는 것도 중요하게 생각합니다.",
    },
    {
      id: "dream",
      title: "나의 꿈과 목표",
      content:
        "저의 꿈은 사람들의 삶을 더 나은 방향으로 변화시키는 서비스를 만드는 것입니다. 현재는 개발자로 일하고 있지만, 언젠가는 제가 만든 서비스로 많은 사람들에게 긍정적인 영향을 주고 싶습니다.",
    },
    {
      id: "hobby",
      title: "나의 취미와 관심사",
      content:
        "독서, 영화 감상, 여행을 좋아합니다. 특히 인문학 서적을 읽는 것을 좋아하며, 주말에는 종종 미술관이나 전시회를 방문합니다. 최근에는 요리에도 관심이 생겨 다양한 요리법을 배우고 있습니다.",
    },
    {
      id: "love",
      title: "사랑에 대한 나의 생각",
      content:
        "사랑은 서로를 있는 그대로 인정하고 존중하는 것이라고 생각합니다. 완벽한 사람은 없기에, 서로의 부족함을 이해하고 함께 성장해 나가는 과정이 중요하다고 생각합니다. 소통과 이해를 바탕으로 한 사랑이 가장 오래 지속될 수 있다고 믿습니다.",
    },
  ],
}

export default function ViewBookPage() {
  const router = useRouter()
  const params = useParams()
  const bookId = params?.id as string

  const [book, setBook] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success")
  const [liked, setLiked] = useState(false)

  // 책 데이터 가져오기
  useEffect(() => {
    // 실제 앱에서는 API 호출로 데이터를 가져옵니다
    const fetchBook = () => {
      setLoading(true)

      // 샘플 데이터 사용
      setTimeout(() => {
        setBook(SAMPLE_BOOK)
        setLoading(false)
      }, 500)
    }

    if (bookId) {
      fetchBook()
    }
  }, [bookId])

  // 페이지 변경
  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < (book?.chapters.length || 0)) {
      setCurrentPage(currentPage + 1)
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  // 좋아요 토글
  const handleLikeToggle = () => {
    setLiked(!liked)
    setToastMessage(liked ? "좋아요를 취소했습니다." : "책에 좋아요를 표시했습니다.")
    setToastType("success")
    setShowToast(true)
  }

  // 공유하기
  const handleShare = () => {
    // 실제 앱에서는 공유 기능 구현
    setToastMessage("공유 링크가 복사되었습니다.")
    setToastType("success")
    setShowToast(true)
  }

  // 다운로드
  const handleDownload = () => {
    // 실제 앱에서는 PDF 다운로드 기능 구현
    setToastMessage("책이 PDF로 다운로드되었습니다.")
    setToastType("success")
    setShowToast(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto pt-20 px-4 flex items-center justify-center h-[80vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto pt-20 px-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-700">책을 찾을 수 없습니다</h1>
            <button
              className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-lg"
              onClick={() => router.push("/my-book")}
            >
              돌아가기
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-24 px-4 pb-16">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/my-book">
            <button className="flex items-center gap-2 text-rose-600 font-medium">
              <ArrowLeft size={18} />
              <span>책장으로 돌아가기</span>
            </button>
          </Link>
        </div>

        {/* Book Viewer */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{book.title}</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLikeToggle}
                className={`p-2 rounded-full ${
                  liked ? "bg-rose-100 text-rose-500" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
                aria-label="좋아요"
              >
                <Heart size={20} fill={liked ? "currentColor" : "none"} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                aria-label="공유하기"
              >
                <Share2 size={20} />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                aria-label="다운로드"
              >
                <Download size={20} />
              </button>
            </div>
          </div>

          {/* Book Content */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[3/4] mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {currentPage === 0 ? (
                    // Cover
                    <div
                      className={`w-full h-full ${book.coverColor} rounded-md shadow-md relative flex flex-col items-center justify-center p-4`}
                    >
                      <div className={`text-xs ${book.textColor} opacity-70 absolute top-8`}>페어링북</div>
                      <div className={`text-2xl font-bold ${book.textColor} mb-2`}>{book.title}</div>
                      <div className={`text-sm ${book.textColor} opacity-70`}>{book.author}</div>
                      <div className="w-32 h-32 bg-white rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        {book.coverImage ? (
                          <Image
                            src={book.coverImage || "/placeholder.svg"}
                            alt="Book cover image"
                            width={100}
                            height={100}
                            className="object-cover"
                          />
                        ) : (
                          <Image
                            src="/placeholder.svg?height=100&width=100"
                            alt="Book cover image"
                            width={100}
                            height={100}
                            className="object-cover"
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    // Content pages
                    <div className="w-full h-full bg-white rounded-md shadow-md p-8 flex flex-col">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-orange-500 mb-2">CHAPTER {currentPage}</h3>
                        <p className="text-lg text-gray-800">{book.chapters[currentPage - 1]?.title}</p>
                      </div>

                      <div className="flex justify-center mb-8">
                        <div className="flex flex-wrap gap-2 justify-center">
                          <div className="text-pink-400">✧</div>
                          <div className="text-blue-400">✦</div>
                          <div className="text-orange-400">✧</div>
                          <div className="text-purple-400">✦</div>
                          <div className="text-blue-400">✧</div>
                          <div className="text-pink-400">✦</div>
                          <div className="text-orange-400">✧</div>
                        </div>
                      </div>

                      <div className="flex-1 text-center">
                        <p className="whitespace-pre-line text-gray-700">{book.chapters[currentPage - 1]?.content}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 0}
                className={`p-2 rounded-full ${
                  currentPage === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm text-gray-600">
                {currentPage} / {book.chapters.length}
              </span>
              <button
                onClick={() => handlePageChange("next")}
                disabled={currentPage === book.chapters.length}
                className={`p-2 rounded-full ${
                  currentPage === book.chapters.length
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Book Info */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
                <p className="text-sm text-gray-600">저자: {book.author}</p>
                <p className="text-sm text-gray-500">작성일: {book.createdAt}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors flex items-center gap-2"
                >
                  <Download size={16} />
                  <span>PDF 다운로드</span>
                </button>
                <button
                  onClick={handleShare}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Share2 size={16} />
                  <span>공유하기</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">목차</h2>
          <ul className="space-y-3">
            {book.chapters.map((chapter: { id: string; title: string }, index: number) => (
              <li
              key={chapter.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                currentPage === index + 1 ? "bg-rose-50 border border-rose-100" : "hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPage(index + 1)}
              >
              <div className="flex items-center gap-3">
                <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  currentPage === index + 1 ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-700"
                }`}
                >
                {index + 1}
                </div>
                <span className={`font-medium ${currentPage === index + 1 ? "text-rose-600" : "text-gray-800"}`}>
                {chapter.title}
                </span>
              </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  )
}

