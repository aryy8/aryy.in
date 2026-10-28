"use client"

const CLOUDS = [
  { art: "   .--.   \n .(    ). \n(___.__)__)", top: "18%", dur: 70, delay: -10, op: 0.55 },
  { art: "      _  _   \n   ( `   )_ \n  (    )    `)\n(_   (_ .  _) _)", top: "48%", dur: 95, delay: -45, op: 0.35 },
  { art: "  .-~~~-.  \n (       ) \n  `-...-'  ", top: "8%", dur: 120, delay: -80, op: 0.3 },
  { art: "     .--.    \n  .-(    ).  \n (___.__)__) ", top: "62%", dur: 80, delay: -25, op: 0.45 },
  { art: " ~ ~ ~ ~ ", top: "35%", dur: 60, delay: -5, op: 0.25 },
  { art: "  .~~.  \n (    ) \n  `~~'  ", top: "72%", dur: 110, delay: -60, op: 0.3 },
]

// 16x8 pixel plane, 1 = body, 2 = window/accent
const PLANE = [
  "0000000000110000",
  "0000000001110000",
  "1100000011100000",
  "1111111111111110",
  "0111222222221111",
  "0011111111111100",
  "0000000111000000",
  "0000001110000000",
]

function PixelPlane() {
  return (
    <svg className="life-sky-plane" viewBox="0 0 16 8" shapeRendering="crispEdges" aria-hidden="true">
      {PLANE.flatMap((row, y) =>
        row.split("").map((c, x) =>
          c === "0" ? null : <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={c === "2" ? "#38bdf8" : "currentColor"} />
        )
      )}
    </svg>
  )
}

export function LifeSky() {
  return (
    <div className="life-sky" aria-hidden="true">
      {CLOUDS.map((c, i) => (
        <pre
          key={i}
          className="life-sky-cloud"
          style={{ top: c.top, opacity: c.op, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}
        >
          {c.art}
        </pre>
      ))}
      <div className="life-sky-flight">
        <PixelPlane />
        <span className="life-sky-trail">· · · · · ·</span>
      </div>
    </div>
  )
}
