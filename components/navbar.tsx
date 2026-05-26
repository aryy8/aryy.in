"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "live-projects", label: "Live Projects" },
  { id: "projects", label: "Hackathon Builds" },
  { id: "achievements", label: "Achievements" },
  { id: "blog", label: "Blogs" },
  { id: "notes", label: "Notes" },

]

export function Navbar() {
  const [activeSection, setActiveSection] = useState("about")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

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

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight text-foreground/90 cursor-pointer hover:text-foreground transition-colors" onClick={scrollToTop}>aryy.in</div>

        <div
          className="hidden lg:grid absolute left-1/2 -translate-x-1/2 w-full max-w-2xl px-8"
          style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}
        >
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="group relative flex flex-col items-center gap-2 cursor-pointer justify-center"
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeSection === id ? "bg-foreground scale-150" : "bg-foreground/30 group-hover:bg-foreground/60",
                )}
              />
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-foreground/50 whitespace-nowrap">
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* Theme toggle button */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center justify-center w-9 h-9"
          aria-label="Toggle theme"
        >
          <div
            className="transition-transform duration-500"
            style={{
              transform: mounted && theme === "light" ? "rotate(180deg)" : "rotate(0deg)",
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <svg viewBox="0 0 48 48" width="18" height="18" className="fill-foreground">
              <path d="M14,24A10,10,0,0,0,24,34V14A10,10,0,0,0,14,24Z"/>
              <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM6,24A18.1,18.1,0,0,1,24,6v8a10,10,0,0,1,0,20v8A18.1,18.1,0,0,1,6,24Z"/>
            </svg>
          </div>
        </button>
      </div>
    </nav>
  )
}
