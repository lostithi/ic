export default function About() {
    return (
      <section
        id="about"
        className="border-t border-black/70 px-5 py-16 md:px-8 md:py-24"
      >
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-3">
            <p className="font-mono-ui text-[11px] uppercase tracking-[0.24em]">
              [WHY ILLEGALITHI]
            </p>
          </div>
  
          <div className="md:col-span-9">
            <h2 className="font-display max-w-5xl text-4xl font-bold uppercase italic tracking-[-0.06em] md:text-6xl lg:text-7xl">
              Built to break boring patterns, not trust.
            </h2>
  
            <div className="mt-8 space-y-6 max-w-3xl">
              <p className="font-mono-ui text-sm uppercase leading-[1.75] tracking-[0.05em]">
                Illegalithi Creations started from the idea that too many brands
                look acceptable, but not memorable. Their websites work, but say
                nothing. Their search presence exists, but lacks shape. Their
                marketing runs, but feels disconnected from the brand behind it.
              </p>
  
              <p className="font-mono-ui text-sm uppercase leading-[1.75] tracking-[0.05em]">
                We bring web, SEO, and strategy together so the digital presence
                feels like one system instead of three disconnected efforts. The
                goal is not more noise. The goal is sharper signals, clearer
                structure, and a brand people actually remember.
              </p>
  
              <p className="font-mono-ui text-sm uppercase leading-[1.75] tracking-[0.05em]">
                The name stays because it carries the attitude: challenge default
                templates, question safe choices, and build work with more edge,
                more intent, and more clarity than the expected version.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }