"use client"

import { SectionHeader } from "@/components/section-header"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LifePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

      <div className="relative z-10 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Dashed guide rails */}
        <div className="absolute inset-y-0 left-4 sm:left-6 lg:left-12 right-4 sm:right-6 lg:right-12 pointer-events-none">
          <div className="max-w-3xl mx-auto h-full border-x-[1.5px] border-dashed border-foreground/25" />
        </div>

        <main className="flex-1 w-full min-w-0 max-w-3xl mx-auto relative px-4 sm:px-8 pt-8 sm:pt-14 pb-16">
          {/* Back to Home Link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          {/* Page Header */}
          <section className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-serif text-foreground tracking-tight mb-4" style={{ fontFamily: "'Georgia', serif" }}>
              Life
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              A timeline of everything I've built and done — coming soon.
            </p>
          </section>

          {/* Placeholder Content */}
          <div className="border-l-4 border-primary/30 pl-6 py-4">
            <p className="text-muted-foreground italic">
              This space will soon chronicle the journey, projects, and moments that shaped my path in AI and beyond.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
