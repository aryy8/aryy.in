"use client"

type AchievementItem = {
  id: string
  title: string
  organization: string
  timeline: string
  image: string
  alt: string
  bgWhite?: boolean
}

const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "iitm",
    title: "National Road Safety Hackathon Finalist",
    organization: "IIT Madras (Top 10 Finalist)",
    timeline: "2025",
    image: "/iitm.webp",
    alt: "IIT Madras",
  },
  {
    id: "innovates",
    title: "India Innovates 2026 Finalist",
    organization: "Bharat Mandapam • New Delhi",
    timeline: "2026",
    image: "/HN logo-2.webp",
    alt: "India Innovates",
  },
  {
    id: "uniway",
    title: "UniWay Hackathon Winner",
    organization: "Uniway MUJ (1st Place)",
    timeline: "2025",
    image: "/uniway.webp",
    alt: "Uniway",
  },
  {
    id: "muj-student-excellence",
    title: "Student Excellence Awardee",
    organization: "Manipal University Jaipur, CSE",
    timeline: "2025",
    image: "/muj.webp",
    alt: "MUJ",
  },
  {
    id: "superteam",
    title: "Solana Bounty Winner",
    organization: "Superteam India",
    timeline: "2025",
    image: "/superteam.webp",
    alt: "Superteam",
  },
  {
    id: "muj-deans-list",
    title: "Dean's List Awardee",
    organization: "Manipal University Jaipur",
    timeline: "2025",
    image: "/muj.webp",
    alt: "MUJ",
  },
  {
    id: "ieeewie",
    title: "BrandIT 2.0 Winner",
    organization: "IEEE WIE MUJ",
    timeline: "2025",
    image: "/ieeewie.webp",
    alt: "IEEE WIE",
  },
  {
    id: "180dc",
    title: "Consultathon Winner",
    organization: "180 DC MUJ",
    timeline: "2025",
    image: "/180dc.webp",
    alt: "180 DC MUJ",
  },
]

export function Achievements() {
  return (
    <div className="divide-y divide-border/20 border-y border-border/25">
      {ACHIEVEMENTS.map((item) => (
        <div
          key={item.id}
          className="group flex items-center justify-between py-2.5 sm:py-3 px-1 sm:px-2 -mx-1 sm:-mx-2 rounded-lg hover:bg-muted/15 transition-colors duration-150"
        >
          {/* Left: Small round icon, Title, Organization */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`size-6 sm:size-7 rounded-full overflow-hidden border border-border/40 shrink-0 flex items-center justify-center ${
                item.bgWhite ? "bg-white p-0.5" : "bg-card"
              }`}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-contain rounded-full"
              />
            </div>

            <div className="min-w-0 flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-foreground tracking-tight group-hover:text-foreground">
                {item.title}
              </span>
              <span className="text-xs text-muted-foreground/35">·</span>
              <span className="text-xs text-muted-foreground truncate">
                {item.organization}
              </span>
            </div>
          </div>

          {/* Right: Year / Timeline */}
          <div className="shrink-0 text-right pl-3">
            <span className="text-xs font-mono text-muted-foreground/60 group-hover:text-muted-foreground/90 transition-colors">
              {item.timeline}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
