import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/sections/ContactForm";
import SpineEnvironment from "@/components/spine/SpineEnvironment";
import SiteFooter from "@/components/shell/SiteFooter";
import SiteFrame from "@/components/shell/SiteFrame";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Start with structure",
  description: brand.ads.support,
  alternates: {
    canonical: "/start",
  },
  openGraph: {
    title: `${brand.name} — Start with structure`,
    description: brand.ads.support,
    url: `${brand.url}/start`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function StartPage() {
  return (
    <SiteFrame>
      <main>
        <section className="relative flex min-h-[85vh] items-end overflow-hidden px-5 pb-10 pt-24 md:px-8 md:pb-14 md:pt-28">
          <SpineEnvironment />

          <div className="relative z-10 w-full max-w-5xl">
            <p className="kicker-line mb-6">{brand.code} // PAID ENTRY</p>
            <h1 className="font-display text-6xl font-bold uppercase italic tracking-[-0.07em] md:text-8xl lg:text-9xl">
              {brand.name}
            </h1>
            <p className="mt-6 max-w-2xl font-display text-2xl font-bold uppercase italic tracking-[-0.04em] md:text-4xl">
              {brand.ads.headline}
            </p>
            <p className="mt-5 max-w-xl font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em] text-white/80">
              {brand.ads.support}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={brand.ads.primaryHref} className="btn-solid">
                {brand.ads.primaryCta}
              </a>
              <Link href={brand.offer.secondaryHref} className="btn-ghost">
                {brand.offer.secondaryCta}
              </Link>
            </div>
          </div>
        </section>

        <section
          id="brief"
          className="border-t border-white/25 px-5 py-16 md:px-8 md:py-24"
        >
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <p className="kicker-line mb-4">[PROJECT BRIEF]</p>
              <h2 className="font-display text-3xl font-bold uppercase italic tracking-[-0.05em] md:text-5xl">
                Tell us what needs a backbone.
              </h2>
              <p className="mt-5 max-w-md font-mono-ui text-sm uppercase leading-[1.65] tracking-[0.05em] text-white/75">
                One form. Clear intake. We start with structure, not decoration.
              </p>
              <ul className="mt-8 space-y-3 font-mono-ui text-[11px] uppercase tracking-[0.16em]">
                <li>01 // Website structure or rebuild</li>
                <li>02 // SEO architecture and visibility</li>
                <li>03 // Positioning and digital strategy</li>
              </ul>
            </div>

            <div className="md:col-span-7">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteFrame>
  );
}
