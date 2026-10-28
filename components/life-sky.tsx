"use client"

import { useEffect, useRef } from "react"
import "./life-sky.css"

const RAMP = " .,:;-~=+*#%@"

// pixel plane, side view facing right. 1 body, 2 window, 3 tail/accent
const PLANE = [
  "000000000000000000000",
  "330000000000000000000",
  "333000000000000000000",
  "333300000000000000000",
  "011111111111111111100",
  "012121212121212111110",
  "011111111111111111111",
  "000011111111111111100",
  "000000000111110000000",
  "000000000011100000000",
]

// cheap smooth value noise
function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return s - Math.floor(s)
}
function noise(x: number, y: number) {
  const xi = Math.floor(x), yi = Math.floor(y)
  const xf = x - xi, yf = y - yi
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf)
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}
function fbm(x: number, y: number) {
  return noise(x, y) * 0.55 + noise(x * 2.1, y * 2.1) * 0.3 + noise(x * 4.3, y * 4.3) * 0.15
}

export function LifeSky() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true
    const CW = 7, CH = 11

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      ctx.font = `11px ui-monospace, SFMono-Regular, Menlo, monospace`
      ctx.textBaseline = "top"
      const cols = Math.ceil(w / CW), rows = Math.ceil(h / CH)
      const drift = t * 0.00004
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const n = fbm(c * 0.07 + drift * 60, r * 0.16 + 3.7)
          const v = Math.max(0, (n - 0.42) / 0.58)
          if (v <= 0.02) continue
          const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))]
          ctx.fillStyle = `rgba(226,232,240,${0.12 + v * 0.6})`
          ctx.fillText(ch, c * CW, r * CH)
        }
      }
      // plane
      const P = 3
      const pw = PLANE[0].length * P
      const span = w + pw + 120
      const px = reduce ? w * 0.42 : ((t * 0.045) % span) - pw - 60
      const py = h * 0.38 + (reduce ? 0 : Math.sin(t * 0.002) * 3)
      // dotted contrail
      ctx.fillStyle = "rgba(255,255,255,.35)"
      for (let i = 1; i < 14; i++) ctx.fillRect(Math.round(px - i * 9), Math.round(py + 5 * P), 2, 2)
      PLANE.forEach((row, y) => {
        for (let x = 0; x < row.length; x++) {
          const k = row[x]
          if (k === "0") continue
          ctx.fillStyle = k === "2" ? "#38bdf8" : k === "3" ? "#60a5fa" : "#f1f5f9"
          ctx.fillRect(Math.round(px + x * P), Math.round(py + y * P), P, P)
        }
      })
    }

    const start = performance.now()
    if (reduce) draw(0)
    else raf = window.setInterval(() => { if (visible && !document.hidden) draw(performance.now() - start) }, 40)
    return () => { clearInterval(raf); ro.disconnect(); io.disconnect() }
  }, [])

  return (
    <div className="life-sky" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  )
}
