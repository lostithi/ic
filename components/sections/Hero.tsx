"use client";

import { useEffect, useRef, useState } from "react";
import { brand } from "@/lib/brand";
import { siteContent } from "@/lib/content";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [motion, setMotion] = useState(false);
  const [ready, setReady] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setReady(true);
      return;
    }

    setMotion(true);
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = headline.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      headline.style.setProperty("--hx", `${x * 7}deg`);
      headline.style.setProperty("--hy", `${y * -5}deg`);
      headline.style.setProperty("--mx", `${x * 10}px`);
      headline.style.setProperty("--my", `${y * 6}px`);
    };

    const onLeave = () => {
      headline.style.setProperty("--hx", "0deg");
      headline.style.setProperty("--hy", "0deg");
      headline.style.setProperty("--mx", "0px");
      headline.style.setProperty("--my", "0px");
    };

    headline.addEventListener("pointermove", onMove);
    headline.addEventListener("pointerleave", onLeave);

    return () => {
      headline.removeEventListener("pointermove", onMove);
      headline.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const triggerGlitch = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setGlitch(true);
    window.setTimeout(() => setGlitch(false), 440);
  };

  return (
    <section id="top" className="hero-v2 vertebra-stop relative">
      <div className="hero-v2-panel vertebra-panel">
        <h1
          ref={headlineRef}
          className={`hero-v2-headline${motion ? " hero-v2-headline--motion" : ""}${ready ? " is-ready" : ""}${glitch ? " is-glitch" : ""}`}
          onPointerDown={triggerGlitch}
        >
          <span className="hero-v2-headline-top">{siteContent.hero.titleTop}</span>
          <span className="hero-v2-headline-bottom">{siteContent.hero.titleBottom}</span>
        </h1>
        <p className="hero-v2-body">{siteContent.hero.description}</p>
        <div className="hero-v2-tags">
          <span className="hero-v2-tag">WEB</span>
          <span className="hero-v2-tag">SEO</span>
          <span className="hero-v2-tag">STRATEGY</span>
        </div>
        <div className="hero-v2-ctas">
          <a href={brand.offer.primaryHref} className="btn-solid">
            {brand.offer.primaryCta}
          </a>
          <a href={brand.offer.secondaryHref} className="btn-ghost">
            {brand.offer.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
