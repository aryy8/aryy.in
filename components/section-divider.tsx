export function SectionDivider() {
  return (
    <div className="my-12 -mx-4 sm:-mx-8 relative">
      <div className="h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent dark:via-foreground/10" />
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-primary/[0.06] to-transparent blur-sm dark:via-sky-400/10" />
    </div>
  )
}

