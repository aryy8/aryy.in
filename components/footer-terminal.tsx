"use client"

import { useEffect, useRef, useState } from "react"

export function FooterTerminal() {
  const [phase, setPhase] = useState<"idle" | "typing" | "response" | "done">("idle")
  const [typed, setTyped] = useState("")
  const footerRef = useRef<HTMLElement>(null)
  const hasPlayed = useRef(false)

  const command = "whoami"
  const response = "aryan rastogi"

  // Trigger animation when footer scrolls into view
  useEffect(() => {
    const el = footerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true
          setPhase("typing")
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Type out the command character by character
  useEffect(() => {
    if (phase !== "typing") return

    if (typed.length < command.length) {
      const timeout = setTimeout(() => {
        setTyped(command.slice(0, typed.length + 1))
      }, 80 + Math.random() * 60) // Slightly random timing for realism
      return () => clearTimeout(timeout)
    } else {
      // Command fully typed, show response after a beat
      const timeout = setTimeout(() => setPhase("response"), 400)
      return () => clearTimeout(timeout)
    }
  }, [phase, typed])

  // After response shows, mark done
  useEffect(() => {
    if (phase !== "response") return
    const timeout = setTimeout(() => setPhase("done"), 600)
    return () => clearTimeout(timeout)
  }, [phase])

  return (
    <footer ref={footerRef} className="pt-20 pb-16">
      <div className="flex flex-col items-center gap-5">
        {/* Separator */}
        <div className="w-10 h-px bg-foreground/10 mb-2" />

        {/* Terminal block */}
        <div className="font-mono text-sm sm:text-base text-center space-y-1.5">
          {/* Command line */}
          <div className="text-muted-foreground">
            <span className="text-foreground/40">$ </span>
            <span className="text-muted-foreground">{typed}</span>
            {phase === "typing" && (
              <span className="inline-block w-[2px] h-[14px] bg-foreground/60 ml-0.5 align-middle animate-pulse" />
            )}
          </div>

          {/* Response */}
          <div
            className={`transition-all duration-500 ease-out ${
              phase === "response" || phase === "done"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <span className="text-foreground font-medium tracking-wide">
              {response}
            </span>
          </div>
        </div>

        {/* Year — fades in last */}
        <span
          className={`text-[10px] font-mono text-muted-foreground/40 tracking-[0.4em] transition-opacity duration-700 ${
            phase === "done" ? "opacity-100" : "opacity-0"
          }`}
        >
          2026
        </span>
      </div>
    </footer>
  )
}
