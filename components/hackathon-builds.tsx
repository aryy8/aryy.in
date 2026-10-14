"use client"

import { useState, useEffect } from "react"
import { TechBadge } from "@/components/tech-badge"
import { SectionHeader } from "@/components/section-header"
import { Images, X } from "lucide-react"

const ROADEYE_PHOTOS = [
  "/photo1_iitm_roadeye.webp",
  "/photo2_iitm_roadeye.webp",
  "/photo3_iitm_roadeye.webp",
  "/photo4_iitm_roadeye.webp",
  "/photo5_iitm_roadeye.webp",
]

const UNIWAY_PHOTOS = [
  "/uniway_hackathon1.webp",
  "/uniway_hackathon2.webp",
  "/uniway_hackthon2.5.webp",
  "/uniway_hackathon3.webp",
]

export function HackathonBuilds() {
  const [showAll, setShowAll] = useState(false)
  const [roadeyeIndex, setRoadeyeIndex] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)

  const [uniwayIndex, setUniwayIndex] = useState<number | null>(null)
  const [uniwayProgress, setUniwayProgress] = useState(0)

  // Preload all slideshow images on mount for instant loading
  useEffect(() => {
    const allPhotos = [...ROADEYE_PHOTOS, ...UNIWAY_PHOTOS]
    allPhotos.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    if (roadeyeIndex === null) {
      setProgress(0)
      return
    }

    setProgress(0)
    const rafId = requestAnimationFrame(() => {
      setProgress(100)
    })

    const interval = setInterval(() => {
      setRoadeyeIndex((prev) => {
        if (prev === null) return null
        return prev === ROADEYE_PHOTOS.length - 1 ? 0 : prev + 1
      })
    }, 3000)

    return () => {
      cancelAnimationFrame(rafId)
      clearInterval(interval)
    }
  }, [roadeyeIndex])

  useEffect(() => {
    if (uniwayIndex === null) {
      setUniwayProgress(0)
      return
    }

    setUniwayProgress(0)
    const rafId = requestAnimationFrame(() => {
      setUniwayProgress(100)
    })

    const interval = setInterval(() => {
      setUniwayIndex((prev) => {
        if (prev === null) return null
        return prev === UNIWAY_PHOTOS.length - 1 ? 0 : prev + 1
      })
    }, 3000)

    return () => {
      cancelAnimationFrame(rafId)
      clearInterval(interval)
    }
  }, [uniwayIndex])

  return (
    <section id="projects" className="mb-16 scroll-mt-20 snap-section">
      <SectionHeader>Hackathon Builds</SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Roadeye Project */}
        <div className="flex">
          <div className="bg-background rounded-xl border border-border/50 overflow-hidden shadow-sm project-card flex flex-col w-full">
            {/* Cover Image Section - Full height */}
            <div className="relative h-48 sm:h-64 overflow-hidden select-none bg-muted/20">
              {roadeyeIndex === null ? (
                <img 
                  src="/roadeye.webp"
                  loading="lazy"
                  decoding="async" 
                  alt="Roadeye Project"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div 
                  className="relative w-full h-full cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    setRoadeyeIndex(null)
                  }}
                  title="Click to close gallery"
                >
                  <img 
                    src={ROADEYE_PHOTOS[roadeyeIndex]} 
                    alt={`Roadeye Hackathon Photo ${roadeyeIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                  />
                  
                  {/* Exit Control */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setRoadeyeIndex(null)
                    }}
                    className="absolute top-3 right-3 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-background/70 hover:bg-background text-foreground border border-border/30 backdrop-blur-xs transition-all duration-200 cursor-pointer hover:scale-105"
                    aria-label="Close gallery"
                  >
                    <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                  </button>

                  {/* Indicator */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 overflow-hidden px-2.5 py-0.5 rounded-full bg-background/60 border border-border/30 backdrop-blur-xs text-[10px] font-mono text-muted-foreground">
                    <div 
                      className="absolute inset-y-0 left-0 bg-foreground/15 origin-left transition-transform ease-linear"
                      style={{ 
                        transform: `scaleX(${progress / 100})`,
                        transitionDuration: progress === 0 ? '0ms' : '3000ms',
                        width: '100%'
                      }}
                    />
                    <span className="relative z-10">{roadeyeIndex + 1} / {ROADEYE_PHOTOS.length}</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Description Section - Minimal */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2 gap-2">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    RoadEye
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border border-border/50 text-muted-foreground">Under NDA</span>
                  </h3>
                  {roadeyeIndex === null && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setRoadeyeIndex(0)
                      }}
                      className="flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-mono tracking-wider font-semibold rounded-full border bg-secondary/20 text-muted-foreground border-border/40 hover:text-foreground hover:bg-secondary/40 transition-all duration-300 cursor-pointer shrink-0"
                      title="Start Slideshow"
                    >
                      <Images className="w-3.5 h-3.5" />
                      <span>5+</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  AI-powered road audit system using deep learning and computer vision to detect road defects and generate professional audit reports.
                </p>
                
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <TechBadge className="scale-90">Python</TechBadge>
                  <TechBadge className="scale-90">PyTorch</TechBadge>
                  <TechBadge className="scale-90">OpenCV</TechBadge>
                  <TechBadge className="scale-90">FastAPI</TechBadge>
                </div>
              </div>
              
              {/* Hackathon Info */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground/70 mt-auto pt-2 border-t border-border/20">
                Finalist @ National Road Safety Hackathon 2025, IIT Madras
              </div>
            </div>
          </div>
        </div>

        {/* Uniway Project */}
        <div className="cursor-pointer flex" onClick={() => window.open('https://uniway.aryy.in', '_blank')}>
          <div className="bg-background rounded-xl border border-border/50 overflow-hidden shadow-sm project-card flex flex-col w-full">
            {/* Cover Image Section - Full height */}
            <div className="relative h-48 sm:h-64 overflow-hidden select-none bg-muted/20">
              {uniwayIndex === null ? (
                <img 
                  src="/uniway_project.webp"
                  loading="lazy"
                  decoding="async" 
                  alt="Uniway Project"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div 
                  className="relative w-full h-full cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    setUniwayIndex(null)
                  }}
                  title="Click to close gallery"
                >
                  <img 
                    src={UNIWAY_PHOTOS[uniwayIndex]} 
                    alt={`Uniway Hackathon Photo ${uniwayIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                  />
                  
                  {/* Exit Control */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setUniwayIndex(null)
                    }}
                    className="absolute top-3 right-3 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-background/70 hover:bg-background text-foreground border border-border/30 backdrop-blur-xs transition-all duration-200 cursor-pointer hover:scale-105"
                    aria-label="Close gallery"
                  >
                    <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                  </button>

                  {/* Indicator */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 overflow-hidden px-2.5 py-0.5 rounded-full bg-background/60 border border-border/30 backdrop-blur-xs text-[10px] font-mono text-muted-foreground">
                    <div 
                      className="absolute inset-y-0 left-0 bg-foreground/15 origin-left transition-transform ease-linear"
                      style={{ 
                        transform: `scaleX(${uniwayProgress / 100})`,
                        transitionDuration: uniwayProgress === 0 ? '0ms' : '3000ms',
                        width: '100%'
                      }}
                    />
                    <span className="relative z-10">{uniwayIndex + 1} / {UNIWAY_PHOTOS.length}</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Description Section - Minimal */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2 gap-2">
                  <h3 className="text-lg font-semibold text-foreground">Uniway</h3>
                  {uniwayIndex === null && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setUniwayIndex(0)
                      }}
                      className="flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-mono tracking-wider font-semibold rounded-full border bg-secondary/20 text-muted-foreground border-border/40 hover:text-foreground hover:bg-secondary/40 transition-all duration-300 cursor-pointer shrink-0"
                      title="Start Slideshow"
                    >
                      <Images className="w-3.5 h-3.5" />
                      <span>4+</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  Campus navigation platform featuring interactive maps, smart search, route guidance, and student services with AI-ready extensions.
                </p>
                
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <TechBadge className="scale-90">React</TechBadge>
                  <TechBadge className="scale-90">OSRM</TechBadge>
                  <TechBadge className="scale-90">Google APIs</TechBadge>
                  <TechBadge className="scale-90">Leaflet</TechBadge>
                </div>
              </div>
              
              {/* Hackathon Info */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground/70 mt-auto pt-2 border-t border-border/20">
                Winner @ Uniway Hackathon 2025
              </div>
            </div>
          </div>
        </div>

        {showAll && (
          <>
            {/* Prompt2Plugin Project */}
            <div className="cursor-pointer flex">
              <div className="bg-background rounded-xl border border-border/50 overflow-hidden shadow-sm project-card flex flex-col w-full">
                {/* Cover Image Section - Full height */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img 
                    src="/p2p.webp" 
                    alt="Prompt2Plugin Project"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Description Section - Minimal */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Prompt2Plugin</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      AI-powered Chrome extension generator that transforms natural language prompts into functional extensions and n8n automation workflows.
                    </p>
                    
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <TechBadge className="scale-90">React</TechBadge>
                      <TechBadge className="scale-90">TypeScript</TechBadge>
                      <TechBadge className="scale-90">n8n</TechBadge>
                      <TechBadge className="scale-90">Chrome API</TechBadge>
                    </div>
                  </div>
                  
                  {/* Hackathon Info */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70 mt-auto pt-2 border-t border-border/20">
                    Project @ CodeClash 2025
                  </div>
                </div>
              </div>
            </div>

            {/* janconnectai Project */}
            <div className="cursor-pointer flex">
              <div className="bg-background rounded-xl border border-border/50 overflow-hidden shadow-sm project-card flex flex-col w-full">
                {/* Cover Image Section - Full height */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img 
                    src="/janconnectai.webp" 
                    alt="JanConnectAI Project"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Description Section - Minimal */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">JanConnectAI</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      AI-powered election management platform with voter knowledge graphs, booth-level analytics, fraud detection, and intelligent voter engagement. 
                    </p>
                    
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <TechBadge className="scale-90">React</TechBadge>
                      <TechBadge className="scale-90">Knowledge Graphs</TechBadge>
                      <TechBadge className="scale-90">NLP</TechBadge>
                      <TechBadge className="scale-90">Anomaly Detection</TechBadge>
                    </div>
                  </div>
                  
                  {/* Hackathon Info */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70 mt-auto pt-2 border-t border-border/20">
                    Finalist @ India Innovates 2026
                  </div>
                </div>
              </div>
            </div>

            {/* Silvercircle Project */}
            <div className="cursor-pointer flex">
              <div className="bg-background rounded-xl border border-border/50 overflow-hidden shadow-sm project-card flex flex-col w-full">
                {/* Cover Image Section - Full height */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img 
                    src="/silvercircle.webp" 
                    alt="Silvercircle Project"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Description Section - Minimal */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Silvercircle</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      A social networking and community platform designed for old age people, featuring VR Memory lanes, games, hobby circles and many more. Judged by the expert panel of engineers from Google, Microsoft etc.
                    </p>
                    
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <TechBadge className="scale-90">React</TechBadge>
                      <TechBadge className="scale-90">Framer Motion</TechBadge>
                      <TechBadge className="scale-90">Tailwind</TechBadge>
                      <TechBadge className="scale-90">Shadcn</TechBadge>
                    </div>
                  </div>
                  
                  {/* Hackathon Info */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70 mt-auto pt-2 border-t border-border/20">
                    Winner @ Brandit 2.0 2025
                  </div>
                </div>
              </div>
            </div>

            {/* Geoverse Project */}
            <div className="cursor-pointer flex">
              <div className="bg-background rounded-xl border border-border/50 overflow-hidden shadow-sm project-card flex flex-col w-full">
                {/* Cover Image Section - Full height */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img 
                    src="/geoverse.webp" 
                    alt="Geoverse Project"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Description Section - Minimal */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Geoverse</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      AI-powered conversational system that transforms complex satellite data into instant, contextual answers using NLP and knowledge graphs.
                    </p>
                    
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <TechBadge className="scale-90">Python</TechBadge>
                      <TechBadge className="scale-90">NLP</TechBadge>
                      <TechBadge className="scale-90">Knowledge Graphs</TechBadge>
                      <TechBadge className="scale-90">FastAPI</TechBadge>
                    </div>
                  </div>
                  
                  {/* Hackathon Info */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70 mt-auto pt-2 border-t border-border/20">
                    Project @ BAH ISRO, 2025
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {!showAll && (
        <div className="mt-8 text-center">
          <button 
            onClick={() => setShowAll(true)}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-wider border border-border/60 rounded-full px-4 py-1.5 bg-secondary/20 hover:bg-secondary/40"
          >
            View More +
          </button>
        </div>
      )}
    </section>
  )
}
