"use client"

const POSTS = [
  {
    title: "Building an AI That Draws Diagrams",
    fullTitle: "Building an AI That Draws Diagrams Taught Me Nothing About AI and Everything About Systems Design",
    href: "https://medium.com/@aryanfeb17/building-an-ai-that-draws-diagrams-taught-me-nothing-about-ai-and-everything-about-systems-design-c3f87185de7d?sharedUserId=aryanfeb17",
    blurb: "Tried to build a text-to-TikZ diagram generator. Got it wrong twice before figuring out why.",
    tags: "System Design · AI Tools",
    year: "2026",
  },
  {
    title: "Deep Learning into the Black Box",
    fullTitle: "Implementing Deep Learning by Diving Deep into the Black Box",
    href: "https://medium.com/@aryanfeb17/implementing-deep-learning-by-diving-deep-into-the-black-box-c26b28678309",
    blurb: "From scratch with NumPy, churn with ANN, and image classification with CNN.",
    tags: "Deep Learning · CNN · ANN",
    year: "2025",
  },
  {
    title: "Cursor & Colab Workflow for ML",
    fullTitle: "A Cursor and Google Colab Workflow for Machine Learning: Replacing Jupyter and ChatGPT",
    href: "https://medium.com/@aryanfeb17/a-cursor-and-google-colab-workflow-for-machine-learning-replacing-jupyter-and-chatgpt-e7c47b39179e",
    blurb: "Replacing traditional Jupyter notebooks and ChatGPT interactions with an integrated setup.",
    tags: "Workflow · Colab · Cursor",
    year: "2025",
  },
]

export function BlogList() {
  return (
    <div className="divide-y divide-border/20 border-y border-border/25">
      {POSTS.map((p) => (
        <a
          key={p.href}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between py-2.5 sm:py-3 px-1 sm:px-2 -mx-1 sm:-mx-2 rounded-lg hover:bg-muted/15 transition-colors duration-150"
        >
          {/* Left: Small Round Medium Icon, Title, Tags */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-6 sm:size-7 rounded-full overflow-hidden border border-border/40 shrink-0 flex items-center justify-center bg-white p-0.5">
              <img
                src="/medium.webp"
                alt="Medium"
                className="w-full h-full object-contain rounded-full"
              />
            </div>

            <div className="min-w-0 flex items-center gap-2 flex-wrap">
              <span
                className="text-sm font-medium text-foreground tracking-tight group-hover:text-primary transition-colors"
                title={p.fullTitle}
              >
                {p.title}
              </span>
              <span className="text-xs text-muted-foreground/35">·</span>
              <span className="text-xs text-muted-foreground truncate">
                {p.tags}
              </span>
            </div>
          </div>

          {/* Right: Year */}
          <div className="shrink-0 text-right pl-3">
            <span className="text-xs font-mono text-muted-foreground/60 group-hover:text-muted-foreground/90 transition-colors">
              {p.year}
            </span>
          </div>
        </a>
      ))}
    </div>
  )
}

