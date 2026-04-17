"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const popupStages = [
  [
    {
      title: "Momentum",
      lines: ["Execution stays stable.", "Teams move faster with structure."],
      top: "18%",
      left: "6%",
      width: "14rem",
      delay: 0.2,
    },
    {
      title: "Support",
      lines: ["External operators reduce noise.", "Credibility grows when decisions stay clear."],
      top: "38%",
      right: "8%",
      width: "15rem",
      delay: 0.46,
    },
    {
      title: "Studio",
      lines: ["Ambition deserves a calmer system.", "Pressure is easier to manage when roles are clear."],
      bottom: "18%",
      left: "12%",
      width: "15rem",
      delay: 0.72,
    },
  ],
  [
    {
      title: "Planning",
      lines: ["Scope becomes readable.", "Good planning protects the creative vision."],
      top: "16%",
      left: "10%",
      width: "14rem",
      delay: 0.18,
    },
    {
      title: "Delivery",
      lines: ["Pressure is easier to absorb.", "The right support keeps work moving."],
      top: "42%",
      right: "10%",
      width: "14.5rem",
      delay: 0.4,
    },
    {
      title: "Signals",
      lines: ["Player insight sharpens direction.", "Better data leads to better timing."],
      bottom: "16%",
      left: "16%",
      width: "14rem",
      delay: 0.68,
    },
  ],
  [
    {
      title: "Support",
      lines: ["Operators embedded where it counts.", "Roadblocks are easier to remove early."],
      top: "20%",
      left: "8%",
      width: "15rem",
      delay: 0.2,
    },
    {
      title: "Momentum",
      lines: ["Execution can stay disciplined.", "Consistency compounds over the project."],
      top: "36%",
      right: "9%",
      width: "15rem",
      delay: 0.44,
    },
    {
      title: "Growth",
      lines: ["Better launches start upstream.", "A clearer system creates stronger outcomes."],
      bottom: "18%",
      left: "18%",
      width: "15rem",
      delay: 0.66,
    },
  ],
  [
    {
      title: "Clarity",
      lines: ["Decision confidence changes everything.", "Clear ownership keeps teams aligned."],
      top: "18%",
      left: "9%",
      width: "15rem",
      delay: 0.2,
    },
    {
      title: "Credibility",
      lines: ["Audience trust is built deliberately.", "Communication should feel composed, not reactive."],
      top: "40%",
      right: "8%",
      width: "16rem",
      delay: 0.46,
    },
    {
      title: "Partner",
      lines: ["Serious teams need serious support.", "High Ambitions Studio helps steady the room."],
      bottom: "17%",
      left: "14%",
      width: "15rem",
      delay: 0.7,
    },
  ],
];

export function AmbientPopups() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [stageIndex, setStageIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const driftXRaw = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "6%"]);
  const driftX = useSpring(driftXRaw, { stiffness: 56, damping: 28, mass: 1 });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const next = Math.max(0, Math.min(popupStages.length - 1, Math.round(latest * (popupStages.length - 1))));
      setStageIndex((current) => (current === next ? current : next));
    });

    return unsubscribe;
  }, [scrollYProgress]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLineIndex((current) => current + 1);
    }, 2600);

    return () => window.clearInterval(interval);
  }, []);

  const popups = popupStages[stageIndex];

  return (
    <div className="pointer-events-none fixed inset-0 z-[7] hidden overflow-hidden 2xl:block">
      {popups.slice(0, 2).map((popup, index) => (
        <motion.div
          key={`${stageIndex}-${popup.title}`}
          className="ambient-popup"
          style={{
            top: popup.top,
            right: popup.right,
            bottom: popup.bottom,
            left: popup.left,
            width: popup.width,
            x: driftX,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.32, y: 0 }
              : {
                  y: [0, index % 2 === 0 ? -8 : 8, 0],
                  opacity: [0.22, 0.4, 0.24],
                }
          }
          transition={{
            duration: 9 + index * 1.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: popup.delay,
          }}
        >
          <div className="ambient-popup__line" />
          <div className="ambient-popup__eyebrow">{popup.title}</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${stageIndex}-${index}-${lineIndex % popup.lines.length}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="ambient-popup__note"
            >
              {popup.lines[lineIndex % popup.lines.length]}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
