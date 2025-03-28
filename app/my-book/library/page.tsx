"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Book, Grid, List, Search, SortAsc, Trash2, X } from "lucide-react"
import Navbar from "@/components/navbar"
import ToastNotification from "@/components/toast-notification"

// 샘플 책 데이터
const SAMPLE_BOOKS = [
  {
    id: "1",
    title: "페어링 북",
    author: "김페어",
    coverColor: "bg-blue-500",
    textColor: "text-white",
    createdAt: "2023년 12월 15일",
    chapterCount: 5,
  },
  {
    id: "2",
    title: "나의 이야기",
    author: "이야기",
    coverColor: "bg-pink-500",
    textColor: "text-white",
    createdAt: "2023년 12월 10일",
    chapterCount: 5,
  },
  {
    id: "3",
    title: "내 마음의 책",
    author: "박마음",
    coverColor: "bg-purple-500",
    textColor: "text-white",
    createdAt: "2023년 12월 5일",
    chapterCount: 5,
  },
  {
    id: "4",
    title: "나를 찾아서",
    author: "최찾기",
    coverColor: "bg-green-500",
    textColor: "text-white",
    createdAt: "2023년 11월 30일",
    chapterCount: 5,
  },
]

export default function BookLibraryPage() {
  const router = useRouter()

  const [books, setBooks] = useState(SAMPLE_BOOKS)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "title">("newest")

  // 검색 처리
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // 정렬 처리
  const handleSort = (order: "newest" | "oldest" | "title") => {
    setSortOrder(order)
  }

  // 책 삭제
  const handleDeleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id))
    setToastMessage("책이 삭제되었습니다.")
    setToastType("success")
    setShowToast(true)
  }

  // 필터링된 책 목록
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // 정렬된 책 목록
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortOrder === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else {
      return a.title.localeCompare(b.title)
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-24 px-4 pb-16">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/my-book">
            <button className="flex items-center gap-2 text-rose-600 font-medium">
              <ArrowLeft size={18} />
              <span>돌아가기</span>
            </button>
          </Link>
        </div>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">내 책장</h1>
          <p className="text-gray-600">내가 만든 책들을 모아볼 수 있는 공간입니다.</p>
        </motion.div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="책 제목 또는 저자 검색"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X size={18} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <SortAsc size={18} />
                  <span>{sortOrder === "newest" ? "최신순" : sortOrder === "oldest" ? "오래된순" : "제목순"}</span>
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10 p-2 hidden group-hover:block">
                  <button
                    onClick={() => handleSort("newest")}
                    className={`block w-full text-left px-3 py-2 rounded text-sm ${
                      sortOrder === "newest" ? "bg-rose-50 text-rose-600" : "hover:bg-gray-100"
                    }`}
                  >
                    최신순
                  </button>
                  <button
                    onClick={() => handleSort("oldest")}
                    className={`block w-full text-left px-3 py-2 rounded text-sm ${
                      sortOrder === "oldest" ? "bg-rose-50 text-rose-600" : "hover:bg-gray-100"
                    }`}
                  >
                    오래된순
                  </button>
                  <button
                    onClick={() => handleSort("title")}
                    className={`block w-full text-left px-3 py-2 rounded text-sm ${
                      sortOrder === "title" ? "bg-rose-50 text-rose-600" : "hover:bg-gray-100"
                    }`}
                  >
                    제목순
                  </button>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-1 inline-flex">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-500"}`}
                  aria-label="Grid view"
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow-sm" : "text-gray-500"}`}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Books List */}
        {sortedBooks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Book size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">책이 없습니다</h3>
            <p className="text-gray-500 mb-4">{searchQuery ? "검색 결과가 없습니다." : "아직 만든 책이 없습니다."}</p>
            <button
              onClick={() => router.push("/my-book/create")}
              className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
            >
              새 책 만들기
            </button>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
            {sortedBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                  viewMode === "list" ? "flex items-center" : ""
                }`}
              >
                {viewMode === "grid" ? (
                  <div className="p-4">
                    <div className="flex justify-center mb-4">
                      <div
                        className={`w-32 h-44 ${book.coverColor} rounded-md shadow-md relative flex flex-col items-center justify-center p-3 cursor-pointer`}
                        onClick={() => router.push(`/my-book/view/${book.id}`)}
                      >
                        <div className={`text-[8px] ${book.textColor} opacity-70 mb-12`}>페어링북</div>
                        <div className={`text-sm font-bold ${book.textColor} mb-1 text-center`}>{book.title}</div>
                        <div className={`text-[8px] ${book.textColor} opacity-70`}>{book.author}</div>
                        <div className="w-16 h-16 bg-white rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                          <Book size={24} className="text-gray-300" />
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-gray-800 mb-1">{book.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">저자: {book.author}</p>
                      <p className="text-xs text-gray-500 mb-3">{book.createdAt}</p>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => router.push(`/my-book/view/${book.id}`)}
                          className="px-3 py-1.5 bg-rose-500 text-white text-sm rounded-lg hover:bg-rose-600 transition-colors"
                        >
                          읽기
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book.id)}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full p-4">
                    <div
                      className={`w-16 h-24 ${book.coverColor} rounded-md shadow-md relative flex-shrink-0 flex flex-col items-center justify-center p-2 cursor-pointer`}
                      onClick={() => router.push(`/my-book/view/${book.id}`)}
                    >
                      <div className={`text-[6px] ${book.textColor} opacity-70 mb-6`}>페어링북</div>
                      <div className={`text-[8px] font-bold ${book.textColor} mb-0.5 text-center`}>{book.title}</div>
                      <div className={`text-[6px] ${book.textColor} opacity-70`}>{book.author}</div>
                      <div className="w-8 h-8 bg-white rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <Book size={12} className="text-gray-300" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">{book.title}</h3>
                          <p className="text-sm text-gray-600">저자: {book.author}</p>
                          <p className="text-xs text-gray-500">
                            {book.createdAt} • {book.chapterCount}개 챕터
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/my-book/view/${book.id}`)}
                            className="px-3 py-1.5 bg-rose-500 text-white text-sm rounded-lg hover:bg-rose-600 transition-colors"
                          >
                            읽기
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book.id)}
                            className="p-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Create New Book Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/my-book/create")}
            className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors inline-flex items-center gap-2"
          >
            <Book size={18} />
            <span>새 책 만들기</span>
          </button>
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

