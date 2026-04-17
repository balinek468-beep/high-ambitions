"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { AnimatedSection } from "@/components/ui/animated-section";
import { MotionDivider } from "@/components/ui/line-system";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/lib/content";

function MobileProcessCard({
  step,
  index,
}: {
  step: (typeof processSteps)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.95, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-7 shadow-[var(--shadow)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(169,210,255,0.06),transparent_36%,rgba(255,209,220,0.06)_74%,rgba(174,239,234,0.08))]" />
      <div className="relative">
        <div className="flex items-center gap-4">
          <span className="text-xs uppercase tracking-[0.32em] text-[var(--accent)]">{step.index}</span>
          <MotionDivider className="h-px flex-1 origin-left bg-[linear-gradient(90deg,var(--accent),rgba(255,255,255,0.08))]" />
        </div>
        <h3 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-[#f8f4ec]">{step.title}</h3>
        <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)] md:text-base">
          {step.description}
        </p>
      </div>
    </motion.article>
  );
}

export function ProcessSection() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [enhanced, setEnhanced] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const stagedProgress = useTransform(scrollYProgress, [0.12, 0.88], [0, 1]);
  const smoothedProgress = useSpring(stagedProgress, {
    stiffness: 40,
    damping: 28,
    mass: 1.05,
  });

  const railProgress = useTransform(smoothedProgress, [0, 1], [0.16, 1]);
  const glowX = useTransform(smoothedProgress, [0, 1], ["18%", "74%"]);
  const glowY = useTransform(smoothedProgress, [0, 1], ["22%", "58%"]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateMode = () => setEnhanced(mediaQuery.matches);
    updateMode();

    mediaQuery.addEventListener("change", updateMode);
    return () => mediaQuery.removeEventListener("change", updateMode);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const unsubscribe = smoothedProgress.on("change", (latest) => {
      const next = Math.max(
        0,
        Math.min(processSteps.length - 1, Math.round(latest * (processSteps.length - 1))),
      );
      setActiveIndex(next);
    });

    return unsubscribe;
  }, [smoothedProgress]);

  const activeStep = processSteps[activeIndex];

  return (
    <section id="process" className="section-shell relative py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(169,210,255,0.08),transparent_22%),radial-gradient(circle_at_82%_72%,rgba(174,239,234,0.08),transparent_20%)]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Process"
          title="A clear operating model from first conversation to long-term optimization."
          description="We build engagements around structured movement: understanding the project, aligning priorities, supporting execution, and refining the system as the game evolves."
        />

        <div ref={sceneRef} className={`relative mt-16 ${enhanced ? "h-[560vh]" : ""}`}>
          {enhanced ? (
            <div className="sticky top-0 flex min-h-screen items-center">
              <div className="relative w-full overflow-hidden rounded-[2.4rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(7,8,14,0.94))] p-8 md:p-10">
                <div className="section-frame" />
                <div className="absolute inset-0 contour-lines opacity-[0.14]" />
                <motion.div
                  className="absolute h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(169,210,255,0.14),transparent_72%)] blur-xl"
                  style={{ left: glowX, top: glowY }}
                />
                <motion.div
                  className="absolute left-[12%] top-[8rem] h-px w-[42%] bg-[linear-gradient(90deg,rgba(169,210,255,0.16),rgba(255,255,255,0.04),transparent)]"
                  animate={{ opacity: [0.18, 0.42, 0.2], scaleX: [0.92, 1.04, 0.94] }}
                  transition={{ duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />

                <div className="relative grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
                  <div className="flex min-h-[42rem] flex-col justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.34em] text-[var(--accent)]">Operating route</div>
                      <MotionDivider className="mt-5 h-px w-28 origin-left bg-[linear-gradient(90deg,var(--accent-blue),var(--accent),transparent)]" />
                      <div className="mt-6 text-[clamp(2.8rem,6vw,4.9rem)] font-semibold uppercase leading-[0.92] tracking-[-0.08em] text-[#f7f3ea]">
                        Process
                        <br />
                        in view.
                      </div>
                      <p className="mt-6 max-w-sm text-base leading-7 text-[var(--muted)]">
                        One phase takes focus at a time while the others stay visible in the rail, so the whole engagement reads as a guided sequence instead of a stack of competing cards.
                      </p>
                    </div>

                    <div className="relative mt-10 space-y-4">
                      <motion.div
                        className="absolute left-[0.6rem] top-3 bottom-3 w-px origin-top bg-[linear-gradient(180deg,rgba(169,210,255,0.4),rgba(174,239,234,0.42),rgba(255,255,255,0.08))]"
                        style={{ scaleY: railProgress }}
                      />
                      {processSteps.map((step, index) => {
                        const active = activeIndex === index;

                        return (
                          <motion.div
                            key={step.index}
                            animate={{
                              opacity: active ? 1 : 0.52,
                              x: active ? 0 : 8,
                              scale: active ? 1 : 0.985,
                            }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            className="relative flex items-start gap-4 pl-8"
                          >
                            <motion.span
                              animate={{
                                scale: active ? 1.15 : 0.9,
                                opacity: active ? 1 : 0.42,
                                backgroundColor: active ? "rgba(174,239,234,0.22)" : "rgba(255,255,255,0.04)",
                                borderColor: active ? "rgba(174,239,234,0.45)" : "rgba(255,255,255,0.12)",
                              }}
                              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute left-0 top-1 h-4 w-4 rounded-full border"
                            />
                            <div>
                              <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                                {step.index}
                              </div>
                              <div className={`mt-2 text-sm font-semibold tracking-[-0.03em] ${active ? "text-[#f7f3ea]" : "text-[var(--muted)]"}`}>
                                {step.title}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="relative min-h-[42rem]">
                    <AnimatePresence mode="wait">
                      <motion.article
                        key={activeStep.index}
                        initial={{ opacity: 0, y: 28, scale: 0.96, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -18, scale: 1.02, filter: "blur(8px)" }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex h-full min-h-[42rem] flex-col overflow-hidden rounded-[2.1rem] border border-[var(--line)] bg-[linear-gradient(160deg,rgba(18,22,28,0.96),rgba(10,12,18,0.94))] p-8 shadow-[var(--shadow-glow)]"
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(169,210,255,0.08),transparent_34%,rgba(255,209,220,0.08)_68%,rgba(174,239,234,0.1))]" />
                        <div className="absolute left-8 right-8 top-0 h-px bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-pink),transparent)]" />
                        <motion.div
                          className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(174,239,234,0.16),transparent_72%)]"
                          animate={{ opacity: [0.2, 0.46, 0.22], scale: [0.92, 1.04, 0.94] }}
                          transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        />

                        <div className="relative flex h-full flex-col">
                          <div className="flex items-start justify-between gap-6">
                            <div>
                              <div className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">
                                Active phase
                              </div>
                              <div className="mt-3 text-[4.5rem] font-semibold leading-none tracking-[-0.09em] text-[#f7f3ea]">
                                {activeStep.index}
                              </div>
                            </div>
                            <div className="max-w-xs text-right text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
                              Structured movement from discovery through optimization
                            </div>
                          </div>

                          <div className="mt-8 grid flex-1 gap-6 xl:grid-cols-[1.12fr_0.88fr]">
                            <div className="flex flex-col">
                              <h3 className="text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#f7f3ea]">
                                {activeStep.title}
                              </h3>
                              <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)]">
                                {activeStep.description}
                              </p>

                              <div className="mt-auto pt-10">
                                <div className="grid gap-3 md:grid-cols-3">
                                  {[
                                    "Clear priorities",
                                    "Measured support",
                                    "Visible next step",
                                  ].map((point, pointIndex) => (
                                    <motion.div
                                      key={point}
                                      animate={{ opacity: [0.4, 1, 0.56] }}
                                      transition={{
                                        duration: 3.2 + pointIndex * 0.3,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                      }}
                                      className="rounded-[1.2rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-4 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]"
                                    >
                                      {point}
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-4">
                              <div className="rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5">
                                <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Phase emphasis</div>
                                <div className="mt-4 space-y-3">
                                  {[78, 62, 88].map((width, row) => (
                                    <div key={width} className="h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                                      <motion.div
                                        className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-pink),var(--accent))]"
                                        animate={{ width: [`${width - 12}%`, `${width}%`, `${width - 6}%`] }}
                                        transition={{
                                          duration: 2.8 + row * 0.25,
                                          repeat: Number.POSITIVE_INFINITY,
                                          ease: "easeInOut",
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="relative flex-1 overflow-hidden rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5">
                                <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Route status</div>
                                <div className="relative mt-8 h-full min-h-[12rem]">
                                  <div className="absolute left-[10%] top-[18%] h-px w-[62%] bg-[linear-gradient(90deg,rgba(169,210,255,0.35),transparent)]" />
                                  <div className="absolute left-[10%] top-[18%] bottom-[18%] w-px bg-[linear-gradient(180deg,rgba(169,210,255,0.35),rgba(174,239,234,0.24),transparent)]" />
                                  <div className="absolute left-[10%] bottom-[18%] h-px w-[72%] bg-[linear-gradient(90deg,rgba(255,209,220,0.35),transparent)]" />
                                  <motion.div
                                    className="absolute h-3 w-3 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(174,239,234,0.32)]"
                                    animate={{
                                      left: ["10%", "72%", "10%", "10%"],
                                      top: ["18%", "18%", "18%", "82%"],
                                    }}
                                    transition={{ duration: 5.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-16 grid gap-8">
              {processSteps.map((step, index) => (
                <AnimatedSection key={step.index}>
                  <MobileProcessCard step={step} index={index} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
