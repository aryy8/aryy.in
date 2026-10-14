import { cn } from "@/lib/utils"

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("rounded-md bg-muted/40 motion-safe:animate-pulse", className)} />
}

/** Stale-while-revalidate cache in sessionStorage for third-party widget data. */
export function readCache<T>(key: string, maxAgeMs = 30 * 60 * 1000): T | null {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const { t, v } = JSON.parse(raw)
    return Date.now() - t < maxAgeMs ? (v as T) : null
  } catch {
    return null
  }
}

export function writeCache(key: string, v: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v }))
  } catch {}
}
