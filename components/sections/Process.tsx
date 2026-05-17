const steps = [
    {
      id: "01",
      title: "Audit",
      text: "We examine your current brand, site, and search presence to see what is working, what is unclear, and where attention is leaking.",
    },
    {
      id: "02",
      title: "Position",
      text: "We define the message, the point of difference, and the digital angle that should shape how people understand your brand.",
    },
    {
      id: "03",
      title: "Build",
      text: "We turn that strategy into a focused website structure, sharper content, and a clearer user journey.",
    },
    {
      id: "04",
      title: "Optimize",
      text: "We strengthen SEO, page logic, and search intent so your online presence becomes easier to find and easier to trust.",
    },
    {
      id: "05",
      title: "Grow",
      text: "We support the next stage through campaign thinking, content direction, and iterative digital improvements.",
    },
  ];
  
  export default function Process() {
    return (
      <section
        id="process"
        className="border-t border-black/70 px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mb-10 max-w-5xl">
          <p className="mb-4 font-mono-ui text-[11px] uppercase tracking-[0.24em]">
            [PROCESS]
          </p>
          <h2 className="font-display text-4xl font-bold uppercase italic tracking-[-0.05em] md:text-6xl lg:text-7xl">
            Strategy first. Then sharper systems, stronger signals, and better
            digital timing.
          </h2>
        </div>
  
        <div className="border-t border-black/70">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group grid gap-4 border-b border-black/70 py-6 transition-colors duration-200 hover:bg-black hover:text-[#ff2a00] md:grid-cols-12 md:gap-6 md:py-8"
            >
              <div className="md:col-span-2">
                <p className="font-mono-ui text-[11px] uppercase tracking-[0.24em]">
                  [{step.id}]
                </p>
              </div>
  
              <div className="md:col-span-3">
                <h3 className="font-display text-3xl font-bold uppercase italic tracking-[-0.06em] md:text-4xl">
                  {step.title}
                </h3>
              </div>
  
              <div className="md:col-span-7">
                <p className="max-w-2xl font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em]">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }