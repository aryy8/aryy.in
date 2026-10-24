"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useTheme } from "next-themes"
import { FileText, Github, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

interface LiquidGlassDockProps {
  onToggleAgentic?: () => void
  isAgenticMode?: boolean
}

export function LiquidGlassDock({ onToggleAgentic, isAgenticMode }: LiquidGlassDockProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const humanBtnRef = useRef<HTMLButtonElement>(null)
  const agentBtnRef = useRef<HTMLButtonElement>(null)
  const [pillStyle, setPillStyle] = useState({ left: 2, width: 52 })

  useEffect(() => {
    setMounted(true)
  }, [])

  const measurePill = useCallback(() => {
    const activeBtn = isAgenticMode ? agentBtnRef.current : humanBtnRef.current
    if (activeBtn) {
      setPillStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      })
    }
  }, [isAgenticMode])

  useEffect(() => {
    measurePill()
  }, [measurePill, mounted])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <nav
      aria-label="Liquid Glass Dock"
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 select-none pb-[env(safe-area-inset-bottom)]"
    >
      {/* Pill-shaped ultra-transparent liquid glass container */}
      <div
        className={cn(
          "relative flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-full",
          // iOS Transparent Liquid Glass
          "bg-background/35 dark:bg-black/35 backdrop-blur-2xl backdrop-saturate-200",
          "border border-foreground/15 dark:border-white/20",
          "shadow-[0_16px_40px_-8px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.45)] dark:shadow-[0_20px_45px_-8px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.22)]",
          "ring-1 ring-black/5 dark:ring-white/10"
        )}
      >
        {/* iOS Spring Sliding Toggle: human | agent */}
        {onToggleAgentic && (
          <div className="relative flex items-center p-0.5 rounded-full bg-foreground/8 dark:bg-white/10 border border-foreground/10 dark:border-white/10 backdrop-blur-xs">
            {/* Liquid shifting indicator */}
            <div
              className="absolute top-0.5 bottom-0.5 rounded-full bg-foreground shadow-sm"
              style={{
                left: pillStyle.left,
                width: pillStyle.width,
                transition: "left 380ms cubic-bezier(0.34, 1.56, 0.64, 1), width 380ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />

            <button
              ref={humanBtnRef}
              onClick={() => isAgenticMode && onToggleAgentic()}
              className={cn(
                "relative z-10 px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-mono cursor-pointer select-none",
                "transition-colors duration-250 ease-out",
                !isAgenticMode ? "text-background font-medium" : "text-foreground/60 hover:text-foreground"
              )}
              aria-label="Human View"
            >
              human
            </button>

            <button
              ref={agentBtnRef}
              onClick={() => !isAgenticMode && onToggleAgentic()}
              className={cn(
                "relative z-10 px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-mono cursor-pointer select-none",
                "transition-colors duration-250 ease-out",
                isAgenticMode ? "text-background font-medium" : "text-foreground/60 hover:text-foreground"
              )}
              aria-label="Agent View"
            >
              agent
            </button>
          </div>
        )}

        {/* Separator Hairline */}
        <div className="h-4 w-px bg-foreground/15 dark:bg-white/15 mx-0.5" />

        {/* Resume */}
        <a
          href="/Aryan_Rastogi_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center size-8 sm:size-9 rounded-full text-foreground/75 hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="View Resume"
        >
          <FileText className="size-4 stroke-[1.8]" />
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-background/95 dark:bg-neutral-900/95 text-foreground border border-border/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
            Resume
          </span>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/aryy8"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center size-8 sm:size-9 rounded-full text-foreground/75 hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="GitHub Profile"
        >
          <Github className="size-4 stroke-[1.8]" />
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-background/95 dark:bg-neutral-900/95 text-foreground border border-border/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
            GitHub
          </span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/aryan-rastogi"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center size-8 sm:size-9 rounded-full text-foreground/75 hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="size-4 stroke-[1.8]" />
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-background/95 dark:bg-neutral-900/95 text-foreground border border-border/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
            LinkedIn
          </span>
        </a>

        {/* Mail */}
        <a
          href="mailto:aryanfeb17@gmail.com"
          className="group relative flex items-center justify-center size-8 sm:size-9 rounded-full text-foreground/75 hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Send Email"
        >
          <Mail className="size-4 stroke-[1.8]" />
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-background/95 dark:bg-neutral-900/95 text-foreground border border-border/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
            Email
          </span>
        </a>

        {/* Separator Hairline */}
        <div className="h-4 w-px bg-foreground/15 dark:bg-white/15 mx-0.5" />

        {/* Previous Dark/Light Mode Rotating Circle Icon */}
        <button
          onClick={toggleTheme}
          className="group relative flex items-center justify-center size-8 sm:size-9 rounded-full text-foreground hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Toggle Theme Mode"
        >
          <div
            className="transition-transform duration-500"
            style={{
              transform: mounted && theme === "light" ? "rotate(180deg)" : "rotate(0deg)",
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <svg viewBox="0 0 48 48" width="16" height="16" className="fill-foreground">
              <path d="M14,24A10,10,0,0,0,24,34V14A10,10,0,0,0,14,24Z" />
              <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM6,24A18.1,18.1,0,0,1,24,6v8a10,10,0,0,1,0,20v8A18.1,18.1,0,0,1,6,24Z" />
            </svg>
          </div>
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-background/95 dark:bg-neutral-900/95 text-foreground border border-border/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
            {mounted && theme === "light" ? "Dark Mode" : "Light Mode"}
          </span>
        </button>

        {/* Avatar Profile (Click scrolls smoothly to top) */}
        <button
          onClick={scrollToTop}
          className="group relative flex items-center justify-center ml-0.5 cursor-pointer active:scale-95 transition-transform"
          aria-label="Aryan Rastogi Profile"
        >
          <div className="size-7 sm:size-7.5 rounded-full border border-foreground/25 dark:border-white/30 overflow-hidden shrink-0 shadow-2xs ring-1 ring-foreground/10 dark:ring-white/15 group-hover:ring-foreground/40 transition-all">
            <img
              src="/profilepic.webp"
              alt="Aryan Rastogi"
              width={30}
              height={30}
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-background/95 dark:bg-neutral-900/95 text-foreground border border-border/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
            Aryan
          </span>
        </button>
      </div>
    </nav>
  )
}
