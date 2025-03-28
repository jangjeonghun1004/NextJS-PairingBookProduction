"use client"

import { useEffect, useState } from "react"
import HeroSection from "./components/hero-section"
import FeaturesSection from "./components/features-section"
import TestimonialsSection from "./components/testimonials-section"
import CTASection from "./components/cta-section"
import Footer from "./components/footer"
import Navbar from "./components/navbar"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import InstagramCard from "./components/instagram-card"

export default function ScrollContent() {
  // 스크롤 위치 저장을 위한 상태
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 컴포넌트 마운트 시 저장된 스크롤 위치가 있으면 복원
  useEffect(() => {
    const savedPosition = sessionStorage.getItem("scrollPosition")
    if (savedPosition) {
      window.scrollTo(0, Number.parseInt(savedPosition))
      // 한 번 사용한 후에는 삭제
      sessionStorage.removeItem("scrollPosition")
    }

    // 데모 목적으로 로그인 상태 시뮬레이션
    // 실제 구현에서는 세션/쿠키/토큰 등으로 확인
    const simulateLogin = () => {
      // 50% 확률로 로그인 상태 설정 (데모용)
      setIsLoggedIn(true)
    }

    simulateLogin()
  }, [])

  // 스크롤 위치 저장 함수
  const saveScrollPosition = () => {
    setScrollPosition(window.scrollY)
    sessionStorage.setItem("scrollPosition", window.scrollY.toString())
  }

  // 샘플 인스타그램 카드 데이터
  const instagramPosts = [
    {
      id: 1,
      username: "bookworm_jane",
      userAvatar: "/placeholder.svg?height=100&width=100",
      imageUrl: "/placeholder.svg?height=600&width=600",
      caption: "오늘의 추천 도서 📚 이 책은 정말 감동적이에요! #페어링북 #독서 #책스타그램",
      likes: 243,
      timestamp: "2 hours ago",
      location: "서울 강남",
      category: "reviews",
    },
    {
      id: 2,
      username: "literature_park",
      userAvatar: "/placeholder.svg?height=100&width=100",
      imageUrl: "/placeholder.svg?height=600&width=600",
      caption: "커피와 함께하는 아침 독서 시간 ☕📖 #아침독서 #페어링북 #북스타그램",
      likes: 187,
      timestamp: "5 hours ago",
      category: "morning",
    },
    {
      id: 3,
      username: "book_collector",
      userAvatar: "/placeholder.svg?height=100&width=100",
      imageUrl: "/placeholder.svg?height=600&width=600",
      caption: "오늘 페어링북에서 추천받은 책들 💕 취향저격! #페어링북 #책추천 #독서모임",
      likes: 342,
      timestamp: "1 day ago",
      location: "페어링북 카페",
      category: "recommendations",
    },
    {
      id: 4,
      username: "reading_club",
      userAvatar: "/placeholder.svg?height=100&width=100",
      imageUrl: "/placeholder.svg?height=600&width=600",
      caption: "이번 주 독서모임에서 토론한 책입니다. 다양한 의견이 오갔어요! #독서모임 #페어링북 #토론",
      likes: 156,
      timestamp: "3 days ago",
      location: "페어링북 독서모임",
      category: "discussions",
    },
    {
      id: 5,
      username: "daily_reader",
      userAvatar: "/placeholder.svg?height=100&width=100",
      imageUrl: "/placeholder.svg?height=600&width=600",
      caption: "오늘의 독서 일기 📝 이 책을 읽으며 많은 생각을 하게 됐어요 #독서일기 #페어링북 #서평",
      likes: 278,
      timestamp: "4 days ago",
      category: "diaries",
    },
    {
      id: 6,
      username: "book_store",
      userAvatar: "/placeholder.svg?height=100&width=100",
      imageUrl: "/placeholder.svg?height=600&width=600",
      caption: "이번 주 신간 도서가 입고되었습니다! #신간도서 #페어링북 #책스타그램",
      likes: 421,
      timestamp: "1 week ago",
      location: "페어링북 서점",
      category: "books",
    },
  ]

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Transparent navbar */}
      <Navbar />

      {/* Hero section with animated background */}
      <HeroSection />

      {/* Content sections with solid backgrounds */}
      <div className="bg-gradient-to-b from-white to-rose-50">
        {/* Instagram Cards Section (대체) */}
        <div className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-rose-600 mb-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              독자들의 이야기
            </motion.h2>

            <motion.p
              className="text-lg text-rose-800 text-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              페어링 BOOK 독자들의 다양한 이야기를 만나보세요
            </motion.p>

            {/* InstagramCard를 Link로 감싸는 대신 직접 클릭 이벤트 처리 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {instagramPosts.map((post, index) => (
                <div key={post.id}>
                  <InstagramCard
                    id={post.id}
                    username={post.username}
                    userAvatar={post.userAvatar}
                    imageUrl={post.imageUrl}
                    caption={post.caption}
                    likes={post.likes}
                    timestamp={post.timestamp}
                    location={post.location}
                    index={index}
                    viewMode="grid"
                    category={post.category}
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/stories" onClick={saveScrollPosition}>
                <motion.button
                  className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-full font-medium shadow-md hover:bg-rose-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>더 많은 이야기 보기</span>
                  <ArrowRight size={16} />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        <FeaturesSection />

        {/* Stories Preview Section */}
        <div className="py-16 bg-white/80">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h2
              className="text-2xl font-bold text-rose-600 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              나만의 이야기 시작하기
            </motion.h2>

            <motion.p
              className="text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              지금 바로 페어링 BOOK에서 당신만의 특별한 이야기를 시작해보세요
            </motion.p>

            <Link href="/signup">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-full font-medium shadow-md hover:bg-rose-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>회원가입 하기</span>
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>
        </div>

        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  )
}

