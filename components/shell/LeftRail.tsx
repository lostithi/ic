import { siteContent } from "@/lib/content";

export default function LeftRail() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[72px] border-r border-white/25 bg-black md:block">
      <div className="flex h-full flex-col">
        <div className="flex h-20 items-center justify-center border-b border-white/25">
          <span className="font-mono-ui text-[11px] uppercase tracking-[0.18em]">
            {siteContent.hero.code}
          </span>
        </div>

        <nav className="flex flex-1 flex-col">
          {siteContent.rail.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex flex-1 items-center justify-center border-b border-white/25 px-2 text-center transition-colors duration-200 hover:bg-white hover:text-black focus:bg-white focus:text-black"
            >
              <span className="writing-mode-vertical rotate-180 font-mono-ui text-[11px] uppercase tracking-[0.24em]">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="border-t border-white/25 px-2 py-4 text-center font-mono-ui text-[10px] uppercase tracking-[0.16em] text-white/70">
          2026//
        </div>
      </div>
    </aside>
  );
}
