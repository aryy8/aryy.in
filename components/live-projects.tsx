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
  metric?: string
  launch?: { label: string; url: string; image: string; alt: string; width: number; height: number }
  snoopy?: boolean
}

// Copy comes from this repo and the resume in /public.
const PROJECTS: Project[] = [
  {
    name: "Petal",
    slug: "petal",
    url: "https://petal.aryy.in",
    outcome: "Intent-to-execution PDF engine: plain-English prompts compile into validated workflows across 35+ PDF operations.",
    tags: ["GCP Cloud Run", "Supabase", "LLMs"],
    launch: {
      label: "Ranked #3 on ProductsFarm",
      url: "https://productsfarm.com/product/petal",
      image: "https://productsfarm.com/api/badge/petal?theme=dark",
      alt: "Petal on ProductsFarm",
      width: 220,
      height: 48,
    },
  },
  {
    name: "Lattice",
    slug: "lattice",
    url: "https://lattice.aryy.in",
    metric: "400+ users · 52 countries",
    outcome: "Makes any text sound natural. Your words travel through a chain of languages and come back in a simple, human voice.",
    tags: ["NMT", "TypeScript", "Next.js"],
    snoopy: true,
    launch: {
      label: "#14 Day Rank on Product Hunt",
      url: "https://www.producthunt.com/products/lattice-11/launches/lattice-12?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-lattice-12",
      image: "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1262593&theme=dark",
      alt: "Lattice - Reshape your text across languages while preserving meaning | Product Hunt",
      width: 250,
      height: 54,
    },
  },
  /*
  {
    name: "MinGraph",
    slug: "mingraph",
    url: "https://mingraph.aryy.in",
    outcome: "Pathfinding visualizer over Jaipur's road network (257,620 nodes), comparing Dijkstra, A*, BFS and Bidirectional Dijkstra live.",
    tags: ["C++17", "Web Workers", "deck.gl"],
  },
  {
    name: "teXlab",
    slug: "texlab",
    url: "https://texlab.aryy.in",
    outcome: "Converts natural language and NLP outputs into professional LaTeX diagrams and tables with intelligent formatting.",
    tags: ["NLP", "LaTeX", "React", "Next.js"],
  },
  */
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
    <section id="live-projects" className="mb-12 scroll-mt-20 snap-section">
      <SectionHeader>Products</SectionHeader>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        {PROJECTS.map((p) => (
          <div key={p.slug} className="relative flex">
            {p.snoopy && (
              <div className="absolute top-0 right-4 sm:right-6 z-10" style={{ transform: "translateY(calc(-100% + 6px))" }}>
                <SleepingSnoopy flyDirection="right" />
              </div>
            )}
            <div className="project-card group relative bg-card/60 hover:bg-card/90 rounded-xl border border-border/40 hover:border-border/80 overflow-hidden shadow-xs hover:shadow-md flex flex-col w-full transition-all duration-300">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name}, open live app`}
                className="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/60"
              />
              <div className="relative aspect-[16/10] overflow-hidden bg-muted/20 border-b border-border/30">
                <ProjectShot slug={p.slug} alt={`${p.name} live app screenshot`} />
              </div>
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-medium text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <ArrowUpRight aria-hidden className="size-4 text-muted-foreground/60 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </div>
                  {p.metric && (
                    <p className="text-xs font-mono text-muted-foreground/75 font-normal">
                      {p.metric}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                    {p.outcome}
                  </p>
                  {p.launch && (
                    <div className="relative z-20 mt-auto flex items-center justify-between gap-2 pt-4">
                      <p className="text-[10px] font-mono text-muted-foreground/75">
                        {p.launch.label}
                      </p>
                      <a
                        href={p.launch.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-[22px] w-[102px] shrink-0 items-center justify-end rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                      >
                        <img
                          src={p.launch.image}
                          alt={p.launch.alt}
                          width={p.launch.width}
                          height={p.launch.height}
                          className="hidden h-[22px] w-[102px] object-contain dark:block"
                        />
                        <img
                          src={p.launch.image.replace("theme=dark", "theme=light")}
                          alt={p.launch.alt}
                          width={p.launch.width}
                          height={p.launch.height}
                          className="block h-[22px] w-[102px] object-contain dark:hidden"
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

