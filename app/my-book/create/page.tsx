"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, ImageIcon, Palette, Save, X } from "lucide-react"
import Navbar from "@/components/navbar"
import ToastNotification from "@/components/toast-notification"

// 책 표지 색상 옵션
const COVER_COLORS = [
  { name: "파랑", value: "bg-blue-500", textColor: "text-white" },
  { name: "빨강", value: "bg-red-500", textColor: "text-white" },
  { name: "초록", value: "bg-green-500", textColor: "text-white" },
  { name: "보라", value: "bg-purple-500", textColor: "text-white" },
  { name: "핑크", value: "bg-pink-500", textColor: "text-white" },
  { name: "노랑", value: "bg-yellow-500", textColor: "text-gray-800" },
  { name: "주황", value: "bg-orange-500", textColor: "text-white" },
  { name: "청록", value: "bg-teal-500", textColor: "text-white" },
]

// 질문 목록
const QUESTIONS = [
  {
    id: "charm",
    title: "이성을 설레게 하는 나의 매력",
    description: "당신이 생각하는 자신의 매력은 무엇인가요?",
    placeholder: "나의 매력에 대해 자유롭게 작성해주세요.",
  },
  {
    id: "values",
    title: "내가 중요하게 생각하는 가치",
    description: "당신이 삶에서 가장 중요하게 생각하는 가치는 무엇인가요?",
    placeholder: "당신에게 중요한 가치에 대해 작성해주세요.",
  },
  {
    id: "dream",
    title: "나의 꿈과 목표",
    description: "앞으로 이루고 싶은 꿈이나 목표는 무엇인가요?",
    placeholder: "당신의 꿈과 목표에 대해 작성해주세요.",
  },
  {
    id: "hobby",
    title: "나의 취미와 관심사",
    description: "당신이 즐기는 취미와 관심 있는 분야는 무엇인가요?",
    placeholder: "당신의 취미와 관심사에 대해 작성해주세요.",
  },
  {
    id: "love",
    title: "사랑에 대한 나의 생각",
    description: "당신이 생각하는 이상적인 사랑의 모습은 어떤 것인가요?",
    placeholder: "사랑에 대한 당신의 생각을 자유롭게 작성해주세요.",
  },
]

