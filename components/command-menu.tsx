"use client"

import { useEffect, useState } from "react"
import { Command } from "cmdk"
import * as Dialog from "@radix-ui/react-dialog"
import { ArrowUpRight, FileText, Hash, Mail, Search } from "lucide-react"
import { SiGithub, SiX } from "react-icons/si"
import { FaLinkedin } from "react-icons/fa"

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Work Experience" },
  { id: "live-projects", label: "Products" },
  { id: "projects", label: "Hackathon Builds" },
  { id: "research", label: "Research" },
  { id: "achievements", label: "Achievements" },
  { id: "blog", label: "Blogs" },
  { id: "notes", label: "Knowledge Base" },
]

const LINKS = [
  { label: "Resume", href: "/Aryan_Rastogi_Resume.pdf", icon: FileText },
  { label: "GitHub", href: "https://github.com/aryy8", icon: SiGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/aryy8", icon: FaLinkedin },
  { label: "X", href: "https://x.com/aryyann8", icon: SiX },
  { label: "Email", href: "mailto:aryanfeb17@gmail.com", icon: Mail },
  { label: "Petal", href: "https://petal.aryy.in", icon: ArrowUpRight },
  { label: "MinGraph", href: "https://mingraph.aryy.in", icon: ArrowUpRight },
  { label: "Lattice", href: "https://lattice.aryy.in", icon: ArrowUpRight },
  { label: "teXlab", href: "https://texlab.aryy.in", icon: ArrowUpRight },
  { label: "UniWay", href: "https://uniway.aryy.in", icon: ArrowUpRight },
]

const item =
  "flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground/85 cursor-pointer data-[selected=true]:bg-secondary/70 data-[selected=true]:text-foreground"

export function CommandMenu({ onBeforeNavigate }: { onBeforeNavigate?: () => void }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener("keydown", onKey)
    window.addEventListener("open-command-menu", onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("open-command-menu", onOpen)
    }
  }, [])

  const go = (id: string) => {
    setOpen(false)
    onBeforeNavigate?.()
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }))
  }
  const openLink = (href: string) => {
    setOpen(false)
    if (href.startsWith("mailto:")) window.location.href = href
    else window.open(href, "_blank", "noopener,noreferrer")
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed z-[101] left-1/2 top-[18vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-xl border border-border/60 bg-background shadow-2xl overflow-hidden"
        >
          <Dialog.Title className="sr-only">Command menu</Dialog.Title>
          <Command loop>
            <div className="flex items-center gap-2 px-3 border-b border-border/50">
              <Search className="size-4 text-muted-foreground" aria-hidden />
              <Command.Input autoFocus placeholder="Jump to a section or link…" className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              <kbd className="text-[10px] font-mono text-muted-foreground border border-border/60 rounded px-1.5 py-0.5">esc</kbd>
            </div>
            <Command.List className="max-h-[50vh] overflow-y-auto p-2">
              <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">No results.</Command.Empty>
              <Command.Group heading="Sections" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted-foreground">
                {SECTIONS.map((s) => (
                  <Command.Item key={s.id} value={s.label} onSelect={() => go(s.id)} className={item}>
                    <Hash className="size-4 text-muted-foreground" aria-hidden />
                    {s.label}
                  </Command.Item>
                ))}
              </Command.Group>
              <Command.Group heading="Links" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted-foreground">
                {LINKS.map(({ label, href, icon: Icon }) => (
                  <Command.Item key={label} value={label} onSelect={() => openLink(href)} className={item}>
                    <Icon className="size-4 text-muted-foreground" aria-hidden />
                    {label}
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
