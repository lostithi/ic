"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SpineJourneyCanvas = dynamic(
  () => import("@/components/spine/SpineJourneyCanvas"),
  { ssr: false },
);

export default function SpineJourney({
  children,
}: {
  children: React.ReactNode;
}) {
  const progress = useRef(0);
  const [progressUi, setProgressUi] = useState(0);
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
      <div className="pointer-events-none fixed inset-0 z-0">
        {reduceMotion ? (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black">
            <Image
              src="/spine/skull.png"
              alt=""
              width={280}
              height={360}
              className="pointer-events-none absolute opacity-30 blur-[1.5px] contrast-150"
              style={{
                opacity: 0.35 - progressUi * 0.12,
                transform: `translateY(${progressUi * 80}px) scale(${1 - progressUi * 0.25})`,
              }}
            />
          </div>
        ) : (
          <SpineJourneyCanvas progress={progress} />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(5,5,5,0.28)_60%,rgba(5,5,5,0.62)_100%)]" />
        <div className="spine-grain" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
