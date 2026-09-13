"use client"

/**
 * SnoopyHero – Reusable hero banner component displaying the seamless
 * looping Snoopy surfing animation.
 *
 * Features:
 * - autoplay, loop, muted, playsInline (zero interaction required)
 * - WebM (VP9) + MP4 (H.264) dual-source for max browser coverage
 * - Fallback to static image if video fails
 * - Responsive, lightweight, no controls
 * - pointer-events-none to prevent any accidental interaction
 */

import { useRef, useState } from "react"

export function SnoopyHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoFailed, setVideoFailed] = useState(false)

  return (
    <>
      {!videoFailed ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-[center_70%] pointer-events-none select-none"
          onError={() => setVideoFailed(true)}
        >
          <source src="/snoopy-surfing.webm" type="video/webm" />
          <source src="/snoopy-surfing.mp4" type="video/mp4" />
        </video>
      ) : (
        /* Graceful fallback: static mirrored image */
        <img
          src="/snoopy-surfing.png"
          alt="Snoopy Surfing"
          className="w-full h-full object-cover object-center scale-x-[-1]"
        />
      )}
    </>
  )
}
