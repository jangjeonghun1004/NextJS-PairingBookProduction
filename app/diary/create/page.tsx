"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import { ArrowLeft, X, Book, Star, Calendar, Tag, ImageIcon, Save, Info } from "lucide-react"

export default function CreateDiaryPage() {
  const [title, setTitle] = useState("")
  const [bookTitle, setBookTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [rating, setRating] = useState<number>(0)
  const [readDate, setReadDate] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isPublic, setIsPublic] = useState(true)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 여기서 API 호출 등을 통해 데이터를 저장합니다
    console.log({
      title,
      bookTitle,
      author,
      rating,
      readDate,
      content,
      tags,
      images,
      isPublic,
    })

    // 성공 메시지 표시 (실제 구현에서는 API 응답 후 처리)
    alert("독서 일기가 성공적으로 저장되었습니다!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/diary">
            <motion.button
              className="flex items-center gap-2 text-rose-600 font-medium"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} />
              <span>독서 일기로 돌아가기</span>
            </motion.button>
          </Link>
        </div>

        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-rose-600 mb-2">독서 일기 작성</h1>
          <p className="text-gray-600">당신의 독서 경험을 기록하고 공유해보세요</p>
        </motion.div>

        <motion.form
          className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
        >
          {/* 일기 제목 */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              일기 제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
              placeholder="독서 일기의 제목을 입력하세요"
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
                  placeholder="책 제목을 입력하세요"
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

          {/* 평점 및 읽은 날짜 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">평점</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                    <Star
                      size={24}
                      className={`${
                        rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      } hover:text-yellow-400 transition-colors`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-500">{rating > 0 ? `${rating}점` : "평점을 선택하세요"}</span>
              </div>
            </div>

            <div>
              <label htmlFor="readDate" className="block text-sm font-medium text-gray-700 mb-1">
                읽은 날짜
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="readDate"
                  type="date"
                  value={readDate}
                  onChange={(e) => setReadDate(e.target.value)}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
            </div>
          </div>

          {/* 내용 */}
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              독서 일기 내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
              placeholder="책을 읽고 느낀 점, 인상 깊었던 구절, 생각 등을 자유롭게 작성해보세요."
              required
            />
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
                placeholder="태그를 입력하고 Enter를 누르세요 (예: 소설, 자기계발)"
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

          {/* 이미지 업로드 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">이미지 추가</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">클릭하여 이미지를 업로드하세요</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF 파일 (최대 5MB)</p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                multiple
              />
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Uploaded image ${index + 1}`}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
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
              공개 설정 시 다른 사용자들이 독서 일기를 볼 수 있습니다.
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
              <span>독서 일기 저장하기</span>
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
          <h3 className="text-lg font-semibold text-rose-700 mb-2">독서 일기 작성 팁</h3>
          <ul className="space-y-2 text-rose-800">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>책의 핵심 메시지나 인상 깊었던 구절을 기록해보세요.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>책을 읽으면서 느낀 감정이나 생각을 솔직하게 표현해보세요.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>책의 내용을 자신의 경험과 연결지어 생각해보면 더 깊은 통찰을 얻을 수 있어요.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>정기적으로 독서 일기를 작성하면 독서 습관을 기르는 데 도움이 됩니다.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

