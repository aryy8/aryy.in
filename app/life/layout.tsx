import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: "Life — Aryan Rastogi" },
  description:
    "Notes from the road so far: school, Manipal, hackathons, first wins, Sylus AI, and the products I'm building.",
  alternates: { canonical: "https://www.aryy.in/life" },
}

export default function LifeLayout({ children }: { children: React.ReactNode }) {
  return children
}
