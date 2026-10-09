import { NextResponse } from "next/server"

type SubmissionCalendar = Record<string, number>

interface ContestHistoryItem {
  attended: boolean
  trendDirection: string
  problemsSolved: number
  totalProblems: number
  finishTimeInSeconds: number
  rating: number
  ranking: number
  contest: {
    title: string
    startTime: number
  }
}

interface HistogramBar {
  userCount: number
  ratingStart: number
  ratingEnd: number
  topPercentage: number
}

interface BadgeItem {
  id: string
  displayName: string
  icon: string
  creationDate: string
}

const FALLBACK_CONTEST_DATA = {
  rating: 1754,
  globalRanking: 91852,
  totalParticipants: 887132,
  topPercentage: 10.56,
  attendedContestsCount: 1,
  badge: null,
  history: [
    {
      attended: true,
      trendDirection: "NONE",
      problemsSolved: 0,
      totalProblems: 4,
      finishTimeInSeconds: 0,
      rating: 1500,
      ranking: 0,
      contest: {
        title: "Weekly Contest 517",
        startTime: 1788057000,
      },
    },
    {
      attended: true,
      trendDirection: "NONE",
      problemsSolved: 0,
      totalProblems: 4,
      finishTimeInSeconds: 0,
      rating: 1500,
      ranking: 0,
      contest: {
        title: "Weekly Contest 518",
        startTime: 1788661800,
      },
    },
    {
      attended: true,
      trendDirection: "NONE",
      problemsSolved: 0,
      totalProblems: 4,
      finishTimeInSeconds: 0,
      rating: 1500,
      ranking: 0,
      contest: {
        title: "Biweekly Contest 191",
        startTime: 1789223400,
      },
    },
    {
      attended: true,
      trendDirection: "NONE",
      problemsSolved: 0,
      totalProblems: 4,
      finishTimeInSeconds: 0,
      rating: 1500,
      ranking: 0,
      contest: {
        title: "Weekly Contest 519",
        startTime: 1789266600,
      },
    },
    {
      attended: true,
      trendDirection: "NONE",
      problemsSolved: 0,
      totalProblems: 4,
      finishTimeInSeconds: 0,
      rating: 1500,
      ranking: 0,
      contest: {
        title: "Weekly Contest 520",
        startTime: 1789871400,
      },
    },
    {
      attended: true,
      trendDirection: "UP",
      problemsSolved: 3,
      totalProblems: 4,
      finishTimeInSeconds: 1216,
      rating: 1754.368,
      ranking: 1603,
      contest: {
        title: "Weekly Contest 522",
        startTime: 1791081000,
      },
    },
  ] as ContestHistoryItem[],
  histogram: [
    { userCount: 6062, ratingStart: 0, ratingEnd: 1200, topPercentage: 100 },
    { userCount: 6472, ratingStart: 1200, ratingEnd: 1250, topPercentage: 99.33 },
    { userCount: 15212, ratingStart: 1250, ratingEnd: 1300, topPercentage: 98.62 },
    { userCount: 34983, ratingStart: 1300, ratingEnd: 1350, topPercentage: 96.95 },
    { userCount: 77048, ratingStart: 1350, ratingEnd: 1400, topPercentage: 93.09 },
    { userCount: 201166, ratingStart: 1400, ratingEnd: 1450, topPercentage: 84.61 },
    { userCount: 159778, ratingStart: 1450, ratingEnd: 1500, topPercentage: 62.46 },
    { userCount: 109676, ratingStart: 1500, ratingEnd: 1550, topPercentage: 44.87 },
    { userCount: 75473, ratingStart: 1550, ratingEnd: 1600, topPercentage: 32.8 },
    { userCount: 54009, ratingStart: 1600, ratingEnd: 1650, topPercentage: 24.49 },
    { userCount: 39981, ratingStart: 1650, ratingEnd: 1700, topPercentage: 18.54 },
    { userCount: 30162, ratingStart: 1700, ratingEnd: 1750, topPercentage: 14.14 },
    { userCount: 22259, ratingStart: 1750, ratingEnd: 1800, topPercentage: 10.82 },
    { userCount: 17006, ratingStart: 1800, ratingEnd: 1850, topPercentage: 8.37 },
    { userCount: 16493, ratingStart: 1850, ratingEnd: 1900, topPercentage: 6.5 },
    { userCount: 11090, ratingStart: 1900, ratingEnd: 1950, topPercentage: 4.68 },
    { userCount: 7293, ratingStart: 1950, ratingEnd: 2000, topPercentage: 3.46 },
    { userCount: 5917, ratingStart: 2000, ratingEnd: 2050, topPercentage: 2.66 },
    { userCount: 3908, ratingStart: 2050, ratingEnd: 2100, topPercentage: 2.01 },
    { userCount: 3206, ratingStart: 2100, ratingEnd: 2150, topPercentage: 1.58 },
    { userCount: 2716, ratingStart: 2150, ratingEnd: 2200, topPercentage: 1.22 },
    { userCount: 1964, ratingStart: 2200, ratingEnd: 2250, topPercentage: 0.93 },
    { userCount: 6445, ratingStart: 2250, ratingEnd: 9950, topPercentage: 0.71 },
  ] as HistogramBar[],
}

