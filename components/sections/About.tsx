import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section
      id="about"
      className="border-t border-black/70 px-5 py-16 md:px-8 md:py-24"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-3">
          <p className="kicker-line">[WHY SPINE]</p>
        </div>

        <div className="md:col-span-9">
          <Reveal>
            <h2 className="font-display max-w-5xl text-4xl font-bold uppercase italic tracking-[-0.06em] md:text-6xl lg:text-7xl">
              We don’t decorate weak brands. We give them a backbone.
            </h2>

            <div className="mt-8 max-w-3xl space-y-6">
              <p className="font-mono-ui text-sm uppercase leading-[1.75] tracking-[0.05em]">
                Spine started from a simple observation: too many brands look
                finished on the surface and unfinished underneath. The website
                exists. The SEO exists. The marketing exists. But nothing holds
                them in one clear line.
              </p>

              <p className="font-mono-ui text-sm uppercase leading-[1.75] tracking-[0.05em]">
                We treat web, SEO, and strategy as one structure. Message first.
                Architecture second. Build third. That order keeps the digital
                presence upright when trends, campaigns, and page count try to
                bend it.
              </p>

              <p className="font-mono-ui text-sm uppercase leading-[1.75] tracking-[0.05em]">
                The name is the job: build the spine. Then let the brand stand.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
