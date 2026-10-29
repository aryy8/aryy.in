"use client"

import { useEffect, useRef } from "react"

/**
 * LifeWindGutters: pointer-only ASCII wind in the side gutters of /life.
 * Nothing renders at rest. Moving the pointer through a gutter leaves
 * a trail of wind streaks and small cloud wisps that drift and fade.
 */

const DARK = ["255,255,255", "224,242,254", "186,230,253", "125,211,252", "56,189,248"]
const LIGHT = ["14,116,144", "2,132,199", "37,99,235", "56,189,248", "125,180,230"]

type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; kind: 0 | 1; g: number; nx: number; ny: number; s: number; amp: number }

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

    let arc = 0
    let nrm = { x: 0, y: 1 }
    const onMove = (e: PointerEvent) => {
      const x = e.clientX, y = e.clientY
      const dx = last.x < 0 ? 0 : x - last.x
      const dy = last.y < 0 ? 0 : y - last.y
      last = { x, y }
      if (gutterFade(x) <= 0) return
      const dist = Math.hypot(dx, dy)
      if (dist > 0.5) {
        // unit normal to the pointer path, smoothed so the wave doesn't twitch
        const tx = -dy / dist, ty = dx / dist
        nrm = { x: nrm.x * 0.8 + tx * 0.2, y: nrm.y * 0.8 + ty * 0.2 }
        const l = Math.hypot(nrm.x, nrm.y) || 1
        nrm = { x: nrm.x / l, y: nrm.y / l }
      }
      arc += dist
      const speed = Math.min(40, dist)
      const n = Math.max(1, Math.round(speed / 9))
      for (let i = 0; i < n; i++) {
        const cloud = Math.random() < 0.45
        const max = cloud ? 110 + Math.random() * 70 : 70 + Math.random() * 50
        ps.push({
          x: x - dx * (i / n) + (Math.random() - 0.5) * (cloud ? 8 : 4),
          y: y - dy * (i / n) + (Math.random() - 0.5) * (cloud ? 8 : 4),
          vx: dx * 0.035 + 0.25 + Math.random() * 0.2,
          vy: dy * 0.025 + (Math.random() - 0.5) * 0.1,
          life: max, max, kind: cloud ? 0 : 1, g: Math.random(),
          nx: nrm.x, ny: nrm.y, s: arc - dist * (i / n), amp: (cloud ? 14 : 9) + Math.random() * 4,
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
            const damp = Math.pow(0.985, dt), dampY = Math.pow(0.975, dt)
      const tm = now * 0.0032
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
        const a = fadeIn * fadeOut * f
        if (a < 0.01) continue
        const base = p.kind === 0 ? 7 : 4
        const sz = Math.max(2, Math.round((base * (0.45 + 0.55 * t)) / 2) * 2)
        const pal = dark ? DARK : LIGHT
        const c = pal[Math.min(pal.length - 1, Math.floor(p.g * pal.length))]
        ctx.fillStyle = `rgba(${c},${(a * (dark ? 0.85 : 0.75)).toFixed(3)})`
        // wave along the trail: travelling sine across the path, swelling as it ages
        const grow = Math.min(1, (1 - t) / 0.35)
        const off = Math.sin(p.s * 0.055 - tm) * p.amp * grow
        const wx = p.x + p.nx * off, wy = p.y + p.ny * off
        ctx.fillRect(wx - sz / 2, wy - sz / 2, sz, sz)
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
