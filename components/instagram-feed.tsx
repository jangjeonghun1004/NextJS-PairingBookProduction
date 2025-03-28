"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import InstagramCard from "./instagram-card"
import { Loader2, AlertCircle, Search, Grid, List, Menu } from "lucide-react"

// Sample data for posts
const INITIAL_POSTS = [
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
    comments: [
      { username: "reader_kim", text: "저도 읽어봤는데 정말 좋았어요!" },
      { username: "book_lover", text: "다음에 읽어봐야겠네요 😊" },
      { username: "novel_addict", text: "이 작가의 다른 책도 추천해주세요!" },
    ],
  },
  {
    id: 2,
    username: "literature_park",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "커피와 함께하는 아침 독서 시간 ☕📖 #아침독서 #페어링북 #북스타그램",
    likes: 187,
    timestamp: "5 hours ago",
    tags: ["아침독서", "페어링북", "북스타그램"],
    category: "morning",
    comments: [
      { username: "coffee_reader", text: "완벽한 아침이네요!" },
      { username: "morning_person", text: "저도 아침 독서를 시작해볼까 해요" },
    ],
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
    tags: ["페어링북", "책추천", "독서모임"],
    category: "recommendations",
    comments: [
      { username: "book_enthusiast", text: "왼쪽에서 두 번째 책 제목이 뭔가요?" },
      { username: "reading_addict", text: "저도 페어링북 추천 받아봐야겠어요!" },
      { username: "literature_fan", text: "좋은 책들이네요 👍" },
      { username: "novel_lover", text: "독서 모임도 있나요?" },
    ],
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
    tags: ["독서모임", "페어링북", "토론"],
    category: "clubs",
    comments: [
      { username: "discussion_lover", text: "다음 모임은 언제인가요?" },
      { username: "book_talk", text: "저도 참여하고 싶어요!" },
    ],
  },
  {
    id: 5,
    username: "daily_reader",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "오늘의 독서 일기 📝 이 책을 읽으며 많은 생각을 하게 됐어요 #독서일기 #페어링북 #서평",
    likes: 278,
    timestamp: "4 days ago",
    tags: ["독서일기", "페어링북", "서평"],
    category: "diaries",
    comments: [
      { username: "thoughtful_reader", text: "공감되는 내용이네요!" },
      { username: "book_diary", text: "저도 독서 일기를 쓰기 시작했어요" },
    ],
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
    tags: ["신간도서", "페어링북", "책스타그램"],
    category: "books",
    comments: [
      { username: "new_book_lover", text: "곧 방문할게요!" },
      { username: "bookshelf_collector", text: "왼쪽 두번째 책 제목이 뭔가요?" },
    ],
  },
  {
    id: 7,
    username: "discussion_leader",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption:
      "오늘 독서토론에서 다룬 주제: '문학 작품에서의 윤리적 딜레마' 정말 흥미로운 의견들이 많았어요! #독서토론 #페어링북 #문학토론",
    likes: 198,
    timestamp: "2 days ago",
    location: "페어링북 토론실",
    tags: ["독서토론", "페어링북", "문학토론"],
    category: "discussions",
    comments: [
      { username: "ethics_reader", text: "정말 좋은 주제였어요! 다음 토론도 기대됩니다." },
      { username: "literature_prof", text: "저도 참여했는데, 다양한 관점을 들을 수 있어 좋았습니다." },
      { username: "book_debater", text: "다음 주제는 무엇인가요?" },
    ],
  },
]

interface InstagramFeedProps {
  searchTerm?: string
  activeTab?: string
  onMenuClick?: () => void
}

