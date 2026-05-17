import { siteContent } from "@/lib/content";

export default function TopStatus() {
  return (
    <div className="absolute right-5 top-5 z-20 text-right md:right-8 md:top-8">
      <div className="font-mono text-[10px] uppercase leading-[1.35] tracking-[0.22em] text-black md:text-[11px]">
        <p>{siteContent.status.line1}</p>
        <p>{siteContent.status.line2}</p>
        <p>{siteContent.status.line3}</p>
      </div>
    </div>
  );
}