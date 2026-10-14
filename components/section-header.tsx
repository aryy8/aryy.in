import type React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  children: React.ReactNode
  className?: string
}

export function SectionHeader({ children, className }: SectionHeaderProps) {
  return (
    <h2
      className={cn(
        "text-xs uppercase tracking-[0.2em] text-foreground/90 font-bold mb-6 font-mono flex items-center gap-3 after:h-px after:flex-1 after:bg-border/50",
        className,
      )}
    >
      {children}
    </h2>
  )
}
