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
  MoreHorizontal,
  ArrowLeft,
  Share2,
  Flag,
  UserPlus,
  Clock,
  MapPin,
  BookOpen,
  Calendar,
  Users,
  HelpCircle,
  CheckCircle,
  X,
  MessageCircle,
} from "lucide-react"

// 샘플 데이터
const SAMPLE_DISCUSSIONS = [
  {
    id: "1",
    username: "literature_prof",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    title: "현대 문학에서의 윤리적 딜레마",
    bookTitle: "데미안",
    author: "헤르만 헤세",
    discussionDate: "2023-12-15",
    mainTopic:
      "헤르만 헤세의 '데미안'에서 나타나는 선과 악의 경계, 자아 발견의 과정에서 마주하는 윤리적 딜레마에 대해 토론해보고자 합니다. 주인공 싱클레어가 겪는 내적 갈등과 성장 과정은 현대인의 자아 정체성 문제와 어떻게 연결될 수 있을까요?",
    questions: [
      "데미안에서 나타나는 '선과 악의 경계'는 현대 사회에서 어떻게 해석될 수 있을까요?",
      "싱클레어의 자아 발견 과정은 현대인의 정체성 탐색과 어떤 유사점이 있나요?",
      "작품에서 등장하는 '아브락사스'의 상징성은 무엇이며, 이것이 우리 삶에 주는 메시지는 무엇일까요?",
      "데미안과 싱클레어의 관계는 멘토와 제자의 관계를 넘어서 어떤 의미를 가지고 있나요?",
    ],
    maxParticipants: 12,
    currentParticipants: 8,
    tags: ["문학", "철학", "자아", "윤리"],
    likes: 42,
    timestamp: "3 days ago",
    location: "온라인 줌 미팅",
    comments: [
      { username: "book_lover", text: "이 주제 정말 흥미롭네요! 참여하고 싶습니다." },
      { username: "philosophy_student", text: "아브락사스의 상징성에 대해 깊이 토론해보고 싶어요." },
      { username: "lit_critic", text: "현대적 관점에서 재해석하는 것이 중요할 것 같습니다." },
    ],
  },
  {
    id: "2",
    username: "sci_fi_enthusiast",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    title: "과학기술의 발전과 인간성의 미래",
    bookTitle: "프랑켄슈타인",
    author: "메리 셸리",
    discussionDate: "2023-12-20",
    mainTopic:
      "메리 셸리의 '프랑켄슈타인'은 과학기술의 발전과 그에 따른 윤리적 책임에 대한 선구적인 작품입니다. 현대 과학기술의 급속한 발전 속에서 이 고전 작품이 던지는 질문들을 함께 고민해보고자 합니다.",
    questions: [
      "프랑켄슈타인 박사의 창조물에 대한 책임 회피는 현대 과학자들의 윤리적 딜레마와 어떻게 연결될 수 있을까요?",
      "인공지능과 생명공학의 발전은 '인간이란 무엇인가'라는 질문에 어떤 새로운 관점을 제시하나요?",
      "작품에서 나타나는 '자연 vs 기술'의 대립은 현대 환경 문제와 어떻게 연결될 수 있을까요?",
    ],
    maxParticipants: 15,
    currentParticipants: 7,
    tags: ["과학", "윤리", "기술", "문학"],
    likes: 38,
    timestamp: "5 days ago",
    location: "페어링북 카페",
    comments: [
      { username: "tech_ethics", text: "AI 윤리와 연결지어 생각해볼 수 있는 좋은 주제네요." },
      { username: "bioethics_prof", text: "생명공학의 윤리적 측면에서 많은 시사점을 주는 작품입니다." },
    ],
  },
  {
    id: "3",
    username: "history_buff",
    userAvatar: "/placeholder.svg?height=100&width=100",
    imageUrl: "/placeholder.svg?height=600&width=600",
    title: "역사 속 여성의 목소리",
    bookTitle: "제인 에어",
    author: "샬롯 브론테",
    discussionDate: "2023-12-25",
    mainTopic:
      "빅토리아 시대의 사회적 제약 속에서 자신의 목소리를 찾아가는 제인 에어의 여정을 통해, 역사 속 여성의 지위와 현대 사회에서의 여성의 역할 변화에 대해 토론합니다.",
    questions: [
      "제인 에어가 당시 사회적 규범에 도전하는 방식은 어떤 의미를 가지나요?",
      "작품 속 버사 메이슨의 존재는 어떤 상징성을 가지며, 이를 통해 작가가 전하고자 한 메시지는 무엇일까요?",
      "현대 페미니즘의 관점에서 제인 에어를 어떻게 재해석할 수 있을까요?",
      "작품에서 나타나는 계급과 젠더의 교차성은 현대 사회에 어떤 시사점을 줄 수 있을까요?",
    ],
    maxParticipants: 20,
    currentParticipants: 15,
    tags: ["페미니즘", "문학", "역사", "사회"],
    likes: 56,
    timestamp: "1 week ago",
    location: "페어링북 독서모임",
    comments: [
      { username: "feminist_reader", text: "현대적 관점에서 재해석하는 토론이 기대됩니다." },
      { username: "victorian_lit", text: "빅토리아 시대 문학의 맥락에서 중요한 작품이죠." },
      { username: "gender_studies", text: "젠더와 계급의 교차성 측면에서 분석해보고 싶어요." },
    ],
  },
]

