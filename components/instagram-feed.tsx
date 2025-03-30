"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { useScroll } from "framer-motion"
import InstagramCard from "./instagram-card"
import { Loader2, AlertCircle, Search, Grid, List, Menu } from "lucide-react"
import { useThrottle } from "@/hooks/use-throttle"

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
  {
    id: 8,
    username: "book_reviewer",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "이번 달 베스트셀러 리뷰 📊 여러분은 어떤 책을 읽고 계신가요? #베스트셀러 #페어링북 #독서",
    likes: 312,
    timestamp: "3 days ago",
    tags: ["베스트셀러", "페어링북", "독서"],
    category: "bestsellers",
    comments: [
      { username: "avid_reader", text: "저는 요즘 김영하 작가의 신작을 읽고 있어요!" },
      { username: "book_enthusiast", text: "베스트셀러 목록 전체를 볼 수 있는 링크 있을까요?" },
    ],
  },
  {
    id: 9,
    username: "classic_lover",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "고전 문학의 매력에 빠져보세요 🕰️ 시간이 지나도 변하지 않는 가치 #고전 #페어링북 #세계문학",
    likes: 276,
    timestamp: "1 week ago",
    tags: ["고전", "페어링북", "세계문학"],
    category: "classics",
    comments: [
      { username: "literature_student", text: "고전 문학 추천 목록 공유해주실 수 있나요?" },
      { username: "book_historian", text: "고전은 언제 읽어도 새로운 깨달음을 주는 것 같아요." },
    ],
  },
  {
    id: 10,
    username: "foreign_books",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "해외 베스트셀러 신간 소식 🌍 번역서의 매력에 빠져보세요 #외국도서 #페어링북 #번역서",
    likes: 189,
    timestamp: "5 days ago",
    tags: ["외국도서", "페어링북", "번역서"],
    category: "foreign",
    comments: [
      { username: "translation_lover", text: "번역가에 따라 같은 책도 다르게 느껴지는 것 같아요." },
      { username: "global_reader", text: "다음 번역 출간 일정이 궁금해요!" },
    ],
  },
]

interface InstagramFeedProps {
  searchTerm?: string
  activeTab?: string
  onMenuClick?: () => void
  initialPostCount?: number
  isMobile?: boolean
}

export default function InstagramFeed({
  searchTerm = "",
  activeTab = "all",
  onMenuClick,
  initialPostCount = 6,
  isMobile = false,
}: InstagramFeedProps) {
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [filteredPosts, setFilteredPosts] = useState<typeof INITIAL_POSTS>([])
  const [displayedPosts, setDisplayedPosts] = useState<typeof INITIAL_POSTS>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [showAlert, setShowAlert] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

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

  // 필터링 함수 메모이제이션
  const filterPosts = useCallback(
    (allPosts: typeof INITIAL_POSTS) => {
      let filtered = allPosts

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

      return filtered
    },
    [activeTab, searchTerm],
  )

  // Initialize displayed posts based on initialPostCount
  useEffect(() => {
    // Filter posts based on search term and active tab
    const filtered = filterPosts(posts)
    setFilteredPosts(filtered)

    // Set initial displayed posts based on initialPostCount
    setDisplayedPosts(filtered.slice(0, initialPostCount))

    // Reset page if filters change
    setPage(1)
    setHasMore(filtered.length > initialPostCount)
  }, [searchTerm, posts, activeTab, initialPostCount, filterPosts])

  // Function to load more posts (메모이제이션)
  const loadMorePosts = useCallback(() => {
    if (loading || !hasMore) return

    setLoading(true)

    // 로딩 시간 단축 (모바일에서는 더 빠르게)
    setTimeout(
      () => {
        const nextPage = page + 1
        const startIndex = initialPostCount + (nextPage - 2) * 6
        const endIndex = startIndex + 6

        // If we have more filtered posts to show
        if (startIndex < filteredPosts.length) {
          const newPosts = filteredPosts.slice(startIndex, endIndex)
          setDisplayedPosts((prev) => [...prev, ...newPosts])
          setPage(nextPage)

          // Check if there are more posts to load
          setHasMore(endIndex < filteredPosts.length)
        } else {
          // Generate new posts if we've shown all filtered posts
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

          // 새 포스트를 필터링하여 추가
          const filteredNewPosts = filterPosts(newPosts)
          setDisplayedPosts((prev) => [...prev, ...filteredNewPosts])
          setPage(nextPage)
        }

        setLoading(false)

        // Show alert after loading
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 3000)

        // Limit the number of pages that can be loaded
        if (page >= 4) {
          setHasMore(false)
        }
      },
      isMobile ? 800 : 1200,
    ) // 모바일에서는 더 빠르게 로딩
  }, [loading, hasMore, filteredPosts, page, initialPostCount, posts, filterPosts, isMobile])

  // Handle scroll event (쓰로틀링 적용)
  const handleScrollThrottled = useThrottle(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading && hasMore) {
      loadMorePosts()
    }
  }, 200)

  useEffect(() => {
    window.addEventListener("scroll", handleScrollThrottled)
    return () => {
      window.removeEventListener("scroll", handleScrollThrottled)
    }
  }, [handleScrollThrottled])

  // Toggle view mode (메모이제이션)
  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"))
  }, [])

  // 그리드 뷰 메모이제이션
  const gridView = useMemo(() => {
    if (viewMode !== "grid" || filteredPosts.length === 0) return null

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedPosts.map((post, index) => (
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
    )
  }, [viewMode, filteredPosts.length, displayedPosts])

  // 리스트 뷰 메모이제이션
  const listView = useMemo(() => {
    if (viewMode !== "list" || filteredPosts.length === 0) return null

    return (
      <div className="space-y-6">
        {displayedPosts.map((post, index) => (
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
    )
  }, [viewMode, filteredPosts.length, displayedPosts])

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

        {/* Post Count Display */}
        <div className="text-sm text-gray-500">
          {filteredPosts.length > 0 ? `${displayedPosts.length}/${filteredPosts.length}개 포스트` : "포스트 없음"}
        </div>

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
        <div className="text-center py-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
            <Search className="text-rose-500" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-500">
            {searchTerm ? `"${searchTerm}"에 대한 검색 결과가 없습니다.` : "해당 카테고리에 게시물이 없습니다."} 다른
            검색어나 카테고리를 시도해보세요.
          </p>
        </div>
      )}

      {/* Grid View */}
      {gridView}

      {/* List View */}
      {listView}

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
          <span className="ml-2 text-rose-600">포스트를 불러오는 중...</span>
        </div>
      )}

      {/* Alert notification - 최적화된 애니메이션 */}
      <div
        className={`fixed bottom-20 left-0 right-0 mx-auto max-w-sm bg-rose-50 rounded-lg shadow-lg p-4 border border-rose-200 z-40 transition-all duration-300 ${
          showAlert ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        style={{
          width: "90%",
          maxWidth: "400px",
          willChange: showAlert ? "opacity, transform" : "auto",
        }}
      >
        <div className="flex items-center">
          <AlertCircle className="text-rose-500 mr-2" size={20} />
          <p className="text-rose-700">새로운 포스트가 로드되었습니다!</p>
        </div>
      </div>

      {/* End of content message */}
      {!hasMore && !loading && filteredPosts.length > 0 && (
        <div className="text-center py-8 text-gray-500 animate-fade-in">모든 포스트를 확인했습니다.</div>
      )}
    </div>
  )
}

