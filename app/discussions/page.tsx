"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import { Search, X, MessageCircle, Filter, Grid, List, Menu } from "lucide-react"
import Link from "next/link"
import InstagramCard from "@/components/instagram-card"

// 샘플 토론 발제문 데이터
const SAMPLE_DISCUSSIONS = [
  {
    id: "1",
    username: "literature_prof",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption:
      "헤르만 헤세의 '데미안'에서 나타나는 선과 악의 경계, 자아 발견의 과정에서 마주하는 윤리적 딜레마에 대해 토론해보고자 합니다. #독서토론 #문학 #철학",
    title: "현대 문학에서의 윤리적 딜레마",
    bookTitle: "데미안",
    author: "헤르만 헤세",
    likes: 42,
    timestamp: "3일 전",
    location: "온라인 줌 미팅",
    tags: ["독서토론", "문학", "철학", "자아", "윤리"],
    category: "discussions",
  },
  {
    id: "2",
    username: "sci_fi_enthusiast",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption:
      "메리 셸리의 '프랑켄슈타인'은 과학기술의 발전과 그에 따른 윤리적 책임에 대한 선구적인 작품입니다. 현대 과학기술의 급속한 발전 속에서 이 고전 작품이 던지는 질문들을 함께 고민해보고자 합니다. #독서토론 #과학 #윤리",
    title: "과학기술의 발전과 인간성의 미래",
    bookTitle: "프랑켄슈타인",
    author: "메리 셸리",
    likes: 38,
    timestamp: "5일 전",
    location: "페어링북 카페",
    tags: ["독서토론", "과학", "윤리", "기술", "문학"],
    category: "discussions",
  },
  {
    id: "3",
    username: "history_buff",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption:
      "빅토리아 시대의 사회적 제약 속에서 자신의 목소리를 찾아가는 제인 에어의 여정을 통해, 역사 속 여성의 지위와 현대 사회에서의 여성의 역할 변화에 대해 토론합니다. #독서토론 #페미니즘 #문학",
    title: "역사 속 여성의 목소리",
    bookTitle: "제인 에어",
    author: "샬롯 브론테",
    likes: 56,
    timestamp: "1주일 전",
    location: "페어링북 독서모임",
    tags: ["독서토론", "페미니즘", "문학", "역사", "사회"],
    category: "discussions",
  },
  {
    id: "4",
    username: "philosophy_reader",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption:
      "알베르 카뮈의 '이방인'을 통해 실존주의와 부조리의 철학에 대해 이야기해봅시다. 현대인의 소외와 실존적 불안에 대한 통찰을 나눠요. #독서토론 #철학 #실존주의",
    title: "실존주의와 현대인의 소외",
    bookTitle: "이방인",
    author: "알베르 카뮈",
    likes: 47,
    timestamp: "2주일 전",
    location: "철학 카페",
    tags: ["독서토론", "철학", "실존주의", "문학", "소외"],
    category: "discussions",
  },
  {
    id: "5",
    username: "classic_lover",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption:
      "도스토예프스키의 '죄와 벌'에서 나타나는 도덕적 딜레마와 구원의 테마를 현대적 관점에서 재해석해봅시다. #독서토론 #고전 #러시아문학",
    title: "죄와 벌: 도덕과 구원의 문제",
    bookTitle: "죄와 벌",
    author: "표도르 도스토예프스키",
    likes: 63,
    timestamp: "3주일 전",
    location: "러시아 문학 연구회",
    tags: ["독서토론", "고전", "러시아문학", "도덕", "구원"],
    category: "discussions",
  },
  {
    id: "6",
    username: "modern_lit",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption:
      "무라카미 하루키의 '상실의 시대'를 통해 현대 사회의 고독과 상실감에 대해 이야기해봅시다. 우리는 무엇을 잃어버렸고, 무엇을 찾고 있을까요? #독서토론 #현대문학 #일본문학",
    title: "현대인의 고독과 상실",
    bookTitle: "상실의 시대",
    author: "무라카미 하루키",
    likes: 51,
    timestamp: "1개월 전",
    location: "온라인 줌 미팅",
    tags: ["독서토론", "현대문학", "일본문학", "고독", "상실"],
    category: "discussions",
  },
]

export default function DiscussionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  // 페이지 로드 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.paddingTop = "64px"
    return () => {
      document.body.style.paddingTop = "0"
    }
  }, [])

  // 검색어에 따라 필터링된 토론 목록
  const filteredDiscussions = SAMPLE_DISCUSSIONS.filter((discussion) => {
    // 카테고리 필터 적용
    if (categoryFilter && !discussion.tags.includes(categoryFilter)) {
      return false
    }

    // 검색어 필터 적용
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        discussion.title.toLowerCase().includes(searchLower) ||
        discussion.bookTitle.toLowerCase().includes(searchLower) ||
        discussion.author.toLowerCase().includes(searchLower) ||
        discussion.caption.toLowerCase().includes(searchLower) ||
        discussion.username.toLowerCase().includes(searchLower) ||
        discussion.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      )
    }

    return true
  })

  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-rose-600 mb-2">독서 토론</h1>
          <p className="text-gray-600">다양한 책에 대한 토론에 참여하고 의견을 나눠보세요</p>
        </motion.div>

        {/* 버튼 그룹 */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="/discussion/create">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-full font-medium shadow-md hover:bg-rose-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={18} />
              <span>토론 발제문 작성하기</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="토론 주제, 책 제목, 작가 등으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`p-2 rounded-lg border ${
                filterOpen || categoryFilter ? "border-rose-500 text-rose-500" : "border-gray-300 text-gray-500"
              } hover:border-rose-500 hover:text-rose-500 transition-colors`}
            >
              <Filter size={18} />
            </button>
            {filterOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 p-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-medium text-sm text-gray-700 mb-2">태그 필터</h4>
                <div className="space-y-2">
                  {["철학", "문학", "과학", "역사", "페미니즘", "고전", "현대문학"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setCategoryFilter(categoryFilter === tag ? null : tag)
                        setFilterOpen(false)
                      }}
                      className={`block w-full text-left px-2 py-1 rounded text-sm ${
                        categoryFilter === tag
                          ? "bg-rose-50 text-rose-600 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="bg-gray-100 rounded-lg p-1 inline-flex">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-500"}`}
              aria-label="Grid view"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow-sm" : "text-gray-500"}`}
              aria-label="List view"
            >
              <List size={16} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
            onClick={toggleMobileMenu}
            aria-label="메뉴"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Discussions Grid/List */}
        {filteredDiscussions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-gray-400 mb-3">
              <MessageCircle size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">토론을 찾을 수 없습니다</h3>
            <p className="text-gray-500 text-sm">
              {searchTerm || categoryFilter
                ? "검색어나 필터를 변경해보세요."
                : "아직 등록된 토론이 없습니다. 첫 번째 토론을 시작해보세요!"}
            </p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-6"}>
            {filteredDiscussions.map((discussion, index) => (
              <InstagramCard
                key={discussion.id}
                id={discussion.id}
                username={discussion.username}
                userAvatar={discussion.userAvatar}
                imageUrl={discussion.imageUrl}
                caption={discussion.caption}
                likes={discussion.likes}
                timestamp={discussion.timestamp}
                location={discussion.location}
                index={index}
                viewMode={viewMode}
                category="discussions"
              />
            ))}
          </div>
        )}

        {/* Create Discussion CTA (Mobile) */}
        <div className="fixed bottom-6 right-6 md:hidden">
          <Link href="/discussion/create">
            <motion.button
              className="flex items-center justify-center w-14 h-14 bg-rose-600 text-white rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle size={24} />
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  )
}

