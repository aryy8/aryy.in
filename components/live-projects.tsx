"use client"

import { SectionHeader } from "@/components/section-header"
import { TechBadge } from "@/components/tech-badge"

export function LiveProjects() {
  return (
    <section id="live-projects" className="mb-16 scroll-mt-20 snap-start">
      <SectionHeader>Live Projects</SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Perplex Project */}
        <div className="cursor-pointer" onClick={() => window.open('https://perplex.aryy.in', '_blank')}>
          <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 transition-all duration-300 hover:shadow-lg">
            {/* Cover Image Section - Full height */}
            <div className="relative h-48 sm:h-64 overflow-hidden">
              <img 
                src="/perplex.png" 
                alt="Perplex Project"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Description Section - Minimal */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">perpleX</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                AI-powered text humanizer that transforms AI-generated content into natural, human-like text.
              </p>
              
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5">
                <TechBadge className="scale-90">AI</TechBadge>
                <TechBadge className="scale-90">NLP</TechBadge>
                <TechBadge className="scale-90">React</TechBadge>
                <TechBadge className="scale-90">Next.js</TechBadge>
              </div>
            </div>
          </div>
        </div>

        {/* teXlab Project */}
        <div className="cursor-pointer" onClick={() => window.open('https://texlab.aryy.in', '_blank')}>
          <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 transition-all duration-300 hover:shadow-lg">
            {/* Cover Image Section - Full height */}
            <div className="relative h-48 sm:h-64 overflow-hidden">
              <img 
                src="/texlab.png" 
                alt="teXlab Project"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Description Section - Minimal */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">teXlab</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Converts natural language and NLP outputs into professional LaTeX diagrams and tables with intelligent formatting.
              </p>
              
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5">
                <TechBadge className="scale-90">NLP</TechBadge>
                <TechBadge className="scale-90">LaTeX</TechBadge>
                <TechBadge className="scale-90">React</TechBadge>
                <TechBadge className="scale-90">Next.js</TechBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
