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
  Star,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Share2,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import ToastNotification from "@/components/toast-notification"

// 샘플 독서 일기 데이터 (app/diary/page.tsx와 동일한 데이터 사용)
const SAMPLE_DIARIES = [
  {
    id: 1,
    title: "데미안: 내면의 여정을 찾아서",
    bookTitle: "데미안",
    author: "헤르만 헤세",
    coverImage: "/placeholder.svg?height=150&width=100",
    content:
      "헤르만 헤세의 '데미안'은 자아 발견의 여정을 그린 소설로, 주인공 싱클레어가 어떻게 자신의 내면세계를 탐색하고 진정한 자아를 찾아가는지 보여준다. 특히 데미안이라는 인물을 통해 선과 악의 이분법적 세계관을 넘어서는 통찰력을 제시한다. '새는 알을 깨고 나온다. 알은 세계이다. 태어나려는 자는 하나의 세계를 파괴해야 한다'라는 구절이 가장 인상 깊었다.\n\n이 책은 나에게 자아와 세계에 대한 새로운 시각을 제공했다. 우리는 종종 사회적 규범과 기대에 맞추어 살아가며 진정한 자아를 잃어버리곤 한다. 데미안은 싱클레어에게 자신만의 길을 찾아가는 용기를 주었고, 이는 현대를 살아가는 우리에게도 중요한 메시지이다.\n\n또한 이 소설에서 다루는 아브락사스의 개념, 즉 선과 악을 모두 포함하는 신성의 개념은 인간 본성의 복잡성을 이해하는 데 도움이 된다. 우리는 모두 빛과 어둠을 가지고 있으며, 진정한 성장은 이 두 가지를 모두 인정하고 통합할 때 이루어진다.",
    rating: 5,
    readDate: "2023-11-15",
    createdAt: "2023-11-20",
    tags: ["소설", "철학", "성장", "자아"],
    isPublic: true,
    images: ["/placeholder.svg?height=300&width=200"],
    quotes: [
      "새는 알을 깨고 나온다. 알은 세계이다. 태어나려는 자는 하나의 세계를 파괴해야 한다.",
      "자기 자신을 찾고자 하는 사람은 먼저 세상을 불태워야 한다.",
      "진정한 소명은 자기 자신으로 돌아가는 것이다.",
    ],
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
    quotes: [
      "인간이 동물과 구별되는 가장 중요한 능력은 대규모 협력이다.",
      "인류는 허구를 믿는 능력 덕분에 대규모 협력이 가능해졌다.",
      "농업혁명은 인류 역사상 가장 큰 사기였다.",
    ],
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
    quotes: [
      "인간은 패배할 수 있지만 결코 굴복하지 않는다.",
      "이제 내가 무엇을 할 수 있는지 보여주마.",
      "행운은 준비된 자에게 온다.",
    ],
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
    quotes: [
      "빅브라더가 당신을 지켜보고 있다.",
      "자유란 2+2=4라고 말할 수 있는 자유다.",
      "전쟁은 평화다. 자유는 예속이다. 무지는 힘이다.",
    ],
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
    quotes: ["우리는 모두 조금씩 다른 아몬드를 가지고 있다.", "공감은 배우는 것이다.", "상처는 아픔을 통해 치유된다."],
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
    quotes: ["과거는 결코 죽지 않는다.", "우연은 운명의 다른 이름이다.", "사랑은 시간을 초월한다."],
  },
]

