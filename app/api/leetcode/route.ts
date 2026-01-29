import { NextResponse } from "next/server"

type SubmissionCalendar = Record<string, number>

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username") || "aryy8"

  const query = `
    query userProfile($username: String!) {
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
      }
    }
  `

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": "https://leetcode.com",
        "Referer": "https://leetcode.com/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      // avoid caching stale stats
      cache: "no-store",
    })

    if (!res.ok) {
      return NextResponse.json({ status: "error" }, { status: res.status })
    }

    const json = await res.json()

    if (json?.errors?.length) {
      return NextResponse.json({ status: "error", errors: json.errors }, { status: 502 })
    }

    const matchedUser = json?.data?.matchedUser
    if (!matchedUser) {
      return NextResponse.json({ status: "error" }, { status: 404 })
    }

    const acSubmissionNum: Array<{ difficulty: string; count: number }> =
      matchedUser?.submitStatsGlobal?.acSubmissionNum || []

    const easySolved = acSubmissionNum.find((x) => x.difficulty === "Easy")?.count ?? 0
    const mediumSolved = acSubmissionNum.find((x) => x.difficulty === "Medium")?.count ?? 0
    const hardSolved = acSubmissionNum.find((x) => x.difficulty === "Hard")?.count ?? 0
    const totalSolved = easySolved + mediumSolved + hardSolved

    const allQuestionsCount: Array<{ difficulty: string; count: number }> = json?.data?.allQuestionsCount || []

    const totalQuestions = allQuestionsCount.find((x) => x.difficulty === "All")?.count ?? 0
    const totalEasy = allQuestionsCount.find((x) => x.difficulty === "Easy")?.count ?? 0
    const totalMedium = allQuestionsCount.find((x) => x.difficulty === "Medium")?.count ?? 0
    const totalHard = allQuestionsCount.find((x) => x.difficulty === "Hard")?.count ?? 0

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

    const calendarKeys = Object.keys(submissionCalendar).length
    const rawCalendarLength = typeof rawCalendar === "string" ? rawCalendar.length : null

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
      submissionCalendar,
      calendarKeys,
      rawCalendarLength,
    })
  } catch {
    return NextResponse.json({ status: "error" }, { status: 500 })
  }
}
