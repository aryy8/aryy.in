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
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const dockRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Smooth tooltip overflow delay: keeps overflow hidden during expansion,
  // then enables visible overflow so floating tooltips are unclipped once fully open.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (isHovered) {
      timer = setTimeout(() => {
        setIsOpen(true)
      }, 360)
    } else {
      setIsOpen(false)
    }
    return () => clearTimeout(timer)
  }, [isHovered])

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 select-none pb-[env(safe-area-inset-bottom)] group"
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
          "transition-[box-shadow,border-color,background-color] duration-380",
          "will-change-[max-width,transform]",
          isHovered && "shadow-[0_20px_48px_-8px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.55)] dark:shadow-[0_24px_52px_-8px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.3)]"
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Core items (Always visible): X, GitHub, LinkedIn, Resume */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* X (formerly Twitter) */}
          <a
            href="https://x.com/aryyann8"
            target="_blank"
            rel="noopener noreferrer"
            className="group/item relative flex items-center justify-center size-8 sm:size-9 rounded-full text-foreground/75 hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="X Profile"
          >
            <svg className="size-3.5 sm:size-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-background/95 dark:bg-neutral-900/95 text-foreground border border-border/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
              X
            </span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/aryy8"
            target="_blank"
            rel="noopener noreferrer"
            className="group/item relative flex items-center justify-center size-8 sm:size-9 rounded-full text-foreground/75 hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="GitHub Profile"
          >
            <Github className="size-4 stroke-[1.8]" />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-background/95 dark:bg-neutral-900/95 text-foreground border border-border/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
              GitHub
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/aryan-rastogi"
            target="_blank"
            rel="noopener noreferrer"
            className="group/item relative flex items-center justify-center size-8 sm:size-9 rounded-full text-foreground/75 hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="size-4 stroke-[1.8]" />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-background/95 dark:bg-neutral-900/95 text-foreground border border-border/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
              LinkedIn
            </span>
          </a>

          {/* Resume */}
          <a
            href="/Aryan_Rastogi_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group/item relative flex items-center justify-center size-8 sm:size-9 rounded-full text-foreground/75 hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="View Resume"
          >
            <FileText className="size-4 stroke-[1.8]" />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-background/95 dark:bg-neutral-900/95 text-foreground border border-border/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
              Resume
            </span>
          </a>
        </div>

        {/* Expandable Section: Revealed on hover (Switch, Darkmode, Profile Icon) */}
        <div
          className={cn(
            "flex items-center shrink-0 transition-[max-width,opacity,margin] duration-380",
            isHovered
              ? "max-w-[150px] sm:max-w-[160px] opacity-100 ml-1 sm:ml-1.5"
              : "max-w-0 opacity-0 ml-0 pointer-events-none"
          )}
          style={{
            overflow: isOpen ? "visible" : "hidden",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Separator Hairline */}
          <div className="h-4 w-px bg-foreground/15 dark:bg-white/15 mx-0.5 shrink-0" />

          <div
            className={cn(
              "flex items-center gap-1 sm:gap-1.5 shrink-0 pl-1 transition-transform duration-380",
              isHovered ? "translate-x-0" : "translate-x-2"
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* iOS Small Switch: Agent / Human mode */}
            {onToggleAgentic && (
              <button
                type="button"
                role="switch"
                aria-checked={isAgenticMode}
                onClick={onToggleAgentic}
                className="group/item relative flex items-center justify-center size-8 sm:size-9 rounded-full hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
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
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-background/95 dark:bg-neutral-900/95 text-foreground border border-border/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
                  {isAgenticMode ? "Agent Mode" : "Human Mode"}
                </span>
              </button>
            )}

            {/* Dark/Light Mode Rotating Icon */}
            <button
              type="button"
              onClick={toggleTheme}
              className="group/item relative flex items-center justify-center size-8 sm:size-9 rounded-full text-foreground hover:bg-foreground/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
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
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-background/95 dark:bg-neutral-900/95 text-foreground border border-border/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
                {mounted && theme === "light" ? "Dark Mode" : "Light Mode"}
              </span>
            </button>

            {/* Profile Icon (Scrolls to top) */}
            <button
              type="button"
              onClick={scrollToTop}
              className="group/item relative flex items-center justify-center ml-0.5 cursor-pointer active:scale-95 transition-transform shrink-0"
              aria-label="Aryan Rastogi Profile"
            >
              <div className="size-7 sm:size-7.5 rounded-full border border-foreground/25 dark:border-white/30 overflow-hidden shrink-0 shadow-2xs ring-1 ring-foreground/10 dark:ring-white/15 group-hover/item:ring-foreground/40 transition-all">
                <img
                  src="/profilepic.webp"
                  alt="Aryan Rastogi"
                  width={30}
                  height={30}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide bg-background/95 dark:bg-neutral-900/95 text-foreground border border-border/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
                Aryan
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
