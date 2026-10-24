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

// Grouped cleanly into 2 concise lines
const TWO_LINE_GROUPS: { title: string; items: Tech[] }[] = [
  {
    title: "Core & Systems",
    items: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "SQL", icon: Database, color: "#4479A1" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", mono: true },
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "REST APIs", icon: Braces, color: "#E5E7EB", mono: true },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    ],
  },
  {
    title: "AI, ML & Cloud",
    items: [
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
      { name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E" },
      { name: "LangChain", icon: SiLangchain, color: "#1C9C7C" },
      { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "GCP", icon: SiGooglecloud, color: "#4285F4" },
      { name: "Kaggle", icon: SiKaggle, color: "#20BEFF" },
    ],
  },
]

export function TechStack() {
  return (
    <div className="space-y-4">
      {TWO_LINE_GROUPS.map((g) => (
        <div key={g.title} className="space-y-2">
          <h3 className="text-[11px] font-mono text-muted-foreground/60 uppercase tracking-wider">
            {g.title}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {g.items.map(({ name, icon: Icon, color, mono }) => (
              <div
                key={name}
                title={name}
                style={{ "--brand": color } as CSSProperties}
                className="group p-1.5 sm:p-2 rounded-md hover:bg-muted/20 transition-all duration-200 cursor-default"
              >
                <Icon
                  aria-label={name}
                  className={`size-5 transition-transform duration-200 group-hover:scale-115 ${
                    mono ? "text-foreground" : "text-[color:var(--brand)]"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
