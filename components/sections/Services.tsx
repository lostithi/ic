import Reveal from "@/components/ui/Reveal";

const services = [
  {
    id: "01",
    title: "WEB.DEV",
    content: (
      <>
        Focused websites built as brand{" "}
        <span className="inline-bar">structure</span> — clear hierarchy,
        stronger journeys, and pages that convert attention into{" "}
        <span className="inline-cut">action</span>.
      </>
    ),
  },
  {
    id: "02",
    title: "SEO.OPT",
    content: (
      <>
        Search architecture that supports the same story as the site: technical{" "}
        <span className="inline-box">clarity</span>, intent-led pages, and
        systems that help the right people{" "}
        <span className="inline-cut">find you</span>.
      </>
    ),
  },
  {
    id: "03",
    title: "STRATEGY",
    content: (
      <>
        Positioning and messaging that give the whole system a{" "}
        <span className="inline-bar">backbone</span> — so web and SEO are not
        guessing what the brand is supposed to be.
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
      <Reveal>
        <div className="mb-10 max-w-6xl">
          <p className="kicker-line mb-4">[SERVICES]</p>

          <h2 className="font-display max-w-5xl text-4xl font-bold uppercase italic tracking-[-0.06em] md:text-7xl lg:text-8xl">
            Built for brands that need a{" "}
            <span className="inline-box">spine</span>, not another{" "}
            <span className="text-stroke-black">template</span>.
          </h2>
        </div>
      </Reveal>

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
