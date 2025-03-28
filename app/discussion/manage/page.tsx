"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import {
  Search,
  X,
  MessageCircle,
  Calendar,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Users,
  Grid,
  List,
  SlidersHorizontal,
} from "lucide-react"
import ToastNotification from "@/components/toast-notification"

// 샘플 토론 발제문 데이터
const SAMPLE_DISCUSSIONS = [
  {
    id: 1,
    title: "현대 문학에서의 윤리적 딜레마",
    bookTitle: "데미안",
    author: "헤르만 헤세",
    coverImage: "/placeholder.svg?height=150&width=100",
    mainTopic:
      "헤르만 헤세의 '데미안'에서 나타나는 선과 악의 경계, 자아 발견의 과정에서 마주하는 윤리적 딜레마에 대해 토론해보고자 합니다. 주인공 싱클레어가 겪는 내적 갈등과 성장 과정은 현대인의 자아 정체성 문제와 어떻게 연결될 수 있을까요?",
    questions: [
      "데미안에서 나타나는 '선과 악의 경계'는 현대 사회에서 어떻게 해석될 수 있을까요?",
      "싱클레어의 자아 발견 과정은 현대인의 정체성 탐색과 어떤 유사점이 있나요?",
      "작품에서 등장하는 '아브락사스'의 상징성은 무엇이며, 이것이 우리 삶에 주는 메시지는 무엇일까요?",
      "데미안과 싱클레어의 관계는 멘토와 제자의 관계를 넘어서 어떤 의미를 가지고 있나요?",
    ],
    discussionDate: "2023-12-15",
    createdAt: "2023-11-20",
    location: "온라인 줌 미팅",
    maxParticipants: 12,
    currentParticipants: 8,
    tags: ["문학", "철학", "자아", "윤리"],
    isPublic: true,
    status: "upcoming", // upcoming, ongoing, completed, cancelled
    imageUrl: "/placeholder.svg?height=600&width=600",
    participants: [
      { id: 1, username: "book_lover", avatar: "/placeholder.svg?height=50&width=50" },
      { id: 2, username: "philosophy_student", avatar: "/placeholder.svg?height=50&width=50" },
      { id: 3, username: "lit_critic", avatar: "/placeholder.svg?height=50&width=50" },
    ],
  },
  {
    id: 2,
    title: "과학기술의 발전과 인간성의 미래",
    bookTitle: "프랑켄슈타인",
    author: "메리 셸리",
    coverImage: "/placeholder.svg?height=150&width=100",
    mainTopic:
      "메리 셸리의 '프랑켄슈타인'은 과학기술의 발전과 그에 따른 윤리적 책임에 대한 선구적인 작품입니다. 현대 과학기술의 급속한 발전 속에서 이 고전 작품이 던지는 질문들을 함께 고민해보고자 합니다.",
    questions: [
      "프랑켄슈타인 박사의 창조물에 대한 책임 회피는 현대 과학자들의 윤리적 딜레마와 어떻게 연결될 수 있을까요?",
      "인공지능과 생명공학의 발전은 '인간이란 무엇인가'라는 질문에 어떤 새로운 관점을 제시하나요?",
      "작품에서 나타나는 '자연 vs 기술'의 대립은 현대 환경 문제와 어떻게 연결될 수 있을까요?",
    ],
    discussionDate: "2023-12-20",
    createdAt: "2023-11-15",
    location: "페어링북 카페",
    maxParticipants: 15,
    currentParticipants: 7,
    tags: ["과학", "윤리", "기술", "문학"],
    isPublic: true,
    status: "upcoming",
    imageUrl: "/placeholder.svg?height=600&width=600",
    participants: [
      { id: 4, username: "tech_ethics", avatar: "/placeholder.svg?height=50&width=50" },
      { id: 5, username: "bioethics_prof", avatar: "/placeholder.svg?height=50&width=50" },
    ],
  },
  {
    id: 3,
    title: "역사 속 여성의 목소리",
    bookTitle: "제인 에어",
    author: "샬롯 브론테",
    coverImage: "/placeholder.svg?height=150&width=100",
    mainTopic:
      "빅토리아 시대의 사회적 제약 속에서 자신의 목소리를 찾아가는 제인 에어의 여정을 통해, 역사 속 여성의 지위와 현대 사회에서의 여성의 역할 변화에 대해 토론합니다.",
    questions: [
      "제인 에어가 당시 사회적 규범에 도전하는 방식은 어떤 의미를 가지나요?",
      "작품 속 버사 메이슨의 존재는 어떤 상징성을 가지며, 이를 통해 작가가 전하고자 한 메시지는 무엇일까요?",
      "현대 페미니즘의 관점에서 제인 에어를 어떻게 재해석할 수 있을까요?",
      "작품에서 나타나는 계급과 젠더의 교차성은 현대 사회에 어떤 시사점을 줄 수 있을까요?",
    ],
    discussionDate: "2023-12-25",
    createdAt: "2023-11-10",
    location: "페어링북 독서모임",
    maxParticipants: 20,
    currentParticipants: 15,
    tags: ["페미니즘", "문학", "역사", "사회"],
    isPublic: true,
    status: "upcoming",
    imageUrl: "/placeholder.svg?height=600&width=600",
    participants: [
      { id: 6, username: "feminist_reader", avatar: "/placeholder.svg?height=50&width=50" },
      { id: 7, username: "victorian_lit", avatar: "/placeholder.svg?height=50&width=50" },
      { id: 8, username: "gender_studies", avatar: "/placeholder.svg?height=50&width=50" },
    ],
  },
  {
    id: 4,
    title: "실존주의와 현대인의 소외",
    bookTitle: "이방인",
    author: "알베르 카뮈",
    coverImage: "/placeholder.svg?height=150&width=100",
    mainTopic:
      "알베르 카뮈의 '이방인'을 통해 실존주의와 부조리의 철학에 대해 이야기해봅시다. 현대인의 소외와 실존적 불안에 대한 통찰을 나눠요.",
    questions: [
      "뫼르소의 감정적 무관심은 현대 사회의 어떤 측면을 반영하나요?",
      "소설에서 나타나는 '부조리'의 개념은 현대인의 삶에 어떻게 적용될 수 있을까요?",
      "뫼르소가 재판에서 보여주는 태도는 사회적 규범과 개인의 진실 사이의 갈등을 어떻게 보여주나요?",
      "카뮈의 실존주의 철학은 오늘날 우리에게 어떤 의미가 있을까요?",
    ],
    discussionDate: "2023-11-10",
    createdAt: "2023-10-15",
    location: "철학 카페",
    maxParticipants: 15,
    currentParticipants: 12,
    tags: ["철학", "실존주의", "문학", "소외"],
    isPublic: true,
    status: "completed",
    imageUrl: "/placeholder.svg?height=600&width=600",
    participants: [
      { id: 9, username: "existentialist", avatar: "/placeholder.svg?height=50&width=50" },
      { id: 10, username: "philosophy_major", avatar: "/placeholder.svg?height=50&width=50" },
      { id: 11, username: "absurdist", avatar: "/placeholder.svg?height=50&width=50" },
    ],
  },
  {
    id: 5,
    title: "죄와 벌: 도덕과 구원의 문제",
    bookTitle: "죄와 벌",
    author: "표도르 도스토예프스키",
    coverImage: "/placeholder.svg?height=150&width=100",
    mainTopic: "도스토예프스키의 '죄와 벌'에서 나타나는 도덕적 딜레마와 구원의 테마를 현대적 관점에서 재해석해봅시다.",
    questions: [
      "라스콜니코프의 '초인 이론'은 현대 사회의 어떤 위험한 사상과 연결될 수 있을까요?",
      "소설에서 나타나는 죄책감과 구원의 과정은 현대인의 심리적 갈등을 어떻게 반영하나요?",
      "소냐의 역할은 종교적 구원과 인간적 연민의 관점에서 어떻게 해석될 수 있을까요?",
      "범죄와 처벌의 관계는 현대 사법 시스템에 어떤 시사점을 줄 수 있을까요?",
    ],
    discussionDate: "2023-10-20",
    createdAt: "2023-09-25",
    location: "러시아 문학 연구회",
    maxParticipants: 18,
    currentParticipants: 15,
    tags: ["고전", "러시아문학", "도덕", "구원"],
    isPublic: false,
    status: "completed",
    imageUrl: "/placeholder.svg?height=600&width=600",
    participants: [
      { id: 12, username: "russian_lit_fan", avatar: "/placeholder.svg?height=50&width=50" },
      { id: 13, username: "moral_philosophy", avatar: "/placeholder.svg?height=50&width=50" },
      { id: 14, username: "crime_fiction", avatar: "/placeholder.svg?height=50&width=50" },
    ],
  },
  {
    id: 6,
    title: "현대인의 고독과 상실",
    bookTitle: "상실의 시대",
    author: "무라카미 하루키",
    coverImage: "/placeholder.svg?height=150&width=100",
    mainTopic:
      "무라카미 하루키의 '상실의 시대'를 통해 현대 사회의 고독과 상실감에 대해 이야기해봅시다. 우리는 무엇을 잃어버렸고, 무엇을 찾고 있을까요?",
    questions: [
      "소설 속 주인공의 상실감은 현대 사회의 어떤 측면을 반영하나요?",
      "하루키 소설에 자주 등장하는 '고독'의 테마는 현대인의 삶과 어떻게 연결되나요?",
      "소설에서 음악이 가지는 의미와 역할은 무엇인가요?",
      "과거에 대한 노스탤지어가 현재의 삶에 미치는 영향은 무엇일까요?",
    ],
    discussionDate: "2023-09-15",
    createdAt: "2023-08-20",
    location: "온라인 줌 미팅",
    maxParticipants: 20,
    currentParticipants: 18,
    tags: ["현대문학", "일본문학", "고독", "상실"],
    isPublic: true,
    status: "cancelled",
    imageUrl: "/placeholder.svg?height=600&width=600",
    participants: [
      { id: 15, username: "murakami_fan", avatar: "/placeholder.svg?height=50&width=50" },
      { id: 16, username: "jazz_lover", avatar: "/placeholder.svg?height=50&width=50" },
      { id: 17, username: "modern_lit", avatar: "/placeholder.svg?height=50&width=50" },
    ],
  },
]

