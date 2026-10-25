"use client"

import { useEffect, useRef } from "react"

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

// 4x4 Bayer Dithering Matrix for smooth retro pixel water transitions
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
]

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
      const depth = 2.4 + Math.pow(1.0 - v, 1.8) * 8.0
      const seaX = ((px - width * 0.5) / height) * depth * 1.4
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
      addRipple(sea.seaX, sea.seaZ, 1.3)
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    canvas.addEventListener("pointermove", handlePointerMove)
    canvas.addEventListener("pointerdown", handlePointerDown)
    canvas.addEventListener("pointerleave", handlePointerLeave)

    const startTime = performance.now()

    // Floating water sparkles (light motes that drift calmly across the water surface)
    const numMotes = 32
    const motes = Array.from({ length: numMotes }, () => ({
      x: Math.random(),
      y: Math.random(),
      speedX: (Math.random() - 0.5) * 0.0002,
      speedY: 0.00015 + Math.random() * 0.0003,
      phase: Math.random() * Math.PI * 2,
    }))

    const render = () => {
      animId = requestAnimationFrame(render)
      if (!isVisible) return

      const nowSec = (performance.now() - startTime) * 0.001
      const isDark = document.documentElement.classList.contains("dark")

      // Clean old ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (nowSec - ripples[i].time > 3.0) {
          ripples.splice(i, 1)
        }
      }

      ctx.clearRect(0, 0, width, height)

      // Base sea gradient with calm deep water depth
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height)
      if (isDark) {
        bgGrad.addColorStop(0, "rgba(2, 6, 23, 0)")
        bgGrad.addColorStop(0.3, "rgba(3, 14, 38, 0.92)")
        bgGrad.addColorStop(1, "rgba(1, 7, 20, 0.98)")
      } else {
        bgGrad.addColorStop(0, "rgba(255, 255, 255, 0)")
        bgGrad.addColorStop(0.3, "rgba(240, 249, 255, 0.88)")
        bgGrad.addColorStop(1, "rgba(224, 242, 254, 0.98)")
      }
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Calm oceanic wave time scale (peaceful, meditative rolling swells)
      const t = nowSec * 0.36

      // ======================================================================
      // 16-BIT CALM PIXEL OCEAN WITH DIFFUSED & SCATTERED SUNLIGHT
      // ======================================================================
      const pixelSize = 4 // 4px retro pixel block size
      const cols = Math.ceil(width / pixelSize)
      const rows = Math.ceil(height / pixelSize)

      // Dark Mode 7-Level Gradient Palette (Deep Navy -> Sapphire -> Cyan -> Sunlit Gold -> Foam)
      const darkPalette = [
        "rgba(2, 6, 23, 0.94)",     // 0: Deep abyssal void
        "rgba(6, 24, 56, 0.95)",     // 1: Midnight ocean navy
        "rgba(3, 85, 145, 0.96)",    // 2: Oceanic sapphire
        "rgba(14, 145, 220, 0.98)",  // 3: Calm azure swell
        "rgba(56, 189, 248, 1.0)",   // 4: Radiant cyan crest (scattered light)
        "rgba(254, 240, 138, 0.95)", // 5: Warm golden sunlit crest
        "rgba(255, 255, 255, 1.0)",  // 6: Pure foam diamond glint
      ]

      // Light Mode 7-Level Gradient Palette (Deep Marine -> Azure -> Turquoise -> Pale Sky -> Sun Glint -> Foam)
      const lightPalette = [
        "rgba(7, 89, 133, 0.95)",    // 0: Deep marine blue
        "rgba(2, 132, 199, 0.96)",   // 1: Clear oceanic azure
        "rgba(14, 165, 233, 0.98)",  // 2: Vibrant azure
        "rgba(56, 189, 248, 1.0)",   // 3: Sunlit turquoise
        "rgba(125, 211, 252, 1.0)",  // 4: Luminous sky azure
        "rgba(254, 240, 138, 0.95)", // 5: Warm sunlit crest
        "rgba(255, 255, 255, 1.0)",  // 6: Crisp white foam
      ]

      const palette = isDark ? darkPalette : lightPalette

      for (let r = 0; r < rows; r++) {
        const py = r * pixelSize
        const v = Math.max(0.01, Math.min(1.0, py / height))

        // 3D Perspective depth: horizon (z ~ 10.4) to close foreground (z ~ 2.4)
        const depth = 2.4 + Math.pow(1.0 - v, 1.8) * 8.0
        const topFade = Math.sin(Math.min(1.0, py / 22) * Math.PI * 0.5)

        for (let c = 0; c < cols; c++) {
          const px = c * pixelSize
          const seaX = ((px - width * 0.5) / height) * depth * 1.4
          const seaZ = depth

          // --- 1. Calm Multi-Harmonic Ocean Swell ---
          const phase1 = seaZ * 0.85 - t * 1.1 + Math.sin(seaX * 0.28) * 0.35
          const s1 = Math.sin(phase1)
          const w1 = Math.pow((s1 + 1) * 0.5, 2.2) * 0.48

          const phase2 = (seaX * 0.38 + seaZ * 0.88) * 1.35 - t * 1.2
          const s2 = Math.sin(phase2)
          const w2 = Math.pow((s2 + 1) * 0.5, 2.0) * 0.26

          const phase3 = (seaZ * 1.15 - seaX * 0.45) * 2.2 - t * 1.6
          const w3 = Math.sin(phase3) * 0.09

          let h = w1 + w2 + w3 - 0.24

          // Pointer wake disturbance
          if (pointer.active) {
            const dx = seaX - pointer.seaX
            const dz = seaZ - pointer.seaZ
            const dist = Math.hypot(dx, dz)
            if (dist < 1.8) {
              h += Math.sin(dist * 6.5 - t * 4.0) * Math.exp(-dist * 1.5) * 0.18
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
              const wavefront = dist - age * 3.2
              if (Math.abs(wavefront) < 1.1) {
                const wave = Math.sin(wavefront * 10.0) * Math.exp(-Math.abs(wavefront) * 2.5) * Math.exp(-age * 1.0) * rip.strength
                h += wave * 0.28
              }
            }
          }

          // --- 2. Natural Sunlight Scattering & Dispersion Across the Sea ---
          // Fluid organic light streams (flowing along the 3D wave harmonics, NO artificial zebra bars!)
          const stream1 = Math.sin(seaX * 0.45 - seaZ * 0.35 + t * 0.25) * 0.5 + 0.5
          const stream2 = Math.cos(seaX * 0.85 + seaZ * 0.28 - t * 0.32) * 0.5 + 0.5
          const caustic = Math.sin(seaX * 2.4 + t * 0.9) * Math.cos(seaZ * 2.1 - t * 0.8) * 0.5 + 0.5

          // Broad central daylight reflection envelope across the ocean
          const sunEnvelope = Math.exp(-Math.pow(seaX * 0.38, 2.0) * 0.38)

          // Fluid scattered light intensity diffusing through the water
          const lightScatter = sunEnvelope * (stream1 * 0.42 + stream2 * 0.38 + caustic * 0.20)

          // Waves facing the light catch and scatter sunlight across their crests
          const crestScatter = Math.pow(Math.max(0, h * 0.85 + 0.22), 1.9) * (0.35 + 0.65 * lightScatter)

          // --- 3. 4x4 Bayer Dithering for organic pixel scatter ---
          const bayerVal = BAYER_4X4[r % 4][c % 4] / 16.0

          // Base water tone in [0, 1]
          const lum = Math.max(0, Math.min(1, 0.40 + h * 0.56))

          // Continuous color blend index: sunlight organically mixes into the palette!
          // Low light = 0 to 3 (deep navy & sapphire), High light on crests = 4 to 6 (cyan, gold, white foam)
          const levelVal = lum * 3.8 + crestScatter * 2.4
          const baseIndex = Math.floor(levelVal)
          const frac = levelVal - baseIndex

          // Bayer threshold decides the exact pixel color step, creating authentic retro pixel scattering
          const finalIndex = Math.min(
            palette.length - 1,
            frac > bayerVal ? baseIndex + 1 : baseIndex
          )

          ctx.fillStyle = palette[finalIndex]
          ctx.fillRect(px, py, pixelSize, pixelSize)
        }
      }

      // ======================================================================
      // FLOATING WATER SPARKLES (DELICATE SCATTERED LIGHT MOTES)
      // ======================================================================
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i]
        m.x += m.speedX
        m.y += m.speedY
        if (m.y > 1.0) {
          m.y = 0.0
          m.x = Math.random()
        }
        if (m.x < 0.0) m.x = 1.0
        if (m.x > 1.0) m.x = 0.0

        const mx = m.x * width
        const my = m.y * height

        // 3D position
        const v = my / height
        const depth = 2.4 + Math.pow(1.0 - v, 1.8) * 8.0
        const seaX = ((mx - width * 0.5) / height) * depth * 1.4

        const sunEnvelope = Math.exp(-Math.pow(seaX * 0.4, 2.0) * 0.4)
        if (sunEnvelope > 0.25) {
          const twinkle = (Math.sin(nowSec * 2.5 + m.phase) + 1) * 0.5
          const alpha = Math.min(1.0, sunEnvelope * twinkle * 0.85)

          const pixelX = Math.round(mx / pixelSize) * pixelSize
          const pixelY = Math.round(my / pixelSize) * pixelSize

          ctx.fillStyle = isDark
            ? `rgba(254, 240, 138, ${alpha.toFixed(3)})`
            : `rgba(255, 255, 255, ${alpha.toFixed(3)})`
          ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize)
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
      className="relative w-[calc(100%+2rem)] -mx-4 sm:w-[calc(100%+4rem)] sm:-mx-8 h-48 sm:h-56 lg:h-64 mt-12 select-none overflow-hidden"
    >
      {/* Background depth tint matching page theme */}
      <div className="absolute inset-0 bg-background/60 pointer-events-none" />

      {/* Living 16-Bit Calm Pixel Ocean with Scattered Sunlight */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
      />

      {/* Subtle top edge gradient mask so the sea seamlessly merges into the page background */}
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background via-background/40 to-transparent pointer-events-none z-20" />
    </footer>
  )
}
