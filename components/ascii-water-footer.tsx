"use client"

import { useEffect, useRef, useState } from "react"

interface Ripple {
  x: number
  y: number
  time: number
  strength: number
  maxRadius: number
}

// Gentle, organic water glyphs — wave contours from calm swell to foaming crest
const WATER_CHARS = ["·", "~", "∼", "≈", "≋"]

export function AsciiWaterFooter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snoopyHovered, setSnoopyHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animId = 0
    let width = container.clientWidth
    let height = container.clientHeight

    const cellW = 8
    const cellH = 13
    let cols = Math.ceil(width / cellW)
    let rows = Math.ceil(height / cellH)

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const updateSize = () => {
      if (!container || !canvas) return
      width = container.clientWidth
      height = container.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = Math.ceil(width / cellW)
      rows = Math.ceil(height / cellH)
    }

    updateSize()

    const resizeObserver = new ResizeObserver(() => {
      updateSize()
    })
    resizeObserver.observe(container)

    // Pointer state
    const pointer = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      active: false,
    }

    // Active expanding ripples
    const ripples: Ripple[] = []

    const addRipple = (x: number, y: number, strength = 0.85, maxRadius = 240) => {
      if (ripples.length > 20) ripples.shift()
      ripples.push({
        x,
        y,
        time: performance.now(),
        strength,
        maxRadius,
      })
    }

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top

      if (pointer.active) {
        const dx = px - pointer.prevX
        const dy = py - pointer.prevY
        const dist = Math.hypot(dx, dy)

        // Trailing ripples as cursor moves through surfing waves
        if (dist > 10) {
          const strength = Math.min(dist * 0.04, 1.2)
          addRipple(px, py, strength, 180)
          pointer.prevX = px
          pointer.prevY = py
        }
      } else {
        pointer.prevX = px
        pointer.prevY = py
        pointer.active = true
        addRipple(px, py, 0.7, 140)
      }

      pointer.x = px
      pointer.y = py
    }

    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      addRipple(px, py, 1.6, 320)
    }

    const handlePointerLeave = () => {
      pointer.active = false
      pointer.x = -1000
      pointer.y = -1000
    }

    canvas.addEventListener("pointermove", handlePointerMove)
    canvas.addEventListener("pointerdown", handlePointerDown)
    canvas.addEventListener("pointerleave", handlePointerLeave)

    // Visibility observer to pause animation when scrolled away
    let isVisible = true
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.02 }
    )
    visibilityObserver.observe(container)

    // 60 FPS Fluid Blue Surfing Waves Render Loop
    const render = () => {
      animId = requestAnimationFrame(render)
      if (!isVisible) return

      const now = performance.now()
      const t = now * 0.001

      // Clean dead ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (now - ripples[i].time > 2400) {
          ripples.splice(i, 1)
        }
      }

      ctx.clearRect(0, 0, width, height)

      const isDark = document.documentElement.classList.contains("dark")

      // --- Ambient Deep Blue Water Glow ---
      const glowGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.6,
        15,
        width * 0.5,
        height * 0.6,
        width * 0.65
      )
      if (isDark) {
        glowGrad.addColorStop(0, "rgba(2, 132, 199, 0.16)")
        glowGrad.addColorStop(0.6, "rgba(3, 105, 161, 0.08)")
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)")
      } else {
        // High visibility in light mode: rich aquamarine & ocean sky wash
        glowGrad.addColorStop(0, "rgba(2, 132, 199, 0.12)")
        glowGrad.addColorStop(0.6, "rgba(14, 165, 233, 0.06)")
        glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)")
      }
      ctx.fillStyle = glowGrad
      ctx.fillRect(0, 0, width, height)

      ctx.font = '11px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      for (let c = 0; c < cols; c++) {
        const px = (c + 0.5) * cellW

        for (let r = 0; r < rows; r++) {
          const py = (r + 0.5) * cellH

          // --- 1. Surfing Wave Physics (Peaked Gerstner Rollers) ---
          // Directional rolling ocean swells traveling across the canvas
          const wavePhase1 = px * 0.022 - py * 0.006 - t * 2.2
          const wave1 = Math.pow((Math.sin(wavePhase1) + 1) * 0.5, 2.4) * 0.55

          const wavePhase2 = px * 0.034 + py * 0.012 - t * 1.8
          const wave2 = Math.pow((Math.cos(wavePhase2) + 1) * 0.5, 2.0) * 0.3

          // Counter swell creating natural surface foam/choppiness
          const counter = Math.sin(px * 0.012 + py * 0.024 + t * 1.2) * 0.18

          let h = wave1 + wave2 + counter - 0.35

          // --- 2. Interactive Pointer Wake & Hover Disturbance ---
          if (pointer.active) {
            const dx = px - pointer.x
            const dy = py - pointer.y
            const dist = Math.hypot(dx, dy)
            if (dist < 115) {
              const falloff = Math.exp(-(dist * dist) / (2 * 42 * 42))
              const pointerWave = Math.cos(dist * 0.16 - t * 6.0) * falloff * 0.95
              h += pointerWave
            }
          }

          // --- 3. Expanding Shockwave Ripples ---
          for (let i = 0; i < ripples.length; i++) {
            const rip = ripples[i]
            const age = (now - rip.time) * 0.001
            const currentRadius = age * 135
            if (currentRadius > rip.maxRadius) continue

            const dx = px - rip.x
            const dy = py - rip.y
            const dist = Math.hypot(dx, dy)
            const ringDist = Math.abs(dist - currentRadius)

            if (ringDist < 34) {
              const decay = Math.exp(-age / 0.65)
              const envelope = Math.exp(-(ringDist * ringDist) / (2 * 12 * 12))
              const wave = Math.cos(ringDist * 0.28 - age * 7.0) * envelope * decay * rip.strength
              h += wave
            }
          }

          // --- 4. Normalized Water Luminance L in [0, 1] ---
          const lum = Math.max(0, Math.min(1, 0.48 + h * 0.55))

          // --- 5. Gentle Edge Feather Envelope (Top & Bottom only, sides flush) ---
          const topFeather = Math.min(1, py / 14)
          const bottomFeather = Math.min(1, (height - py) / 14)
          const fade = Math.sin(topFeather * Math.PI * 0.5) * Math.sin(bottomFeather * Math.PI * 0.5)

          if (fade <= 0.02) continue

          // Map luminance to water character
          const charIdx = Math.min(
            WATER_CHARS.length - 1,
            Math.floor(lum * WATER_CHARS.length)
          )
          const char = WATER_CHARS[charIdx]

          // --- 6. Rich Blue Water Palette (High Visibility in Light & Dark Mode) ---
          if (isDark) {
            if (lum > 0.78) {
              // Surfing crest foam: radiant electric cyan-white
              ctx.fillStyle = `rgba(224, 242, 254, ${(0.96 * fade).toFixed(3)})`
            } else if (lum > 0.58) {
              // Surfing wave barrel: electric sky blue
              ctx.fillStyle = `rgba(125, 211, 252, ${(0.88 * fade).toFixed(3)})`
            } else if (lum > 0.38) {
              // Wave face: vivid cerulean blue
              ctx.fillStyle = `rgba(56, 189, 248, ${(0.7 * fade).toFixed(3)})`
            } else if (lum > 0.2) {
              // Ocean body: deep sapphire blue
              ctx.fillStyle = `rgba(14, 165, 233, ${(0.48 * fade).toFixed(3)})`
            } else {
              // Quiet trough: ocean navy dot
              ctx.fillStyle = `rgba(3, 105, 161, ${(0.35 * fade).toFixed(3)})`
            }
          } else {
            // Light Mode: High-contrast rich marine and azure ocean water
            if (lum > 0.78) {
              // Foam crest: deep nautical blue-black for crisp visibility
              ctx.fillStyle = `rgba(7, 89, 133, ${(0.95 * fade).toFixed(3)})`
            } else if (lum > 0.58) {
              // Wave curl: rich royal blue
              ctx.fillStyle = `rgba(3, 105, 161, ${(0.9 * fade).toFixed(3)})`
            } else if (lum > 0.38) {
              // Wave face: vibrant ocean azure
              ctx.fillStyle = `rgba(2, 132, 199, ${(0.8 * fade).toFixed(3)})`
            } else if (lum > 0.2) {
              // Mid water: clear sky blue
              ctx.fillStyle = `rgba(14, 165, 233, ${(0.65 * fade).toFixed(3)})`
            } else {
              // Calm trough: soft azure dot
              ctx.fillStyle = `rgba(56, 189, 248, ${(0.45 * fade).toFixed(3)})`
            }
          }

          ctx.fillText(char, px, py)
        }
      }
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      canvas.removeEventListener("pointermove", handlePointerMove)
      canvas.removeEventListener("pointerdown", handlePointerDown)
      canvas.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [])

  return (
    <footer
      ref={containerRef}
      className="relative w-[calc(100%+2rem)] -mx-4 sm:w-[calc(100%+4rem)] sm:-mx-8 h-48 sm:h-56 lg:h-60 mt-12 border-t-[1.5px] border-dashed border-foreground/25 select-none overflow-hidden"
    >
      {/* Pure Living Blue ASCII Water Canvas (Flush to both dashed side rails) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
      />

      {/* Non-ASCII Snoopy Surfing on the Waves */}
      <div
        onMouseEnter={() => setSnoopyHovered(true)}
        onMouseLeave={() => setSnoopyHovered(false)}
        className="absolute right-5 sm:right-12 bottom-6 sm:bottom-10 z-20 pointer-events-auto cursor-pointer select-none transition-transform duration-300 hover:scale-110 active:scale-95"
        style={{
          animation: "snoopy-surf 3.6s ease-in-out infinite",
        }}
        title="Snoopy Surfing the ASCII Waves!"
      >
        <img
          src="/snoopy-surfer.webp"
          alt="Snoopy Surfing on Waves"
          width={110}
          height={98}
          className="w-20 sm:w-24 lg:w-28 h-auto drop-shadow-[0_8px_16px_rgba(2,132,199,0.35)] dark:drop-shadow-[0_8px_20px_rgba(56,189,248,0.45)] pointer-events-none select-none"
        />
      </div>

      {/* Keyframe animation for Snoopy wave-riding tilt & float */}
      <style jsx>{`
        @keyframes snoopy-surf {
          0%, 100% {
            transform: translateY(0px) rotate(-3deg);
          }
          35% {
            transform: translateY(-9px) rotate(4deg);
          }
          65% {
            transform: translateY(-4px) rotate(1deg);
          }
        }
      `}</style>
    </footer>
  )
}
