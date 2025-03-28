"use client"

import { useState } from "react"
import { useTheme } from "./theme-provider"
import CustomLogo from "./icons/custom-logo"

export default function LogoCustomizer() {
  const { logoColor, setLogoColor, logoStrokeColor, setLogoStrokeColor } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const presetColors = [
    { primary: "#db2777", stroke: "#f43f5e" }, // Default (Rose - Version 16)
    { primary: "#8b5cf6", stroke: "#a78bfa" }, // Violet (Version 17)
    { primary: "#0ea5e9", stroke: "#38bdf8" }, // Sky
    { primary: "#10b981", stroke: "#34d399" }, // Emerald
    { primary: "#f59e0b", stroke: "#fbbf24" }, // Amber
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
      >
        <CustomLogo width={24} height={24} primaryColor={logoColor} strokeColor={logoStrokeColor} />
        <span className="text-sm font-medium">로고 색상 변경</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 p-4 bg-white rounded-lg shadow-lg z-50 w-64">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">메인 색상</label>
              <input
                type="color"
                value={logoColor}
                onChange={(e) => setLogoColor(e.target.value)}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">테두리 색상</label>
              <input
                type="color"
                value={logoStrokeColor}
                onChange={(e) => setLogoStrokeColor(e.target.value)}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">프리셋 색상</label>
              <div className="flex flex-wrap gap-2">
                {presetColors.map((colors, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setLogoColor(colors.primary)
                      setLogoStrokeColor(colors.stroke)
                    }}
                    className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 hover:scale-110 transition-transform"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.stroke} 100%)`,
                    }}
                    aria-label={`Color preset ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-sm text-gray-500 mb-2">미리보기:</p>
              <div className="flex justify-center p-2 bg-gray-50 rounded">
                <CustomLogo
                  width={48}
                  height={48}
                  primaryColor={logoColor}
                  strokeColor={logoStrokeColor}
                  animated={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

