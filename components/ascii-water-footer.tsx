"use client"

import { useEffect, useRef } from "react"

interface Ripple {
  x: number
  y: number
  time: number
  strength: number
  maxRadius: number
}

// Gentle, organic water glyphs — every cell participates in the fluid surface
const WATER_CHARS = ["·", "~", "∼", "≈", "≋"]

export function AsciiWaterFooter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animId = 0
    let width = container.clientWidth
    let height = container.clientHeight

    // Monospace cell dimensions tuned for cohesive liquid surface density
    const cellW = 8
    const cellH = 13
    let cols = Math.floor(width / cellW)
    let rows = Math.floor(height / cellH)
    let offsetX = (width - cols * cellW) / 2
    let offsetY = (height - rows * cellH) / 2

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

      cols = Math.floor(width / cellW)
      rows = Math.floor(height / cellH)
      offsetX = (width - cols * cellW) / 2
      offsetY = (height - rows * cellH) / 2
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
      if (ripples.length > 18) ripples.shift()
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

        // Trailing ripples as cursor moves through water
        if (dist > 10) {
          const strength = Math.min(dist * 0.04, 1.2)
          addRipple(px, py, strength, 160)
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
      // Resonant splash on click or tap
      addRipple(px, py, 1.5, 300)
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

    // 60 FPS Fluid Blue Water Render Loop
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

      // --- Soft Ambient Deep Blue Water Glow ---
      const glowGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.6,
        15,
        width * 0.5,
        height * 0.6,
        width * 0.65
      )
      if (isDark) {
        glowGrad.addColorStop(0, "rgba(2, 132, 199, 0.14)")
        glowGrad.addColorStop(0.6, "rgba(3, 105, 161, 0.07)")
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)")
      } else {
        glowGrad.addColorStop(0, "rgba(14, 165, 233, 0.12)")
        glowGrad.addColorStop(0.6, "rgba(56, 189, 248, 0.05)")
        glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)")
      }
      ctx.fillStyle = glowGrad
      ctx.fillRect(0, 0, width, height)

      ctx.font = '11px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      for (let c = 0; c < cols; c++) {
        const px = offsetX + (c + 0.5) * cellW

        for (let r = 0; r < rows; r++) {
          const py = offsetY + (r + 0.5) * cellH

          // --- 1. Multi-Harmonic Oceanic Fluid Swell Simulation ---
          // Continuous harmonic plane wave interference (no fake circular holes)
          const w1 = Math.sin(px * 0.024 + py * 0.009 - t * 1.5) * 0.32
          const w2 = Math.sin(px * 0.016 - py * 0.022 - t * 1.2) * 0.28
          const w3 = Math.cos(px * 0.032 + py * 0.016 + t * 1.4) * 0.22
          const w4 = Math.sin(px * 0.011 + py * 0.028 - t * 1.0) * 0.18
          const w5 = Math.cos(px * 0.042 - py * 0.012 - t * 1.9) * 0.14

          let h = w1 + w2 + w3 + w4 + w5

          // --- 2. Interactive Pointer Wake & Hover Disturbance ---
          if (pointer.active) {
            const dx = px - pointer.x
            const dy = py - pointer.y
            const dist = Math.hypot(dx, dy)
            if (dist < 110) {
              const falloff = Math.exp(-(dist * dist) / (2 * 42 * 42))
              const pointerWave = Math.cos(dist * 0.16 - t * 5.8) * falloff * 0.95
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
          const lum = Math.max(0, Math.min(1, 0.5 + h * 0.52))

          // --- 5. Gentle Edge Feather Envelope ---
          const topFeather = Math.min(1, py / 16)
          const bottomFeather = Math.min(1, (height - py) / 16)
          const fade = Math.sin(topFeather * Math.PI * 0.5) * Math.sin(bottomFeather * Math.PI * 0.5)

          if (fade <= 0.02) continue

          // Map luminance to water character
          const charIdx = Math.min(
            WATER_CHARS.length - 1,
            Math.floor(lum * WATER_CHARS.length)
          )
          const char = WATER_CHARS[charIdx]

          // --- 6. Vibrant Ocean Blue Water Palette ---
          if (isDark) {
            if (lum > 0.8) {
              // Glistening crest sparkle: radiant cyan-white
              ctx.fillStyle = `rgba(224, 242, 254, ${(0.96 * fade).toFixed(3)})`
            } else if (lum > 0.6) {
              // Bright wave crest: electric sky blue
              ctx.fillStyle = `rgba(125, 211, 252, ${(0.88 * fade).toFixed(3)})`
            } else if (lum > 0.4) {
              // Flowing water body: vivid cerulean blue
              ctx.fillStyle = `rgba(56, 189, 248, ${(0.68 * fade).toFixed(3)})`
            } else if (lum > 0.22) {
              // Deep water current: ocean sapphire blue
              ctx.fillStyle = `rgba(14, 165, 233, ${(0.46 * fade).toFixed(3)})`
            } else {
              // Calm trough: deep navy blue dot
              ctx.fillStyle = `rgba(3, 105, 161, ${(0.32 * fade).toFixed(3)})`
            }
          } else {
            // Light mode: deep marine, indigo-cyan water
            if (lum > 0.8) {
              ctx.fillStyle = `rgba(8, 47, 73, ${(0.92 * fade).toFixed(3)})`
            } else if (lum > 0.6) {
              ctx.fillStyle = `rgba(14, 116, 144, ${(0.85 * fade).toFixed(3)})`
            } else if (lum > 0.4) {
              ctx.fillStyle = `rgba(2, 132, 199, ${(0.7 * fade).toFixed(3)})`
            } else if (lum > 0.22) {
              ctx.fillStyle = `rgba(3, 105, 161, ${(0.5 * fade).toFixed(3)})`
            } else {
              ctx.fillStyle = `rgba(56, 189, 248, ${(0.35 * fade).toFixed(3)})`
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
      className="relative w-full -mx-4 sm:-mx-8 h-48 sm:h-56 lg:h-60 mt-12 border-t-[1.5px] border-dashed border-foreground/25 select-none overflow-hidden"
    >
      {/* Pure Living Blue ASCII Water Canvas (Flush to dashed borders, zero text) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
      />
    </footer>
  )
}
