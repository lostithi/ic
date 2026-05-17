import { siteContent } from "@/lib/content";

export default function LeftRail() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[72px] border-r border-black/70 md:block">
      <div className="flex h-full flex-col">
        <div className="flex h-20 items-center justify-center border-b border-black/70">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black">
            {siteContent.hero.code}
          </span>
        </div>

        <nav className="flex flex-1 flex-col">
          {siteContent.rail.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex flex-1 items-center justify-center border-b border-black/70 px-2 text-center transition-colors duration-200 hover:bg-black hover:text-[#ff2a00] focus:bg-black focus:text-[#ff2a00]"            >
              <span className="rotate-180 font-mono text-[11px] uppercase tracking-[0.24em] writing-mode-vertical">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="border-t border-black/70 px-2 py-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-black">
          2026//
        </div>
      </div>
    </aside>
  );
}