"use client"

import { useEffect, useState } from "react"
import HeroSection from "./components/hero-section"
import Footer from "./components/footer"
import Navbar from "./components/navbar"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import InstagramCard from "./components/instagram-card"

export default function ScrollContent() {
  // 스크롤 위치 저장을 위한 상태
  const [scrollPosition, setScrollPosition] = useState(0)

  // 컴포넌트 마운트 시 저장된 스크롤 위치가 있으면 복원
  useEffect(() => {
    const savedPosition = sessionStorage.getItem("scrollPosition")
    if (savedPosition) {
      window.scrollTo(0, Number.parseInt(savedPosition))
      // 한 번 사용한 후에는 삭제
      sessionStorage.removeItem("scrollPosition")
    }
  }, [])

  // 스크롤 위치 저장 함수
  const saveScrollPosition = () => {
    setScrollPosition(window.scrollY)
    sessionStorage.setItem("scrollPosition", window.scrollY.toString())
  }

  // 샘플 인스타그램 카드 데이터
  const instagramPosts = [
    {
      id: 2,
      username: "제연",
      userAvatar: "/placeholder.svg?height=100&width=100",
      imageUrl: "/img/sky-blue.png",
      caption: "#하트페어링 #인스타그램",
      likes: 187,
      timestamp: "",
      location: "하늘색 책",
      category: "tv",
      linkUrl: "https://www.instagram.com/p/DHdbMgtJXOw/"
    },
    {
      id: 1,
      username: "우재",
      userAvatar: "/placeholder.svg?height=100&width=100",
      imageUrl: "/img/blue-light.png",
      caption: "#하트페어링 #인스타그램",
      likes: 243,
      timestamp: "",
      location: "푸른색 책",
      category: "tv",
      linkUrl: "https://www.instagram.com/p/DGnNs_qJ6iK/?img_index=1"
    },
    {
      id: 4,
      username: "하늘",
      userAvatar: "/placeholder.svg?height=100&width=100",
      imageUrl: "/img/white.png",
      caption: "#하트페어링 #인스타그램",
      likes: 156,
      timestamp: "",
      location: "하얀색 책",
      category: "tv",
      linkUrl: 'https://www.instagram.com/p/DGnOALFJScd/?img_index=1'
    },
    {
      id: 3,
      username: "지민",
      userAvatar: "/placeholder.svg?height=100&width=100",
      imageUrl: "/img/brown.png",
      caption: "#하트페어링 #인스타그램",
      likes: 342,
      timestamp: "",
      location: "갈색 책",
      category: "tv",
      linkUrl: 'https://www.instagram.com/p/DHdbODbpFHt/'
    },
    {
      id: 6,
      username: "지원",
      userAvatar: "/placeholder.svg?height=100&width=100",
      imageUrl: "/img/green.png",
      caption: "#하트페어링 #인스타그램",
      likes: 421,
      timestamp: "",
      location: "초록색 책",
      category: "tv",
      linkUrl: 'https://www.instagram.com/p/DGskJG5p4h5/?img_index=1'
    },
    {
      id: 7,
      username: "찬형",
      userAvatar: "/placeholder.svg?height=100&width=100",
      imageUrl: "/img/blue.png",
      caption: "#하트페어링 #인스타그램",
      likes: 421,
      timestamp: "",
      location: "파랑색 책",
      category: "tv",
      linkUrl: 'https://www.instagram.com/p/DGxDRmNJbEl/?img_index=1'
    },
    {
      id: 5,
      username: "창환",
      userAvatar: "/placeholder.svg?height=100&width=100",
      imageUrl: "/img/yellow.png",
      caption: "#하트페어링 #인스타그램",
      likes: 278,
      timestamp: "",
      location: "노랑색 책",
      category: "tv",
      linkUrl: 'https://www.instagram.com/p/DGp_A6qpEac/?img_index=1'
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
            <h2
              className="text-3xl font-bold text-rose-600 mb-8 text-center"
            >
              {/* 독자들의 이야기 */}
              하트페어링 이야기
            </h2>

            <p
              className="text-lg text-rose-800 text-center mb-12"
            >
              {/* 페어링 BOOK 독자들의 다양한 이야기를 만나보세요 */}
              채널A 새 연애 예능
            </p>

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
                    linkUrl={post.linkUrl}
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/stories" onClick={saveScrollPosition}>
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-full font-medium shadow-md hover:bg-rose-600 transition-colors"
                >
                  <span>더 많은 이야기 보기</span>
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

