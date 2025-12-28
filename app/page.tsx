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
                  <a
                    href="https://github.com/aryy8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3 h-8 text-xs border border-border/50 rounded-md text-foreground transition-all duration-200 hover:border-foreground hover:text-foreground"
                  >
                    <Github className="size-3.5" />
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/aryy8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3 h-8 text-xs border border-border/50 rounded-md text-foreground transition-all duration-200 hover:border-foreground hover:text-foreground"
                  >
                    <Linkedin className="size-3.5" />
                    LinkedIn
                  </a>
                  <a
                    href="/Aryan_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3 h-8 text-xs border border-border/50 rounded-md text-foreground transition-all duration-200 hover:border-foreground hover:text-foreground"
                  >
                    <FileText className="size-3.5" />
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="mb-16 scroll-mt-20">
            <SectionHeader>About Me</SectionHeader>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
              <p>
                I train models to learn &amp; they teach me patience.
              </p>

              <p>
                I am a computer science student working on machine learning, computer vision,
                NLP, and applied intelligent systems.
                I craft effective prompts, build clean frontends, and work comfortably across backend systems.
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

          {/* Experience Section */}
          <section id="experience" className="mb-16 scroll-mt-20">
            <SectionHeader>Work Experience</SectionHeader>
            <div className="space-y-2">
              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold mb-1">AI Engineer Intern</h3>
                      <p className="text-xs text-muted-foreground mb-2">Elumina Street Solutions • Jaipur</p>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed">
                        Developed a violence detection model using CNN (MobileNet) and LSTM in TensorFlow for video-based behavior
                        recognition; improved accuracy with focal loss and class weighting.
                        Implemented and evaluated a real-time weapon detection system using YOLOv8 and OpenCV.
                        Collaborated with the AI research team to analyze model performance, optimize hyperparameters, and enhance detection.
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">April - July 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold mb-1">Research Intern</h3>
                      <p className="text-xs text-muted-foreground mb-2">AI²: computAtional linguIstics & vIsion Lab • MUJ</p>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed">
                        Conducting an ablation study on LLM creativity, evaluating the impact of fine-tuning methods (SFT, LoRA, QLoRA, RLHF,
                        DPO) on creative performance using DAT and AUT benchmarks.
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">Jan 2025 - Present</p>
                    </div>
                  </div>
                </CardContent>
              </Card>


            </div>
          </section>

          <section id="projects" className="mb-16 scroll-mt-20">
            <SectionHeader>Featured Projects</SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/roadeye.png"
                      alt="Roadeye Project"
                      className="max-w-full max-h-full object-contain"

                    />
                  </div>
                </div>
                <CardContent className="p-4 relative z-10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold mb-2">Roadeye</h3>
                      <p className="text-xs text-muted-foreground/80 mb-3 leading-relaxed">
                        An AI powered road audit system that uses deep learning and computer vision to analyze highway videos for detecting road defects and assets. The system automatically generates structured insights and produces professional road audit reports for cost effective infrastructure assessment.                      </p>
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        <TechBadge className="scale-90">Python</TechBadge>
                        <TechBadge className="scale-90">PyTorch</TechBadge>
                        <TechBadge className="scale-90">OpenCV</TechBadge>
                        <TechBadge className="scale-90">FastAPI</TechBadge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">Finalist @ National Road Safety Hackathon 2025, IIT Madras</div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-background">
                    <img
                      src="/p2p.png"
                      alt="Prompt2Plugin Project"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
                <CardContent className="p-4 relative z-10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold mb-2">Prompt2Plugin</h3>
                      <p className="text-xs text-muted-foreground/80 mb-3 leading-relaxed">
                        An AI powered Chrome extension and automation workflow generator that transforms natural language prompts into fully functional Chrome extensions and n8n automation pipelines. The system streamlines automation creation by converting ideas into deployable workflows with minimal manual effort.
                      </p>
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        <TechBadge className="scale-90">React</TechBadge>
                        <TechBadge className="scale-90">Typescript</TechBadge>
                        <TechBadge className="scale-90">n8n</TechBadge>
                        <TechBadge className="scale-90">Chrome API</TechBadge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">Project @ CodeClash 2025</div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-background">
                    <img
                      src="/uniway.png"
                      alt="Uniway Project"
                      className="max-w-full max-h-full object-contain"

                    />
                  </div>
                </div>
                <CardContent className="p-4 relative z-10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold mb-2">Uniway</h3>
                      <p className="text-xs text-muted-foreground/80 mb-3 leading-relaxed">
                        Developed UniWay, a campus navigation platform for MUJ featuring interactive maps, smart search, route guidance, and student services. The system is designed to support future ready extensions such as AI chatbot assistance, crowd heatmaps, volunteer support, public APIs, and 360 degree campus street view.
                      </p>
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        <TechBadge className="scale-90">React</TechBadge>
                        <TechBadge className="scale-90">OSRM</TechBadge>
                        <TechBadge className="scale-90">Google JS APIs</TechBadge>
                        <TechBadge className="scale-90">Leaflet</TechBadge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">Winner @ Uniway Hackathon 2025</div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-background">
                    <img
                      src="/geoverse.png"
                      alt="Geoverse Project"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
                <CardContent className="p-4 relative z-10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold mb-2">Geoverse</h3>
                      <p className="text-xs text-muted-foreground/80 mb-3 leading-relaxed">
                        An AI powered conversational information retrieval system that transforms complex satellite data from the MOSDAC web portal into instant, contextual answers. It leverages NLP, knowledge graphs, and semantic search to enable efficient and intuitive access to dynamic geospatial content.
                      </p>
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        <TechBadge className="scale-90">Python</TechBadge>
                        <TechBadge className="scale-90">NLP</TechBadge>
                        <TechBadge className="scale-90">Knowledge Graphs</TechBadge>
                        <TechBadge className="scale-90">FastAPI</TechBadge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">Project @ BAH ISRO, 2025</div>
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
                      <h3 className="text-sm font-semibold text-foreground mb-1">National Road Safety Hackathon Finalist</h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        National Road Safety Hackathon 2025, IIT Madras
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Shortlisted among the top 10 finalist teams nationwide from 3.6k+ participants at the National Road Safety Hackathon organised by COERs, IIT Madras.
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
                      <h3 className="text-sm font-semibold text-foreground mb-1">UniWay Hackathon Winner</h3>
                      <p className="text-xs text-muted-foreground mb-2">Uniway MUJ Hackathon 2025</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Secured 1st place, won a cash prize, and earned an opportunity to collaborate on a project with Southern Federal University, Russia.
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
                      <h3 className="text-sm font-semibold text-foreground mb-1">Student Excellence Awardee</h3>
                      <p className="text-xs text-muted-foreground mb-2">Manipal University Jaipur, CSE dept 2025</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Awarded for outstanding technical performance, hackathon achievements, and project based innovation during the 3rd semester.
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
                      <h3 className="text-sm font-semibold text-foreground mb-1">Solana Bounty Winner</h3>
                      <p className="text-xs text-muted-foreground mb-2">Superteam India, 2025</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Won a $60 bounty and became a Global Superteam Contributor within the Solana ecosystem.
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
                      <h3 className="text-sm font-semibold text-foreground mb-1">Dean's List Awardee</h3>
                      <p className="text-xs text-muted-foreground mb-2">Manipal University Jaipur, CSE dept 2025</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Named to the Dean’s List in the 2nd semester for academic excellence.
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
            <p>© 2026 Aryan Rastogi. </p>
          </footer>
        </main>
      </div>
    </div>
  )
}
