"use client"

import { useEffect } from "react"

/** Fades sections in as they enter the viewport. No-op when reduced motion is preferred. */
export function useSectionReveal(deps: unknown[] = []) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const els = Array.from(document.querySelectorAll<HTMLElement>(".snap-section"))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible")
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    )
    els.forEach((el, i) => {
      if (i === 0) return el.classList.add("is-visible")
      if (el.getBoundingClientRect().top < window.innerHeight) return el.classList.add("is-visible")
      el.classList.add("reveal")
      io.observe(el)
    })
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
