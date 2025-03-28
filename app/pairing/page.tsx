"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import {
  ArrowLeft,
  Bell,
  Users,
  Search,
  Filter,
  X,
  MessageSquare,
  BookOpen,
  Heart,
  Send,
  ChevronLeft,
  Check,
  Trash2,
  MessageCircle,
} from "lucide-react"
import ToastNotification from "@/components/toast-notification"

// 샘플 데이터 - 페어링 요청
const SAMPLE_REQUESTS = [
  {
    id: 1,
    username: "literature_lover",
    userAvatar: "/placeholder.svg?height=100&width=100",
    bio: "문학과 철학을 사랑하는 독서가입니다. 주로 고전 문학과 현대 소설을 읽습니다.",
    commonInterests: ["문학", "철학", "고전"],
    requestDate: "2023-12-01",
    status: "pending",
  },
  {
    id: 2,
    username: "book_explorer",
    userAvatar: "/placeholder.svg?height=100&width=100",
    bio: "다양한 장르의 책을 탐험하는 것을 좋아합니다. 특히 SF와 판타지 소설에 관심이 많습니다.",
    commonInterests: ["SF", "판타지", "소설"],
    requestDate: "2023-12-03",
    status: "pending",
  },
  {
    id: 3,
    username: "poetry_dreamer",
    userAvatar: "/placeholder.svg?height=100&width=100",
    bio: "시와 에세이를 사랑하는 감성적인 독자입니다. 시집을 모으는 취미가 있어요.",
    commonInterests: ["시", "에세이", "감성"],
    requestDate: "2023-12-05",
    status: "pending",
  },
]

// 샘플 데이터 - 페어링 친구
const SAMPLE_FRIENDS = [
  {
    id: 101,
    username: "classic_reader",
    userAvatar: "/placeholder.svg?height=100&width=100",
    bio: "고전 문학을 주로 읽는 독서가입니다. 톨스토이, 도스토예프스키, 헤밍웨이를 좋아합니다.",
    commonInterests: ["고전", "러시아 문학", "미국 문학"],
    lastActive: "1시간 전",
    currentlyReading: "안나 카레니나",
    matchScore: 92,
  },
  {
    id: 102,
    username: "mystery_detective",
    userAvatar: "/placeholder.svg?height=100&width=100",
    bio: "추리 소설과 미스터리를 좋아합니다. 셜록 홈즈 시리즈의 열렬한 팬입니다.",
    commonInterests: ["추리", "미스터리", "범죄"],
    lastActive: "오늘",
    currentlyReading: "오리엔트 특급 살인",
    matchScore: 85,
  },
  {
    id: 103,
    username: "sci_fi_voyager",
    userAvatar: "/placeholder.svg?height=100&width=100",
    bio: "SF와 우주 탐험 소설을 좋아합니다. 아이작 아시모프와 아서 C. 클라크의 팬입니다.",
    commonInterests: ["SF", "우주", "과학"],
    lastActive: "어제",
    currentlyReading: "파운데이션",
    matchScore: 78,
  },
  {
    id: 104,
    username: "romance_reader",
    userAvatar: "/placeholder.svg?height=100&width=100",
    bio: "로맨스 소설과 감성적인 이야기를 좋아합니다. 사랑과 인간 관계에 관한 책을 주로 읽어요.",
    commonInterests: ["로맨스", "감성", "인간관계"],
    lastActive: "3일 전",
    currentlyReading: "오만과 편견",
    matchScore: 73,
  },
]

