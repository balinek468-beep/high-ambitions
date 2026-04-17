"use client";

import {
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
import { differentiators } from "@/lib/content";

function ValueStackCard({
  item,
  index,
  active,
}: {
  item: (typeof differentiators)[number];
  index: number;
  active: boolean;
}) {
  const mode = index % 3;
  const baseY = index === 0 ? 6 : index === 1 ? 30 : 58;
  const baseRotate = index === 0 ? -2.4 : index === 1 ? 1.8 : -1.2;
  const baseScale = index === 0 ? 0.94 : index === 1 ? 0.9 : 0.86;
  const baseBlur = index === 0 ? "3px" : index === 1 ? "7px" : "11px";

  return (
    <motion.article
      animate={{
        opacity: active ? 1 : 0.36,
        scale: active ? 1 : baseScale,
        y: active ? 0 : baseY,
        x: 0,
        rotate: active ? 0 : baseRotate,
        filter: active ? "blur(0px)" : `blur(${baseBlur})`,
      }}
      transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1400, zIndex: active ? 30 : 18 - index }}
      className="absolute inset-0 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(160deg,rgba(18,22,28,0.94),rgba(10,12,18,0.92))] p-7 shadow-[var(--shadow-glow)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(169,210,255,0.08),transparent_34%,rgba(255,209,220,0.08)_68%,rgba(174,239,234,0.08))]" />
      <motion.div
        animate={active ? { opacity: [0.18, 0.42, 0.2], scale: [0.92, 1.06, 0.92] } : { opacity: 0.08, scale: 0.82 }}
        transition={{ duration: 4.2 + index * 0.35, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute right-8 top-8 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(174,239,234,0.16),transparent_72%)]"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-pink),transparent)]" />
      <div className="floating-bracket floating-bracket--tl left-5 top-5" />
      <div className="floating-bracket floating-bracket--br bottom-5 right-5" />

      <motion.div
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0.72, y: 8 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-full flex-col"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_16px_rgba(174,239,234,0.35)]" />
            Value signal
          </span>
          <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
            0{index + 1}
          </span>
        </div>

        <h3 className="mt-8 max-w-xl text-[clamp(2rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-[#f8f4ec]">
          {item.title}
        </h3>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-base">
          {item.description}
        </p>

        <div className="mt-auto pt-8">
          {mode === 0 ? (
            <div className="grid gap-3 md:grid-cols-3">
              {[76, 58, 88].map((width, row) => (
                <div key={width} className="rounded-[1.15rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-3">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">Control {row + 1}</div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                    <motion.div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-pink))]"
                      animate={active ? { width: [`${width - 10}%`, `${width}%`, `${width - 4}%`] } : { width: `${width - 14}%` }}
                      transition={{ duration: 3 + row * 0.25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {mode === 1 ? (
            <div className="flex items-center gap-5">
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((dot) => (
                  <motion.span
                    key={dot}
                    className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]"
                    animate={active ? { y: [0, dot % 2 === 0 ? -8 : 8, 0], opacity: [0.26, 1, 0.26] } : { opacity: 0.24 }}
                    transition={{ duration: 2 + dot * 0.16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                ))}
              </div>
              <motion.div
                className="h-px flex-1 bg-[linear-gradient(90deg,var(--accent-blue),rgba(255,255,255,0.08))]"
                animate={active ? { scaleX: [0.64, 1, 0.72], opacity: [0.34, 1, 0.36] } : { scaleX: 0.52, opacity: 0.22 }}
                transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </div>
          ) : null}

          {mode === 2 ? (
            <div className="rounded-[1.35rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
              <div className="text-[10px] uppercase tracking-[0.26em] text-[var(--muted)]">Player-informed route</div>
              <div className="relative mt-4 h-16">
                {[12, 32, 58, 84].map((left, point) => (
                  <motion.div
                    key={left}
                    className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[var(--accent)]"
                    style={{ left: `${left}%` }}
                    animate={active ? { y: [0, point % 2 === 0 ? -7 : 7, 0], scale: [0.92, 1.14, 0.92] } : { opacity: 0.22 }}
                    transition={{ duration: 2.2 + point * 0.02, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                ))}
                <div className="absolute left-[12%] top-1/2 h-px w-[72%] -translate-y-1/2 bg-[linear-gradient(90deg,rgba(169,210,255,0.36),rgba(255,209,220,0.22),rgba(174,239,234,0.34))]" />
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>
    </motion.article>
  );
}

export function WhyUsSection() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [enhanced, setEnhanced] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const stagedProgress = useTransform(sectionProgress, [0.14, 0.86], [0, 1]);
  const smoothedProgress = useSpring(stagedProgress, {
    stiffness: 42,
    damping: 28,
    mass: 1.02,
  });

  const manifestoY = useTransform(smoothedProgress, [0, 1], ["0%", "-4%"]);
  const ghostOpacity = useTransform(smoothedProgress, [0, 0.4, 0.8, 1], [0.08, 0.18, 0.1, 0.06]);
  const glowX = useTransform(smoothedProgress, [0, 1], ["18%", "66%"]);

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
        Math.min(differentiators.length - 1, Math.round(latest * (differentiators.length - 1))),
      );
      setActiveIndex(next);
    });

    return unsubscribe;
  }, [smoothedProgress]);

  return (
    <section className="section-shell relative py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_26%,rgba(174,239,234,0.1),transparent_18%),radial-gradient(circle_at_22%_64%,rgba(255,209,220,0.08),transparent_22%)]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Why Us"
          title="External support that adds control without adding friction."
          description="We help game teams operate with more confidence by introducing structure where it matters, sharper communication where it is needed, and trusted perspective when the work gets complex."
        />

        <div ref={sceneRef} className={`relative mt-16 ${enhanced ? "h-[560vh]" : ""}`}>
          {enhanced ? (
            <div className="sticky top-0 flex min-h-screen items-center">
              <div className="grid w-full gap-10 lg:grid-cols-[0.74fr_1.26fr]">
                <motion.div
                  style={{ y: manifestoY }}
                  className="relative overflow-hidden rounded-[2.4rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(8,10,14,0.94))] p-8 md:p-10"
                >
                  <div className="section-frame" />
                  <div className="absolute inset-0 grid-overlay opacity-10" />
                  <motion.div
                    style={{ opacity: ghostOpacity }}
                    className="absolute left-8 top-14 text-[clamp(4rem,10vw,8rem)] font-semibold uppercase leading-none tracking-[-0.12em] text-[rgba(255,255,255,0.06)]"
                  >
                    TRUST
                  </motion.div>
                  <div className="relative flex h-full min-h-[39rem] flex-col">
                    <div className="text-xs uppercase tracking-[0.32em] text-[var(--muted)]">
                      Editorial statement
                    </div>
                    <MotionDivider
                      delay={0.12}
                      className="mt-6 h-px w-32 origin-left bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-pink),transparent)]"
                    />
                    <div className="mt-8 max-w-[20rem] text-[clamp(2.15rem,4.9vw,4.75rem)] font-semibold uppercase leading-[0.98] tracking-[-0.06em] text-[#f8f4ec] md:max-w-[24rem]">
                      Calm systems.
                      <br />
                      Stronger
                      <br />
                      outcomes.
                    </div>
                    <p className="mt-8 max-w-lg text-base leading-7 text-[var(--muted)] md:text-lg">
                      Our role is not to overwhelm your team with process. It is to make execution cleaner, decisions sharper, and support more scalable as the project evolves.
                    </p>

                    <div className="mt-auto grid gap-4 pt-10">
                      {[
                        "Strategic oversight without delivery noise",
                        "Operational clarity under pressure",
                        "A trusted external point of view",
                      ].map((line, index) => (
                        <motion.div
                          key={line}
                          animate={
                            prefersReducedMotion
                              ? undefined
                              : { y: [0, index % 2 === 0 ? -4 : 4, 0], opacity: [0.6, 1, 0.62] }
                          }
                          transition={{ duration: 5.2 + index * 0.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                          className="rounded-[1.25rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-4 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]"
                        >
                          {line}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <div className="relative h-[42rem] overflow-visible rounded-[2.5rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(8,10,16,0.9))] p-6">
                  <div className="section-frame" />
                  <motion.div
                    className="pointer-events-none absolute top-[14%] h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(174,239,234,0.16),transparent_72%)] blur-2xl"
                    style={{ left: glowX }}
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-x-[12%] top-[12%] h-px bg-[linear-gradient(90deg,transparent,rgba(169,210,255,0.18),transparent)]"
                    animate={{ opacity: [0.14, 0.36, 0.16], scaleX: [0.88, 1.04, 0.9] }}
                    transition={{ duration: 5.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-x-[16%] bottom-[14%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,209,220,0.14),transparent)]"
                    animate={{ opacity: [0.1, 0.3, 0.12], scaleX: [0.82, 1.02, 0.84] }}
                    transition={{ duration: 6.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="pointer-events-none absolute left-[14%] top-[18%] h-px w-[54%] bg-[linear-gradient(90deg,rgba(169,210,255,0.18),transparent)]"
                    animate={{ x: activeIndex === 0 ? 0 : activeIndex === 1 ? 22 : 48, opacity: [0.14, 0.34, 0.16] }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.div
                    className="pointer-events-none absolute left-[18%] top-[22%] h-3 w-3 rounded-full bg-[rgba(174,239,234,0.7)] shadow-[0_0_18px_rgba(174,239,234,0.28)]"
                    animate={{ x: activeIndex === 0 ? 0 : activeIndex === 1 ? 36 : 82, y: activeIndex === 2 ? 18 : 0, scale: [0.92, 1.16, 0.92] }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], scale: { duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } }}
                  />

                  {differentiators.map((item, index) => (
                    <ValueStackCard
                      key={item.title}
                      item={item}
                      index={index}
                      active={activeIndex === index}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-16 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <AnimatedSection className="relative overflow-hidden rounded-[2.2rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(6,6,7,0.94))] p-8 md:p-10">
                <div className="absolute inset-0 grid-overlay opacity-15" />
                <div className="relative">
                  <div className="text-xs uppercase tracking-[0.32em] text-[var(--muted)]">Editorial statement</div>
                  <div className="mt-8 text-[clamp(3.25rem,8vw,6.75rem)] font-semibold uppercase leading-[0.92] tracking-[-0.08em] text-[#f8f4ec]">
                    Calm systems.
                    <br />
                    Stronger outcomes.
                  </div>
                  <p className="mt-8 max-w-xl text-base leading-7 text-[var(--muted)] md:text-lg">
                    Our role is not to overwhelm your team with process. It is to make execution cleaner, decisions sharper, and support more scalable as the project evolves.
                  </p>
                </div>
              </AnimatedSection>

              <div className="grid gap-5">
                {differentiators.map((item, index) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-7 backdrop-blur-xl"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="flex items-start gap-5">
                      <div className="mt-1 h-3 w-3 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(174,239,234,0.3)]" />
                      <div>
                        <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#f8f4ec]">
                          {item.title}
                        </h3>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-base">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
