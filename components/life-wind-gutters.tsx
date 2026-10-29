"use client"

import { useEffect, useRef } from "react"

/**
 * LifeWindGutters: pointer-only pixel ripples in the /life side gutters.
 * Same wave physics as the homepage pond, drawn as soft square pixels.
 * Nothing renders at rest; the loop sleeps once the water is calm.
 */

export function LifeWindGutters() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const cell = 7
    const gap = 1
    let w = 0, h = 0, cols = 0, rows = 0
    let h0 = new Float32Array(0), h1 = new Float32Array(0)
    let colL = 0, colR = 0
    const fadeW = 56
    let anim = 0, running = false, prevT = 0, acc = 0
    let px = -1, py = -1

    const bounds = () => {
      const m = document.querySelector("main")
      if (m) { const r = m.getBoundingClientRect(); colL = r.left - 16; colR = r.right + 16 }
      else { colL = w / 2 - 390; colR = w / 2 + 390 }
    }
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth; h = window.innerHeight
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
      canvas.style.width = w + "px"; canvas.style.height = h + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / cell); rows = Math.ceil(h / cell)
      h0 = new Float32Array(cols * rows); h1 = new Float32Array(cols * rows)
      bounds()
    }
    const fadeAt = (x: number) => {
      if (x < colL) return Math.min(1, (colL - x) / fadeW)
      if (x > colR) return Math.min(1, (x - colR) / fadeW)
      return 0
    }
    const drop = (x: number, y: number, s: number, rad: number) => {
      const gx = Math.floor(x / cell), gy = Math.floor(y / cell)
      for (let dy = -rad; dy <= rad; dy++) for (let dx = -rad; dx <= rad; dx++) {
        const nx = gx + dx, ny = gy + dy
        if (nx < 1 || ny < 1 || nx >= cols - 1 || ny >= rows - 1) continue
        const d = Math.hypot(dx, dy)
        if (d <= rad) h0[ny * cols + nx] += s * 0.5 * (1 + Math.cos((Math.PI * d) / rad))
      }
    }
    const wake = () => { if (!running) { running = true; prevT = 0; anim = requestAnimationFrame(tick) } }

    const onMove = (e: PointerEvent) => {
      const x = e.clientX, y = e.clientY
      if (fadeAt(x) <= 0) { px = x; py = y; return }
      const d = px < 0 ? 0 : Math.hypot(x - px, y - py)
      if (px < 0 || d > 6) {
        const steps = Math.max(1, Math.ceil(d / 10))
        for (let i = 1; i <= steps; i++) {
          const t = i / steps
          drop(px < 0 ? x : px + (x - px) * t, py < 0 ? y : py + (y - py) * t, Math.min(0.9, 0.3 + d / 70) / steps * 1.6, 2)
        }
        px = x; py = y
        wake()
      }
    }
    const onDown = (e: PointerEvent) => { if (fadeAt(e.clientX) > 0) { drop(e.clientX, e.clientY, 2.2, 4); wake() } }
    const onLeave = () => { px = -1; py = -1 }

    const step = () => {
      const damp = 0.965
      for (let y = 1; y < rows - 1; y++) {
        const o = y * cols
        for (let x = 1; x < cols - 1; x++) {
          const i = o + x
          h1[i] = ((h0[i - 1] + h0[i + 1] + h0[i - cols] + h0[i + cols]) * 0.5 - h1[i]) * damp
        }
      }
      const t = h0; h0 = h1; h1 = t
    }

    const tick = (now: number) => {
      // fixed 60Hz physics so speed is identical on any display
      const dt = prevT ? Math.min(50, now - prevT) : 16.667
      prevT = now
      acc += dt
      while (acc >= 16.667) { step(); acc -= 16.667 }

      ctx.clearRect(0, 0, w, h)
      const dark = document.documentElement.classList.contains("dark")
      let energy = 0
      for (let c = 0; c < cols; c++) {
        const cx = c * cell + cell / 2
        const f = fadeAt(cx)
        if (f <= 0.01) continue
        for (let r = 0; r < rows; r++) {
          const v = h0[r * cols + c]
          const a = Math.abs(v)
          energy += a
          if (a < 0.03) continue
          const k = Math.min(1, a * 1.6)
          const alpha = (k * k * (3 - 2 * k)) * f * (dark ? 0.85 : 0.7)
          if (v > 0) ctx.fillStyle = dark ? `rgba(224,242,254,${alpha.toFixed(3)})` : `rgba(2,132,199,${alpha.toFixed(3)})`
          else ctx.fillStyle = dark ? `rgba(56,189,248,${(alpha * 0.8).toFixed(3)})` : `rgba(30,64,175,${(alpha * 0.8).toFixed(3)})`
          ctx.fillRect(c * cell, r * cell, cell - gap, cell - gap)
        }
      }
      if (energy > 0.5) anim = requestAnimationFrame(tick)
      else { running = false; h0.fill(0); h1.fill(0); ctx.clearRect(0, 0, w, h) }
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("scroll", bounds, { passive: true })
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(anim)
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", bounds)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 hidden md:block select-none" />
}
