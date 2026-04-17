"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { BrandMark } from "@/components/ui/brand-mark";
import { AnimatedCopy } from "@/components/ui/animated-copy";
import { MotionDivider } from "@/components/ui/line-system";
import { PrimaryButton } from "@/components/ui/primary-button";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.22], [0, prefersReducedMotion ? 0 : 120]);
  const scale = useTransform(scrollYProgress, [0, 0.24], [1, prefersReducedMotion ? 1 : 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.26], [1, 0.22]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, prefersReducedMotion ? 0 : -34]);
  const copyY = useTransform(scrollYProgress, [0, 0.2], [0, prefersReducedMotion ? 0 : -18]);
  const visualY = useTransform(scrollYProgress, [0, 0.2], [0, prefersReducedMotion ? 0 : 26]);
  const visualBgY = useTransform(scrollYProgress, [0, 0.2], [0, prefersReducedMotion ? 0 : -20]);
  const contourY = useTransform(scrollYProgress, [0, 0.28], [0, prefersReducedMotion ? 0 : -36]);
  const plateY = useTransform(scrollYProgress, [0, 0.22], [0, prefersReducedMotion ? 0 : 18]);
  const lineScale = useTransform(scrollYProgress, [0, 0.16], [0.76, 1.08]);
  const spaceLineX = useTransform(scrollYProgress, [0, 0.26], [0, prefersReducedMotion ? 0 : 84]);
  const spaceNodeX = useTransform(scrollYProgress, [0, 0.26], [0, prefersReducedMotion ? 0 : 108]);
  const spaceHaloX = useTransform(scrollYProgress, [0, 0.26], [0, prefersReducedMotion ? 0 : 64]);

  return (
    <section id="hero" className="section-shell relative min-h-[190vh] overflow-clip pt-24">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-20" />
      <motion.div className="pointer-events-none absolute inset-x-0 top-0 h-[82vh] topography opacity-40" style={{ y: contourY }} />
      <motion.div
        className="pointer-events-none absolute inset-x-[10%] top-[18vh] h-[46vh] rounded-full bg-[radial-gradient(circle,rgba(174,239,234,0.14),transparent_62%)] blur-3xl"
        style={{ y: visualBgY }}
      />
      <motion.div
        className="pointer-events-none absolute left-[12%] top-[20vh] h-px w-[26vw] bg-[linear-gradient(90deg,rgba(169,210,255,0.36),transparent)]"
        style={{ scaleX: lineScale }}
      />
      <motion.div
        className="pointer-events-none absolute right-[10%] top-[26vh] h-px w-[18vw] bg-[linear-gradient(90deg,rgba(255,209,220,0.34),transparent)]"
        style={{ scaleX: lineScale }}
      />
      <motion.div
        className="pointer-events-none absolute right-[18%] top-[18vh] h-px w-[34vw] bg-[linear-gradient(90deg,rgba(169,210,255,0.12),rgba(255,255,255,0.06),transparent)]"
        style={{ x: spaceLineX }}
      />
      <motion.div
        className="pointer-events-none absolute right-[8%] top-[34vh] h-px w-[28vw] bg-[linear-gradient(90deg,rgba(255,209,220,0.12),rgba(174,239,234,0.16),transparent)]"
        style={{ x: spaceLineX }}
      />
      <motion.div
        className="pointer-events-none absolute right-[14%] top-[22vh] h-40 w-40 rounded-full border border-[rgba(169,210,255,0.1)]"
        style={{ x: spaceHaloX, y: visualBgY }}
      />
      <motion.div
        className="pointer-events-none absolute right-[15%] top-[18vh] h-2.5 w-2.5 rounded-full bg-[rgba(169,210,255,0.62)] shadow-[0_0_20px_rgba(169,210,255,0.35)]"
        style={{ x: spaceNodeX }}
        animate={prefersReducedMotion ? undefined : { opacity: [0.28, 0.9, 0.3], scale: [0.86, 1.2, 0.9] }}
        transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[6%] top-[38vh] h-2 w-2 rounded-full bg-[rgba(255,209,220,0.62)] shadow-[0_0_18px_rgba(255,209,220,0.28)]"
        style={{ x: spaceNodeX }}
        animate={prefersReducedMotion ? undefined : { opacity: [0.2, 0.74, 0.24], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 5.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.7 }}
      />
      <div className="sticky top-0 flex min-h-screen items-center">
        <motion.div
          className="mx-auto grid w-full max-w-7xl items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr]"
          style={{ y, scale, opacity }}
        >
          <motion.div className="relative z-10" style={{ y: copyY }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 inline-flex items-center gap-4 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.03)] px-4 py-2 pr-5 text-xs uppercase tracking-[0.32em] text-[var(--accent)]"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(206,224,244,0.18)] bg-[linear-gradient(145deg,rgba(169,210,255,0.08),rgba(255,209,220,0.08)_50%,rgba(174,239,234,0.08))] p-1">
                <BrandMark className="h-full w-full" />
              </span>
              Game Industry Support / Consulting
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ y: titleY }}
              transition={{ duration: 1.1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl text-[clamp(3.7rem,11vw,8.75rem)] font-semibold uppercase leading-[0.88] tracking-[-0.06em] text-[#f9f6ef]"
            >
              Built to Keep Ambitious Games Moving.
            </motion.h1>

            <AnimatedCopy
              text="High Ambitions Studio provides production oversight, project management, analytics optimization, marketing, and public relations support for game teams that need sharper execution and a more credible growth strategy."
              delay={0.16}
              className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <PrimaryButton href="#contact">Partner With Us</PrimaryButton>
              <PrimaryButton href="#services" variant="ghost">
                Explore Services
              </PrimaryButton>
            </motion.div>

            <MotionDivider
              delay={0.34}
              className="mt-10 h-px w-40 origin-left bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-pink),transparent)]"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="mt-14 grid gap-6 border-t border-[var(--line)] pt-6 md:grid-cols-3"
            >
              {[
                "Production structure that protects creative velocity",
                "Player-aware decision making grounded in real signals",
                "Flexible support model for studios under pressure",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: index % 2 === 0 ? 22 : -22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.72, delay: 0.38 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]"
                >
                  <motion.span
                    className="inline-block"
                    animate={prefersReducedMotion ? undefined : { y: [0, index % 2 === 0 ? -6 : 6, 0] }}
                    transition={{ duration: 7 + index, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    {item}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="relative mx-auto w-full max-w-[38rem]" style={{ y: visualY }}>
            <motion.div
              className="pointer-events-none absolute -right-24 top-[18%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(169,210,255,0.12),transparent_70%)] blur-2xl"
              animate={prefersReducedMotion ? undefined : { x: [0, 18, 0], y: [0, -12, 0], opacity: [0.25, 0.46, 0.28] }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute -left-8 top-10 h-28 w-28 rounded-full border border-[rgba(169,210,255,0.16)]"
              animate={prefersReducedMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 26, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="pointer-events-none absolute -right-4 bottom-14 h-px w-20 bg-[linear-gradient(90deg,rgba(255,209,220,0.48),transparent)]"
              animate={prefersReducedMotion ? undefined : { x: [0, 14, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute right-[-5rem] top-[22%] h-px w-36 bg-[linear-gradient(90deg,rgba(169,210,255,0.42),rgba(255,255,255,0.04),transparent)]"
              animate={prefersReducedMotion ? undefined : { x: [0, 28, 0], opacity: [0.18, 0.52, 0.22] }}
              transition={{ duration: 7.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute right-[-3rem] bottom-[26%] h-px w-28 bg-[linear-gradient(90deg,rgba(174,239,234,0.4),transparent)]"
              animate={prefersReducedMotion ? undefined : { x: [0, 18, 0], opacity: [0.12, 0.48, 0.18] }}
              transition={{ duration: 6.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.15, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[0.92] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(145deg,rgba(169,210,255,0.12),rgba(255,209,220,0.08)_36%,rgba(255,255,255,0.04)_72%,rgba(8,10,16,0.92))] shadow-[var(--shadow-glow)]"
            >
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(169,210,255,0.24),transparent_24%),radial-gradient(circle_at_72%_34%,rgba(255,209,220,0.2),transparent_18%),radial-gradient(circle_at_68%_78%,rgba(174,239,234,0.12),transparent_24%),linear-gradient(160deg,rgba(8,10,12,0.84),rgba(12,14,16,0.96))]"
                style={{ y: visualBgY }}
              />
              <div className="absolute inset-6 rounded-[1.75rem] border border-[rgba(255,255,255,0.09)]" />
              <motion.div
                className="absolute inset-8 rounded-[1.75rem] border border-[rgba(255,255,255,0.12)]"
                animate={prefersReducedMotion ? undefined : { rotate: [0, 2, -1, 0] }}
                transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute left-[10%] top-[14%] h-[22%] w-[58%] rounded-[1.75rem] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] backdrop-blur-sm"
                animate={prefersReducedMotion ? undefined : { y: [0, -10, 0], rotate: [0, 1.5, 0] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute right-[10%] top-[26%] h-[42%] w-[36%] rounded-[2rem] border border-[rgba(174,239,234,0.22)] bg-[rgba(174,239,234,0.08)]"
                animate={prefersReducedMotion ? undefined : { y: [0, 14, 0] }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute left-[12%] top-[34%] h-px w-[28%] bg-[linear-gradient(90deg,rgba(169,210,255,0.55),transparent)]"
                animate={prefersReducedMotion ? undefined : { scaleX: [0.72, 1.05, 0.72], opacity: [0.36, 0.82, 0.36] }}
                transition={{ duration: 5.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute right-[16%] top-[18%] h-2 w-2 rounded-full bg-[rgba(255,209,220,0.78)] shadow-[0_0_22px_rgba(255,209,220,0.34)]"
                animate={prefersReducedMotion ? undefined : { scale: [0.9, 1.2, 0.9], opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-[14%] left-[12%] right-[14%] rounded-[1.5rem] border border-[rgba(255,255,255,0.14)] bg-[rgba(8,10,12,0.72)] p-6 backdrop-blur-sm"
                animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.32em] text-[var(--accent)]">Operational View</span>
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                </div>
                <div className="mt-6 space-y-3">
                  {[74, 56, 88, 62].map((width, index) => (
                    <div key={width} className="space-y-2">
                      <div className="h-px w-full bg-[rgba(255,255,255,0.08)]" />
                      <motion.div
                        className="h-2 rounded-full bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-pink),var(--accent))]"
                        initial={{ width: 0 }}
                        animate={{ width: `${width}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.12 }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="absolute right-[8%] top-[10%] h-[80%] w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.12),transparent)]"
                style={{ y: plateY }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.45 }}
              className="absolute -left-6 bottom-10 w-48 rounded-[1.5rem] border border-[var(--line)] bg-[rgba(10,12,14,0.86)] p-5 shadow-[var(--shadow)] backdrop-blur-xl"
            >
              <motion.div
                animate={prefersReducedMotion ? undefined : { boxShadow: ["0 0 0 rgba(0,0,0,0)", "0 0 32px rgba(169,210,255,0.16)", "0 0 0 rgba(0,0,0,0)"] }}
                transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(206,224,244,0.18)] bg-[linear-gradient(145deg,rgba(169,210,255,0.08),rgba(255,209,220,0.08)_50%,rgba(174,239,234,0.08))] p-1"
              >
                <BrandMark className="h-full w-full" />
              </motion.div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">Embedded support</div>
              <div className="mt-4 text-3xl font-semibold tracking-[-0.06em] text-[#f9f6ef]">Clarity</div>
              <div className="mt-2 text-sm text-[var(--muted)]">Built for teams moving under pressure.</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
