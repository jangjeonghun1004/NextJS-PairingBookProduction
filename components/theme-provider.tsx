"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

type ThemeContextType = {
  logoColor: string
  setLogoColor: (color: string) => void
  logoStrokeColor: string
  setLogoStrokeColor: (color: string) => void
}

// Update the default colors to match version 16
const ThemeContext = createContext<ThemeContextType>({
  logoColor: "#db2777", // Updated to rose-600 (version 16)
  setLogoColor: () => {},
  logoStrokeColor: "#f43f5e", // Updated to rose-500 (version 16)
  setLogoStrokeColor: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [logoColor, setLogoColor] = useState("#db2777")
  const [logoStrokeColor, setLogoStrokeColor] = useState("#f43f5e")

  return (
    <ThemeContext.Provider
      value={{
        logoColor,
        setLogoColor,
        logoStrokeColor,
        setLogoStrokeColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

