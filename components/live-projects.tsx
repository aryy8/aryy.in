"use client"

import { SectionHeader } from "@/components/section-header"
import { TechBadge } from "@/components/tech-badge"
import { SleepingSnoopy } from "@/components/sleeping-snoopy"

export function LiveProjects() {
  return (
    <section id="live-projects" className="mb-16 scroll-mt-20 snap-section">
      <SectionHeader>Live Projects</SectionHeader>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* teXlab Project */}
        <div className="cursor-pointer flex" onClick={() => window.open('https://texlab.aryy.in', '_blank')}>
          <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 hover:shadow-lg flex flex-col w-full">
            {/* Cover Image Section - Full height */}
            <div className="relative h-48 sm:h-64 overflow-hidden">
              <img 
                src="/texlab.webp" 
                alt="teXlab Project"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Description Section - Minimal */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">teXlab</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  Converts natural language and NLP outputs into professional LaTeX diagrams and tables with intelligent formatting.
                </p>
              </div>
              
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-border/20">
                <TechBadge className="scale-90">NLP</TechBadge>
                <TechBadge className="scale-90">LaTeX</TechBadge>
                <TechBadge className="scale-90">React</TechBadge>
                <TechBadge className="scale-90">Next.js</TechBadge>
              </div>
            </div>
          </div>
        </div>

        {/* Lattice Project — with Sleeping Snoopy on top */}
        <div className="relative cursor-pointer flex" onClick={() => window.open('https://lattice.aryy.in', '_blank')}>
          {/* Snoopy sitting on the top edge of the card */}
          <div 
            className="absolute top-0 right-4 sm:right-6 z-10"
            style={{ transform: "translateY(calc(-100% + 6px))" }}
          >
            <SleepingSnoopy />
          </div>
          <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 hover:shadow-lg flex flex-col w-full">
            {/* Cover Image Section - Full height */}
            <div className="relative h-48 sm:h-64 overflow-hidden">
              <img 
                src="/lattice.jpg" 
                alt="Lattice Project"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Description Section - Minimal */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Lattice</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  Makes any text sound natural. Your words travel through a chain of languages and come back in a simple, human voice.
                </p>
              </div>
              
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-border/20">
                <TechBadge className="scale-90">NMT</TechBadge>
                <TechBadge className="scale-90">TypeScript</TechBadge>
                <TechBadge className="scale-90">Next.js</TechBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
