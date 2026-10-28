"use client"

import { useEffect, useRef, useState } from "react"

export function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`life-fade ${shown ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  )
}

type PhotoProps = {
  src?: string
  alt?: string
  caption: string
  size?: "small" | "wide" | "float"
  aspect?: string
}

/** Drop a file into public/life/ and pass src="/life/<file>" to replace the placeholder. */
export function Photo({ src, alt, caption, size = "small", aspect = "4 / 3" }: PhotoProps) {
  const [failed, setFailed] = useState(false)
  const showImg = src && !failed
  return (
    <figure className={`life-photo life-photo--${size}`}>
      <div className="life-photo-frame" style={{ aspectRatio: aspect }}>
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? caption} loading="lazy" onError={() => setFailed(true)} />
        ) : (
          <div className="life-photo-ph" aria-label={`Placeholder: ${caption}`}>
            <span>{src ? src.replace("/life/", "") : "photo"}</span>
          </div>
        )}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export function PhotoPair({ children }: { children: React.ReactNode }) {
  return <div className="life-photo-pair">{children}</div>
}
