import ContactForm from "@/components/sections/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { siteContent } from "@/lib/content";

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-white/25 px-5 py-16 md:px-8 md:py-24"
    >
      <Reveal>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="kicker-line mb-6">{siteContent.contact.kicker}</p>
            <h2 className="font-display text-3xl font-bold uppercase italic tracking-[-0.05em] md:text-5xl lg:text-6xl">
              {siteContent.contact.headline}
            </h2>

            <p className="mt-6 max-w-xl font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em] text-white/75">
              {siteContent.contact.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={siteContent.contact.mailto} className="btn-ghost">
                {siteContent.contact.email}
              </a>
              <a href="/work" className="btn-ghost">
                See work
              </a>
            </div>
          </div>

          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
