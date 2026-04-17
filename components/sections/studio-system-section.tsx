"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const nodes = [
  { label: "Design", x: "20%", y: "24%" },
  { label: "Production", x: "52%", y: "20%" },
  { label: "Analytics", x: "76%", y: "38%" },
  { label: "Marketing", x: "28%", y: "66%" },
  { label: "Community", x: "64%", y: "72%" },
];

const links = [
  { x1: "20%", y1: "24%", x2: "52%", y2: "20%" },
  { x1: "52%", y1: "20%", x2: "76%", y2: "38%" },
  { x1: "20%", y1: "24%", x2: "28%", y2: "66%" },
  { x1: "28%", y1: "66%", x2: "64%", y2: "72%" },
  { x1: "52%", y1: "20%", x2: "64%", y2: "72%" },
];

export function StudioSystemSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const wordX = useTransform(scrollYProgress, [0, 1], ["-10%", "12%"]);
  const panelY = useTransform(scrollYProgress, [0, 1], [50, -30]);

  return (
    <section ref={ref} className="section-shell relative overflow-clip py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div style={{ x: wordX }} className="pointer-events-none mb-8 text-[clamp(4rem,13vw,10rem)] font-semibold uppercase leading-none tracking-[-0.09em] text-[rgba(255,255,255,0.08)]">
          Studio System
        </motion.div>
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <motion.div style={{ y: panelY }} className="relative rounded-[2.3rem] border border-[var(--line)] bg-[rgba(9,11,13,0.7)] p-8 shadow-[var(--shadow)] backdrop-blur-xl md:p-10">
            <div className="section-kicker">Network view</div>
            <h2 className="mt-5 max-w-xl text-[clamp(3rem,6vw,5.25rem)] font-semibold uppercase leading-[0.9] tracking-[-0.07em] text-[#faf6ef]">
              Watch the support system power up.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-[var(--muted)] md:text-lg">
              High Ambitions Studio is designed to connect production, player insight, reach, and community communication into one clearer operational picture.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Nodes activate as the story progresses.",
                "Connections show how decisions travel across the project.",
                "Signals become clearer as systems align.",
                "Support stays modular and embedded.",
              ].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5 text-sm leading-7 text-[var(--muted)]"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="relative min-h-[34rem] overflow-hidden rounded-[2.3rem] border border-[var(--line)] bg-[rgba(9,11,13,0.7)] shadow-[var(--shadow)] backdrop-blur-xl">
            <div className="absolute inset-0 contour-field opacity-20" />
            <div className="absolute inset-0 grid-overlay opacity-15" />
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              {links.map((link, index) => (
                <motion.line
                  key={`${link.x1}-${link.x2}`}
                  x1={link.x1}
                  y1={link.y1}
                  x2={link.x2}
                  y2={link.y2}
                  stroke={index % 2 === 0 ? "rgba(214,255,82,0.58)" : "rgba(255,255,255,0.35)"}
                  strokeWidth="0.18"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </svg>
            {nodes.map((node, index) => (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute"
                style={{ left: node.x, top: node.y }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute inset-[-1.25rem] rounded-full border border-[rgba(214,255,82,0.12)]" />
                  <div className="absolute inset-[-2.2rem] rounded-full border border-[rgba(255,255,255,0.06)]" />
                  <div className="rounded-full border border-[rgba(214,255,82,0.28)] bg-[rgba(214,255,82,0.09)] px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-[#f9f6ef] shadow-[0_0_24px_rgba(214,255,82,0.18)]">
                    {node.label}
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-8 left-8 right-8 rounded-[1.8rem] border border-[rgba(255,255,255,0.1)] bg-[rgba(8,10,12,0.74)] p-6 backdrop-blur-sm"
            >
              <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">System reading</div>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
                When these functions are connected properly, production becomes more stable, audience learning becomes faster, and communication becomes easier to trust.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
