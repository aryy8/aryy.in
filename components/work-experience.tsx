"use client"

type ExperienceItem = {
  title: string
  company: string
  timeline: string
  logo: string
  bgWhite?: boolean
}

const EXPERIENCES: ExperienceItem[] = [
  {
    title: "CPP-2",
    company: "Hewlett Packard Enterprise",
    timeline: "Aug 2026 - Present",
    logo: "/hpe.webp",
    bgWhite: true,
  },
  {
    title: "Amazon ML Summer School",
    company: "Amazon",
    timeline: "Jul 2026 - Present",
    logo: "/amazon_logo.webp",
  },
  {
    title: "AI Engineer",
    company: "Sylus AI",
    timeline: "Apr 2026 - Present",
    logo: "/sylusai.webp",
  },
  {
    title: "SDE Intern",
    company: "Southern Federal University (ICTIS)",
    timeline: "Oct - Nov 2025",
    logo: "/sfedu.webp",
  },
  {
    title: "AI R&D Intern",
    company: "Elumina Street Solutions",
    timeline: "Apr - Jul 2025",
    logo: "/elumina.webp",
  },
  {
    title: "Research Intern",
    company: "AI² Lab • MUJ",
    timeline: "Jan 2025 - Present",
    logo: "/ai2.webp",
  },
]

export function WorkExperience() {
  return (
    <div className="divide-y divide-border/20 border-y border-border/25">
      {EXPERIENCES.map((exp) => (
        <div
          key={`${exp.title}-${exp.company}`}
          className="group flex items-center justify-between py-2.5 sm:py-3 px-1 sm:px-2 -mx-1 sm:-mx-2 rounded-lg hover:bg-muted/15 transition-colors duration-150"
        >
          {/* Left: Round icon, Title, Company */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`size-6 sm:size-7 rounded-full overflow-hidden border border-border/40 shrink-0 flex items-center justify-center ${
                exp.bgWhite ? "bg-white p-0.5" : "bg-card"
              }`}
            >
              <img
                src={exp.logo}
                alt={exp.company}
                className="w-full h-full object-contain rounded-full"
              />
            </div>

            <div className="min-w-0 flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-foreground tracking-tight group-hover:text-foreground">
                {exp.title}
              </span>
              <span className="text-xs text-muted-foreground/35">·</span>
              <span className="text-xs text-muted-foreground truncate">
                {exp.company}
              </span>
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="shrink-0 text-right pl-3">
            <span className="text-xs font-mono text-muted-foreground/60 group-hover:text-muted-foreground/90 transition-colors">
              {exp.timeline}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
