import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { caseStudies } from "@/lib/work";

export default function WorkPreview() {
  return (
    <section id="work" className="vertebra-stop">
      <div className="vertebra-panel">
        <Reveal>
          <div className="mb-10 flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kicker-line mb-4">[WORK]</p>
              <h2 className="font-display max-w-5xl text-4xl font-bold uppercase italic tracking-[-0.06em] md:text-7xl lg:text-8xl">
                Work shaped around structure, clarity, and systems that stand
                up.
              </h2>
            </div>
            <Link href="/work" className="btn-ghost shrink-0">
              View all work
            </Link>
          </div>
        </Reveal>

        <div className="border-t border-white/20">
          {caseStudies.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="spine-row grid gap-4 border-b border-white/20 py-6 md:grid-cols-12 md:gap-6 md:py-8"
            >
              <div className="md:col-span-2">
                <p className="font-mono-ui text-[11px] uppercase tracking-[0.24em]">
                  [{project.id}]
                </p>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-3xl font-bold uppercase italic tracking-[-0.06em] md:text-5xl">
                  {project.title}
                </h3>
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
      </div>
    </section>
  );
}
