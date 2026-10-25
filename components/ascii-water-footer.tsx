"use client"

import { useEffect, useRef, useState } from "react"

interface Ripple {
  x: number
  y: number
  time: number
  strength: number
  maxRadius: number
}

// Satin silk characters ordered from deepest shadow trough to glistening peak
const SILK_CHARS = [" ", "·", "~", "≈", "∽", "≋", "═", "✦"]

export function AsciiWaterFooter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animId = 0
    let width = container.clientWidth
    let height = container.clientHeight

    // Monospace cell dimensions tuned for smooth satin fabric density
    const cellW = 8
    const cellH = 14
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

    const addRipple = (x: number, y: number, strength = 0.8, maxRadius = 260) => {
      if (ripples.length > 16) ripples.shift()
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

        // Spawn interactive trailing wakes as cursor glides across the water
        if (dist > 14) {
          const strength = Math.min(dist * 0.035, 1.0)
          addRipple(px, py, strength, 180)
          pointer.prevX = px
          pointer.prevY = py
        }
      } else {
        pointer.prevX = px
        pointer.prevY = py
        pointer.active = true
        addRipple(px, py, 0.6, 140)
      }

      pointer.x = px
      pointer.y = py
    }

    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      // Energetic resonant splash on click or tap
      addRipple(px, py, 1.5, 320)
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
      { threshold: 0.05 }
    )
    visibilityObserver.observe(container)

    // Main 60 FPS Render Loop
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

      ctx.font = '11px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const isDark = document.documentElement.classList.contains("dark")

      for (let c = 0; c < cols; c++) {
        const px = (c + 0.5) * cellW
        const u = px * 0.01

        // Horizontal feather near left & right margins
        const leftFeather = Math.min(1, px / 24)
        const rightFeather = Math.min(1, (width - px) / 24)
        const horizFade = Math.sin(leftFeather * Math.PI * 0.5) * Math.sin(rightFeather * Math.PI * 0.5)
        if (horizFade <= 0.02) continue

        for (let r = 0; r < rows; r++) {
          const py = (r + 0.5) * cellH
          const v = py * 0.016

          // --- 1. Multi-Octave Satin Silk Waves ---
          // Smooth diagonal fabric folds
          const w1 = Math.sin(u * 1.3 + v * 0.7 + t * 0.85)
          const w2 = Math.cos(u * 0.85 - v * 1.25 + t * 0.7)
          const w3 = Math.sin((u + v) * 1.6 - t * 1.1) * 0.45
          const w4 = Math.cos((u * 1.4 - v * 0.8) + t * 1.3) * 0.3

          let h = w1 * 0.48 + w2 * 0.34 + w3 * 0.18 + w4 * 0.12

          // --- 2. Interactive Hover Proximity Disturbance ---
          if (pointer.active) {
            const dx = px - pointer.x
            const dy = py - pointer.y
            const dist = Math.hypot(dx, dy)
            if (dist < 120) {
              const falloff = Math.exp(-(dist * dist) / (2 * 44 * 44))
              // Smooth localized satin bulge & gentle ripples
              const pointerWake = Math.cos(dist * 0.14 - t * 5.2) * falloff * 0.75
              h += pointerWake
            }
          }

          // --- 3. Dynamic Expanding Shockwave Ripples ---
          for (let i = 0; i < ripples.length; i++) {
            const rip = ripples[i]
            const age = (now - rip.time) * 0.001
            const currentRadius = age * 135
            if (currentRadius > rip.maxRadius) continue

            const dx = px - rip.x
            const dy = py - rip.y
            const dist = Math.hypot(dx, dy)
            const ringDist = Math.abs(dist - currentRadius)

            if (ringDist < 36) {
              const decay = Math.exp(-age / 0.65)
              const envelope = Math.exp(-(ringDist * ringDist) / (2 * 14 * 14))
              const wave = Math.cos(ringDist * 0.28 - age * 6.5) * envelope * decay * rip.strength
              h += wave
            }
          }

          // --- 4. Directional Satin Slope / Specular Lustre ---
          // Simulating directional light glinting across satin wave folds
          const slope =
            Math.cos(u * 1.3 + v * 0.7 + t * 0.85) * 0.32 -
            Math.sin(u * 0.85 - v * 1.25 + t * 0.7) * 0.28

          const illumination = Math.max(0, Math.min(1, 0.5 + h * 0.44 + slope * 0.34))

          // --- 5. Soft Vertical Feather Envelope ---
          const topFeather = Math.min(1, py / 36)
          const bottomFeather = Math.min(1, (height - py) / 44)
          const vertFade = Math.sin(topFeather * Math.PI * 0.5) * Math.sin(bottomFeather * Math.PI * 0.5)

          const totalFade = vertFade * horizFade
          if (totalFade <= 0.02) continue

          // Map illumination to character
          const charIdx = Math.min(
            SILK_CHARS.length - 1,
            Math.floor(illumination * SILK_CHARS.length)
          )
          const char = SILK_CHARS[charIdx]

          if (!char || char === " ") continue

          // Shimmer and color selection based on dark / light mode
          if (isDark) {
            if (illumination > 0.82) {
              // Specular peak: celestial sky-cyan silk sheen
              ctx.fillStyle = `rgba(186, 230, 253, ${(0.92 * totalFade).toFixed(3)})`
            } else if (illumination > 0.6) {
              // High crest: crisp silvery white
              ctx.fillStyle = `rgba(248, 250, 252, ${(0.78 * totalFade).toFixed(3)})`
            } else if (illumination > 0.36) {
              // Body wave: soft metallic slate
              ctx.fillStyle = `rgba(203, 213, 225, ${(0.46 * totalFade).toFixed(3)})`
            } else {
              // Deep shadow fold: subtle velvety glow
              ctx.fillStyle = `rgba(148, 163, 184, ${(0.22 * totalFade).toFixed(3)})`
            }
          } else {
            // Light mode: charcoal, slate, and deep ink sheen
            if (illumination > 0.82) {
              ctx.fillStyle = `rgba(14, 116, 144, ${(0.9 * totalFade).toFixed(3)})`
            } else if (illumination > 0.6) {
              ctx.fillStyle = `rgba(15, 23, 42, ${(0.82 * totalFade).toFixed(3)})`
            } else if (illumination > 0.36) {
              ctx.fillStyle = `rgba(51, 65, 85, ${(0.52 * totalFade).toFixed(3)})`
            } else {
              ctx.fillStyle = `rgba(100, 116, 139, ${(0.24 * totalFade).toFixed(3)})`
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full -mx-4 sm:-mx-8 h-72 sm:h-88 lg:h-96 mt-4 select-none overflow-hidden"
    >
      {/* Top Colophon Status Row */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-muted-foreground/50 tracking-wider mb-2 px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
          </span>
          <span className="text-foreground/75">all systems operational</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground/45">
          <span>jaipur, in</span>
          <span>·</span>
          <span>2026</span>
        </div>
      </div>

      {/* Satin Silk ASCII Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
      />

      {/* Quiet Ambient Floating Badge */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-10 text-center">
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-foreground/35 dark:text-white/30 transition-opacity duration-300">
          {isHovered ? "satin silk ripples" : "aryan rastogi"}
        </span>
      </div>
    </footer>
  )
}
