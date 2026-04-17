"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 520, damping: 34, mass: 0.34 });
  const smoothY = useSpring(y, { stiffness: 520, damping: 34, mass: 0.34 });
  const trailX = useSpring(x, { stiffness: 210, damping: 28, mass: 0.64 });
  const trailY = useSpring(y, { stiffness: 210, damping: 28, mass: 0.64 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target instanceof HTMLElement ? event.target.closest<HTMLElement>("[data-cursor-label],[data-magnetic]") : null;
      setActive(Boolean(target));
      setLabel(target?.dataset.cursorLabel ?? "");
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] hidden md:block">
      <motion.div
        className="custom-cursor-trail"
        style={{ x: trailX, y: trailY }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 1.12 : 1 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className={`custom-cursor-core ${active ? "custom-cursor-core--active" : ""}`}
        style={{ x: smoothX, y: smoothY }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 1.08 : 1 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        {label ? <span className="custom-cursor-label">{label}</span> : null}
      </motion.div>
    </div>
  );
}
