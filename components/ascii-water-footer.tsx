"use client"

import { useEffect, useRef, useState } from "react"

/* ============================================================================
 * [PRESERVED VERSION] - 6-Octave Photorealistic WebGL Ocean Shader (commit 365b4b1)
 * ----------------------------------------------------------------------------
 * Kept intact as requested. To switch back to this WebGL shader, uncomment the
 * shader strings and the WebGL initialization block below.
 *
 * const VERT_SHADER_SRC = `
 *   attribute vec2 a_position;
 *   void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
 * `
 *
 * const FRAG_SHADER_SRC = `
 *   precision highp float;
 *   uniform vec2 u_resolution;
 *   uniform float u_time;
 *   uniform vec2 u_mouse;
 *   uniform float u_mouse_active;
 *   uniform float u_is_dark;
 *   #define MAX_RIPPLES 8
 *   uniform vec4 u_ripples[MAX_RIPPLES];
 *   uniform int u_ripple_count;
 *   const mat2 m_rot = mat2(1.6, 1.2, -1.2, 1.6);
 *   float sea_octave(vec2 uv, float choppy) {
 *     vec2 uv_warp = uv + vec2(0.35 * sin(uv.y * 1.4 + uv.x * 0.7), 0.35 * cos(uv.x * 1.4 - uv.y * 0.7));
 *     vec2 wv = 1.0 - abs(sin(uv_warp));
 *     vec2 swv = abs(cos(uv_warp));
 *     wv = mix(wv, swv, wv);
 *     return pow(max(0.0001, 1.0 - pow(max(0.0001, wv.x * wv.y), 0.65)), choppy);
 *   }
 *   float sea_height(vec2 p, float time) {
 *     vec2 uv = vec2(p.x * 0.44, p.y * 0.88);
 *     float freq = 3.2, amp = 0.28, choppy = 2.2, h = 0.0;
 *     for (int i = 0; i < 6; i++) {
 *       vec2 t_vec = vec2(time * 0.62, time * 0.46);
 *       h += (sea_octave(uv * freq + t_vec, choppy) + sea_octave(uv * freq - t_vec, choppy)) * amp;
 *       uv = (m_rot * uv) * 0.55; freq *= 1.85; amp *= 0.30; choppy = mix(choppy, 1.0, 0.16);
 *     }
 *     return h;
 *   }
 *   void main() {
 *     vec2 uv = gl_FragCoord.xy / u_resolution.xy;
 *     vec2 p_ndc = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
 *     float t = u_time * 0.85;
 *     vec3 cam_pos = vec3(0.0, 3.6, 2.8);
 *     vec3 forward = normalize(vec3(0.0, -0.68, -0.73));
 *     vec3 right = vec3(1.0, 0.0, 0.0);
 *     vec3 up = cross(right, forward);
 *     vec3 rd = normalize(p_ndc.x * right * 1.05 + p_ndc.y * up + forward);
 *     float d_plane = rd.y < -0.01 ? -cam_pos.y / rd.y : 40.0;
 *     vec3 hit_pos = cam_pos + d_plane * rd;
 *     vec2 sea_pos = hit_pos.xz;
 *     float h = sea_height(sea_pos, t);
 *     float eps = 0.006;
 *     float hx = (sea_height(sea_pos + vec2(eps, 0.0), t) - sea_height(sea_pos - vec2(eps, 0.0), t)) / (2.0 * eps);
 *     float hz = (sea_height(sea_pos + vec2(0.0, eps), t) - sea_height(sea_pos - vec2(0.0, eps), t)) / (2.0 * eps);
 *     vec3 N = normalize(vec3(-hx, 1.0, -hz));
 *     vec3 V = -rd;
 *     vec3 sun_dir = normalize(vec3(0.05, 0.38, -0.92));
 *     vec3 R = reflect(-V, N);
 *     float RdotL = max(0.0, dot(R, sun_dir));
 *     float fresnel = 0.02 + 0.98 * pow(max(0.0, 1.0 - max(0.0, dot(N, V))), 5.0);
 *     float sun_col = exp(-pow(sea_pos.x * 0.45, 2.0) * 0.45);
 *     float broad_sheen = pow(RdotL, 10.0) * (0.15 + 0.85 * sun_col);
 *     float crest_glint = pow(RdotL, 48.0) * (0.25 + 0.75 * sun_col);
 *     float micro_noise = sin(sea_pos.x * 44.0 + t * 4.5) * cos(sea_pos.y * 44.0 - t * 3.5);
 *     float sparkle_fac = smoothstep(0.1, 0.4, micro_noise);
 *     float diamond_glint = pow(RdotL, 220.0) * (0.35 + 0.65 * sparkle_fac) * (0.3 + 0.7 * sun_col);
 *     float h_norm = clamp(h * 0.68 + 0.36, 0.0, 1.0);
 *     vec3 water_color, spec_color;
 *     if (u_is_dark > 0.5) {
 *       vec3 deep_trough = vec3(0.012, 0.045, 0.125);
 *       vec3 mid_body = vec3(0.025, 0.110, 0.285);
 *       vec3 crest_azure = vec3(0.062, 0.275, 0.575);
 *       vec3 base = mix(deep_trough, mid_body, h_norm);
 *       base = mix(base, crest_azure, pow(h_norm, 1.7));
 *       base += vec3(0.015, 0.20, 0.35) * pow(max(0.0, dot(N, sun_dir)), 2.2) * pow(h_norm, 1.5);
 *       water_color = mix(base, vec3(0.038, 0.125, 0.285), fresnel * 0.5);
 *       spec_color = broad_sheen * vec3(1.0, 0.72, 0.22) * 1.1 + crest_glint * vec3(1.0, 0.92, 0.55) * 1.5 + diamond_glint * vec3(1.0, 0.98, 0.95) * 2.6;
 *     } else {
 *       vec3 deep_trough = vec3(0.016, 0.205, 0.425);
 *       vec3 mid_body = vec3(0.032, 0.410, 0.685);
 *       vec3 crest_azure = vec3(0.165, 0.685, 0.905);
 *       vec3 base = mix(deep_trough, mid_body, h_norm);
 *       base = mix(base, crest_azure, pow(h_norm, 1.8));
 *       base += vec3(0.05, 0.28, 0.38) * pow(max(0.0, dot(N, sun_dir)), 2.2) * pow(h_norm, 1.5);
 *       water_color = mix(base, vec3(0.55, 0.80, 0.96), fresnel * 0.45);
 *       spec_color = broad_sheen * vec3(0.95, 0.85, 0.50) + crest_glint * vec3(1.0, 0.96, 0.80) + diamond_glint * vec3(1.0);
 *     }
 *     gl_FragColor = vec4(water_color + spec_color, smoothstep(1.0, 0.88, uv.y));
 *   }
 * `
 * ============================================================================
 */

