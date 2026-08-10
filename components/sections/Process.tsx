import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    id: "01",
    title: "Align",
    text: "We define the core message, audience, and point of difference — the vertical line everything else should attach to.",
  },
  {
    id: "02",
    title: "Structure",
    text: "We map the information architecture, page logic, and search intent so the site has a real backbone before visuals take over.",
  },
  {
    id: "03",
    title: "Build",
    text: "We turn that structure into a focused website: sharper content, clearer journeys, and systems that feel intentional.",
  },
  {
    id: "04",
    title: "Strengthen",
    text: "We reinforce SEO, conversion paths, and technical clarity so the presence stays upright under real traffic.",
  },
  {
    id: "05",
    title: "Stand",
    text: "We support the next stage with campaign thinking and iterative improvements — without bending the core structure.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="border-t border-white/25 px-5 py-16 md:px-8 md:py-24"
    >
      <Reveal>
        <div className="mb-10 max-w-5xl">
          <p className="kicker-line mb-4">[PROCESS]</p>
          <h2 className="font-display text-4xl font-bold uppercase italic tracking-[-0.05em] md:text-6xl lg:text-7xl">
            Align first. Then structure, build, and strengthen until the system
            stands on its own.
          </h2>
        </div>
      </Reveal>

      <div className="border-t border-white/25">
        {steps.map((step) => (
          <div
            key={step.id}
            className="spine-row grid gap-4 border-b border-white/25 py-6 md:grid-cols-12 md:gap-6 md:py-8"
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
