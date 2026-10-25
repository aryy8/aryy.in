"use client"

import { useEffect, useRef, useState } from "react"

interface Ripple {
  x: number
  y: number
  time: number
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
  uniform vec4 u_ripples[MAX_RIPPLES];
  uniform int u_ripple_count;

  // 2D Pseudo-Random Hash
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  // 2D Gradient Noise for seamless, organic water ripples
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // Rotation matrix: 36.87 degree irrational rotation to eliminate all grid patterns
  const mat2 m_shift = mat2(0.8, 0.6, -0.6, 0.8);

  // Calm Procedural Sea Heightfield (Based on Shadertoy multi-octave water physics)
  float sea_height(vec2 p, float time) {
    // Very gentle, calm ocean drift speed (peaceful and relaxing)
    float slow_time = time * 0.16;

    float freq = 2.6;
    float amp = 0.24;
    float h = 0.0;

    vec2 cur = vec2(p.x * 0.95, p.y * 1.35);

    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      vec2 drift = vec2(slow_time * (0.55 + fi * 0.18), -slow_time * (0.35 - fi * 0.12));
      h += noise(cur * freq + drift) * amp;

      cur = (m_shift * cur) * 1.15;
      freq *= 1.85;
      amp *= 0.50;
    }

    // Physical interactive ripples from mouse/touch
    for (int i = 0; i < MAX_RIPPLES; i++) {
      if (i >= u_ripple_count) break;
      vec4 rip = u_ripples[i];
      float age = time - rip.z;
      if (age > 0.0 && age < 3.5) {
        vec2 dPos = p - rip.xy;
        float r = length(dPos);
        float wavefront = r - age * 0.85;
        float ripWave = sin(wavefront * 14.0) * exp(-abs(wavefront) * 3.2) * exp(-age * 0.9) * rip.w;
        h += ripWave * 0.14;
      }
    }

    // Gentle cursor wake when hovering
    if (u_mouse_active > 0.5) {
      vec2 dm = p - u_mouse;
      float mr = length(dm);
      if (mr < 1.4) {
        h += sin(mr * 10.0 - time * 1.5) * exp(-mr * 2.5) * 0.05;
      }
    }

    return h;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    p.x *= 1.25;
    p.y *= 1.15;

    float t = u_time;

    // Ocean height
    float h = sea_height(p, t);

    // Surface normal via central differences
    float eps = 0.008;
    float hx = (sea_height(p + vec2(eps, 0.0), t) - sea_height(p - vec2(eps, 0.0), t)) / (2.0 * eps);
    float hy = (sea_height(p + vec2(0.0, eps), t) - sea_height(p - vec2(0.0, eps), t)) / (2.0 * eps);

    vec3 N = normalize(vec3(-hx, -hy, 1.0));
    vec3 V = normalize(vec3(p.x * 0.05, p.y * 0.08 - 0.12, 1.0));

    // Sun direction: warm golden sunset sun reflecting towards camera
    vec3 sun_dir = normalize(vec3(0.05, 0.40, 0.90));

    // Blinn-Phong Half Vector
    vec3 H = normalize(sun_dir + V);
    float NdotH = max(0.0, dot(N, H));
    float NdotV = max(0.001, dot(N, V));

    // Fresnel reflectance (dielectric water R0 = 0.02)
    float fresnel = 0.02 + 0.98 * pow(1.0 - NdotV, 4.0);

    // Golden sun reflection column down center
    float sun_col = exp(-pow(p.x * 0.45, 2.0) * 0.45);

    // Specular lighting tiers (calm, liquid sun glints)
    float sheen = pow(NdotH, 14.0) * (0.2 + 0.8 * sun_col);
    float crest_glint = pow(NdotH, 55.0) * (0.25 + 0.75 * sun_col);

    // Micro diamond sparkles
    float micro = noise(p * 16.0 + vec2(t * 0.8, -t * 0.6));
    float sparkle_active = step(0.10, micro);
    float diamond_glint = pow(NdotH, 220.0) * (0.35 + 0.65 * sparkle_active) * (0.3 + 0.7 * sun_col);

    // Height normalization
    float h_norm = clamp(h * 0.75 + 0.38, 0.0, 1.0);
    vec3 water_color;
    vec3 spec_color;

