"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SectionHeader } from "@/components/section-header"
import { GitHubContributionGrid } from "@/components/github-contribution-grid"
import { LeetCodeStats } from "@/components/leetcode-stats"
import { TechBadge } from "@/components/tech-badge"
import { Navbar } from "@/components/navbar"
import { JupyterCell } from "@/components/jupyter-cell"
import { LiveProjects } from "@/components/live-projects"
import { HackathonBuilds } from "@/components/hackathon-builds"
import { NotesGrid } from "@/components/notes-grid"
import { Mail, MapPin, Award } from "lucide-react"
import { Github, Linkedin, FileText, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { AgenticView } from "@/components/agentic-view"
import { Bot } from "lucide-react"

function TypewriterAnimation() {
  const phrases = [
    "AI Engineer · Applied AI × Research",
    "CS @ Manipal",
  ]
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    
    const timeout = setTimeout(() => {
      if (charIndex < currentPhrase.length) {
        setCurrentText(currentPhrase.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      } else {
        setTimeout(() => {
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
          setCurrentText("")
          setCharIndex(0)
        }, 1500)
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [charIndex, currentPhraseIndex, phrases])

  return (
    <span className="text-base sm:text-lg lg:text-xl text-primary font-medium inline-block min-h-[3.5em]">
      <span key={currentPhraseIndex} className="transition-all duration-300 ease-in-out roll-in">{currentText}</span>
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default function Portfolio() {
  const [isAgenticMode, setIsAgenticMode] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

      <Navbar onToggleAgentic={() => setIsAgenticMode(!isAgenticMode)} isAgenticMode={isAgenticMode} />

      <div className="relative z-10 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-20 gap-10 sm:gap-12 pt-24 sm:pt-32 scroll-smooth">
        <main className="flex-1 w-full min-w-0 max-w-3xl mx-auto">
          {/* Conditional Agentic View or Standard Human Sections */}
          {isAgenticMode ? (
            <AgenticView />
          ) : (
            <>
              {/* Hero Section - LinkedIn & Twitter Inspired Senior UI Design */}
              <section className="mb-16">
                {/* Cover Photo Banner - Crisp & Clear */}
                <div className="relative w-full h-44 sm:h-56 lg:h-64 overflow-hidden rounded-2xl -mt-12 sm:-mt-20 border border-border/40">
                  <img 
                    src="/surfing.webp" 
                    alt="Cover Photo"
                    className="w-full h-full object-cover object-center scale-x-[-1]"
                  />
                </div>

                {/* Profile Content Area */}
                <div className="relative -mt-16 sm:-mt-20 lg:-mt-22 px-2 sm:px-4">
                  {/* Avatar and Top Actions Header Row */}
                  <div className="flex flex-row items-end justify-between mb-3 sm:mb-4 gap-2 sm:gap-4">
                    {/* Profile Picture (Circular, Twitter/LinkedIn style) */}
                    <div className="relative shrink-0">
                      <div className="size-24 sm:size-36 lg:size-40 rounded-full border-4 sm:border-[5px] border-background bg-card shadow-xl overflow-hidden shrink-0 ring-1 ring-border/20 transition-transform duration-300 hover:scale-[1.02]">
                        <img 
                          src="/profilepic.webp" 
                          alt="Aryan Rastogi" 
                          className="w-full h-full object-cover object-center" 
                        />
                      </div>
                    </div>

                    {/* Top Action Row: Logo Badges */}
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap pb-1 justify-end shrink-0 max-w-[190px] sm:max-w-none">
                      <div className="size-7 sm:size-9 rounded-full overflow-hidden bg-background/90 border border-border/60 p-0.5 sm:p-1 shadow-2xs transition-transform duration-200 hover:scale-110" title="Sylus AI">
                        <img src="/sylusai.webp" alt="Sylus AI" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="size-7 sm:size-9 rounded-full overflow-hidden bg-white border border-border/60 p-0.5 sm:p-1 shadow-2xs transition-transform duration-200 hover:scale-110" title="Hewlett Packard Enterprise">
                        <img src="/hpe.webp" alt="HPE" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="size-7 sm:size-9 rounded-full overflow-hidden bg-background/90 border border-border/60 p-0.5 sm:p-1 shadow-2xs transition-transform duration-200 hover:scale-110" title="Amazon ML Summer School">
                        <img src="/amazon_logo.webp" alt="Amazon" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="size-7 sm:size-9 rounded-full overflow-hidden bg-background/90 border border-border/60 p-0.5 sm:p-1 shadow-2xs transition-transform duration-200 hover:scale-110" title="Southern Federal University (ICTIS) Russia">
                        <img src="/sfedu.webp" alt="SfedU" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="size-7 sm:size-9 rounded-full overflow-hidden bg-background/90 border border-border/60 p-1 shadow-2xs transition-transform duration-200 hover:scale-110" title="Elumina Street Solutions">
                        <img src="/elumina.webp" alt="Elumina" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="size-7 sm:size-9 rounded-full overflow-hidden bg-background/90 border border-border/60 p-0.5 sm:p-1 shadow-2xs transition-transform duration-200 hover:scale-110" title="AI²: Computational Linguistics & Vision Lab">
                        <img src="/ai2.webp" alt="AI² Lab" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="size-7 sm:size-9 rounded-full overflow-hidden bg-background/90 border border-border/60 p-0.5 sm:p-1 shadow-2xs transition-transform duration-200 hover:scale-110" title="Manipal University Jaipur">
                        <img src="/muj.webp" alt="Manipal University Jaipur" className="w-full h-full object-contain rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Main Bio Info - Full Width */}
                  <div className="w-full space-y-3.5">
                    {/* Name & Blue Tick */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
                        Aryan Rastogi
                      </h1>
                      <div className="relative flex items-center justify-center shrink-0">
                        <div className="absolute inset-0 bg-white rounded-full scale-75 dark:hidden" />
                        <img src="/verified.webp" alt="Verified" className="relative size-5 sm:size-6" />
                      </div>
                    </div>

                    {/* Clean Headline - Applied AI × Research on new line */}
                    <p className="text-sm sm:text-base text-foreground/90 font-medium leading-relaxed">
                      AI Engineer @ Sylus AI <span className="text-muted-foreground/60">·</span> Amazon MLSS'26 <span className="text-muted-foreground/60">·</span> CPP-2 @ HPE
                      <br />
                      Applied AI × Research
                    </p>

                    {/* Location & Email Meta */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-muted-foreground pt-0.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-muted-foreground/80 shrink-0" />
                        <span>Jaipur, India</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="size-3.5 text-muted-foreground/80 shrink-0" />
                        <a href="mailto:aryanfeb17@gmail.com" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 font-medium transition-colors">
                          aryanfeb17@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Premium Action Pill Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <a
                        href="https://github.com/aryy8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border border-border/70 bg-secondary/40 text-foreground hover:border-foreground dark:hover:border-white transition-colors duration-200 shadow-2xs group"
                      >
                        <Github className="size-3.5 transition-transform group-hover:scale-110" />
                        <span>GitHub</span>
                      </a>
                      <a
                        href="https://linkedin.com/in/aryy8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border border-border/70 bg-secondary/40 text-foreground hover:border-foreground dark:hover:border-white transition-colors duration-200 shadow-2xs group"
                      >
                        <Linkedin className="size-3.5 transition-transform group-hover:scale-110" />
                        <span>LinkedIn</span>
                      </a>
                      <a
                        href="https://x.com/aryyann8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border border-border/70 bg-secondary/40 text-foreground hover:border-foreground dark:hover:border-white transition-colors duration-200 shadow-2xs group"
                      >
                        <svg className="size-3.5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span>X</span>
                      </a>
                      <a
                        href="/Aryan_Rastogi_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border border-border/70 bg-secondary/40 text-foreground hover:border-foreground dark:hover:border-white transition-colors duration-200 shadow-2xs group"
                      >
                        <FileText className="size-3.5 transition-transform group-hover:scale-110" />
                        <span>Resume</span>
                      </a>
                    </div>
                  </div>
                </div>
              </section>

          {/* About Section */}
          <section id="about" className="mb-16 scroll-mt-20">
            <SectionHeader>About Me</SectionHeader>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
              <p className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
                I train models to learn &amp; they teach me patience.
              </p>

              <p>
                I am a computer science engineering student working on <span className="text-primary font-medium">machine learning</span>, <span className="text-primary font-medium">NLP</span>, and <span className="text-primary font-medium">applied AI systems</span>.
                 {/* I run <a href="https://www.aryyandco.studio" target="_blank" rel="noopener noreferrer" className="text-accent-cold font-medium hover:underline">Aryy & Co</a>, a tech agency helping early-stage teams build and ship products. */}
                 {/* I create tech content at <a href="https://www.instagram.com/aryy.in_/" target="_blank" rel="noopener noreferrer" className="text-accent-cold font-medium hover:underline">@aryy.in_</a>. */}
                I craft effective prompts, build <span className="text-primary font-medium">clean frontends</span>, and work comfortably across <span className="text-primary font-medium">backend</span> systems.
              </p>

              {/* <p>
                Beyond work, I make food edits at <a href="https://www.instagram.com/nomnomsss_/" target="_blank" rel="noopener noreferrer" className="text-accent-cold font-medium hover:underline">@nomnomsss_</a>.
              </p> */}

            </div>
          </section>

          {/* Tech Stack */}
          <section className="mb-16">
            <SectionHeader>Tech Stack</SectionHeader>
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Languages</h3>
                <div className="flex flex-wrap gap-2.5">
                  <TechBadge>Python</TechBadge>
                  <TechBadge>Cpp</TechBadge>
                  <TechBadge>SQL</TechBadge>
                  <TechBadge>Typescript</TechBadge>

                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  ML/AI Frameworks
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  <TechBadge>PyTorch</TechBadge>
                  <TechBadge>TensorFlow</TechBadge>
                  <TechBadge>Scikit-learn</TechBadge>
                  <TechBadge>Hugging Face</TechBadge>
                  <TechBadge>LangChain</TechBadge>
                  <TechBadge>OpenCV</TechBadge>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Full Stack
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  <TechBadge>React</TechBadge>
                  <TechBadge>Next.js</TechBadge>
                  <TechBadge>Node.js</TechBadge>
                  <TechBadge>REST APIs</TechBadge>
                  <TechBadge>Supabase</TechBadge>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Tools & Platforms
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  <TechBadge>FastAPI</TechBadge>
                  <TechBadge>AWS</TechBadge>
                  <TechBadge>GCP</TechBadge>
                  <TechBadge>Docker</TechBadge>
                  <TechBadge>Kaggle</TechBadge>
                </div>
              </div>
            </div>
          </section>

          {/* GitHub Contributions */}
          <section className="mb-16">
            <SectionHeader>GitHub Activity</SectionHeader>
            <GitHubContributionGrid />
          </section>

          {/* LeetCode Stats */}
          <section id="leetcode" className="mb-16 scroll-mt-20">
            <SectionHeader>LeetCode Stats</SectionHeader>
            <LeetCodeStats />
          </section>

          {/* Experience Section */}
          <section id="experience" className="mb-16 scroll-mt-20">
            <SectionHeader>Work Experience</SectionHeader>
            <div className="space-y-2">

              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-md overflow-hidden border border-border/30 bg-white flex-shrink-0 p-1 flex items-center justify-center">
                        <img src="/hpe.webp" alt="HPE" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold mb-1">CPP-2</h3>
                        <p className="text-xs text-muted-foreground mb-2">Hewlett Packard Enterprise  •  India</p>
                        <p className="text-xs text-muted-foreground/80 leading-relaxed">
                          Shortlisted for the CPP-2 cohort and collaborating on an enterprise project with HPE.</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <p className="text-xs text-muted-foreground">Aug 2026 - Present</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                        <img src="/amazon_logo.webp" alt="Amazon" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold mb-1">Amazon ML Summer School</h3>
                        <p className="text-xs text-muted-foreground mb-2">Amazon  •  2026</p>
                        <p className="text-xs text-muted-foreground/80 leading-relaxed">
                          Selected for the prestigious Amazon ML Summer School 2026 program, an intensive machine learning education initiative by Amazon. One of 3,000 students selected from over 1.4 lakh applicants nationwide.</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <p className="text-xs text-muted-foreground">Jul 2026 - Present</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                        <img src="/sylusai.webp" alt="SfedU" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold mb-1">AI Engineer</h3>
                        <p className="text-xs text-muted-foreground mb-2">Sylus AI  •  (remote)</p>
                        <ul className="text-xs text-muted-foreground/80 leading-relaxed list-disc pl-4 space-y-1.5 mt-2">
                          <li>Engineered the platform end-to-end from a greenfield repository to production, owning auth, database schema, and core architecture through 180+ commits, then scaling it into a multi-tenant AI content platform.</li>
                          <li>Designed and shipped a 9-phase agency system (RBAC, approval workflows, client portal, invites, real-time collaboration) from scratch, taking the product from single-user to multi-brand agency-ready.</li>
                          <li>Built the AI content engine (multi-model LLM copywriting, live Google News trend discovery, AI image generation) and a document intelligence pipeline auto-extracting and scheduling posts from PDFs, Excel, and Word docs.</li>
                          <li>Hardened the platform for production: patched security vulnerabilities across auth, API endpoints, and middleware (SSRF, CORS), and stabilized deployment across Cloud Run and Docker.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <p className="text-xs text-muted-foreground">April 2026 - Present</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                        <img src="/sfedu.webp" alt="SfedU" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold mb-1">SDE Intern</h3>
                        <p className="text-xs text-muted-foreground mb-2">Southern Federal University, ICTIS • Russia (remote)</p>
                        <p className="text-xs text-muted-foreground/80 leading-relaxed">
                          Developed a web application as an international interdisciplinary project in collaboration with Southern Federal University (ICTIS) & MUJ to support the adaptation of international students. The platform acts as a digital assistant that helps to explore, understand and navigate the campus facilities and improves accessibility for new international students.</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <p className="text-xs text-muted-foreground">Oct - Nov 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                        <img src="/elumina.webp" alt="Elumina Street Solutions" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold mb-1">AI R&D Intern</h3>
                        <p className="text-xs text-muted-foreground mb-2">Elumina Street Solutions • Jaipur</p>
                        <p className="text-xs text-muted-foreground/80 leading-relaxed">
                          Developed a violence detection model using CNN (MobileNet) and LSTM in TensorFlow for video-based behavior
                          recognition; improved accuracy with focal loss and class weighting.
                          Implemented and evaluated a real-time weapon detection system using YOLOv8 and OpenCV.
                          Collaborated with the AI research team to analyze model performance, optimize hyperparameters, and enhance detection.
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <p className="text-xs text-muted-foreground">April - July 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>


              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                        <img src="/ai2.webp" alt="AI² Lab" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold mb-1">Research Intern</h3>
                        <p className="text-xs text-muted-foreground mb-2">AI²: computAtional linguIstics & vIsion Lab • MUJ</p>
                        <ul className="text-xs text-muted-foreground/80 leading-relaxed list-disc pl-4 space-y-1.5 mt-2">
                          <li><strong>SafeAlign:</strong> Leading a multi-arm experimental pipeline for LLM safety evaluation using taxonomy-guided data curation on the Anthropic HH-RLHF dataset, training a RoBERTa-based reward model, a QLoRA+DPO-aligned Qwen2.5-1.5B generative model, and a MiniLM contrastive safety encoder.</li>
                          <li><strong>Key Finding:</strong> Discovered that a 66M DistilBERT classifier trained on taxonomy-filtered data achieves 81.3% accuracy vs 59.5% on raw data, proving label quality outweighs model scale.</li>
                          <li><strong>Quantifying the Alignment Tax:</strong> Empirically measuring how SFT and DPO degrade LLM creativity using DAT, AUT, and TTCT benchmarks with Semantic Entropy metrics across Mistral-7B and Llama-3.1-8B.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <p className="text-xs text-muted-foreground">Jan 2025 - Present</p>
                    </div>
                  </div>
                </CardContent>
              </Card>


            </div>
          </section>

          {/* Research Section */}
          <section id="research" className="mb-16 scroll-mt-20">
            <SectionHeader>Research</SectionHeader>
            <div className="space-y-3">

              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-5">
                  <div className="flex flex-col gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">SafeAlign: A Multi-Paradigm Pipeline for LLM Safety Evaluation via Taxonomy-Guided Data Curation</h3>
                      <p className="text-xs text-muted-foreground mb-2">Aryan Rastogi, Dr. Varda Pareek — Manipal University Jaipur</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-cold/10 text-accent-cold border border-accent-cold/20">LLM Safety</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-cold/10 text-accent-cold border border-accent-cold/20">RLHF</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-cold/10 text-accent-cold border border-accent-cold/20">DPO</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-cold/10 text-accent-cold border border-accent-cold/20">Data Curation</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-cold/10 text-accent-cold border border-accent-cold/20">HH-RLHF</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed italic">
                        Taxonomy-guided label denoising outperforms model scale — a 66M DistilBERT on filtered data beats a 774M baseline on safety classification.
                      </p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted/50 text-muted-foreground border border-border/30">Under Review / Preprint</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-5">
                  <div className="flex flex-col gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">Quantifying the Alignment Tax: Tracking Creativity and Semantic Entropy through the SFT and DPO Pipeline</h3>
                      <p className="text-xs text-muted-foreground mb-2">Harshita Singh, Aryan Rastogi — Manipal University Jaipur</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-cold/10 text-accent-cold border border-accent-cold/20">Alignment Tax</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-cold/10 text-accent-cold border border-accent-cold/20">Semantic Entropy</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-cold/10 text-accent-cold border border-accent-cold/20">DPO</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-cold/10 text-accent-cold border border-accent-cold/20">Creativity</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-cold/10 text-accent-cold border border-accent-cold/20">LLMs</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed italic">
                        DPO systematically collapses semantic diversity — creative narrative divergence drops from 0.7153 (base) to 0.3591 (post-DPO) on Mistral-7B.
                      </p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted/50 text-muted-foreground border border-border/30">Under Review / Preprint</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </section>

          {/* Live Projects Section */}
          <LiveProjects />

          {/* Hackathon Builds Section */}
          <HackathonBuilds />

          {/* Achievements Section */}
          <section id="achievements" className="mb-16 scroll-mt-20">
            <SectionHeader>Achievements & Recognition</SectionHeader>
            <div className="space-y-3">
              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                      <img src="/HN logo-2.webp" alt="Uniway" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-1">India Innovates 2026 Finalist</h3>
                      <p className="text-xs text-muted-foreground mb-2">India Innovates 2026, BHARAT MANDAPAM, NEW DELHI</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Shortlisted as the finalist from 25k+ participants in the World's Largest Civic Tech Hackathon at Bharat Mandapam, New Delhi organised by BYHN x MCD, in collaboration with DDU, IIT KGP, DTC, NSUT, GGSIPU.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                      <img src="/iitm.webp" alt="IIT Madras" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-1">National Road Safety Hackathon Finalist</h3>
                      <p className="text-xs text-muted-foreground mb-2">National Road Safety Hackathon 2025, IIT Madras</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Shortlisted among the top 10 finalist teams nationwide from 3.6k+ participants & presented at the National Road Safety Hackathon organised by COERs, IIT Madras.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                      <img src="/uniway.webp" alt="Uniway" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-1">UniWay Hackathon Winner</h3>
                      <p className="text-xs text-muted-foreground mb-2">Uniway MUJ Hackathon 2025</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Secured 1st place, won a cash prize, and earned an opportunity to collaborate on a project with Southern Federal University, Russia.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                      <img src="/muj.webp" alt="Manipal University Jaipur" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-1">Student Excellence Awardee</h3>
                      <p className="text-xs text-muted-foreground mb-2">Manipal University Jaipur, CSE dept 2025</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Awarded for outstanding technical performance, hackathon achievements, and project based innovation during the 3rd & 4th semester.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                      <img src="/superteam.webp" alt="Superteam" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-1">Solana Bounty Winner</h3>
                      <p className="text-xs text-muted-foreground mb-2">Superteam India, 2025</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Won a Solana bounty and became a Global Superteam Contributor within the Solana ecosystem.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                      <img src="/muj.webp" alt="Manipal University Jaipur" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-1">Dean's List Awardee</h3>
                      <p className="text-xs text-muted-foreground mb-2">Manipal University Jaipur, CSE dept 2025</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Named to the Dean's List in the 2nd semester for academic excellence.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                      <img src="/ieeewie.webp" alt="IEEE WIE" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-1">BrandIT 2.0 Winner</h3>
                      <p className="text-xs text-muted-foreground mb-2">IEEE WIE MUJ, JUN 2025</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        A social networking and community platform built for older adults, featuring VR Memory Lanes to relive personal memories, curated hobby circles, companion matching, and accessible games. Designed for emotional connection and digital inclusion — built and presented at BrandIT 2.0.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                      <img src="/180dc.webp" alt="IEEE WIE" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-1">Consultathon Winner</h3>
                      <p className="text-xs text-muted-foreground mb-2">180 DC MUJ, April 2025</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Won the Consultathon organized by 180 DC MUJ — presented a scaling strategy for a vocational training social enterprise facing the challenge of expanding impact across India while preserving quality and financial sustainability.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Blog Section */}
          <section id="blog" className="mb-16 scroll-mt-20">
            <SectionHeader>Blogs</SectionHeader>
            <div className="space-y-4">

              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0 bg-white flex items-center justify-center">
                      <img src="/medium.webp" alt="Medium" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-1">
                        <a
                          href="https://medium.com/@aryanfeb17/building-an-ai-that-draws-diagrams-taught-me-nothing-about-ai-and-everything-about-systems-design-c3f87185de7d?sharedUserId=aryanfeb17"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                           Building an AI That Draws Diagrams Taught Me Nothing About AI and Everything About Systems Design

                        </a>
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">Medium • Published 2026</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Tried to build a text-to-TikZ diagram generator. Got it wrong twice before figuring out why.
                      </p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        <TechBadge className="scale-90">System Design</TechBadge>
                        <TechBadge className="scale-90">Prompt Engineering</TechBadge>
                        <TechBadge className="scale-90">AI Tools</TechBadge>

                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0 bg-white flex items-center justify-center">
                      <img src="/medium.webp" alt="Medium" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-1">
                        <a
                          href="https://medium.com/@aryanfeb17/implementing-deep-learning-by-diving-deep-into-the-black-box-c26b28678309"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          Implementing Deep Learning by Diving Deep into the Black Box
                        </a>
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">Medium • Published 2026</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        An Implementation of deep learning in three stages: building a neural network from scratch using NumPy, predicting customer churn with an ANN, and classifying images with a CNN.
                      </p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        <TechBadge className="scale-90">Deep Learning</TechBadge>
                        <TechBadge className="scale-90">CNN</TechBadge>
                        <TechBadge className="scale-90">ANN</TechBadge>

                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0 bg-white flex items-center justify-center">
                      <img src="/medium.webp" alt="Medium" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-1">
                        <a
                          href="https://medium.com/@aryanfeb17/a-cursor-and-google-colab-workflow-for-machine-learning-replacing-jupyter-and-chatgpt-e7c47b39179e"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          A Cursor and Google Colab Workflow for Machine Learning: Replacing Jupyter and ChatGPT
                        </a>
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">Medium • Published 2026</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Exploring how to leverage Cursor and Google Colab together to create an efficient machine learning workflow that combines the best of both worlds - replacing traditional Jupyter notebooks and ChatGPT interactions with a more integrated development experience.
                      </p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        <TechBadge className="scale-90">Machine Learning</TechBadge>
                        <TechBadge className="scale-90">Cursor</TechBadge>
                        <TechBadge className="scale-90">Google Colab</TechBadge>
                        <TechBadge className="scale-90">Workflow</TechBadge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* <Card className="glass-card group hover:border-foreground/40 transition-all duration-300 opacity-60">
                <CardContent className="p-5">
                  <div className="flex items-center justify-center text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <p className="text-xs">More blog posts coming soon...</p>
                    </div>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </section>

          {/* Notes Section */}
          <section id="notes" className="mb-16 scroll-mt-20">
            <SectionHeader>Knowledge Base</SectionHeader>
            <NotesGrid />
          </section>

          {/* Live ML Playground */}
          <section className="mb-16">
            <SectionHeader>Live ML Playground</SectionHeader>
            <JupyterCell />
          </section>
          </>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pb-12">
          <p>
            © 2026 Aryan Rastogi · 
            {/* <a href="https://www.aryyandco.studio" target="_blank" rel="noopener noreferrer" className="text-accent-cold hover:text-accent-cold/80 transition-colors">Aryy & Co</a> · 
            <a href="https://www.instagram.com/aryy.in_/" target="_blank" rel="noopener noreferrer" className="text-accent-cold hover:text-accent-cold/80 transition-colors">aryy.in_</a> · 
            <a href="https://www.instagram.com/nomnomsss_/" target="_blank" rel="noopener noreferrer" className="text-accent-cold hover:text-accent-cold/80 transition-colors">nomnomsss_</a> */}
          </p>
        </footer>
      </div>
    </div>
  )
}
