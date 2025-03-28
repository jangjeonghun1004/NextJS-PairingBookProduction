"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { ArrowLeft, X, Book, Calendar, Tag, Save, Info, HelpCircle, Users } from "lucide-react"

export default function CreateDiscussionPage() {
  const [title, setTitle] = useState("")
  const [bookTitle, setBookTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [discussionDate, setDiscussionDate] = useState("")
  const [mainTopic, setMainTopic] = useState("")
  const [questions, setQuestions] = useState<string[]>([""])
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isPublic, setIsPublic] = useState(true)
  const [maxParticipants, setMaxParticipants] = useState<number>(10)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 페이지 로드 시 스크롤을 맨 위로 이동
  useEffect(() => {
    // 컴포넌트가 마운트된 후에만 스크롤 조작을 수행
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
      document.body.style.paddingTop = "64px"
    }, 0)

    return () => {
      clearTimeout(timer)
      document.body.style.paddingTop = "0"
    }
  }, [])

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages((prev) => [...prev, e.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove))
  }

  const handleAddQuestion = () => {
    setQuestions([...questions, ""])
  }

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[index] = value
    setQuestions(newQuestions)
  }

  const handleRemoveQuestion = (index: number) => {
    if (questions.length > 1) {
      const newQuestions = [...questions]
      newQuestions.splice(index, 1)
      setQuestions(newQuestions)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 여기서 API 호출 등을 통해 데이터를 저장합니다
    console.log({
      title,
      bookTitle,
      author,
      discussionDate,
      mainTopic,
      questions,
      tags,
      images,
      isPublic,
      maxParticipants,
    })

    // 성공 메시지 표시 (실제 구현에서는 API 응답 후 처리)
    alert("토론 발제문이 성공적으로 저장되었습니다!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/discussions">
            <motion.button
              className="flex items-center gap-2 text-rose-600 font-medium"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} />
              <span>독서 토론으로 돌아가기</span>
            </motion.button>
          </Link>
        </div>

        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-rose-600 mb-2">토론 발제문 작성</h1>
          <p className="text-gray-600">독서 토론을 위한 발제문을 작성하고 다른 독자들과 함께 토론해보세요</p>
        </motion.div>

        <motion.form
          className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
        >
          {/* 발제문 제목 */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              발제문 제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
              placeholder="토론 발제문의 제목을 입력하세요"
              required
            />
          </div>

          {/* 책 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="bookTitle" className="block text-sm font-medium text-gray-700 mb-1">
                책 제목
              </label>
              <div className="relative">
                <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="bookTitle"
                  type="text"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                  placeholder="토론할 책 제목을 입력하세요"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                저자
              </label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                placeholder="저자 이름을 입력하세요"
                required
              />
            </div>
          </div>

          {/* 토론 날짜 및 최대 참가자 수 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="discussionDate" className="block text-sm font-medium text-gray-700 mb-1">
                토론 예정 날짜
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="discussionDate"
                  type="date"
                  value={discussionDate}
                  onChange={(e) => setDiscussionDate(e.target.value)}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-1">
                최대 참가자 수
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="maxParticipants"
                  type="number"
                  min="2"
                  max="50"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(Number.parseInt(e.target.value))}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                  placeholder="최대 참가자 수를 입력하세요"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">2명에서 50명까지 설정 가능합니다.</p>
            </div>
          </div>

          {/* 주요 토론 주제 */}
          <div className="mb-6">
            <label htmlFor="mainTopic" className="block text-sm font-medium text-gray-700 mb-1">
              주요 토론 주제
            </label>
            <textarea
              id="mainTopic"
              value={mainTopic}
              onChange={(e) => setMainTopic(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
              placeholder="토론의 주요 주제나 방향성을 설명해주세요."
              required
            />
          </div>

          {/* 토론 질문들 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">토론 질문</label>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="text-sm text-rose-600 hover:text-rose-700 flex items-center"
              >
                <span>질문 추가</span>
                <span className="ml-1 text-lg">+</span>
              </button>
            </div>

            <div className="space-y-3">
              {questions.map((question, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-3 mr-2">
                      <HelpCircle size={18} className="text-rose-400" />
                    </div>
                    <textarea
                      value={question}
                      onChange={(e) => handleQuestionChange(index, e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                      placeholder={`토론 질문 ${index + 1}을 입력하세요`}
                      required={index === 0}
                    />
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(index)}
                        className="ml-2 mt-3 text-gray-400 hover:text-rose-500"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              토론을 이끌어갈 질문들을 작성해주세요. 최소 1개 이상의 질문이 필요합니다.
            </p>
          </div>

          {/* 태그 */}
          <div className="mb-6">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              태그
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                id="tags"
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                placeholder="태그를 입력하고 Enter를 누르세요 (예: 소설, 고전문학, 철학)"
              />
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-rose-500 hover:text-rose-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 공개 여부 */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">공개 설정</label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-rose-500"
                  name="visibility"
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                <span className="ml-2">공개</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-rose-500"
                  name="visibility"
                  checked={!isPublic}
                  onChange={() => setIsPublic(false)}
                />
                <span className="ml-2">비공개</span>
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1 flex items-start">
              <Info size={14} className="mr-1 flex-shrink-0 mt-0.5" />
              공개 설정 시 다른 사용자들이 토론에 참여할 수 있습니다.
            </p>
          </div>

          {/* 저장 버튼 */}
          <div className="flex justify-end">
            <motion.button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save size={18} />
              <span>발제문 저장하기</span>
            </motion.button>
          </div>
        </motion.form>

        {/* 작성 팁 */}
        <motion.div
          className="mt-8 bg-rose-50 rounded-xl p-6 border border-rose-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-rose-700 mb-2">토론 발제문 작성 팁</h3>
          <ul className="space-y-2 text-rose-800">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>책의 핵심 주제나 논쟁점을 중심으로 토론 주제를 설정하세요.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>열린 질문을 통해 다양한 의견이 나올 수 있도록 유도하세요.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>책의 특정 구절이나 장면을 인용하면 더 구체적인 토론이 가능합니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>현실과 연결지어 생각해볼 수 있는 질문을 포함하면 참여도가 높아집니다.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

