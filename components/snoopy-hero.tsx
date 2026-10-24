"use client"

/**
 * SnoopyHero – Custom Pixel Sky Banner.
 * Renders the user-selected pixel art sky & cloud horizon banner.
 */
export function SnoopyHero() {
  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-sky-900">
      <img
        src="/sky-banner.jpg"
        alt="Pixel art clouds in blue sky"
        width={953}
        height={361}
        fetchPriority="high"
        loading="eager"
        className="w-full h-full object-cover object-[center_bottom] pointer-events-none block"
        style={{
          imageRendering: "pixelated",
          objectPosition: "center 85%",
        }}
      />
    </div>
  )
}
