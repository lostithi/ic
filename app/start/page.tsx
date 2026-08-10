import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/sections/ContactForm";
import SiteFooter from "@/components/shell/SiteFooter";
import SiteFrame from "@/components/shell/SiteFrame";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Start a project",
  description: brand.ads.support,
  alternates: {
    canonical: "/start",
  },
  openGraph: {
    title: `${brand.name} — Start a project`,
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
          <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_bottom,rgba(0,0,0,0.25)_1px,transparent_1px)] [background-size:100%_3px]" />

          <div className="relative z-10 w-full max-w-5xl">
            <p className="kicker-line mb-6">{brand.code} // PAID ENTRY</p>
            <h1 className="font-display text-5xl font-bold uppercase italic tracking-[-0.07em] md:text-7xl lg:text-8xl">
              {brand.name}
            </h1>
            <p className="mt-6 max-w-2xl font-display text-2xl font-bold uppercase italic tracking-[-0.04em] md:text-4xl">
              {brand.ads.headline}
            </p>
            <p className="mt-5 max-w-xl font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em]">
              {brand.ads.support}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={brand.ads.primaryHref}
                className="inline-flex border border-black bg-black px-5 py-3 font-mono-ui text-sm uppercase tracking-[0.16em] text-[#ff2a00] transition duration-200 hover:bg-transparent hover:text-black"
              >
                {brand.ads.primaryCta}
              </a>
              <Link
                href={brand.offer.secondaryHref}
                className="inline-flex border border-black px-5 py-3 font-mono-ui text-sm uppercase tracking-[0.16em] transition duration-200 hover:bg-black hover:text-[#ff2a00]"
              >
                {brand.offer.secondaryCta}
              </Link>
            </div>
          </div>
        </section>

        <section
          id="brief"
          className="border-t border-black/70 px-5 py-16 md:px-8 md:py-24"
        >
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <p className="kicker-line mb-4">[PROJECT BRIEF]</p>
              <h2 className="font-display text-3xl font-bold uppercase italic tracking-[-0.05em] md:text-5xl">
                Tell us what needs to feel sharper.
              </h2>
              <p className="mt-5 max-w-md font-mono-ui text-sm uppercase leading-[1.65] tracking-[0.05em]">
                One form. Clear intake. No template questionnaire theatre.
              </p>
              <ul className="mt-8 space-y-3 font-mono-ui text-[11px] uppercase tracking-[0.16em]">
                <li>01 // Website rebuild or launch</li>
                <li>02 // SEO structure and visibility</li>
                <li>03 // Positioning and digital strategy</li>
              </ul>
            </div>

            <div className="md:col-span-7">
              <form
                name="contact"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                hidden
                aria-hidden="true"
              >
                <input type="text" name="bot-field" />
                <input type="text" name="name" />
                <input type="email" name="email" />
                <input type="text" name="company" />
                <input type="text" name="projectType" />
                <input type="text" name="budget" />
                <textarea name="message" />
              </form>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteFrame>
  );
}
