"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface AchievementItem {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  alt: string
}

const PRIMARY_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "iitm",
    title: "National Road Safety Hackathon Finalist",
    subtitle: "National Road Safety Hackathon 2025, IIT Madras",
    description:
      "Shortlisted among the top 10 finalist teams nationwide from 3.6k+ participants & presented at the National Road Safety Hackathon organised by COERs, IIT Madras.",
    image: "/iitm.webp",
    alt: "IIT Madras",
  },
  {
    id: "innovates",
    title: "India Innovates 2026 Finalist",
    subtitle: "India Innovates 2026, BHARAT MANDAPAM, NEW DELHI",
    description:
      "Shortlisted as the finalist from 25k+ participants in the World's Largest Civic Tech Hackathon at Bharat Mandapam, New Delhi organised by BYHN x MCD, in collaboration with DDU, IIT KGP, DTC, NSUT, GGSIPU.",
    image: "/HN logo-2.webp",
    alt: "India Innovates",
  },
  {
    id: "uniway",
    title: "UniWay Hackathon Winner",
    subtitle: "Uniway MUJ Hackathon 2025",
    description:
      "Secured 1st place, won a cash prize, and earned an opportunity to collaborate on a project with Southern Federal University, Russia.",
    image: "/uniway.webp",
    alt: "Uniway",
  },
]

const MORE_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "muj-student-excellence",
    title: "Student Excellence Awardee",
    subtitle: "Manipal University Jaipur, CSE dept 2025",
    description:
      "Awarded for outstanding technical performance, hackathon achievements, and project based innovation during the 3rd & 4th semester.",
    image: "/muj.webp",
    alt: "Manipal University Jaipur",
  },
  {
    id: "superteam",
    title: "Solana Bounty Winner",
    subtitle: "Superteam India, 2025",
    description:
      "Won a Solana bounty and became a Global Superteam Contributor within the Solana ecosystem.",
    image: "/superteam.webp",
    alt: "Superteam",
  },
  {
    id: "muj-deans-list",
    title: "Dean's List Awardee",
    subtitle: "Manipal University Jaipur, CSE dept 2025",
    description:
      "Named to the Dean's List in the 2nd semester for academic excellence.",
    image: "/muj.webp",
    alt: "Manipal University Jaipur",
  },
  {
    id: "ieeewie",
    title: "BrandIT 2.0 Winner",
    subtitle: "IEEE WIE MUJ, JUN 2025",
    description:
      "A social networking and community platform built for older adults, featuring VR Memory Lanes to relive personal memories, curated hobby circles, companion matching, and accessible games. Designed for emotional connection and digital inclusion — built and presented at BrandIT 2.0.",
    image: "/ieeewie.webp",
    alt: "IEEE WIE",
  },
  {
    id: "180dc",
    title: "Consultathon Winner",
    subtitle: "180 DC MUJ, April 2025",
    description:
      "Won the Consultathon organized by 180 DC MUJ — presented a scaling strategy for a vocational training social enterprise facing the challenge of expanding impact across India while preserving quality and financial sustainability.",
    image: "/180dc.webp",
    alt: "180 DC MUJ",
  },
]

export function Achievements() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="space-y-3">
      {/* Top 3 Achievements: IIT Madras, India Innovates, UniWay */}
      {PRIMARY_ACHIEVEMENTS.map((item) => (
        <Card key={item.id} className="glass-card group hover:border-foreground/40">
          <CardContent className="p-5">
            <div className="flex items-start gap-5">
              <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                <img src={item.image} alt={item.alt} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{item.subtitle}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Minimal View More Bar with remaining achievement icons visible */}
      {!isExpanded ? (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-border/25 bg-secondary/10 hover:bg-secondary/25 hover:border-border/50 transition-all duration-200 group text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            {/* Minimal Icons of the remaining achievements */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {MORE_ACHIEVEMENTS.map((item) => (
                <div
                  key={item.id}
                  className="size-7 rounded-md overflow-hidden border border-border/30 bg-muted/20 flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                  title={`${item.title} — ${item.subtitle}`}
                >
                  <img src={item.image} alt={item.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
              +{MORE_ACHIEVEMENTS.length} more
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
            <span>View More</span>
            <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
          </div>
        </button>
      ) : (
        /* Expanded View: All remaining achievements displayed in full */
        <div className="space-y-3">
          {MORE_ACHIEVEMENTS.map((item) => (
            <Card key={item.id} className="glass-card group hover:border-foreground/40">
              <CardContent className="p-5">
                <div className="flex items-start gap-5">
                  <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                    <img src={item.image} alt={item.alt} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{item.subtitle}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Minimal Show Less Button */}
          <div className="pt-1 text-center">
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false)
                document.getElementById("achievements")?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors py-1.5 px-3 rounded-full border border-border/30 hover:border-border/60 bg-secondary/10 hover:bg-secondary/25 cursor-pointer"
            >
              <span>Show Less</span>
              <ChevronUp className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
