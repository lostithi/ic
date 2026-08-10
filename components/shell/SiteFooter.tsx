import { siteContent } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/70 px-5 py-8 md:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <a
            href="/"
            className="font-display text-2xl font-bold uppercase italic tracking-[-0.05em]"
          >
            {siteContent.footer.brand}
          </a>
          <p className="mt-2 font-mono-ui text-[11px] uppercase tracking-[0.18em] text-black/70">
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