// 샘플 데이터 - 메시지
const SAMPLE_MESSAGES = [
  {
    id: 201,
    conversationId: 1001,
    friendId: 101,
    username: "classic_reader",
    userAvatar: "/placeholder.svg?height=100&width=100",
    lastMessage: "안녕하세요! 톨스토이의 '안나 카레니나'에 대해 이야기해볼까요?",
    timestamp: "10분 전",
    unread: true,
    messages: [
      {
        id: 1,
        senderId: 101,
        senderName: "classic_reader",
        text: "안녕하세요! 페어링 친구가 되어 기쁩니다.",
        timestamp: "어제, 오후 3:24",
        read: true,
      },
      {
        id: 2,
        senderId: "me",
        senderName: "나",
        text: "안녕하세요! 저도 반가워요. 어떤 책을 좋아하시나요?",
        timestamp: "어제, 오후 4:15",
        read: true,
      },
      {
        id: 3,
        senderId: 101,
        senderName: "classic_reader",
        text: "저는 주로 고전 문학을 읽어요. 특히 러시아 문학을 좋아합니다. 톨스토이, 도스토예프스키 같은 작가들이요.",
        timestamp: "어제, 오후 4:30",
        read: true,
      },
      {
        id: 4,
        senderId: "me",
        senderName: "나",
        text: "저도 고전 문학을 좋아해요! 최근에 읽은 책이 있으신가요?",
        timestamp: "어제, 오후 5:10",
        read: true,
      },
      {
        id: 5,
        senderId: 101,
        senderName: "classic_reader",
        text: "지금 '안나 카레니나'를 읽고 있어요. 정말 훌륭한 작품이에요.",
        timestamp: "어제, 오후 5:45",
        read: true,
      },
      {
        id: 6,
        senderId: 101,
        senderName: "classic_reader",
        text: "안녕하세요! 톨스토이의 '안나 카레니나'에 대해 이야기해볼까요?",
        timestamp: "10분 전",
        read: false,
      },
    ],
  },
  {
    id: 202,
    conversationId: 1002,
    friendId: 102,
    username: "mystery_detective",
    userAvatar: "/placeholder.svg?height=100&width=100",
    lastMessage: "추리 소설 독서 모임에 같이 참여해보는 건 어떨까요?",
    timestamp: "1시간 전",
    unread: false,
    messages: [
      {
        id: 1,
        senderId: 102,
        senderName: "mystery_detective",
        text: "안녕하세요! 추리 소설 좋아하시나요?",
        timestamp: "3일 전, 오전 10:15",
        read: true,
      },
      {
        id: 2,
        senderId: "me",
        senderName: "나",
        text: "네, 아가사 크리스티의 작품을 특히 좋아해요.",
        timestamp: "3일 전, 오전 11:30",
        read: true,
      },
      {
        id: 3,
        senderId: 102,
        senderName: "mystery_detective",
        text: "저도 아가사 크리스티 팬이에요! '오리엔트 특급 살인'을 읽어보셨나요?",
        timestamp: "3일 전, 오후 1:20",
        read: true,
      },
      {
        id: 4,
        senderId: "me",
        senderName: "나",
        text: "물론이죠! 정말 훌륭한 작품이에요. 포와로의 추리 과정이 특히 인상적이었어요.",
        timestamp: "3일 전, 오후 2:45",
        read: true,
      },
      {
        id: 5,
        senderId: 102,
        senderName: "mystery_detective",
        text: "추리 소설 독서 모임에 같이 참여해보는 건 어떨까요?",
        timestamp: "1시간 전",
        read: true,
      },
    ],
  },
  {
    id: 203,
    conversationId: 1003,
    friendId: 103,
    username: "sci_fi_voyager",
    userAvatar: "/placeholder.svg?height=100&width=100",
    lastMessage: "아시모프의 '파운데이션' 시리즈에 대한 생각이 궁금해요.",
    timestamp: "어제",
    unread: true,
    messages: [
      {
        id: 1,
        senderId: 103,
        senderName: "sci_fi_voyager",
        text: "안녕하세요! SF 소설에 관심 있으신가요?",
        timestamp: "1주일 전, 오후 6:10",
        read: true,
      },
      {
        id: 2,
        senderId: "me",
        senderName: "나",
        text: "네, 특히 우주를 배경으로 한 SF를 좋아해요.",
        timestamp: "1주일 전, 오후 7:25",
        read: true,
      },
      {
        id: 3,
        senderId: 103,
        senderName: "sci_fi_voyager",
        text: "저도 그런 작품을 좋아해요! 아이작 아시모프의 작품을 읽어보셨나요?",
        timestamp: "1주일 전, 오후 8:30",
        read: true,
      },
      {
        id: 4,
        senderId: 103,
        senderName: "sci_fi_voyager",
        text: "아시모프의 '파운데이션' 시리즈에 대한 생각이 궁금해요.",
        timestamp: "어제",
        read: false,
      },
    ],
  },
]

