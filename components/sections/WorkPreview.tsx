const projects = [
    {
      id: "01",
      title: "CG INVESTMENT HOLDINGS",
      type: "CORPORATE WEBSITE / DIGITAL POSITIONING",
      summary:
        "A structured digital presence for a multi-venture group, built to feel credible, modern, and strategically clear.",
    },
    {
      id: "02",
      title: "STUDIO CONCEPT SYSTEM",
      type: "BRAND SYSTEM / WEB EXPERIMENT",
      summary:
        "A concept-led identity and interface direction exploring sharper typography, coded layouts, and anti-template storytelling.",
    },
    {
      id: "03",
      title: "SEO + LANDING PAGE FRAMEWORK",
      type: "SEARCH STRUCTURE / CONVERSION DESIGN",
      summary:
        "A modular page system designed to align messaging, search visibility, and lead capture into one sharper digital flow.",
    },
  ];
  
  export default function WorkPreview() {
    return (
      <section
        id="work"
        className="border-t border-black/70 px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mb-10 max-w-6xl">
          <p className="mb-4 font-mono-ui text-[11px] uppercase tracking-[0.24em]">
            [SELECTED WORK]
          </p>
          <h2 className="font-display max-w-5xl text-4xl font-bold uppercase italic tracking-[-0.06em] md:text-7xl lg:text-8xl">
            Work shaped around clarity, structure, and stronger digital signals.
          </h2>
        </div>
  
        <div className="border-t border-black/70">
          {projects.map((project) => (
            <article
              key={project.id}
              className="grid gap-4 border-b border-black/70 py-6 transition-colors duration-200 hover:bg-black hover:text-[#ff2a00] md:grid-cols-12 md:gap-6 md:py-8"
            >
              <div className="md:col-span-2">
                <p className="font-mono-ui text-[11px] uppercase tracking-[0.24em]">
                  [{project.id}]
                </p>
              </div>
  
              <div className="md:col-span-4">
                <h3 className="font-display text-3xl font-bold uppercase italic tracking-[-0.06em] md:text-5xl">
                  {project.title}
                </h3>
              </div>
  
              <div className="md:col-span-2">
                <p className="font-mono-ui text-[11px] uppercase leading-[1.5] tracking-[0.08em]">
                  {project.type}
                </p>
              </div>
  
              <div className="md:col-span-4">
                <p className="max-w-xl font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em]">
                  {project.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }