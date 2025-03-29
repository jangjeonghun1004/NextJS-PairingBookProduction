"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import {
  Search,
  X,
  PenSquare,
  Calendar,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  BookOpen,
  Star,
  Grid,
  List,
  SlidersHorizontal,
  Plus,
} from "lucide-react"
import ToastNotification from "@/components/toast-notification"

// 샘플 독서 일기 데이터
const SAMPLE_DIARIES = [
  {
    id: 1,
    title: "데미안: 내면의 여정을 찾아서",
    bookTitle: "데미안",
    author: "헤르만 헤세",
    coverImage: "/placeholder.svg?height=150&width=100",
    content:
      "헤르만 헤세의 '데미안'은 자아 발견의 여정을 그린 소설로, 주인공 싱클레어가 어떻게 자신의 내면세계를 탐색하고 진정한 자아를 찾아가는지 보여준다. 특히 데미안이라는 인물을 통해 선과 악의 이분법적 세계관을 넘어서는 통찰력을 제시한다. '새는 알을 깨고 나온다. 알은 세계이다. 태어나려는 자는 하나의 세계를 파괴해야 한다'라는 구절이 가장 인상 깊었다.",
    rating: 5,
    readDate: "2023-11-15",
    createdAt: "2023-11-20",
    tags: ["소설", "철학", "성장", "자아"],
    isPublic: true,
    images: ["/placeholder.svg?height=300&width=200"],
  },
  {
    id: 2,
    title: "사피엔스: 인류의 역사를 다시 생각하다",
    bookTitle: "사피엔스",
    author: "유발 하라리",
    coverImage: "/placeholder.svg?height=150&width=100",
    content:
      "하라리의 '사피엔스'는 인류의 역사를 거시적 관점에서 바라보며, 인지혁명, 농업혁명, 과학혁명이 어떻게 인류의 삶을 변화시켰는지 분석한다. 특히 허구를 믿는 능력이 어떻게 대규모 협력을 가능하게 했는지에 대한 설명이 흥미로웠다. 책을 읽으며 인류의 과거뿐만 아니라 미래에 대해서도 많은 생각을 하게 되었다.",
    rating: 4.5,
    readDate: "2023-10-05",
    createdAt: "2023-10-10",
    tags: ["역사", "인류학", "과학", "문명"],
    isPublic: true,
    images: [],
  },
  {
    id: 3,
    title: "노인과 바다: 인간의 의지와 존엄성",
    bookTitle: "노인과 바다",
    author: "어니스트 헤밍웨이",
    coverImage: "/placeholder.svg?height=150&width=100",
    content:
      "헤밍웨이의 '노인과 바다'는 노인 산티아고가 대형 청새치와 사투를 벌이는 이야기를 통해 인간의 의지와 존엄성을 그려낸다. '인간은 패배할 수 있지만 결코 굴복하지 않는다'는 주제가 강렬하게 다가왔다. 단순한 줄거리 속에 담긴 깊은 상징성과 철학적 메시지가 인상적이었다.",
    rating: 4,
    readDate: "2023-09-20",
    createdAt: "2023-09-25",
    tags: ["소설", "고전", "상징주의"],
    isPublic: false,
    images: ["/placeholder.svg?height=300&width=200", "/placeholder.svg?height=300&width=200"],
  },
  {
    id: 4,
    title: "1984: 전체주의의 공포",
    bookTitle: "1984",
    author: "조지 오웰",
    coverImage: "/placeholder.svg?height=150&width=100",
    content:
      "조지 오웰의 '1984'는 빅브라더가 지배하는 디스토피아 사회를 그린 소설이다. 언어의 통제, 역사의 조작, 감시 시스템을 통한 전체주의 사회의 공포를 생생하게 묘사한다. 현대 사회의 감시 기술과 가짜 뉴스를 생각하면 오웰의 예언이 부분적으로 실현되고 있다는 생각이 들어 소름이 돋았다.",
    rating: 5,
    readDate: "2023-08-10",
    createdAt: "2023-08-15",
    tags: ["소설", "디스토피아", "정치", "사회비판"],
    isPublic: true,
    images: [],
  },
  {
    id: 5,
    title: "아몬드: 공감 능력의 부재와 성장",
    bookTitle: "아몬드",
    author: "손원평",
    coverImage: "/placeholder.svg?height=150&width=100",
    content:
      "손원평의 '아몬드'는 감정을 느끼지 못하는 주인공 윤재가 곤이를 만나면서 변화하는 이야기다. 공감 능력의 부재와 그것을 극복해가는 과정이 섬세하게 그려져 있다. 현대 사회에서 점점 잃어가는 공감 능력에 대해 생각해보게 하는 작품이었다.",
    rating: 4,
    readDate: "2023-07-05",
    createdAt: "2023-07-10",
    tags: ["소설", "성장", "공감", "한국문학"],
    isPublic: true,
    images: ["/placeholder.svg?height=300&width=200"],
  },
  {
    id: 6,
    title: "파리의 아파트: 역사 속 숨겨진 이야기",
    bookTitle: "파리의 아파트",
    author: "기욤 뮈소",
    coverImage: "/placeholder.svg?height=150&width=100",
    content:
      "기욤 뮈소의 '파리의 아파트'는 우연히 발견한 오래된 아파트에서 시작되는 미스터리한 이야기다. 과거와 현재를 오가는 서사 구조가 흥미로웠고, 역사적 사건들이 개인의 삶에 미치는 영향을 생각해보게 되었다. 소설을 읽는 내내 파리의 분위기가 생생하게 느껴졌다.",
    rating: 3.5,
    readDate: "2023-06-15",
    createdAt: "2023-06-20",
    tags: ["소설", "미스터리", "역사", "로맨스"],
    isPublic: false,
    images: [],
  },
]

export default function DiaryListPage() {
  const [diaries, setDiaries] = useState(SAMPLE_DIARIES)
  const [filteredDiaries, setFilteredDiaries] = useState(SAMPLE_DIARIES)
  const [searchTerm, setSearchTerm] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success")
  const [filterOpen, setFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "title">("recent")
  const [filterPublic, setFilterPublic] = useState<"all" | "public" | "private">("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // 모든 태그 추출
  const allTags = Array.from(new Set(diaries.flatMap((diary) => diary.tags)))

  // 페이지 로드 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.paddingTop = "64px"
    return () => {
      document.body.style.paddingTop = "0"
    }
  }, [])

  // 필터링 및 정렬 적용
  useEffect(() => {
    let result = [...diaries]

    // 검색어 필터링
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (diary) =>
          diary.title.toLowerCase().includes(term) ||
          diary.bookTitle.toLowerCase().includes(term) ||
          diary.author.toLowerCase().includes(term) ||
          diary.content.toLowerCase().includes(term) ||
          diary.tags.some((tag) => tag.toLowerCase().includes(term)),
      )
    }

    // 공개 여부 필터링
    if (filterPublic !== "all") {
      result = result.filter((diary) => (filterPublic === "public" ? diary.isPublic : !diary.isPublic))
    }

    // 태그 필터링
    if (selectedTags.length > 0) {
      result = result.filter((diary) => selectedTags.some((tag) => diary.tags.includes(tag)))
    }

    // 정렬
    result.sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else if (sortBy === "rating") {
        return b.rating - a.rating
      } else {
        return a.title.localeCompare(b.title)
      }
    })

    setFilteredDiaries(result)
  }, [diaries, searchTerm, sortBy, filterPublic, selectedTags])

  // 독서 일기 삭제
  const handleDeleteDiary = (id: number) => {
    if (window.confirm("정말로 이 독서 일기를 삭제하시겠습니까?")) {
      setDiaries(diaries.filter((diary) => diary.id !== id))
      setToastMessage("독서 일기가 삭제되었습니다.")
      setToastType("info")
      setShowToast(true)
    }
  }

  // 공개 여부 토글
  const handleTogglePublic = (id: number) => {
    setDiaries(diaries.map((diary) => (diary.id === id ? { ...diary, isPublic: !diary.isPublic } : diary)))

    const diary = diaries.find((d) => d.id === id)
    if (diary) {
      setToastMessage(`독서 일기가 ${diary.isPublic ? "비공개" : "공개"}로 설정되었습니다.`)
      setToastType("success")
      setShowToast(true)
    }
  }

  // 태그 선택 토글
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // 필터 초기화
  const handleResetFilters = () => {
    setSearchTerm("")
    setSortBy("recent")
    setFilterPublic("all")
    setSelectedTags([])
    setFilterOpen(false)
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
          <h1 className="text-3xl font-bold text-rose-600 mb-2">내 독서 일기</h1>
          <p className="text-gray-600">소중한 독서 경험을 기록하고 관리하세요</p>
        </motion.div>

        {/* 검색 및 필터 */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="제목, 책, 작가, 내용 검색..."
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

          {/* 필터 버튼 */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                filterOpen || selectedTags.length > 0 || filterPublic !== "all" || sortBy !== "recent"
                  ? "border-rose-500 text-rose-500"
                  : "border-gray-300 text-gray-500"
              } hover:border-rose-500 hover:text-rose-500 transition-colors`}
            >
              <SlidersHorizontal size={18} />
              <span>필터</span>
              {(selectedTags.length > 0 || filterPublic !== "all" || sortBy !== "recent") && (
                <span className="ml-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedTags.length + (filterPublic !== "all" ? 1 : 0) + (sortBy !== "recent" ? 1 : 0)}
                </span>
              )}
            </button>

            {/* 필터 패널 */}
            {filterOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-10 p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-800">필터 및 정렬</h3>
                  <button onClick={handleResetFilters} className="text-xs text-rose-500 hover:text-rose-600">
                    초기화
                  </button>
                </div>

                {/* 정렬 옵션 */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">정렬 기준</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="sortBy"
                        checked={sortBy === "recent"}
                        onChange={() => setSortBy("recent")}
                        className="text-rose-500 focus:ring-rose-500"
                      />
                      <span>최신순</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="sortBy"
                        checked={sortBy === "rating"}
                        onChange={() => setSortBy("rating")}
                        className="text-rose-500 focus:ring-rose-500"
                      />
                      <span>평점순</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="sortBy"
                        checked={sortBy === "title"}
                        onChange={() => setSortBy("title")}
                        className="text-rose-500 focus:ring-rose-500"
                      />
                      <span>제목순</span>
                    </label>
                  </div>
                </div>

                {/* 공개 여부 필터 */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">공개 여부</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="filterPublic"
                        checked={filterPublic === "all"}
                        onChange={() => setFilterPublic("all")}
                        className="text-rose-500 focus:ring-rose-500"
                      />
                      <span>전체</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="filterPublic"
                        checked={filterPublic === "public"}
                        onChange={() => setFilterPublic("public")}
                        className="text-rose-500 focus:ring-rose-500"
                      />
                      <span>공개</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="filterPublic"
                        checked={filterPublic === "private"}
                        onChange={() => setFilterPublic("private")}
                        className="text-rose-500 focus:ring-rose-500"
                      />
                      <span>비공개</span>
                    </label>
                  </div>
                </div>

                {/* 태그 필터 */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">태그</h4>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`px-2 py-1 rounded-full text-xs ${
                          selectedTags.includes(tag)
                            ? "bg-rose-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* 뷰 모드 토글 */}
          {/* <div className="bg-gray-100 rounded-lg p-1 inline-flex">
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
          </div> */}

          {/* 새 독서 일기 작성 버튼 */}
          <Link href="/diary/create">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors ml-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PenSquare size={18} />
              <span>새 독서 일기</span>
            </motion.button>
          </Link>
        </div>

        {/* 독서 일기 목록 */}
        {filteredDiaries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-gray-400 mb-3">
              <BookOpen size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">독서 일기가 없습니다</h3>
            <p className="text-gray-500 text-sm mb-4">
              {searchTerm || selectedTags.length > 0 || filterPublic !== "all"
                ? "검색 조건에 맞는 독서 일기가 없습니다. 다른 검색어나 필터를 시도해보세요."
                : "첫 번째 독서 일기를 작성해보세요."}
            </p>
            <Link href="/diary/create">
              <button className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
                독서 일기 작성하기
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* 그리드 뷰 */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDiaries.map((diary) => (
                  <motion.div
                    key={diary.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="relative h-40 bg-rose-50">
                      {diary.images.length > 0 ? (
                        <Image
                          src={diary.images[0] || "/placeholder.svg"}
                          alt={diary.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image
                            src={diary.coverImage || "/placeholder.svg"}
                            alt={diary.bookTitle}
                            width={80}
                            height={120}
                            className="object-cover shadow-md"
                          />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleTogglePublic(diary.id)
                          }}
                          className={`p-1.5 rounded-full ${
                            diary.isPublic ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                          }`}
                        >
                          {diary.isPublic ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <Link href={`/diary/${diary.id}`}>
                        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1 hover:text-rose-600">
                          {diary.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-2">
                        {diary.bookTitle} - {diary.author}
                      </p>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={14}
                              className={`${
                                star <= Math.floor(diary.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-500">{diary.rating}</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <Calendar size={14} className="text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{diary.readDate}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3 line-clamp-3">{diary.content}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {diary.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{new Date(diary.createdAt).toLocaleDateString()}</span>
                        <div className="flex gap-1">
                          <Link href={`/diary/edit/${diary.id}`}>
                            <button className="p-1.5 text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors">
                              <Edit size={16} />
                            </button>
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteDiary(diary.id)
                            }}
                            className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* 리스트 뷰 */}
            {viewMode === "list" && (
              <div className="space-y-4">
                {filteredDiaries.map((diary) => (
                  <motion.div
                    key={diary.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="p-4 flex gap-4">
                      <div className="w-24 h-36 relative flex-shrink-0 bg-rose-50 rounded-md overflow-hidden">
                        {diary.images.length > 0 ? (
                          <Image
                            src={diary.images[0] || "/placeholder.svg"}
                            alt={diary.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                              src={diary.coverImage || "/placeholder.svg"}
                              alt={diary.bookTitle}
                              width={60}
                              height={90}
                              className="object-cover shadow-md"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link href={`/diary/${diary.id}`}>
                              <h3 className="font-semibold text-gray-800 mb-1 hover:text-rose-600">{diary.title}</h3>
                            </Link>
                            <p className="text-sm text-gray-600 mb-1">
                              {diary.bookTitle} - {diary.author}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleTogglePublic(diary.id)
                              }}
                              className={`p-1.5 rounded-full ${
                                diary.isPublic ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                              }`}
                            >
                              {diary.isPublic ? <Eye size={14} /> : <EyeOff size={14} />}
                            </button>
                            <Link href={`/diary/edit/${diary.id}`}>
                              <button className="p-1.5 text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors">
                                <Edit size={16} />
                              </button>
                            </Link>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteDiary(diary.id)
                              }}
                              className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={14}
                                className={`${
                                  star <= Math.floor(diary.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-1 text-xs text-gray-500">{diary.rating}</span>
                          <span className="mx-2 text-gray-300">|</span>
                          <Calendar size={14} className="text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">{diary.readDate}</span>
                          <span className="mx-2 text-gray-300">|</span>
                          <span className="text-xs text-gray-500">{diary.createdAt}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2 line-clamp-2">{diary.content}</p>
                        <div className="flex flex-wrap gap-1">
                          {diary.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* 모바일 작성 버튼 */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <Link href="/diary/create">
          <motion.button
            className="flex items-center justify-center w-14 h-14 bg-rose-500 text-white rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Plus size={24} />
          </motion.button>
        </Link>
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

