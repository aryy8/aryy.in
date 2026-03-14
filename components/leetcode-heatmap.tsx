"use client"

import { useEffect, useRef, useState } from 'react';

interface HeatmapDay {
  count: number;
  date: Date;
}

export function LeetCodeHeatmap({ submissionCalendar }: { submissionCalendar?: Record<string, number> }) {
  const [loading, setLoading] = useState(true);
  const [weeks, setWeeks] = useState<HeatmapDay[][]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Generate the last 52 weeks of days in weekly columns
    const generateGrid = () => {
      const dots: HeatmapDay[] = [];
      const now = new Date();
      
      // Generate approximately 364 days (52 weeks)
      for (let i = 0; i < 364; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        // LeetCode calendar keys are UNIX seconds at UTC midnight
        const utcMidnightSeconds = Math.floor(
          Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 1000
        ).toString();
        const count = submissionCalendar?.[utcMidnightSeconds] || 0;
        dots.push({ count, date });
      }
      
      // Reverse to get chronological order and group by weeks
      dots.reverse();
      
      // Group into weeks (7 days each)
      const weeks: HeatmapDay[][] = [];
      for (let i = 0; i < dots.length; i += 7) {
        weeks.push(dots.slice(i, i + 7));
      }
      
      return weeks;
    };

    if (submissionCalendar && Object.keys(submissionCalendar).length > 0) {
      setWeeks(generateGrid());
    } else {
      setWeeks([]);
    }
    setLoading(false);
  }, [submissionCalendar]);

  useEffect(() => {
    if (!weeks.length) return;
    const el = scrollRef.current;
    if (!el) return;

    // Ensure DOM has painted before scrolling
    requestAnimationFrame(() => {
      el.scrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    });
  }, [weeks.length]);

  const getDotColor = (count: number) => {
    if (count === 0) return 'bg-muted/35'; // Empty - matches GitHub contribution grid
    if (count === 1) return 'bg-foreground/35'; // Low - matches GitHub level 1
    if (count <= 3) return 'bg-foreground/55'; // Medium - matches GitHub level 2
    if (count <= 5) return 'bg-foreground/75'; // High - matches GitHub level 3
    return 'bg-foreground'; // Max - matches GitHub level 4
  };

  if (loading) return (
    <div className="text-xs text-muted-foreground font-mono">Generating heatmap...</div>
  );

  if (!weeks.length) {
    return (
      <div className="text-xs text-muted-foreground font-mono">No activity data</div>
    );
  }

  const hasAnyActivity = weeks.some((week) => week.some((day) => day.count > 0))
  if (!hasAnyActivity) {
    return (
      <div className="text-xs text-muted-foreground font-mono">No activity data</div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground font-mono tracking-widest uppercase">
          Submission Activity
        </span>
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 3, 5, 10].map((lvl) => (
              <div key={lvl} className={`size-3 rounded-sm ${getDotColor(lvl)}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* The Grid - GitHub Style */}
      <div ref={scrollRef} className="overflow-x-auto pb-2 pr-2">
        <div className="inline-flex gap-[3px] pr-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  title={`${day.count} submissions on ${day.date.toLocaleDateString()}`}
                  className={`size-3 rounded-sm ${getDotColor(day.count)} transition-all hover:ring-2 hover:ring-foreground/40 cursor-pointer`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