export default function DiscussionDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [discussion, setDiscussion] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [localLikes, setLocalLikes] = useState(0)
  const [comments, setComments] = useState<any[]>([])
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [joined, setJoined] = useState(false)

  // 상태 변수 추가
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  // useEffect 부분 수정
  useEffect(() => {
    // 실제 앱에서는 API 호출로 데이터를 가져옵니다
    const fetchDiscussion = () => {
      setLoading(true)
      // 샘플 데이터에서 ID에 해당하는 토론 찾기
      const foundDiscussion = SAMPLE_DISCUSSIONS.find((discussion) => discussion.id === id) || SAMPLE_DISCUSSIONS[0]

      setTimeout(() => {
        setDiscussion(foundDiscussion)
        setLocalLikes(foundDiscussion.likes)
        setComments(foundDiscussion.comments || [])
        setLoading(false)
      }, 500) // 로딩 시뮬레이션
    }

    if (id) {
      fetchDiscussion()
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

  const handleJoinDiscussion = () => {
    setShowJoinModal(false)
    setJoined(true)
    setToastMessage("토론 참여가 완료되었습니다. 토론 날짜에 이메일로 알림을 보내드립니다.")
    setShowToast(true)
  }

  // handlePairingRequest 함수 수정
  const handlePairingRequest = () => {
    setShowMenu(false)
    setToastMessage(`${discussion?.username}님에게 페어링 요청을 보냈습니다.`)
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

  if (!discussion) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto pt-20 px-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-700">토론을 찾을 수 없습니다</h1>
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
          {/* Discussion Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={discussion.userAvatar || "/placeholder.svg"}
                  alt={discussion.username}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <Link href={`/profile/${discussion.username}`} className="font-semibold hover:underline">
                  {discussion.username}
                </Link>
                {discussion.location && (
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin size={12} className="mr-1" />
                    {discussion.location}
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

          {/* Discussion Content */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square">
              <Image src={discussion.imageUrl || "/placeholder.svg"} alt="Discussion" fill className="object-cover" />
            </div>

            {/* Details */}
            <div className="flex flex-col h-full">
              {/* Book Info */}
              <div className="p-4 border-b">
                <h1 className="text-xl font-bold text-gray-800 mb-2">{discussion.title}</h1>
                <div className="flex items-center mb-2">
                  <BookOpen size={18} className="text-rose-500 mr-2" />
                  <h2 className="font-semibold">{discussion.bookTitle}</h2>
                </div>
                <div className="text-sm text-gray-600">
                  <p>저자: {discussion.author}</p>
                  <div className="flex items-center mt-2">
                    <Calendar size={16} className="text-gray-500 mr-2" />
                    <span>토론 예정일: {discussion.discussionDate}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Users size={16} className="text-gray-500 mr-2" />
                    <span>
                      참가자: {discussion.currentParticipants}/{discussion.maxParticipants}명
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Topic */}
              <div className="p-4 flex-grow overflow-y-auto">
                <h3 className="font-semibold text-gray-800 mb-2">주요 토론 주제</h3>
                <p className="text-sm text-gray-700 mb-4">{discussion.mainTopic}</p>

                {/* Tags */}
                {discussion.tags && discussion.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {discussion.tags.map((tag: string, index: number) => (
                      <Link key={index} href={`/stories?tag=${tag}`} className="text-rose-500 text-sm hover:underline">
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Timestamp */}
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <Clock size={12} className="mr-1" />
                  {discussion.timestamp}
                </div>

                {/* Join Button */}
                {!joined ? (
                  <button
                    onClick={() => setShowJoinModal(true)}
                    className="w-full py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                  >
                    토론 참여하기
                  </button>
                ) : (
                  <button className="w-full py-2 bg-green-500 text-white rounded-lg cursor-default">
                    <CheckCircle size={16} className="inline mr-2" />
                    참여 완료
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Questions Section */}
        <motion.div
          className="mt-8 bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-4 border-b">
            <h3 className="text-xl font-semibold text-gray-800">토론 질문</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {discussion.questions.map((question: string, index: number) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  <HelpCircle size={24} className="text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-800 font-medium">질문 {index + 1}</p>
                    <p className="text-gray-700">{question}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          className="mt-8 bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">댓글</h3>
            <span className="bg-gray-200 text-gray-700 text-sm rounded-full px-2 py-0.5">{comments.length}개</span>
          </div>
          <div className="p-4">
            {comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle size={32} className="mx-auto mb-2 text-gray-300" />
                <p>첫 번째 댓글을 남겨보세요!</p>
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                {comments.map((comment, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
                    <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-800">{comment.username}</span>
                        <span className="text-xs text-gray-500">방금 전</span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Comment form */}
            <form onSubmit={handleSubmitComment} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
              <input
                type="text"
                placeholder="댓글 작성하기..."
                className="flex-1 border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-rose-300"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                type="submit"
                className={`px-4 py-2 bg-rose-500 text-white rounded-full font-medium ${!newComment.trim() ? "opacity-50 cursor-default" : "hover:bg-rose-600"}`}
                disabled={!newComment.trim()}
              >
                게시
              </button>
            </form>
          </div>
        </motion.div>

        {/* Related Discussions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">관련 토론</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SAMPLE_DISCUSSIONS.filter((d) => d.id !== discussion.id).map((relatedDiscussion) => (
              <div
                key={relatedDiscussion.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
                onClick={() => router.push(`/discussion/${relatedDiscussion.id}`)}
              >
                <div className="aspect-square relative">
                  <Image
                    src={relatedDiscussion.imageUrl || "/placeholder.svg"}
                    alt="Related discussion"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={relatedDiscussion.userAvatar || "/placeholder.svg"}
                        alt={relatedDiscussion.username}
                        width={24}
                        height={24}
                        className="object-cover"
                      />
                    </div>
                    <span className="font-semibold text-sm">{relatedDiscussion.username}</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{relatedDiscussion.title}</h3>
                  <p className="text-xs text-gray-500">
                    {relatedDiscussion.bookTitle} | {relatedDiscussion.discussionDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">토론 참여하기</h3>
              <button onClick={() => setShowJoinModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">{discussion.title}</h4>
              <p className="text-sm text-gray-600 mb-2">
                <BookOpen size={16} className="inline mr-1" /> {discussion.bookTitle} ({discussion.author})
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <Calendar size={16} className="inline mr-1" /> 토론 예정일: {discussion.discussionDate}
              </p>
              <p className="text-sm text-gray-600">
                <Users size={16} className="inline mr-1" /> 참가자: {discussion.currentParticipants}/
                {discussion.maxParticipants}명
              </p>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-yellow-800">
                <span className="font-semibold">참고:</span> 토론에 참여하시면 토론 날짜에 이메일로 알림을 보내드립니다.
                토론은 온라인 또는 오프라인으로 진행될 수 있습니다.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowJoinModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleJoinDiscussion}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
              >
                참여하기
              </button>
            </div>
          </motion.div>
        </div>
      )}

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

