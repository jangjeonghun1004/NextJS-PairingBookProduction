"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import InstagramFeed from "@/components/instagram-feed"
import {
  Search,
  X,
  TrendingUp,
  Hash,
  PenSquare,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Settings,
  ArrowUp,
} from "lucide-react"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useThrottle } from "@/hooks/use-throttle"

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

// 탭 데이터 메모이제이션
const TABS = [
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
]

// 모바일 메뉴용 축소된 탭 데이터
const MOBILE_TABS = TABS.slice(0, 8)

export default function StoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)
  const [initialPostCount, setInitialPostCount] = useState(6)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const settingsButtonRef = useRef<HTMLButtonElement>(null)

  // 미디어 쿼리 훅 사용
  const isMobile = useMediaQuery("(max-width: 768px)")

  // 애니메이션 속성 메모이제이션
  const animationProps = useMemo(() => {
    return isMobile
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.15 },
        }
      : {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -10 },
          transition: { duration: 0.2 },
        }
  }, [isMobile])

  // 페이지 로드 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0)

    document.body.style.paddingTop = "64px"
    return () => {
      document.body.style.paddingTop = "0"
    }
  }, [])

  // 스크롤 이벤트 감지 (쓰로틀링 적용)
  const handleScrollThrottled = useThrottle(() => {
    setShowScrollTop(window.scrollY > 300)
  }, 100)

  useEffect(() => {
    window.addEventListener("scroll", handleScrollThrottled)
    return () => {
      window.removeEventListener("scroll", handleScrollThrottled)
    }
  }, [handleScrollThrottled])

  // 외부 클릭 감지 - 설정 메뉴
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsButtonRef.current && !settingsButtonRef.current.contains(event.target as Node)) {
        setShowSettingsMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // 스크롤 함수 (메모이제이션)
  const scrollTabsLeft = useCallback(() => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }, [])

  const scrollTabsRight = useCallback(() => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }, [])

  // 맨 위로 스크롤 (메모이제이션)
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  // Handle tag selection (메모이제이션)
  const handleTagSelect = useCallback((tag: string) => {
    setSelectedTag(tag)
    setSearchTerm(tag)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
    setShowSuggestions(false)
  }, [])

  // Clear search (메모이제이션)
  const clearSearch = useCallback(() => {
    setSearchTerm("")
    setSelectedTag(null)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  // Handle tab change (메모이제이션)
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
    setMobileMenuOpen(false)
  }, [])

  // Toggle mobile menu (메모이제이션)
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  // Toggle settings menu (메모이제이션)
  const toggleSettingsMenu = useCallback(() => {
    setShowSettingsMenu((prev) => !prev)
  }, [])

  // Handle post count change (메모이제이션)
  const handlePostCountChange = useCallback((count: number) => {
    setInitialPostCount(count)
    setShowSettingsMenu(false)
  }, [])

  // 인기 태그 메모이제이션
  const popularTagButtons = useMemo(() => {
    return POPULAR_TAGS.map((tag) => (
      <button
        key={tag}
        onClick={() => handleTagSelect(tag)}
        className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
          selectedTag === tag ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        #{tag}
      </button>
    ))
  }, [selectedTag, handleTagSelect])

  // 탭 버튼 메모이제이션
  const tabButtons = useMemo(() => {
    return TABS.map((tab) => (
      <button
        key={tab.id}
        onClick={() => handleTabChange(tab.id)}
        className={`whitespace-nowrap px-4 py-2 font-medium text-sm rounded-full transition-colors flex-shrink-0 ${
          activeTab === tab.id ? "bg-rose-100 text-rose-600" : "text-gray-600 hover:text-rose-500"
        }`}
      >
        {tab.name}
      </button>
    ))
  }, [activeTab, handleTabChange])

  // 모바일 메뉴 탭 버튼 메모이제이션
  const mobileTabButtons = useMemo(() => {
    return MOBILE_TABS.map((tab) => (
      <button
        key={tab.id}
        onClick={() => handleTabChange(tab.id)}
        className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
          activeTab === tab.id ? "bg-rose-100 text-rose-600 font-medium" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        {tab.name}
      </button>
    ))
  }, [activeTab, handleTabChange])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 헤더 - CSS 애니메이션으로 변경 */}
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold text-rose-600 mb-2">독자들의 이야기</h1>
          <p className="text-gray-600">페어링 BOOK 독자들의 다양한 이야기를 만나보세요</p>
        </div>

        {/* Search Bar - CSS 트랜지션으로 변경 */}
        <div
          className={`relative max-w-xl mx-auto mb-6 transition-transform duration-300 ease-out ${
            isSearchFocused ? "scale-[1.02]" : "scale-100"
          } animate-fade-in-up`}
          style={{
            willChange: isSearchFocused ? "transform" : "auto",
          }}
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
              className={`w-full pl-10 pr-10 py-3 rounded-full border ${
                isSearchFocused ? "border-rose-400 shadow-md" : "border-gray-300"
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

          {/* Search Suggestions - 최적화된 애니메이션 */}
          <AnimatePresence mode="wait">
            {showSuggestions && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-30 overflow-hidden"
                {...animationProps}
                style={{ willChange: "opacity, transform" }}
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
        </div>

        {/* Mobile Menu - 최적화된 애니메이션 */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* 배경 오버레이 */}
              <motion.div
                className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={toggleMobileMenu}
                style={{ willChange: "opacity" }}
              />

              {/* 메뉴 패널 */}
              <motion.div
                className="md:hidden absolute top-0 left-0 w-3/4 h-full bg-white shadow-lg p-4 z-40"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                style={{ willChange: "transform" }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-rose-600">카테고리</h3>
                  <button className="p-2 text-gray-500 hover:text-gray-700" onClick={toggleMobileMenu}>
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-2">{mobileTabButtons}</div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Category Tabs - Scrollable with Settings Button */}
        <div className="mb-8 border-b border-gray-200 relative animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
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
              <div className="flex space-x-4 pb-2">{tabButtons}</div>
            </div>

            {/* 우측 스크롤 버튼 */}
            <button
              onClick={scrollTabsRight}
              className="flex-shrink-0 p-1.5 rounded-full bg-white shadow-sm text-gray-600 hover:bg-gray-100 ml-2 border border-gray-200"
              aria-label="Scroll tabs right"
            >
              <ChevronRight size={16} />
            </button>

            {/* 설정 버튼 (드롭다운) */}
            <div className="relative ml-2" >
              <button
                onClick={toggleSettingsMenu}
                className="flex-shrink-0 p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Settings"
              >
                <Settings size={16} />
              </button>

              {/* 설정 드롭다운 메뉴 - 최적화된 애니메이션 */}
              <AnimatePresence>
                {showSettingsMenu && (
                  <motion.div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-30 overflow-hidden p-3"
                    {...animationProps}
                    style={{ willChange: "opacity, transform" }}
                  >
                    <h3 className="text-sm font-medium text-gray-700 mb-2">표시할 포스트 수</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[3, 6, 9, 12, 15, 18].map((count) => (
                        <button
                          key={count}
                          onClick={() => handlePostCountChange(count)}
                          className={`px-2 py-1 text-sm rounded ${
                            initialPostCount === count
                              ? "bg-rose-100 text-rose-600 font-medium"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">현재 설정: {initialPostCount}개 포스트</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center mb-3">
            <Hash size={18} className="text-rose-500 mr-1" />
            <h2 className="text-lg font-medium text-gray-800">인기 태그</h2>
          </div>
          <div className="flex flex-wrap gap-2">{popularTagButtons}</div>
        </div>

        {/* Instagram Feed */}
        <InstagramFeed
          searchTerm={searchTerm}
          activeTab={activeTab}
          onMenuClick={toggleMobileMenu}
          initialPostCount={initialPostCount}
          isMobile={isMobile}
        />
      </div>

      {/* 맨 위로 이동하기 버튼 - CSS 트랜지션으로 변경 */}
      <div
        className={`fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2 transition-all duration-300 ease-out ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        style={{ willChange: showScrollTop ? "opacity, transform" : "auto" }}
      >
        {/* 맨 위로 이동 버튼 */}
        <button
          onClick={scrollToTop}
          className="p-3 bg-white rounded-full shadow-lg text-rose-600 hover:bg-rose-50 transition-colors border border-rose-100"
          aria-label="맨 위로 이동"
        >
          <ArrowUp size={20} />
          <span className="sr-only">맨 위로 이동</span>
        </button>

        {/* 콘텐츠 작성 버튼들 */}
        <Link
          href="/diary/create"
          className="p-2 bg-white rounded-full shadow-lg text-rose-600 hover:bg-rose-50 transition-colors border border-rose-100 flex items-center gap-1"
        >
          <PenSquare size={16} />
          <span className="text-xs font-medium">독서 일기</span>
        </Link>

        <Link
          href="/discussion/create"
          className="p-2 bg-white rounded-full shadow-lg text-rose-600 hover:bg-rose-50 transition-colors border border-rose-100 flex items-center gap-1"
        >
          <MessageSquare size={16} />
          <span className="text-xs font-medium">토론 발제문</span>
        </Link>
      </div>
    </div>
  )
}

