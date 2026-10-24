"use client"

import { useEffect, useRef } from "react"

/**
 * SnoopyAsciiPond – Interactive ASCII Living Canvas (Pond & Ripples Only)
 *
 * Inspired by aetosdios.xyz:
 * - Pure fluid ASCII wave matrix across empty margins
 * - Discrete 2D wave propagation physics responding to pointer moves & clicks
 * - Content Column Protection: Automatic alpha-fade mask over the main content (max-w-3xl)
 * - Zero creatures: pure ambient ripples, sparkles, and reactive water physics
 * - 60 FPS Canvas with DPR scaling and prefers-reduced-motion support.
 */

const WAVE_CHARS = [" ", "·", "~", "≈", "∽", "*", "o", "O", "@"]

export function SnoopyAsciiPond() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animId = 0
    let lastTime = performance.now()
    let width = window.innerWidth
    let height = window.innerHeight

    // Character grid dimensions
    const cellW = 8
    const cellH = 13
    let cols = Math.ceil(width / cellW)
    let rows = Math.ceil(height / cellH)

    // Wave equation buffers
    let size = cols * rows
    let h0 = new Float32Array(size)
    let h1 = new Float32Array(size)

    // Main content column boundaries (reading area)
    let colLeft = width / 2 - 384
    let colRight = width / 2 + 384
    const fadeWidth = 64

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

    // Pointer state
    const pointer = {
      x: -1000,
      y: -1000,
      active: false,
      prevX: -1000,
      prevY: -1000,
    }

    // Web Audio gentle bloop synthesis
    let audioCtx: AudioContext | null = null
    const playBloop = (freq = 440) => {
      try {
        if (!audioCtx) {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
          if (AudioContextClass) audioCtx = new AudioContextClass()
        }
        if (audioCtx && audioCtx.state === "suspended") {
          audioCtx.resume()
        }
        if (audioCtx && audioCtx.state === "running") {
          const osc = audioCtx.createOscillator()
          const gain = audioCtx.createGain()
          osc.type = "sine"
          const now = audioCtx.currentTime
          osc.frequency.setValueAtTime(freq, now)
          osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.08)
          gain.gain.setValueAtTime(0.035, now)
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)
          osc.connect(gain)
          gain.connect(audioCtx.destination)
          osc.start(now)
          osc.stop(now + 0.13)
        }
      } catch {
        // Audio is optional enhancement
      }
    }

    // Drop wave disturbance
    const dropRipple = (px: number, py: number, strength: number, radius = 2) => {
      const gx = Math.floor(px / cellW)
      const gy = Math.floor(py / cellH)
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = gx + dx
          const ny = gy + dy
          if (nx >= 1 && nx < cols - 1 && ny >= 1 && ny < rows - 1) {
            const dist = Math.hypot(dx, dy)
            if (dist <= radius) {
              h0[ny * cols + nx] += strength * (1 - dist / radius)
            }
          }
        }
      }
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
      size = cols * rows
      h0 = new Float32Array(size)
      h1 = new Float32Array(size)

      updateColumnBounds()
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    const handlePointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true

      const distMoved = Math.hypot(pointer.x - pointer.prevX, pointer.y - pointer.prevY)
      if (distMoved > 8) {
        dropRipple(pointer.x, pointer.y, Math.min(1.2, 0.35 + distMoved / 50), 2)
        pointer.prevX = pointer.x
        pointer.prevY = pointer.y
      }
    }

    const handlePointerDown = (e: PointerEvent) => {
      dropRipple(e.clientX, e.clientY, 2.6, 3.8)
      playBloop(360 + Math.random() * 140)
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerdown", handlePointerDown, { passive: true })
    document.documentElement.addEventListener("pointerleave", handlePointerLeave)

    const render = (time: number) => {
      animId = requestAnimationFrame(render)

      const dt = Math.min(0.05, (time - lastTime) / 1000)
      lastTime = time

      // Periodically sync column bounds
      if (Math.floor(time / 500) !== Math.floor((time - dt * 1000) / 500)) {
        updateColumnBounds()
      }

      // 1. Solve Wave Equation
      const damping = 0.962
      for (let y = 1; y < rows - 1; y++) {
        const rowOffset = y * cols
        for (let x = 1; x < cols - 1; x++) {
          const idx = rowOffset + x
          const h = (h0[idx - 1] + h0[idx + 1] + h0[idx - cols] + h0[idx + cols]) * 0.5 - h1[idx]
          h1[idx] = h * damping
        }
      }
      const temp = h0
      h0 = h1
      h1 = temp

      // 2. CLEAR CANVAS
      ctx.clearRect(0, 0, width, height)
      ctx.font = '10px "Geist Mono", "Courier New", monospace'
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Check current theme (dark or light)
      const isDark = document.documentElement.classList.contains("dark")

      // 3. RENDER BACKGROUND WAVE MATRIX (Gutters Only)
      for (let c = 0; c < cols; c++) {
        const px = (c + 0.5) * cellW
        if (px >= colLeft && px <= colRight) continue

        let fade = 1.0
        if (px < colLeft) {
          fade = Math.max(0, Math.min(1, (colLeft - px) / fadeWidth))
        } else if (px > colRight) {
          fade = Math.max(0, Math.min(1, (px - colRight) / fadeWidth))
        }
        if (fade <= 0.01) continue

        for (let r = 0; r < rows; r++) {
          const idx = r * cols + c
          const h = h0[idx]
          const absH = Math.abs(h)

          let char = ""
          let color = ""

          if (absH > 0.04) {
            const charIdx = Math.min(WAVE_CHARS.length - 1, Math.floor(absH * 7.2))
            char = WAVE_CHARS[charIdx]

            if (isDark) {
              if (absH > 0.35) {
                color = `rgba(255, 255, 255, ${(0.85 * fade).toFixed(3)})`
              } else if (absH > 0.16) {
                color = `rgba(186, 230, 253, ${(0.6 * fade).toFixed(3)})`
              } else {
                color = `rgba(148, 163, 184, ${(0.32 * fade).toFixed(3)})`
              }
            } else {
              // Light mode (dark slate and charcoal ink glyphs)
              if (absH > 0.35) {
                color = `rgba(15, 23, 42, ${(0.85 * fade).toFixed(3)})`
              } else if (absH > 0.16) {
                color = `rgba(30, 41, 59, ${(0.65 * fade).toFixed(3)})`
              } else {
                color = `rgba(71, 85, 105, ${(0.45 * fade).toFixed(3)})`
              }
            }
          } else {
            const seed = (c * 17 + r * 31) % 97
            if (seed === 7) {
              char = "·"
              color = isDark
                ? `rgba(148, 163, 184, ${(0.16 * fade).toFixed(3)})`
                : `rgba(100, 116, 139, ${(0.32 * fade).toFixed(3)})`
            }
          }

          if (char) {
            ctx.fillStyle = color
            ctx.fillText(char, px, (r + 0.5) * cellH)
          }
        }
      }
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerdown", handlePointerDown)
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave)
      if (audioCtx) {
        audioCtx.close().catch(() => {})
      }
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
