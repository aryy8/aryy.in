const POSTS = [
  {
    title: "Building an AI That Draws Diagrams Taught Me Nothing About AI and Everything About Systems Design",
    href: "https://medium.com/@aryanfeb17/building-an-ai-that-draws-diagrams-taught-me-nothing-about-ai-and-everything-about-systems-design-c3f87185de7d?sharedUserId=aryanfeb17",
    blurb: "Tried to build a text-to-TikZ diagram generator. Got it wrong twice before figuring out why.",
    tags: ["System Design", "Prompt Engineering", "AI Tools"],
  },
  {
    title: "Implementing Deep Learning by Diving Deep into the Black Box",
    href: "https://medium.com/@aryanfeb17/implementing-deep-learning-by-diving-deep-into-the-black-box-c26b28678309",
    blurb:
      "An Implementation of deep learning in three stages: building a neural network from scratch using NumPy, predicting customer churn with an ANN, and classifying images with a CNN.",
    tags: ["Deep Learning", "CNN", "ANN"],
  },
  {
    title: "A Cursor and Google Colab Workflow for Machine Learning: Replacing Jupyter and ChatGPT",
    href: "https://medium.com/@aryanfeb17/a-cursor-and-google-colab-workflow-for-machine-learning-replacing-jupyter-and-chatgpt-e7c47b39179e",
    blurb:
      "Exploring how to leverage Cursor and Google Colab together to create an efficient machine learning workflow that combines the best of both worlds - replacing traditional Jupyter notebooks and ChatGPT interactions with a more integrated development experience.",
    tags: ["Machine Learning", "Cursor", "Google Colab", "Workflow"],
  },
]

export function BlogList() {
  return (
    <ul className="glass-card rounded-xl divide-y divide-border/40">
      {POSTS.map((p) => (
        <li key={p.href}>
          <a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 p-4 hover:bg-secondary/20 transition-colors">
            <img src="/medium.webp" alt="" width={28} height={28} loading="lazy" decoding="async" className="size-7 rounded bg-white object-cover shrink-0 mt-0.5" />
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1 line-clamp-2" title={p.blurb}>{p.blurb}</p>
              <p className="text-[11px] font-mono text-muted-foreground/80 mt-1.5">
                Medium · 2026 · {p.tags.join(" · ")}
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}
