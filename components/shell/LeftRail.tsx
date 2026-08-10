"use client";

import { LogoMark } from "@/components/brand/Logo";
import { VertebraGlyph } from "@/components/shell/BoneGlyph";
import { useActiveSection } from "@/components/shell/useActiveSection";
import { brand } from "@/lib/brand";
import { navItems } from "@/lib/nav";

export default function LeftRail() {
  const active = useActiveSection();

  return (
    <aside className="bone-rail fixed left-0 top-0 z-40 hidden h-screen w-[88px] md:block">
      <div className="relative flex h-full flex-col">
        <a
          href="/"
          className="bone-rail-brand group flex flex-col items-center gap-2.5 px-2 py-5"
          aria-label={`${brand.name} home`}
        >
          <LogoMark className="h-12 w-10 text-[var(--spine-white)] transition-transform duration-300 group-hover:scale-105" />
          <span className="font-display text-[11px] font-medium uppercase tracking-[0.28em]">
            {brand.shortName}
          </span>
        </a>

        <div className="bone-rail-cord" aria-hidden />

        <nav className="relative z-[1] flex flex-1 flex-col justify-center gap-1 px-2 py-4">
          {navItems.map((item, index) => {
            const isActive = active === item.section;
            return (
              <a
                key={item.code}
                href={item.href}
                className={`bone-vertebra ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="bone-vertebra-index font-mono-ui">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <VertebraGlyph
                  active={isActive}
                  className="bone-vertebra-glyph"
                />
                <span className="bone-vertebra-code font-mono-ui">
                  {item.code}
                </span>
                <span className="bone-vertebra-label font-mono-ui">
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>

        <div className="relative z-[1] px-2 pb-5 text-center">
          <p className="font-mono-ui text-[9px] uppercase tracking-[0.22em] text-white/45">
            End
          </p>
          <p className="mt-1 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-white/70">
            2026
          </p>
        </div>
      </div>
    </aside>
  );
}
