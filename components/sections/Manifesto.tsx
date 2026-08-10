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
    <section className="relative overflow-hidden border-t border-white/25 px-5 py-16 md:px-8 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] opacity-[0.14] md:block"
        style={{
          backgroundImage: "url(/spine/sigil.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
        }}
      />

      <div className="relative grid gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-3">
          <p className="kicker-line">[MANIFESTO]</p>
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
              Spine brings web, SEO, and strategy together so ambitious brands
              stop looking <span className="inline-box">soft</span>, fragmented,
              or stuck in <span className="inline-cut">template mode</span>.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
