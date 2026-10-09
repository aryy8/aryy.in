"use client"

import { useEffect, useState, useId } from 'react';
import { LeetCodeHeatmap } from './leetcode-heatmap';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContestHistoryItem {
  attended: boolean;
  trendDirection: string;
  problemsSolved: number;
  totalProblems: number;
  finishTimeInSeconds: number;
  rating: number;
  ranking: number;
  contest: {
    title: string;
    startTime: number;
  };
}

interface HistogramBar {
  userCount: number;
  ratingStart: number;
  ratingEnd: number;
  topPercentage: number;
}

interface ContestData {
  rating: number;
  exactRating?: number;
  globalRanking: number;
  totalParticipants: number;
  topPercentage: number;
  attendedContestsCount: number;
  history?: ContestHistoryItem[];
  histogram?: HistogramBar[];
}

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
  attempting?: number;
  badges?: Array<{
    id: string;
    displayName: string;
    icon: string;
    creationDate: string;
  }>;
  contest?: ContestData;
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

interface RatingChartProps {
  history: ContestHistoryItem[];
  currentRating: number;
}

function ContestRatingChart({ history, currentRating }: RatingChartProps) {
  const gradientId = useId();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG dimensions
  const width = 420;
  const height = 95;
  const padLeft = 14;
  const padRight = 44; // Room for tooltip pill on right
  const padTop = 26;   // Room for tooltip pill above point
  const padBottom = 16;
  const usableWidth = width - padLeft - padRight;
  const usableHeight = height - padTop - padBottom;

  // If no history, render single level line
  const historyData = history && history.length > 0 ? history : [
    {
      attended: true,
      trendDirection: "NONE",
      problemsSolved: 0,
      totalProblems: 4,
      finishTimeInSeconds: 0,
      rating: 1500,
      ranking: 0,
      contest: { title: "Base Rating", startTime: 1788057000 },
    },
    {
      attended: true,
      trendDirection: "UP",
      problemsSolved: 3,
      totalProblems: 4,
      finishTimeInSeconds: 1216,
      rating: currentRating,
      ranking: 1603,
      contest: { title: "Weekly Contest", startTime: 1791081000 },
    },
  ];

  const minTime = historyData[0].contest.startTime;
  const maxTime = historyData[historyData.length - 1].contest.startTime;
  const timeSpan = maxTime - minTime || 1;

  const minRating = 1440;
  const maxRating = Math.max(1820, ...historyData.map((d) => d.rating)) + 30;
  const ratingSpan = maxRating - minRating;

  // Calculate coordinates
  const points = historyData.map((item, index) => {
    const fractionX = historyData.length === 1 ? 0.5 : (item.contest.startTime - minTime) / timeSpan;
    const x = padLeft + fractionX * usableWidth;
    const fractionY = (item.rating - minRating) / ratingSpan;
    const y = padTop + (1 - fractionY) * usableHeight;
    return { x, y, item, index };
  });

  // Construct SVG path line
  const linePath = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, "");

  // Gradient area fill
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${height - padBottom} L ${points[0].x} ${height - padBottom} Z`
    : "";

  // Active point (either hovered point or the latest contest point)
  const activePoint = hoveredIdx !== null && points[hoveredIdx]
    ? points[hoveredIdx]
    : points[points.length - 1];

  // Date labels
  const startDateLabel = new Date(minTime * 1000).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const endDateLabel = new Date(maxTime * 1000).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const displayRating = activePoint ? Math.round(activePoint.item.rating).toLocaleString() : currentRating.toLocaleString();

  // Clamp pill X within viewBox bounds
  const pillW = 44;
  const pillH = 20;
  const pillX = activePoint ? Math.min(width - pillW / 2 - 4, Math.max(pillW / 2 + 4, activePoint.x)) : 0;
  const pillY = activePoint ? activePoint.y - 25 : 0;

  return (
    <div className="w-full flex flex-col justify-end">
      <div className="relative w-full overflow-visible">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-[95px] overflow-visible select-none"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffa116" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ffa116" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area under curve */}
          {areaPath && (
            <path d={areaPath} fill={`url(#${gradientId})`} />
          )}

          {/* Golden Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#ffa116"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Invisible hover targets for each contest */}
          {points.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="14"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
            />
          ))}

          {/* Active / Highlighted Point & Tooltip Badge */}
          {activePoint && (
            <g className="transition-all duration-150">
              {/* White dot with orange stroke at the vertex */}
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="3.5"
                fill="#ffffff"
                stroke="#ffa116"
                strokeWidth="2"
              />

              {/* Callout Tooltip Pill above the dot */}
              <g transform={`translate(${pillX}, ${pillY})`}>
                <rect
                  x={-pillW / 2}
                  y={0}
                  width={pillW}
                  height={pillH}
                  rx="4"
                  fill="#252525"
                  stroke="#484848"
                  strokeWidth="0.8"
                />
                {/* Downward triangle pointer caret */}
                <path
                  d={`M ${activePoint.x - pillX - 3.5} ${pillH} L ${activePoint.x - pillX} ${pillH + 4} L ${activePoint.x - pillX + 3.5} ${pillH} Z`}
                  fill="#252525"
                />
                <text
                  x="0"
                  y="14"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="600"
                  className="font-mono tracking-tight"
                >
                  {displayRating}
                </text>
              </g>
            </g>
          )}
        </svg>

        {/* Hover Information Banner when interacting */}
        {hoveredIdx !== null && points[hoveredIdx] && (
          <div className="absolute top-0 right-0 text-[10px] sm:text-xs text-muted-foreground bg-background/80 backdrop-blur-xs px-2 py-0.5 rounded border border-border/40 pointer-events-none">
            <span className="font-semibold text-foreground">{points[hoveredIdx].item.contest.title}</span>
            {points[hoveredIdx].item.ranking > 0 && (
              <span className="ml-1.5 text-muted-foreground">· Rank #{points[hoveredIdx].item.ranking}</span>
            )}
            {points[hoveredIdx].item.problemsSolved > 0 && (
              <span className="ml-1.5 text-[#ffa116]">· Solved {points[hoveredIdx].item.problemsSolved}/4</span>
            )}
          </div>
        )}
      </div>

      {/* Date Labels below chart */}
      <div className="flex justify-between items-center text-xs text-muted-foreground/70 font-medium px-1 mt-1">
        <span>{startDateLabel}</span>
        <span>{endDateLabel}</span>
      </div>
    </div>
  );
}

