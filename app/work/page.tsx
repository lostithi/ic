import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SiteFooter from "@/components/shell/SiteFooter";
import SiteFrame from "@/components/shell/SiteFrame";
import WorkStage from "@/components/spine/WorkStage";
import { caseStudies } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected Spine work across websites, SEO systems, and digital strategy.",
};

export default function WorkPage() {
  return (
    <SiteFrame>
      <WorkStage>
        <main>
          <section className="shell-page">
            <Reveal>
              <div className="mb-10 max-w-xl md:max-w-2xl lg:max-w-3xl">
                <p className="kicker-line mb-4">[WORK // SPECIMEN]</p>
                <h1 className="font-display text-4xl font-bold uppercase italic tracking-[-0.06em] md:text-7xl lg:text-8xl">
                  Selected systems pinned with structure.
                </h1>
                <p className="mt-6 max-w-xl font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em] text-white/75">
                  Case notes held in place — web, SEO, and strategy as one fixed
                  column. Replace these with live client outcomes as projects
                  ship.
                </p>
              </div>
            </Reveal>

            <div className="max-w-xl border-t border-white/25 bg-black/35 backdrop-blur-[2px] md:max-w-2xl lg:max-w-3xl">
              {caseStudies.map((project) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="spine-row grid gap-4 border-b border-white/25 py-6 md:grid-cols-12 md:gap-5 md:py-8"
                >
                  <div className="md:col-span-2">
                    <p className="font-mono-ui text-[11px] uppercase tracking-[0.24em]">
                      [{project.id}]
                    </p>
                  </div>

                  <div className="md:col-span-5">
                    <h2 className="font-display text-3xl font-bold uppercase italic tracking-[-0.06em] md:text-4xl lg:text-5xl">
                      {project.title}
                    </h2>
                  </div>

                  <div className="md:col-span-5">
                    <p className="font-mono-ui text-[11px] uppercase leading-[1.5] tracking-[0.08em] text-white/70">
                      {project.type}
                    </p>
                    <p className="mt-3 max-w-md font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em]">
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
      </WorkStage>
    </SiteFrame>
  );
}
