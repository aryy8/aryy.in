"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SectionHeader } from "@/components/section-header"
import { GitHubContributionGrid } from "@/components/github-contribution-grid"
import { LeetCodeStats } from "@/components/leetcode-stats"
import { TechBadge } from "@/components/tech-badge"
import { TechStack } from "@/components/tech-stack"
import { LiquidGlassDock } from "@/components/liquid-glass-dock"
import { JupyterCell } from "@/components/jupyter-cell"
import { LiveProjects } from "@/components/live-projects"
import { HackathonBuilds } from "@/components/hackathon-builds"
import { NotesGrid } from "@/components/notes-grid"
import { Achievements } from "@/components/achievements"
import { WorkExperience } from "@/components/work-experience"
import { SnoopyHero } from "@/components/snoopy-hero"
import { Mail, MapPin } from "lucide-react"
import { Github, Linkedin, FileText } from "lucide-react"
import { useState } from "react"
import { AgenticView } from "@/components/agentic-view"
import { useSectionReveal } from "@/components/reveal"
import { CommandMenu } from "@/components/command-menu"
import { ResearchList } from "@/components/research-list"
import { BlogList } from "@/components/blog-list"
import { SnoopyAsciiPond } from "@/components/snoopy-ascii-pond"
import { AsciiWaterFooter } from "@/components/ascii-water-footer"

