const PAPERS = [
  {
    title: "SafeAlign: A Multi-Paradigm Pipeline for LLM Safety Evaluation via Taxonomy-Guided Data Curation",
    authors: "Aryan Rastogi, Dr. Varda Pareek — Manipal University Jaipur",
    tags: ["LLM Safety", "RLHF", "DPO", "Data Curation", "HH-RLHF"],
    finding:
      "Taxonomy-guided label denoising outperforms model scale — a 66M DistilBERT on filtered data beats a 774M baseline on safety classification.",
    status: "Under Review / Preprint",
  },
  {
    title: "Quantifying the Alignment Tax: Tracking Creativity and Semantic Entropy through the SFT and DPO Pipeline",
    authors: "Harshita Singh, Aryan Rastogi — Manipal University Jaipur",
    tags: ["Alignment Tax", "Semantic Entropy", "DPO", "Creativity", "LLMs"],
    finding:
      "DPO systematically collapses semantic diversity — creative narrative divergence drops from 0.7153 (base) to 0.3591 (post-DPO) on Mistral-7B.",
    status: "Under Review / Preprint",
  },
]

export function ResearchList() {
  return (
    <ul className="glass-card rounded-xl divide-y divide-border/40">
      {PAPERS.map((p) => (
        <li key={p.title} className="p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm sm:text-base font-semibold text-foreground leading-snug">{p.title}</h3>
            <span className="hidden sm:inline shrink-0 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-muted/50 text-muted-foreground border border-border/30">
              {p.status}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {p.authors}
            <span className="sm:hidden"> · {p.status}</span>
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed italic mt-2">{p.finding}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {p.tags.map((t) => (
              <span key={t} className="px-1.5 py-0.5 rounded text-[11px] bg-accent-cold/10 text-accent-cold border border-accent-cold/20">
                {t}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}
