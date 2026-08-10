"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SpineJourneyCanvas = dynamic(
  () => import("@/components/spine/SpineJourneyCanvas"),
  { ssr: false },
);

const STOPS = [
  { id: "top", label: "HEAD" },
  { id: "services", label: "C1" },
  { id: "manifesto", label: "C2" },
  { id: "work", label: "T1" },
  { id: "process", label: "L1" },
  { id: "about", label: "L2" },
  { id: "contact", label: "S1" },
];

export default function SpineJourney({
  children,
}: {
  children: React.ReactNode;
}) {
  const progress = useRef(0);
  const [progressUi, setProgressUi] = useState(0);
  const [activeStop, setActiveStop] = useState("top");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const next = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progress.current = next;
      setProgressUi(next);

      let current = STOPS[0].id;
      for (const stop of STOPS) {
        const node = document.getElementById(stop.id);
        if (!node) continue;
        const top = node.getBoundingClientRect().top;
        if (top <= window.innerHeight * 0.42) {
          current = stop.id;
        }
      }
      setActiveStop(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-0 z-0 md:left-[88px]">
        {reduceMotion ? (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black">
            <div
              className="h-[70vmin] w-[2px] bg-white/40"
              style={{
                transform: `scaleY(${0.55 + progressUi * 0.7}) rotate(${progressUi * 18}deg)`,
                transformOrigin: "top center",
              }}
            />
            <Image
              src="/spine/skull.png"
              alt=""
              width={280}
              height={360}
              className="pointer-events-none absolute opacity-30 blur-[1.5px] contrast-150"
              style={{
                opacity: 0.35 - progressUi * 0.12,
                transform: `translateY(${progressUi * 80}px) scale(${1 - progressUi * 0.25}) rotate(${progressUi * 12}deg)`,
              }}
            />
          </div>
        ) : (
          <SpineJourneyCanvas progress={progress} />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(5,5,5,0.28)_60%,rgba(5,5,5,0.62)_100%)]" />
        <div className="spine-grain" />
      </div>

      <aside className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 md:right-7 md:block">
        <div className="flex flex-col items-center gap-4">
          <p className="font-mono-ui text-[9px] uppercase tracking-[0.22em] text-white/45">
            Cord
          </p>
          <div className="relative flex h-52 w-5 flex-col items-center">
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/15" />
            <div
              className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-white"
              style={{ height: `${progressUi * 100}%` }}
            />
            {STOPS.map((stop, i) => {
              const t = i / (STOPS.length - 1);
              const reached = progressUi >= t - 0.02;
              const isActive = activeStop === stop.id;
              return (
                <span
                  key={stop.id}
                  className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full border transition-colors duration-300 ${
                    isActive
                      ? "border-white bg-white"
                      : reached
                        ? "border-white/80 bg-white/40"
                        : "border-white/30 bg-black"
                  }`}
                  style={{ top: `calc(${t * 100}% - 4px)` }}
                  title={stop.label}
                />
              );
            })}
          </div>
          <p className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-white/55">
            {STOPS.find((s) => s.id === activeStop)?.label ?? "HEAD"}
          </p>
        </div>
      </aside>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
