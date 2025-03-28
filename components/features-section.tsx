"use client"

import SectionContainer from "./section-container"
import FeatureCard from "./feature-card"
import { Users, MessageCircleHeart } from "lucide-react"

export default function FeaturesSection() {
  return (
    <SectionContainer title="특별한 기능" id="features" bgColor="bg-rose-50/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeatureCard
          icon={<Users className="w-10 h-10 text-rose-500" />}
          title="AI 매칭 시스템"
          description="인공지능이 분석한 당신의 성향과 취향을 바탕으로 가장 잘 맞는 인연을 찾아드립니다."
          direction="left"
        />

        <FeatureCard
          icon={<MessageCircleHeart className="w-10 h-10 text-rose-500" />}
          title="실시간 대화"
          description="언제 어디서나 실시간으로 대화를 나눌 수 있습니다. 당신의 이야기를 함께 나누세요."
          direction="right"
        />
      </div>
    </SectionContainer>
  )
}

