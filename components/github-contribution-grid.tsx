"use client"

import { Skeleton, readCache, writeCache } from "@/components/skeleton"
import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { cn } from "@/lib/utils"

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export function GitHubContributionGrid() {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [hoveredCoord, setHoveredCoord] = useState<{ week: number; day: number } | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const cached = readCache<any>("gh-contrib")
        const data = cached ?? (await (await fetch(`https://github-contributions-api.jogruber.de/v4/aryy8?y=last`)).json())
        if (!cached) writeCache("gh-contrib", data)

        setContributions(data.contributions ?? [])
        setTotalCount(data?.total?.lastYear ?? data?.total?.["lastYear"] ?? 0)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching GitHub data:", error)
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  useEffect(() => {
    if (loading) return
    const el = scrollRef.current
    if (!el) return

    requestAnimationFrame(() => {
      el.scrollLeft = Math.max(0, el.scrollWidth - el.clientWidth)
    })
  }, [loading, contributions?.length])

  const weeks: ContributionDay[][] = useMemo(() => {
    const res: ContributionDay[][] = []
    for (let i = 0; i < contributions.length; i += 7) {
      res.push(contributions.slice(i, i + 7))
    }
    return res
  }, [contributions])

  // Get active hovered day data
  const activeDay = useMemo(() => {
    if (!hoveredCoord || !weeks[hoveredCoord.week]) return null
    return weeks[hoveredCoord.week][hoveredCoord.day] || null
  }, [hoveredCoord, weeks])

  // Kinetic luminescence wave distance
  const getLuminescence = useCallback((w: number, d: number) => {
    if (!hoveredCoord) return 0
    const dx = w - hoveredCoord.week
    const dy = d - hoveredCoord.day
    const dist = Math.hypot(dx, dy)
    if (dist <= 3.2) {
      return Math.max(0, 1 - dist / 3.2)
    }
    return 0
  }, [hoveredCoord])

  // Pixel Cloud & Sky Horizon Palette:
  // Inspired by the cloud banner: deep azure, cobalt, cerulean, periwinkle, and soft sky blue
  const getCellColor = (level: number, luminescence: number) => {
    if (luminescence > 0) {
      switch (level) {
        case 0:
          return "bg-sky-300/35 scale-105"
        case 1:
          return "bg-sky-300/90 shadow-xs shadow-sky-300/40 scale-105 z-10"
        case 2:
          return "bg-sky-200 shadow-xs shadow-sky-200/50 scale-108 z-10"
        case 3:
          return "bg-sky-100 shadow-xs shadow-sky-100/60 scale-110 z-10"
        case 4:
          return "bg-slate-50 text-sky-950 shadow-xs shadow-sky-200/80 scale-110 z-10"
        default:
          return "bg-sky-200/40"
      }
    }

    switch (level) {
      case 0:
        return "bg-muted/20 dark:bg-zinc-900/80 hover:bg-muted/35"
      case 1:
        return "bg-blue-700/45 dark:bg-blue-600/40"
      case 2:
        return "bg-blue-600/75 dark:bg-sky-600/65"
      case 3:
        return "bg-sky-500 dark:bg-sky-500/85"
      case 4:
        return "bg-sky-400 dark:bg-sky-300 shadow-2xs shadow-sky-400/30"
      default:
        return "bg-muted/20"
    }
  }

  if (loading) {
    return (
      <div className="glass-card p-6 rounded-2xl border border-border/40" aria-busy="true">
        <Skeleton className="h-4 w-48 mb-4" />
        <Skeleton className="h-[104px] w-full" />
      </div>
    )
  }

  return (
    <div className="relative rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md p-5 sm:p-6 space-y-4 transition-all duration-300">
      {/* Header Row */}
      <div className="flex items-center justify-between pb-2 border-b border-border/30">
        <p className="text-sm font-mono text-muted-foreground">
          <span className="text-foreground font-semibold tracking-tight">{totalCount}</span> contributions
        </p>

        {/* Minimal Legend */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/50">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((lvl) => (
              <div key={lvl} className={cn("size-2.5 rounded-[2px]", getCellColor(lvl, 0))} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Tactile Cherry Blossom Grid */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pr-2 pb-1 scrollbar-none"
        onMouseLeave={() => setHoveredCoord(null)}
      >
        <div className="inline-flex gap-[3.5px] pr-2 pt-2">
          {weeks.map((week, wIndex) => (
            <div key={wIndex} className="flex flex-col gap-[3.5px]">
              {week.map((day, dIndex) => {
                const lum = getLuminescence(wIndex, dIndex)

                return (
                  <div
                    key={`${wIndex}-${dIndex}`}
                    onMouseEnter={() => setHoveredCoord({ week: wIndex, day: dIndex })}
                    className={cn(
                      "size-[11px] rounded-[2.5px] transition-all duration-150 cursor-pointer",
                      getCellColor(day.level, lum)
                    )}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Clean Status Row */}
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground/70 pt-1 min-h-[22px]">
        {activeDay ? (
          <div className="flex items-center gap-2 animate-fadeIn text-foreground">
            <span className="size-1.5 rounded-full bg-sky-400" />
            <span className="font-medium">{activeDay.date}</span>
            <span className="text-muted-foreground/40">—</span>
            <span className="font-semibold text-sky-400">
              {activeDay.count} {activeDay.count === 1 ? "contribution" : "contributions"}
            </span>
          </div>
        ) : (
          <span />
        )}

        <span className="text-[10px] text-muted-foreground/40 font-mono">github.com/aryy8</span>
      </div>
    </div>
  )
}