export default function DiaryDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params?.id)
  const [diary, setDiary] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // 페이지 로드 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.paddingTop = "64px"
    return () => {
      document.body.style.paddingTop = "0"
    }
  }, [])

  // 독서 일기 데이터 가져오기
  useEffect(() => {
    // 실제 앱에서는 API 호출로 데이터를 가져옵니다
    const fetchDiary = () => {
      setLoading(true)
      // 샘플 데이터에서 ID에 해당하는 독서 일기 찾기
      const foundDiary = SAMPLE_DIARIES.find((diary) => diary.id === id)

      setTimeout(() => {
        if (foundDiary) {
          setDiary(foundDiary)
        }
        setLoading(false)
      }, 500) // 로딩 시뮬레이션
    }

    if (id) {
      fetchDiary()
    }
  }, [id])

  // 공개 여부 토글
  const handleTogglePublic = () => {
    if (diary) {
      const updatedDiary = { ...diary, isPublic: !diary.isPublic }
      setDiary(updatedDiary)
      setToastMessage(`독서 일기가 ${diary.isPublic ? "비공개" : "공개"}로 설정되었습니다.`)
      setToastType("success")
      setShowToast(true)
    }
  }

  // 독서 일기 삭제
  const handleDeleteDiary = () => {
    if (window.confirm("정말로 이 독서 일기를 삭제하시겠습니까?")) {
      // 실제 앱에서는 API 호출로 삭제 처리
      setToastMessage("독서 일기가 삭제되었습니다.")
      setToastType("info")
      setShowToast(true)

      // 삭제 후 목록 페이지로 이동
      setTimeout(() => {
        router.push("/diary")
      }, 1500)
    }
  }

  // 이미지 네비게이션
  const nextImage = () => {
    if (diary && diary.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % diary.images.length)
    }
  }

  const prevImage = () => {
    if (diary && diary.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + diary.images.length) % diary.images.length)
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

  if (!diary) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto pt-20 px-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-700">독서 일기를 찾을 수 없습니다</h1>
            <button className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-lg" onClick={() => router.push("/diary")}>
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
          <Link href="/diary">
            <motion.button
              className="flex items-center gap-2 text-rose-600 font-medium"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} />
              <span>독서 일기 목록으로</span>
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
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{diary.title}</h1>
              <div className="flex gap-2">
                <button
                  onClick={handleTogglePublic}
                  className={`p-2 rounded-full ${
                    diary.isPublic ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                  }`}
                  title={diary.isPublic ? "공개" : "비공개"}
                >
                  {diary.isPublic ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                  title="공유하기"
                >
                  <Share2 size={18} />
                </button>
                <Link href={`/diary/edit/${diary.id}`}>
                  <button
                    className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                    title="수정하기"
                  >
                    <Edit size={18} />
                  </button>
                </Link>
                <button
                  onClick={handleDeleteDiary}
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
                  <p className="font-medium">{diary.bookTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-rose-500" />
                <div>
                  <span className="text-sm text-gray-500">읽은 날짜</span>
                  <p className="font-medium">{diary.readDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} className="text-rose-500" />
                <div>
                  <span className="text-sm text-gray-500">평점</span>
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={`${
                            star <= Math.floor(diary.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-sm">{diary.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-rose-500" />
                <div>
                  <span className="text-sm text-gray-500">작성일</span>
                  <p className="font-medium">{new Date(diary.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {diary.tags.map((tag: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Book Cover and Images */}
          {(diary.coverImage || diary.images.length > 0) && (
            <div className="p-6 border-b">
              <div className="flex flex-wrap gap-6">
                {/* Book Cover */}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-48 relative rounded-md overflow-hidden shadow-md">
                    <Image
                      src={diary.coverImage || "/placeholder.svg"}
                      alt={diary.bookTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 text-center">{diary.author}</p>
                </div>

                {/* Images */}
                {diary.images.length > 0 && (
                  <div className="flex-1 relative">
                    <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={diary.images[currentImageIndex] || "/placeholder.svg"}
                        alt={`Image ${currentImageIndex + 1}`}
                        fill
                        className="object-contain"
                      />
                      {diary.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors"
                          >
                            <ChevronRight size={20} />
                          </button>
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/30 text-white px-2 py-1 rounded-full text-xs">
                            {currentImageIndex + 1} / {diary.images.length}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            <div className="prose max-w-none">
              {diary.content.split("\n\n").map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Quotes */}
          {diary.quotes && diary.quotes.length > 0 && (
            <div className="p-6 bg-rose-50 border-t border-rose-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">인상 깊은 구절</h2>
              <div className="space-y-4">
                {diary.quotes.map((quote: string, index: number) => (
                  <blockquote key={index} className="border-l-4 border-rose-300 pl-4 py-2 italic text-gray-700">
                    "{quote}"
                  </blockquote>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Related Diaries */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">관련 독서 일기</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SAMPLE_DIARIES.filter((d) => d.id !== diary.id)
              .filter((d) => d.tags.some((tag) => diary.tags.includes(tag)))
              .slice(0, 3)
              .map((relatedDiary) => (
                <motion.div
                  key={relatedDiary.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
                  whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  onClick={() => router.push(`/diary/${relatedDiary.id}`)}
                >
                  <div className="h-32 bg-rose-50 relative">
                    {relatedDiary.images.length > 0 ? (
                      <Image
                        src={relatedDiary.images[0] || "/placeholder.svg"}
                        alt={relatedDiary.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={relatedDiary.coverImage || "/placeholder.svg"}
                          alt={relatedDiary.bookTitle}
                          width={60}
                          height={90}
                          className="object-cover shadow-md"
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-800 line-clamp-1">{relatedDiary.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{relatedDiary.bookTitle}</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          className={`${
                            star <= Math.floor(relatedDiary.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
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

