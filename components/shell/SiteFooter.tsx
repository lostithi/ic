import Logo from "@/components/brand/Logo";
import { siteContent } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/15 bg-black/50 px-5 py-8 backdrop-blur-sm md:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <a href="/" className="inline-flex text-[1.35rem]">
            <Logo markClassName="h-10 w-8" />
          </a>
          <p className="mt-3 font-mono-ui text-[11px] uppercase tracking-[0.18em] text-white/60">
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
