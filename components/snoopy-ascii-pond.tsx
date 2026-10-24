"use client"

import { useEffect, useRef } from "react"

/**
 * SnoopyAsciiPond – Continuous Fluid Wave Movements (Gutters & Margins)
 *
 * Inspired by aetosdios.xyz:
 * - Continuous organic traveling wave currents running down the side margins
 * - Pure wave movements (NO circular ripple patches / drop blobs)
 * - Fluid cursor tracking: waves smoothly flow, deflect, and follow the cursor
 * - Automatic soft fade mask protecting the central reading column
 * - 60 FPS HTML5 Canvas with high-DPI retina scaling
 */

const WAVE_CHARS = ["·", "~", "≈", "≋"]

export function SnoopyAsciiPond() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animId = 0
    let width = window.innerWidth
    let height = window.innerHeight

    // Character grid dimensions
    const cellW = 9
    const cellH = 14
    let cols = Math.ceil(width / cellW)
    let rows = Math.ceil(height / cellH)

    // Main content column boundaries
    let colLeft = width / 2 - 390
    let colRight = width / 2 + 390
    const fadeWidth = 72

    const updateColumnBounds = () => {
      const main = document.querySelector("main")
      if (main) {
        const rect = main.getBoundingClientRect()
        colLeft = rect.left - 24
        colRight = rect.right + 24
      } else {
        colLeft = window.innerWidth / 2 - 390
        colRight = window.innerWidth / 2 + 390
      }
    }

    // Pointer state with smooth exponential interpolation for fluid tracking
    const pointer = {
      x: -1000,
      y: -1000,
      active: false,
    }

    const smoothMouse = {
      x: -1000,
      y: -1000,
    }

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = Math.ceil(width / cellW)
      rows = Math.ceil(height / cellH)

      updateColumnBounds()
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    const handlePointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
      if (smoothMouse.x < -500) {
        smoothMouse.x = e.clientX
        smoothMouse.y = e.clientY
      }
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", handlePointerLeave)

    let lastBoundSync = 0

    const render = (time: number) => {
      animId = requestAnimationFrame(render)

      // Periodic column alignment
      if (time - lastBoundSync > 400) {
        updateColumnBounds()
        lastBoundSync = time
      }

      // Smooth mouse tracking for organic fluid movements
      if (pointer.active) {
        smoothMouse.x += (pointer.x - smoothMouse.x) * 0.12
        smoothMouse.y += (pointer.y - smoothMouse.y) * 0.12
      } else {
        smoothMouse.x += (-1000 - smoothMouse.x) * 0.05
        smoothMouse.y += (-1000 - smoothMouse.y) * 0.05
      }

      ctx.clearRect(0, 0, width, height)
      ctx.font = '10px "Geist Mono", "Courier New", monospace'
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const isDark = document.documentElement.classList.contains("dark")
      const t = time * 0.0013
      const isOverSides = pointer.active && (pointer.x < colLeft || pointer.x > colRight)

      // Render Continuous Flowing Wave Streams (Margins Only)
      for (let c = 0; c < cols; c++) {
        const px = (c + 0.5) * cellW
        if (px >= colLeft && px <= colRight) continue

        let fade = 1.0
        if (px < colLeft) {
          fade = Math.max(0, Math.min(1, (colLeft - px) / fadeWidth))
        } else if (px > colRight) {
          fade = Math.max(0, Math.min(1, (px - colRight) / fadeWidth))
        }
        if (fade <= 0.02) continue

        for (let r = 0; r < rows; r++) {
          const py = (r + 0.5) * cellH

          // Continuous multi-harmonic fluid waves rolling along the sides
          const wave1 = Math.sin(r * 0.13 - t * 2.4 + c * 0.16)
          const wave2 = Math.cos(r * 0.08 + t * 1.5 - c * 0.2)
          const wave3 = Math.sin((r + c) * 0.07 - t * 1.8)
          let waveVal = wave1 * 0.44 + wave2 * 0.36 + wave3 * 0.2

          // Smooth cursor following fluid flow (smooth movements, no patches!)
          if (isOverSides) {
            const dx = px - smoothMouse.x
            const dy = py - smoothMouse.y
            const distToCursor = Math.hypot(dx, dy)
            const maxRadius = 170

            if (distToCursor < maxRadius) {
              const influence = Math.pow(1 - distToCursor / maxRadius, 1.7)
              const angle = Math.atan2(dy, dx)
              // Fluid wave stream that bends and flows towards the cursor
              const flowSwell = Math.sin(distToCursor * 0.045 - t * 3.8 + angle * 1.8)
              waveVal += influence * flowSwell * 0.65
            }
          }

          const absVal = Math.abs(waveVal)
          let char = ""
          let color = ""

          if (absVal > 0.52) {
            char = WAVE_CHARS[3] // "≋"
            color = isDark
              ? `rgba(255, 255, 255, ${(0.82 * fade).toFixed(3)})`
              : `rgba(15, 23, 42, ${(0.82 * fade).toFixed(3)})`
          } else if (absVal > 0.32) {
            char = WAVE_CHARS[2] // "≈"
            color = isDark
              ? `rgba(186, 230, 253, ${(0.62 * fade).toFixed(3)})`
              : `rgba(30, 41, 59, ${(0.6 * fade).toFixed(3)})`
          } else if (absVal > 0.13) {
            char = WAVE_CHARS[1] // "~"
            color = isDark
              ? `rgba(125, 211, 252, ${(0.38 * fade).toFixed(3)})`
              : `rgba(51, 65, 85, ${(0.38 * fade).toFixed(3)})`
          } else {
            // Subtle ambient starlight/droplet dots in the low-tide troughs
            const seed = (c * 17 + r * 31) % 73
            if (seed === 7 || seed === 31) {
              char = WAVE_CHARS[0] // "·"
              color = isDark
                ? `rgba(148, 163, 184, ${(0.18 * fade).toFixed(3)})`
                : `rgba(100, 116, 139, ${(0.22 * fade).toFixed(3)})`
            }
          }

          if (char) {
            ctx.fillStyle = color
            ctx.fillText(char, px, py)
          }
        }
      }
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("pointermove", handlePointerMove)
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 hidden md:block select-none"
    />
  )
}
