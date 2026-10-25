"use client"

import { useEffect, useRef, useState } from "react"

interface Sparkle {
  xRatio: number
  yRatio: number
  baseSize: number
  speed: number
  phase: number
  flareLen: number
}

interface WaveRipple {
  x: number
  y: number
  time: number
  strength: number
  maxRadius: number
}

interface TrailSparkle {
  x: number
  y: number
  vx: number
  vy: number
  time: number
  life: number
  size: number
}

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
    }

    updateSize()

    const resizeObserver = new ResizeObserver(() => {
      updateSize()
    })
    resizeObserver.observe(container)

    // Pre-generate organic ambient sunlight sparkles matching wave crest reflections
    const sparkles: Sparkle[] = []
    const SPARKLE_COUNT = 90
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      sparkles.push({
        xRatio: Math.random(),
        yRatio: Math.random(),
        baseSize: 0.8 + Math.random() * 1.8,
        speed: 1.5 + Math.random() * 3.5,
        phase: Math.random() * Math.PI * 2,
        flareLen: 3 + Math.random() * 6,
      })
    }

    // Interactive pointer state
    const pointer = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      active: false,
    }

    // Active wave ripple shockwaves
    const ripples: WaveRipple[] = []
    const trailSparkles: TrailSparkle[] = []

    const addRipple = (x: number, y: number, strength = 0.8, maxRadius = 260) => {
      if (ripples.length > 20) ripples.shift()
      ripples.push({
        x,
        y,
        time: performance.now(),
        strength,
        maxRadius,
      })
    }

    const addTrailSparkle = (x: number, y: number) => {
      if (trailSparkles.length > 40) trailSparkles.shift()
      trailSparkles.push({
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 16,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5,
        time: performance.now(),
        life: 1200 + Math.random() * 600,
        size: 1.2 + Math.random() * 2.2,
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

        if (dist > 8) {
          const strength = Math.min(dist * 0.045, 1.2)
          addRipple(px, py, strength, 180)
          addTrailSparkle(px, py)
          if (dist > 16) addTrailSparkle(px, py)
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
      for (let i = 0; i < 6; i++) {
        addTrailSparkle(px, py)
      }
    }

    const handlePointerLeave = () => {
      pointer.active = false
      pointer.x = -1000
      pointer.y = -1000
    }

    canvas.addEventListener("pointermove", handlePointerMove)
    canvas.addEventListener("pointerdown", handlePointerDown)
    canvas.addEventListener("pointerleave", handlePointerLeave)

    // Visibility observer to pause animation when scrolled out of view
    let isVisible = true
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.02 }
    )
    visibilityObserver.observe(container)

    // 60 FPS Render Loop: Sunlit Water Caustics & Shimmer
    const render = () => {
      animId = requestAnimationFrame(render)
      if (!isVisible) return

      const now = performance.now()
      const t = now * 0.001

      ctx.clearRect(0, 0, width, height)

      const isDark = document.documentElement.classList.contains("dark")

      // Clean dead ripples & trail sparkles
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (now - ripples[i].time > 2600) ripples.splice(i, 1)
      }
      for (let i = trailSparkles.length - 1; i >= 0; i--) {
        if (now - trailSparkles[i].time > trailSparkles[i].life) trailSparkles.splice(i, 1)
      }

      // --- 1. Draw Active Wave Ripples (Golden & Cyan Refraction Rings) ---
      for (let i = 0; i < ripples.length; i++) {
        const rip = ripples[i]
        const age = (now - rip.time) * 0.001
        const currentRadius = age * 135
        if (currentRadius > rip.maxRadius) continue

        const alpha = Math.exp(-age / 0.8) * 0.65 * rip.strength
        if (alpha <= 0.01) continue

        ctx.save()
        // Outer refraction ring
        ctx.strokeStyle = isDark
          ? `rgba(253, 224, 71, ${(alpha * 0.8).toFixed(3)})` // Golden sunset glint
          : `rgba(2, 132, 199, ${(alpha * 0.9).toFixed(3)})` // Crisp azure water ripple
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.arc(rip.x, rip.y, currentRadius, 0, Math.PI * 2)
        ctx.stroke()

        // Inner caustic ring
        if (currentRadius > 14) {
          ctx.strokeStyle = isDark
            ? `rgba(186, 230, 253, ${(alpha * 0.6).toFixed(3)})`
            : `rgba(14, 165, 233, ${(alpha * 0.6).toFixed(3)})`
          ctx.lineWidth = 1.0
          ctx.beginPath()
          ctx.arc(rip.x, rip.y, currentRadius - 10, 0, Math.PI * 2)
          ctx.stroke()
        }
        ctx.restore()
      }

      // --- 2. Interactive Cursor Sunlight Halo ---
      if (pointer.active) {
        const haloGrad = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          2,
          pointer.x,
          pointer.y,
          75
        )
        if (isDark) {
          haloGrad.addColorStop(0, "rgba(253, 224, 71, 0.28)") // Warm golden glint
          haloGrad.addColorStop(0.4, "rgba(56, 189, 248, 0.15)") // Cyan water glow
          haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)")
        } else {
          haloGrad.addColorStop(0, "rgba(14, 165, 233, 0.35)")
          haloGrad.addColorStop(0.5, "rgba(253, 224, 71, 0.2)")
          haloGrad.addColorStop(1, "rgba(255, 255, 255, 0)")
        }
        ctx.fillStyle = haloGrad
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, 75, 0, Math.PI * 2)
        ctx.fill()
      }

      // --- 3. Ambient Sparkling Sun Reflections (Diamond Glints on Waves) ---
      for (let i = 0; i < sparkles.length; i++) {
        const sp = sparkles[i]
        // Subtle drift following the ocean swell
        const driftX = Math.sin(t * 0.6 + sp.phase) * 6
        const driftY = Math.cos(t * 0.8 + sp.phase) * 4
        const sx = sp.xRatio * width + driftX
        const sy = sp.yRatio * height + driftY

        // Natural non-linear twinkling (diamond glint curve)
        const rawTwinkle = Math.sin(t * sp.speed + sp.phase)
        const twinkle = Math.pow(Math.max(0, rawTwinkle), 3.5)

        if (twinkle < 0.05) continue

        const size = sp.baseSize * (0.8 + twinkle * 0.9)
        const alpha = Math.min(1, twinkle * 0.95)

        ctx.save()
        // Core diamond glint
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${alpha.toFixed(3)})`
          : `rgba(255, 255, 255, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fill()

        // 4-point golden sun flare cross
        if (twinkle > 0.4) {
          const flare = sp.flareLen * twinkle
          ctx.strokeStyle = isDark
            ? `rgba(254, 240, 138, ${(alpha * 0.85).toFixed(3)})` // Warm golden glint
            : `rgba(253, 224, 71, ${(alpha * 0.9).toFixed(3)})`
          ctx.lineWidth = 1.0

          ctx.beginPath()
          ctx.moveTo(sx - flare, sy)
          ctx.lineTo(sx + flare, sy)
          ctx.moveTo(sx, sy - flare)
          ctx.lineTo(sx, sy + flare)
          ctx.stroke()
        }
        ctx.restore()
      }

      // --- 4. Interactive Trail Sparkles (Trailing Wake) ---
      for (let i = 0; i < trailSparkles.length; i++) {
        const tsp = trailSparkles[i]
        const age = now - tsp.time
        const progress = age / tsp.life
        if (progress >= 1) continue

        tsp.x += tsp.vx
        tsp.y += tsp.vy

        const alpha = (1 - progress) * 0.9
        const size = tsp.size * (1 - progress * 0.4)

        ctx.save()
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(tsp.x, tsp.y, size, 0, Math.PI * 2)
        ctx.fill()

        // Soft golden halo
        ctx.strokeStyle = `rgba(253, 224, 71, ${(alpha * 0.7).toFixed(3)})`
        ctx.lineWidth = 0.8
        const flare = size * 2.5
        ctx.beginPath()
        ctx.moveTo(tsp.x - flare, tsp.y)
        ctx.lineTo(tsp.x + flare, tsp.y)
        ctx.moveTo(tsp.x, tsp.y - flare)
        ctx.lineTo(tsp.x, tsp.y + flare)
        ctx.stroke()
        ctx.restore()
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
      className="relative w-[calc(100%+2rem)] -mx-4 sm:w-[calc(100%+4rem)] sm:-mx-8 h-48 sm:h-56 lg:h-64 mt-12 border-t-[1.5px] border-dashed border-foreground/25 select-none overflow-hidden"
    >
      {/* Cinematic Deep Blue Ocean Sea Surface */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src="/ocean-sea-water.webp"
          alt="Deep ocean sea water with sunlight sparkles"
          width={1376}
          height={768}
          className="w-full h-full object-cover object-center select-none"
          style={{
            animation: "ocean-swell 14s ease-in-out infinite",
            filter: "contrast(1.08) saturate(1.15)",
          }}
        />

        {/* Soft atmospheric gradient masks: blends into page top & enhances water depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-black/25 pointer-events-none" />

        {/* Light mode marine azure overlay for high contrast & radiant sea color */}
        <div className="absolute inset-0 bg-sky-500/10 dark:bg-transparent mix-blend-overlay pointer-events-none" />
      </div>

      {/* Living Interactive Sunlight Caustics & Diamond Sparkles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
      />

      {/* Fluid Ocean Swell Animation */}
      <style jsx>{`
        @keyframes ocean-swell {
          0%, 100% {
            transform: scale(1.04) translateY(0px) rotate(0deg);
          }
          50% {
            transform: scale(1.09) translateY(-6px) rotate(0.35deg);
          }
        }
      `}</style>
    </footer>
  )
}
