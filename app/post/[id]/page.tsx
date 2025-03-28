"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import ToastNotification from "@/components/toast-notification"
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Smile,
  ArrowLeft,
  Share2,
  Flag,
  UserPlus,
  Clock,
  MapPin,
  BookOpen,
} from "lucide-react"

// 샘플 데이터
const SAMPLE_POSTS = [
  {
    id: "1",
    username: "bookworm_jane",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption:
      "오늘의 추천 도서 📚 이 책은 정말 감동적이에요! 주인공의 성장 과정과 그 과정에서 겪는 다양한 경험들이 너무 현실적으로 묘사되어 있어요. 특히 중반부에 나오는 가족과의 갈등 장면은 많은 생각을 하게 만들었습니다. 여러분도 한번 읽어보세요! #페어링북 #독서 #책스타그램",
    likes: 243,
    timestamp: "2 hours ago",
    location: "서울 강남",
    tags: ["페어링북", "독서", "책스타그램"],
    bookTitle: "잃어버린 시간을 찾아서",
    author: "마르셀 프루스트",
    rating: 4.5,
    comments: [
      { username: "reader_kim", text: "저도 읽어봤는데 정말 좋았어요!" },
      { username: "book_lover", text: "다음에 읽어봐야겠네요 😊" },
      { username: "novel_addict", text: "이 작가의 다른 책도 추천해주세요!" },
    ],
  },
  {
    id: "2",
    username: "literature_park",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption:
      "커피와 함께하는 아침 독서 시간 ☕📖 오늘은 특별히 일찍 일어나서 여유롭게 책을 읽었어요. 이 책은 현대 사회의 문제점을 날카롭게 지적하면서도 희망적인 메시지를 담고 있어요. 아침에 읽으니 하루를 시작하는 데 좋은 에너지가 되네요! #아침독서 #페어링북 #북스타그램",
    likes: 187,
    timestamp: "5 hours ago",
    tags: ["아침독서", "페어링북", "북스타그램"],
    bookTitle: "사피엔스",
    author: "유발 하라리",
    rating: 5,
    comments: [
      { username: "coffee_reader", text: "완벽한 아침이네요!" },
      { username: "morning_person", text: "저도 아침 독서를 시작해볼까 해요" },
    ],
  },
  {
    id: "3",
    username: "book_collector",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption:
      "오늘 페어링북에서 추천받은 책들 💕 취향저격! 인공지능이 분석한 내 취향에 맞는 책들을 추천받았는데, 정말 모두 관심 있던 분야의 책들이에요. 특히 세 번째 책은 오래전부터 읽고 싶었던 책인데 절판되어 구하기 어려웠는데, 여기서 찾게 되어 너무 기뻐요! #페어링북 #책추천 #독서모임",
    likes: 342,
    timestamp: "1 day ago",
    location: "페어링북 카페",
    tags: ["페어링북", "책추천", "독서모임"],
    bookTitle: "다양한 추천 도서",
    author: "여러 작가",
    rating: 4,
    comments: [
      { username: "book_enthusiast", text: "왼쪽에서 두 번째 책 제목이 뭔가요?" },
      { username: "reading_addict", text: "저도 페어링북 추천 받아봐야겠어요!" },
      { username: "literature_fan", text: "좋은 책들이네요 👍" },
      { username: "novel_lover", text: "독서 모임도 있나요?" },
    ],
  },
]

