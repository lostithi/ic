"use client";

import { useEffect, useRef } from "react";
import SpineEnvironment from "@/components/spine/SpineEnvironment";
import { brand } from "@/lib/brand";
import { siteContent } from "@/lib/content";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const onMove = (event: PointerEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;
      title.style.transform = `translate3d(${nx * 10}px, ${ny * 6}px, 0)`;
    };

    const onLeave = () => {
      title.style.transform = "translate3d(0,0,0)";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-end overflow-hidden bg-black text-[var(--spine-white)]"
    >
      <SpineEnvironment />

      <div className="relative z-10 w-full px-5 pb-10 pt-28 md:px-8 md:pb-14">
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-8">
            <p className="mb-5 font-mono-ui text-[11px] uppercase tracking-[0.24em] text-[var(--spine-mute)]">
              {siteContent.hero.code} // BLACK BONE SYSTEM
            </p>
            <h1
              ref={titleRef}
              className="font-display leading-none uppercase italic transition-transform duration-300 ease-out will-change-transform"
            >
              <span className="block text-[5.2rem] font-bold tracking-[-0.08em] sm:text-[7rem] md:text-[10rem] lg:text-[12rem]">
                {siteContent.hero.titleTop}
              </span>
              <span className="mt-3 block text-[2.2rem] font-bold tracking-[-0.05em] sm:text-[3rem] md:text-[4.2rem]">
                <span className="inline-box">{siteContent.hero.titleBottom}</span>
              </span>
            </h1>
          </div>

          <div className="md:col-span-4 md:pb-4">
            <p className="max-w-[26rem] font-mono-ui text-[0.95rem] uppercase leading-[1.45] tracking-[0.05em] md:text-[1.02rem]">
              <span className="inline-tag">WEB</span>{" "}
              <span className="inline-tag">SEO</span>{" "}
              <span className="inline-tag">STRATEGY</span>
              <br />
              <br />
              A black-and-white system built around the{" "}
              <span className="inline-bar">backbone</span> — clear message,
              structural sites, search that stands upright.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={brand.offer.primaryHref} className="btn-solid">
                {brand.offer.primaryCta}
              </a>
              <a href={brand.offer.secondaryHref} className="btn-ghost">
                {brand.offer.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
