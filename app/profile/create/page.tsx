"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Upload,
  X,
  Check,
  Info,
  Camera,
  Bookmark,
  Heart,
  Book,
  Music,
  Film,
  Coffee,
  Utensils,
} from "lucide-react"
import CustomLogo from "@/components/icons/custom-logo"

interface Interest {
  id: string
  name: string
  icon: React.ReactNode
  selected: boolean
}

export default function CreateProfilePage() {
  const [name, setName] = useState("")
  const [nickname, setNickname] = useState("")
  const [bio, setBio] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [interests, setInterests] = useState<Interest[]>([
    { id: "books", name: "독서", icon: <Book size={20} />, selected: false },
    { id: "romance", name: "로맨스", icon: <Heart size={20} />, selected: false },
    { id: "classics", name: "고전문학", icon: <Bookmark size={20} />, selected: false },
    { id: "music", name: "음악", icon: <Music size={20} />, selected: false },
    { id: "movies", name: "영화", icon: <Film size={20} />, selected: false },
    { id: "coffee", name: "커피", icon: <Coffee size={20} />, selected: false },
    { id: "food", name: "요리", icon: <Utensils size={20} />, selected: false },
  ])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setProfileImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const toggleInterest = (id: string) => {
    setInterests(
      interests.map((interest) => (interest.id === id ? { ...interest, selected: !interest.selected } : interest)),
    )
  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({
      name,
      nickname,
      bio,
      profileImage,
      interests: interests.filter((i) => i.selected).map((i) => i.name),
    })

    // For demo purposes, let's just show a success message
    alert("프로필이 성공적으로 생성되었습니다!")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto p-6">
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

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <CustomLogo width={60} height={60} primaryColor="#db2777" strokeColor="#f43f5e" />
          </div>
          <h1 className="text-3xl font-bold text-rose-600 mb-2">프로필 작성</h1>
          <p className="text-gray-600">당신만의 특별한 프로필을 만들어보세요</p>
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

        {/* Form */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <motion.div className="space-y-6" variants={containerVariants}>
                <motion.h2 className="text-xl font-semibold text-gray-800 mb-4" variants={itemVariants}>
                  기본 정보
                </motion.h2>

                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    이름
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    placeholder="실명을 입력하세요"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
                    닉네임
                  </label>
                  <input
                    id="nickname"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    placeholder="다른 사용자에게 표시될 닉네임"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    자기소개
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    placeholder="자신에 대해 간단히 소개해주세요"
                  />
                  <p className="mt-1 text-sm text-gray-500">최대 150자</p>
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: Profile Picture */}
            {step === 2 && (
              <motion.div className="space-y-6" variants={containerVariants}>
                <motion.h2 className="text-xl font-semibold text-gray-800 mb-4" variants={itemVariants}>
                  프로필 사진
                </motion.h2>

                <motion.div className="flex flex-col items-center justify-center" variants={itemVariants}>
                  {profileImage ? (
                    <div className="relative">
                      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-rose-200">
                        <Image
                          src={profileImage || "/placeholder.svg"}
                          alt="Profile Preview"
                          width={160}
                          height={160}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="w-40 h-40 rounded-full bg-rose-100 flex flex-col items-center justify-center cursor-pointer hover:bg-rose-200 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera size={40} className="text-rose-500 mb-2" />
                      <span className="text-rose-600 font-medium text-sm">사진 추가</span>
                    </div>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {!profileImage && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4 flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                    >
                      <Upload size={16} />
                      <span>사진 업로드</span>
                    </button>
                  )}

                  <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">
                    <Info size={16} className="flex-shrink-0 mt-0.5" />
                    <p>얼굴이 잘 보이는 사진을 선택하면 매칭 확률이 높아집니다. JPG, PNG 파일만 가능합니다.</p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 3: Interests */}
            {step === 3 && (
              <motion.div className="space-y-6" variants={containerVariants}>
                <motion.h2 className="text-xl font-semibold text-gray-800 mb-4" variants={itemVariants}>
                  관심사
                </motion.h2>

                <motion.div variants={itemVariants}>
                  <p className="text-gray-600 mb-4">
                    당신의 관심사를 선택해주세요. 최소 3개 이상 선택하는 것이 좋습니다.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {interests.map((interest) => (
                      <motion.button
                        key={interest.id}
                        type="button"
                        className={`flex items-center gap-2 p-3 rounded-lg border ${
                          interest.selected
                            ? "bg-rose-50 border-rose-300 text-rose-700"
                            : "border-gray-300 hover:border-rose-300 hover:bg-rose-50"
                        } transition-colors`}
                        onClick={() => toggleInterest(interest.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className={interest.selected ? "text-rose-500" : "text-gray-500"}>{interest.icon}</span>
                        <span>{interest.name}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">
                    <Info size={16} className="flex-shrink-0 mt-0.5" />
                    <p>선택한 관심사는 비슷한 취향을 가진 사람들과 매칭하는 데 사용됩니다.</p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <motion.button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  이전
                </motion.button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <motion.button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  다음
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  프로필 생성
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Tips */}
        <motion.div
          className="bg-rose-50 rounded-xl p-6 border border-rose-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-rose-700 mb-2">프로필 작성 팁</h3>
          <ul className="space-y-2 text-rose-800">
            <li className="flex items-start gap-2">
              <Check size={16} className="mt-1 flex-shrink-0 text-rose-500" />
              <span>진실된 정보를 입력하면 더 좋은 매칭 결과를 얻을 수 있어요.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={16} className="mt-1 flex-shrink-0 text-rose-500" />
              <span>자기소개는 간결하면서도 당신의 개성을 드러내는 것이 좋아요.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={16} className="mt-1 flex-shrink-0 text-rose-500" />
              <span>관심사는 실제로 당신이 좋아하는 것들을 선택해주세요.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

