"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, PenSquare, MessageCircle, Users, TrendingUp, Clock, Heart } from "lucide-react"
import AnimatedBackground from "./animated-background"

// 샘플 데이터 - 최근 활동
const RECENT_ACTIVITIES = [
  {
    id: 1,
    type: "diary",
    title: "데미안 독서 일기",
    date: "오늘",
    icon: <PenSquare size={16} className="text-rose-500" />,
    link: "/diary/1",
  },
  {
    id: 2,
    type: "discussion",
    title: "프랑켄슈타인 토론 참여",
    date: "어제",
    icon: <MessageCircle size={16} className="text-rose-500" />,
    link: "/discussion/2",
  },
  {
    id: 3,
    type: "pairing",
    title: "classic_reader님과 페어링",
    date: "3일 전",
    icon: <Users size={16} className="text-rose-500" />,
    link: "/pairing",
  },
]

// 샘플 데이터 - 추천 도서
const RECOMMENDED_BOOKS = [
  {
    id: 1,
    title: "노인과 바다",
    author: "어니스트 헤밍웨이",
    coverImage: "/placeholder.svg?height=150&width=100",
    matchScore: 95,
  },
  {
    id: 2,
    title: "1984",
    author: "조지 오웰",
    coverImage: "/placeholder.svg?height=150&width=100",
    matchScore: 92,
  },
  {
    id: 3,
    title: "위대한 개츠비",
    author: "F. 스콧 피츠제럴드",
    coverImage: "/placeholder.svg?height=150&width=100",
    matchScore: 88,
  },
]

// 샘플 데이터 - 독서 통계
const READING_STATS = {
  booksRead: 12,
  pagesRead: 3240,
  hoursRead: 86,
  currentStreak: 7,
  longestStreak: 14,
  favoriteGenre: "소설",
}

// 샘플 데이터 - 현재 읽고 있는 책
const CURRENT_BOOK = {
  title: "사피엔스",
  author: "유발 하라리",
  coverImage: "/placeholder.svg?height=200&width=130",
  progress: 65,
  pagesRead: 234,
  totalPages: 360,
}

