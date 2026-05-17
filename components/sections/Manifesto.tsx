const manifestoLines = [
  "Most brands do not have a visibility problem.",
  "They have a clarity problem.",
  "Their website says one thing.",
  "Their search presence says another.",
  "Their marketing says whatever was easiest to ship that week.",
  "We build sharper systems so all three speak the same language.",
];

export default function Manifesto() {
  return (
    <section className="border-t border-black/70 px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-3">
          <p className="kicker-line">[MANIFESTO]</p>
        </div>

        <div className="md:col-span-9">
          <div className="space-y-3 md:space-y-4">
            {manifestoLines.map((line, index) => (
              <p
                key={line}
                className="font-display text-3xl font-bold uppercase italic tracking-[-0.05em] md:text-5xl lg:text-6xl"
              >
                {index === 1 ? (
                  <>
                    They have a <span className="inline-box">clarity</span>{" "}
                    problem.
                  </>
                ) : index === 4 ? (
                  <>
                    Their marketing says whatever was easiest to{" "}
                    <span className="inline-cut">ship</span> that week.
                  </>
                ) : index === 5 ? (
                  <>
                    We build <span className="inline-bar">sharper systems</span>{" "}
                    so all three speak the same language.
                  </>
                ) : (
                  line
                )}
              </p>
            ))}
          </div>

          <p className="mt-10 max-w-2xl font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.06em]">
            Illegalithi Creations brings web, SEO, and strategy together so
            ambitious brands stop feeling <span className="inline-box">fragmented</span>,
            forgettable, or stuck in <span className="inline-cut">template mode</span>.
          </p>
        </div>
      </div>
    </section>
  );
}