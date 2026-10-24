"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Home, FileText, Github, Linkedin, Mail, Sun, Moon, Bot, Sparkles } from "lucide-react"
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
      {/* Pill-shaped liquid glass container */}
      <div
        className={cn(
          "relative flex items-center gap-1.5 sm:gap-2.5 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-full",
          "bg-neutral-950/80 dark:bg-black/75 backdrop-blur-2xl backdrop-saturate-150",
          "border border-white/18 dark:border-white/15",
          "shadow-[0_16px_40px_-6px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.24)]",
          "ring-1 ring-black/40"
        )}
      >
        {/* Active Pill: Home Button */}
        <button
          onClick={scrollToTop}
          className="group relative flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/18 hover:bg-white/26 active:scale-95 text-white transition-all duration-200 cursor-pointer shadow-xs"
          aria-label="Home / Scroll to Top"
          title="Home"
        >
          <Home className="size-4 sm:size-4.5 stroke-[2.2]" />
          <span className="sr-only">Home</span>
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-neutral-900/90 text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
            Home
          </span>
        </button>

        {/* Separator */}
        <div className="h-4 w-px bg-white/15 mx-0.5" />

        {/* Resume */}
        <a
          href="/Aryan_Rastogi_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center size-9 sm:size-10 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="View Resume"
        >
          <FileText className="size-4 sm:size-4.5 stroke-[1.8]" />
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-neutral-900/90 text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
            Resume
          </span>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/aryy8"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center size-9 sm:size-10 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="GitHub Profile"
        >
          <Github className="size-4 sm:size-4.5 stroke-[1.8]" />
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-neutral-900/90 text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
            GitHub
          </span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/aryan-rastogi"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center size-9 sm:size-10 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="size-4 sm:size-4.5 stroke-[1.8]" />
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-neutral-900/90 text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
            LinkedIn
          </span>
        </a>

        {/* Mail */}
        <a
          href="mailto:aryanfeb17@gmail.com"
          className="group relative flex items-center justify-center size-9 sm:size-10 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Send Email"
        >
          <Mail className="size-4 sm:size-4.5 stroke-[1.8]" />
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-neutral-900/90 text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
            Email
          </span>
        </a>

        {/* Separator */}
        <div className="h-4 w-px bg-white/15 mx-0.5" />

        {/* Mode / Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="group relative flex items-center justify-center size-9 sm:size-10 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Toggle Theme Mode"
        >
          {mounted && theme === "light" ? (
            <Moon className="size-4 sm:size-4.5 stroke-[1.8] text-amber-300" />
          ) : (
            <Sun className="size-4 sm:size-4.5 stroke-[1.8] text-amber-300" />
          )}
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-neutral-900/90 text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
            {mounted && theme === "light" ? "Dark Mode" : "Light Mode"}
          </span>
        </button>

        {/* Agentic View Mode Switch */}
        {onToggleAgentic && (
          <button
            onClick={onToggleAgentic}
            className={cn(
              "group relative flex items-center justify-center size-9 sm:size-10 rounded-full active:scale-95 transition-all duration-200 cursor-pointer",
              isAgenticMode
                ? "bg-sky-500/25 text-sky-300 ring-1 ring-sky-400/40"
                : "text-neutral-300 hover:text-white hover:bg-white/10"
            )}
            aria-label={isAgenticMode ? "Switch to Human View" : "Switch to Agent View"}
          >
            {isAgenticMode ? (
              <Sparkles className="size-4 sm:size-4.5 stroke-[2] text-sky-300" />
            ) : (
              <Bot className="size-4 sm:size-4.5 stroke-[1.8]" />
            )}
            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-neutral-900/90 text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
              {isAgenticMode ? "Human View" : "Agent View"}
            </span>
          </button>
        )}

        {/* Avatar Profile (Rightmost icon like iOS dock) */}
        <button
          onClick={scrollToTop}
          className="group relative flex items-center justify-center ml-0.5 cursor-pointer active:scale-95 transition-transform"
          aria-label="Aryan Rastogi Profile"
        >
          <div className="size-7 sm:size-8 rounded-full border border-white/30 overflow-hidden shrink-0 shadow-xs ring-1 ring-white/15 group-hover:ring-white/40 transition-all">
            <img
              src="/profilepic.webp"
              alt="Aryan Rastogi"
              width={32}
              height={32}
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-neutral-900/90 text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
            Aryan
          </span>
        </button>
      </div>
    </nav>
  )
}
