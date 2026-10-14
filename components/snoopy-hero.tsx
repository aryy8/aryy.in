"use client"

/**
 * SnoopyHero – looping Snoopy surfing cover.
 *
 * - <video> autoplay/loop/muted/playsInline with a first-frame poster, no native controls.
 * - If play() is rejected (e.g. Safari Low Power Mode blocks autoplay), swap to an animated
 *   WebP of the same clip. It's only requested in that case, and the poster stays visible
 *   until it has loaded.
 * - With prefers-reduced-motion: reduce, only the still poster is shown.
 */

import { useEffect, useRef, useState } from "react"

type Mode = "video" | "animated" | "still"

const POSTER = "/snoopy-surfing-poster.webp"
const cover = "absolute inset-0 w-full h-full object-cover object-[center_70%] pointer-events-none select-none"

export function SnoopyHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mode, setMode] = useState<Mode>("video")
  const [animReady, setAnimReady] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("still")
      return
    }
    const v = videoRef.current
    if (!v) return
    v.muted = true
    const p = v.play()
    if (p && typeof p.catch === "function") p.catch(() => setMode("animated"))
  }, [])

  return (
    <div className="relative w-full h-full">
      <picture>
        <source srcSet="/snoopy-surfing-poster.avif" type="image/avif" />
        <img src={POSTER} alt="Snoopy surfing" width={1672} height={620} fetchPriority="high" className={cover} />
      </picture>

      {mode === "video" && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controls={false}
          preload="auto"
          poster={POSTER}
          aria-hidden
          tabIndex={-1}
          className={`snoopy-video ${cover}`}
          onError={() => setMode("animated")}
        >
          <source src="/snoopy-surfing.webm" type="video/webm" />
          <source src="/snoopy-surfing.mp4" type="video/mp4" />
        </video>
      )}

      {mode === "animated" && (
        <img
          src="/snoopy-surfing-anim.webp"
          alt=""
          aria-hidden
          width={1400}
          height={520}
          decoding="async"
          onLoad={() => setAnimReady(true)}
          className={`${cover} transition-opacity duration-300 ${animReady ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  )
}
