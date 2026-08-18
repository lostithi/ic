"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/brand/Logo";
import NavSkullStage from "@/components/shell/NavSkullStage";
import { useActiveSection } from "@/components/shell/useActiveSection";
import { brand } from "@/lib/brand";
import { navItems } from "@/lib/nav";

const SHEET_EXIT_MS = 380;

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [peek, setPeek] = useState(false);
  const columnRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);
  const skipCueClick = useRef(false);

  useEffect(() => {
    document.body.style.overflow = mounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  useEffect(() => {
    if (open || !mounted) return;
    const id = window.setTimeout(() => setMounted(false), SHEET_EXIT_MS);
    return () => window.clearTimeout(id);
  }, [open, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted]);

  useEffect(() => {
    const column = columnRef.current;
    if (!column) return;

    const onMove = (event: PointerEvent) => {
      const rect = column.getBoundingClientRect();
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      column.style.setProperty("--lean-x", `${x * 6}px`);
      column.style.setProperty("--lean-y", `${y * 4}px`);
    };

    const onLeave = () => {
      column.style.setProperty("--lean-x", "0px");
      column.style.setProperty("--lean-y", "0px");
    };

    column.addEventListener("pointermove", onMove);
    column.addEventListener("pointerleave", onLeave);
    return () => {
      column.removeEventListener("pointermove", onMove);
      column.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY + 8) setPeek(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) wasOpen.current = true;
    if (!mounted) wasOpen.current = false;
  }, [open, mounted]);

  function show() {
    setMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpen(true));
    });
  }

  function hide() {
    setOpen(false);
  }

  return (
    <>
      <a
        href="/"
        className={`spine-nav-mark${isHome ? "" : " shell-mark"}`}
        aria-label={`${brand.name} home`}
      >
        <LogoMark className="h-11 w-9" />
        <span className="spine-nav-word">
          <span>Spine</span>
          <span>Studio</span>
        </span>
      </a>

      {isHome ? (
      <div
        className={`spine-nav-dock hidden md:flex ${peek ? "is-open" : ""}`}
        onPointerEnter={() => {
          skipCueClick.current = true;
          setPeek(true);
        }}
        onPointerLeave={() => setPeek(false)}
      >
        <button
          type="button"
          className="spine-nav-cue"
          aria-expanded={peek}
          aria-controls="spine-nav-column"
          aria-label={peek ? "Hide column" : "Show column"}
          onClick={() => {
            if (skipCueClick.current) {
              skipCueClick.current = false;
              return;
            }
            setPeek((value) => !value);
          }}
        >
          <span className="spine-nav-cue-word">Spine</span>
          <span className="spine-nav-cue-rail" aria-hidden>
            {navItems.map((item) => (
              <span
                key={item.code}
                className={`spine-nav-cue-tick ${active === item.section ? "is-active" : ""}`}
              />
            ))}
          </span>
        </button>

        <nav
          ref={columnRef}
          id="spine-nav-column"
          className="spine-nav"
          aria-label="Column"
        >
          {navItems.map((item, index) => {
            const isActive = active === item.section;
            return (
              <a
                key={item.code}
                href={item.href}
                className={`spine-nav-node ${isActive ? "is-active" : ""}`}
                style={{ "--i": index } as React.CSSProperties}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="spine-nav-label">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
      ) : null}

      <button
        type="button"
        className="spine-nav-toggle md:hidden"
        aria-expanded={open}
        aria-controls="spine-nav-sheet"
        aria-label={open ? "Close spine nav" : "Open spine nav"}
        onClick={() => (open ? hide() : show())}
      >
        <span className="spine-nav-toggle-swap">
          <span className={open ? "" : "is-current"}>Spine</span>
          <span className={open ? "is-current" : ""}>Close</span>
        </span>
      </button>

      {mounted ? (
        <div
          id="spine-nav-sheet"
          className={`spine-nav-sheet md:hidden ${open ? "is-open" : wasOpen.current ? "is-leaving" : ""}`}
        >
          <div className="spine-nav-sheet-stage" aria-hidden>
            <NavSkullStage />
          </div>
          <nav className="spine-nav-sheet-index" aria-label="Spine navigation">
            <ul>
              {navItems.map((item, index) => {
                const isActive = active === item.section;
                return (
                  <li
                    key={item.code}
                    style={{ "--i": index } as React.CSSProperties}
                  >
                    <a
                      href={item.href}
                      onClick={hide}
                      className={isActive ? "is-active" : ""}
                      style={{ "--i": index } as React.CSSProperties}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span className="spine-nav-sheet-label">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href={brand.offer.primaryHref}
              onClick={hide}
              className="spine-nav-sheet-foot"
            >
              {brand.offer.primaryCta}
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}
