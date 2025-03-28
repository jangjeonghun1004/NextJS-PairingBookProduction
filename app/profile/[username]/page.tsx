"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Navbar from "@/components/navbar"
import ToastNotification from "@/components/toast-notification"
import {
  ArrowLeft,
  MessageSquare,
  UserPlus,
  BookOpen,
  Heart,
  Calendar,
  MapPin,
  Star,
  MessageCircle,
  Grid,
  List,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react"
import InstagramCard from "@/components/instagram-card"

// Define the RecentlyReadBook type
type RecentlyReadBook = {
  title: string;
  author: string;
  coverImage: string;
  rating: number;
  readDate: string;
};

// 샘플 사용자 데이터
const SAMPLE_USERS = {
  bookworm_jane: {
    username: "bookworm_jane",
    name: "김지현",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "문학과 철학을 사랑하는 독서가입니다. 주로 고전 문학과 현대 소설을 읽습니다. 좋은 책을 통해 새로운 세계를 발견하는 것을 좋아합니다.",
    location: "서울 강남",
    joinDate: "2022년 3월",
    interests: ["문학", "철학", "고전", "소설", "에세이"],
    currentlyReading: {
      title: "데미안",
      author: "헤르만 헤세",
      coverImage: "/placeholder.svg?height=150&width=100",
      progress: 65,
    },
    recentlyRead: [
      {
        title: "노인과 바다",
        author: "어니스트 헤밍웨이",
        coverImage: "/placeholder.svg?height=150&width=100",
        rating: 4.5,
        readDate: "2023년 11월",
      },
      {
        title: "사피엔스",
        author: "유발 하라리",
        coverImage: "/placeholder.svg?height=150&width=100",
        rating: 5,
        readDate: "2023년 10월",
      },
      {
        title: "1984",
        author: "조지 오웰",
        coverImage: "/placeholder.svg?height=150&width=100",
        rating: 4,
        readDate: "2023년 9월",
      },
    ],
    stats: {
      booksRead: 127,
      diariesWritten: 42,
      discussionsCreated: 15,
      pairingFriends: 24,
    },
    isFollowing: false,
  },
  literature_park: {
    username: "literature_park",
    name: "박문학",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "문학 교사이자 열정적인 독서가입니다. 학생들에게 문학의 아름다움을 전하고 있습니다. 시와 소설을 주로 읽고, 가끔 에세이도 즐깁니다.",
    location: "부산",
    joinDate: "2021년 8월",
    interests: ["시", "소설", "교육", "문학이론", "한국문학"],
    currentlyReading: {
      title: "나미야 잡화점의 기적",
      author: "히가시노 게이고",
      coverImage: "/placeholder.svg?height=150&width=100",
      progress: 30,
    },
    recentlyRead: [
      {
        title: "아몬드",
        author: "손원평",
        coverImage: "/placeholder.svg?height=150&width=100",
        rating: 5,
        readDate: "2023년 11월",
      },
      {
        title: "종의 기원",
        author: "정유정",
        coverImage: "/placeholder.svg?height=150&width=100",
        rating: 4.5,
        readDate: "2023년 10월",
      },
      {
        title: "눈에 갇힌 외딴 산장에서",
        author: "히가시노 게이고",
        coverImage: "/placeholder.svg?height=150&width=100",
        rating: 4,
        readDate: "2023년 9월",
      },
    ],
    stats: {
      booksRead: 215,
      diariesWritten: 78,
      discussionsCreated: 32,
      pairingFriends: 56,
    },
    isFollowing: true,
  },
  sci_fi_enthusiast: {
    username: "sci_fi_enthusiast",
    name: "이과학",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "SF와 과학 서적을 좋아하는 공학도입니다. 미래 기술과 우주에 관한 이야기에 관심이 많습니다. 가끔 판타지 소설도 읽습니다.",
    location: "대전",
    joinDate: "2022년 1월",
    interests: ["SF", "과학", "우주", "기술", "판타지"],
    currentlyReading: {
      title: "듄",
      author: "프랭크 허버트",
      coverImage: "/placeholder.svg?height=150&width=100",
      progress: 45,
    },
    recentlyRead: [
      {
        title: "화성의 인류학자",
        author: "메리 로치",
        coverImage: "/placeholder.svg?height=150&width=100",
        rating: 4,
        readDate: "2023년 11월",
      },
      {
        title: "삼체",
        author: "류츠신",
        coverImage: "/placeholder.svg?height=150&width=100",
        rating: 5,
        readDate: "2023년 10월",
      },
      {
        title: "설득의 심리학",
        author: "로버트 치알디니",
        coverImage: "/placeholder.svg?height=150&width=100",
        rating: 4.5,
        readDate: "2023년 9월",
      },
    ],
    stats: {
      booksRead: 98,
      diariesWritten: 31,
      discussionsCreated: 12,
      pairingFriends: 18,
    },
    isFollowing: false,
  },
}

// 샘플 포스트 데이터
const SAMPLE_POSTS = [
  {
    id: 1,
    username: "bookworm_jane",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "오늘의 추천 도서 📚 이 책은 정말 감동적이에요! #페어링북 #독서 #책스타그램",
    likes: 243,
    timestamp: "2 hours ago",
    location: "서울 강남",
    tags: ["페어링북", "독서", "책스타그램"],
    category: "reviews",
  },
  {
    id: 2,
    username: "bookworm_jane",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "커피와 함께하는 아침 독서 시간 ☕📖 #아침독서 #페어링북 #북스타그램",
    likes: 187,
    timestamp: "5 hours ago",
    tags: ["아침독서", "페어링북", "북스타그램"],
    category: "morning",
  },
  {
    id: 3,
    username: "bookworm_jane",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "오늘 페어링북에서 추천받은 책들 💕 취향저격! #페어링북 #책추천 #독서모임",
    likes: 342,
    timestamp: "1 day ago",
    location: "페어링북 카페",
    tags: ["페어링북", "책추천", "독서모임"],
    category: "recommendations",
  },
  {
    id: 4,
    username: "bookworm_jane",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "이번 주 독서모임에서 토론한 책입니다. 다양한 의견이 오갔어요! #독서모임 #페어링북 #토론",
    likes: 156,
    timestamp: "3 days ago",
    location: "페어링북 독서모임",
    tags: ["독서모임", "페어링북", "토론"],
    category: "clubs",
  },
  {
    id: 5,
    username: "bookworm_jane",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "오늘의 독서 일기 📝 이 책을 읽으며 많은 생각을 하게 됐어요 #독서일기 #페어링북 #서평",
    likes: 278,
    timestamp: "4 days ago",
    tags: ["독서일기", "페어링북", "서평"],
    category: "diaries",
  },
  {
    id: 6,
    username: "bookworm_jane",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "이번 주 신간 도서가 입고되었습니다! #신간도서 #페어링북 #책스타그램",
    likes: 421,
    timestamp: "1 week ago",
    location: "페어링북 서점",
    tags: ["신간도서", "페어링북", "책스타그램"],
    category: "books",
  },
]

// 샘플 토론 발제문 데이터
const SAMPLE_DISCUSSIONS = [
  {
    id: 1,
    username: "bookworm_jane",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    title: "현대 문학에서의 윤리적 딜레마",
    bookTitle: "데미안",
    author: "헤르만 헤세",
    discussionDate: "2023-12-15",
    mainTopic:
      "헤르만 헤세의 '데미안'에서 나타나는 선과 악의 경계, 자아 발견의 과정에서 마주하는 윤리적 딜레마에 대해 토론해보고자 합니다.",
    likes: 42,
    timestamp: "3 days ago",
    location: "온라인 줌 미팅",
    category: "discussions",
  },
  {
    id: 2,
    username: "bookworm_jane",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    title: "과학기술의 발전과 인간성의 미래",
    bookTitle: "프랑켄슈타인",
    author: "메리 셸리",
    discussionDate: "2023-12-20",
    mainTopic: "메리 셸리의 '프랑켄슈타인'은 과학기술의 발전과 그에 따른 윤리적 책임에 대한 선구적인 작품입니다.",
    likes: 38,
    timestamp: "5 days ago",
    location: "페어링북 카페",
    category: "discussions",
  },
]

export default function ProfilePage() {
  const router = useRouter()
  const params = useParams()
  const username = params?.username as string
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"posts" | "discussions" | "about">("posts")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success")
  const [isFollowing, setIsFollowing] = useState(false)
  const [showMoreInterests, setShowMoreInterests] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  // 사용자 데이터 가져오기
  useEffect(() => {
    // 실제 앱에서는 API 호출로 데이터를 가져옵니다
    const fetchUser = () => {
      setLoading(true)

      // 샘플 데이터에서 사용자 찾기
      const foundUser = SAMPLE_USERS[username as keyof typeof SAMPLE_USERS]

      setTimeout(() => {
        if (foundUser) {
          setUser(foundUser)
          setIsFollowing(foundUser.isFollowing)
        }
        setLoading(false)
      }, 500) // 로딩 시뮬레이션
    }

    if (username) {
      fetchUser()
    }
  }, [username])

  // 필터링된 포스트
  const filteredPosts = SAMPLE_POSTS.filter((post) => {
    if (post.username !== username) return false
    if (categoryFilter && post.category !== categoryFilter) return false
    return true
  })

  // 필터링된 토론
  const filteredDiscussions = SAMPLE_DISCUSSIONS.filter((discussion) => {
    if (discussion.username !== username) return false
    return true
  })

  // 팔로우/언팔로우 처리
  const handleFollowToggle = () => {
    // 실제 앱에서는 API 호출로 처리
    setIsFollowing(!isFollowing)
    setToastMessage(isFollowing ? `${user.username}님 팔로우를 취소했습니다.` : `${user.username}님을 팔로우했습니다.`)
    setToastType("success")
    setShowToast(true)
  }

  // 페어링 요청 처리
  const handlePairingRequest = () => {
    // 실제 앱에서는 API 호출로 처리
    setToastMessage(`${user.username}님에게 페어링 요청을 보냈습니다.`)
    setToastType("success")
    setShowToast(true)

    // 페어링 관리 페이지로 이동
    router.push("/pairing")
  }

  // 메시지 보내기 처리
  const handleSendMessage = () => {
    // 실제 앱에서는 메시지 페이지로 이동
    router.push(`/messages/${user.username}`)
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto pt-20 px-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-700">사용자를 찾을 수 없습니다</h1>
            <button className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-lg" onClick={() => router.back()}>
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

      <div className="max-w-4xl mx-auto pt-20 px-4 pb-16">
        {/* Back button */}
        <div className="mb-6">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-rose-600 font-medium">
            <ArrowLeft size={18} />
            <span>돌아가기</span>
          </button>
        </div>

        {/* Profile Header */}
        <motion.div
          className="bg-white rounded-xl shadow-sm overflow-hidden mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-rose-100 to-pink-200 relative">
            {/* Profile Image */}
            <div className="absolute -bottom-16 left-6 w-32 h-32 rounded-full border-4 border-white overflow-hidden">
              <Image src={user.avatar || "/placeholder.svg"} alt={user.username} fill className="object-cover" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 pb-6 px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                  <span>@{user.username}</span>
                  {user.location && (
                    <>
                      <span>•</span>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        <span>{user.location}</span>
                      </div>
                    </>
                  )}
                  <span>•</span>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>가입일: {user.joinDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePairingRequest}
                  className="flex items-center gap-1 px-4 py-2 bg-rose-100 text-rose-600 rounded-full font-medium hover:bg-rose-200 transition-colors"
                >
                  <UserPlus size={16} />
                  <span>페어링 요청</span>
                </button>
                <button
                  onClick={handleSendMessage}
                  className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  <MessageSquare size={16} />
                  <span>메시지</span>
                </button>
                <button
                  onClick={handleFollowToggle}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full font-medium transition-colors ${
                    isFollowing
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-rose-500 text-white hover:bg-rose-600"
                  }`}
                >
                  {isFollowing ? "팔로잉" : "팔로우"}
                </button>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-700 mb-4">{user.bio}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-4">
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-gray-800">{user.stats.booksRead}</span>
                <span className="text-sm text-gray-500">읽은 책</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-gray-800">{user.stats.diariesWritten}</span>
                <span className="text-sm text-gray-500">독서 일기</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-gray-800">{user.stats.discussionsCreated}</span>
                <span className="text-sm text-gray-500">토론 발제</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-gray-800">{user.stats.pairingFriends}</span>
                <span className="text-sm text-gray-500">페어링 친구</span>
              </div>
            </div>

            {/* Interests */}
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-700 mb-2">관심사</h3>
              <div className="flex flex-wrap gap-2">
                {user.interests.slice(0, showMoreInterests ? undefined : 5).map((interest: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-sm">
                  {interest}
                  </span>
                ))}
                {user.interests.length > 5 && (
                  <button
                    onClick={() => setShowMoreInterests(!showMoreInterests)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {showMoreInterests ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                )}
              </div>
            </div>

            {/* Currently Reading */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">현재 읽는 책</h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-24 relative rounded overflow-hidden shadow-sm">
                  <Image
                    src={user.currentlyReading.coverImage || "/placeholder.svg"}
                    alt={user.currentlyReading.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{user.currentlyReading.title}</h4>
                  <p className="text-sm text-gray-600">{user.currentlyReading.author}</p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-rose-500 h-2.5 rounded-full"
                        style={{ width: `${user.currentlyReading.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{user.currentlyReading.progress}% 완료</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "posts"
                ? "border-rose-500 text-rose-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            <BookOpen size={18} />
            <span>포스트</span>
            <span className="ml-1 bg-gray-200 text-gray-700 text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {filteredPosts.length}
            </span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "discussions"
                ? "border-rose-500 text-rose-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("discussions")}
          >
            <MessageCircle size={18} />
            <span>토론 발제</span>
            <span className="ml-1 bg-gray-200 text-gray-700 text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {filteredDiscussions.length}
            </span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "about"
                ? "border-rose-500 text-rose-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("about")}
          >
            <Users size={18} />
            <span>상세 정보</span>
          </button>
        </div>

        {/* Content */}
        {activeTab === "posts" && (
          <>
            {/* Filter and View Mode */}
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                    filterOpen || categoryFilter ? "border-rose-500 text-rose-500" : "border-gray-300 text-gray-500"
                  } hover:border-rose-500 hover:text-rose-500 transition-colors`}
                >
                  <Filter size={16} />
                  <span>
                    {categoryFilter
                      ? categoryFilter === "discussions"
                        ? "독서토론"
                        : categoryFilter === "diaries"
                          ? "독서일기"
                          : categoryFilter === "reviews"
                            ? "서평"
                            : categoryFilter === "clubs"
                              ? "독서모임"
                              : categoryFilter === "books"
                                ? "도서"
                                : categoryFilter === "recommendations"
                                  ? "추천도서"
                                  : categoryFilter === "morning"
                                    ? "아침독서"
                                    : categoryFilter
                      : "카테고리"}
                  </span>
                  {categoryFilter && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setCategoryFilter(null)
                      }}
                      className="ml-1 text-gray-400 hover:text-gray-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </button>
                {filterOpen && (
                  <motion.div
                    className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 p-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-medium text-sm text-gray-700 mb-2">카테고리</h4>
                    <div className="space-y-2">
                      {[
                        { id: "books", name: "도서" },
                        { id: "reviews", name: "서평" },
                        { id: "clubs", name: "독서모임" },
                        { id: "discussions", name: "독서토론" },
                        { id: "diaries", name: "독서일기" },
                        { id: "recommendations", name: "추천도서" },
                        { id: "morning", name: "아침독서" },
                      ].map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            setCategoryFilter(category.id)
                            setFilterOpen(false)
                          }}
                          className={`block w-full text-left px-2 py-1 rounded text-sm ${
                            categoryFilter === category.id
                              ? "bg-rose-50 text-rose-600 font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {category.name}
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
            </div>

            {/* Posts */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="text-gray-400 mb-3">
                  <BookOpen size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">포스트가 없습니다</h3>
                <p className="text-gray-500 text-sm">
                  {categoryFilter ? "선택한 카테고리에 해당하는 포스트가 없습니다." : "아직 작성한 포스트가 없습니다."}
                </p>
              </div>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-6"}
              >
                {filteredPosts.map((post, index) => (
                  <InstagramCard
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    userAvatar={post.userAvatar}
                    imageUrl={post.imageUrl}
                    caption={post.caption}
                    likes={post.likes}
                    timestamp={post.timestamp}
                    location={post.location}
                    index={index}
                    viewMode={viewMode}
                    category={post.category}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "discussions" && (
          <>
            {/* Discussions */}
            {filteredDiscussions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="text-gray-400 mb-3">
                  <MessageCircle size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">토론 발제문이 없습니다</h3>
                <p className="text-gray-500 text-sm">아직 작성한 토론 발제문이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDiscussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    className="bg-white rounded-lg shadow-sm p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                    onClick={() => router.push(`/discussion/${discussion.id}`)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={discussion.imageUrl || "/placeholder.svg"}
                          alt={discussion.title}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{discussion.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <BookOpen size={14} className="mr-1" />
                          <span>
                            {discussion.bookTitle} ({discussion.author})
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 line-clamp-2 mb-2">{discussion.mainTopic}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center">
                              <Calendar size={12} className="mr-1" />
                              <span>{discussion.discussionDate}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin size={12} className="mr-1" />
                              <span>{discussion.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Heart size={12} className="mr-1" />
                            <span>{discussion.likes} 좋아요</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "about" && (
          <motion.div
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Recently Read Books */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">최근 읽은 책</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {user.recentlyRead.map((book: RecentlyReadBook, index: number) => (
                  <motion.div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 flex items-start gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
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
                    <h4 className="font-medium text-gray-800">{book.title}</h4>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={`${
                        star <= Math.floor(book.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                      ))}
                    </div>
                    <span className="ml-1 text-xs text-gray-500">{book.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{book.readDate}</p>
                  </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Reading Preferences */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">독서 취향</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">선호하는 장르</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-sm">
                      {interest}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">독서 활동</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">읽은 책</span>
                      <span className="font-medium">{user.stats.booksRead}권</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">독서 일기</span>
                      <span className="font-medium">{user.stats.diariesWritten}개</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">토론 발제</span>
                      <span className="font-medium">{user.stats.discussionsCreated}개</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">페어링 친구</span>
                      <span className="font-medium">{user.stats.pairingFriends}명</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reading Goals */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">독서 목표</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">2023년 독서 목표</h4>
                  <span className="text-sm text-gray-600">
                    {user.stats.booksRead}/150 권 ({Math.round((user.stats.booksRead / 150) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-rose-500 h-2.5 rounded-full"
                    style={{ width: `${Math.min((user.stats.booksRead / 150) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  목표 달성까지 {Math.max(150 - user.stats.booksRead, 0)}권 남았습니다.
                </p>
              </div>
            </div>
          </motion.div>
        )}
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

