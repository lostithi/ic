import { siteContent } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/15 bg-black/50 px-5 py-8 backdrop-blur-sm md:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <a
            href="/"
            className="font-display text-2xl font-bold uppercase italic tracking-[-0.05em]"
          >
            {siteContent.footer.brand}
          </a>
          <p className="mt-2 font-mono-ui text-[11px] uppercase tracking-[0.18em] text-white/60">
            {siteContent.footer.year}// Structure first
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono-ui text-[11px] uppercase tracking-[0.18em]">
          <a
            href={siteContent.contact.mailto}
            className="transition-colors duration-200 hover:underline"
          >
            {siteContent.contact.email}
          </a>
          <a
            href="#top"
            className="transition-colors duration-200 hover:underline"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
