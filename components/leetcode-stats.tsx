"use client"

import { useEffect, useState } from 'react';
import { LeetCodeHeatmap } from './leetcode-heatmap';
import { Check } from 'lucide-react';

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

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  if (endAngle <= startAngle) endAngle = startAngle + 0.1;
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
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
    { label: "Easy", shortLabel: "Easy", count: data.easySolved || 0, total: data.totalEasy || 0, color: "text-[#00b8a3]" },
    { label: "Medium", shortLabel: "Med.", count: data.mediumSolved || 0, total: data.totalMedium || 0, color: "text-[#ffc01e]" },
    { label: "Hard", shortLabel: "Hard", count: data.hardSolved || 0, total: data.totalHard || 0, color: "text-[#ff375f]" },
  ];

  const totalQuestions = data.totalQuestions || (data.totalEasy || 0) + (data.totalMedium || 0) + (data.totalHard || 0) || 1;
  const totalSolved = data.totalSolved || 0;
  const totalEasy = data.totalEasy || 956;
  const totalMedium = data.totalMedium || 2092;
  const totalHard = data.totalHard || 957;

  // Exact LeetCode Ring Geometry (Symmetric bottom endpoints)
  const cx = 80;
  const cy = 80;
  const r = 62;

  const totalSpan = 270; // 270-degree arc symmetrically centered over top
  const startAngle = 225; // Bottom-left start (225° and 495°/135° are horizontally level)
  const gap = 3;

  const easySpan = (totalEasy / totalQuestions) * totalSpan;
  const medSpan = (totalMedium / totalQuestions) * totalSpan;
  const hardSpan = (totalHard / totalQuestions) * totalSpan;

  // 1. Easy Segment (Bottom-left to left-mid)
  const easyStart = startAngle;
  const easyEnd = easyStart + easySpan - gap;
  const easyRatio = Math.min((data.easySolved || 0) / totalEasy, 1);
  const easyActiveEnd = easyStart + (easySpan - gap) * Math.max(easyRatio, 0.03);
  const easyCap = polarToCartesian(cx, cy, r, easyActiveEnd);

  // 2. Medium Segment (Left-mid over top to upper-right)
  const medStart = easyStart + easySpan;
  const medEnd = medStart + medSpan - gap;
  const medRatio = Math.min((data.mediumSolved || 0) / totalMedium, 1);
  const medActiveEnd = medStart + (medSpan - gap) * Math.max(medRatio, 0.03);
  const medCap = polarToCartesian(cx, cy, r, medActiveEnd);

  // 3. Hard Segment (Upper-right to bottom-right)
  const hardStart = medStart + medSpan;
  const hardEnd = hardStart + hardSpan - gap;
  const hardRatio = Math.min((data.hardSolved || 0) / totalHard, 1);
  const hardActiveEnd = hardStart + (hardSpan - gap) * Math.max(hardRatio, 0.03);
  const hardCap = polarToCartesian(cx, cy, r, hardActiveEnd);

  return (
    <div className="bg-background rounded-xl border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 transition-all duration-300">
      <div className="p-4 sm:p-5 space-y-5">
        {/* Official LeetCode Layout: 2 Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Authentic Tri-Color Solved Gauge & Stacked Difficulty Boxes */}
          <div className="bg-muted/15 border border-border/40 rounded-xl p-4 sm:p-5 flex flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Tri-Color Donut Gauge Arc */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <div className="relative size-[135px] sm:size-[150px]">
                <svg viewBox="0 0 160 160" className="size-full">
                  {/* Background Track Arcs */}
                  <path d={describeArc(cx, cy, r, easyStart, easyEnd)} fill="none" stroke="#1c3d37" strokeWidth="5.5" strokeLinecap="round" />
                  <path d={describeArc(cx, cy, r, medStart, medEnd)} fill="none" stroke="#3b321c" strokeWidth="5.5" strokeLinecap="round" />
                  <path d={describeArc(cx, cy, r, hardStart, hardEnd)} fill="none" stroke="#3d1c22" strokeWidth="5.5" strokeLinecap="round" />

                  {/* Active Solved Progress Arcs */}
                  {easyRatio > 0 && (
                    <path d={describeArc(cx, cy, r, easyStart, easyActiveEnd)} fill="none" stroke="#00b8a3" strokeWidth="5.5" strokeLinecap="round" />
                  )}
                  {medRatio > 0 && (
                    <path d={describeArc(cx, cy, r, medStart, medActiveEnd)} fill="none" stroke="#ffc01e" strokeWidth="5.5" strokeLinecap="round" />
                  )}
                  {hardRatio > 0 && (
                    <path d={describeArc(cx, cy, r, hardStart, hardActiveEnd)} fill="none" stroke="#ff375f" strokeWidth="5.5" strokeLinecap="round" />
                  )}

                  {/* Circular Cap Dots */}
                  {easyRatio > 0 && <circle cx={easyCap.x} cy={easyCap.y} r="4" fill="#00b8a3" />}
                  {medRatio > 0 && <circle cx={medCap.x} cy={medCap.y} r="4" fill="#ffc01e" />}
                  {hardRatio > 0 && <circle cx={hardCap.x} cy={hardCap.y} r="4" fill="#ff375f" />}
                </svg>

                {/* Center Content: Solved Stats */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pb-2">
                  <div className="text-2xl sm:text-3xl font-bold text-foreground leading-none tracking-tight">
                    {totalSolved}
                    <span className="text-xs sm:text-sm text-muted-foreground/80 font-normal">/{totalQuestions}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#00b8a3] font-medium mt-1.5">
                    <Check className="size-3.5 stroke-[3]" />
                    <span>Solved</span>
                  </div>
                </div>
              </div>

              {/* Attempting footer label */}
              <div className="text-xs text-muted-foreground/90 font-medium text-center -mt-1">
                <span className="font-bold text-foreground">0</span> Attempting
              </div>
            </div>

            {/* 3 Stacked Difficulty Boxes (Easy, Med., Hard) */}
            <div className="flex flex-col gap-2 shrink-0">
              {difficulty.map((d) => (
                <div
                  key={d.label}
                  className="bg-muted/30 border border-border/40 rounded-xl px-4 py-2 text-center flex flex-col items-center justify-center min-w-[95px] sm:min-w-[110px]"
                >
                  <div className={`text-xs font-bold ${d.color}`}>{d.shortLabel}</div>
                  <div className="text-xs sm:text-sm font-bold text-foreground mt-0.5">
                    {d.count}
                    <span className="text-[10px] text-muted-foreground font-normal">/{d.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Badges Block */}
          <div className="bg-muted/15 border border-border/40 rounded-xl p-4 flex flex-col justify-between gap-3">
            {/* Top Info: Badges count */}
            <div>
              <div className="text-xs text-muted-foreground font-medium">Badges</div>
              <div className="text-2xl font-bold text-foreground leading-tight">2</div>
            </div>

            {/* Center: Badges row */}
            <div className="flex flex-row items-center justify-center gap-4 py-1">
              <img
                src="/feb_lc.webp"
                alt="LeetCode February Badge"
                className="size-14 sm:size-16 object-contain opacity-95 transition-transform hover:scale-105"
              />
              <img
                src="/50_lc.webp"
                alt="LeetCode 50 Badge"
                className="size-14 sm:size-16 object-contain opacity-95 transition-transform hover:scale-105"
              />
            </div>

            {/* Bottom Info: Most Recent Badge */}
            <div>
              <div className="text-xs text-muted-foreground font-medium">Most Recent Badge</div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">50 Days Badge 2026</div>
            </div>
          </div>
        </div>

        {/* Heatmap Section */}
        <LeetCodeHeatmap submissionCalendar={data.submissionCalendar} />
      </div>
    </div>
  );
}
