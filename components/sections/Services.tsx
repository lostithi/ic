const services = [
  {
    id: "01",
    title: "WEB.DEV",
    content: (
      <>
        Fast, focused websites built to signal{" "}
        <span className="inline-bar">credibility</span>, sharpen experience,
        and convert attention into <span className="inline-cut">action</span>.
      </>
    ),
  },
  {
    id: "02",
    title: "SEO.OPT",
    content: (
      <>
        Search-ready structures, technical{" "}
        <span className="inline-box">clarity</span>, and content systems
        designed to make the right people <span className="inline-cut">find you</span>.
      </>
    ),
  },
  {
    id: "03",
    title: "STRATEGY",
    content: (
      <>
        Brand positioning, <span className="inline-bar">messaging</span>, and
        digital direction that stop ambitious businesses from looking like
        everyone else.
      </>
    ),
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="border-t border-black/70 px-5 py-16 md:px-8 md:py-24"
    >
      <div className="mb-10 max-w-6xl">
        <p className="kicker-line mb-4">[SERVICES]</p>

        <h2 className="font-display max-w-5xl text-4xl font-bold uppercase italic tracking-[-0.06em] md:text-7xl lg:text-8xl">
          Built for brands that want more <span className="inline-box">signal</span>{" "}
          and less <span className="text-stroke-black">template</span>.
        </h2>
      </div>

      <div className="border-t border-black/70">
        {services.map((service) => (
          <div
            key={service.id}
            className="grid gap-4 border-b border-black/70 py-6 transition-colors duration-200 hover:bg-black hover:text-[#ff2a00] md:grid-cols-12 md:gap-6 md:py-8"
          >
            <div className="md:col-span-2">
              <p className="font-mono-ui text-[11px] uppercase tracking-[0.24em]">
                [{service.id}]
              </p>
            </div>

            <div className="md:col-span-4">
              <h3 className="font-display text-3xl font-bold uppercase italic tracking-[-0.06em] md:text-5xl">
                {service.title}
              </h3>
            </div>

            <div className="md:col-span-6">
              <p className="max-w-xl font-mono-ui text-sm uppercase leading-[1.5] tracking-[0.06em]">
                {service.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}