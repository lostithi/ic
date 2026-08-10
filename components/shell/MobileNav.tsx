"use client";

import { useEffect, useState } from "react";
import { AtlasMark, MenuBones, VertebraGlyph } from "@/components/shell/BoneGlyph";
import { useActiveSection } from "@/components/shell/useActiveSection";
import { brand } from "@/lib/brand";
import { navItems } from "@/lib/nav";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <div className="md:hidden">
      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-black/90 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between px-4">
          <a
            href="/"
            onClick={close}
            className="flex items-center gap-2.5"
            aria-label={`${brand.name} home`}
          >
            <AtlasMark className="h-7 w-7" />
            <span className="font-display text-lg font-bold uppercase italic tracking-[-0.04em]">
              {brand.name}
            </span>
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-bone-nav"
            aria-label={open ? "Close column" : "Open column"}
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center border border-white/50 transition-colors duration-200 hover:bg-white hover:text-black"
          >
            <MenuBones open={open} />
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-bone-nav"
          className="fixed inset-0 z-40 bg-black pt-14"
          aria-label="Site column"
        >
          <div className="bone-mobile-cord" aria-hidden />
          <ul className="relative z-[1] flex h-full flex-col px-5 pb-8 pt-4">
            {navItems.map((item, index) => {
              const isActive = active === item.section;
              return (
                <li key={item.code} className="flex-1">
                  <a
                    href={item.href}
                    onClick={close}
                    className={`bone-mobile-row ${isActive ? "is-active" : ""}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-white/45">
                      {String(index + 1).padStart(2, "0")} //{item.code}
                    </span>
                    <div className="mt-2 flex items-center gap-4">
                      <VertebraGlyph
                        active={isActive}
                        className="h-8 w-16 shrink-0"
                      />
                      <span className="font-display text-3xl font-bold uppercase italic tracking-[-0.04em]">
                        {item.label}
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
            <li className="pt-4">
              <p className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-white/40">
                Column // Head → End
              </p>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