export default function PostDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [localLikes, setLocalLikes] = useState(0)
  const [comments, setComments] = useState<any[]>([])

  // 상태 변수 추가
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  // 스크롤 위치 복원 기능 추가
  // useEffect 부분 수정
  useEffect(() => {
    // 실제 앱에서는 API 호출로 데이터를 가져옵니다
    const fetchPost = () => {
      setLoading(true)
      // 샘플 데이터에서 ID에 해당하는 포스트 찾기
      const foundPost = SAMPLE_POSTS.find((post) => post.id === id) || SAMPLE_POSTS[0]

      setTimeout(() => {
        setPost(foundPost)
        setLocalLikes(foundPost.likes)
        setComments(foundPost.comments || [])
        setLoading(false)
      }, 500) // 로딩 시뮬레이션
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  const handleLike = () => {
    if (!liked) {
      setLocalLikes(localLikes + 1)
    } else {
      setLocalLikes(localLikes - 1)
    }
    setLiked(!liked)
  }

  const handleSave = () => {
    setSaved(!saved)
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const newCommentObj = {
        username: "current_user", // 실제 앱에서는 로그인한 사용자 정보 사용
        text: newComment,
      }
      setComments([...comments, newCommentObj])
      setNewComment("")
    }
  }

  // handlePairingRequest 함수 수정
  const handlePairingRequest = () => {
    setShowMenu(false)
    setToastMessage(`${post?.username}님에게 페어링 요청을 보냈습니다.`)
    setShowToast(true)
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

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto pt-20 px-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-700">포스트를 찾을 수 없습니다</h1>
            <button className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-lg" onClick={() => router.back()}>
              돌아가기
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 뒤로가기 버튼 클릭 시 스크롤 위치 복원
  const handleGoBack = () => {
    // router.back() 대신 window.history.back() 사용
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-20 px-4">
        {/* Back button */}
        <div className="mb-6">
          {/* 뒤로가기 버튼 부분 수정 */}
          <button onClick={handleGoBack} className="flex items-center gap-2 text-rose-600 font-medium">
            <ArrowLeft size={18} />
            <span>돌아가기</span>
          </button>
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Post Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={post.userAvatar || "/placeholder.svg"}
                  alt={post.username}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <Link href={`/profile/${post.username}`} className="font-semibold hover:underline">
                  {post.username}
                </Link>
                {post.location && (
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin size={12} className="mr-1" />
                    {post.location}
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowMenu(!showMenu)}>
                <MoreHorizontal size={20} />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 text-sm">
                  <button
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handlePairingRequest}
                  >
                    <UserPlus size={16} className="mr-2" />
                    <span>페어링 요청</span>
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <Share2 size={16} className="mr-2" />
                    <span>공유하기</span>
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <Flag size={16} className="mr-2" />
                    <span>신고하기</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Post Content */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square">
              <Image src={post.imageUrl || "/placeholder.svg"} alt="Post" fill className="object-cover" />
            </div>

            {/* Details */}
            <div className="flex flex-col h-full">
              {/* Book Info */}
              <div className="p-4 border-b">
                <div className="flex items-center mb-2">
                  <BookOpen size={18} className="text-rose-500 mr-2" />
                  <h2 className="font-semibold">{post.bookTitle}</h2>
                </div>
                <div className="text-sm text-gray-600">
                  <p>저자: {post.author}</p>
                  <div className="flex items-center mt-1">
                    <span>평점: </span>
                    <div className="flex ml-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={star <= Math.floor(post.rating) ? "#FFD700" : "none"}
                          stroke={star <= Math.floor(post.rating) ? "#FFD700" : "#D1D5DB"}
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-.181h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                      <span className="ml-1 text-xs">{post.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 flex-grow overflow-y-auto">
                <p className="text-sm mb-4">
                  <span className="font-semibold mr-1">{post.username}</span>
                  {post.caption}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag: string, index: number) => (
                      <Link key={index} href={`/stories?tag=${tag}`} className="text-rose-500 text-sm hover:underline">
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Timestamp */}
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <Clock size={12} className="mr-1" />
                  {post.timestamp}
                </div>

                {/* Comments */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">댓글 {comments.length}개</h3>
                  {comments.map((comment, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0"></div>
                      <div className="text-sm">
                        <span className="font-semibold mr-1">{comment.username}</span>
                        {comment.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 border-t">
                <div className="flex justify-between mb-3">
                  <div className="flex space-x-4">
                    <button onClick={handleLike} className={liked ? "text-rose-500" : "text-gray-700"}>
                      <Heart size={24} className={liked ? "fill-rose-500" : ""} />
                    </button>
                    <button className="text-gray-700">
                      <MessageCircle size={24} />
                    </button>
                    <button className="text-gray-700">
                      <Send size={24} />
                    </button>
                  </div>
                  <button onClick={handleSave} className={saved ? "text-black" : "text-gray-700"}>
                    <Bookmark size={24} className={saved ? "fill-black" : ""} />
                  </button>
                </div>

                <p className="font-semibold text-sm mb-2">{localLikes.toLocaleString()} likes</p>

                {/* Comment form */}
                <form onSubmit={handleSubmitComment} className="flex items-center">
                  <Smile size={24} className="text-gray-500 mr-3" />
                  <input
                    type="text"
                    placeholder="댓글 추가..."
                    className="flex-1 border-none outline-none text-sm"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    type="submit"
                    className={`text-rose-500 font-semibold text-sm ${!newComment.trim() ? "opacity-50 cursor-default" : ""}`}
                    disabled={!newComment.trim()}
                  >
                    게시
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">관련 포스트</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SAMPLE_POSTS.filter((p) => p.id !== post.id).map((relatedPost) => (
              <div
                key={relatedPost.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
                onClick={() => router.push(`/post/${relatedPost.id}`)}
              >
                <div className="aspect-square relative">
                  <Image
                    src={relatedPost.imageUrl || "/placeholder.svg"}
                    alt="Related post"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={relatedPost.userAvatar || "/placeholder.svg"}
                        alt={relatedPost.username}
                        width={24}
                        height={24}
                        className="object-cover"
                      />
                    </div>
                    <span className="font-semibold text-sm">{relatedPost.username}</span>
                  </div>
                  <p className="text-sm line-clamp-2">{relatedPost.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  )
}

