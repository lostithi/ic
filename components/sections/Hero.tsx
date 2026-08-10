"use client";

import { useEffect, useRef } from "react";
import { siteContent } from "@/lib/content";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const topLineRef = useRef<HTMLSpanElement | null>(null);
  const bottomLineRef = useRef<HTMLSpanElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const pointerRef = useRef({
    active: false,
    targetX: 0,
    targetY: 0,
  });

  function animate() {
    const cursor = cursorRef.current;
    const topLine = topLineRef.current;
    const bottomLine = bottomLineRef.current;
    const hero = heroRef.current;
    if (!cursor || !topLine || !bottomLine || !hero) return;

    const rect = hero.getBoundingClientRect();
    const { targetX, targetY, active } = pointerRef.current;

    const nx = (targetX / rect.width - 0.5) * 2;
    const ny = (targetY / rect.height - 0.5) * 2;

    cursor.style.opacity = active ? "1" : "0";
    cursor.style.transform = `translate3d(${targetX - 80}px, ${targetY - 55}px, 0)`;

    topLine.style.transform = `translate3d(${nx * 18}px, ${ny * -4}px, 0) scaleX(${1 + Math.abs(nx) * 0.045}) skewX(${nx * -3.5}deg)`;
    bottomLine.style.transform = `translate3d(${nx * -12}px, ${ny * 3}px, 0) scaleX(${1 + Math.abs(nx) * 0.06}) skewX(${nx * -4.5}deg)`;

    frameRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;

    pointerRef.current.targetX = e.clientX - rect.left;
    pointerRef.current.targetY = e.clientY - rect.top;
    pointerRef.current.active = true;
  }

  function handleLeave() {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;

    pointerRef.current.targetX = rect.width * 0.5;
    pointerRef.current.targetY = rect.height * 0.55;
    pointerRef.current.active = false;

    if (topLineRef.current) {
      topLineRef.current.style.transform =
        "translate3d(0,0,0) scaleX(1) skewX(0deg)";
    }

    if (bottomLineRef.current) {
      bottomLineRef.current.style.transform =
        "translate3d(0,0,0) scaleX(1) skewX(0deg)";
    }
  }

  return (
    <section
      ref={heroRef}
      id="top"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative flex min-h-screen items-end overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)] md:cursor-none"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_bottom,rgba(0,0,0,0.25)_1px,transparent_1px)] [background-size:100%_3px]" />

      <div className="w-full px-5 pb-8 pt-24 md:px-8 md:pb-10 md:pt-28">
        <div className="grid min-h-[calc(100vh-5rem)] grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-8">
            <div className="max-w-[1100px] overflow-visible">
              <h1 className="font-display leading-none uppercase italic">
                <span
                  ref={topLineRef}
                  className="block will-change-transform text-[4.3rem] font-bold tracking-[-0.08em] transition-transform duration-300 ease-out sm:text-[5.6rem] md:text-[9rem] lg:text-[11rem] xl:text-[13rem]"
                >
                  {siteContent.hero.titleTop}
                </span>

                <span
                  ref={bottomLineRef}
                  className="block will-change-transform text-[4.2rem] font-bold tracking-[-0.08em] transition-transform duration-300 ease-out sm:text-[5.5rem] md:text-[8.8rem] lg:text-[10.8rem] xl:text-[12.8rem]"
                >
                  <span className="inline-box">{siteContent.hero.titleBottom}</span>
                </span>
              </h1>
            </div>
          </div>

          <div className="md:col-span-4 md:flex md:items-center md:justify-center">
            <div className="hidden w-full max-w-[280px] border border-[var(--color-line)] p-5 md:block">
              <p className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--color-text)]/70">
                Signal // Studio
              </p>
              <p className="mt-6 font-display text-5xl font-bold uppercase italic tracking-[-0.06em]">
                IL
              </p>
              <p className="mt-8 font-mono-ui text-[11px] uppercase leading-[1.6] tracking-[0.14em]">
                Web. Seo. Strategy.
                <br />
                Built sharp.
              </p>
              <div className="mt-10 h-px w-full bg-[var(--color-text)]/40" />
              <p className="mt-4 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[var(--color-text)]/65">
                {siteContent.hero.code}
              </p>
            </div>
          </div>

          <div className="md:col-span-5">
            <p className="max-w-[32rem] font-mono-ui text-[0.95rem] uppercase leading-[1.35] tracking-[0.05em] text-[var(--color-text)] md:text-[1.05rem]">
              <span className="inline-tag">WEB</span>{" "}
              <span className="inline-tag">SEO</span>{" "}
              <span className="inline-tag">MARKETING</span>
              <br />
              <br />
              Cooking up <span className="inline-bar">sharper</span> digital
              systems for brands that want to feel less{" "}
              <span className="inline-box">template</span> and a lot more{" "}
              <span className="inline-cut">themselves</span>.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex border border-black bg-black px-5 py-3 font-mono-ui text-sm uppercase tracking-[0.16em] text-[#ff2a00] transition duration-200 hover:bg-transparent hover:text-black focus:bg-transparent focus:text-black"
              >
                Start a project
              </a>
              <a
                href="/work"
                className="inline-flex border border-black px-5 py-3 font-mono-ui text-sm uppercase tracking-[0.16em] transition duration-200 hover:bg-black hover:text-[#ff2a00] focus:bg-black focus:text-[#ff2a00]"
              >
                See work
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={cursorRef}
        className="pointer-events-none absolute z-20 hidden h-[110px] w-[160px] border border-[var(--color-text)]/28 opacity-0 md:block"
        style={{
          transform: "translate3d(-9999px,-9999px,0)",
          transition: "opacity 200ms ease",
          willChange: "transform",
        }}
      >
        <div className="absolute inset-[8px] border border-[var(--color-text)]/16" />
      </div>
    </section>
  );
}
