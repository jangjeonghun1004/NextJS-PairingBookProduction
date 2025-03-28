"use client"

import SectionContainer from "./section-container"
import AnimatedText from "./animated-text"
import AnimatedButton from "./animated-button"

export default function CTASection() {
  return (
    <SectionContainer title="지금 시작하세요" id="cta" bgColor="bg-violet-50/50">
      <div className="space-y-8">
        <AnimatedText className="text-lg">
          당신의 특별한 이야기가 기다리고 있습니다. 지금 Love ∞ STORY와 함께 새로운 챕터를 시작하세요.
        </AnimatedText>

        <div className="flex justify-center">
          <AnimatedButton className="bg-violet-500 hover:bg-violet-600">무료로 시작하기</AnimatedButton>
        </div>
      </div>
    </SectionContainer>
  )
}

