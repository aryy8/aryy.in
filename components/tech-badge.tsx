import type React from "react"
import { Badge } from "@/components/ui/badge"

interface TechBadgeProps {
  children: React.ReactNode
}

export function TechBadge({ children }: TechBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="glass-card hover:border-primary/30 transition-all duration-300 text-foreground/90 px-3 py-1.5 text-sm font-medium"
    >
      {children}
    </Badge>
  )
}
