"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
]

export function SidebarNav() {
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
      <div className="flex items-center gap-8">
        {navItems.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="group relative flex flex-col items-center gap-2 cursor-pointer"
          >
            <div
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                activeSection === id
                  ? "bg-foreground scale-150"
                  : "bg-muted-foreground/40 group-hover:bg-muted-foreground/70",
              )}
            />
            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-muted-foreground whitespace-nowrap">
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
