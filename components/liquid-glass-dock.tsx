"use client"

import { useState, useEffect } from "react"
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

  useEffect(() => {
    setMounted(true)
  }, [])

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
        {/* iOS Small Switch: Agent / Human mode */}
        {onToggleAgentic && (
          <button
            type="button"
            role="switch"
            aria-checked={isAgenticMode}
            onClick={onToggleAgentic}
            className="group relative flex items-center justify-center size-8 sm:size-9 rounded-full hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label={isAgenticMode ? "Switch to Human View" : "Switch to Agent View"}
          >
            <div
              className={cn(
                "relative w-7 h-4 rounded-full p-0.5 transition-colors duration-300 ease-out border border-black/10 dark:border-white/10",
                isAgenticMode ? "bg-[#34C759] dark:bg-[#30D158]" : "bg-neutral-300 dark:bg-neutral-700/80"
              )}
            >
              <div
                className={cn(
                  "size-3 rounded-full bg-white shadow-xs transition-transform duration-300",
                  isAgenticMode ? "translate-x-3" : "translate-x-0"
                )}
                style={{
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />
            </div>
            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-background/95 dark:bg-neutral-900/95 text-foreground border border-border/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
              {isAgenticMode ? "Agent Mode" : "Human Mode"}
            </span>
          </button>
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

        {/* X (formerly Twitter) */}
        <a
          href="https://x.com/aryyann8"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center size-8 sm:size-9 rounded-full text-foreground/75 hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="X Profile"
        >
          <svg className="size-3.5 sm:size-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-background/95 dark:bg-neutral-900/95 text-foreground border border-border/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
            X
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
