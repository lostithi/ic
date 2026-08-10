"use client";

import { useEffect, useState } from "react";
import { navItems, type NavItem } from "@/lib/nav";

type SectionId = NavItem["section"];

export function useActiveSection() {
  const [active, setActive] = useState<SectionId>(navItems[0].section);

  useEffect(() => {
    const update = () => {
      let current: SectionId = navItems[0].section;
      for (const item of navItems) {
        const node = document.getElementById(item.section);
        if (!node) continue;
        if (node.getBoundingClientRect().top <= window.innerHeight * 0.42) {
          current = item.section;
        }
      }
      setActive(current);
    };

    let frame = 0;
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

  return active;
}
