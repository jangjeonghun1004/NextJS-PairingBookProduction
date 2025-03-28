"use client"
import InstagramFeed from "./components/instagram-feed"
import HeroSection from "./components/hero-section"
import Navbar from "./components/navbar"

export default function ExamplePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <div className="py-16">
        <InstagramFeed />
      </div>
    </div>
  )
}

