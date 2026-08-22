import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import SiteFooter from "@/components/shell/SiteFooter";
import SiteFrame from "@/components/shell/SiteFrame";
import {
  caseStudies,
  getAllCaseStudySlugs,
  getCaseStudy,
} from "@/lib/work";

type WorkCasePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkCasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return { title: "Case study" };
  }

  return {
    title: study.title,
    description: study.summary,
  };
}

export default async function WorkCasePage({ params }: WorkCasePageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const currentIndex = caseStudies.findIndex((item) => item.slug === slug);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <SiteFrame>
      <main>
        <article className="shell-page">
          <Reveal>
            <div className="mb-10 max-w-5xl">
              <p className="kicker-line mb-4">
                [CASE {study.id}] // {study.year}
              </p>
              <h1 className="font-display text-4xl font-bold uppercase italic tracking-[-0.06em] md:text-7xl">
                {study.title}
              </h1>
              <p className="mt-4 font-mono-ui text-[11px] uppercase tracking-[0.16em]">
                {study.type}
              </p>
              <p className="mt-6 max-w-3xl font-mono-ui text-sm uppercase leading-[1.7] tracking-[0.05em] text-white/80">
                {study.summary}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 border-t border-white/25 py-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-mono-ui text-[11px] uppercase tracking-[0.2em]">
                Role
              </p>
              <p className="mt-2 font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em]">
                {study.role}
              </p>
            </div>
            <div className="md:col-span-4">
              <p className="font-mono-ui text-[11px] uppercase tracking-[0.2em]">
                Services
              </p>
              <p className="mt-2 font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em]">
                {study.services.join(" / ")}
              </p>
            </div>
            <div className="md:col-span-4">
              <p className="font-mono-ui text-[11px] uppercase tracking-[0.2em]">
                Year
              </p>
              <p className="mt-2 font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em]">
                {study.year}
              </p>
              {study.repo ? (
                <a
                  href={study.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex font-mono-ui text-[11px] uppercase tracking-[0.18em] underline decoration-white/30 underline-offset-4"
                >
                  View repo →
                </a>
              ) : null}
            </div>
          </div>

          <section className="border-t border-white/25 py-10">
            <p className="kicker-line mb-4">[CHALLENGE]</p>
            <p className="max-w-3xl font-mono-ui text-sm uppercase leading-[1.75] tracking-[0.05em] text-white/80">
              {study.challenge}
            </p>
          </section>

          <section className="border-t border-white/25 py-10">
            <p className="kicker-line mb-6">[APPROACH]</p>
            <ol className="space-y-4">
              {study.approach.map((step, index) => (
                <li
                  key={step}
                  className="grid gap-3 border-b border-white/20 pb-4 md:grid-cols-12"
                >
                  <p className="font-mono-ui text-[11px] uppercase tracking-[0.2em] md:col-span-2">
                    [{String(index + 1).padStart(2, "0")}]
                  </p>
                  <p className="font-mono-ui text-sm uppercase leading-[1.7] tracking-[0.05em] md:col-span-10">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="border-t border-white/25 py-10">
            <p className="kicker-line mb-4">[OUTCOME]</p>
            <p className="max-w-3xl font-display text-2xl font-bold uppercase italic tracking-[-0.04em] md:text-4xl">
              {study.outcome}
            </p>
          </section>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-white/25 pt-8">
            <Link href="/work" className="btn-ghost">
              All work
            </Link>
            <Link href={`/work/${nextStudy.slug}`} className="btn-solid">
              Next case
            </Link>
            <Link href="/#contact" className="btn-ghost">
              Start a project
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </SiteFrame>
  );
}
