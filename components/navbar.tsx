"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Bot, Search } from "lucide-react"

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "live-projects", label: "Products" },
  { id: "projects", label: "Hackathon Builds" },
  { id: "achievements", label: "Achievements" },
  { id: "blog", label: "Blogs" },
  { id: "notes", label: "Notes" },

]

interface NavbarProps {
  onToggleAgentic?: () => void
  isAgenticMode?: boolean
}

export function Navbar({ onToggleAgentic, isAgenticMode }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("about")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const humanBtnRef = useRef<HTMLButtonElement>(null)
  const agentBtnRef = useRef<HTMLButtonElement>(null)
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 })

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
  }, [measurePill])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Glass background layer with strong blur and gradient */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-3xl" />

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 via-transparent to-transparent" />

      {/* Top border for definition */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />

      {/* Bottom border for definition */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-14 flex items-center justify-between">
        <div className="text-lg sm:text-xl font-bold tracking-tight text-foreground/90 cursor-pointer hover:text-foreground transition-colors shrink-0 font-mono" onClick={scrollToTop}>
          aryy.in
        </div>

        <div
          className="hidden lg:grid absolute left-1/2 -translate-x-1/2 w-full max-w-xl px-8 items-center"
          style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}
        >
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="group relative flex items-center justify-center cursor-pointer py-2"
              title={label}
            >
              <div
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300",
                  activeSection === id ? "bg-foreground scale-150" : "bg-foreground/30 group-hover:bg-foreground/70",
                )}
              />
            </button>
          ))}
        </div>

        {/* Right side controls: Minimal human | agent toggle + Theme toggle */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {onToggleAgentic && (
            <div className="relative inline-flex items-center p-0.5 rounded-full border border-border/70 bg-secondary/30 backdrop-blur-xs">
              {/* Sliding pill indicator */}
              <div
                className="absolute top-0.5 bottom-0.5 rounded-full bg-foreground shadow-lg"
                style={{
                  left: pillStyle.left,
                  width: pillStyle.width,
                  transition: 'left 400ms cubic-bezier(0.22, 1, 0.36, 1), width 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              />
              <button
                ref={humanBtnRef}
                onClick={() => isAgenticMode && onToggleAgentic()}
                className={cn(
                  "relative z-10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-mono cursor-pointer select-none",
                  "transition-colors duration-300 ease-out",
                  !isAgenticMode ? "text-background font-medium" : "text-muted-foreground hover:text-foreground"
                )}
              >
                human
              </button>
              <button
                ref={agentBtnRef}
                onClick={() => !isAgenticMode && onToggleAgentic()}
                className={cn(
                  "relative z-10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-mono cursor-pointer select-none",
                  "transition-colors duration-300 ease-out",
                  isAgenticMode ? "text-background font-medium" : "text-muted-foreground hover:text-foreground"
                )}
              >
                agent
              </button>
            </div>
          )}


          {/* Theme toggle button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted/50 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            <div
              className="flex items-center justify-center w-[17px] h-[17px] leading-none origin-center transition-transform duration-500 will-change-transform"
              style={{
                transform: mounted && theme === "light" ? "rotate(180deg)" : "rotate(0deg)",
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <svg viewBox="0 0 48 48" width="17" height="17" className="block fill-foreground">
                <path d="M14,24A10,10,0,0,0,24,34V14A10,10,0,0,0,14,24Z"/>
                <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM6,24A18.1,18.1,0,0,1,24,6v8a10,10,0,0,1,0,20v8A18.1,18.1,0,0,1,6,24Z"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}
