import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="about" className="vertebra-stop">
      <div className="vertebra-panel">
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-3">
            <p className="kicker-line">[VERTEBRA // WHY SPINE]</p>
          </div>

          <div className="md:col-span-9">
            <Reveal>
              <h2 className="font-display max-w-5xl text-4xl font-bold uppercase italic tracking-[-0.06em] md:text-6xl lg:text-7xl">
                We don’t decorate weak brands. We give them a backbone.
              </h2>

              <div className="mt-8 max-w-3xl space-y-6">
                <p className="font-mono-ui text-sm uppercase leading-[1.75] tracking-[0.05em] text-white/80">
                  This page is the metaphor: you start at the skull and descend
                  the column. Each stop is a vertebra. The whole path is the
                  brand.
                </p>

                <p className="font-mono-ui text-sm uppercase leading-[1.75] tracking-[0.05em] text-white/80">
                  We treat web, SEO, and strategy the same way — one vertical
                  system, not three disconnected layers. Message first.
                  Architecture second. Build third.
                </p>

                <p className="font-mono-ui text-sm uppercase leading-[1.75] tracking-[0.05em] text-white/80">
                  The name is the job: build the spine. Then let the brand
                  stand.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