interface RatingDistributionProps {
  histogram: HistogramBar[];
  userRating: number;
  topPercentage: number;
}

function RatingDistribution({ histogram, userRating, topPercentage }: RatingDistributionProps) {
  const maxUserCount = Math.max(...histogram.map((b) => b.userCount), 1);

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Top Percentile Label */}
      <div>
        <div className="text-xs text-muted-foreground font-medium">Top</div>
        <div className="text-2xl sm:text-3xl font-bold text-foreground leading-tight tracking-tight mt-0.5">
          {topPercentage.toFixed(2)}%
        </div>
      </div>

      {/* Bell Curve Histogram Bars */}
      <div className="mt-4 pt-1">
        <div className="flex items-end gap-[3px] sm:gap-[4px] h-[72px] sm:h-[80px] w-full px-0.5">
          {histogram.map((bar, i) => {
            const isUserBar =
              userRating >= bar.ratingStart &&
              (bar.ratingEnd < 9000 ? userRating < bar.ratingEnd : true);
            const heightPercent = Math.max(6, (bar.userCount / maxUserCount) * 100);

            return (
              <div
                key={i}
                className="relative group/bar flex-1 h-full flex items-end justify-center cursor-pointer"
              >
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={cn(
                    "w-full rounded-t-[2px] transition-all duration-200",
                    isUserBar
                      ? "bg-[#ffa116] shadow-[0_0_8px_rgba(255,161,22,0.45)]"
                      : "bg-muted-foreground/25 hover:bg-muted-foreground/50"
                  )}
                />

                {/* Interactive Tooltip on hover */}
                <div className="absolute bottom-full mb-2 hidden group-hover/bar:flex flex-col items-center z-30 pointer-events-none whitespace-nowrap">
                  <div className="bg-popover/95 backdrop-blur-sm border border-border/60 text-foreground text-[10px] sm:text-xs rounded-md px-2.5 py-1.5 shadow-lg">
                    <div className="font-bold text-[#ffa116]">
                      {bar.ratingEnd >= 9000 ? `Rating ≥ ${bar.ratingStart}` : `${bar.ratingStart} - ${bar.ratingEnd}`}
                    </div>
                    <div className="text-muted-foreground text-[10px] mt-0.5">
                      {bar.userCount.toLocaleString()} users ({bar.topPercentage.toFixed(2)}%)
                    </div>
                    {isUserBar && (
                      <div className="text-[#ffa116] font-bold text-[10px] mt-0.5 border-t border-border/40 pt-0.5">
                        Your Rating: {userRating.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Baseline underneath bars */}
        <div className="w-full h-px bg-border/40 mt-1" />
      </div>
    </div>
  );
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
  const totalEasy = data.totalEasy || 969;
  const totalMedium = data.totalMedium || 2124;
  const totalHard = data.totalHard || 980;
  const attempting = data.attempting ?? 1;

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

  // Contest stats
  const contest = data.contest;
  const contestRating = contest?.rating ?? 1754;
  const globalRanking = contest?.globalRanking ?? 91852;
  const totalParticipants = contest?.totalParticipants ?? 887132;
  const attendedCount = contest?.attendedContestsCount ?? 1;
  const topPercentage = contest?.topPercentage ?? 10.56;
  const contestHistory = contest?.history ?? [];
  const contestHistogram = contest?.histogram ?? [];

  // Badges count
  const badgesCount = data.badges?.length || 4;

  return (
    <div className="bg-background rounded-xl border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 transition-all duration-300">
      <div className="p-4 sm:p-5 space-y-4">
        {/* Top Full-Width Card: Contest Rating Section */}
        <div className="bg-muted/15 border border-border/40 rounded-xl p-4 sm:p-5 transition-colors hover:border-border/70">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            {/* Left Column (Stats Header & Rating Line Chart) */}
            <div className="md:col-span-7 flex flex-col justify-between">
              {/* Header: Contest Rating, Global Ranking, Attended */}
              <div className="flex items-start justify-between sm:justify-start sm:gap-8 flex-wrap mb-3">
                <div>
                  <div className="text-xs text-muted-foreground font-medium">Contest Rating</div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground leading-tight tracking-tight mt-0.5 font-mono">
                    {contestRating.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground font-medium">Global Ranking</div>
                  <div className="text-sm sm:text-base font-bold text-foreground mt-1">
                    {globalRanking.toLocaleString()}
                    <span className="text-xs text-muted-foreground/75 font-normal">
                      /{totalParticipants.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground font-medium">Attended</div>
                  <div className="text-sm sm:text-base font-bold text-foreground mt-1">
                    {attendedCount}
                  </div>
                </div>
              </div>

              {/* Rating Line Chart */}
              <ContestRatingChart history={contestHistory} currentRating={contestRating} />
            </div>

            {/* Right Column (Top % & Rating Distribution Histogram) */}
            <div className="md:col-span-5 md:border-l border-border/40 md:pl-6 pt-3 md:pt-0 border-t md:border-t-0">
              <RatingDistribution
                histogram={contestHistogram}
                userRating={contestRating}
                topPercentage={topPercentage}
              />
            </div>
          </div>
        </div>

        {/* Official LeetCode Layout: 2 Side-by-Side Cards (Solved & Badges) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Authentic Tri-Color Solved Gauge & Stacked Difficulty Boxes */}
          <div className="bg-muted/15 border border-border/40 rounded-xl p-4 sm:p-5 flex flex-row items-center justify-between gap-3 sm:gap-4 transition-colors hover:border-border/70">
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
                <span className="font-bold text-foreground">{attempting}</span> Attempting
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
          <div className="bg-muted/15 border border-border/40 rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-3 transition-colors hover:border-border/70">
            {/* Top Info: Badges count + Profile Link */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground font-medium">Badges</div>
                <div className="text-2xl font-bold text-foreground leading-tight">{badgesCount}</div>
              </div>
              <a
                href={`https://leetcode.com/u/${username}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-muted-foreground/60 hover:text-foreground transition-colors rounded-md hover:bg-muted/40"
                title="View on LeetCode"
              >
                <ArrowRight className="size-4" />
              </a>
            </div>

            {/* Center: Featured Badges row */}
            <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 py-1">
              <div className="relative group/badge" title="50 Days Badge 2026">
                <img
                  src="/50_lc.webp"
                  alt="LeetCode 50 Badge"
                  className="size-13 sm:size-15 object-contain opacity-95 transition-transform duration-200 group-hover:scale-110"
                />
              </div>
              <div className="relative group/badge" title="100 Days Badge 2026">
                <img
                  src="/100_lc.webp"
                  alt="LeetCode 100 Badge"
                  className="size-16 sm:size-18 object-contain opacity-95 transition-transform duration-200 group-hover:scale-110"
                />
              </div>
              <div className="relative group/badge" title="Sep LeetCoding Challenge">
                <img
                  src="/sep_lc.png"
                  alt="Sep LeetCoding Challenge Badge"
                  className="size-13 sm:size-15 object-contain opacity-95 transition-transform duration-200 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Bottom Info: Most Recent Badge */}
            <div>
              <div className="text-xs text-muted-foreground font-medium">Most Recent Badge</div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">100 Days Badge 2026</div>
            </div>
          </div>
        </div>

        {/* Heatmap Section */}
        <LeetCodeHeatmap submissionCalendar={data.submissionCalendar} />
      </div>
    </div>
  );
}
