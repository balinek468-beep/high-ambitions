"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { AnimatedSection } from "@/components/ui/animated-section";
import {
  MotionDivider,
} from "@/components/ui/line-system";
import { SectionHeading } from "@/components/ui/section-heading";
import { clipReveal, fadeUp, staggerContainer } from "@/lib/animations";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const leadY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -18]);
  const supportY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 14]);

  return (
    <section id="about" ref={sectionRef} className="section-shell relative py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(169,210,255,0.08),transparent_22%),radial-gradient(circle_at_82%_26%,rgba(255,209,220,0.07),transparent_18%)]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="About"
          title="A support team built for studios with serious ambition."
          description="High Ambitions Studio brings together experienced operators focused on helping game teams deliver with more structure, better communication, and stronger player-facing outcomes. We exist to turn ambition into coordinated execution."
        />

        <motion.div
          className="mt-16 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div
            variants={clipReveal}
            style={{ y: leadY }}
            className="group relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.03)] p-8 md:p-10"
          >
            <div className="section-frame" />
            <motion.div
              className="absolute inset-0 bg-[linear-gradient(135deg,rgba(169,210,255,0.08),transparent_42%,rgba(255,209,220,0.06)_74%,rgba(174,239,234,0.08))]"
              animate={prefersReducedMotion ? undefined : { opacity: [0.56, 0.86, 0.62] }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-12 top-16 h-56 w-56 rounded-full border border-[rgba(255,255,255,0.08)]"
              animate={prefersReducedMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <div className="line-sweep top-[5.8rem]" />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.35em] text-[var(--accent)]">Studio perspective</div>
              <p className="mt-6 max-w-2xl text-2xl leading-[1.35] tracking-[-0.03em] text-[#f8f4ec] md:text-3xl">
                We combine delivery oversight, production discipline, and player-aware thinking to help ambitious teams move with more confidence.
              </p>
              <MotionDivider
                delay={0.18}
                className="mt-7 h-px w-32 origin-left bg-[linear-gradient(90deg,var(--accent-blue),var(--accent),transparent)]"
              />
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {[
                  "Experienced operational support that integrates cleanly with internal teams.",
                  "Structured guidance designed to protect momentum without creating noise.",
                  "A practical external perspective when clarity, alignment, or focus starts to slip.",
                  "A premium working style built on trust, discretion, and sharp communication.",
                ].map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.65, delay: 0.16 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    animate={prefersReducedMotion ? undefined : { y: [0, index % 2 === 0 ? -4 : 4, 0] }}
                    className="rounded-[1.5rem] border border-[var(--line)] bg-[rgba(7,8,10,0.56)] p-5 text-sm leading-6 text-[var(--muted)]"
                  >
                    {point}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={staggerContainer} style={{ y: supportY }} className="grid gap-6">
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-8 shadow-[var(--shadow)] backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(169,210,255,0.06),transparent_40%,rgba(255,209,220,0.06))]" />
              <motion.div
                className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent-blue),var(--accent-pink),transparent)]"
                animate={prefersReducedMotion ? undefined : { opacity: [0.4, 1, 0.42], scaleX: [0.8, 1, 0.84] }}
                transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <div className="relative">
                <div className="text-xs uppercase tracking-[0.32em] text-[var(--muted)]">Approach</div>
                <MotionDivider delay={0.1} className="mt-5 h-px w-full origin-left bg-[var(--line)]" />
                <p className="mt-5 text-lg leading-8 text-[#f7f3ea]">
                  Every engagement is built around making the project easier to run, easier to understand, and easier to improve.
                </p>
              </div>
            </motion.div>
            <AnimatedSection className="relative min-h-[18rem] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(8,10,12,0.92))]">
              <div className="absolute inset-0 topography opacity-40" />
              <motion.div
                className="absolute inset-6 rounded-[1.75rem] border border-[rgba(255,255,255,0.1)]"
                animate={prefersReducedMotion ? undefined : { rotate: [0, 1.4, 0] }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(174,239,234,0.12))]" />
              <motion.div
                className="absolute right-10 top-10 h-24 w-24 rounded-full border border-[rgba(169,210,255,0.16)]"
                animate={prefersReducedMotion ? undefined : { y: [0, -8, 0], rotate: 360 }}
                transition={{ y: { duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }, rotate: { duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "linear" } }}
              />
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.32em] text-[var(--muted)]">Aligned execution</div>
                  <div className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-[#f9f6ef]">Vision to reality</div>
                </div>
                <motion.div
                  animate={prefersReducedMotion ? undefined : { scale: [0.92, 1.08, 0.92], opacity: [0.55, 1, 0.58] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="h-12 w-12 rounded-full border border-[rgba(174,239,234,0.3)] bg-[rgba(174,239,234,0.12)]"
                />
              </div>
            </AnimatedSection>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
