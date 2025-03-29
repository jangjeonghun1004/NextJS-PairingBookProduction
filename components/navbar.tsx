"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import CustomLogo from "./icons/custom-logo"
import { useTheme } from "./theme-provider"
import { Avatar } from "@/components/ui/avatar"
import { User, Settings, LogOut, BookOpen, PenSquare, MessageCircle, Users, ChevronDown } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { logoColor, logoStrokeColor } = useTheme()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [showProfileMobileMenu, setShowProfileMobileMenu] = useState(false)
  const profileMobileMenuRef = useRef<HTMLDivElement>(null);

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // 데모 목적으로 로그인 상태 시뮬레이션
    // 실제 구현에서는 세션/쿠키/토큰 등으로 확인
    const simulateLogin = () => {
      // 50% 확률로 로그인 상태 설정 (데모용)
      setIsLoggedIn(true)
    }

    simulateLogin()

    // 프로필 메뉴 외부 클릭 감지
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }

      if (profileMobileMenuRef.current && !profileMobileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMobileMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  // More dynamic animation variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const mobileItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Link href="/">
            <div className="flex items-center gap-2">
              <CustomLogo
                width={32}
                height={32}
                primaryColor="" // 고정 색상 적용
                strokeColor="rgb(223, 29, 71)" // 고정 색상 적용
              />
              <span className="font-bold text-rose-600 text-lg">페어링 BOOK</span>
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {[
            { name: "독서 이야기", id: "stories", href: "/stories" },
            { name: "독서 토론", id: "discussion-create", href: "/discussions" },
            { name: "페어링 친구", id: "pairing", href: "/pairing" },
          ].map((item, index) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Link href={item.href}>
                <motion.span
                  className="text-rose-700 hover:text-rose-500 font-medium cursor-pointer"
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.span>
              </Link>
            </motion.div>
          ))}

          {/* Profile Creation Button - 로그인 상태가 아닐 때만 표시 */}
          {!isLoggedIn && (
            <motion.div variants={itemVariants}>
              <Link href="/profile/create">
                <motion.button
                  className="flex items-center gap-1 px-4 py-2 bg-rose-100 text-rose-600 rounded-full font-medium hover:bg-rose-200 transition-colors"
                  whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User size={16} />
                  <span>프로필 작성</span>
                </motion.button>
              </Link>
            </motion.div>
          )}

          {/* Login Button or Avatar */}
          <motion.div variants={itemVariants}>
            {isLoggedIn ? (
              <div className="relative" ref={profileMenuRef}>
                <motion.div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Avatar className="h-9 w-9 border-2 border-rose-200">
                    <Image
                      src="/placeholder.svg?height=36&width=36"
                      alt="프로필 이미지"
                      width={36}
                      height={36}
                      className="object-cover"
                    />
                  </Avatar>
                  <ChevronDown size={16} className="text-gray-500" />
                </motion.div>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <motion.div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-20 py-1 border border-gray-200"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">김독서</p>
                      <p className="text-xs text-gray-500 truncate">reader@example.com</p>
                    </div>
                    <Link href="/profile/bookworm_jane">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User size={16} className="mr-2" />
                        <span>내 프로필</span>
                      </button>
                    </Link>
                    <Link href="/account/settings">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings size={16} className="mr-2" />
                        <span>계정 설정</span>
                      </button>
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      <LogOut size={16} className="mr-2" />
                      <span>로그아웃</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <motion.button
                  className="px-5 py-2 bg-rose-500 text-white rounded-full font-medium shadow-sm hover:bg-rose-600 transition-colors ml-2"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  로그인
                </motion.button>
              </Link>
            )}
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Stories Link for Mobile */}
          {/* <motion.div variants={itemVariants}>
            <Link href="/stories">
              <motion.button
                className="flex items-center justify-center p-2 bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="독서 이야기"
              >
                <BookOpen size={18} />
              </motion.button>
            </Link>
          </motion.div> */}

          {/* Diary Link for Mobile */}
          {/* <motion.div variants={itemVariants}>
            <Link href="/diary/create">
              <motion.button
                className="flex items-center justify-center p-2 bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="독서 일기"
              >
                <PenSquare size={18} />
              </motion.button>
            </Link>
          </motion.div> */}

          {/* Discussion Link for Mobile */}
          {/* <motion.div variants={itemVariants}>
            <Link href="/discussions">
              <motion.button
                className="flex items-center justify-center p-2 bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="독서 토론"
              >
                <MessageCircle size={18} />
              </motion.button>
            </Link>
          </motion.div> */}

          {/* Pairing Link for Mobile */}
          {/* <motion.div variants={itemVariants}>
            <Link href="/pairing">
              <motion.button
                className="flex items-center justify-center p-2 bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="페어링 친구"
              >
                <Users size={18} />
              </motion.button>
            </Link>
          </motion.div> */}

          {/* Login Button or Avatar for Mobile */}
          <motion.div variants={itemVariants}>
            {isLoggedIn ? (
              <div className="relative" ref={profileMobileMenuRef}>
                <motion.div
                  onClick={() => setShowProfileMobileMenu(!showProfileMobileMenu)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Avatar className="h-8 w-8 border-2 border-rose-200">
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      alt="프로필 이미지"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </Avatar>
                </motion.div>

                {/* Mobile Profile Dropdown Menu */}
                {showProfileMobileMenu && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 py-1 border border-gray-200"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">김독서</p>
                      <p className="text-xs text-gray-500 truncate">reader@example.com</p>
                    </div>
                    <Link href="/profile/bookworm_jane">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User size={14} className="mr-2" />
                        <span>내 프로필</span>
                      </button>
                    </Link>
                    <Link href="/account/settings">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings size={14} className="mr-2" />
                        <span>계정 설정</span>
                      </button>
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      <LogOut size={14} className="mr-2" />
                      <span>로그아웃</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <motion.button
                  className="px-4 py-1.5 bg-rose-500 text-white rounded-full font-medium text-sm shadow-sm hover:bg-rose-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  로그인
                </motion.button>
              </Link>
            )}
          </motion.div>

          {/* 모바일 메뉴 버튼은 유지 */}
          <motion.button
            className="text-rose-600 p-2"
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 180, transition: { duration: 0.5 } }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md shadow-md p-4 rounded-b-lg overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col gap-4">
              {[
                { name: "독서 이야기", id: "stories", href: "/stories" },
                { name: "독서 토론", id: "discussion-create", href: "/discussions" },
                { name: "페어링 친구", id: "pairing", href: "/pairing" },
              ].map((item, index) => (
                <motion.div key={item.id} variants={mobileItemVariants}>
                  <Link href={item.href}>
                    <span className="block text-rose-700 hover:text-rose-500 font-medium py-2 text-left">
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

