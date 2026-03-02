"use client"

import { useEffect, useState } from 'react';
import { LeetCodeHeatmap } from './leetcode-heatmap';

interface LeetCodeData {
  status?: string;
  totalSolved?: number;
  totalQuestions?: number;
  easySolved?: number;
  totalEasy?: number;
  mediumSolved?: number;
  totalMedium?: number;
  hardSolved?: number;
  totalHard?: number;
  submissionCalendar?: Record<string, number>;
}

export function LeetCodeStats({ username = "aryy8" }) {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/leetcode?username=${encodeURIComponent(username)}`)
      .then((res) => res.json())
      .then((data: LeetCodeData) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching LeetCode stats:", err);
        setLoading(false);
      });
  }, [username]);

  if (loading) return (
    <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm">
      <div className="p-4">
        <p className="text-sm text-muted-foreground font-mono">Loading...</p>
      </div>
    </div>
  );
  
  if (!data || data.status === "error") return (
    <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm">
      <div className="p-4">
        <p className="text-sm text-muted-foreground">Unable to load stats</p>
      </div>
    </div>
  );

  const difficulty = [
    { label: "Easy", shortLabel: "Easy", count: data.easySolved || 0, total: data.totalEasy || 0, color: "text-foreground", arc: "stroke-foreground/85" },
    { label: "Medium", shortLabel: "Med.", count: data.mediumSolved || 0, total: data.totalMedium || 0, color: "text-foreground", arc: "stroke-foreground/60" },
    { label: "Hard", shortLabel: "Hard", count: data.hardSolved || 0, total: data.totalHard || 0, color: "text-foreground", arc: "stroke-foreground/40" },
  ];

  const fallbackTotalQuestions = (data.totalEasy || 0) + (data.totalMedium || 0) + (data.totalHard || 0)
  const totalQuestions = data.totalQuestions || fallbackTotalQuestions || 0
  const totalSolved = data.totalSolved || 0

  const radius = 56
  const strokeWidth = 7
  const circumference = 2 * Math.PI * radius

  const safeTotal = totalQuestions > 0 ? totalQuestions : 1
  const progress = Math.min(Math.max(totalSolved / safeTotal, 0), 1)
  const progressLen = circumference * progress

  return (
    <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 transition-all duration-300">
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-4 items-center">
          <div className="flex items-center justify-center">
            <div className="relative size-[164px]">
              <svg viewBox="0 0 160 160" className="size-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  strokeWidth={strokeWidth}
                  className="stroke-muted/50"
                />
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={`${progressLen} ${Math.max(circumference - progressLen, 0)}`}
                  className="stroke-foreground/85"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-semibold text-foreground leading-none">
                  {totalSolved}
                  <span className="text-base text-muted-foreground font-normal">/{totalQuestions}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">Solved</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[auto_auto] gap-3 sm:gap-6 items-start justify-start">
            <div className="flex flex-col gap-2 w-full sm:w-[120px]">
              {difficulty.map((d) => (
                <div
                  key={d.label}
                  className="rounded-lg border border-border/50 bg-muted/20 px-2.5 py-2"
                >
                  <div className={`text-xs font-semibold ${d.color}`}>{d.shortLabel}</div>
                  <div className="text-lg font-semibold text-foreground leading-tight mt-0.5">
                    {d.count}
                    <span className="text-xs text-muted-foreground font-normal">/{d.total}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden sm:flex flex-row items-center justify-start pt-1 gap-3">
              <img
                src="/feb_lc.png"
                alt="LeetCode February Badge"
                className="size-20 object-contain opacity-90"
              />
              <img
                src="/50_lc.png"
                alt="LeetCode 50 Badge"
                className="size-20 object-contain opacity-90"
              />
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <LeetCodeHeatmap submissionCalendar={data.submissionCalendar} />
      </div>
    </div>
  );
}