export default function CreateBookPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 상태 관리
  const [step, setStep] = useState(1)
  const [bookTitle, setBookTitle] = useState("페어링 북")
  const [authorName, setAuthorName] = useState("")
  const [selectedColor, setSelectedColor] = useState(COVER_COLORS[0])
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success")
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [previewPage, setPreviewPage] = useState(0)

  // 이미지 업로드 처리
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setCoverImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // 이미지 제거
  const handleRemoveImage = () => {
    setCoverImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // 다음 단계로 이동
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  // 이전 단계로 이동
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // 질문 답변 저장
  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    })
  }

  // 다음 질문으로 이동
  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  // 이전 질문으로 이동
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  // 책 저장
  const handleSaveBook = () => {
    // 실제 앱에서는 API를 통해 서버에 저장
    setToastMessage("책이 성공적으로 저장되었습니다!")
    setToastType("success")
    setShowToast(true)

    // 책 보기 페이지로 이동
    setTimeout(() => {
      router.push("/my-book/view/1")
    }, 1500)
  }

  // 미리보기 모드 토글
  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode)
    setPreviewPage(0)
  }

  // 미리보기 페이지 변경
  const handlePreviewPageChange = (direction: "next" | "prev") => {
    if (direction === "next" && previewPage < QUESTIONS.length) {
      setPreviewPage(previewPage + 1)
    } else if (direction === "prev" && previewPage > 0) {
      setPreviewPage(previewPage - 1)
    }
  }

  // 현재 질문
  const currentQuestion = QUESTIONS[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-24 px-4 pb-16">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/my-book">
            <button className="flex items-center gap-2 text-rose-600 font-medium">
              <ArrowLeft size={18} />
              <span>돌아가기</span>
            </button>
          </Link>
        </div>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">나만의 책 만들기</h1>
          <p className="text-gray-600">
            {step === 1 ? "책 정보를 입력해주세요" : step === 2 ? "질문에 답변해주세요" : "책 미리보기 및 저장"}
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 relative">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10"></div>

          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= i ? "bg-rose-500 text-white" : "bg-gray-200 text-gray-500"
              } ${i < step ? "cursor-pointer" : ""}`}
              onClick={() => i < step && setStep(i)}
              whileHover={i < step ? { scale: 1.1 } : {}}
              whileTap={i < step ? { scale: 0.95 } : {}}
            >
              {step > i ? <Check size={18} /> : i}
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {/* Step 1: Book Info */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">책 정보</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="bookTitle" className="block text-sm font-medium text-gray-700 mb-1">
                      책 제목
                    </label>
                    <input
                      id="bookTitle"
                      type="text"
                      value={bookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                      placeholder="책 제목을 입력하세요"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">
                      저자 이름
                    </label>
                    <input
                      id="authorName"
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                      placeholder="저자 이름을 입력하세요"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">표지 색상</label>
                    <div className="grid grid-cols-4 gap-2">
                      {COVER_COLORS.map((color) => (
                        <button
                          key={color.value}
                          className={`w-full h-12 ${color.value} rounded-md flex items-center justify-center ${
                            selectedColor.value === color.value ? "ring-2 ring-offset-2 ring-rose-500" : ""
                          }`}
                          onClick={() => setSelectedColor(color)}
                          aria-label={`${color.name} 색상 선택`}
                        >
                          {selectedColor.value === color.value && <Check size={16} className={color.textColor} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">표지 이미지</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                      >
                        <ImageIcon size={16} />
                        <span>이미지 업로드</span>
                      </button>
                      {coverImage && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
                        >
                          <X size={16} />
                          <span>제거</span>
                        </button>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <p className="mt-1 text-xs text-gray-500">JPG, PNG 파일만 가능합니다. 최대 2MB.</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div
                    className={`w-48 h-64 ${selectedColor.value} rounded-md shadow-md relative flex flex-col items-center justify-center p-4`}
                  >
                    <div className={`text-xs ${selectedColor.textColor} opacity-70 mb-16`}>페어링북</div>
                    <div className={`text-xl font-bold ${selectedColor.textColor} mb-2`}>
                      {bookTitle || "페어링 북"}
                    </div>
                    <div className={`text-sm ${selectedColor.textColor} opacity-70`}>{authorName || "저자 이름"}</div>
                    <div className="w-24 h-24 bg-white rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      {coverImage ? (
                        <Image
                          src={coverImage || "/placeholder.svg"}
                          alt="Book cover image"
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      ) : (
                        <ImageIcon size={32} className="text-gray-300" />
                      )}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 text-center">표지 미리보기</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Questions */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  질문 {currentQuestionIndex + 1}/{QUESTIONS.length}
                </h2>
                <div className="text-sm text-gray-500">
                  {currentQuestionIndex + 1} / {QUESTIONS.length}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">{currentQuestion.title}</h3>
                <p className="text-gray-600 mb-4">{currentQuestion.description}</p>
                <textarea
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 min-h-[200px]"
                  placeholder={currentQuestion.placeholder}
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    currentQuestionIndex === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transition-colors`}
                >
                  <ChevronLeft size={16} />
                  <span>이전 질문</span>
                </button>

                {currentQuestionIndex < QUESTIONS.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                  >
                    <span>다음 질문</span>
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                  >
                    <span>미리보기</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Preview and Save */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">책 미리보기</h2>
                <button
                  onClick={togglePreviewMode}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {isPreviewMode ? (
                    <>
                      <X size={16} />
                      <span>미리보기 닫기</span>
                    </>
                  ) : (
                    <>
                      <Palette size={16} />
                      <span>미리보기 보기</span>
                    </>
                  )}
                </button>
              </div>

              {isPreviewMode ? (
                <div className="flex flex-col items-center">
                  {/* Book Preview */}
                  <div className="relative w-full max-w-md aspect-[3/4] mb-6">
                    {previewPage === 0 ? (
                      // Cover
                      <div
                        className={`w-full h-full ${selectedColor.value} rounded-md shadow-md relative flex flex-col items-center justify-center p-4`}
                      >
                        <div className={`text-xs ${selectedColor.textColor} opacity-70 absolute top-8`}>페어링북</div>
                        <div className={`text-2xl font-bold ${selectedColor.textColor} mb-2`}>
                          {bookTitle || "페어링 북"}
                        </div>
                        <div className={`text-sm ${selectedColor.textColor} opacity-70`}>
                          {authorName || "저자 이름"}
                        </div>
                        <div className="w-32 h-32 bg-white rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                          {coverImage ? (
                            <Image
                              src={coverImage || "/placeholder.svg"}
                              alt="Book cover image"
                              width={100}
                              height={100}
                              className="object-cover"
                            />
                          ) : (
                            <ImageIcon size={40} className="text-gray-300" />
                          )}
                        </div>
                      </div>
                    ) : (
                      // Content pages
                      <div className="w-full h-full bg-white rounded-md shadow-md p-8 flex flex-col">
                        <div className="text-center mb-8">
                          <h3 className="text-2xl font-bold text-orange-500 mb-2">CHAPTER {previewPage}</h3>
                          <p className="text-lg text-gray-800">{QUESTIONS[previewPage - 1]?.title}</p>
                        </div>

                        <div className="flex justify-center mb-8">
                          <div className="flex flex-wrap gap-2 justify-center">
                            <div className="text-pink-400">✧</div>
                            <div className="text-blue-400">✦</div>
                            <div className="text-orange-400">✧</div>
                            <div className="text-purple-400">✦</div>
                            <div className="text-blue-400">✧</div>
                            <div className="text-pink-400">✦</div>
                            <div className="text-orange-400">✧</div>
                          </div>
                        </div>

                        <div className="flex-1 text-center">
                          <p className="whitespace-pre-line text-gray-700">
                            {answers[QUESTIONS[previewPage - 1]?.id] || "이 부분에 답변이 표시됩니다."}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handlePreviewPageChange("prev")}
                      disabled={previewPage === 0}
                      className={`p-2 rounded-full ${
                        previewPage === 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm text-gray-600">
                      {previewPage} / {QUESTIONS.length}
                    </span>
                    <button
                      onClick={() => handlePreviewPageChange("next")}
                      disabled={previewPage === QUESTIONS.length}
                      className={`p-2 rounded-full ${
                        previewPage === QUESTIONS.length
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-24 h-32 ${selectedColor.value} rounded-md shadow-md relative flex flex-col items-center justify-center p-2`}
                    >
                      <div className={`text-[8px] ${selectedColor.textColor} opacity-70 mb-8`}>페어링북</div>
                      <div className={`text-xs font-bold ${selectedColor.textColor} mb-1`}>
                        {bookTitle || "페어링 북"}
                      </div>
                      <div className={`text-[8px] ${selectedColor.textColor} opacity-70`}>
                        {authorName || "저자 이름"}
                      </div>
                      <div className="w-12 h-12 bg-white rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        {coverImage ? (
                          <Image
                            src={coverImage || "/placeholder.svg"}
                            alt="Book cover image"
                            width={30}
                            height={30}
                            className="object-cover"
                          />
                        ) : (
                          <ImageIcon size={16} className="text-gray-300" />
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{bookTitle || "페어링 북"}</h3>
                      <p className="text-sm text-gray-600">저자: {authorName || "저자 이름"}</p>
                      <p className="text-sm text-gray-600">총 {QUESTIONS.length}개의 챕터</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">챕터 목록</h3>
                    <ul className="space-y-2">
                      {QUESTIONS.map((question, index) => (
                        <li key={question.id} className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{question.title}</span>
                          {answers[question.id] ? (
                            <Check size={16} className="text-green-500 ml-auto" />
                          ) : (
                            <X size={16} className="text-red-500 ml-auto" />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600 mb-4">
                      모든 질문에 답변하셨나요? 책을 저장하고 언제든지 다시 볼 수 있습니다.
                    </p>
                    <button
                      onClick={handleSaveBook}
                      className="w-full py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Save size={18} />
                      <span>책 저장하기</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {!isPreviewMode && (
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <motion.button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={16} />
                <span>이전</span>
              </motion.button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <motion.button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>다음</span>
                <ArrowRight size={16} />
              </motion.button>
            ) : (
              <div></div>
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

