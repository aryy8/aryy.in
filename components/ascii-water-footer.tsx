"use client"

import { useEffect, useRef, useState } from "react"

interface Ripple {
  x: number // Normalized 0..1
  y: number // Normalized 0..1
  time: number // Time in seconds
  strength: number
}

const VERT_SHADER_SRC = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAG_SHADER_SRC = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_mouse_active;
  uniform float u_is_dark;

  #define MAX_RIPPLES 8
  uniform vec4 u_ripples[MAX_RIPPLES]; // x, y, time, strength
  uniform int u_ripple_count;

  // Pseudo-random hash for micro-capillary glitter
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // Directional Trochoidal Wave Octave with analytic gradient
  float waveOctave(vec2 p, vec2 dir, float freq, float speed, float amp, float sharpness, float time, inout vec2 grad) {
    float phase = dot(p, dir) * freq + time * speed;
    float s = sin(phase);
    float c = cos(phase);

    // Sharp crest profile (Gerstner / Trochoid wave approximation)
    float w = 1.0 - abs(s);
    w = pow(max(0.0001, w), sharpness);

    // Exact derivative for crisp surface normal
    float dw = -sharpness * pow(max(0.001, 1.0 - abs(s)), max(0.01, sharpness - 1.0)) * sign(s) * c * freq;
    grad += dir * dw * amp;

    return w * amp;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Oblique 3D perspective projection looking out across the sea surface:
    // uv.y = 0 is foreground (bottom); uv.y = 1 is horizon distance (top)
    float dist = 1.0 / max(0.06, 1.18 - uv.y);
    vec2 seaPos = vec2((uv.x - 0.5) * dist * 1.85, dist * 2.3);

    float t = u_time * 0.95;
    vec2 grad = vec2(0.0);
    float h = 0.0;

    // 1. Natural Ocean Wave Swells (Directional multi-octave spectrum)
    // Main oceanic groundswell rolling forward
    h += waveOctave(seaPos, normalize(vec2(0.22, 0.97)), 1.35, 0.90, 0.44, 1.85, t, grad);
    // Cross-swell creating diamond wave facets
    h += waveOctave(seaPos, normalize(vec2(-0.42, 0.91)), 2.15, 1.12, 0.28, 2.0, t * 1.08, grad);
    // Wind chop
    h += waveOctave(seaPos, normalize(vec2(0.68, 0.73)), 4.1, 1.48, 0.16, 2.2, t * 1.25, grad);
    // Secondary chop
    h += waveOctave(seaPos, normalize(vec2(-0.72, 0.69)), 7.5, 2.15, 0.085, 2.2, t * 1.45, grad);
    // Capillary wavelets (fine surface ripples catching light)
    h += waveOctave(seaPos, normalize(vec2(0.88, 0.47)), 14.5, 3.25, 0.042, 2.5, t * 1.72, grad);
    h += waveOctave(seaPos, normalize(vec2(-0.85, 0.52)), 27.0, 4.90, 0.022, 2.5, t * 1.98, grad);

    // 2. Interactive Water Ripples from user mouse / touch
    for (int i = 0; i < MAX_RIPPLES; i++) {
      if (i >= u_ripple_count) break;
      vec4 rip = u_ripples[i];
      float ripDist = 1.0 / max(0.06, 1.18 - rip.y);
      vec2 ripPos = vec2((rip.x - 0.5) * ripDist * 1.85, ripDist * 2.3);

      float age = u_time - rip.z;
      if (age > 0.0 && age < 3.0) {
        vec2 dPos = seaPos - ripPos;
        float r = length(dPos);
        float waveSpeed = 2.4;
        float wavefront = r - age * waveSpeed;

        // Expanding ring wave
        float waveProfile = sin(wavefront * 16.0) * exp(-abs(wavefront) * 3.5) * exp(-age * 1.2) * rip.w;
        h += waveProfile * 0.15;

        if (r > 0.001) {
          vec2 rDir = dPos / r;
          grad += rDir * cos(wavefront * 16.0) * 16.0 * exp(-abs(wavefront) * 3.5) * exp(-age * 1.2) * rip.w * 0.15;
        }
      }
    }

    // 3. Continuous cursor wake if pointer is active
    if (u_mouse_active > 0.5) {
      float mDist = 1.0 / max(0.06, 1.18 - u_mouse.y);
      vec2 mPos = vec2((u_mouse.x - 0.5) * mDist * 1.85, mDist * 2.3);
      vec2 dm = seaPos - mPos;
      float mr = length(dm);
      if (mr < 1.4) {
        float mWave = sin(mr * 12.0 - t * 4.0) * exp(-mr * 2.2) * 0.08;
        h += mWave;
        if (mr > 0.01) {
          grad += (dm / mr) * cos(mr * 12.0 - t * 4.0) * 12.0 * exp(-mr * 2.2) * 0.08;
        }
      }
    }

    // 4. Micro-capillary glitter noise (for diamond glints)
    float micro = hash(floor(seaPos * 38.0) + floor(u_time * 7.0));

    // 5. Surface Normal calculation
    vec3 N = normalize(vec3(-grad.x * 1.35, 1.0, -grad.y * 1.35));
    if (micro > 0.82) {
      N = normalize(N + vec3((micro - 0.9) * 0.4, 0.0, (micro - 0.85) * 0.4));
    }

    // 6. Camera View Vector and Sun Vector
    vec3 V = normalize(vec3((uv.x - 0.5) * 0.55, 0.82, 1.0));
    vec3 R = reflect(-V, N);

    // Golden hour sun positioned in the center-top horizon (matching the Pinterest photos)
    vec3 sunDir = normalize(vec3(0.05, 0.36, 0.93));
    float RdotL = max(0.0, dot(R, sunDir));

    // Specular lighting tiers:
    // A. Broad golden sheen across the ocean sun track
    float broadSheen = pow(RdotL, 12.0);
    // B. Sharp golden wave crest reflections
    float crestGlint = pow(RdotL, 75.0);
    // C. Dazzling diamond sun glints (sparkling micro-facets)
    float diamondSparkle = pow(RdotL, 320.0) * (0.4 + 1.4 * micro);

    // Golden hour / Sun reflection colors
    vec3 sunAmber  = vec3(1.0, 0.76, 0.32); // Warm amber
    vec3 sunBright = vec3(1.0, 0.92, 0.68); // Brilliant gold
    vec3 sunWhite  = vec3(1.0, 1.0, 1.0);   // Diamond core

    vec3 specular = broadSheen * sunAmber * 0.4 + crestGlint * sunBright * 1.35 + diamondSparkle * sunWhite * 2.9;

    // 7. Ocean Color Palette (Dark Mode vs Light Mode)
    vec3 deepWater;
    vec3 midWater;
    vec3 crestWater;
    vec3 skyReflect;

    if (u_is_dark > 0.5) {
      // Nocturnal / Deep Atlantic midnight sea
      deepWater  = vec3(0.010, 0.040, 0.115); // Deep indigo trough
      midWater   = vec3(0.032, 0.145, 0.330); // Sapphire slope
      crestWater = vec3(0.055, 0.310, 0.560); // Azure crest
      skyReflect = vec3(0.038, 0.110, 0.230);
    } else {
      // Mediterranean bright sapphire & cerulean sea
      deepWater  = vec3(0.018, 0.165, 0.390); // Deep Mediterranean sapphire
      midWater   = vec3(0.038, 0.340, 0.650); // Luminous ocean blue
      crestWater = vec3(0.110, 0.590, 0.860); // Radiant turquoise crest
      skyReflect = vec3(0.320, 0.650, 0.940);
    }

    // Fresnel reflection factor
    float fresnel = 0.03 + 0.97 * pow(1.0 - max(0.0, dot(N, V)), 4.5);

    // Wave height normalization (0..1)
    float hNorm = clamp(h * 0.78 + 0.42, 0.0, 1.0);
    vec3 waterColor = mix(deepWater, midWater, hNorm);
    waterColor = mix(waterColor, crestWater, pow(hNorm, 2.0));

    // Subsurface scattering (translucent turquoise glow on wave peaks facing sun)
    float sss = pow(max(0.0, dot(N, sunDir)), 2.6) * hNorm;
    vec3 sssColor = (u_is_dark > 0.5 ? vec3(0.04, 0.36, 0.54) : vec3(0.09, 0.68, 0.85)) * sss * 0.80;

    // Final composite color
    vec3 color = mix(waterColor, skyReflect, fresnel * 0.42) + sssColor + specular;

    // Smooth atmospheric horizon fade at top edge so it blends into the page
    float topFade = smoothstep(1.0, 0.88, uv.y);

    gl_FragColor = vec4(color, topFade);
  }
