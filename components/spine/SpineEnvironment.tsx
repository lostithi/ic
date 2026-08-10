"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SpineCanvas = dynamic(() => import("@/components/spine/SpineCanvas"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-black" />,
});

export default function SpineEnvironment({
  className = "",
}: {
  className?: string;
}) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-black ${className}`}>
      {reduceMotion ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-48 w-px bg-white/50" />
        </div>
      ) : (
        <SpineCanvas />
      )}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(5,5,5,0.45)_70%,rgba(5,5,5,0.85)_100%)]" />
      <div className="spine-grain" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_bottom,rgba(244,244,241,0.35)_1px,transparent_1px)] [background-size:100%_4px]" />
    </div>
  );
}
