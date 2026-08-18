import Link from "next/link";
import SiteFrame from "@/components/shell/SiteFrame";

export default function NotFound() {
  return (
    <SiteFrame>
      <main className="shell-page flex min-h-[70vh] items-center">
        <div className="max-w-3xl">
          <p className="kicker-line mb-4">[404]</p>
          <h1 className="font-display text-5xl font-bold uppercase italic tracking-[-0.06em] md:text-7xl">
            Structure missing.
          </h1>
          <p className="mt-6 max-w-xl font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em] text-white/75">
            That route does not exist. Head back to the main system or browse
            selected work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn-solid">
              Back home
            </Link>
            <Link href="/work" className="btn-ghost">
              View work
            </Link>
          </div>
        </div>
      </main>
    </SiteFrame>
  );
}
