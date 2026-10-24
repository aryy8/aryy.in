"use client"

import { useEffect, useRef } from "react"

/**
 * SnoopyAsciiPond – Silky Fluid Wave Streamlines (Gutters & Margins)
 *
 * Inspired by high-end generative design:
 * - Ultra-fine, flowing fluid wave streamlines (no blocky text clumps or oval patches)
 * - Continuous, soothing sinusoidal ocean/wind currents traveling down the gutters
 * - Interactive magnetic cursor follow: streamlines dynamically bend, swell, and ripple around the cursor
 * - Automatic soft fade mask protecting the central reading column
 * - 60 FPS Canvas with Retina DPI scaling
 */

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
    let dpr = 1

    // Main content column boundaries
    let colLeft = width / 2 - 390
    let colRight = width / 2 + 390
    const fadeWidth = 80

    const updateColumnBounds = () => {
      const main = document.querySelector("main")
      if (main) {
        const rect = main.getBoundingClientRect()
        colLeft = rect.left - 20
        colRight = rect.right + 20
      } else {
        colLeft = window.innerWidth / 2 - 390
        colRight = window.innerWidth / 2 + 390
      }
    }

    // Pointer state with smooth interpolation
    const pointer = {
      x: -1000,
      y: -1000,
      active: false,
    }

    const smoothMouse = {
      x: -1000,
      y: -1000,
    }

    // Ripple click shockwaves
    interface Pulse {
      x: number
      y: number
      radius: number
      maxRadius: number
      alpha: number
    }
    const pulses: Pulse[] = []

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
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

    const handlePointerDown = (e: PointerEvent) => {
      // Trigger smooth fluid wave impulse
      pulses.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 220,
        alpha: 0.8,
      })
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerdown", handlePointerDown, { passive: true })
    document.documentElement.addEventListener("pointerleave", handlePointerLeave)

    let lastBoundSync = 0

    const render = (time: number) => {
      animId = requestAnimationFrame(render)

      // Periodic column alignment
      if (time - lastBoundSync > 500) {
        updateColumnBounds()
        lastBoundSync = time
      }

      // Smooth mouse tracking for organic fluid curves
      if (pointer.active) {
        smoothMouse.x += (pointer.x - smoothMouse.x) * 0.12
        smoothMouse.y += (pointer.y - smoothMouse.y) * 0.12
      } else {
        smoothMouse.x += (-1000 - smoothMouse.x) * 0.05
        smoothMouse.y += (-1000 - smoothMouse.y) * 0.05
      }

      // Clear Canvas
      ctx.clearRect(0, 0, width, height)

      const isDark = document.documentElement.classList.contains("dark")
      const t = time * 0.0012
      const isOverSides = pointer.active && (pointer.x < colLeft || pointer.x > colRight)

      // Update shockwave pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.radius += 3.5
        p.alpha = Math.max(0, 1 - p.radius / p.maxRadius)
        if (p.alpha <= 0.01) {
          pulses.splice(i, 1)
        }
      }

      // Calculate number of streamlines for left and right gutters
      const leftGutterWidth = Math.max(0, colLeft)
      const rightGutterWidth = Math.max(0, width - colRight)

      const lineSpacing = 32 // Spacing between wave streams

      const renderGutter = (side: "left" | "right", gutterW: number, startX: number) => {
        if (gutterW < 30) return

        const lineCount = Math.min(14, Math.floor(gutterW / lineSpacing))

        for (let l = 0; l < lineCount; l++) {
          // Base X position for this streamline
          const distFromContent = (l + 0.6) * lineSpacing
          const baseX = side === "left" ? colLeft - distFromContent : colRight + distFromContent

          // Alpha fade factor: gracefully fades out towards the center content boundary
          const fade = Math.min(1.0, Math.max(0, distFromContent / fadeWidth))
          if (fade <= 0.03) continue

          ctx.beginPath()

          const stepY = 10
          let firstPoint = true

          for (let y = -20; y <= height + 20; y += stepY) {
            // Harmonic wave traveling down
            const freq1 = 0.007
            const freq2 = 0.014
            const speed1 = 2.0
            const speed2 = 1.3

            // Wave undulation
            const w1 = Math.sin(y * freq1 - t * speed1 + l * 0.5) * 14
            const w2 = Math.cos(y * freq2 + t * speed2 + l * 0.35) * 8
            let currentX = baseX + w1 + w2

            // Interactive cursor follow and fluid deflection
            if (isOverSides) {
              const dx = currentX - smoothMouse.x
              const dy = y - smoothMouse.y
              const dist = Math.hypot(dx, dy)
              const maxRadius = 180

              if (dist < maxRadius) {
                const influence = Math.pow(1 - dist / maxRadius, 2.0)
                // Pull lines toward cursor and ripple in its wake
                const pullTowardCursor = (smoothMouse.x - currentX) * influence * 0.35
                const waveWake = Math.sin(dist * 0.05 - t * 4.5) * influence * 12
                currentX += pullTowardCursor + waveWake
              }
            }

            // Click shockwave displacement
            for (let pIdx = 0; pIdx < pulses.length; pIdx++) {
              const p = pulses[pIdx]
              const dx = currentX - p.x
              const dy = y - p.y
              const d = Math.hypot(dx, dy)
              const ringDist = Math.abs(d - p.radius)
              if (ringDist < 40) {
                const pulseInf = (1 - ringDist / 40) * p.alpha * 15
                currentX += (dx / (d || 1)) * pulseInf
              }
            }

            if (firstPoint) {
              ctx.moveTo(currentX, y)
              firstPoint = false
            } else {
              ctx.lineTo(currentX, y)
            }
          }

          // Line styling: delicate, luminous, zero clutter
          const streamAlpha = (0.16 + (l % 2 === 0 ? 0.08 : 0)) * fade

          ctx.lineWidth = 1.1
          if (isDark) {
            ctx.strokeStyle = l % 3 === 0 
              ? `rgba(186, 230, 253, ${(streamAlpha * 1.3).toFixed(3)})` 
              : `rgba(125, 211, 252, ${streamAlpha.toFixed(3)})`
          } else {
            ctx.strokeStyle = l % 3 === 0 
              ? `rgba(30, 41, 59, ${(streamAlpha * 1.3).toFixed(3)})` 
              : `rgba(71, 85, 105, ${streamAlpha.toFixed(3)})`
          }

          ctx.stroke()

          // Draw rare, subtle sparkling stipple dots along the crests
          const dotInterval = 140
          for (let y = 60 + (l * 47) % 80; y < height; y += dotInterval) {
            const w1 = Math.sin(y * 0.007 - t * 2.0 + l * 0.5) * 14
            const w2 = Math.cos(y * 0.014 + t * 1.3 + l * 0.35) * 8
            const dotX = baseX + w1 + w2

            ctx.beginPath()
            ctx.arc(dotX, y, 1.2, 0, Math.PI * 2)
            ctx.fillStyle = isDark
              ? `rgba(224, 242, 254, ${(streamAlpha * 1.6).toFixed(3)})`
              : `rgba(15, 23, 42, ${(streamAlpha * 1.5).toFixed(3)})`
            ctx.fill()
          }
        }
      }

      // Render Left & Right Wave Streams
      renderGutter("left", leftGutterWidth, 0)
      renderGutter("right", rightGutterWidth, colRight)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerdown", handlePointerDown)
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