`

export function AsciiWaterFooter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    let animId = 0
    let width = container.clientWidth
    let height = container.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Interactive pointer state
    const pointer = {
      x: 0.5,
      y: 0.5,
      prevX: -1000,
      prevY: -1000,
      active: false,
    }

    const ripples: Ripple[] = []
    const MAX_RIPPLES = 8

    const addRipple = (normX: number, normY: number, strength = 0.8) => {
      const nowSec = performance.now() * 0.001
      if (ripples.length >= MAX_RIPPLES) ripples.shift()
      ripples.push({
        x: normX,
        y: normY,
        time: nowSec,
        strength,
      })
    }

    // Try WebGL first
    let gl: WebGLRenderingContext | null = null
    try {
      gl =
        (canvas.getContext("webgl", {
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }) as WebGLRenderingContext | null) ||
        (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null)
    } catch {
      gl = null
    }

    // --- Case 1: WebGL Ocean Shader ---
    if (gl) {
      const createShader = (type: number, src: string) => {
        if (!gl) return null
        const shader = gl.createShader(type)
        if (!shader) return null
        gl.shaderSource(shader, src)
        gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.warn("Shader compile error:", gl.getShaderInfoLog(shader))
          gl.deleteShader(shader)
          return null
        }
        return shader
      }

      const vs = createShader(gl.VERTEX_SHADER, VERT_SHADER_SRC)
      const fs = createShader(gl.FRAGMENT_SHADER, FRAG_SHADER_SRC)

      if (!vs || !fs) {
        gl = null // Trigger fallback
      } else {
        const program = gl.createProgram()
        if (!program) {
          gl = null
        } else {
          gl.attachShader(program, vs)
          gl.attachShader(program, fs)
          gl.linkProgram(program)

          if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.warn("Program link error:", gl.getProgramInfoLog(program))
            gl = null
          } else {
            gl.useProgram(program)

            // Setup full-screen quad (2 triangles)
            const posBuffer = gl.createBuffer()
            gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
            gl.bufferData(
              gl.ARRAY_BUFFER,
              new Float32Array([
                -1, -1,
                 1, -1,
                -1,  1,
                -1,  1,
                 1, -1,
                 1,  1,
              ]),
              gl.STATIC_DRAW
            )

            const aPos = gl.getAttribLocation(program, "a_position")
            gl.enableVertexAttribArray(aPos)
            gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

            const uRes = gl.getUniformLocation(program, "u_resolution")
            const uTime = gl.getUniformLocation(program, "u_time")
            const uMouse = gl.getUniformLocation(program, "u_mouse")
            const uMouseActive = gl.getUniformLocation(program, "u_mouse_active")
            const uIsDark = gl.getUniformLocation(program, "u_is_dark")
            const uRipples = gl.getUniformLocation(program, "u_ripples")
            const uRippleCount = gl.getUniformLocation(program, "u_ripple_count")

            const ripplesBuffer = new Float32Array(MAX_RIPPLES * 4)

            const updateSize = () => {
              if (!container || !canvas || !gl) return
              width = container.clientWidth
              height = container.clientHeight
              canvas.width = Math.round(width * dpr)
              canvas.height = Math.round(height * dpr)
              canvas.style.width = `${width}px`
              canvas.style.height = `${height}px`
              gl.viewport(0, 0, canvas.width, canvas.height)
            }

            updateSize()

            const resizeObserver = new ResizeObserver(() => updateSize())
            resizeObserver.observe(container)

            const handlePointerMove = (e: PointerEvent) => {
              const rect = canvas.getBoundingClientRect()
              const px = e.clientX - rect.left
              const py = e.clientY - rect.top
              const normX = Math.max(0, Math.min(1, px / rect.width))
              // In WebGL, y=0 is bottom, y=1 is top
              const normY = Math.max(0, Math.min(1, 1.0 - py / rect.height))

              if (pointer.active) {
                const dx = px - pointer.prevX
                const dy = py - pointer.prevY
                const dist = Math.hypot(dx, dy)
                if (dist > 14) {
                  addRipple(normX, normY, Math.min(dist * 0.04, 1.0))
                  pointer.prevX = px
                  pointer.prevY = py
                }
              } else {
                pointer.active = true
                pointer.prevX = px
                pointer.prevY = py
                addRipple(normX, normY, 0.6)
              }

              pointer.x = normX
              pointer.y = normY
            }

            const handlePointerDown = (e: PointerEvent) => {
              const rect = canvas.getBoundingClientRect()
              const normX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
              const normY = Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / rect.height))
              addRipple(normX, normY, 1.5)
            }

            const handlePointerLeave = () => {
              pointer.active = false
            }

            canvas.addEventListener("pointermove", handlePointerMove)
            canvas.addEventListener("pointerdown", handlePointerDown)
            canvas.addEventListener("pointerleave", handlePointerLeave)

            let isVisible = true
            const visibilityObserver = new IntersectionObserver(
              ([entry]) => {
                isVisible = entry.isIntersecting
              },
              { threshold: 0.01 }
            )
            visibilityObserver.observe(container)

            const startTime = performance.now()

            const render = () => {
              animId = requestAnimationFrame(render)
              if (!isVisible || !gl) return

              const nowSec = (performance.now() - startTime) * 0.001
              const isDark = document.documentElement.classList.contains("dark") ? 1.0 : 0.0

              // Update ripples buffer
              const validRipples = ripples.filter((r) => nowSec - r.time < 3.0)
              ripplesBuffer.fill(0)
              for (let i = 0; i < validRipples.length && i < MAX_RIPPLES; i++) {
                const r = validRipples[i]
                const offset = i * 4
                ripplesBuffer[offset] = r.x
                ripplesBuffer[offset + 1] = r.y
                ripplesBuffer[offset + 2] = r.time
                ripplesBuffer[offset + 3] = r.strength
              }

              gl.useProgram(program)
              gl.uniform2f(uRes, canvas.width, canvas.height)
              gl.uniform1f(uTime, nowSec)
              gl.uniform2f(uMouse, pointer.x, pointer.y)
              gl.uniform1f(uMouseActive, pointer.active ? 1.0 : 0.0)
              gl.uniform1f(uIsDark, isDark)
              gl.uniform4fv(uRipples, ripplesBuffer)
              gl.uniform1i(uRippleCount, validRipples.length)

              gl.drawArrays(gl.TRIANGLES, 0, 6)
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
          }
        }
      }
    }

    // --- Case 2: Procedural 2D Canvas Fallback (if WebGL is unavailable) ---
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateSize2D = () => {
      width = container.clientWidth
      height = container.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    updateSize2D()
    const resizeObserver2D = new ResizeObserver(() => updateSize2D())
    resizeObserver2D.observe(container)

    let isVisible = true
    const visibilityObserver2D = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.01 }
    )
    visibilityObserver2D.observe(container)

    const startTime2D = performance.now()

    const render2D = () => {
      animId = requestAnimationFrame(render2D)
      if (!isVisible) return

      const t = (performance.now() - startTime2D) * 0.001
      const isDark = document.documentElement.classList.contains("dark")

      ctx.clearRect(0, 0, width, height)

      // Base sea gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height)
      if (isDark) {
        bgGrad.addColorStop(0, "rgba(2, 6, 23, 0)")
        bgGrad.addColorStop(0.3, "rgba(3, 16, 42, 0.95)")
        bgGrad.addColorStop(1, "rgba(2, 10, 24, 1)")
      } else {
        bgGrad.addColorStop(0, "rgba(255, 255, 255, 0)")
        bgGrad.addColorStop(0.3, "rgba(7, 89, 133, 0.9)")
        bgGrad.addColorStop(1, "rgba(3, 105, 161, 1)")
      }
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // 5 Harmonic wave ribbons
      const waveLayers = 6
      for (let layer = 0; layer < waveLayers; layer++) {
        const layerRatio = layer / (waveLayers - 1)
        const baseY = height * (0.2 + layerRatio * 0.75)
        const amp = 6 + layerRatio * 14
        const freq = 0.008 - layerRatio * 0.003
        const speed = 1.2 + layerRatio * 0.6

        ctx.beginPath()
        ctx.moveTo(0, height)
        for (let x = 0; x <= width; x += 8) {
          const y =
            baseY +
            Math.sin(x * freq + t * speed) * amp +
            Math.sin(x * freq * 2.1 - t * speed * 1.3) * (amp * 0.35)
          ctx.lineTo(x, y)
        }
        ctx.lineTo(width, height)
        ctx.closePath()

        ctx.fillStyle = isDark
          ? `rgba(14, 116, 185, ${0.12 + layerRatio * 0.18})`
          : `rgba(56, 189, 248, ${0.15 + layerRatio * 0.22})`
        ctx.fill()

        // Golden sunlight glint along wave crest
        ctx.strokeStyle = isDark
          ? `rgba(253, 224, 71, ${0.25 + layerRatio * 0.35})`
          : `rgba(255, 255, 255, ${0.4 + layerRatio * 0.4})`
        ctx.lineWidth = 1.2
        ctx.stroke()
      }
    }

    render2D()

    return () => {
      cancelAnimationFrame(animId)
      resizeObserver2D.disconnect()
      visibilityObserver2D.disconnect()
    }
  }, [])

  return (
    <footer
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-[calc(100%+2rem)] -mx-4 sm:w-[calc(100%+4rem)] sm:-mx-8 h-48 sm:h-56 lg:h-64 mt-12 border-t-[1.5px] border-dashed border-foreground/25 select-none overflow-hidden"
    >
      {/* Background depth tint matching page theme */}
      <div className="absolute inset-0 bg-background/50 pointer-events-none" />

      {/* Living Generative Ocean Sea Surface Canvas (WebGL with 2D Canvas Fallback) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
      />

      {/* Subtle top edge gradient mask so the sea seamlessly merges above the dashed border */}
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background via-background/40 to-transparent pointer-events-none z-20" />
    </footer>
  )
}
