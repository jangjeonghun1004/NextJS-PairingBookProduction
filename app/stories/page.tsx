"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import InstagramFeed from "@/components/instagram-feed"
import { Search, X, TrendingUp, Hash, PenSquare, MessageSquare, ChevronLeft, ChevronRight, ArrowUp, Plus } from "lucide-react"
import Link from "next/link"

// Popular tags for the stories
const POPULAR_TAGS = [
  "페어링북",
  "독서",
  "책스타그램",
  "북스타그램",
  "독서모임",
  "책추천",
  "아침독서",
  "독서일기",
  "서평",
  "신간도서",
  "독서토론",
]

export default function StoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // 페이지 로드 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0)

    document.body.style.paddingTop = "64px"
    return () => {
      document.body.style.paddingTop = "0"
    }
  }, [])

  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag)
    setSearchTerm(tag)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
    setShowSuggestions(false)
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
    setSelectedTag(null)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setMobileMenuOpen(false)
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // 스크롤 함수 추가 (handleTagSelect 함수 위에 추가)
  const scrollTabsLeft = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const scrollTabsRight = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-rose-600 mb-2">독서 이야기</h1>
          <p className="text-gray-600">페어링 BOOK 독자들의 다양한 이야기를 만나보세요</p>
        </div>

        {/* Search Bar */}
        <motion.div
          className={`relative max-w-xl mx-auto mb-6 transition-all duration-300 ${isSearchFocused ? "scale-105" : "scale-100"
            }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="해시태그, 사용자 또는 내용 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => {
                setIsSearchFocused(true)
                setShowSuggestions(true)
              }}
              onBlur={() => {
                setIsSearchFocused(false)
                // Delay hiding suggestions to allow for clicks
                setTimeout(() => setShowSuggestions(false), 200)
              }}
              className={`w-full pl-10 pr-10 py-3 rounded-full border ${isSearchFocused ? "border-rose-400 shadow-md" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all`}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />

            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Clear search</span>
                <X size={18} />
              </button>
            )}
          </div>

          {/* Search Suggestions */}
          <AnimatePresence mode="wait">
            {showSuggestions && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10 overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <TrendingUp size={16} className="mr-1" />
                    인기 검색어
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_TAGS.slice(0, 6).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagSelect(tag)}
                        className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-sm hover:bg-rose-100 transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">최근 검색어</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Search size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">독서모임</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <X size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Search size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">신간도서</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Category Tabs - Scrollable */}
        <div className="mb-8 border-b border-gray-200 relative">
          <div className="flex items-center mb-2">
            {/* 좌측 스크롤 버튼 */}
            <button
              onClick={scrollTabsLeft}
              className="flex-shrink-0 p-1.5 rounded-full bg-white shadow-sm text-gray-600 hover:bg-gray-100 mr-2 border border-gray-200"
              aria-label="Scroll tabs left"
            >
              <ChevronLeft size={16} />
            </button>

            {/* 탭 컨테이너 */}
            <div
              className="flex-1 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollBehavior: "smooth" }}
              ref={tabsContainerRef}
            >
              <div className="flex space-x-4 pb-2">
                {[
                  { id: "all", name: "전체" },
                  { id: "books", name: "도서" },
                  { id: "reviews", name: "서평" },
                  { id: "clubs", name: "독서모임" },
                  { id: "recommendations", name: "추천도서" },
                  { id: "morning", name: "아침독서" },
                  { id: "diaries", name: "독서일기" },
                  { id: "discussions", name: "독서토론" },
                  { id: "new_releases", name: "신간도서" },
                  { id: "bestsellers", name: "베스트셀러" },
                  { id: "classics", name: "고전" },
                  { id: "foreign", name: "외국도서" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`whitespace-nowrap px-4 py-2 font-medium text-sm rounded-full transition-colors flex-shrink-0 ${activeTab === tab.id ? "bg-rose-100 text-rose-600" : "text-gray-600 hover:text-rose-500"
                      }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 우측 스크롤 버튼 */}
            <button
              onClick={scrollTabsRight}
              className="flex-shrink-0 p-1.5 rounded-full bg-white shadow-sm text-gray-600 hover:bg-gray-100 ml-2 border border-gray-200"
              aria-label="Scroll tabs right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>


        {/* Instagram Feed */}
        <InstagramFeed searchTerm={searchTerm} activeTab={activeTab} onMenuClick={toggleMobileMenu} />
      </div>

      <div className="fixed bottom-6 right-6">
        <Link href="/diary">
          <button
            className="flex items-center justify-center w-14 h-14 bg-rose-500 text-white rounded-full shadow-lg"
          >
            <PenSquare size={24} />
            <span className="sr-only">독서 일기</span>
          </button>
        </Link>
      </div>

    </div>
  )
}

