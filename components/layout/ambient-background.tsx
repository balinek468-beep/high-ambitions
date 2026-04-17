"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

export function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const velocity = useVelocity(scrollYProgress);
  const easedVelocity = useSpring(velocity, { stiffness: 120, damping: 28, mass: 0.4 });
  const mistY = useTransform(scrollYProgress, [0, 1], ["-2%", "8%"]);
  const linesY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const accentOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [0.12, 0.18, 0.28]);
  const pulseScale = useTransform(easedVelocity, [-2, 0, 2], [1.06, 1, 1.08]);
  const fogX = useTransform(easedVelocity, [-2, 0, 2], ["-2%", "0%", "2%"]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-[-10%] bg-[radial-gradient(circle_at_20%_18%,rgba(214,255,82,0.08),transparent_22%),radial-gradient(circle_at_82%_14%,rgba(125,138,153,0.16),transparent_26%),radial-gradient(circle_at_60%_75%,rgba(214,255,82,0.05),transparent_24%)]"
        style={{ y: mistY, x: fogX }}
      />
      <motion.div className="absolute inset-0 contour-field opacity-40" style={{ y: linesY, scale: pulseScale }} />
      <motion.div className="absolute inset-0 noise-overlay" style={{ opacity: accentOpacity }} />
      <div className="absolute left-[-8rem] top-[18vh] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_62%)] blur-3xl" />
      <div className="absolute bottom-[8vh] right-[-7rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(214,255,82,0.08),transparent_60%)] blur-3xl" />
    </div>
  );
}
