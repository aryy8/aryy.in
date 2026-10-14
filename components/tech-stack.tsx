import type { IconType } from "react-icons"
import {
  SiPython, SiCplusplus, SiTypescript, SiFastapi, SiGooglecloud, SiDocker, SiKaggle,
  SiReact, SiNextdotjs, SiNodedotjs, SiSupabase, SiPytorch, SiTensorflow, SiScikitlearn,
  SiHuggingface, SiLangchain, SiOpencv,
} from "react-icons/si"
import { FaAws } from "react-icons/fa"
import { Database, Braces } from "lucide-react"
import type { ComponentType, CSSProperties } from "react"

type Tech = { name: string; icon: IconType | ComponentType<{ className?: string }>; color: string; mono?: boolean }

const GROUPS: { title: string; items: Tech[] }[] = [
  {
    title: "Languages",
    items: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "SQL", icon: Database, color: "#4479A1" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "GCP", icon: SiGooglecloud, color: "#4285F4" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Kaggle", icon: SiKaggle, color: "#20BEFF" },
    ],
  },
  {
    title: "Full Stack",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", mono: true },
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "REST APIs", icon: Braces, color: "#E5E7EB", mono: true },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    ],
  },
  {
    title: "ML/AI Frameworks",
    items: [
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
      { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E" },
      { name: "LangChain", icon: SiLangchain, color: "#1C9C7C" },
      { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
    ],
  },
]

export function TechStack() {
  return (
    <div className="space-y-6">
      {GROUPS.map((g) => (
        <div key={g.title}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{g.title}</h3>
          <ul className="flex flex-wrap gap-2">
            {g.items.map(({ name, icon: Icon, color, mono }) => (
              <li
                key={name}
                style={{ "--brand": color } as CSSProperties}
                className="tech-chip group inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-border/60 bg-secondary/30 text-sm text-foreground/90 transition-colors duration-200 hover:text-foreground"
              >
                <Icon aria-hidden className={`size-4 shrink-0 ${mono ? "text-foreground" : "text-[color:var(--brand)]"}`} />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