export default function Portfolio() {
  const [isAgenticMode, setIsAgenticMode] = useState(false)
  useSectionReveal([isAgenticMode])

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

      <CommandMenu onBeforeNavigate={() => setIsAgenticMode(false)} />
      <LiquidGlassDock />

      {/* Interactive ASCII Ripple Pond & Snoopy Gutters (inspired by aetosdios.xyz) */}
      <SnoopyAsciiPond />

      <div className="relative z-10 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 scroll-smooth">
        {/* Full-height continuous dashed guide rails */}
        <div className="absolute inset-y-0 left-4 sm:left-6 lg:left-12 right-4 sm:right-6 lg:right-12 pointer-events-none">
          <div className="max-w-3xl mx-auto h-full border-x-[1.5px] border-dashed border-foreground/25" />
        </div>

        <main className="flex-1 w-full min-w-0 max-w-3xl mx-auto relative px-4 sm:px-8 pt-8 sm:pt-14 pb-0">
          {/* Conditional Agentic View or Standard Human Sections */}
          {isAgenticMode ? (
            <AgenticView />
          ) : (
            <>
              {/* Hero Section - LinkedIn & Twitter Inspired Senior UI Design */}
              <section className="mb-12 snap-section">
                {/* Cover Photo Banner - Crisp & Clear */}
                <div className="relative w-full h-32 sm:h-40 lg:h-44 overflow-hidden rounded-2xl border border-border/40">
                  <SnoopyHero />
                </div>

                {/* Profile Content Area */}
                <div className="relative -mt-12 sm:-mt-20 lg:-mt-22 px-2 sm:px-4">
                  {/* Avatar and Top Actions Header Row */}
                  <div className="flex flex-row items-end justify-between mb-3 sm:mb-4 gap-2 sm:gap-4">
                    {/* Profile Picture (Circular, Twitter/LinkedIn style) */}
                    <div className="relative shrink-0">
                      <div className="size-24 sm:size-36 lg:size-40 rounded-full border-4 sm:border-[5px] border-background bg-card shadow-xl overflow-hidden shrink-0 ring-1 ring-border/20 transition-transform duration-300 hover:scale-[1.02]">
                        <img
                          src="/profilepic.webp"
                          alt="Aryan Rastogi"
                          width={160}
                          height={160}
                          fetchPriority="high"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>

                    {/* Top Action Row: Logo Badges */}
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap pb-1 justify-end shrink-0 max-w-[200px] sm:max-w-none">
                      <div className="size-6 sm:size-9 rounded-full overflow-hidden bg-background/90 border border-border/60 p-0.5 sm:p-1 shadow-2xs transition-transform duration-200 hover:scale-110" title="Sylus AI">
                        <img src="/sylusai.webp" width={36} height={36} loading="lazy" decoding="async" alt="Sylus AI" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="size-6 sm:size-9 rounded-full overflow-hidden bg-background/90 border border-border/60 p-0.5 sm:p-1 shadow-2xs transition-transform duration-200 hover:scale-110" title="Hewlett Packard Enterprise">
                        <div className="size-full rounded-full bg-white flex items-center justify-center p-0.5 sm:p-1">
                          <img src="/hpe_logo.webp" width={36} height={36} loading="lazy" decoding="async" alt="HPE" className="w-full h-full object-contain" />
                        </div>
                      </div>
                      <div className="size-6 sm:size-9 rounded-full overflow-hidden bg-background/90 border border-border/60 p-0.5 sm:p-1 shadow-2xs transition-transform duration-200 hover:scale-110" title="Amazon ML Summer School">
                        <img src="/amazon_logo.webp" width={36} height={36} loading="lazy" decoding="async" alt="Amazon" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="size-6 sm:size-9 rounded-full overflow-hidden bg-background/90 border border-border/60 p-0.5 sm:p-1 shadow-2xs transition-transform duration-200 hover:scale-110" title="Southern Federal University (ICTIS) Russia">
                        <img src="/sfedu.webp" width={36} height={36} loading="lazy" decoding="async" alt="SfedU" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="size-6 sm:size-9 rounded-full overflow-hidden bg-background/90 border border-border/60 p-0.5 sm:p-1 shadow-2xs transition-transform duration-200 hover:scale-110" title="Elumina Street Solutions">
                        <img src="/elumina.webp" width={36} height={36} loading="lazy" decoding="async" alt="Elumina" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="size-6 sm:size-9 rounded-full overflow-hidden bg-background/90 border border-border/60 p-0.5 sm:p-1 shadow-2xs transition-transform duration-200 hover:scale-110" title="AI²: Computational Linguistics & Vision Lab">
                        <img src="/ai2.webp" width={36} height={36} loading="lazy" decoding="async" alt="AI² Lab" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="size-6 sm:size-9 rounded-full overflow-hidden bg-background/90 border border-border/60 p-0.5 sm:p-1 shadow-2xs transition-transform duration-200 hover:scale-110" title="Manipal University Jaipur">
                        <img src="/muj.webp" width={36} height={36} loading="lazy" decoding="async" alt="Manipal University Jaipur" className="w-full h-full object-contain rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Main Bio Info - Full Width */}
                  <div className="w-full space-y-3">
                    {/* Name & Blue Tick */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h1 className="text-[2rem] leading-none sm:text-5xl font-serif text-foreground tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
                        Aryan Rastogi
                      </h1>
                      <div className="relative flex items-center justify-center shrink-0">
                        <div className="absolute inset-0 bg-white rounded-full scale-75 dark:hidden" />
                        <img src="/verified.webp" alt="Verified" className="relative size-5 sm:size-6" />
                      </div>
                    </div>

                    {/* Clean Headline - Applied AI × Research on new line */}
                    <p className="text-base sm:text-lg text-foreground font-medium leading-snug text-balance">
                      Applied AI × Research
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      AI Engineer @ Sylus AI <span className="text-muted-foreground/50">·</span> Amazon MLSS'26 <span className="text-muted-foreground/50">·</span> CPP-2 @ HPE
                    </p>

                    {/* Location & Email Meta */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-muted-foreground pt-0.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-muted-foreground/80 shrink-0" />
                        <span>Jaipur, India</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="size-3.5 text-muted-foreground/80 shrink-0" />
                        <a href="mailto:aryanfeb17@gmail.com" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 font-medium transition-colors">
                          aryanfeb17@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section id="about" className="mb-12 scroll-mt-20 snap-section">
                <SectionHeader>About Me</SectionHeader>
                <div className="space-y-5 text-muted-foreground leading-relaxed text-base">


                  <p>
                    I am a computer science engineering student working on <span className="text-primary font-medium">machine learning</span>, <span className="text-primary font-medium">NLP</span>, and <span className="text-primary font-medium">applied AI systems</span>.
                    {/* I run <a href="https://www.aryyandco.studio" target="_blank" rel="noopener noreferrer" className="text-accent-cold font-medium hover:underline">Aryy & Co</a>, a tech agency helping early-stage teams build and ship products. */}
                    {/* I create tech content at <a href="https://www.instagram.com/aryy.in_/" target="_blank" rel="noopener noreferrer" className="text-accent-cold font-medium hover:underline">@aryy.in_</a>. */}
                    I craft effective prompts, build <span className="text-primary font-medium">clean frontends</span>, and work comfortably across <span className="text-primary font-medium">backend</span> systems.
                  </p>
                  <p className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
                    I train models to learn &amp; they teach me patience.
                  </p>

                  {/* <p>
                Beyond work, I make food edits at <a href="https://www.instagram.com/nomnomsss_/" target="_blank" rel="noopener noreferrer" className="text-accent-cold font-medium hover:underline">@nomnomsss_</a>.
              </p> */}

                </div>
              </section>

              <div className="-mx-4 sm:-mx-8 border-b-[1.5px] border-dashed border-foreground/25 my-12" />

              {/* Tech Stack */}
              <section className="mb-12 snap-section">
                <SectionHeader>Tech Stack</SectionHeader>
                <TechStack />
              </section>

              <div className="-mx-4 sm:-mx-8 border-b-[1.5px] border-dashed border-foreground/25 my-12" />

              {/* GitHub Contributions */}
              <section className="mb-12 snap-section">
                <SectionHeader>GitHub Activity</SectionHeader>
                <GitHubContributionGrid />
              </section>

              <div className="-mx-4 sm:-mx-8 border-b-[1.5px] border-dashed border-foreground/25 my-12" />

              {/* LeetCode Stats */}
              {/* <section id="leetcode" className="mb-12 scroll-mt-20 snap-section">
                <SectionHeader>LeetCode Stats</SectionHeader>
                <LeetCodeStats />
              </section> */}

              {/* Experience Section */}
              <section id="experience" className="mb-12 scroll-mt-20 snap-section">
                <SectionHeader>Work Experience</SectionHeader>
                <WorkExperience />
              </section>

              <div className="-mx-4 sm:-mx-8 border-b-[1.5px] border-dashed border-foreground/25 my-12" />

              {/* Live Projects Section */}
              <LiveProjects />

              <div className="-mx-4 sm:-mx-8 border-b-[1.5px] border-dashed border-foreground/25 my-12" />

              {/* Hackathon Builds Section */}
              {/* <HackathonBuilds /> */}

              {/* Research Section */}
              {/* <section id="research" className="mb-12 scroll-mt-20 snap-section">
                <SectionHeader>Research</SectionHeader>
                <ResearchList />
              </section> */}

              {/* Achievements Section */}
              <section id="achievements" className="mb-12 scroll-mt-20 snap-section">
                <SectionHeader>Achievements & Recognition</SectionHeader>
                <Achievements />
              </section>

              <div className="-mx-4 sm:-mx-8 border-b-[1.5px] border-dashed border-foreground/25 my-12" />

              {/* Blog Section */}
              <section id="blog" className="mb-12 scroll-mt-20 snap-section">
                <SectionHeader>Blogs</SectionHeader>
                <BlogList />
              </section>

              <div className="-mx-4 sm:-mx-8 border-b-[1.5px] border-dashed border-foreground/25 my-12" />

              {/* Notes Section */}
              <section id="notes" className="mb-0 scroll-mt-20 snap-section">
                <SectionHeader>Knowledge Base</SectionHeader>
                <NotesGrid />
              </section>

              {/* Interactive Blue ASCII Water Footer */}
              <AsciiWaterFooter />
            </>
          )}
        </main>
      </div>
    </div>
  )
}