const FALLBACK_BADGES: BadgeItem[] = [
  {
    id: "10670367",
    displayName: "100 Days Badge 2026",
    icon: "/100_lc.webp",
    creationDate: "2026-08-16",
  },
  {
    id: "9628940",
    displayName: "50 Days Badge 2026",
    icon: "/50_lc.webp",
    creationDate: "2026-03-02",
  },
  {
    id: "10834957",
    displayName: "Sep LeetCoding Challenge",
    icon: "/sep_lc.png",
    creationDate: "2026-09-30",
  },
  {
    id: "9616770",
    displayName: "Feb LeetCoding Challenge",
    icon: "/feb_lc.webp",
    creationDate: "2026-02-28",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username") || "aryy8"

  const query = `
    query userFullProfile($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        userCalendar {
          submissionCalendar
        }
        badges {
          id
          displayName
          icon
          creationDate
        }
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
        badge {
          name
        }
      }
      userContestRankingHistory(username: $username) {
        attended
        trendDirection
        problemsSolved
        totalProblems
        finishTimeInSeconds
        rating
        ranking
        contest {
          title
          startTime
        }
      }
      contestRatingHistogram {
        userCount
        ratingStart
        ratingEnd
        topPercentage
      }
      userProfileUserQuestionProgressV2(userSlug: $username) {
        numFailedQuestions {
          count
        }
      }
    }
  `

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://leetcode.com",
        Referer: "https://leetcode.com/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`LeetCode API returned ${res.status}`)
    }

    const json = await res.json()
    const data = json?.data

    const matchedUser = data?.matchedUser
    if (!matchedUser) {
      throw new Error("No user matched")
    }

    const acSubmissionNum: Array<{ difficulty: string; count: number }> =
      matchedUser?.submitStatsGlobal?.acSubmissionNum || []

    const easySolved = acSubmissionNum.find((x) => x.difficulty === "Easy")?.count ?? 72
    const mediumSolved = acSubmissionNum.find((x) => x.difficulty === "Medium")?.count ?? 93
    const hardSolved = acSubmissionNum.find((x) => x.difficulty === "Hard")?.count ?? 19
    const totalSolved = easySolved + mediumSolved + hardSolved

    const allQuestionsCount: Array<{ difficulty: string; count: number }> = data?.allQuestionsCount || []

    const totalQuestions = allQuestionsCount.find((x) => x.difficulty === "All")?.count ?? 4073
    const totalEasy = allQuestionsCount.find((x) => x.difficulty === "Easy")?.count ?? 969
    const totalMedium = allQuestionsCount.find((x) => x.difficulty === "Medium")?.count ?? 2124
    const totalHard = allQuestionsCount.find((x) => x.difficulty === "Hard")?.count ?? 980

    // Calendar
    const rawCalendar: unknown = matchedUser?.userCalendar?.submissionCalendar
    let submissionCalendar: SubmissionCalendar = {}
    if (typeof rawCalendar === "string" && rawCalendar) {
      try {
        submissionCalendar = JSON.parse(rawCalendar) as SubmissionCalendar
      } catch {
        submissionCalendar = {}
      }
    } else if (rawCalendar && typeof rawCalendar === "object") {
      submissionCalendar = rawCalendar as SubmissionCalendar
    }

    // Attempting count
    const failedQuestions: Array<{ count: number }> =
      data?.userProfileUserQuestionProgressV2?.numFailedQuestions || []
    const attempting = failedQuestions.reduce((acc, curr) => acc + (curr.count || 0), 0) || 1

    // Badges
    const rawBadges: BadgeItem[] = matchedUser?.badges || []
    const badges = rawBadges.length > 0 ? rawBadges : FALLBACK_BADGES

    // Contest Data
    const contestRanking = data?.userContestRanking
    const contestHistory: ContestHistoryItem[] = data?.userContestRankingHistory || FALLBACK_CONTEST_DATA.history
    const contestHistogram: HistogramBar[] = data?.contestRatingHistogram || FALLBACK_CONTEST_DATA.histogram

    const contest = {
      rating: contestRanking?.rating ? Math.round(contestRanking.rating) : FALLBACK_CONTEST_DATA.rating,
      exactRating: contestRanking?.rating ?? FALLBACK_CONTEST_DATA.rating,
      globalRanking: contestRanking?.globalRanking ?? FALLBACK_CONTEST_DATA.globalRanking,
      totalParticipants: contestRanking?.totalParticipants ?? FALLBACK_CONTEST_DATA.totalParticipants,
      topPercentage: contestRanking?.topPercentage ?? FALLBACK_CONTEST_DATA.topPercentage,
      attendedContestsCount: contestRanking?.attendedContestsCount ?? FALLBACK_CONTEST_DATA.attendedContestsCount,
      badge: contestRanking?.badge ?? null,
      history: contestHistory,
      histogram: contestHistogram,
    }

    return NextResponse.json({
      status: "ok",
      username,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      totalQuestions,
      totalEasy,
      totalMedium,
      totalHard,
      attempting,
      submissionCalendar,
      badges,
      contest,
    })
  } catch (err) {
    console.error("Falling back to cached stats for LeetCode:", err)
    // Fallback response guarantees UI never breaks
    return NextResponse.json({
      status: "ok",
      username,
      totalSolved: 184,
      easySolved: 72,
      mediumSolved: 93,
      hardSolved: 19,
      totalQuestions: 4073,
      totalEasy: 969,
      totalMedium: 2124,
      totalHard: 980,
      attempting: 1,
      submissionCalendar: {},
      badges: FALLBACK_BADGES,
      contest: FALLBACK_CONTEST_DATA,
    })
  }
}
