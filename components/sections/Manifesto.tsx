import Reveal from "@/components/ui/Reveal";

const manifestoLines = [
  "Most brands do not have a visibility problem.",
  "They have a structure problem.",
  "Their website leans one way.",
  "Their search presence leans another.",
  "Their marketing bends with every weekly trend.",
  "We build the spine so all three stand upright.",
];

export default function Manifesto() {
  return (
    <section id="manifesto" className="vertebra-stop">
      <div className="vertebra-panel">
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-3">
            <p className="kicker-line">[VERTEBRA // MANIFESTO]</p>
          </div>

          <div className="md:col-span-9">
            <Reveal>
              <div className="space-y-3 md:space-y-4">
                {manifestoLines.map((line, index) => (
                  <p
                    key={line}
                    className="font-display text-3xl font-bold uppercase italic tracking-[-0.05em] md:text-5xl lg:text-6xl"
                  >
                    {index === 1 ? (
                      <>
                        They have a <span className="inline-box">structure</span>{" "}
                        problem.
                      </>
                    ) : index === 4 ? (
                      <>
                        Their marketing bends with every weekly{" "}
                        <span className="inline-cut">trend</span>.
                      </>
                    ) : index === 5 ? (
                      <>
                        We build the <span className="inline-bar">spine</span> so
                        all three stand upright.
                      </>
                    ) : (
                      line
                    )}
                  </p>
                ))}
              </div>

              <p className="mt-10 max-w-2xl font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.06em] text-white/75">
                Start at the head. Descend the system. Each section is a
                vertebra — one backbone for web, SEO, and strategy.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