export default function PairingPage() {
  const [activeTab, setActiveTab] = useState<"requests" | "friends" | "messages">("requests")
  const [requests, setRequests] = useState(SAMPLE_REQUESTS)
  const [friends, setFriends] = useState(SAMPLE_FRIENDS)
  const [messages, setMessages] = useState(SAMPLE_MESSAGES)
  const [searchTerm, setSearchTerm] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success")
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState<"recent" | "matchScore">("recent")
  const [selectedConversation, setSelectedConversation] = useState<any | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const messageEndRef = useRef<HTMLDivElement>(null)
  const messageInputRef = useRef<HTMLInputElement>(null)

  // 검색어에 따라 필터링된 목록
  const filteredRequests = requests.filter(
    (request) =>
      request.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.commonInterests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const filteredFriends = friends.filter(
    (friend) =>
      friend.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.commonInterests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase())) ||
      friend.currentlyReading.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredMessages = messages.filter(
    (message) =>
      message.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 정렬된 친구 목록
  const sortedFriends = [...filteredFriends].sort((a, b) => {
    if (sortBy === "matchScore") {
      return b.matchScore - a.matchScore
    }
    // 기본은 최근 활동순
    return a.lastActive.localeCompare(b.lastActive)
  })

  // 메시지 스크롤 자동 이동
  useEffect(() => {
    if (messageEndRef.current && selectedConversation) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedConversation])

  // 메시지 읽음 처리
  useEffect(() => {
    if (selectedConversation) {
      // 선택된 대화의 모든 메시지를 읽음 처리
      const updatedMessages = messages.map((msg) => {
        if (msg.id === selectedConversation.id) {
          // 모든 메시지를 읽음 처리
          const updatedConversation = {
            ...msg,
            unread: false,
            messages: msg.messages.map((m) => ({ ...m, read: true })),
          }
          return updatedConversation
        }
        return msg
      })
      setMessages(updatedMessages)
    }
  }, [selectedConversation])

  // 페어링 요청 수락
  const handleAcceptRequest = (id: number) => {
    // 실제 구현에서는 API 호출로 처리
    const acceptedRequest = requests.find((req) => req.id === id)
    if (acceptedRequest) {
      // 요청 목록에서 제거
      setRequests(requests.filter((req) => req.id !== id))

      // 친구 목록에 추가 (실제로는 서버에서 처리)
      const newFriend = {
        id: 1000 + id,
        username: acceptedRequest.username,
        userAvatar: acceptedRequest.userAvatar,
        bio: acceptedRequest.bio,
        commonInterests: acceptedRequest.commonInterests,
        lastActive: "방금 전",
        currentlyReading: "알 수 없음",
        matchScore: Math.floor(Math.random() * 20) + 80, // 80-99 사이의 랜덤 점수
      }
      setFriends([newFriend, ...friends])

      // 토스트 메시지 표시
      setToastMessage(`${acceptedRequest.username}님과 페어링이 완료되었습니다.`)
      setToastType("success")
      setShowToast(true)
    }
  }

  // 페어링 요청 거절
  const handleRejectRequest = (id: number) => {
    // 실제 구현에서는 API 호출로 처리
    const rejectedRequest = requests.find((req) => req.id === id)
    if (rejectedRequest) {
      setRequests(requests.filter((req) => req.id !== id))
      setToastMessage(`${rejectedRequest.username}님의 페어링 요청을 거절했습니다.`)
      setToastType("info")
      setShowToast(true)
    }
  }

  // 페어링 친구 삭제
  const handleRemoveFriend = (id: number) => {
    // 실제 구현에서는 API 호출로 처리
    const removedFriend = friends.find((friend) => friend.id === id)
    if (removedFriend) {
      setFriends(friends.filter((friend) => friend.id !== id))
      setToastMessage(`${removedFriend.username}님과의 페어링이 해제되었습니다.`)
      setToastType("info")
      setShowToast(true)
    }
  }

  // 대화 선택
  const handleSelectConversation = (conversation: any) => {
    setSelectedConversation(conversation)
    // 메시지 입력 필드에 포커스
    setTimeout(() => {
      if (messageInputRef.current) {
        messageInputRef.current.focus()
      }
    }, 100)
  }

  // 대화 나가기
  const handleBackToList = () => {
    setSelectedConversation(null)
  }

  // 메시지 전송
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return

    // 새 메시지 객체 생성
    const newMessageObj = {
      id: Date.now(),
      senderId: "me",
      senderName: "나",
      text: newMessage,
      timestamp: "방금 전",
      read: true,
    }

    // 메시지 목록 업데이트
    const updatedMessages = messages.map((msg) => {
      if (msg.id === selectedConversation.id) {
        return {
          ...msg,
          lastMessage: newMessage,
          timestamp: "방금 전",
          messages: [...msg.messages, newMessageObj],
        }
      }
      return msg
    })

    setMessages(updatedMessages)
    setNewMessage("")

    // 선택된 대화 업데이트
    setSelectedConversation({
      ...selectedConversation,
      lastMessage: newMessage,
      timestamp: "방금 전",
      messages: [...selectedConversation.messages, newMessageObj],
    })
  }

  // 대화 삭제
  const handleDeleteConversation = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    // 실제 구현에서는 API 호출로 처리
    setMessages(messages.filter((msg) => msg.id !== id))
    if (selectedConversation && selectedConversation.id === id) {
      setSelectedConversation(null)
    }
    setToastMessage("대화가 삭제되었습니다.")
    setToastType("info")
    setShowToast(true)
  }

  // 친구에게 메시지 보내기
  const handleMessageFriend = (friendId: number) => {
    // 이미 대화가 있는지 확인
    const existingConversation = messages.find((msg) => msg.friendId === friendId)

    if (existingConversation) {
      // 기존 대화 선택
      handleSelectConversation(existingConversation)
      setActiveTab("messages")
    } else {
      // 새 대화 생성
      const friend = friends.find((f) => f.id === friendId)
      if (friend) {
        const newConversation = {
          id: Date.now(),
          conversationId: Date.now() + 1000,
          friendId: friend.id,
          username: friend.username,
          userAvatar: friend.userAvatar,
          lastMessage: "",
          timestamp: "방금 전",
          unread: false,
          messages: [],
        }

        setMessages([newConversation, ...messages])
        handleSelectConversation(newConversation)
        setActiveTab("messages")

        // 메시지 입력 필드에 포커스
        setTimeout(() => {
          if (messageInputRef.current) {
            messageInputRef.current.focus()
          }
        }, 100)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-20 px-4 pb-16">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 text-rose-600 font-medium"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} />
              <span>홈으로 돌아가기</span>
            </motion.button>
          </Link>
        </div>

        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-rose-600 mb-2">페어링 관리</h1>
          <p className="text-gray-600">독서 취향이 비슷한 친구들과 연결하고 함께 독서 여정을 즐겨보세요</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "requests"
                ? "border-rose-500 text-rose-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("requests")}
          >
            <Bell size={18} />
            <span>페어링 요청</span>
            {requests.length > 0 && (
              <span className="ml-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {requests.length}
              </span>
            )}
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "friends"
                ? "border-rose-500 text-rose-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("friends")}
          >
            <Users size={18} />
            <span>페어링 친구</span>
            {friends.length > 0 && (
              <span className="ml-1 bg-gray-200 text-gray-700 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {friends.length}
              </span>
            )}
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "messages"
                ? "border-rose-500 text-rose-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("messages")}
          >
            <MessageSquare size={18} />
            <span>메시지</span>
            {messages.filter((m) => m.unread).length > 0 && (
              <span className="ml-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {messages.filter((m) => m.unread).length}
              </span>
            )}
          </button>
        </div>

        {/* Search and Filter */}
        {!selectedConversation && (
          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={
                  activeTab === "requests"
                    ? "페어링 요청 검색..."
                    : activeTab === "friends"
                      ? "페어링 친구 검색..."
                      : "메시지 검색..."
                }
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
            {activeTab === "friends" && (
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={`p-2 rounded-lg border ${
                    filterOpen ? "border-rose-500 text-rose-500" : "border-gray-300 text-gray-500"
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
                    <h4 className="font-medium text-sm text-gray-700 mb-2">정렬 기준</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="sortBy"
                          checked={sortBy === "recent"}
                          onChange={() => setSortBy("recent")}
                          className="text-rose-500 focus:ring-rose-500"
                        />
                        <span>최근 활동순</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="sortBy"
                          checked={sortBy === "matchScore"}
                          onChange={() => setSortBy("matchScore")}
                          className="text-rose-500 focus:ring-rose-500"
                        />
                        <span>매칭 점수순</span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        {activeTab === "requests" ? (
          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                {searchTerm ? (
                  <>
                    <div className="text-gray-400 mb-3">
                      <Search size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">검색 결과가 없습니다</h3>
                    <p className="text-gray-500 text-sm">다른 검색어로 시도해보세요.</p>
                  </>
                ) : (
                  <>
                    <div className="text-gray-400 mb-3">
                      <Bell size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">새로운 페어링 요청이 없습니다</h3>
                    <p className="text-gray-500 text-sm">
                      다른 독자들이 당신에게 페어링 요청을 보내면 여기에 표시됩니다.
                    </p>
                  </>
                )}
              </div>
            ) : (
              filteredRequests.map((request) => (
                <motion.div
                  key={request.id}
                  className="bg-white rounded-lg shadow-sm p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={request.userAvatar || "/placeholder.svg"}
                        alt={request.username}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Link href={`/profile/${request.username}`} className="font-semibold hover:underline">
                          {request.username}
                        </Link>
                        <span className="text-xs text-gray-500">{request.requestDate}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1 mb-2">{request.bio}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {request.commonInterests.map((interest, index) => (
                          <span key={index} className="px-2 py-1 bg-rose-50 text-rose-600 text-xs rounded-full">
                            {interest}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm transition-colors"
                        >
                          거절
                        </button>
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          className="px-3 py-1 bg-rose-500 text-white rounded hover:bg-rose-600 text-sm transition-colors"
                        >
                          수락
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        ) : activeTab === "friends" ? (
          <div className="space-y-4">
            {filteredFriends.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                {searchTerm ? (
                  <>
                    <div className="text-gray-400 mb-3">
                      <Search size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">검색 결과가 없습니다</h3>
                    <p className="text-gray-500 text-sm">다른 검색어로 시도해보세요.</p>
                  </>
                ) : (
                  <>
                    <div className="text-gray-400 mb-3">
                      <Users size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">페어링 친구가 없습니다</h3>
                    <p className="text-gray-500 text-sm">
                      페어링 요청을 수락하거나 다른 독자들에게 페어링을 요청해보세요.
                    </p>
                  </>
                )}
              </div>
            ) : (
              sortedFriends.map((friend) => (
                <motion.div
                  key={friend.id}
                  className="bg-white rounded-lg shadow-sm p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={friend.userAvatar || "/placeholder.svg"}
                        alt={friend.username}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Link href={`/profile/${friend.username}`} className="font-semibold hover:underline">
                            {friend.username}
                          </Link>
                          <div className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full text-xs">
                            <Heart size={12} className="fill-rose-500" />
                            <span>{friend.matchScore}% 매칭</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">최근 활동: {friend.lastActive}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1 mb-2">{friend.bio}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {friend.commonInterests.map((interest, index) => (
                          <span key={index} className="px-2 py-1 bg-rose-50 text-rose-600 text-xs rounded-full">
                            {interest}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <BookOpen size={16} />
                          <span>현재 읽는 책: {friend.currentlyReading}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleMessageFriend(friend.id)}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                          >
                            <MessageSquare size={18} />
                          </button>
                          <button
                            onClick={() => handleRemoveFriend(friend.id)}
                            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        ) : (
          // Messages Tab
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {selectedConversation ? (
              // Conversation Detail View
              <div className="flex flex-col h-[70vh]">
                {/* Conversation Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleBackToList}
                      className="p-1 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={selectedConversation.userAvatar || "/placeholder.svg"}
                          alt={selectedConversation.username}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/profile/${selectedConversation.username}`}
                          className="font-semibold hover:underline"
                        >
                          {selectedConversation.username}
                        </Link>
                        <p className="text-xs text-gray-500">페어링 친구</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => handleDeleteConversation(selectedConversation.id, {} as React.MouseEvent)}
                      className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  {selectedConversation.messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500">
                      <MessageCircle size={48} className="mb-2 text-gray-300" />
                      <p className="text-center">
                        아직 메시지가 없습니다.
                        <br />첫 메시지를 보내보세요!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedConversation.messages.map((message: any) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                        >
                          <div className="max-w-[70%]">
                            {message.senderId !== "me" && (
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-6 h-6 rounded-full overflow-hidden">
                                  <Image
                                    src={selectedConversation.userAvatar || "/placeholder.svg"}
                                    alt={message.senderName}
                                    width={24}
                                    height={24}
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-xs text-gray-500">{message.senderName}</span>
                              </div>
                            )}
                            <div className="flex items-end gap-2">
                              {message.senderId === "me" && (
                                <span className="text-xs text-gray-500 mb-1">{message.timestamp}</span>
                              )}
                              <div
                                className={`p-3 rounded-lg ${
                                  message.senderId === "me"
                                    ? "bg-rose-500 text-white"
                                    : "bg-white border border-gray-200"
                                }`}
                              >
                                <p className="text-sm">{message.text}</p>
                              </div>
                              {message.senderId !== "me" && (
                                <span className="text-xs text-gray-500 mb-1">{message.timestamp}</span>
                              )}
                            </div>
                            {message.senderId === "me" && message.read && (
                              <div className="flex justify-end mt-1">
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Check size={12} className="mr-1" />
                                  읽음
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      <div ref={messageEndRef} />
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-3 border-t flex items-center gap-2">
                  <input
                    type="text"
                    ref={messageInputRef}
                    placeholder="메시지를 입력하세요..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className={`p-2 rounded-full ${
                      newMessage.trim() ? "bg-rose-500 text-white hover:bg-rose-600" : "bg-gray-200 text-gray-400"
                    } transition-colors`}
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            ) : (
              // Conversations List
              <>
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-12">
                    {searchTerm ? (
                      <>
                        <div className="text-gray-400 mb-3">
                          <Search size={48} className="mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-1">검색 결과가 없습니다</h3>
                        <p className="text-gray-500 text-sm">다른 검색어로 시도해보세요.</p>
                      </>
                    ) : (
                      <>
                        <div className="text-gray-400 mb-3">
                          <MessageSquare size={48} className="mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-1">메시지가 없습니다</h3>
                        <p className="text-gray-500 text-sm">페어링 친구에게 메시지를 보내면 여기에 표시됩니다.</p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${message.unread ? "bg-rose-50" : ""}`}
                        onClick={() => handleSelectConversation(message)}
                        whileHover={{ backgroundColor: "rgba(254, 242, 242, 0.6)" }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                              <Image
                                src={message.userAvatar || "/placeholder.svg"}
                                alt={message.username}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                            {message.unread && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                              <h3 className="font-semibold text-gray-800 truncate">{message.username}</h3>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">{message.timestamp}</span>
                                <button
                                  onClick={(e) => handleDeleteConversation(message.id, e)}
                                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </div>
                            <p
                              className={`text-sm truncate ${message.unread ? "font-medium text-gray-800" : "text-gray-600"}`}
                            >
                              {message.lastMessage || "새로운 대화를 시작하세요"}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
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

