"use client"

import type { IconType } from "react-icons"
import {
  SiPython, SiCplusplus, SiTypescript, SiFastapi, SiGooglecloud, SiDocker,
  SiReact, SiNextdotjs, SiNodedotjs, SiSupabase, SiPytorch, SiTensorflow, SiScikitlearn,
  SiHuggingface, SiLangchain, SiOpencv,
} from "react-icons/si"
import { FaAws } from "react-icons/fa"

import type { ComponentType, CSSProperties } from "react"
import { GitHubContributionGrid } from "@/components/github-contribution-grid"

type Tech = { name: string; icon: IconType | ComponentType<{ className?: string }>; color: string; mono?: boolean }

const ALL_TECH: Tech[] = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", mono: true },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  { name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E" },
  { name: "LangChain", icon: SiLangchain, color: "#1C9C7C" },
  { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
  { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
  { name: "GCP", icon: SiGooglecloud, color: "#4285F4" },
]

export function TechAndActivity() {
  return (
    <div className="space-y-6">
      {/* GitHub Contribution Grid */}
      <GitHubContributionGrid />

      {/* Compact Tech Icons below */}
      <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
        {ALL_TECH.map(({ name, icon: Icon, color, mono }) => (
          <div
            key={name}
            title={name}
            style={{ "--brand": color } as CSSProperties}
            className="group p-1.5 sm:p-2 rounded-md hover:bg-muted/20 transition-all duration-200 cursor-default"
          >
            <Icon
              aria-label={name}
              className={`size-4 sm:size-[18px] transition-transform duration-200 group-hover:scale-115 ${
                mono ? "text-foreground" : "text-[color:var(--brand)]"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

