import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SectionHeader } from "@/components/section-header"
import { GitHubContributionGrid } from "@/components/github-contribution-grid"
import { LeetCodeStats } from "@/components/leetcode-stats"
import { TechBadge } from "@/components/tech-badge"
import { Navbar } from "@/components/navbar"
import { JupyterCell } from "@/components/jupyter-cell"
import { NotesGrid } from "@/components/notes-grid"
import { Mail, MapPin, Award } from "lucide-react"
import { Github, Linkedin, FileText, Twitter } from "lucide-react"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

      <Navbar />

      <div className="relative z-10 flex flex-col max-w-7xl mx-auto px-6 lg:px-12 py-20 gap-12 pt-32 scroll-smooth">
        <main className="flex-1 max-w-3xl mx-auto snap-y snap-mandatory">
          {/* Hero Section */}
          <section className="mb-16 snap-start">
            <div className="flex items-start gap-8 mb-8">
              <div className="size-24 rounded-lg border-2 border-black/10 ring-4 ring-black/5 shrink-0 overflow-hidden bg-muted/ backdrop-blur-sm">
                <img src="/profile.png" alt="Aryan Rastogi" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h1 className="text-5xl font-bold text-balance tracking-tight">Aryan Rastogi</h1>
                  <img src="/verified.png" alt="Verified" className="size-6" />
                </div>
                <p className="text-xl text-primary mb-6 font-medium">Machine Learning & AI Engineer</p>

                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    <span>Jaipur, India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="size-4" />
                    <a
                      href="mailto:aryanfeb17@gmail.com"
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
                    href="https://x.com/aryyann8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3 h-8 text-xs border border-border/50 rounded-md text-foreground transition-all duration-200 hover:border-foreground hover:text-foreground"
                  >
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    X
                  </a>
                  <a
                    href="/AryanR_Resume.pdf"
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
          <section id="about" className="mb-16 scroll-mt-20 snap-start">
            <SectionHeader>About Me</SectionHeader>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
              <p className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
                I train models to learn &amp; they teach me patience.
              </p>

              <p>
                I am a computer science student working on <span className="text-primary font-medium">machine learning</span>, <span className="text-primary font-medium">computer vision</span>, <span className="text-primary font-medium">NLP</span>, and <span className="text-primary font-medium">applied intelligent systems</span>.
                I craft effective prompts, build <span className="text-primary font-medium">clean frontends</span>, and work comfortably across <span className="text-primary font-medium">backend</span> systems.
              </p>

              <p>
                Off screen, I like to slow down, eat well, and catch up on sleep.
              </p>

            </div>
          </section>

          {/* Tech Stack */}
          <section className="mb-16 snap-start">
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
          <section className="mb-16 snap-start">
            <SectionHeader>GitHub Activity</SectionHeader>
            <GitHubContributionGrid />
          </section>

          {/* LeetCode Stats */}
          <section id="leetcode" className="mb-16 scroll-mt-20 snap-start">
            <SectionHeader>LeetCode Stats</SectionHeader>
            <LeetCodeStats />
          </section>

          {/* Experience Section */}
          <section id="experience" className="mb-16 scroll-mt-20 snap-start">
            <SectionHeader>Work Experience</SectionHeader>
            <div className="space-y-2">

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                        <img src="/sfedu.png" alt="SfedU" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold mb-1">SDE Intern</h3>
                        <p className="text-xs text-muted-foreground mb-2">Southern Federal University, ICTIS • Russia (remote)</p>
                        <p className="text-xs text-muted-foreground/80 leading-relaxed">
                          Developed a web application as an international interdisciplinary project in collaboration with Southern Federal University (ICTIS) & MUJ to support the adaptation of international students. The platform acts as a digital assistant that helps to explore, understand and navigate the campus facilities and improves accessibility for new international students.</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">Oct - Nov 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                        <img src="/elumina.png" alt="Elumina Street Solutions" className="w-full h-full object-cover" />
                      </div>
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
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                        <img src="/ai2.png" alt="AI² Lab" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold mb-1">Research Intern</h3>
                        <p className="text-xs text-muted-foreground mb-2">AI²: computAtional linguIstics & vIsion Lab • MUJ</p>
                        <p className="text-xs text-muted-foreground/80 leading-relaxed">
                          Conducting an ablation study on LLM creativity, evaluating the impact of fine-tuning methods (SFT, LoRA, QLoRA, RLHF,
                          DPO) on creative performance using DAT and AUT benchmarks.
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">Jan 2025 - Present</p>
                    </div>
                  </div>
                </CardContent>
              </Card>


            </div>
          </section>

          <section id="projects" className="mb-16 scroll-mt-20 snap-start">
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
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">

                    Finalist @ National Road Safety Hackathon 2025, IIT Madras
                  </div>
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
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">

                    Winner @ Uniway Hackathon 2025
                  </div>
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
          <section id="achievements" className="mb-16 scroll-mt-20 snap-start">
            <SectionHeader>Achievements & Recognition</SectionHeader>
            <div className="space-y-3">
              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                      <img src="/iitm.png" alt="IIT Madras" className="w-full h-full object-cover" />
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

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                      <img src="/uniway.jpeg" alt="Uniway" className="w-full h-full object-cover" />
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

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                      <img src="/muj.png" alt="Manipal University Jaipur" className="w-full h-full object-cover" />
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

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                      <img src="/superteam.jpg" alt="Superteam" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
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
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0">
                      <img src="/muj.png" alt="Manipal University Jaipur" className="w-full h-full object-cover" />
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
            </div>
          </section>

          {/* Blog Section */}
          <section id="blog" className="mb-16 scroll-mt-20 snap-start">
            <SectionHeader>Blogs</SectionHeader>
            <div className="space-y-4">

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0 bg-white flex items-center justify-center">
                      <img src="/medium.png" alt="Medium" className="w-full h-full object-cover" />
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

              <Card className="glass-card group hover:border-foreground/40 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="size-10 rounded-md overflow-hidden border border-border/30 flex-shrink-0 bg-white flex items-center justify-center">
                      <img src="/medium.png" alt="Medium" className="w-full h-full object-cover" />
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
          <section id="notes" className="mb-16 scroll-mt-20 snap-start">
            <SectionHeader>Knowledge Base</SectionHeader>
            <NotesGrid />
          </section>

          {/* Live ML Playground */}
          <section className="mb-16 snap-start">
            <SectionHeader>Live ML Playground</SectionHeader>
            <JupyterCell />
          </section>
        </main>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pb-12">
          <p>© 2026 Aryan Rastogi.</p>
        </footer>
      </div>
    </div>
  )
}
