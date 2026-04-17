"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function CinematicBackground() {
  const { scrollYProgress } = useScroll();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const glowY = useTransform(scrollYProgress, [0, 1], ["-4%", "8%"]);
  const glowX = useTransform(scrollYProgress, [0, 1], ["-3%", "9%"]);
  const contourY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contourX = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const shapeY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const lineY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const lineX = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const particleY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const diagonalSweepX = useTransform(scrollYProgress, [0, 1], ["-8%", "18%"]);
  const mistX = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const bgStageOne = useTransform(scrollYProgress, [0, 0.18, 0.32], [1, 1, 0.18]);
  const bgStageTwo = useTransform(scrollYProgress, [0.2, 0.38, 0.56], [0, 1, 0.16]);
  const bgStageThree = useTransform(scrollYProgress, [0.48, 0.66, 0.82], [0, 1, 0.16]);
  const bgStageFour = useTransform(scrollYProgress, [0.74, 0.9, 1], [0, 1, 0.24]);
  const quoteYRaw = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);
  const quoteY = useSpring(quoteYRaw, { stiffness: 60, damping: 24, mass: 0.8 });

  const quotes = [
    "Structure turns ambition into forward motion.",
    "The right support makes better decisions visible sooner.",
    "Stronger operating systems create stronger player outcomes.",
    "High ambition deserves calm execution and credible support.",
  ];

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const next = Math.max(0, Math.min(quotes.length - 1, Math.round(latest * (quotes.length - 1))));
      setQuoteIndex((current) => (current === next ? current : next));
    });

    return unsubscribe;
  }, [scrollYProgress, quotes.length]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(169,210,255,0.16),transparent_24%),radial-gradient(circle_at_62%_18%,rgba(255,209,220,0.12),transparent_24%),linear-gradient(180deg,#050608_0%,#090b11_50%,#060608_100%)]"
        style={{ opacity: bgStageOne }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(174,239,234,0.14),transparent_22%),radial-gradient(circle_at_24%_68%,rgba(169,210,255,0.12),transparent_22%),linear-gradient(180deg,#05070a_0%,#071018_52%,#05070a_100%)]"
        style={{ opacity: bgStageTwo }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,209,220,0.14),transparent_24%),radial-gradient(circle_at_76%_58%,rgba(174,239,234,0.12),transparent_22%),linear-gradient(180deg,#05060a_0%,#0a0914_48%,#05060a_100%)]"
        style={{ opacity: bgStageThree }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(174,239,234,0.12),transparent_24%),radial-gradient(circle_at_72%_72%,rgba(255,209,220,0.14),transparent_26%),linear-gradient(180deg,#06070c_0%,#090811_44%,#040507_100%)]"
        style={{ opacity: bgStageFour }}
      />
      <motion.div
        className="absolute inset-[-12%] bg-[radial-gradient(circle_at_18%_12%,rgba(169,210,255,0.12),transparent_24%),radial-gradient(circle_at_52%_16%,rgba(255,209,220,0.12),transparent_20%),radial-gradient(circle_at_78%_10%,rgba(174,239,234,0.1),transparent_22%),radial-gradient(circle_at_62%_72%,rgba(174,239,234,0.06),transparent_24%)]"
        style={{ x: glowX, y: glowY }}
      />
      <motion.div
        className="absolute inset-[-8%] bg-[linear-gradient(120deg,transparent_6%,rgba(169,210,255,0.04)_22%,transparent_38%,transparent_62%,rgba(255,209,220,0.04)_78%,transparent_92%)]"
        style={{ x: diagonalSweepX }}
      />
      <motion.div className="absolute inset-0 contour-lines opacity-25" style={{ x: contourX, y: contourY }} />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.025)_18%,transparent_36%,transparent_64%,rgba(169,210,255,0.04)_82%,transparent_100%)]"
        animate={{ opacity: [0.1, 0.18, 0.12] }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-12%] top-[26%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(169,210,255,0.08),transparent_68%)] blur-3xl"
        style={{ x: mistX, y: shapeY }}
      />
      <motion.div
        className="absolute inset-x-[8%] top-[18%] h-px bg-[linear-gradient(90deg,transparent,rgba(169,210,255,0.32),transparent)]"
        style={{ x: lineX, y: lineY }}
      />
      <motion.div
        className="absolute inset-x-[22%] top-[44%] h-px bg-[linear-gradient(90deg,transparent,rgba(174,239,234,0.16),transparent)]"
        animate={{ opacity: [0.06, 0.26, 0.08], scaleX: [0.82, 1.08, 0.84] }}
        transition={{ duration: 6.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ x: diagonalSweepX }}
      />
      <motion.div
        className="absolute left-[12%] top-[8%] h-[70vh] w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.08),transparent)]"
        style={{ x: contourX, y: particleY }}
      />
      <motion.div className="absolute inset-0 noise-overlay opacity-20" />
      <motion.div
        className="absolute inset-y-0 right-[18%] w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.08),transparent)]"
        style={{ x: lineX }}
      />
      <motion.div
        className="absolute left-[16%] top-[22%] h-2 w-2 rounded-full bg-[rgba(169,210,255,0.75)] shadow-[0_0_24px_rgba(169,210,255,0.45)]"
        animate={{ y: [0, -12, 0], opacity: [0.18, 0.54, 0.2] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ x: contourX, y: particleY }}
      />
      <motion.div
        className="absolute bottom-[18%] left-[26%] h-1.5 w-1.5 rounded-full bg-[rgba(174,239,234,0.76)] shadow-[0_0_22px_rgba(174,239,234,0.4)]"
        animate={{ y: [0, -10, 0], opacity: [0.18, 0.58, 0.22] }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.div
          key={quoteIndex}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 0.28, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[44rem] text-center text-[clamp(1.8rem,4.4vw,4rem)] font-semibold uppercase leading-[0.96] tracking-[-0.07em] text-[rgba(255,255,255,0.048)]"
          style={{ y: quoteY }}
        >
          {quotes[quoteIndex]}
        </motion.div>
      </div>
    </div>
  );
}