export default function InstagramFeed({ searchTerm = "", activeTab = "all", onMenuClick }: InstagramFeedProps) {
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [filteredPosts, setFilteredPosts] = useState(INITIAL_POSTS)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [showAlert, setShowAlert] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Filter posts based on search term and active tab
  useEffect(() => {
    let filtered = posts

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter((post) => post.category === activeTab)
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const lowerCaseSearch = searchTerm.toLowerCase()
      filtered = filtered.filter((post) => {
        // Search in username
        if (post.username.toLowerCase().includes(lowerCaseSearch)) return true

        // Search in caption
        if (post.caption.toLowerCase().includes(lowerCaseSearch)) return true

        // Search in tags
        if (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(lowerCaseSearch))) return true

        // Search in location
        if (post.location && post.location.toLowerCase().includes(lowerCaseSearch)) return true

        return false
      })
    }

    setFilteredPosts(filtered)
  }, [searchTerm, posts, activeTab])

  // Function to load more posts
  const loadMorePosts = () => {
    if (loading || !hasMore) return

    setLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Generate new posts based on the current page
      const categories = ["books", "reviews", "clubs", "recommendations", "morning", "diaries", "discussions"]
      const tags = ["페어링북", "독서", "책스타그램", "북스타그램", "독서모임", "책추천", "아침독서", "독서토론"]

      const newPosts = Array(6)
        .fill(0)
        .map((_, index) => {
          const id = posts.length + index + 1
          const randomCategory = categories[Math.floor(Math.random() * categories.length)]
          const randomTags = Array(3)
            .fill(0)
            .map(() => tags[Math.floor(Math.random() * tags.length)])

          return {
            id,
            username: `user_${id}`,
            userAvatar: "/placeholder.svg?height=100&width=100",
            imageUrl: "/placeholder.svg?height=600&width=600",
            caption: `새로운 책 포스트 ${id} #페어링북 #독서 #책스타그램`,
            likes: Math.floor(Math.random() * 500),
            timestamp: "방금 전",
            location: Math.random() > 0.5 ? "서울 강남" : undefined,
            tags: randomTags,
            category: randomCategory,
            comments: Array(Math.floor(Math.random() * 3))
              .fill(0)
              .map((_, i) => ({
                username: `commenter_${i}`,
                text: `멋진 포스트네요! ${i}`,
              })),
          }
        })

      setPosts((prev) => [...prev, ...newPosts])
      setPage((prev) => prev + 1)
      setLoading(false)

      // Show alert after loading
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)

      // Limit the number of pages that can be loaded
      if (page >= 4) {
        setHasMore(false)
      }
    }, 1500)
  }

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading && hasMore) {
        loadMorePosts()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, hasMore])

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"))
  }

  return (
    <div className="py-4" ref={containerRef}>
      {/* Header with Menu and View Mode Toggle */}
      <div className="flex justify-between items-center mb-4">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
          onClick={onMenuClick}
          aria-label="메뉴"
        >
          <Menu size={24} />
        </button>

        {/* View Mode Toggle */}
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

      {/* No results message */}
      {filteredPosts.length === 0 && (
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
            <Search className="text-rose-500" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-500">
            {searchTerm ? `"${searchTerm}"에 대한 검색 결과가 없습니다.` : "해당 카테고리에 게시물이 없습니다."} 다른
            검색어나 카테고리를 시도해보세요.
          </p>
        </motion.div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && filteredPosts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              comments={post.comments}
              location={post.location}
              index={index}
              viewMode={viewMode}
              category={post.category}
            />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && filteredPosts.length > 0 && (
        <div className="space-y-6">
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
              comments={post.comments}
              location={post.location}
              index={index}
              viewMode={viewMode}
              category={post.category}
            />
          ))}
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
          <span className="ml-2 text-rose-600">포스트를 불러오는 중...</span>
        </div>
      )}

      {/* Alert notification */}
      <AnimatePresence mode="wait">
        {showAlert && (
          <motion.div
            className="fixed bottom-20 left-0 right-0 mx-auto max-w-sm bg-rose-50 rounded-lg shadow-lg p-4 border border-rose-200 z-40"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20 }}
            style={{ width: "90%", maxWidth: "400px" }}
          >
            <div className="flex items-center">
              <AlertCircle className="text-rose-500 mr-2" size={20} />
              <p className="text-rose-700">새로운 포스트가 로드되었습니다!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* End of content message */}
      {!hasMore && !loading && filteredPosts.length > 0 && (
        <motion.div
          className="text-center py-8 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          모든 포스트를 확인했습니다.
        </motion.div>
      )}
    </div>
  )
}

