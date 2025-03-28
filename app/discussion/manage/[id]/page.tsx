"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Share2,
  BookOpen,
  Users,
  HelpCircle,
  Mail,
  UserMinus,
  CheckCircle,
  XCircle,
  Play,
  AlertTriangle,
} from "lucide-react"
import ToastNotification from "@/components/toast-notification"

// 샘플 토론 발제문 데이터 (app/discussion/manage/page.tsx와 동일한 데이터 사용)
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
      {
        id: 1,
        username: "book_lover",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "book_lover@example.com",
        joinDate: "2023-11-25",
      },
      {
        id: 2,
        username: "philosophy_student",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "philosophy_student@example.com",
        joinDate: "2023-11-26",
      },
      {
        id: 3,
        username: "lit_critic",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "lit_critic@example.com",
        joinDate: "2023-11-27",
      },
    ],
    waitingList: [
      {
        id: 4,
        username: "new_reader",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "new_reader@example.com",
        requestDate: "2023-11-28",
      },
      {
        id: 5,
        username: "book_enthusiast",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "book_enthusiast@example.com",
        requestDate: "2023-11-29",
      },
    ],
    meetingLink: "https://zoom.us/j/1234567890",
    notes: "토론 전에 책의 1-5장을 꼭 읽어오세요. 토론은 약 2시간 동안 진행될 예정입니다.",
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
      {
        id: 4,
        username: "tech_ethics",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "tech_ethics@example.com",
        joinDate: "2023-11-20",
      },
      {
        id: 5,
        username: "bioethics_prof",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "bioethics_prof@example.com",
        joinDate: "2023-11-21",
      },
    ],
    waitingList: [],
    meetingLink: "",
    notes: "오프라인 모임입니다. 페어링북 카페는 강남역 3번 출구에서 도보 5분 거리에 있습니다.",
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
      {
        id: 6,
        username: "feminist_reader",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "feminist_reader@example.com",
        joinDate: "2023-11-12",
      },
      {
        id: 7,
        username: "victorian_lit",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "victorian_lit@example.com",
        joinDate: "2023-11-13",
      },
      {
        id: 8,
        username: "gender_studies",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "gender_studies@example.com",
        joinDate: "2023-11-14",
      },
    ],
    waitingList: [
      {
        id: 9,
        username: "literature_fan",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "literature_fan@example.com",
        requestDate: "2023-11-15",
      },
    ],
    meetingLink: "",
    notes: "토론 전에 책을 완독해오시기 바랍니다. 특히 제인과 로체스터의 관계 변화에 주목해주세요.",
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
      {
        id: 9,
        username: "existentialist",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "existentialist@example.com",
        joinDate: "2023-10-20",
      },
      {
        id: 10,
        username: "philosophy_major",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "philosophy_major@example.com",
        joinDate: "2023-10-21",
      },
      {
        id: 11,
        username: "absurdist",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "absurdist@example.com",
        joinDate: "2023-10-22",
      },
    ],
    waitingList: [],
    meetingLink: "https://zoom.us/j/9876543210",
    notes: "토론이 성공적으로 완료되었습니다. 참여해주신 모든 분들께 감사드립니다.",
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
      {
        id: 12,
        username: "russian_lit_fan",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "russian_lit_fan@example.com",
        joinDate: "2023-09-30",
      },
      {
        id: 13,
        username: "moral_philosophy",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "moral_philosophy@example.com",
        joinDate: "2023-10-01",
      },
      {
        id: 14,
        username: "crime_fiction",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "crime_fiction@example.com",
        joinDate: "2023-10-02",
      },
    ],
    waitingList: [],
    meetingLink: "",
    notes: "토론이 성공적으로 완료되었습니다. 깊이 있는 분석과 활발한 토론이 인상적이었습니다.",
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
      {
        id: 15,
        username: "murakami_fan",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "murakami_fan@example.com",
        joinDate: "2023-08-25",
      },
      {
        id: 16,
        username: "jazz_lover",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "jazz_lover@example.com",
        joinDate: "2023-08-26",
      },
      {
        id: 17,
        username: "modern_lit",
        avatar: "/placeholder.svg?height=50&width=50",
        email: "modern_lit@example.com",
        joinDate: "2023-08-27",
      },
    ],
    waitingList: [],
    meetingLink: "https://zoom.us/j/5555555555",
    notes: "주최자의 개인 사정으로 토론이 취소되었습니다. 양해 부탁드립니다.",
  },
]

