import { LogoMark } from "@/components/brand/Logo";
import { siteContent } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="ft-panel">
      <div className="ft-panel-inner">
        <div className="ft-main">
          <div className="ft-lock">
            <a href="/" className="ft-logo" aria-label="Spine Studio home">
              <LogoMark className="h-10 w-8" />
            </a>
            <p className="ft-headline">{siteContent.contact.headline}</p>
          </div>
        </div>

        <div className="ft-actions">
          <a href={siteContent.contact.mailto} className="ft-action">
            {siteContent.contact.email}
          </a>
          <a href="#top" className="ft-action ft-action--accent">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
