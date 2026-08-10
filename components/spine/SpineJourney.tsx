"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SpineJourneyCanvas = dynamic(
  () => import("@/components/spine/SpineJourneyCanvas"),
  { ssr: false },
);

const STOPS = [
  { id: "top", label: "C1" },
  { id: "services", label: "C2" },
  { id: "manifesto", label: "T1" },
  { id: "work", label: "FACE" },
  { id: "process", label: "NECK" },
  { id: "about", label: "RIBS" },
  { id: "contact", label: "HALF" },
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
      <div className="pointer-events-none fixed inset-0 z-0 md:left-[72px]">
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
              className="pointer-events-none absolute opacity-30"
              style={{
                opacity: progressUi < 0.42 ? 0.08 : 0.28 + (progressUi - 0.42) * 0.4,
                transform: `translateY(${(1 - progressUi) * 40}px) rotate(${progressUi * 25}deg)`,
              }}
            />
          </div>
        ) : (
          <SpineJourneyCanvas progress={progress} />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(5,5,5,0.28)_60%,rgba(5,5,5,0.62)_100%)]" />
        <div className="spine-grain" />
      </div>

      <aside className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 md:right-8 md:block">
        <div className="flex flex-col items-center gap-3">
          <p className="font-mono-ui text-[9px] uppercase tracking-[0.22em] text-white/50">
            Descent
          </p>
          <div className="relative h-44 w-px bg-white/15">
            <div
              className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-white"
              style={{ height: `${progressUi * 100}%` }}
            />
          </div>
          <ul className="space-y-2 text-center">
            {STOPS.map((stop) => (
              <li key={stop.id}>
                <span
                  className={`font-mono-ui text-[9px] uppercase tracking-[0.18em] ${
                    activeStop === stop.id ? "text-white" : "text-white/35"
                  }`}
                >
                  {stop.label}
                </span>
              </li>
            ))}
          </ul>
          <p className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-white/45">
            {String(Math.round(progressUi * 100)).padStart(2, "0")}%
          </p>
        </div>
      </aside>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
