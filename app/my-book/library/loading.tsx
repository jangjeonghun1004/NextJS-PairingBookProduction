import { Loader2 } from "lucide-react"
import Navbar from "@/components/navbar"

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-24 px-4 flex items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-rose-500 animate-spin mb-4" />
          <p className="text-gray-600">책을 불러오는 중...</p>
        </div>
      </div>
    </div>
  )
}

