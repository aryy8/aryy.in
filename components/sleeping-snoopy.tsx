"use client"

import { useState, useEffect, useRef } from "react"

interface TrailDot {
  id: number
  x: number
  y: number
  angle: number
  createdAt: number
}

// 120 equidistant arc-length sampled points forming an expansive, soaring flight loop
// in the spacious open sky to the right of Snoopy (X: 130 to 463, Y: -271 to -49)
const FLIGHT_TOTAL_LEN = 984.7
const FLIGHT_PTS: [number, number][] = [
  [130.0, -50.0], [135.1, -56.4], [140.8, -62.3], [146.7, -68.1], [152.5, -73.8], [158.5, -79.5],
  [164.4, -85.1], [170.3, -90.8], [176.2, -96.5], [182.1, -102.2], [188.0, -108.0], [193.8, -113.8],
  [199.5, -119.7], [205.2, -125.6], [210.8, -131.5], [216.4, -137.5], [222.1, -143.5], [227.7, -149.4],
  [233.4, -155.3], [239.1, -161.2], [244.9, -167.1], [250.7, -172.9], [256.5, -178.6], [262.5, -184.3],
  [268.5, -189.9], [274.6, -195.4], [280.8, -200.7], [287.1, -206.0], [293.3, -211.3], [299.6, -216.7],
  [305.8, -222.0], [312.1, -227.2], [318.5, -232.4], [324.9, -237.6], [331.4, -242.6], [338.0, -247.5],
  [344.7, -252.2], [351.5, -256.7], [358.5, -261.0], [365.8, -264.8], [373.4, -268.0], [381.2, -270.3],
  [389.4, -271.3], [397.6, -271.1], [405.6, -269.8], [413.5, -267.4], [421.0, -264.2], [428.2, -260.1],
  [434.9, -255.4], [441.1, -250.1], [446.7, -244.1], [451.7, -237.6], [455.5, -230.3], [458.3, -222.6],
  [460.5, -214.7], [462.0, -206.6], [462.9, -198.5], [463.3, -190.3], [463.2, -182.1], [462.6, -173.9],
  [461.3, -165.8], [459.4, -157.8], [456.7, -150.1], [453.3, -142.6], [449.4, -135.4], [445.1, -128.4],
  [440.4, -121.6], [435.4, -115.1], [430.1, -108.9], [424.5, -102.9], [418.6, -97.2], [412.4, -91.9],
  [405.8, -86.9], [399.0, -82.4], [391.9, -78.2], [384.7, -74.4], [377.3, -70.8], [369.7, -67.6],
  [362.0, -64.8], [354.1, -62.4], [346.1, -60.6], [338.0, -59.6], [329.8, -60.0], [322.2, -62.9],
  [315.9, -68.2], [310.9, -74.6], [306.6, -81.6], [302.7, -88.8], [298.8, -96.1], [294.7, -103.2],
  [290.1, -109.9], [285.2, -116.5], [280.7, -123.4], [276.3, -130.4], [272.0, -137.3], [267.4, -144.1],
  [262.4, -150.6], [256.5, -156.3], [249.3, -160.2], [241.2, -161.3], [233.1, -160.3], [225.3, -157.9],
  [217.9, -154.3], [211.0, -149.9], [204.6, -144.7], [199.0, -138.8], [194.6, -131.9], [191.1, -124.4],
  [188.2, -116.7], [185.6, -108.9], [183.1, -101.1], [180.6, -93.3], [177.9, -85.6], [174.7, -78.0],
  [170.7, -70.9], [165.1, -64.9], [158.7, -59.8], [151.7, -55.5], [144.3, -51.9], [136.6, -49.0],
]

