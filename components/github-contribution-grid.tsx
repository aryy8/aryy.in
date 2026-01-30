"use client"

import { useEffect, useRef, useState } from "react"

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export function GitHubContributionGrid() {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/aryy8?y=last`)
        const data = await response.json()

        setContributions(data.contributions)
        setTotalCount(data.total.lastYear || 0)
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
  }, [loading, contributions.length])

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-muted/35"
      case 1:
        return "bg-foreground/35"
      case 2:
        return "bg-foreground/55"
      case 3:
        return "bg-foreground/75"
      case 4:
        return "bg-foreground"
      default:
        return "bg-muted/35"
    }
  }

  const weeks: ContributionDay[][] = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }

  if (loading) {
    return (
      <div className="glass-card p-6 rounded-xl">
        <p className="text-sm text-muted-foreground">Loading GitHub activity...</p>
      </div>
    )
  }

  return (
    <div className="glass-card p-6 rounded-xl space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-semibold">{totalCount}</span> contributions in the last year by{" "}
          <span className="text-foreground font-semibold">aryy8</span>
        </p>
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className={`size-3 rounded-sm ${getLevelColor(level)}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      <div ref={scrollRef} className="overflow-x-auto pr-2">
        <div className="inline-flex gap-[3px] pr-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`size-3 rounded-sm ${getLevelColor(day.level)} transition-all hover:ring-2 hover:ring-foreground/40 cursor-pointer`}
                  title={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
