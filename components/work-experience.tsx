"use client"

type Role = {
  title: string
  timeline: string
}

type CompanyExperience = {
  company: string
  totalDuration?: string
  logo: string
  bgWhite?: boolean
  roles: Role[]
}

const EXPERIENCES: CompanyExperience[] = [
  {
    company: "Sylus AI",
    logo: "/sylusai.webp",
    roles: [
      {
        title: "AI Product Lead",
        timeline: "Nov 2026 - Present",
      },
      {
        title: "AI Engineer",
        timeline: "Apr - Sep 2026",
      },
    ],
  },
  {
    company: "Hewlett Packard Enterprise",
    logo: "/hpe.webp",
    bgWhite: true,
    roles: [
      {
        title: "CPP-2",
        timeline: "Aug 2026 - Present",
      },
    ],
  },
  {
    company: "Amazon",
    logo: "/amazon_logo.webp",
    roles: [
      {
        title: "Amazon ML Summer School",
        timeline: "Jul - Aug 2026",
      },
    ],
  },
  {
    company: "Southern Federal University (ICTIS)",
    logo: "/sfedu.webp",
    roles: [
      {
        title: "SDE Intern",
        timeline: "Oct - Nov 2025",
      },
    ],
  },
  {
    company: "Elumina Street Solutions",
    logo: "/elumina.webp",
    roles: [
      {
        title: "AI R&D Intern",
        timeline: "Apr - Jul 2025",
      },
    ],
  },
  {
    company: "AI² Lab • MUJ",
    logo: "/ai2.webp",
    roles: [
      {
        title: "Research Intern",
        timeline: "Jan 2025 - Present",
      },
    ],
  },
]

export function WorkExperience() {
  return (
    <div className="divide-y divide-border/20 border-y border-border/25">
      {EXPERIENCES.map((item) => {
        const isMultiRole = item.roles.length > 1

        if (isMultiRole) {
          return (
            <div
              key={item.company}
              className="py-3 px-1 sm:px-2 -mx-1 sm:-mx-2 rounded-lg hover:bg-muted/10 transition-colors"
            >
              {/* Company Header with circular logo */}
              <div className="flex items-center gap-3 mb-2.5">
                <div
                  className={`size-7 sm:size-8 rounded-full overflow-hidden border border-border/40 shrink-0 flex items-center justify-center p-0.5 ${
                    item.bgWhite ? "bg-white" : "bg-card"
                  }`}
                >
                  <img
                    src={item.logo}
                    alt={item.company}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground tracking-tight leading-tight">
                    {item.company}
                  </h3>
                  {item.totalDuration && (
                    <p className="text-xs font-mono text-muted-foreground/60 leading-tight mt-0.5">
                      {item.totalDuration}
                    </p>
                  )}
                </div>
              </div>

              {/* Nested timeline with track and dots */}
              <div className="relative pl-5 sm:pl-6 ml-3.5 sm:ml-4 space-y-2.5">
                {/* Vertical connecting line */}
                <div className="absolute left-0 top-2 bottom-2 w-px bg-border/60" />

                {item.roles.map((role, idx) => (
                  <div key={idx} className="relative group/role">
                    {/* Circle Node */}
                    <div className="absolute -left-[23.5px] sm:-left-[27.5px] top-1.5 size-2 rounded-full bg-muted-foreground/40 ring-4 ring-background group-hover/role:bg-primary transition-colors" />

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-normal text-muted-foreground group-hover/role:text-foreground tracking-tight transition-colors">
                        {role.title}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground/60 shrink-0">
                        {role.timeline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }

        // Single role entry (compact)
        const role = item.roles[0]
        return (
          <div
            key={`${role.title}-${item.company}`}
            className="group flex items-center justify-between py-2.5 sm:py-3 px-1 sm:px-2 -mx-1 sm:-mx-2 rounded-lg hover:bg-muted/15 transition-colors duration-150"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`size-6 sm:size-7 rounded-full overflow-hidden border border-border/40 shrink-0 flex items-center justify-center ${
                  item.bgWhite ? "bg-white p-0.5" : "bg-card"
                }`}
              >
                <img
                  src={item.logo}
                  alt={item.company}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              <div className="min-w-0 flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-foreground tracking-tight group-hover:text-foreground">
                  {role.title}
                </span>
                <span className="text-xs text-muted-foreground/35">·</span>
                <span className="text-xs text-muted-foreground truncate">
                  {item.company}
                </span>
              </div>
            </div>

            <div className="shrink-0 text-right pl-3">
              <span className="text-xs font-mono text-muted-foreground/60 group-hover:text-muted-foreground/90 transition-colors">
                {role.timeline}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
