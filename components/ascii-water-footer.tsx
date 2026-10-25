"use client"

import { useEffect, useRef } from "react"

interface Ripple {
  x: number
  y: number
  time: number
  strength: number
  maxRadius: number
}

// Gentle, organic water glyphs (no harsh double-lines or geometric symbols)
const WATER_CHARS = [" ", "·", "~", "∼", "≈", "≋"]

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

    // Cell size for clean, liquid-smooth text water matrix
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

    const addRipple = (x: number, y: number, strength = 0.85, maxRadius = 260) => {
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
          addRipple(px, py, strength, 180)
          pointer.prevX = px
          pointer.prevY = py
        }
      } else {
        pointer.prevX = px
        pointer.prevY = py
        pointer.active = true
        addRipple(px, py, 0.7, 150)
      }

      pointer.x = px
      pointer.y = py
    }

    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      // Resonant splash on click or tap
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

    // 60 FPS Fluid Blue Water Render Loop
    const render = () => {
      animId = requestAnimationFrame(render)
      if (!isVisible) return

      const now = performance.now()
      const t = now * 0.001

      // Clean dead ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (now - ripples[i].time > 2500) {
          ripples.splice(i, 1)
        }
      }

      ctx.clearRect(0, 0, width, height)

      const isDark = document.documentElement.classList.contains("dark")

      // --- Subtle Ambient Blue Water Glow ---
      const glowGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.65,
        20,
        width * 0.5,
        height * 0.65,
        width * 0.65
      )
      if (isDark) {
        glowGrad.addColorStop(0, "rgba(2, 132, 199, 0.12)")
        glowGrad.addColorStop(0.5, "rgba(3, 105, 161, 0.06)")
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)")
      } else {
        glowGrad.addColorStop(0, "rgba(14, 165, 233, 0.09)")
        glowGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.04)")
        glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)")
      }
      ctx.fillStyle = glowGrad
      ctx.fillRect(0, 0, width, height)

      ctx.font = '11px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Orbital wave centers that create organic, curving circular caustics (like a real pond/pool)
      const c1x = width * 0.32 + Math.cos(t * 0.55) * 85
      const c1y = height * 0.35 + Math.sin(t * 0.7) * 45

      const c2x = width * 0.68 + Math.sin(t * 0.6) * 90
      const c2y = height * 0.6 + Math.cos(t * 0.75) * 50

      const c3x = width * 0.5 + Math.cos(t * 0.45) * 110
      const c3y = height * 0.8 + Math.sin(t * 0.5) * 45

      for (let c = 0; c < cols; c++) {
        const px = (c + 0.5) * cellW

        // Soft horizontal feather at guide-rail borders
        const leftFeather = Math.min(1, px / 28)
        const rightFeather = Math.min(1, (width - px) / 28)
        const horizFade = Math.sin(leftFeather * Math.PI * 0.5) * Math.sin(rightFeather * Math.PI * 0.5)
        if (horizFade <= 0.02) continue

        for (let r = 0; r < rows; r++) {
          const py = (r + 0.5) * cellH

          // --- 1. Organic Caustic Water Interference ---
          const d1 = Math.hypot(px - c1x, py - c1y)
          const d2 = Math.hypot(px - c2x, py - c2y)
          const d3 = Math.hypot(px - c3x, py - c3y)

          const w1 = Math.sin(d1 * 0.034 - t * 1.5)
          const w2 = Math.sin(d2 * 0.028 - t * 1.3)
          const w3 = Math.cos(d3 * 0.04 - t * 1.6)

          // Gentle cross-current swells
          const current =
            Math.sin(px * 0.014 + py * 0.008 - t * 1.1) *
            Math.cos(px * 0.007 - py * 0.012 + t * 0.8)

          let h = w1 * 0.34 + w2 * 0.3 + w3 * 0.18 + current * 0.28

          // --- 2. Interactive Pointer Wake & Hover Disturbance ---
          if (pointer.active) {
            const dx = px - pointer.x
            const dy = py - pointer.y
            const dist = Math.hypot(dx, dy)
            if (dist < 130) {
              const falloff = Math.exp(-(dist * dist) / (2 * 48 * 48))
              const pointerWave = Math.cos(dist * 0.15 - t * 5.5) * falloff * 0.95
              h += pointerWave
            }
          }

          // --- 3. Expanding Shockwave Ripples ---
          for (let i = 0; i < ripples.length; i++) {
            const rip = ripples[i]
            const age = (now - rip.time) * 0.001
            const currentRadius = age * 140
            if (currentRadius > rip.maxRadius) continue

            const dx = px - rip.x
            const dy = py - rip.y
            const dist = Math.hypot(dx, dy)
            const ringDist = Math.abs(dist - currentRadius)

            if (ringDist < 40) {
              const decay = Math.exp(-age / 0.7)
              const envelope = Math.exp(-(ringDist * ringDist) / (2 * 14 * 14))
              const wave = Math.cos(ringDist * 0.26 - age * 7.0) * envelope * decay * rip.strength
              h += wave
            }
          }

          // --- 4. Normalized Water Luminance L in [0, 1] ---
          const lum = Math.max(0, Math.min(1, 0.5 + h * 0.48))

          // --- 5. Soft Vertical Feather Envelope ---
          const topFeather = Math.min(1, py / 32)
          const vertFade = Math.sin(topFeather * Math.PI * 0.5)

          const totalFade = vertFade * horizFade
          if (totalFade <= 0.03) continue

          // Map luminance to water character
          const charIdx = Math.min(
            WATER_CHARS.length - 1,
            Math.floor(lum * WATER_CHARS.length)
          )
          const char = WATER_CHARS[charIdx]

          if (!char || char === " ") continue

          // --- 6. Rich Blue Water Color Palette ---
          if (isDark) {
            if (lum > 0.8) {
              // Glistening crest sparkle: radiant cyan-white
              ctx.fillStyle = `rgba(224, 242, 254, ${(0.96 * totalFade).toFixed(3)})`
            } else if (lum > 0.6) {
              // Bright crest: electric sky blue
              ctx.fillStyle = `rgba(125, 211, 252, ${(0.88 * totalFade).toFixed(3)})`
            } else if (lum > 0.4) {
              // Flowing water body: vivid cerulean blue
              ctx.fillStyle = `rgba(56, 189, 248, ${(0.65 * totalFade).toFixed(3)})`
            } else if (lum > 0.22) {
              // Deep water current: ocean sapphire blue
              ctx.fillStyle = `rgba(14, 165, 233, ${(0.42 * totalFade).toFixed(3)})`
            } else {
              // Quiet trough: deep navy blue
              ctx.fillStyle = `rgba(3, 105, 161, ${(0.22 * totalFade).toFixed(3)})`
            }
          } else {
            // Light mode: deep marine, indigo-cyan water
            if (lum > 0.8) {
              ctx.fillStyle = `rgba(8, 47, 73, ${(0.92 * totalFade).toFixed(3)})`
            } else if (lum > 0.6) {
              ctx.fillStyle = `rgba(14, 116, 144, ${(0.85 * totalFade).toFixed(3)})`
            } else if (lum > 0.4) {
              ctx.fillStyle = `rgba(2, 132, 199, ${(0.68 * totalFade).toFixed(3)})`
            } else if (lum > 0.22) {
              ctx.fillStyle = `rgba(3, 105, 161, ${(0.45 * totalFade).toFixed(3)})`
            } else {
              ctx.fillStyle = `rgba(125, 211, 252, ${(0.28 * totalFade).toFixed(3)})`
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
      className="relative w-full -mx-4 sm:-mx-8 h-80 sm:h-96 lg:h-[420px] select-none overflow-hidden"
    >
      {/* Pure Living Blue ASCII Water Canvas (No Text) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
      />
    </footer>
  )
}
