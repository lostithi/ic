import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SiteFooter from "@/components/shell/SiteFooter";
import SiteFrame from "@/components/shell/SiteFrame";
import { caseStudies } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected Spine work across websites, SEO systems, and digital strategy.",
};

export default function WorkPage() {
  return (
    <SiteFrame>
      <main>
        <section className="px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <div className="mb-10 max-w-6xl">
              <p className="kicker-line mb-4">[WORK]</p>
              <h1 className="font-display max-w-5xl text-4xl font-bold uppercase italic tracking-[-0.06em] md:text-7xl lg:text-8xl">
                Selected systems built with structure, clarity, and a backbone.
              </h1>
              <p className="mt-6 max-w-2xl font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em] text-white/75">
                Case notes from web, SEO, and strategy work. Replace these with
                live client outcomes as projects ship.
              </p>
            </div>
          </Reveal>

          <div className="border-t border-white/25">
            {caseStudies.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="spine-row grid gap-4 border-b border-white/25 py-6 md:grid-cols-12 md:gap-6 md:py-8"
              >
                <div className="md:col-span-2">
                  <p className="font-mono-ui text-[11px] uppercase tracking-[0.24em]">
                    [{project.id}]
                  </p>
                </div>

                <div className="md:col-span-4">
                  <h2 className="font-display text-3xl font-bold uppercase italic tracking-[-0.06em] md:text-5xl">
                    {project.title}
                  </h2>
                </div>

                <div className="md:col-span-2">
                  <p className="font-mono-ui text-[11px] uppercase leading-[1.5] tracking-[0.08em]">
                    {project.type}
                  </p>
                </div>

                <div className="md:col-span-4">
                  <p className="max-w-xl font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em]">
                    {project.summary}
                  </p>
                  <p className="mt-4 font-mono-ui text-[11px] uppercase tracking-[0.18em]">
                    Open case →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteFrame>
  );
}
