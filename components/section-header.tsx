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
        "text-xs uppercase tracking-widest text-foreground font-bold mb-8 font-mono",
        className,
      )}
    >
      {children}
    </h2>
  )
}
