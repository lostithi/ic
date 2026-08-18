"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

const NavSkullCanvas = dynamic(() => import("@/components/shell/NavSkullCanvas"), {
  ssr: false,
});

export default function NavSkullStage() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  if (reduceMotion) {
    return (
      <div className="spine-nav-sheet-still">
        <Image
          src="/brand/nav-skull.jpg"
          alt=""
          width={800}
          height={640}
          className="spine-nav-sheet-still-img"
        />
      </div>
    );
  }

  return <NavSkullCanvas />;
}
