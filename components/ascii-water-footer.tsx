"use client"

import { useEffect, useRef, useState } from "react"

interface Ripple {
  x: number // Sea coordinates X
  y: number // Sea coordinates Z
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
  uniform vec4 u_ripples[MAX_RIPPLES];
  uniform int u_ripple_count;

  // 36.87 degree rotation matrix with 2.0 scale to eliminate grid alignment
  const mat2 m_rot = mat2(1.6, 1.2, -1.2, 1.6);

  // Alekseev Seascape Octave with domain warping
  float sea_octave(vec2 uv, float choppy) {
    vec2 uv_warp = uv + vec2(
      0.35 * sin(uv.y * 1.4 + uv.x * 0.7),
      0.35 * cos(uv.x * 1.4 - uv.y * 0.7)
    );
    vec2 wv = 1.0 - abs(sin(uv_warp));
    vec2 swv = abs(cos(uv_warp));
    wv = mix(wv, swv, wv);
    float prod = max(0.0001, wv.x * wv.y);
    return pow(max(0.0001, 1.0 - pow(prod, 0.65)), choppy);
  }

  // 5-Octave Ocean Surface Heightfield
  float sea_height(vec2 p, float time) {
    // Horizontally elongated for natural ocean swells
    vec2 uv = vec2(p.x * 0.42, p.y * 0.95);
    float freq = 2.6;
    float amp = 0.34;
    float choppy = 3.6;
    float h = 0.0;

    for (int i = 0; i < 5; i++) {
      vec2 t_vec = vec2(time * 0.60, time * 0.45);
      float d = sea_octave(uv * freq + t_vec, choppy);
      d += sea_octave(uv * freq - t_vec, choppy);
      h += d * amp;

      uv = (m_rot * uv) * 0.55;
      freq *= 1.85;
      amp *= 0.30;
      choppy = mix(choppy, 1.0, 0.18);
    }

    // Physical interactive ripples
    for (int i = 0; i < MAX_RIPPLES; i++) {
      if (i >= u_ripple_count) break;
      vec4 rip = u_ripples[i];
      float age = time - rip.z;
      if (age > 0.0 && age < 3.0) {
        vec2 dPos = p - rip.xy;
        float r = length(dPos);
        float wavefront = r - age * 3.2;
        float ripWave = sin(wavefront * 14.0) * exp(-abs(wavefront) * 2.8) * exp(-age * 1.2) * rip.w;
        h += ripWave * 0.18;
      }
    }

    // Continuous cursor wake
    if (u_mouse_active > 0.5) {
      vec2 dm = p - u_mouse;
      float mr = length(dm);
      if (mr < 1.6) {
        h += sin(mr * 12.0 - time * 4.0) * exp(-mr * 2.2) * 0.07;
      }
    }

    return h;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p_ndc = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

    float t = u_time * 0.85;

    // Cinematic downward camera angle (~55-60 degrees) looking onto ocean ripples
    vec3 cam_pos = vec3(0.0, 3.8, 2.5);
    vec3 forward = normalize(vec3(0.0, -0.72, -0.69));
    vec3 right = vec3(1.0, 0.0, 0.0);
    vec3 up = cross(right, forward);

    vec3 rd = normalize(p_ndc.x * right * 1.05 + p_ndc.y * up + forward);

    // Mean water plane intersection (y = 0)
    float d_plane = 40.0;
    if (rd.y < -0.01) {
      d_plane = -cam_pos.y / rd.y;
    }

    vec3 hit_pos = cam_pos + d_plane * rd;
    vec2 sea_pos = hit_pos.xz;

    // Ocean surface height
    float h = sea_height(sea_pos, t);

    // Surface normal via central differences
    float eps = 0.008;
    float hx = (sea_height(sea_pos + vec2(eps, 0.0), t) - sea_height(sea_pos - vec2(eps, 0.0), t)) / (2.0 * eps);
    float hz = (sea_height(sea_pos + vec2(0.0, eps), t) - sea_height(sea_pos - vec2(0.0, eps), t)) / (2.0 * eps);

    vec3 N = normalize(vec3(-hx, 1.0, -hz));
    vec3 V = -rd;

    // Golden hour sun positioned ahead near horizon
    vec3 sun_dir = normalize(vec3(0.06, 0.42, -0.90));

    // Specular reflection vector
    vec3 R = reflect(-V, N);
    float RdotL = max(0.0, dot(R, sun_dir));

    // Fresnel reflectance (Schlick's approximation)
    float fresnel = 0.02 + 0.98 * pow(max(0.0, 1.0 - max(0.0, dot(N, V))), 4.5);

    // Golden sun path track down the center of the water
    float sun_col = exp(-pow(sea_pos.x * 0.45, 2.0) * 0.45);

    // Specular components:
    // 1. Broad warm golden sheen
    float broad_sheen = pow(RdotL, 10.0) * (0.2 + 0.8 * sun_col);
    // 2. Sharp crest reflections
    float crest_glint = pow(RdotL, 45.0) * (0.3 + 0.7 * sun_col);
    // 3. Micro capillary diamond sparkles
    float micro_noise = sin(sea_pos.x * 32.0 + t * 4.0) * cos(sea_pos.y * 32.0 - t * 3.0);
    float sparkle_fac = step(0.2, micro_noise);
    float diamond_glint = pow(RdotL, 240.0) * (0.3 + 0.7 * sparkle_fac) * (0.35 + 0.65 * sun_col);

    // Color grading (Pinterest exact tones)
    float h_norm = clamp(h * 0.65 + 0.35, 0.0, 1.0);
    vec3 water_color;
    vec3 spec_color;

    if (u_is_dark > 0.5) {
      // Deep Nocturnal Atlantic Sea (Pinterest Pins 1, 2, 5)
      vec3 deep_trough = vec3(0.008, 0.032, 0.095); // Deep midnight navy
      vec3 mid_body    = vec3(0.020, 0.095, 0.245); // Deep sapphire
      vec3 crest_azure = vec3(0.048, 0.235, 0.505); // Luminous ocean azure

      vec3 base = mix(deep_trough, mid_body, h_norm);
      base = mix(base, crest_azure, pow(h_norm, 1.8));

      // Subsurface scattering on wave crests
      float sss = pow(max(0.0, dot(N, sun_dir)), 2.2) * pow(h_norm, 1.5);
      base += vec3(0.01, 0.16, 0.28) * sss;

      // Deep sky reflection via Fresnel
      vec3 sky = vec3(0.06, 0.20, 0.42);
      water_color = mix(base, sky, fresnel * 0.5);

      // Golden sunset specular highlights
      spec_color = broad_sheen * vec3(0.98, 0.70, 0.20) +
                   crest_glint * vec3(1.00, 0.90, 0.50) +
                   diamond_glint * vec3(1.00, 0.98, 0.95);
    } else {
      // Radiant Mediterranean Coastal Sea (Pinterest Pins 3, 4)
      vec3 deep_trough = vec3(0.016, 0.205, 0.425); // Deep royal blue
      vec3 mid_body    = vec3(0.032, 0.410, 0.685); // Vibrant azure
      vec3 crest_azure = vec3(0.165, 0.685, 0.905); // Luminous turquoise crest

      vec3 base = mix(deep_trough, mid_body, h_norm);
      base = mix(base, crest_azure, pow(h_norm, 1.8));

      // Subsurface scattering
      float sss = pow(max(0.0, dot(N, sun_dir)), 2.2) * pow(h_norm, 1.5);
      base += vec3(0.05, 0.28, 0.38) * sss;

      // Bright sky reflection
      vec3 sky = vec3(0.55, 0.80, 0.96);
      water_color = mix(base, sky, fresnel * 0.45);

      // Silver diamond & golden glints
      spec_color = broad_sheen * vec3(0.95, 0.85, 0.50) +
                   crest_glint * vec3(1.00, 0.96, 0.80) +
                   diamond_glint * vec3(1.00, 1.00, 1.00);
    }

    vec3 final_color = water_color + spec_color;

    // Atmospheric top edge fade into the page
    float topFade = smoothstep(1.0, 0.88, uv.y);

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

    // Interactive pointer state (mapped to 3D sea plane)
    const pointer = {
      seaX: 0.0,
      seaZ: 0.0,
      prevSeaX: -1000,
      prevSeaZ: -1000,
      active: false,
    }

    const ripples: Ripple[] = []
    const MAX_RIPPLES = 8

    const addRipple = (seaX: number, seaZ: number, strength = 0.8) => {
      const nowSec = performance.now() * 0.001
      if (ripples.length >= MAX_RIPPLES) ripples.shift()
      ripples.push({
        x: seaX,
        y: seaZ,
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

            // Convert canvas pixel position to 3D sea plane (x, z)
            const pixelToSea = (px: number, py: number) => {
              const ndcX = (px - 0.5 * width) / height
              const ndcY = (height - py - 0.5 * height) / height

              const camY = 3.8
              const camZ = 2.5
              const fwdY = -0.72
              const fwdZ = -0.69
              const upY = 0.69
              const upZ = -0.72

              const rdY = ndcY * upY + fwdY
              const rdZ = ndcY * upZ + fwdZ
              const rdX = ndcX * 1.05

              const d = Math.abs(rdY) > 0.01 ? -camY / rdY : 40.0
              return {
                x: d * rdX,
                z: camZ + d * rdZ,
              }
            }

            const handlePointerMove = (e: PointerEvent) => {
              const rect = canvas.getBoundingClientRect()
              const px = e.clientX - rect.left
              const py = e.clientY - rect.top
              const sea = pixelToSea(px, py)

              if (pointer.active) {
                const dx = sea.x - pointer.prevSeaX
                const dz = sea.z - pointer.prevSeaZ
                const dist = Math.hypot(dx, dz)
                if (dist > 0.35) {
                  addRipple(sea.x, sea.z, Math.min(dist * 0.8, 1.2))
                  pointer.prevSeaX = sea.x
                  pointer.prevSeaZ = sea.z
                }
              } else {
                pointer.active = true
                pointer.prevSeaX = sea.x
                pointer.prevSeaZ = sea.z
                addRipple(sea.x, sea.z, 0.7)
              }

              pointer.seaX = sea.x
              pointer.seaZ = sea.z
            }

            const handlePointerDown = (e: PointerEvent) => {
              const rect = canvas.getBoundingClientRect()
              const px = e.clientX - rect.left
              const py = e.clientY - rect.top
              const sea = pixelToSea(px, py)
              addRipple(sea.x, sea.z, 1.6)
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

              // Update active ripples buffer
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
              gl.uniform2f(uMouse, pointer.seaX, pointer.seaZ)
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

      // Base sea gradient
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

      // 6 Swell ribbons
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
      <div className="absolute inset-0 bg-background/60 pointer-events-none" />

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
