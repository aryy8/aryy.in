"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { FileText, Github, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"

interface LiquidGlassDockProps {
  onToggleAgentic?: () => void
  isAgenticMode?: boolean
}

export function LiquidGlassDock({ onToggleAgentic, isAgenticMode }: LiquidGlassDockProps) {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { theme, setTheme } = useTheme()
  const dockRef = useRef<HTMLElement>(null)
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Soft hover entry and gentle exit grace buffer (120ms) to eliminate jitter/flicker
  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, 120)
  }

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current)
    }
  }, [])

  // Collapse on mobile scroll or tap outside
  useEffect(() => {
    const handleScroll = () => {
      if (isHovered) setIsHovered(false)
    }
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setIsHovered(false)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [isHovered])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <nav
      ref={dockRef}
      aria-label="Liquid Glass Dock"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 select-none pb-[env(safe-area-inset-bottom)] group py-1 px-1.5"
    >
      {/* Pill-shaped ultra-transparent liquid glass container */}
      <div
        className={cn(
          "relative flex items-center p-1.5 sm:p-2 rounded-full",
          // iOS Transparent Liquid Glass
          "bg-background/35 dark:bg-black/35 backdrop-blur-2xl backdrop-saturate-200",
          "border border-foreground/15 dark:border-white/20",
          "shadow-[0_16px_40px_-8px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.45)] dark:shadow-[0_20px_45px_-8px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.22)]",
          "ring-1 ring-black/5 dark:ring-white/10",
          "transition-all duration-500",
          "will-change-[max-width,transform]",
          isHovered && "shadow-[0_20px_48px_-8px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.55)] dark:shadow-[0_24px_52px_-8px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.3)] bg-background/45 dark:bg-black/45"
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Core items (Always visible): X, GitHub, LinkedIn, Resume */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* X (formerly Twitter) */}
          <a
            href="https://x.com/aryyann8"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center size-8 sm:size-9 rounded-full text-foreground/75 hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-300 ease-out cursor-pointer"
            aria-label="X Profile"
          >
            <svg className="size-3.5 sm:size-4 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/aryy8"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center size-8 sm:size-9 rounded-full text-foreground/75 hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-300 ease-out cursor-pointer"
            aria-label="GitHub Profile"
          >
            <Github className="size-4 stroke-[1.8] transition-transform duration-300" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/aryy8"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center size-8 sm:size-9 rounded-full text-foreground/75 hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-300 ease-out cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="size-4 stroke-[1.8] transition-transform duration-300" />
          </a>

          {/* Resume */}
          <a
            href="/Aryan_Rastogi_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center size-8 sm:size-9 rounded-full text-foreground/75 hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-300 ease-out cursor-pointer"
            aria-label="View Resume"
          >
            <FileText className="size-4 stroke-[1.8] transition-transform duration-300" />
          </a>
        </div>

        {/* Expandable Section: Revealed on hover (Darkmode, Profile Icon) */}
        <div
          className={cn(
            "flex items-center shrink-0 overflow-hidden transition-all duration-500",
            isHovered
              ? "max-w-[85px] sm:max-w-[92px] opacity-100 ml-1 sm:ml-1.5"
              : "max-w-0 opacity-0 ml-0 pointer-events-none"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Separator Hairline */}
          <div className="h-4 w-px bg-foreground/15 dark:bg-white/15 mx-0.5 shrink-0" />

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 pl-1">
            {/* Dark/Light Mode Rotating Icon */}
            <button
              type="button"
              onClick={toggleTheme}
              className="relative flex items-center justify-center size-8 sm:size-9 rounded-full text-foreground hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-300 ease-out cursor-pointer shrink-0"
              aria-label="Toggle Theme Mode"
            >
              <div
                className="transition-transform duration-600"
                style={{
                  transform: mounted && theme === "light" ? "rotate(180deg)" : "rotate(0deg)",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <svg viewBox="0 0 48 48" width="16" height="16" className="fill-foreground">
                  <path d="M14,24A10,10,0,0,0,24,34V14A10,10,0,0,0,14,24Z" />
                  <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM6,24A18.1,18.1,0,0,1,24,6v8a10,10,0,0,1,0,20v8A18.1,18.1,0,0,1,6,24Z" />
                </svg>
              </div>
            </button>

            {/* Profile Icon (Scrolls to top) */}
            <button
              type="button"
              onClick={scrollToTop}
              className="relative flex items-center justify-center ml-0.5 cursor-pointer active:scale-95 transition-all duration-300 ease-out shrink-0"
              aria-label="Aryan Rastogi Profile"
            >
              <div className="size-7 sm:size-7.5 rounded-full border border-foreground/25 dark:border-white/30 overflow-hidden shrink-0 shadow-2xs ring-1 ring-foreground/10 dark:ring-white/15 hover:ring-foreground/40 transition-all duration-300">
                <img
                  src="/profilepic.webp"
                  alt="Aryan Rastogi"
                  width={30}
                  height={30}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
