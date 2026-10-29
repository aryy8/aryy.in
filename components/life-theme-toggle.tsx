"use client"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function LifeThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="life-toggle flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted/50 transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      <div
        className="transition-transform duration-500"
        style={{
          transform: mounted && theme === "light" ? "rotate(180deg)" : "rotate(0deg)",
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <svg viewBox="0 0 48 48" width="17" height="17" className="fill-foreground">
          <path d="M14,24A10,10,0,0,0,24,34V14A10,10,0,0,0,14,24Z"/>
          <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM6,24A18.1,18.1,0,0,1,24,6v8a10,10,0,0,1,0,20v8A18.1,18.1,0,0,1,6,24Z"/>
        </svg>
      </div>
    </button>
  )
}