    if (u_is_dark > 0.5) {
      // Dark Mode: Deep Nocturnal Atlantic Sea (Pinterest Pins 1, 2, 5)
      // Midnight navy troughs -> Oceanic sapphire body -> Royal azure crests
      vec3 deep_trough = vec3(0.008, 0.047, 0.118); // Rich midnight navy
      vec3 mid_body    = vec3(0.024, 0.102, 0.267); // Oceanic sapphire depth
      vec3 crest_azure = vec3(0.063, 0.267, 0.541); // Radiant royal azure crests

      vec3 base = mix(deep_trough, mid_body, h_norm);
      base = mix(base, crest_azure, pow(h_norm, 1.8));

      // Subsurface scattering on wave crests
      float sss = pow(max(0.0, dot(N, sun_dir)), 2.0) * pow(h_norm, 1.5);
      base += vec3(0.015, 0.20, 0.35) * sss;

      // Deep sky reflection via Fresnel
      vec3 sky = vec3(0.047, 0.141, 0.306);
      water_color = mix(base, sky, fresnel * 0.5);

      // Golden sunset specular highlights (Pinterest golden hour sparkles)
      spec_color = sheen * vec3(0.98, 0.70, 0.20) * 1.1 +
                   crest_glint * vec3(1.00, 0.92, 0.55) * 1.5 +
                   diamond_glint * vec3(1.00, 0.98, 0.95) * 2.6;
    } else {
      // Light Mode: Radiant Mediterranean Coastal Sea (Pinterest Pins 3, 4)
      vec3 deep_trough = vec3(0.016, 0.205, 0.425); // Deep royal blue
      vec3 mid_body    = vec3(0.032, 0.410, 0.685); // Vibrant azure
      vec3 crest_azure = vec3(0.165, 0.685, 0.905); // Luminous turquoise crest

      vec3 base = mix(deep_trough, mid_body, h_norm);
      base = mix(base, crest_azure, pow(h_norm, 1.8));

      float sss = pow(max(0.0, dot(N, sun_dir)), 2.2) * pow(h_norm, 1.5);
      base += vec3(0.05, 0.28, 0.38) * sss;

      vec3 sky = vec3(0.55, 0.80, 0.96);
      water_color = mix(base, sky, fresnel * 0.45);

      // Silver & diamond sunlight sparkles
      spec_color = sheen * vec3(0.95, 0.85, 0.50) +
                   crest_glint * vec3(1.00, 0.96, 0.80) +
                   diamond_glint * vec3(1.00, 1.00, 1.00);
    }

    vec3 final_color = water_color + spec_color;

    // Soft atmospheric top edge fade into the page background
    float topFade = smoothstep(1.0, 0.84, uv.y);

    gl_FragColor = vec4(final_color, topFade);
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
      px: 0.0,
      py: 0.0,
      prevX: -1000,
      prevY: -1000,
      active: false,
    }

    const ripples: Ripple[] = []
    const MAX_RIPPLES = 8

    const addRipple = (rx: number, ry: number, strength = 0.8) => {
      const nowSec = performance.now() * 0.001
      if (ripples.length >= MAX_RIPPLES) ripples.shift()
      ripples.push({
        x: rx,
        y: ry,
        time: nowSec,
        strength,
      })
    }

    // Try WebGL
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
        gl = null
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

            const pixelToShaderP = (clientX: number, clientY: number) => {
              const rect = canvas.getBoundingClientRect()
              const cx = clientX - rect.left
              const cy = clientY - rect.top
              const px = ((cx - 0.5 * rect.width) / rect.height) * 1.25
              const py = ((rect.height - cy - 0.5 * rect.height) / rect.height) * 1.15
              return { x: px, y: py }
            }

            const handlePointerMove = (e: PointerEvent) => {
              const sp = pixelToShaderP(e.clientX, e.clientY)

              if (pointer.active) {
                const dx = sp.x - pointer.prevX
                const dy = sp.y - pointer.prevY
                const dist = Math.hypot(dx, dy)
                if (dist > 0.08) {
                  addRipple(sp.x, sp.y, Math.min(dist * 3.5, 1.2))
                  pointer.prevX = sp.x
                  pointer.prevY = sp.y
                }
              } else {
                pointer.active = true
                pointer.prevX = sp.x
                pointer.prevY = sp.y
                addRipple(sp.x, sp.y, 0.7)
              }

              pointer.px = sp.x
              pointer.py = sp.y
            }

            const handlePointerDown = (e: PointerEvent) => {
              const sp = pixelToShaderP(e.clientX, e.clientY)
              addRipple(sp.x, sp.y, 1.5)
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

              const validRipples = ripples.filter((r) => nowSec - r.time < 3.5)
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
              gl.uniform2f(uMouse, pointer.px, pointer.py)
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

    // --- Case 2: Procedural 2D Fallback ---
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

      const bgGrad = ctx.createLinearGradient(0, 0, 0, height)
      if (isDark) {
        bgGrad.addColorStop(0, "rgba(2, 8, 24, 0)")
        bgGrad.addColorStop(0.3, "rgba(4, 18, 48, 0.95)")
        bgGrad.addColorStop(1, "rgba(2, 10, 28, 1)")
      } else {
        bgGrad.addColorStop(0, "rgba(255, 255, 255, 0)")
        bgGrad.addColorStop(0.3, "rgba(7, 89, 133, 0.9)")
        bgGrad.addColorStop(1, "rgba(3, 105, 161, 1)")
      }
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      const waveLayers = 6
      for (let layer = 0; layer < waveLayers; layer++) {
        const layerRatio = layer / (waveLayers - 1)
        const baseY = height * (0.2 + layerRatio * 0.75)
        const amp = 6 + layerRatio * 14
        const freq = 0.008 - layerRatio * 0.003
        const speed = 0.25 + layerRatio * 0.10 // Calm peaceful speed

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
      className="relative w-[calc(100%+2rem)] -mx-4 sm:w-[calc(100%+4rem)] sm:-mx-8 h-48 sm:h-56 lg:h-64 mt-12 select-none overflow-hidden"
    >
      {/* Background depth tint matching page theme */}
      <div className="absolute inset-0 bg-background/60 pointer-events-none" />

      {/* Living Generative Ocean Sea Surface Canvas (WebGL with 2D Canvas Fallback) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
      />

      {/* Subtle top edge gradient mask so the sea seamlessly merges into the page background */}
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background via-background/40 to-transparent pointer-events-none z-20" />
    </footer>
  )
}