export default function LoggedInHero() {
  const [visible, setVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "recommendations" | "stats">("overview")

  useEffect(() => {
    setVisible(true)
  }, [])

  // 애니메이션 변수
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  }

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground
        particleCount={40}
        elementCount={15}
        elements={["♥", "✨", "📚", "♡"]}
        colorStart="#fff0f5"
        colorMiddle="#ffb6c1"
        colorEnd="#ffc0cb"
      />

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/70 pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full px-4 pt-16 pb-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-rose-600 mb-2">안녕하세요, 김독서님!</h1>
          <p className="text-lg text-rose-800">오늘도 새로운 이야기를 만나보세요.</p>
        </motion.div>

        {/* Quick Action Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
        >
          <Link href="/diary/create">
            <motion.button
              className="flex flex-col items-center gap-2 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:bg-white transition-colors"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-rose-100 text-rose-600 rounded-full">
                <PenSquare size={24} />
              </div>
              <span className="font-medium">독서 일기</span>
            </motion.button>
          </Link>

          <Link href="/discussions">
            <motion.button
              className="flex flex-col items-center gap-2 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:bg-white transition-colors"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-rose-100 text-rose-600 rounded-full">
                <MessageCircle size={24} />
              </div>
              <span className="font-medium">독서 토론</span>
            </motion.button>
          </Link>

          <Link href="/stories">
            <motion.button
              className="flex flex-col items-center gap-2 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:bg-white transition-colors"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-rose-100 text-rose-600 rounded-full">
                <BookOpen size={24} />
              </div>
              <span className="font-medium">독서 이야기</span>
            </motion.button>
          </Link>

          <Link href="/pairing">
            <motion.button
              className="flex flex-col items-center gap-2 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:bg-white transition-colors"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-rose-100 text-rose-600 rounded-full">
                <Users size={24} />
              </div>
              <span className="font-medium">페어링 친구</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-1 inline-flex shadow-sm">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "overview" ? "bg-rose-500 text-white" : "text-rose-600 hover:bg-rose-100"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              개요
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "recommendations" ? "bg-rose-500 text-white" : "text-rose-600 hover:bg-rose-100"
              }`}
              onClick={() => setActiveTab("recommendations")}
            >
              추천 도서
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "stats" ? "bg-rose-500 text-white" : "text-rose-600 hover:bg-rose-100"
              }`}
              onClick={() => setActiveTab("stats")}
            >
              독서 통계
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <>
              {/* Currently Reading */}
              <motion.div
                className="md:col-span-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">현재 읽고 있는 책</h2>
                <div className="flex gap-4">
                  <div className="w-24 h-36 relative rounded-md overflow-hidden shadow-sm flex-shrink-0">
                    <Image
                      src={CURRENT_BOOK.coverImage || "/placeholder.svg"}
                      alt={CURRENT_BOOK.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{CURRENT_BOOK.title}</h3>
                    <p className="text-gray-600 mb-3">{CURRENT_BOOK.author}</p>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{CURRENT_BOOK.progress}% 완료</span>
                        <span>
                          {CURRENT_BOOK.pagesRead} / {CURRENT_BOOK.totalPages} 페이지
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-rose-500 h-2.5 rounded-full"
                          style={{ width: `${CURRENT_BOOK.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors">
                        계속 읽기
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Recent Activities */}
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">최근 활동</h2>
                <div className="space-y-4">
                  {RECENT_ACTIVITIES.map((activity) => (
                    <Link key={activity.id} href={activity.link}>
                      <div className="flex items-start gap-3 p-3 hover:bg-rose-50 rounded-lg transition-colors">
                        <div className="mt-0.5">{activity.icon}</div>
                        <div>
                          <p className="text-gray-800 font-medium">{activity.title}</p>
                          <p className="text-gray-500 text-sm">{activity.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="pt-2 text-center">
                    <Link href="/profile/me">
                      <span className="text-rose-500 text-sm font-medium hover:underline">모든 활동 보기</span>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Reading Streak */}
              <motion.div
                className="md:col-span-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">독서 스트릭</h2>
                  <div className="flex items-center gap-1 bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm">
                    <TrendingUp size={16} />
                    <span>{READING_STATS.currentStreak}일 연속</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{READING_STATS.booksRead}</div>
                    <div className="text-sm text-gray-600">읽은 책</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{READING_STATS.pagesRead}</div>
                    <div className="text-sm text-gray-600">읽은 페이지</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{READING_STATS.hoursRead}</div>
                    <div className="text-sm text-gray-600">독서 시간</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{READING_STATS.longestStreak}</div>
                    <div className="text-sm text-gray-600">최장 스트릭</div>
                  </div>
                </div>
              </motion.div>
            </>
          )}

          {/* Recommendations Tab */}
          {activeTab === "recommendations" && (
            <motion.div
              className="md:col-span-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">맞춤 도서 추천</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {RECOMMENDED_BOOKS.map((book) => (
                  <motion.div
                    key={book.id}
                    className="bg-white rounded-lg shadow-sm p-4 flex gap-4"
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="w-16 h-24 relative rounded overflow-hidden shadow-sm flex-shrink-0">
                      <Image
                        src={book.coverImage || "/placeholder.svg"}
                        alt={book.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{book.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                      <div className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full text-xs">
                        <Heart size={12} className="fill-rose-500" />
                        <span>{book.matchScore}% 매칭</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/recommendations">
                  <button className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors">
                    더 많은 추천 보기
                  </button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Stats Tab */}
          {activeTab === "stats" && (
            <motion.div
              className="md:col-span-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">독서 통계</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Clock size={18} className="text-rose-500" />
                    <span>독서 활동</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-rose-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-800">{READING_STATS.booksRead}</div>
                      <div className="text-sm text-gray-600">읽은 책</div>
                    </div>
                    <div className="text-center p-3 bg-rose-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-800">{READING_STATS.pagesRead}</div>
                      <div className="text-sm text-gray-600">읽은 페이지</div>
                    </div>
                    <div className="text-center p-3 bg-rose-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-800">{READING_STATS.hoursRead}</div>
                      <div className="text-sm text-gray-600">독서 시간</div>
                    </div>
                    <div className="text-center p-3 bg-rose-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-800">{READING_STATS.currentStreak}</div>
                      <div className="text-sm text-gray-600">현재 스트릭</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <BookOpen size={18} className="text-rose-500" />
                    <span>독서 취향</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>선호 장르</span>
                        <span>{READING_STATS.favoriteGenre}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>평균 독서 시간</span>
                        <span>1시간 12분/일</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>완독률</span>
                        <span>92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href="/profile/me/stats">
                  <button className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors">
                    상세 통계 보기
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