export function SleepingSnoopy() {
  const [isSitting, setIsSitting] = useState(false)
  const [isLanded, setIsLanded] = useState(false)
  const [dots, setDots] = useState<TrailDot[]>([])

  const woodstockRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number>(0)

  // Flight state refs
  const posRef = useRef({ x: FLIGHT_PTS[0][0], y: FLIGHT_PTS[0][1] })
  const velRef = useRef({ x: 1, y: 0 })
  const angleRef = useRef(0)
  const scaleXRef = useRef(1)
  const lastDotPosRef = useRef({ x: FLIGHT_PTS[0][0], y: FLIGHT_PTS[0][1] })
  const dotIdRef = useRef(0)
  const distProgressRef = useRef(0)

  // Landing / takeoff transition refs
  const landingRef = useRef<{
    p0: { x: number; y: number }
    p1: { x: number; y: number }
    p2: { x: number; y: number }
    p3: { x: number; y: number }
    startTime: number
    duration: number
  } | null>(null)

  const takeoffRef = useRef<{
    startX: number
    startY: number
    startTime: number
    duration: number
  } | null>(null)

  const isSittingRef = useRef(isSitting)
  useEffect(() => {
    isSittingRef.current = isSitting
  }, [isSitting])

  // Trigger landing or takeoff
  useEffect(() => {
    const now = performance.now()
    const landingTarget = { x: 58, y: -10 } // Snoopy's back

    if (isSitting) {
      setIsLanded(false)
      const curr = posRef.current
      const v = velRef.current

      // Unhurried, graceful 2.6s swoop to Snoopy
      landingRef.current = {
        p0: { x: curr.x, y: curr.y },
        p1: { x: curr.x + v.x * 0.35, y: curr.y + v.y * 0.35 - 35 },
        p2: { x: landingTarget.x + 35, y: landingTarget.y - 50 },
        p3: { x: landingTarget.x, y: landingTarget.y },
        startTime: now,
        duration: 2600, // 2.6s for calm, gentle return
      }
      takeoffRef.current = null
    } else {
      setIsLanded(false)
      takeoffRef.current = {
        startX: posRef.current.x,
        startY: posRef.current.y,
        startTime: now,
        duration: 1400, // 1.4s to take off smoothly into the sky
      }
      landingRef.current = null
    }
  }, [isSitting])

  // 60 FPS Gliding flight & discrete trail loop
  useEffect(() => {
    let lastTimestamp = performance.now()
    let lastDotSpawnTime = 0
    const landingTarget = { x: 58, y: -10 }

    const loop = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.05)
      lastTimestamp = timestamp
      const nowMs = Date.now()

      let currX = posRef.current.x
      let currY = posRef.current.y
      let targetAngle = angleRef.current
      let targetScaleX = scaleXRef.current

      if (isSittingRef.current) {
        // LANDING MODE (Unhurried, peaceful 2.6s glide)
        if (landingRef.current) {
          const elapsed = timestamp - landingRef.current.startTime
          const duration = landingRef.current.duration
          const rawP = Math.min(elapsed / duration, 1.0)

          // Smooth easeInOut: starts gently, glides across, settles softly
          const p =
            rawP < 0.5
              ? 2 * rawP * rawP
              : 1 - Math.pow(-2 * rawP + 2, 2) / 2

          const u = 1 - p
          const { p0, p1, p2, p3 } = landingRef.current
          currX =
            u * u * u * p0.x +
            3 * u * u * p * p1.x +
            3 * u * p * p * p2.x +
            p * p * p * p3.x
          currY =
            u * u * u * p0.y +
            3 * u * u * p * p1.y +
            3 * u * p * p * p2.y +
            p * p * p * p3.y

          // Orientation facing towards Snoopy
          const dx = p3.x - currX
          const dy = p3.y - currY
          targetScaleX = dx > 0 ? -1 : 1
          targetAngle = (dy / (Math.abs(dx) + 10)) * 20 * (1 - p) // Wings level out as he lands

          if (rawP >= 1.0) {
            currX = landingTarget.x
            currY = landingTarget.y
            targetAngle = 0
            targetScaleX = 1
            landingRef.current = null
            setIsLanded(true)
          }
        } else {
          // Resting comfortably on Snoopy
          currX = landingTarget.x
          currY = landingTarget.y
          targetAngle = 0
          targetScaleX = 1
        }
      } else {
        // FREE GLIDING FLIGHT MODE across expansive sky
        if (takeoffRef.current) {
          const elapsed = timestamp - takeoffRef.current.startTime
          const duration = takeoffRef.current.duration
          const p = Math.min(elapsed / duration, 1.0)
          const ease = p * p * (3 - 2 * p)

          const targetX = FLIGHT_PTS[0][0]
          const targetY = FLIGHT_PTS[0][1]
          currX = (1 - ease) * takeoffRef.current.startX + ease * targetX
          currY = (1 - ease) * takeoffRef.current.startY + ease * targetY
          targetScaleX = -1 // Faces right as he climbs into the sky
          targetAngle = -20 * (1 - p)

          if (p >= 1.0) {
            takeoffRef.current = null
            distProgressRef.current = 0
          }
        } else {
          // Smooth continuous progression along equidistant flight path
          const flightSpeed = 82 // 82 pixels per second: steady, unhurried, graceful gliding
          distProgressRef.current = (distProgressRef.current + dt * flightSpeed) % FLIGHT_TOTAL_LEN

          const numPts = FLIGHT_PTS.length
          const indexFloat = (distProgressRef.current / FLIGHT_TOTAL_LEN) * numPts
          const i0 = Math.floor(indexFloat) % numPts
          const i1 = (i0 + 1) % numPts
          const frac = indexFloat - Math.floor(indexFloat)

          currX = FLIGHT_PTS[i0][0] + (FLIGHT_PTS[i1][0] - FLIGHT_PTS[i0][0]) * frac
          currY = FLIGHT_PTS[i0][1] + (FLIGHT_PTS[i1][1] - FLIGHT_PTS[i0][1]) * frac

          // Heading direction directly from the path derivative
          const vx = FLIGHT_PTS[i1][0] - FLIGHT_PTS[i0][0]
          const vy = FLIGHT_PTS[i1][1] - FLIGHT_PTS[i0][1]
          velRef.current = { x: vx, y: vy }

          targetScaleX = vx > 0 ? -1 : 1
          const rawAngle = Math.atan2(vy, Math.abs(vx)) * (180 / Math.PI)
          targetAngle = Math.max(-30, Math.min(30, rawAngle))
        }
      }

      // Smooth exponential damping on rotation and flip (gliding, no snapping or hopping!)
      angleRef.current += (targetAngle - angleRef.current) * 0.08
      scaleXRef.current += (targetScaleX - scaleXRef.current) * 0.12

      posRef.current = { x: currX, y: currY }

      // Update Woodstock's transform directly at 60 FPS
      if (woodstockRef.current) {
        woodstockRef.current.style.transform = `translate3d(${currX}px, ${currY}px, 0) scaleX(${scaleXRef.current}) rotate(${angleRef.current}deg)`
      }

      // Spawn discrete Peanuts-style elliptical trail dots at steady distance intervals
      const distFromLastDot = Math.hypot(currX - lastDotPosRef.current.x, currY - lastDotPosRef.current.y)

      if (!isLanded && distFromLastDot >= 22 && nowMs - lastDotSpawnTime > 80) {
        lastDotSpawnTime = nowMs
        lastDotPosRef.current = { x: currX, y: currY }
        const dotAngle = angleRef.current * (scaleXRef.current < 0 ? -1 : 1)

        setDots((prev) => {
          const fresh = [
            ...prev.filter((d) => nowMs - d.createdAt < 4500),
            {
              id: dotIdRef.current++,
              x: currX + (scaleXRef.current < 0 ? -8 : 8),
              y: currY + 4,
              angle: dotAngle,
              createdAt: nowMs,
            },
          ]
          return fresh.slice(-45) // Keep last 45 dots
        })
      }

      animFrameRef.current = requestAnimationFrame(loop)
    }

    animFrameRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [isLanded])

  // Periodic cleanup of expired dots
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setDots((prev) => prev.filter((d) => now - d.createdAt < 4500))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSitting((prev) => !prev)
  }

  return (
    <div
      className="relative w-[100px] sm:w-[120px] select-none cursor-pointer group"
      aria-label="Sleeping Snoopy and Woodstock"
      onClick={handleToggle}
      title={
        isSitting
          ? "Click Snoopy: Woodstock flies freely! 🐥"
          : "Click Snoopy: Woodstock comes and sits on him! 🐥"
      }
    >
      {/* Discrete Peanuts Hand-Drawn Dotted Flight Trail */}
      <svg
        className="absolute inset-0 pointer-events-none overflow-visible w-full h-full text-foreground/75 dark:text-foreground/85"
        style={{ zIndex: 15 }}
      >
        {dots.map((dot) => {
          const age = Date.now() - dot.createdAt
          const opacity = Math.max(0, 1 - age / 4500) * 0.85
          return (
            <ellipse
              key={dot.id}
              cx={dot.x}
              cy={dot.y}
              rx={3.8}
              ry={1.8}
              transform={`rotate(${dot.angle} ${dot.x} ${dot.y})`}
              fill="currentColor"
              opacity={opacity}
              className="transition-opacity duration-300"
            />
          )
        })}
      </svg>

      {/* Free Soaring Woodstock Bird */}
      <div
        ref={woodstockRef}
        className="absolute top-0 left-0 z-20 pointer-events-auto cursor-pointer"
        style={{
          width: isLanded ? "24px" : "28px",
          willChange: "transform",
        }}
        onClick={handleToggle}
        title={
          isSitting
            ? "Woodstock is resting with Snoopy. Click to let him fly!"
            : "Click to call Woodstock to Snoopy!"
        }
      >
        <div>
          <img
            src={isLanded ? "/woodstock-sitting.png" : "/woodstock-flying.png"}
            alt={isLanded ? "Woodstock sitting on Snoopy" : "Woodstock flying"}
            className="block w-full h-auto drop-shadow-sm select-none pointer-events-none transition-all duration-300"
            draggable={false}
          />
          {/* Animated chirp note when sitting on Snoopy */}
          {isLanded && (
            <span
              className="absolute -top-3 right-0 text-[10px] font-bold text-amber-500 select-none pointer-events-none"
              style={{ animation: "woodstockChirp 2.2s ease-out infinite" }}
            >
              ♪
            </span>
          )}
        </div>
      </div>

      {/* Snoopy Sleeping on Card Surface */}
      <img
        src="/sleeping-snoopy.png"
        alt="Sleeping Snoopy"
        className="block w-full h-auto select-none pointer-events-none transition-transform duration-300 group-hover:scale-[1.01]"
        draggable={false}
      />

      {/* Animated Zzz from Snoopy */}
      <div className="absolute -top-1 left-[40%] pointer-events-none select-none font-serif italic">
        <span
          className="absolute text-[10px] font-bold text-foreground/50"
          style={{ animation: "snoopyZzz 2.8s ease-in-out infinite" }}
        >
          z
        </span>
        <span
          className="absolute -top-3 left-2 text-[13px] font-bold text-foreground/40"
          style={{ animation: "snoopyZzz 2.8s ease-in-out infinite 0.5s" }}
        >
          Z
        </span>
        <span
          className="absolute -top-7 left-5 text-[16px] font-bold text-foreground/25"
          style={{ animation: "snoopyZzz 2.8s ease-in-out infinite 1s" }}
        >
          Z
        </span>
      </div>

      <style jsx>{`
        @keyframes snoopyZzz {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) scale(0.7);
          }
          15% {
            opacity: 1;
            transform: translateY(-2px) scale(1);
          }
          60% {
            opacity: 0.5;
            transform: translateY(-8px) scale(1.05);
          }
          85% {
            opacity: 0;
            transform: translateY(-14px) scale(0.9);
          }
        }

        @keyframes woodstockChirp {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.6);
          }
          30% {
            opacity: 1;
            transform: translate(2px, -3px) scale(1);
          }
          80% {
            opacity: 0.6;
            transform: translate(4px, -8px) scale(0.9);
          }
          100% {
            opacity: 0;
            transform: translate(6px, -12px) scale(0.7);
          }
        }
      `}</style>
    </div>
  )
}
