"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function SiteProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.3,
  });

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-[linear-gradient(90deg,rgba(214,255,82,0.18),var(--accent),rgba(214,255,82,0.08))]"
        style={{ scaleX }}
      />
      <div className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="relative h-40 w-px bg-[rgba(255,255,255,0.12)]">
          <motion.div
            className="absolute inset-x-0 top-0 origin-top bg-[linear-gradient(180deg,var(--accent),rgba(214,255,82,0.1))]"
            style={{ scaleY: scaleX }}
          />
        </div>
      </div>
    </>
  );
}
