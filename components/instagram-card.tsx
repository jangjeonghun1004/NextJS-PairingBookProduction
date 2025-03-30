"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Smile, Share2, Flag, UserPlus } from "lucide-react"
import ToastNotification from "./toast-notification"

interface Comment {
  username: string
  text: string
}

interface InstagramCardProps {
  id?: string | number
  username: string
  userAvatar: string
  imageUrl: string
  caption: string
  likes: number
  timestamp: string
  comments?: Comment[]
  location?: string
  index?: number
  viewMode?: "grid" | "list"
  category?: string,
  linkUrl?: string,
}

export default function InstagramCard({
  id = Math.random().toString(36).substring(7),
  username,
  userAvatar,
  imageUrl,
  caption,
  likes,
  timestamp,
  comments = [],
  location,
  index = 0,
  viewMode = "grid",
  category,
  linkUrl,
}: InstagramCardProps) {
  const router = useRouter()
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showAllComments, setShowAllComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [localLikes, setLocalLikes] = useState(likes)
  const [isDoubleTapLiked, setIsDoubleTapLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!liked) {
      setLocalLikes(localLikes + 1)
    } else {
      setLocalLikes(localLikes - 1)
    }
    setLiked(!liked)
  }

  const handleDoubleTap = () => {
    if (!liked) {
      setLocalLikes(localLikes + 1)
      setLiked(true)

      // Show heart animation
      setIsDoubleTapLiked(true)
      setTimeout(() => {
        setIsDoubleTapLiked(false)
      }, 1000)
    }
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSaved(!saved)
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      // In a real app, you would send this to an API
      console.log("New comment:", newComment)
      setNewComment("")
    }
  }

  const handleCardClick = () => {
    // 메뉴가 열려있으면 클릭 무시
    if (showMenu) {
      return
    }

    // 스크롤 위치 저장
    sessionStorage.setItem("scrollPosition", window.scrollY.toString())

    // 카테고리가 "discussions" 또는 "독서토론"인 경우 discussion 경로로 이동
    if (category === "discussions" || category === "독서토론") {
      router.push(`/discussion/${id}`)
    } else if (category === "tv") {
      window.open(`${linkUrl}`, "_blank", "noopener,noreferrer");
    } else {
      router.push(`/post/${id}`)
    }
  }

  // 메뉴 토글 핸들러 수정 - 이벤트 전파 확실히 중단
  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault() // 추가
    setShowMenu(!showMenu)
  }

  // 페어링 요청 핸들러 수정
  const handlePairingRequest = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault() // 추가
    setShowMenu(false)

    // 페어링 관리 페이지로 이동
    router.push("/pairing")

    setToastMessage(`${username}님에게 페어링 요청을 보냈습니다.`)
    setShowToast(true)
  }

  // Display only 2 comments if not showing all
  const displayComments = showAllComments ? comments : comments.slice(0, 2)

  // Different animation variants based on index
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: Math.min(index * 0.1, 0.5), // 최대 0.5초 지연으로 제한
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
        variants={cardVariants}
        // initial="hidden"
        // animate={isInView ? "visible" : "hidden"}
        exit="exit"
        whileHover={{
          y: -5,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setShowMenu(false)
        }}
        onClick={handleCardClick}
      >
        {/* Card Header */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-2">
            <motion.div className="w-7 h-7 rounded-full overflow-hidden" whileHover={{ scale: 1.1 }}>
              <Image
                src={userAvatar || "/placeholder.svg"}
                alt={username}
                width={28}
                height={28}
                className="object-cover"
                priority
                loading="eager"
              />
            </motion.div>
            <div>
              <Link
                href={`/profile/${username}`}
                className="font-semibold text-sm hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {username}
              </Link>
              {location && <p className="text-xs text-gray-500">{location}</p>}
            </div>
          </div>
          <div className="relative">
            <button className="text-gray-500" onClick={handleMenuToggle}>
              <MoreHorizontal size={16} />
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
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault() // 추가
                  }}
                >
                  <Share2 size={16} className="mr-2" />
                  <span>공유하기</span>
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault() // 추가
                  }}
                >
                  <Flag size={16} className="mr-2" />
                  <span>신고하기</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Image with Hover Overlay */}
        <div className="relative aspect-square" onDoubleClick={handleDoubleTap}>
          <Image src={imageUrl || "/placeholder.svg"} alt="Post" fill className="object-cover" priority loading="eager" />

          {/* Hover Overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center space-x-4">
              <div className="flex items-center text-white">
                <Heart size={20} fill="white" className="mr-1" />
                <span className="text-sm font-semibold">{localLikes}</span>
              </div>
              <div className="flex items-center text-white">
                <MessageCircle size={20} className="mr-1" />
                <span className="text-sm font-semibold">{comments.length}</span>
              </div>
            </div>
          )}

          {/* Double Tap Heart Animation */}
          {isDoubleTapLiked && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Heart size={64} className="text-white fill-white drop-shadow-lg" />
            </motion.div>
          )}
        </div>

        {/* Caption Preview */}
        <div className="p-3">
          <p className="text-sm truncate">
            <span className="font-semibold mr-1">{username}</span>
            {caption}
          </p>
          <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
        </div>
      </motion.div>

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  )
}