interface Ripple {
  x: number // Sea coordinate X
  z: number // Sea coordinate Z
  time: number // Time in seconds
  strength: number
}

// 4x4 Bayer Dithering Matrix for authentic retro 16-bit pixel water gradients
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
]

export function AsciiWaterFooter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [renderMode, setRenderMode] = useState<"ascii" | "pixels">("ascii")
  const modeRef = useRef<"ascii" | "pixels">("ascii")

  // Keep ref synchronized for animation frame callback
  useEffect(() => {
    modeRef.current = renderMode
  }, [renderMode])

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

    // Interactive pointer state
    const pointer = {
      seaX: 0.0,
      seaZ: 0.0,
      active: false,
    }

    const ripples: Ripple[] = []
    const MAX_RIPPLES = 8

    const addRipple = (seaX: number, seaZ: number, strength = 0.8) => {
      const nowSec = performance.now() * 0.001
      if (ripples.length >= MAX_RIPPLES) ripples.shift()
      ripples.push({
        x: seaX,
        z: seaZ,
        time: nowSec,
        strength,
      })
    }

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
    const resizeObserver = new ResizeObserver(() => updateSize())
    resizeObserver.observe(container)

    let isVisible = true
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.01 }
    )
    visibilityObserver.observe(container)

    // Convert pixel position (px, py) to 3D sea plane (x, z)
    const pixelToSea = (px: number, py: number) => {
      const v = Math.max(0.01, Math.min(1.0, py / height))
      // Perspective foreshortening: top of footer is distant horizon (z~10), bottom is near (z~2.2)
      const depth = 2.2 + Math.pow(1.0 - v, 1.7) * 8.5
      const seaX = ((px - width * 0.5) / height) * depth * 1.5
      const seaZ = depth
      return { seaX, seaZ }
    }

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      const sea = pixelToSea(px, py)
      pointer.seaX = sea.seaX
      pointer.seaZ = sea.seaZ
      pointer.active = true
    }

    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      const sea = pixelToSea(px, py)
      addRipple(sea.seaX, sea.seaZ, 1.4)
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    canvas.addEventListener("pointermove", handlePointerMove)
    canvas.addEventListener("pointerdown", handlePointerDown)
    canvas.addEventListener("pointerleave", handlePointerLeave)

    const startTime = performance.now()

    const render = () => {
      animId = requestAnimationFrame(render)
      if (!isVisible) return

      const nowSec = (performance.now() - startTime) * 0.001
      const isDark = document.documentElement.classList.contains("dark")
      const currentMode = modeRef.current

      // Clean old ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (nowSec - ripples[i].time > 3.0) {
          ripples.splice(i, 1)
        }
      }

      ctx.clearRect(0, 0, width, height)

      // Background ambient water depth glow
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height)
      if (isDark) {
        bgGrad.addColorStop(0, "rgba(2, 6, 23, 0)")
        bgGrad.addColorStop(0.25, "rgba(3, 15, 38, 0.85)")
        bgGrad.addColorStop(1, "rgba(1, 8, 24, 0.98)")
      } else {
        bgGrad.addColorStop(0, "rgba(255, 255, 255, 0)")
        bgGrad.addColorStop(0.25, "rgba(240, 249, 255, 0.8)")
        bgGrad.addColorStop(1, "rgba(224, 242, 254, 0.95)")
      }
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Calm oceanic wave time scale (relaxed rolling swells)
      const t = nowSec * 0.85

      // ======================================================================
      // MODE 1: 3D PERSPECTIVE ASCII WATER SEA
      // ======================================================================
      if (currentMode === "ascii") {
        const cellW = 8.5
        const cellH = 14
        const cols = Math.ceil(width / cellW)
        const rows = Math.ceil(height / cellH)

        ctx.font = '11px "JetBrains Mono", "Geist Mono", SFMono-Regular, Menlo, Monaco, Consolas, monospace'
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        for (let r = 0; r < rows; r++) {
          const py = (r + 0.5) * cellH
          const v = Math.max(0.01, Math.min(1.0, py / height))

          // 3D Perspective foreshortening: horizon is distant (z ~ 11), foreground is close (z ~ 2.2)
          const depth = 2.2 + Math.pow(1.0 - v, 1.7) * 8.5
          const topFade = Math.sin(Math.min(1.0, py / 24) * Math.PI * 0.5)

          for (let c = 0; c < cols; c++) {
            const px = (c + 0.5) * cellW
            const seaX = ((px - width * 0.5) / height) * depth * 1.5
            const seaZ = depth

            // --- 3D Multi-Harmonic Ocean Heightfield ---
            // 1. Primary rolling swell moving towards camera
            const phase1 = seaZ * 1.05 - t * 1.25 + Math.sin(seaX * 0.35) * 0.45
            const s1 = Math.sin(phase1)
            const w1 = Math.pow((s1 + 1) * 0.5, 2.3) * 0.52

            // 2. Angled cross-swell (30 degrees)
            const phase2 = (seaX * 0.42 + seaZ * 0.91) * 1.7 - t * 1.5
            const s2 = Math.sin(phase2)
            const w2 = Math.pow((s2 + 1) * 0.5, 2.0) * 0.28

            // 3. Capillary ripples & surface drift
            const phase3 = (seaZ * 1.35 - seaX * 0.55) * 2.8 - t * 2.0
            const w3 = Math.sin(phase3) * 0.12

            let h = w1 + w2 + w3 - 0.28

            // Pointer wake disturbance
            if (pointer.active) {
              const dx = seaX - pointer.seaX
              const dz = seaZ - pointer.seaZ
              const dist = Math.hypot(dx, dz)
              if (dist < 1.8) {
                h += Math.sin(dist * 7.5 - t * 5.0) * Math.exp(-dist * 1.6) * 0.22
              }
            }

            // Expanding shockwave ripples
            for (let i = 0; i < ripples.length; i++) {
              const rip = ripples[i]
              const age = nowSec - rip.time
              if (age > 0 && age < 3.0) {
                const dx = seaX - rip.x
                const dz = seaZ - rip.z
                const dist = Math.hypot(dx, dz)
                const wavefront = dist - age * 3.4
                if (Math.abs(wavefront) < 1.1) {
                  const wave = Math.sin(wavefront * 11.0) * Math.exp(-Math.abs(wavefront) * 2.6) * Math.exp(-age * 1.1) * rip.strength
                  h += wave * 0.32
                }
              }
            }

            // Central golden sun track reflection (down the center of the water)
            const sunTrack = Math.exp(-Math.pow(seaX * 0.44, 2.0) * 0.5)
            const glintFactor = Math.pow(Math.max(0, (h + 0.1) * 1.3), 2.2) * sunTrack
            const microTwinkle = Math.sin(seaX * 24.0 + t * 4.2) * Math.cos(seaZ * 20.0 - t * 3.4)
            const sparkle = glintFactor * (0.65 + 0.35 * Math.max(0, microTwinkle))

            // Normalized ocean wave luminance [0, 1]
            const lum = Math.max(0, Math.min(1, 0.44 + h * 0.62))

            // ASCII Glyph selection based on water height, swell crest, and golden sun glints
            let char = " "
            let fill = ""

            if (sparkle > 0.45) {
              // Radiant golden sunset specular glint on crests
              char = sparkle > 0.72 ? "✦" : sparkle > 0.58 ? "✧" : "*"
              fill = isDark
                ? `rgba(254, 240, 138, ${(0.96 * topFade).toFixed(3)})`
                : `rgba(202, 138, 4, ${(0.95 * topFade).toFixed(3)})`
            } else if (lum > 0.82) {
              // Cresting foam roller
              char = "≋"
              fill = isDark
                ? `rgba(224, 242, 254, ${(0.95 * topFade).toFixed(3)})`
                : `rgba(7, 89, 133, ${(0.95 * topFade).toFixed(3)})`
            } else if (lum > 0.68) {
              // Wave swell crest
              char = "≈"
              fill = isDark
                ? `rgba(125, 211, 252, ${(0.88 * topFade).toFixed(3)})`
                : `rgba(3, 105, 161, ${(0.9 * topFade).toFixed(3)})`
            } else if (lum > 0.52) {
              // Rising swell curl
              char = "∼"
              fill = isDark
                ? `rgba(56, 189, 248, ${(0.78 * topFade).toFixed(3)})`
                : `rgba(2, 132, 199, ${(0.82 * topFade).toFixed(3)})`
            } else if (lum > 0.36) {
              // Smooth water face
              char = "~"
              fill = isDark
                ? `rgba(14, 165, 233, ${(0.62 * topFade).toFixed(3)})`
                : `rgba(14, 165, 233, ${(0.7 * topFade).toFixed(3)})`
            } else if (lum > 0.22) {
              // Gentle wave trough
              char = "·"
              fill = isDark
                ? `rgba(3, 105, 161, ${(0.45 * topFade).toFixed(3)})`
                : `rgba(56, 189, 248, ${(0.5 * topFade).toFixed(3)})`
            } else {
              // Deep ocean trough: space (creates natural contrast & negative space)
              continue
            }

            ctx.fillStyle = fill
            ctx.fillText(char, px, py)
          }
        }
      }

      // ======================================================================
      // MODE 2: RETRO 16-BIT PIXEL DITHERED WATER SEA
      // ======================================================================
      else if (currentMode === "pixels") {
        const pixelSize = 5
        const cols = Math.ceil(width / pixelSize)
        const rows = Math.ceil(height / pixelSize)

        // 16-Bit Retro Ocean Palette
        const darkPalette = [
          "rgba(2, 6, 23, 0.9)",     // 0: Abyssal trough
          "rgba(7, 29, 64, 0.95)",    // 1: Midnight navy
          "rgba(3, 105, 161, 0.95)",  // 2: Oceanic sapphire
          "rgba(2, 132, 199, 0.98)",  // 3: Vivid azure
          "rgba(56, 189, 248, 1.0)",  // 4: Radiant cyan crest
          "rgba(224, 242, 254, 1.0)", // 5: Foam white
        ]

        const lightPalette = [
          "rgba(240, 249, 255, 0.85)", // 0: Sky reflection trough
          "rgba(186, 230, 253, 0.9)",  // 1: Calm light blue
          "rgba(56, 189, 248, 0.95)",  // 2: Vibrant cyan
          "rgba(2, 132, 199, 0.98)",   // 3: Marine azure
          "rgba(3, 105, 161, 1.0)",    // 4: Deep royal crest
          "rgba(7, 89, 133, 1.0)",     // 5: Crisp navy crest
        ]

        const palette = isDark ? darkPalette : lightPalette

        for (let r = 0; r < rows; r++) {
          const py = r * pixelSize
          const v = Math.max(0.01, Math.min(1.0, py / height))

          // 3D Perspective depth
          const depth = 2.2 + Math.pow(1.0 - v, 1.7) * 8.5
          const topFade = Math.sin(Math.min(1.0, py / 20) * Math.PI * 0.5)

          for (let c = 0; c < cols; c++) {
            const px = c * pixelSize
            const seaX = ((px - width * 0.5) / height) * depth * 1.5
            const seaZ = depth

            // Rolling swells
            const phase1 = seaZ * 1.05 - t * 1.25 + Math.sin(seaX * 0.35) * 0.45
            const s1 = Math.sin(phase1)
            const w1 = Math.pow((s1 + 1) * 0.5, 2.3) * 0.52

            const phase2 = (seaX * 0.42 + seaZ * 0.91) * 1.7 - t * 1.5
            const s2 = Math.sin(phase2)
            const w2 = Math.pow((s2 + 1) * 0.5, 2.0) * 0.28

            const phase3 = (seaZ * 1.35 - seaX * 0.55) * 2.8 - t * 2.0
            const w3 = Math.sin(phase3) * 0.12

            let h = w1 + w2 + w3 - 0.28

            // Pointer wake
            if (pointer.active) {
              const dx = seaX - pointer.seaX
              const dz = seaZ - pointer.seaZ
              const dist = Math.hypot(dx, dz)
              if (dist < 1.8) {
                h += Math.sin(dist * 7.5 - t * 5.0) * Math.exp(-dist * 1.6) * 0.22
              }
            }

            // Expanding shockwave ripples
            for (let i = 0; i < ripples.length; i++) {
              const rip = ripples[i]
              const age = nowSec - rip.time
              if (age > 0 && age < 3.0) {
                const dx = seaX - rip.x
                const dz = seaZ - rip.z
                const dist = Math.hypot(dx, dz)
                const wavefront = dist - age * 3.4
                if (Math.abs(wavefront) < 1.1) {
                  const wave = Math.sin(wavefront * 11.0) * Math.exp(-Math.abs(wavefront) * 2.6) * Math.exp(-age * 1.1) * rip.strength
                  h += wave * 0.32
                }
              }
            }

            // Central golden specular glints
            const sunTrack = Math.exp(-Math.pow(seaX * 0.44, 2.0) * 0.5)
            const glintFactor = Math.pow(Math.max(0, (h + 0.1) * 1.3), 2.2) * sunTrack
            const microTwinkle = Math.sin(seaX * 24.0 + t * 4.2) * Math.cos(seaZ * 20.0 - t * 3.4)
            const sparkle = glintFactor * (0.65 + 0.35 * Math.max(0, microTwinkle))

            if (sparkle > 0.52 && topFade > 0.3) {
              // Twinkling retro pixel glint
              ctx.fillStyle = isDark ? "#fef08a" : "#eab308"
              ctx.fillRect(px, py, pixelSize, pixelSize)
              continue
            }

            // 4x4 Bayer Dithering for organic retro gradients
            const bayerVal = BAYER_4X4[r % 4][c % 4] / 16.0
            const lum = Math.max(0, Math.min(1, 0.44 + h * 0.62))
            const rawIndex = lum * (palette.length - 1)
            const baseIndex = Math.floor(rawIndex)
            const frac = rawIndex - baseIndex

            // Dither step threshold
            const finalIndex = Math.min(
              palette.length - 1,
              frac > bayerVal ? baseIndex + 1 : baseIndex
            )

            ctx.fillStyle = palette[finalIndex]
            ctx.fillRect(px, py, pixelSize, pixelSize)
          }
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
      className="relative w-[calc(100%+2rem)] -mx-4 sm:w-[calc(100%+4rem)] sm:-mx-8 h-48 sm:h-56 lg:h-64 mt-12 select-none overflow-hidden group"
    >
      {/* Background depth tint matching page theme */}
      <div className="absolute inset-0 bg-background/60 pointer-events-none" />

      {/* Living ASCII & Pixel Ocean Surface Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
      />

      {/* Subtle top edge gradient mask so the sea seamlessly merges into the page background */}
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background via-background/40 to-transparent pointer-events-none z-20" />

      {/* Minimalist Switcher: Toggle between ASCII and Pixel Sea */}
      <div className="absolute right-4 sm:right-6 top-3 z-30 flex items-center gap-1 rounded-full border border-border/50 bg-background/70 px-1 py-0.5 backdrop-blur-md shadow-sm opacity-60 hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => setRenderMode("ascii")}
          className={`px-2.5 py-0.5 text-[10px] font-mono rounded-full font-medium transition-all ${
            renderMode === "ascii"
              ? "bg-foreground text-background shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
          title="Switch to 3D Perspective ASCII Ocean"
        >
          ASCII
        </button>
        <button
          type="button"
          onClick={() => setRenderMode("pixels")}
          className={`px-2.5 py-0.5 text-[10px] font-mono rounded-full font-medium transition-all ${
            renderMode === "pixels"
              ? "bg-foreground text-background shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
          title="Switch to 16-Bit Retro Dithered Pixel Ocean"
        >
          Pixels
        </button>
      </div>
    </footer>
  )
}
