import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import WorkPreview from "@/components/sections/WorkPreview";
import SiteFrame from "@/components/shell/SiteFrame";

export default function HomePage() {
  return (
    <SiteFrame>
      <main>
        <Hero />
        <Services />
        <Manifesto />
        <WorkPreview />
        <Process />
        <About />

        <section
          id="contact"
          className="border-t border-black/70 px-5 py-16 md:px-8 md:py-24"
        >
          <div className="max-w-4xl">
            <p className="mb-6 font-mono-ui text-[11px] uppercase tracking-[0.24em]">
              [CONTACT]
            </p>
            <h2 className="font-display text-3xl font-bold uppercase italic tracking-[-0.05em] md:text-6xl">
              Ready to build something less template?
            </h2>

            <p className="mt-6 max-w-2xl font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em]">
              For brands that want sharper websites, stronger search visibility,
              and a clearer digital point of view.
            </p>

            <a
              href="mailto:hello@illegalithi.com"
              className="mt-8 inline-flex border border-black px-5 py-3 font-mono-ui text-sm uppercase tracking-[0.16em] transition duration-200 hover:bg-black hover:text-[#ff2a00] focus:bg-black focus:text-[#ff2a00]"
            >
              hello@illegalithi.com
            </a>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}