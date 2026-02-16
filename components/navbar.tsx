"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "live-projects", label: "Live Projects" },
  { id: "projects", label: "Hackathon Builds" },
  { id: "achievements", label: "Achievements" },
  { id: "blog", label: "Blog" },
  { id: "notes", label: "Notes" },

]

export function Navbar() {
  const [activeSection, setActiveSection] = useState("about")

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
      <div className="absolute inset-0 bg-black/20 backdrop-blur-3xl" />

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />

      {/* Top border for definition */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Bottom border for definition */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight text-white/90 cursor-pointer hover:text-white transition-colors" onClick={scrollToTop}>aryy.in</div>

        <div className="hidden lg:flex items-center justify-center gap-6 absolute left-1/2 -translate-x-1/2 w-full max-w-2xl">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="group relative flex flex-col items-center gap-2 cursor-pointer flex-1"
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeSection === id ? "bg-white scale-150" : "bg-white/30 group-hover:bg-white/60",
                )}
              />
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white/50 whitespace-nowrap">
                {label}
              </span>
            </button>
          ))}
        </div>

        <div />
      </div>
    </nav>
  )
}
