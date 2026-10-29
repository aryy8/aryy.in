"use client"

import { useEffect, useRef } from "react"

/**
 * LifeWindGutters: pointer-only ASCII wind in the side gutters of /life.
 * Nothing renders at rest. Moving the pointer through a gutter leaves
 * a trail of wind streaks and small cloud wisps that drift and fade.
 */

const CLOUD = ["·", "∙", "°", "o", "O", "@"]
const WIND = ["·", "-", "~", "≈", "=", "≡"]

type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; kind: 0 | 1; g: number }

export function LifeWindGutters() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let w = 0, h = 0, dpr = 1
    let colL = 0, colR = 0
    const fadeW = 56
    const ps: P[] = []
    let anim = 0
    let running = false
    let last = { x: -1, y: -1 }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = w + "px"; canvas.style.height = h + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      bounds()
    }
    const bounds = () => {
      const m = document.querySelector("main")
      if (m) { const r = m.getBoundingClientRect(); colL = r.left - 16; colR = r.right + 16 }
      else { colL = w / 2 - 390; colR = w / 2 + 390 }
    }
    const gutterFade = (x: number) => {
      if (x < colL) return Math.min(1, (colL - x) / fadeW)
      if (x > colR) return Math.min(1, (x - colR) / fadeW)
      return 0
    }

    const onMove = (e: PointerEvent) => {
      const x = e.clientX, y = e.clientY
      const dx = last.x < 0 ? 0 : x - last.x
      const dy = last.y < 0 ? 0 : y - last.y
      last = { x, y }
      if (gutterFade(x) <= 0) return
      const speed = Math.min(40, Math.hypot(dx, dy))
      const n = Math.max(1, Math.round(speed / 9))
      for (let i = 0; i < n; i++) {
        const cloud = Math.random() < 0.45
        const max = cloud ? 110 + Math.random() * 70 : 70 + Math.random() * 50
        ps.push({
          x: x - dx * (i / n) + (Math.random() - 0.5) * (cloud ? 22 : 8),
          y: y - dy * (i / n) + (Math.random() - 0.5) * (cloud ? 16 : 6),
          vx: dx * 0.035 + 0.25 + Math.random() * 0.2,
          vy: dy * 0.025 + (Math.random() - 0.5) * 0.1,
          life: max, max, kind: cloud ? 0 : 1, g: Math.random(),
        })
      }
      if (ps.length > 500) ps.splice(0, ps.length - 500)
      if (!running) { running = true; anim = requestAnimationFrame(tick) }
    }
    const onLeave = () => { last = { x: -1, y: -1 } }

    let prev = 0
    const tick = (now: number) => {
      const dt = prev ? Math.min(3, (now - prev) / 16.667) : 1
      prev = now
      ctx.clearRect(0, 0, w, h)
      const dark = document.documentElement.classList.contains("dark")
      ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace"
      ctx.textAlign = "center"; ctx.textBaseline = "middle"
      const damp = Math.pow(0.985, dt), dampY = Math.pow(0.975, dt)
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i]
        p.x += p.vx * dt; p.y += p.vy * dt
        p.vx = p.vx * damp + 0.003 * dt
        p.vy *= dampY
        p.life -= dt
        const f = gutterFade(p.x)
        if (p.life <= 0 || f <= 0) { ps.splice(i, 1); continue }
        const t = p.life / p.max
        const age = 1 - t
        const fadeIn = Math.min(1, age / 0.12)
        const fadeOut = t * t * (3 - 2 * t)
        const set = p.kind === 0 ? CLOUD : WIND
        const gi = Math.min(set.length - 1, Math.floor((t * 0.75 + p.g * 0.25) * set.length))
        const a = fadeIn * fadeOut * f
        if (a < 0.01) continue
        ctx.fillStyle = dark
          ? (p.kind === 0 ? `rgba(226,240,255,${(a * 0.75).toFixed(3)})` : `rgba(147,197,253,${(a * 0.6).toFixed(3)})`)
          : (p.kind === 0 ? `rgba(30,58,110,${(a * 0.65).toFixed(3)})` : `rgba(37,99,235,${(a * 0.55).toFixed(3)})`)
        ctx.fillText(set[gi], p.x, p.y)
      }
      if (ps.length) anim = requestAnimationFrame(tick)
      else { running = false; prev = 0; ctx.clearRect(0, 0, w, h) }
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("scroll", bounds, { passive: true })
    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(anim)
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", bounds)
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 hidden md:block select-none" />
}
