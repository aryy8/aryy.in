"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

export function WorkExperience() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="space-y-2">
      {/* Top 3 Work Experiences: HPE, Amazon ML, Sylus AI */}
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
                  Shortlisted for the CPP-2 cohort and collaborating on an enterprise project with HPE.
                </p>
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
                  Selected for the prestigious Amazon ML Summer School 2026 program, an intensive machine learning education initiative by Amazon. One of 3,000 students selected from over 1.4 lakh applicants nationwide.
                </p>
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
                <img src="/sylusai.webp" alt="Sylus AI" className="w-full h-full object-cover" />
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

      {/* Minimal View More Bar with remaining experience icons visible */}
      {!isExpanded ? (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-border/25 bg-secondary/10 hover:bg-secondary/25 hover:border-border/50 transition-all duration-200 group text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            {/* Minimal Icons of the remaining experiences */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div
                className="size-7 rounded-md overflow-hidden border border-border/30 bg-muted/20 flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                title="SDE Intern — Southern Federal University"
              >
                <img src="/sfedu.webp" alt="SFedU" className="w-full h-full object-cover" />
              </div>
              <div
                className="size-7 rounded-md overflow-hidden border border-border/30 bg-muted/20 flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                title="AI R&D Intern — Elumina Street Solutions"
              >
                <img src="/elumina.webp" alt="Elumina Street Solutions" className="w-full h-full object-cover" />
              </div>
              <div
                className="size-7 rounded-md overflow-hidden border border-border/30 bg-muted/20 flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                title="Research Intern — AI² Lab"
              >
                <img src="/ai2.webp" alt="AI² Lab" className="w-full h-full object-cover" />
              </div>
            </div>

            <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
              +3 more
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
            <span>View More</span>
            <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
          </div>
        </button>
      ) : (
        /* Expanded View: Remaining 3 experiences */
        <div className="space-y-2">
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
                      Developed a web application as an international interdisciplinary project in collaboration with Southern Federal University (ICTIS) & MUJ to support the adaptation of international students. The platform acts as a digital assistant that helps to explore, understand and navigate the campus facilities and improves accessibility for new international students.
                    </p>
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
                      Developed a violence detection model using CNN (MobileNet) and LSTM in TensorFlow for video-based behavior recognition; improved accuracy with focal loss and class weighting. Implemented and evaluated a real-time weapon detection system using YOLOv8 and OpenCV. Collaborated with the AI research team to analyze model performance, optimize hyperparameters, and enhance detection.
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

          {/* Minimal Show Less Button */}
          <div className="pt-1 text-center">
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false)
                document.getElementById("experience")?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors py-1.5 px-3 rounded-full border border-border/30 hover:border-border/60 bg-secondary/10 hover:bg-secondary/25 cursor-pointer"
            >
              <span>Show Less</span>
              <ChevronUp className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
