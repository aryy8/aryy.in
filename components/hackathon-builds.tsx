"use client"

import { useState } from "react"
import { TechBadge } from "@/components/tech-badge"

export function HackathonBuilds() {
  const [showAll, setShowAll] = useState(false)

  return (
    <section id="projects" className="mb-16 scroll-mt-20 snap-start">
      <div className="mb-8">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground/80 mb-8 font-mono font-semibold">Hackathon Builds</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Roadeye Project */}
        <div className="cursor-pointer">
          <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 hover:shadow-lg">
            {/* Cover Image Section - Full height */}
            <div className="relative h-48 sm:h-64 overflow-hidden">
              <img 
                src="/roadeye.webp" 
                alt="Roadeye Project"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Description Section - Minimal */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">RoadEye</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                AI-powered road audit system using deep learning and computer vision to detect road defects and generate professional audit reports.
              </p>
              
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <TechBadge className="scale-90">Python</TechBadge>
                <TechBadge className="scale-90">PyTorch</TechBadge>
                <TechBadge className="scale-90">OpenCV</TechBadge>
                <TechBadge className="scale-90">FastAPI</TechBadge>
              </div>
              
              {/* Hackathon Info */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                Finalist @ National Road Safety Hackathon 2025, IIT Madras
              </div>
            </div>
          </div>
        </div>

        {/* Uniway Project */}
        <div className="cursor-pointer">
          <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 hover:shadow-lg">
            {/* Cover Image Section - Full height */}
            <div className="relative h-48 sm:h-64 overflow-hidden">
              <img 
                src="/uniway_project.webp" 
                alt="Uniway Project"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Description Section - Minimal */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">Uniway</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Campus navigation platform featuring interactive maps, smart search, route guidance, and student services with AI-ready extensions.
              </p>
              
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <TechBadge className="scale-90">React</TechBadge>
                <TechBadge className="scale-90">OSRM</TechBadge>
                <TechBadge className="scale-90">Google APIs</TechBadge>
                <TechBadge className="scale-90">Leaflet</TechBadge>
              </div>
              
              {/* Hackathon Info */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                Winner @ Uniway Hackathon 2025
              </div>
            </div>
          </div>
        </div>

        {showAll && (
          <>
            {/* Prompt2Plugin Project */}
            <div className="cursor-pointer">
              <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 hover:shadow-lg">
                {/* Cover Image Section - Full height */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img 
                    src="/p2p.webp" 
                    alt="Prompt2Plugin Project"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Description Section - Minimal */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Prompt2Plugin</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    AI-powered Chrome extension generator that transforms natural language prompts into functional extensions and n8n automation workflows.
                  </p>
                  
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <TechBadge className="scale-90">React</TechBadge>
                    <TechBadge className="scale-90">TypeScript</TechBadge>
                    <TechBadge className="scale-90">n8n</TechBadge>
                    <TechBadge className="scale-90">Chrome API</TechBadge>
                  </div>
                  
                  {/* Hackathon Info */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                    Project @ CodeClash 2025
                  </div>
                </div>
              </div>
            </div>

            {/* janconnectai Project */}
            <div className="cursor-pointer">
              <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 hover:shadow-lg">
                {/* Cover Image Section - Full height */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img 
                    src="/janconnectai.webp" 
                    alt="JanConnectAI Project"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Description Section - Minimal */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">JanConnectAI</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    AI-powered election management platform with voter knowledge graphs, booth-level analytics, fraud detection, and intelligent voter engagement. 
                  </p>
                  
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <TechBadge className="scale-90">React</TechBadge>
                    <TechBadge className="scale-90">Knowledge Graphs</TechBadge>
                    <TechBadge className="scale-90">NLP</TechBadge>
                    <TechBadge className="scale-90">Anomaly Detection</TechBadge>
                  </div>
                  
                  {/* Hackathon Info */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                    Finalist @ India Innovates 2026
                  </div>
                </div>
              </div>
            </div>

            {/* Silvercircle Project */}
            <div className="cursor-pointer">
              <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 hover:shadow-lg">
                {/* Cover Image Section - Full height */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img 
                    src="/silvercircle.webp" 
                    alt="Silvercircle Project"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Description Section - Minimal */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Silvercircle</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    A social networking and community platform designed for old age people, featuring VR Memory lanes, games, hobby circles and many more. Judged by the expert panel of engineers from Google, Microsoft etc.
                  </p>
                  
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <TechBadge className="scale-90">React</TechBadge>
                    <TechBadge className="scale-90">Framer Motion</TechBadge>
                    <TechBadge className="scale-90">Tailwind</TechBadge>
                    <TechBadge className="scale-90">Shadcn</TechBadge>
                  </div>
                  
                  {/* Hackathon Info */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                    Winner @ Brandit 2.0 2025
                  </div>
                </div>
              </div>
            </div>

            {/* Geoverse Project */}
            <div className="cursor-pointer">
              <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 hover:shadow-lg">
                {/* Cover Image Section - Full height */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img 
                    src="/geoverse.webp" 
                    alt="Geoverse Project"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Description Section - Minimal */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Geoverse</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    AI-powered conversational system that transforms complex satellite data into instant, contextual answers using NLP and knowledge graphs.
                  </p>
                  
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <TechBadge className="scale-90">Python</TechBadge>
                    <TechBadge className="scale-90">NLP</TechBadge>
                    <TechBadge className="scale-90">Knowledge Graphs</TechBadge>
                    <TechBadge className="scale-90">FastAPI</TechBadge>
                  </div>
                  
                  {/* Hackathon Info */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
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
