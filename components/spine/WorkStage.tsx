"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

const WorkCanvas = dynamic(() => import("@/components/spine/WorkCanvas"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#f2f0ea]" />,
});

export default function WorkStage({
  children,
}: {
  children: React.ReactNode;
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
    <div className="relative">
      <div className="pointer-events-none fixed inset-0 z-0">
        {reduceMotion ? (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#f2f0ea]">
            <Image
              src="/spine/works-skull.png"
              alt=""
              width={520}
              height={640}
              className="pointer-events-none max-h-[75vh] w-auto object-contain opacity-90 contrast-125"
              priority
            />
          </div>
        ) : (
          <WorkCanvas />
        )}

        {/* Bleed paper into the black site — keep reading edge dark */}
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(5,5,5,0.92)_0%,rgba(5,5,5,0.72)_34%,rgba(5,5,5,0.18)_58%,transparent_78%)]" />
        <div className="spine-grain opacity-40 mix-blend-multiply" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
