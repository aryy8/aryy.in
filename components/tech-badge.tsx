import type React from "react"
import { Badge } from "@/components/ui/badge"

interface TechBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function TechBadge({ children, className, ...props }: TechBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`glass-card hover:border-primary/30 transition-all duration-300 text-foreground/90 px-3 py-1.5 text-sm font-medium ${className || ''}`}
      {...props}
    >
      {children}
    </Badge>
  )
}
