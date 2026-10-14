"use client"

import { SectionHeader } from "@/components/section-header"
import { TechBadge } from "@/components/tech-badge"
import { SleepingSnoopy } from "@/components/sleeping-snoopy"
import { ArrowUpRight } from "lucide-react"

type Project = {
  name: string
  slug: string
  url: string
  outcome: string
  tags?: string[]
  featured?: boolean
  snoopy?: boolean
}

// Copy comes from this repo or from each live app's own landing page.
const PROJECTS: Project[] = [
  {
    name: "Petal",
    slug: "petal",
    url: "https://petal.aryy.in",
    outcome: "Your personal PDF editor with AI. Tell it what to change, add or create, and Petal does the rest.",
    featured: true,
  },
  {
    name: "MinGraph",
    slug: "mingraph",
    url: "https://mingraph.aryy.in",
    outcome: "Road-network pathfinding on a real city map. Simulate and compare Dijkstra, A*, BFS and bidirectional Dijkstra.",
    featured: true,
  },
  {
    name: "Lattice",
    slug: "lattice",
    url: "https://lattice.aryy.in",
    outcome: "Makes any text sound natural. Your words travel through a chain of languages and come back in a simple, human voice.",
    tags: ["NMT", "TypeScript", "Next.js"],
    featured: true,
    snoopy: true,
  },
  {
    name: "teXlab",
    slug: "texlab",
    url: "https://texlab.aryy.in",
    outcome: "Converts natural language and NLP outputs into professional LaTeX diagrams and tables with intelligent formatting.",
    tags: ["NLP", "LaTeX", "React", "Next.js"],
  },
]

export function ProjectShot({ slug, alt }: { slug: string; alt: string }) {
  return (
    <picture>
      <source srcSet={`/projects/${slug}.avif`} type="image/avif" />
      <img
        src={`/projects/${slug}.webp`}
        alt={alt}
        width={1600}
        height={1000}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
      />
    </picture>
  )
}

export function LiveProjects() {
  return (
    <section id="live-projects" className="mb-16 scroll-mt-20 snap-section">
      <SectionHeader>Live Projects</SectionHeader>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {PROJECTS.map((p) => (
          <div key={p.slug} className="relative flex">
            {p.snoopy && (
              <div className="absolute top-0 right-4 sm:right-6 z-10" style={{ transform: "translateY(calc(-100% + 6px))" }}>
                <SleepingSnoopy />
              </div>
            )}
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name}, open live app`}
              className="project-card group bg-background rounded-xl border border-border/50 overflow-hidden shadow-sm flex flex-col w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted/20">
                <ProjectShot slug={p.slug} alt={`${p.name} live app screenshot`} />
                {p.featured && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-background/70 border border-border/40 backdrop-blur-sm text-foreground/80">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
                  <ArrowUpRight aria-hidden className="size-4 text-muted-foreground transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.outcome}</p>
                {p.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border/20">
                    {p.tags.map((t) => (
                      <TechBadge key={t} className="scale-90">{t}</TechBadge>
                    ))}
                  </div>
                )}
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
