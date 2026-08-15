"use client"

export function AgenticView() {
  return (
    <div className="w-full font-mono text-sm space-y-10 animate-in fade-in duration-300">
      {/* IDENTITY SECTION */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">
          IDENTITY
        </h2>
        <div className="divide-y divide-border/40">
          <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <span className="text-muted-foreground w-32 shrink-0 font-mono text-xs">name</span>
            <span className="text-foreground font-medium flex-1">Aryan Rastogi</span>
          </div>
          <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <span className="text-muted-foreground w-32 shrink-0 font-mono text-xs">role</span>
            <span className="text-foreground font-medium flex-1">AI Engineer, Researcher, Machine Learning Engineer</span>
          </div>
          <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <span className="text-muted-foreground w-32 shrink-0 font-mono text-xs">location</span>
            <span className="text-foreground font-medium flex-1">Jaipur, India</span>
          </div>
          <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <span className="text-muted-foreground w-32 shrink-0 font-mono text-xs">email</span>
            <a href="mailto:aryanfeb17@gmail.com" className="text-foreground hover:underline flex-1">
              aryanfeb17@gmail.com
            </a>
          </div>
          <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <span className="text-muted-foreground w-32 shrink-0 font-mono text-xs">status</span>
            <span className="text-foreground/90 leading-relaxed flex-1">
              AI Engineer @ Sylus AI | Amazon MLSS '26 Scholar | CS @ Manipal University Jaipur. Building LLM applications, agentic pipelines, and researching AI Safety & Alignment.
            </span>
          </div>
        </div>
      </div>

      {/* LINKS SECTION */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">
          LINKS
        </h2>
        <div className="divide-y divide-border/40">
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-muted-foreground w-32 shrink-0 font-mono text-xs">github</span>
            <a href="https://github.com/aryy8" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline flex-1 truncate">
              github.com/aryy8
            </a>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-muted-foreground w-32 shrink-0 font-mono text-xs">linkedin</span>
            <a href="https://linkedin.com/in/aryy8" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline flex-1 truncate">
              linkedin.com/in/aryy8
            </a>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-muted-foreground w-32 shrink-0 font-mono text-xs">twitter</span>
            <a href="https://x.com/aryyann8" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline flex-1 truncate">
              x.com/aryyann8
            </a>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-muted-foreground w-32 shrink-0 font-mono text-xs">resume</span>
            <a href="/Aryan_Rastogi_resume.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline flex-1 truncate">
              Aryan_Rastogi_resume.pdf
            </a>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-muted-foreground w-32 shrink-0 font-mono text-xs">llms.txt</span>
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline flex-1 truncate">
              llms.txt
            </a>
          </div>
        </div>
      </div>

      {/* EXPERIENCE SECTION */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">
          EXPERIENCE
        </h2>
        <div className="space-y-5">
          <div className="border-b border-border/30 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <span className="text-foreground font-semibold">Amazon ML Summer School — ML Scholar</span>
              <span className="text-xs text-muted-foreground">Jul 2026 – Present · Remote</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
              Selected among top ~2% of applicants nationwide (3,000 / 140,000+) for Amazon's flagship ML education initiative.
            </p>
          </div>

          <div className="border-b border-border/30 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <span className="text-foreground font-semibold">Sylus AI — AI Engineer</span>
              <span className="text-xs text-muted-foreground">Apr 2026 – Present · Remote</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
              Building AI-driven SaaS features, LLM workflows, database pipelines, and REST APIs.
            </p>
          </div>

          <div className="border-b border-border/30 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <span className="text-foreground font-semibold">Southern Federal University (ICTIS) — SDE Intern</span>
              <span className="text-xs text-muted-foreground">Oct – Nov 2025 · Russia (Remote)</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
              Built digital assistant app for international student campus adaptation.
            </p>
          </div>

          <div className="border-b border-border/30 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <span className="text-foreground font-semibold">Elumina Street Solutions — AI R&D Intern</span>
              <span className="text-xs text-muted-foreground">Apr – Jul 2025 · Jaipur</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
              Developed violence detection (MobileNet + LSTM) & weapon detection (YOLOv8 + OpenCV).
            </p>
          </div>

          <div className="border-b border-border/30 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <span className="text-foreground font-semibold">AI² Lab (MUJ) — Research Intern</span>
              <span className="text-xs text-muted-foreground">Jan 2025 – Present · Jaipur</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
              Leading SafeAlign LLM safety evaluation & Alignment Tax research on SFT/DPO narrative entropy.
            </p>
          </div>
        </div>
      </div>

      {/* RESEARCH SECTION */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">
          RESEARCH & PREPRINTS
        </h2>
        <div className="space-y-4">
          <div className="border-b border-border/30 pb-3">
            <h3 className="text-foreground font-medium text-xs sm:text-sm">
              SafeAlign: A Multi-Paradigm Pipeline for LLM Safety Evaluation via Taxonomy-Guided Data Curation
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Result: 66M DistilBERT trained on taxonomy-denoised HH-RLHF achieves 81.3% safety accuracy vs 59.5% on raw data.
            </p>
          </div>

          <div className="border-b border-border/30 pb-3">
            <h3 className="text-foreground font-medium text-xs sm:text-sm">
              Quantifying the Alignment Tax: Tracking Creativity and Semantic Entropy through SFT and DPO Pipeline
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Result: Empirically proved DPO collapses narrative creativity (Semantic Entropy drops 0.7153 → 0.3591 on Mistral-7B).
            </p>
          </div>
        </div>
      </div>

      {/* SKILLS SECTION */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">
          SKILLS
        </h2>
        <div className="divide-y divide-border/40 text-xs">
          <div className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <span className="text-muted-foreground w-32 shrink-0">languages</span>
            <span className="text-foreground flex-1">Python, C++, SQL, TypeScript, JavaScript</span>
          </div>
          <div className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <span className="text-muted-foreground w-32 shrink-0">ml / ai</span>
            <span className="text-foreground flex-1">PyTorch, TensorFlow, Scikit-learn, Hugging Face, LangChain, OpenCV</span>
          </div>
          <div className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <span className="text-muted-foreground w-32 shrink-0">full stack</span>
            <span className="text-foreground flex-1">React, Next.js, Node.js, REST APIs, Supabase, TailwindCSS</span>
          </div>
          <div className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <span className="text-muted-foreground w-32 shrink-0">tools</span>
            <span className="text-foreground flex-1">FastAPI, AWS, GCP, Docker, Kaggle, Git, Linux</span>
          </div>
        </div>
      </div>
    </div>
  )
}
