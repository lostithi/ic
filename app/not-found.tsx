import Link from "next/link";
import SiteFrame from "@/components/shell/SiteFrame";

export default function NotFound() {
  return (
    <SiteFrame>
      <main className="flex min-h-[70vh] items-center px-5 py-24 md:px-8">
        <div className="max-w-3xl">
          <p className="kicker-line mb-4">[404]</p>
          <h1 className="font-display text-5xl font-bold uppercase italic tracking-[-0.06em] md:text-7xl">
            Structure missing.
          </h1>
          <p className="mt-6 max-w-xl font-mono-ui text-sm uppercase leading-[1.6] tracking-[0.05em]">
            That route does not exist. Head back to the main system or browse
            selected work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex border border-black bg-black px-5 py-3 font-mono-ui text-sm uppercase tracking-[0.16em] text-[#ff2a00] transition duration-200 hover:bg-transparent hover:text-black"
            >
              Back home
            </Link>
            <Link
              href="/work"
              className="inline-flex border border-black px-5 py-3 font-mono-ui text-sm uppercase tracking-[0.16em] transition duration-200 hover:bg-black hover:text-[#ff2a00]"
            >
              View work
            </Link>
          </div>
        </div>
      </main>
    </SiteFrame>
  );
}
