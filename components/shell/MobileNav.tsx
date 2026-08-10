"use client";

import { useEffect, useState } from "react";
import { siteContent } from "@/lib/content";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

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
      <div className="fixed inset-x-0 top-0 z-50 border-b border-black/70 bg-[#ff2a00]">
        <div className="flex h-14 items-center justify-between px-5">
          <a
            href="/"
            onClick={close}
            className="font-mono-ui text-[11px] uppercase tracking-[0.2em]"
          >
            {siteContent.hero.code}
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="border border-black px-3 py-2 font-mono-ui text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 hover:bg-black hover:text-[#ff2a00]"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav-panel"
          className="fixed inset-0 z-40 bg-[#ff2a00] pt-14"
        >
          <ul className="flex h-full flex-col border-t border-black/70">
            {siteContent.rail.map((item) => (
              <li key={item.label} className="flex-1 border-b border-black/70">
                <a
                  href={item.href}
                  onClick={close}
                  className="flex h-full items-center px-5 font-mono-ui text-sm uppercase tracking-[0.24em] transition-colors duration-200 hover:bg-black hover:text-[#ff2a00]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
