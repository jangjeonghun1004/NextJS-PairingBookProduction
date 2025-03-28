"use client"

import SectionContainer from "./section-container"
import TestimonialCard from "./testimonial-card"

export default function TestimonialsSection() {
  return (
    <SectionContainer title="사용자 후기" id="testimonials" bgColor="bg-white">
      <div className="space-y-6">
        <TestimonialCard
          initials="JK"
          name="김지현"
          quote="Love ∞ STORY 덕분에 제 인생의 반려자를 만났어요. 정말 감사합니다!"
          delay={0.2}
        />

        <TestimonialCard
          initials="SJ"
          name="이수진"
          quote="AI 매칭 시스템이 정말 놀라워요. 제가 찾던 바로 그 사람을 만날 수 있었습니다."
          delay={0.4}
        />
      </div>
    </SectionContainer>
  )
}

