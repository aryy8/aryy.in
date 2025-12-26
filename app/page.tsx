import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SectionHeader } from "@/components/section-header"
import { GitHubContributionGrid } from "@/components/github-contribution-grid"
import { TechBadge } from "@/components/tech-badge"
import { Navbar } from "@/components/navbar"
import { Mail, MapPin, Award } from "lucide-react"
import { Github, Linkedin, FileText } from "lucide-react"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

      <Navbar />

      <div className="relative z-10 flex max-w-7xl mx-auto px-6 lg:px-12 py-20 gap-12 pt-32">
        <main className="flex-1 max-w-3xl mx-auto">
          {/* Hero Section */}
          <section className="mb-16">
            <div className="flex items-start gap-8 mb-8">
              <div className="size-24 rounded-lg border-2 border-border/50 ring-4 ring-primary/5 shrink-0 overflow-hidden bg-muted">
                <img src="/profile.png" alt="Aryan Rastogi" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1">
                <h1 className="text-5xl font-bold mb-3 text-balance tracking-tight">Aryan Rastogi</h1>
                <p className="text-xl text-primary mb-6 font-medium">Machine Learning & AI Engineer</p>

                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    <span>Jaipur, India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="size-4" />
                    <a
                      href="mailto:aryan@example.com"
                      className="hover:text-primary transition-colors hover:underline underline-offset-4"
                    >
                      aryanfeb17@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-xs border border-border/50 hover:border-foreground/50"
                    asChild
                  >
                    <a href="https://github.com/aryy8" target="_blank" rel="noopener noreferrer">
                      <Github className="size-3.5" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-xs border border-border/50 hover:border-foreground/50"
                    asChild
                  >
                    <a href="https://linkedin.com/in/aryy8" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="size-3.5" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-xs border border-border/50 hover:border-foreground/50"
                    asChild
                  >
                    <a href="/resume.pdf" download>
                      <FileText className="size-3.5" />
                      Resume
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="mb-16 scroll-mt-20">
            <SectionHeader>About Me</SectionHeader>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
              <p>
                I teach machines to learn and they teach me patience.
                I am a computer science student working on machine learning, artificial intelligence, and applied intelligent systems.
              </p>
              <p>
                Off screen, I like to slow down, eat well, and catch up on sleep.

              </p>
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
                  <TechBadge>Julia</TechBadge>
                  <TechBadge>R</TechBadge>
                  <TechBadge>SQL</TechBadge>
                  <TechBadge>C++</TechBadge>
                  <TechBadge>JavaScript</TechBadge>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  ML/AI Frameworks
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  <TechBadge>PyTorch</TechBadge>
                  <TechBadge>TensorFlow</TechBadge>
                  <TechBadge>JAX</TechBadge>
                  <TechBadge>Scikit-learn</TechBadge>
                  <TechBadge>Hugging Face</TechBadge>
                  <TechBadge>LangChain</TechBadge>
                  <TechBadge>OpenCV</TechBadge>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Tools & Platforms
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  <TechBadge>Docker</TechBadge>
                  <TechBadge>Kubernetes</TechBadge>
                  <TechBadge>AWS</TechBadge>
                  <TechBadge>GCP</TechBadge>
                  <TechBadge>MLflow</TechBadge>
                  <TechBadge>Weights & Biases</TechBadge>
                  <TechBadge>Git</TechBadge>
                </div>
              </div>
            </div>
          </section>

          {/* GitHub Contributions */}
          <section className="mb-16">
            <SectionHeader>GitHub Activity</SectionHeader>
            <GitHubContributionGrid />
          </section>

          {/* Experience Section */}
          <section id="experience" className="mb-16 scroll-mt-20">
            <SectionHeader>Work Experience</SectionHeader>
            <div className="space-y-2">
              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold mb-1">Senior ML Engineer</h3>
                      <p className="text-xs text-muted-foreground mb-2">TechCorp AI • San Francisco</p>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed">
                        Led recommendation system serving 10M+ daily users. Implemented real-time inference pipeline
                        with 50ms latency.
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">2022 - Present</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold mb-1">ML Research Engineer</h3>
                      <p className="text-xs text-muted-foreground mb-2">AI Labs Inc • Remote</p>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed">
                        Developed computer vision models for medical imaging. Published 3 peer-reviewed papers on deep
                        learning.
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">2020 - 2022</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold mb-1">Data Science Intern</h3>
                      <p className="text-xs text-muted-foreground mb-2">StartupXYZ • Boston</p>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed">
                        Built predictive models for customer churn. Developed automated ETL pipelines and interactive
                        dashboards.
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">2019 - 2020</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="projects" className="mb-16 scroll-mt-20">
            <SectionHeader>Featured Projects</SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold mb-2">Neural Style Transfer API</h3>
                      <p className="text-xs text-muted-foreground/80 mb-3 leading-relaxed">
                        Production-ready API for artistic style transfer using PyTorch and FastAPI.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <TechBadge>PyTorch</TechBadge>
                        <TechBadge>FastAPI</TechBadge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">2.3k stars</div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold mb-2">LLM Fine-tuning Toolkit</h3>
                      <p className="text-xs text-muted-foreground/80 mb-3 leading-relaxed">
                        Open-source toolkit for efficiently fine-tuning LLMs using PEFT techniques.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <TechBadge>Python</TechBadge>
                        <TechBadge>PEFT</TechBadge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">1.8k stars</div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold mb-2">Real-time Object Detection</h3>
                      <p className="text-xs text-muted-foreground/80 mb-3 leading-relaxed">
                        High-performance detection system for edge devices achieving 30+ FPS.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <TechBadge>TensorFlow</TechBadge>
                        <TechBadge>TensorRT</TechBadge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">950 stars</div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold mb-2">Vision Transformer Lib</h3>
                      <p className="text-xs text-muted-foreground/80 mb-3 leading-relaxed">
                        Modular library for implementing and fine-tuning vision transformers efficiently.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <TechBadge>PyTorch</TechBadge>
                        <TechBadge>Transformers</TechBadge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">1.2k stars</div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Achievements Section */}
          <section id="achievements" className="mb-16 scroll-mt-20">
            <SectionHeader>Achievements & Recognition</SectionHeader>
            <div className="space-y-3">
              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Award className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">Best Paper Award</h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        International Conference on Machine Learning (ICML) 2023
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Recognized for novel approach to few-shot learning in computer vision applications
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Award className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">Kaggle Grandmaster</h3>
                      <p className="text-xs text-muted-foreground mb-2">Top 100 Global Ranking • 5 Gold Medals</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Achieved top rankings in computer vision and NLP competitions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Award className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">Open Source Contributor</h3>
                      <p className="text-xs text-muted-foreground mb-2">500+ contributions to major ML libraries</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Active contributor to PyTorch, Hugging Face Transformers, and TensorFlow
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Award className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">AI Innovation Award</h3>
                      <p className="text-xs text-muted-foreground mb-2">Tech Excellence Summit 2022</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Awarded for breakthrough work in efficient model compression and deployment
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Footer */}
          <footer className="text-center text-sm text-muted-foreground pb-12">
            <p>© 2025 Aryan Rastogi. Built with Next.js and Tailwind CSS.</p>
          </footer>
        </main>
      </div>
    </div>
  )
}