export default function DiscussionManagePage() {
  const [discussions, setDiscussions] = useState(SAMPLE_DISCUSSIONS)
  const [filteredDiscussions, setFilteredDiscussions] = useState(SAMPLE_DISCUSSIONS)
  const [searchTerm, setSearchTerm] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success")
  const [filterOpen, setFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"recent" | "date" | "title" | "participants">("recent")
  const [filterPublic, setFilterPublic] = useState<"all" | "public" | "private">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "completed" | "cancelled">("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // 모든 태그 추출
  const allTags = Array.from(new Set(discussions.flatMap((discussion) => discussion.tags)))

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
    let result = [...discussions]

    // 검색어 필터링
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (discussion) =>
          discussion.title.toLowerCase().includes(term) ||
          discussion.bookTitle.toLowerCase().includes(term) ||
          discussion.author.toLowerCase().includes(term) ||
          discussion.mainTopic.toLowerCase().includes(term) ||
          discussion.tags.some((tag) => tag.toLowerCase().includes(term)),
      )
    }

    // 공개 여부 필터링
    if (filterPublic !== "all") {
      result = result.filter((discussion) => (filterPublic === "public" ? discussion.isPublic : !discussion.isPublic))
    }

    // 상태 필터링
    if (filterStatus !== "all") {
      result = result.filter((discussion) => discussion.status === filterStatus)
    }

    // 태그 필터링
    if (selectedTags.length > 0) {
      result = result.filter((discussion) => selectedTags.some((tag) => discussion.tags.includes(tag)))
    }

    // 정렬
    result.sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else if (sortBy === "date") {
        return new Date(a.discussionDate).getTime() - new Date(b.discussionDate).getTime()
      } else if (sortBy === "participants") {
        return b.currentParticipants - a.currentParticipants
      } else {
        return a.title.localeCompare(b.title)
      }
    })

    setFilteredDiscussions(result)
  }, [discussions, searchTerm, sortBy, filterPublic, filterStatus, selectedTags])

  // 토론 발제문 삭제
  const handleDeleteDiscussion = (id: number) => {
    if (window.confirm("정말로 이 토론 발제문을 삭제하시겠습니까?")) {
      setDiscussions(discussions.filter((discussion) => discussion.id !== id))
      setToastMessage("토론 발제문이 삭제되었습니다.")
      setToastType("info")
      setShowToast(true)
    }
  }

  // 공개 여부 토글
  const handleTogglePublic = (id: number) => {
    setDiscussions(
      discussions.map((discussion) =>
        discussion.id === id ? { ...discussion, isPublic: !discussion.isPublic } : discussion,
      ),
    )

    const discussion = discussions.find((d) => d.id === id)
    if (discussion) {
      setToastMessage(`토론 발제문이 ${discussion.isPublic ? "비공개" : "공개"}로 설정되었습니다.`)
      setToastType("success")
      setShowToast(true)
    }
  }

  // 토론 상태 변경
  const handleChangeStatus = (id: number, status: "upcoming" | "ongoing" | "completed" | "cancelled") => {
    setDiscussions(discussions.map((discussion) => (discussion.id === id ? { ...discussion, status } : discussion)))

    setToastMessage(`토론 상태가 변경되었습니다.`)
    setToastType("success")
    setShowToast(true)
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
    setFilterStatus("all")
    setSelectedTags([])
    setFilterOpen(false)
  }

  // 상태에 따른 배지 색상
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700"
      case "ongoing":
        return "bg-green-100 text-green-700"
      case "completed":
        return "bg-gray-100 text-gray-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  // 상태 텍스트
  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "예정됨"
      case "ongoing":
        return "진행 중"
      case "completed":
        return "완료됨"
      case "cancelled":
        return "취소됨"
      default:
        return status
    }
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
          <h1 className="text-3xl font-bold text-rose-600 mb-2">내 토론 발제문</h1>
          <p className="text-gray-600">작성한 토론 발제문을 관리하고 참여자를 확인하세요</p>
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
                filterOpen ||
                selectedTags.length > 0 ||
                filterPublic !== "all" ||
                filterStatus !== "all" ||
                sortBy !== "recent"
                  ? "border-rose-500 text-rose-500"
                  : "border-gray-300 text-gray-500"
              } hover:border-rose-500 hover:text-rose-500 transition-colors`}
            >
              <SlidersHorizontal size={18} />
              <span>필터</span>
              {(selectedTags.length > 0 || filterPublic !== "all" || filterStatus !== "all" || sortBy !== "recent") && (
                <span className="ml-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedTags.length +
                    (filterPublic !== "all" ? 1 : 0) +
                    (filterStatus !== "all" ? 1 : 0) +
                    (sortBy !== "recent" ? 1 : 0)}
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
                        checked={sortBy === "date"}
                        onChange={() => setSortBy("date")}
                        className="text-rose-500 focus:ring-rose-500"
                      />
                      <span>토론 일자순</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="sortBy"
                        checked={sortBy === "participants"}
                        onChange={() => setSortBy("participants")}
                        className="text-rose-500 focus:ring-rose-500"
                      />
                      <span>참여자 수</span>
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

                {/* 상태 필터 */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">토론 상태</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="filterStatus"
                        checked={filterStatus === "all"}
                        onChange={() => setFilterStatus("all")}
                        className="text-rose-500 focus:ring-rose-500"
                      />
                      <span>전체</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="filterStatus"
                        checked={filterStatus === "upcoming"}
                        onChange={() => setFilterStatus("upcoming")}
                        className="text-rose-500 focus:ring-rose-500"
                      />
                      <span>예정됨</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="filterStatus"
                        checked={filterStatus === "completed"}
                        onChange={() => setFilterStatus("completed")}
                        className="text-rose-500 focus:ring-rose-500"
                      />
                      <span>완료됨</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="filterStatus"
                        checked={filterStatus === "cancelled"}
                        onChange={() => setFilterStatus("cancelled")}
                        className="text-rose-500 focus:ring-rose-500"
                      />
                      <span>취소됨</span>
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

          {/* 새 토론 발제문 작성 버튼 */}
          <Link href="/discussion/create">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors ml-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={18} />
              <span>새 토론 발제문</span>
            </motion.button>
          </Link>
        </div>

        {/* 토론 발제문 목록 */}
        {filteredDiscussions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-gray-400 mb-3">
              <MessageCircle size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">토론 발제문이 없습니다</h3>
            <p className="text-gray-500 text-sm mb-4">
              {searchTerm || selectedTags.length > 0 || filterPublic !== "all" || filterStatus !== "all"
                ? "검색 조건에 맞는 토론 발제문이 없습니다. 다른 검색어나 필터를 시도해보세요."
                : "첫 번째 토론 발제문을 작성해보세요."}
            </p>
            <Link href="/discussion/create">
              <button className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
                토론 발제문 작성하기
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* 그리드 뷰 */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDiscussions.map((discussion) => (
                  <motion.div
                    key={discussion.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="relative h-40 bg-rose-50">
                      <Image
                        src={discussion.imageUrl || "/placeholder.svg"}
                        alt={discussion.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleTogglePublic(discussion.id)
                          }}
                          className={`p-1.5 rounded-full ${
                            discussion.isPublic ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                          }`}
                        >
                          {discussion.isPublic ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(discussion.status)}`}>
                          {getStatusText(discussion.status)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <Link href={`/discussion/manage/${discussion.id}`}>
                        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1 hover:text-rose-600">
                          {discussion.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-2">
                        {discussion.bookTitle} - {discussion.author}
                      </p>
                      <div className="flex items-center mb-2">
                        <Calendar size={14} className="text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{discussion.discussionDate}</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <Users size={14} className="text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">
                          {discussion.currentParticipants}/{discussion.maxParticipants}명
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3 line-clamp-3">{discussion.mainTopic}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {discussion.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {new Date(discussion.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex gap-1">
                          <Link href={`/discussion/edit/${discussion.id}`}>
                            <button className="p-1.5 text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors">
                              <Edit size={16} />
                            </button>
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteDiscussion(discussion.id)
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
                {filteredDiscussions.map((discussion) => (
                  <motion.div
                    key={discussion.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="p-4 flex gap-4">
                      <div className="w-24 h-36 relative flex-shrink-0 bg-rose-50 rounded-md overflow-hidden">
                        <Image
                          src={discussion.coverImage || "/placeholder.svg"}
                          alt={discussion.bookTitle}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-1 left-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadgeColor(discussion.status)}`}
                          >
                            {getStatusText(discussion.status)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link href={`/discussion/manage/${discussion.id}`}>
                              <h3 className="font-semibold text-gray-800 mb-1 hover:text-rose-600">
                                {discussion.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-600 mb-1">
                              {discussion.bookTitle} - {discussion.author}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleTogglePublic(discussion.id)
                              }}
                              className={`p-1.5 rounded-full ${
                                discussion.isPublic ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                              }`}
                            >
                              {discussion.isPublic ? <Eye size={14} /> : <EyeOff size={14} />}
                            </button>
                            <Link href={`/discussion/edit/${discussion.id}`}>
                              <button className="p-1.5 text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors">
                                <Edit size={16} />
                              </button>
                            </Link>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteDiscussion(discussion.id)
                              }}
                              className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center mb-2">
                          <Calendar size={14} className="text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">{discussion.discussionDate}</span>
                          <span className="mx-2 text-gray-300">|</span>
                          <Users size={14} className="text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">
                            {discussion.currentParticipants}/{discussion.maxParticipants}명
                          </span>
                          <span className="mx-2 text-gray-300">|</span>
                          <span className="text-xs text-gray-500">
                            {new Date(discussion.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2 line-clamp-2">{discussion.mainTopic}</p>
                        <div className="flex flex-wrap gap-1">
                          {discussion.tags.map((tag, index) => (
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
        <Link href="/discussion/create">
          <motion.button
            className="flex items-center justify-center w-14 h-14 bg-rose-500 text-white rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle size={24} />
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

