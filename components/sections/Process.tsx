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
    <section id="process" className="vertebra-stop">
      <div className="vertebra-panel proc-panel">
        <div className="proc-top">
          <p className="kicker-line proc-kicker">[PROCESS]</p>
          <Reveal>
            <div className="proc-top-row">
              <h2 className="proc-thesis">
                Align first. Then structure, build, and strengthen until the
                system stands on its own.
              </h2>
              <p className="proc-cue">
                <span className="proc-cue-label">Five phases</span>
                <span className="proc-cue-arrow" aria-hidden="true">
                  →
                </span>
              </p>
            </div>
          </Reveal>
        </div>

        <div className="proc-scroll-outer">
          <ol className="proc-scroll">
            {steps.map((step) => (
              <li key={step.id} className="proc-card">
                <span className="proc-card-num">{step.id}</span>
                <h3 className="proc-card-title">{step.title}</h3>
                <p className="proc-card-copy">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