export default function DiscussionDetailManagePage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params?.id)
  const [discussion, setDiscussion] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success")
  const [activeTab, setActiveTab] = useState<"info" | "participants" | "questions">("info")
  const [meetingLink, setMeetingLink] = useState("")
  const [notes, setNotes] = useState("")
  const [isEditingLink, setIsEditingLink] = useState(false)
  const [isEditingNotes, setIsEditingNotes] = useState(false)

  // 페이지 로드 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.paddingTop = "64px"
    return () => {
      document.body.style.paddingTop = "0"
    }
  }, [])

  // 토론 발제문 데이터 가져오기
  useEffect(() => {
    // 실제 앱에서는 API 호출로 데이터를 가져옵니다
    const fetchDiscussion = () => {
      setLoading(true)
      // 샘플 데이터에서 ID에 해당하는 토론 발제문 찾기
      const foundDiscussion = SAMPLE_DISCUSSIONS.find((discussion) => discussion.id === id)

      setTimeout(() => {
        if (foundDiscussion) {
          setDiscussion(foundDiscussion)
          setMeetingLink(foundDiscussion.meetingLink || "")
          setNotes(foundDiscussion.notes || "")
        }
        setLoading(false)
      }, 500) // 로딩 시뮬레이션
    }

    if (id) {
      fetchDiscussion()
    }
  }, [id])

  // 공개 여부 토글
  const handleTogglePublic = () => {
    if (discussion) {
      const updatedDiscussion = { ...discussion, isPublic: !discussion.isPublic }
      setDiscussion(updatedDiscussion)
      setToastMessage(`토론 발제문이 ${discussion.isPublic ? "비공개" : "공개"}로 설정되었습니다.`)
      setToastType("success")
      setShowToast(true)
    }
  }

  // 토론 발제문 삭제
  const handleDeleteDiscussion = () => {
    if (window.confirm("정말로 이 토론 발제문을 삭제하시겠습니까?")) {
      // 실제 앱에서는 API 호출로 삭제 처리
      setToastMessage("토론 발제문이 삭제되었습니다.")
      setToastType("info")
      setShowToast(true)

      // 삭제 후 목록 페이지로 이동
      setTimeout(() => {
        router.push("/discussion/manage")
      }, 1500)
    }
  }

  // 토론 상태 변경
  const handleChangeStatus = (status: "upcoming" | "ongoing" | "completed" | "cancelled") => {
    if (discussion) {
      const updatedDiscussion = { ...discussion, status }
      setDiscussion(updatedDiscussion)

      let message = ""
      switch (status) {
        case "upcoming":
          message = "토론이 예정됨으로 설정되었습니다."
          break
        case "ongoing":
          message = "토론이 진행 중으로 설정되었습니다."
          break
        case "completed":
          message = "토론이 완료됨으로 설정되었습니다."
          break
        case "cancelled":
          message = "토론이 취소됨으로 설정되었습니다."
          break
      }

      setToastMessage(message)
      setToastType("success")
      setShowToast(true)
    }
  }

  // 참가자 승인
  const handleApproveParticipant = (participantId: number) => {
    if (discussion) {
      const participant = discussion.waitingList.find((p: any) => p.id === participantId)
      if (participant) {
        // 대기 목록에서 제거하고 참가자 목록에 추가
        const updatedWaitingList = discussion.waitingList.filter((p: any) => p.id !== participantId)
        const updatedParticipants = [
          ...discussion.participants,
          { ...participant, joinDate: new Date().toISOString().split("T")[0] },
        ]

        const updatedDiscussion = {
          ...discussion,
          waitingList: updatedWaitingList,
          participants: updatedParticipants,
          currentParticipants: discussion.currentParticipants + 1,
        }

        setDiscussion(updatedDiscussion)
        setToastMessage(`${participant.username}님의 참가 요청이 승인되었습니다.`)
        setToastType("success")
        setShowToast(true)
      }
    }
  }

  // 참가자 거절
  const handleRejectParticipant = (participantId: number) => {
    if (discussion) {
      const participant = discussion.waitingList.find((p: any) => p.id === participantId)
      if (participant) {
        // 대기 목록에서 제거
        const updatedWaitingList = discussion.waitingList.filter((p: any) => p.id !== participantId)

        const updatedDiscussion = {
          ...discussion,
          waitingList: updatedWaitingList,
        }

        setDiscussion(updatedDiscussion)
        setToastMessage(`${participant.username}님의 참가 요청이 거절되었습니다.`)
        setToastType("info")
        setShowToast(true)
      }
    }
  }

  // 참가자 제거
  const handleRemoveParticipant = (participantId: number) => {
    if (discussion) {
      const participant = discussion.participants.find((p: any) => p.id === participantId)
      if (participant && window.confirm(`정말로 ${participant.username}님을 참가자 목록에서 제거하시겠습니까?`)) {
        // 참가자 목록에서 제거
        const updatedParticipants = discussion.participants.filter((p: any) => p.id !== participantId)

        const updatedDiscussion = {
          ...discussion,
          participants: updatedParticipants,
          currentParticipants: discussion.currentParticipants - 1,
        }

        setDiscussion(updatedDiscussion)
        setToastMessage(`${participant.username}님이 참가자 목록에서 제거되었습니다.`)
        setToastType("info")
        setShowToast(true)
      }
    }
  }

  // 미팅 링크 저장
  const handleSaveMeetingLink = () => {
    if (discussion) {
      const updatedDiscussion = { ...discussion, meetingLink }
      setDiscussion(updatedDiscussion)
      setIsEditingLink(false)
      setToastMessage("미팅 링크가 저장되었습니다.")
      setToastType("success")
      setShowToast(true)
    }
  }

  // 노트 저장
  const handleSaveNotes = () => {
    if (discussion) {
      const updatedDiscussion = { ...discussion, notes }
      setDiscussion(updatedDiscussion)
      setIsEditingNotes(false)
      setToastMessage("노트가 저장되었습니다.")
      setToastType("success")
      setShowToast(true)
    }
  }

  // 공유하기
  const handleShare = () => {
    // 실제 앱에서는 공유 기능 구현
    navigator.clipboard.writeText(window.location.href)
    setToastMessage("링크가 클립보드에 복사되었습니다.")
    setToastType("success")
    setShowToast(true)
  }

  // 이메일 보내기
  const handleSendEmail = () => {
    // 실제 앱에서는 이메일 전송 기능 구현
    setToastMessage("참가자들에게 이메일이 발송되었습니다.")
    setToastType("success")
    setShowToast(true)
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
            <h1 className="text-2xl font-bold text-gray-700">토론 발제문을 찾을 수 없습니다</h1>
            <button
              className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-lg"
              onClick={() => router.push("/discussion/manage")}
            >
              목록으로 돌아가기
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
          <Link href="/discussion/manage">
            <motion.button
              className="flex items-center gap-2 text-rose-600 font-medium"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} />
              <span>토론 발제문 목록으로</span>
            </motion.button>
          </Link>
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-md overflow-hidden mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(discussion.status)}`}>
                    {getStatusText(discussion.status)}
                  </span>
                  {discussion.isPublic ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">공개</span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">비공개</span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{discussion.title}</h1>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleTogglePublic}
                  className={`p-2 rounded-full ${
                    discussion.isPublic ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                  }`}
                  title={discussion.isPublic ? "공개" : "비공개"}
                >
                  {discussion.isPublic ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                  title="공유하기"
                >
                  <Share2 size={18} />
                </button>
                <Link href={`/discussion/edit/${discussion.id}`}>
                  <button
                    className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                    title="수정하기"
                  >
                    <Edit size={18} />
                  </button>
                </Link>
                <button
                  onClick={handleDeleteDiscussion}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="삭제하기"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-rose-500" />
                <div>
                  <span className="text-sm text-gray-500">책 제목</span>
                  <p className="font-medium">{discussion.bookTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-rose-500" />
                <div>
                  <span className="text-sm text-gray-500">토론 일자</span>
                  <p className="font-medium">{discussion.discussionDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-rose-500" />
                <div>
                  <span className="text-sm text-gray-500">참가자</span>
                  <p className="font-medium">
                    {discussion.currentParticipants}/{discussion.maxParticipants}명
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-rose-500" />
                <div>
                  <span className="text-sm text-gray-500">작성일</span>
                  <p className="font-medium">{new Date(discussion.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {discussion.tags.map((tag: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b">
            <div className="flex">
              <button
                className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "info"
                    ? "border-rose-500 text-rose-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("info")}
              >
                기본 정보
              </button>
              <button
                className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "participants"
                    ? "border-rose-500 text-rose-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("participants")}
              >
                참가자 관리
                {discussion.waitingList.length > 0 && (
                  <span className="ml-2 bg-rose-500 text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">
                    {discussion.waitingList.length}
                  </span>
                )}
              </button>
              <button
                className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "questions"
                    ? "border-rose-500 text-rose-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("questions")}
              >
                토론 질문
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* 기본 정보 탭 */}
            {activeTab === "info" && (
              <div>
                {/* 토론 상태 변경 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">토론 상태</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleChangeStatus("upcoming")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        discussion.status === "upcoming"
                          ? "bg-blue-500 text-white"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }`}
                    >
                      예정됨
                    </button>
                    <button
                      onClick={() => handleChangeStatus("ongoing")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        discussion.status === "ongoing"
                          ? "bg-green-500 text-white"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      <Play size={16} className="inline mr-1" />
                      진행 중
                    </button>
                    <button
                      onClick={() => handleChangeStatus("completed")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        discussion.status === "completed"
                          ? "bg-gray-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <CheckCircle size={16} className="inline mr-1" />
                      완료됨
                    </button>
                    <button
                      onClick={() => handleChangeStatus("cancelled")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        discussion.status === "cancelled"
                          ? "bg-red-500 text-white"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      <XCircle size={16} className="inline mr-1" />
                      취소됨
                    </button>
                  </div>
                </div>

                {/* 토론 주제 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">토론 주제</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800 whitespace-pre-line">{discussion.mainTopic}</p>
                  </div>
                </div>

                {/* 미팅 링크 */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">미팅 링크</h3>
                    {!isEditingLink && (
                      <button
                        onClick={() => setIsEditingLink(true)}
                        className="text-sm text-rose-500 hover:text-rose-600"
                      >
                        {meetingLink ? "수정" : "추가"}
                      </button>
                    )}
                  </div>

                  {isEditingLink ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                        placeholder="Zoom, Google Meet 등의 미팅 링크를 입력하세요"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                      />
                      <button
                        onClick={handleSaveMeetingLink}
                        className="px-3 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                      >
                        저장
                      </button>
                      <button
                        onClick={() => {
                          setMeetingLink(discussion.meetingLink || "")
                          setIsEditingLink(false)
                        }}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {meetingLink ? (
                        <a
                          href={meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline break-all"
                        >
                          {meetingLink}
                        </a>
                      ) : (
                        <p className="text-gray-500 italic">
                          미팅 링크가 없습니다. 추가 버튼을 클릭하여 링크를 추가하세요.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* 노트 */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">노트</h3>
                    {!isEditingNotes && (
                      <button
                        onClick={() => setIsEditingNotes(true)}
                        className="text-sm text-rose-500 hover:text-rose-600"
                      >
                        {notes ? "수정" : "추가"}
                      </button>
                    )}
                  </div>

                  {isEditingNotes ? (
                    <div className="flex flex-col gap-2">
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="참가자들에게 전달할 메모나 안내사항을 입력하세요"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 min-h-[100px]"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={handleSaveNotes}
                          className="px-3 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                        >
                          저장
                        </button>
                        <button
                          onClick={() => {
                            setNotes(discussion.notes || "")
                            setIsEditingNotes(false)
                          }}
                          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {notes ? (
                        <p className="text-gray-800 whitespace-pre-line">{notes}</p>
                      ) : (
                        <p className="text-gray-500 italic">노트가 없습니다. 추가 버튼을 클릭하여 노트를 추가하세요.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* 이메일 보내기 버튼 */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSendEmail}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                  >
                    <Mail size={18} />
                    <span>참가자들에게 이메일 보내기</span>
                  </button>
                </div>
              </div>
            )}

            {/* 참가자 관리 탭 */}
            {activeTab === "participants" && (
              <div>
                {/* 참가 대기자 */}
                {discussion.waitingList.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">참가 대기자</h3>
                    <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-700">
                          아래 대기자들이 토론 참여를 요청했습니다. 승인 또는 거절을 선택해주세요.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {discussion.waitingList.map((participant: any) => (
                        <div
                          key={participant.id}
                          className="flex items-center justify-between bg-white border border-gray-200 p-3 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <Image
                                src={participant.avatar || "/placeholder.svg"}
                                alt={participant.username}
                                width={32}
                                height={32}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{participant.username}</p>
                              <p className="text-xs text-gray-500">{participant.email}</p>
                              <p className="text-xs text-gray-500">요청일: {participant.requestDate}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApproveParticipant(participant.id)}
                              className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                            >
                              승인
                            </button>
                            <button
                              onClick={() => handleRejectParticipant(participant.id)}
                              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                            >
                              거절
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 현재 참가자 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    현재 참가자 ({discussion.participants.length}명)
                  </h3>
                  {discussion.participants.length === 0 ? (
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-gray-500">아직 참가자가 없습니다.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {discussion.participants.map((participant: any) => (
                        <div
                          key={participant.id}
                          className="flex items-center justify-between bg-white border border-gray-200 p-3 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <Image
                                src={participant.avatar || "/placeholder.svg"}
                                alt={participant.username}
                                width={32}
                                height={32}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{participant.username}</p>
                              <p className="text-xs text-gray-500">{participant.email}</p>
                              <p className="text-xs text-gray-500">참가일: {participant.joinDate}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveParticipant(participant.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors"
                          >
                            <UserMinus size={16} className="inline mr-1" />
                            제거
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 토론 질문 탭 */}
            {activeTab === "questions" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">토론 질문</h3>
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
            )}
          </div>
        </motion.div>
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

