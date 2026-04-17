"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";

import { AmbientPopups } from "@/components/layout/ambient-popups";

export function PageMotionShell({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const shellYRaw = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -10]);
  const shellY = useSpring(shellYRaw, { stiffness: 54, damping: 26, mass: 0.95 });

  return (
    <>
      <AmbientPopups />
      <motion.div className="relative z-10" style={{ y: shellY }}>
        {children}
      </motion.div>
    </>
  );
}
