"use client"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export function LifeThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [m, setM] = useState(false)
  useEffect(() => setM(true), [])
  const dark = m ? resolvedTheme === "dark" : true
  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="life-toggle"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
