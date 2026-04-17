"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { MotionDivider } from "@/components/ui/line-system";
import { ServiceIcon } from "@/components/ui/service-icon";
import { services } from "@/lib/content";

function StackCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      whileHover={{ y: -6 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        rotateX.set(py * -4);
        rotateY.set(px * 4);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      className="group relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(160deg,rgba(18,22,28,0.9),rgba(10,12,18,0.92))] p-6 shadow-[var(--shadow)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(169,210,255,0.08),transparent_38%,rgba(255,209,220,0.06)_72%,rgba(174,239,234,0.08))] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between">
          <ServiceIcon index={index} />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
            {service.eyebrow}
          </span>
        </div>
        <MotionDivider className="mt-8 h-px w-20 origin-left bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-pink),transparent)]" />
        <h3 className="mt-6 text-2xl font-semibold tracking-[-0.05em] text-[#f8f4ec]">
          {service.title}
        </h3>
        <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
          {service.description}
        </p>
        <div className="mt-auto pt-8 text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Structured support
        </div>
      </div>
    </motion.article>
  );
}

function SceneCard({
  service,
  index,
  progress,
  active,
}: {
  service: (typeof services)[number];
  index: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const lane = useTransform(progress, (value) => value * (services.length - 1));
  const delta = useTransform(lane, (value) => index - value);
  const x = useTransform(delta, (value) => {
    const clamped = Math.max(-2.4, Math.min(2.4, value));
    const sign = clamped < 0 ? -1 : 1;
    const distance = Math.abs(clamped);
    const spread = 220 + index * 12;
    const curve = distance * distance * 34;
    const activePull = Math.max(0, 1 - distance) * -36;
    return sign * (distance * spread + curve) + activePull;
  });
  const y = useTransform(delta, (value) => {
    const clamped = Math.max(-2.4, Math.min(2.4, value));
    const distance = Math.abs(clamped);
    const lift = active ? -26 : 0;
    return distance * 22 + distance * distance * 18 + lift;
  });
  const rotate = useTransform(delta, (value) => {
    const clamped = Math.max(-2.4, Math.min(2.4, value));
    return clamped * 11;
  });
  const scale = useTransform(delta, (value) => {
    const distance = Math.abs(Math.max(-2.4, Math.min(2.4, value)));
    return Math.max(0.68, 1.08 - distance * 0.16);
  });
  const opacity = useTransform(delta, (value) => {
    const distance = Math.abs(Math.max(-2.4, Math.min(2.4, value)));
    return Math.max(0.16, 1 - distance * 0.34);
  });
  const filter = useTransform(delta, (value) => {
    const distance = Math.abs(Math.max(-2.4, Math.min(2.4, value)));
    return `blur(${distance * 1.8}px)`;
  });

  const sizeClass =
    index === 0
      ? "h-[27rem] w-[33rem]"
      : index === 1
        ? "h-[31rem] w-[38rem]"
        : index === 2
          ? "h-[26rem] w-[31rem]"
          : index === 3
            ? "h-[25rem] w-[34rem]"
            : "h-[28rem] w-[32rem]";

  return (
    <motion.article
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        filter,
        transformOrigin: "50% 118%",
        zIndex: active ? 40 : 18 - index,
      }}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2.2rem] border border-[var(--line)] bg-[linear-gradient(160deg,rgba(18,22,28,0.94),rgba(10,12,18,0.92))] p-7 shadow-[var(--shadow-glow)] backdrop-blur-xl ${sizeClass}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(169,210,255,0.08),transparent_34%,rgba(255,209,220,0.08)_68%,rgba(174,239,234,0.08))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-pink),transparent)]" />
      <motion.div
        animate={active ? { opacity: [0.22, 0.48, 0.24], scale: [0.94, 1.06, 0.94] } : { opacity: 0.12, scale: 0.92 }}
        transition={{ duration: 4.6 + index * 0.35, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(174,239,234,0.16),transparent_70%)]"
      />

      <motion.div
        className="relative flex h-full flex-col"
        animate={active ? { scale: 1, opacity: 1 } : { scale: 0.97, opacity: 0.76 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ServiceIcon index={index} />
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
              {service.eyebrow}
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
            0{index + 1}
          </div>
        </div>

        {index === 0 ? (
          <motion.div
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0.72, y: 8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid flex-1 gap-6 md:grid-cols-[1.15fr_0.85fr]"
          >
            <div>
              <MotionDivider className="h-px w-20 origin-left bg-[linear-gradient(90deg,var(--accent-blue),transparent)]" />
              <h3 className="mt-6 text-[2.2rem] font-semibold tracking-[-0.06em] text-[#f8f4ec]">
                {service.title}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
                {service.description}
              </p>
            </div>
            <div className="grid gap-4">
              {[82, 66, 58].map((width, row) => (
                <div key={width} className="rounded-[1.25rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Control lane {row + 1}</div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                    <motion.div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-pink))]"
                      animate={active ? { width: [`${width - 10}%`, `${width}%`, `${width - 6}%`] } : { width: `${width - 12}%` }}
                      transition={{ duration: 3 + row * 0.35, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}

        {index === 1 ? (
          <motion.div
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0.72, y: 8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid flex-1 gap-6 md:grid-cols-[0.72fr_1.28fr]"
          >
            <div className="flex flex-col gap-4">
              {[0, 1, 2].map((bar) => (
                <div key={bar} className="rounded-[1.35rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
                  <div className="flex items-end gap-2">
                    {[14, 28, 42].map((height, dot) => (
                      <motion.div
                        key={height}
                        className="w-2 rounded-full bg-[linear-gradient(180deg,var(--accent-blue),var(--accent-pink))]"
                        animate={active ? { height: [height - 6, height, height - 3] } : { height: height - 8 }}
                        transition={{ duration: 1.9 + dot * 0.18 + bar * 0.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <MotionDivider className="h-px w-24 origin-left bg-[linear-gradient(90deg,var(--accent-pink),transparent)]" />
              <h3 className="mt-6 text-[2.5rem] font-semibold tracking-[-0.06em] text-[#f8f4ec]">
                {service.title}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
                {service.description}
              </p>
              <div className="mt-auto rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
                <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Live production rhythm</div>
                <motion.div
                  className="mt-5 h-px bg-[linear-gradient(90deg,var(--accent-blue),var(--accent),transparent)]"
                  animate={active ? { scaleX: [0.62, 1, 0.7], opacity: [0.34, 1, 0.38] } : { scaleX: 0.46, opacity: 0.22 }}
                  transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        ) : null}

        {index === 2 ? (
          <motion.div
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0.72, y: 8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-1 flex-col"
          >
            <div className="grid gap-4 md:grid-cols-3">
              {["Retention", "Playtime", "Monetization"].map((label, chip) => (
                <div key={label} className="rounded-[1.2rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                  {label}
                </div>
              ))}
            </div>
            <h3 className="mt-8 text-[2.25rem] font-semibold tracking-[-0.06em] text-[#f8f4ec]">
              {service.title}
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
              {service.description}
            </p>
            <div className="mt-auto rounded-[1.7rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5">
              <div className="grid gap-4 md:grid-cols-3">
                {[0, 1, 2].map((node) => (
                  <div key={node} className="relative h-20 rounded-[1.25rem] border border-[rgba(255,255,255,0.06)]">
                    <motion.div
                      className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]"
                      animate={active ? { y: [0, node % 2 === 0 ? -10 : 10, 0], opacity: [0.34, 1, 0.34] } : { opacity: 0.26 }}
                      transition={{ duration: 2.4 + node * 0.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}

        {index === 3 ? (
          <motion.div
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0.72, y: 8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid flex-1 gap-6 md:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-2">
                {["Social", "Creators", "Paid", "Storefronts"].map((tag) => (
                  <span key={tag} className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mt-8 text-[2.2rem] font-semibold tracking-[-0.06em] text-[#f8f4ec]">
                {service.title}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
                {service.description}
              </p>
            </div>
            <div className="relative flex items-center justify-center rounded-[1.8rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]">
              <motion.div
                className="h-28 w-28 rounded-full border border-[rgba(174,239,234,0.18)]"
                animate={active ? { rotate: 360, scale: [0.94, 1.06, 0.94] } : { scale: 0.92 }}
                transition={{ rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }, scale: { duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } }}
              />
              <motion.div
                className="absolute h-3 w-3 rounded-full bg-[var(--accent-pink)]"
                animate={active ? { x: [0, 38, 0], y: [0, -28, 0] } : { opacity: 0.3 }}
                transition={{ duration: 3.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        ) : null}

        {index === 4 ? (
          <motion.div
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0.72, y: 8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid flex-1 gap-6 md:grid-cols-[1.08fr_0.92fr]"
          >
            <div className="relative overflow-hidden rounded-[1.9rem] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(12,14,20,0.72))] p-5">
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Audience room
                </div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
                  Response live
                </div>
              </div>

              <div className="relative mt-5 flex h-[15.5rem] flex-col justify-between">
                {[
                  {
                    align: "start",
                    width: "w-[72%]",
                    label: "Player concern received",
                    tone: "bg-[rgba(255,255,255,0.05)]",
                    delay: 0,
                  },
                  {
                    align: "end",
                    width: "w-[64%]",
                    label: "Brand response shaped",
                    tone: "bg-[linear-gradient(135deg,rgba(169,210,255,0.12),rgba(255,209,220,0.08))]",
                    delay: 0.28,
                  },
                  {
                    align: "start",
                    width: "w-[58%]",
                    label: "Tone reviewed",
                    tone: "bg-[rgba(255,255,255,0.04)]",
                    delay: 0.5,
                  },
                  {
                    align: "end",
                    width: "w-[68%]",
                    label: "Community trust protected",
                    tone: "bg-[linear-gradient(135deg,rgba(174,239,234,0.12),rgba(169,210,255,0.08))]",
                    delay: 0.74,
                  },
                ].map((thread, threadIndex) => (
                  <motion.div
                    key={thread.label}
                    className={`flex ${thread.align === "end" ? "justify-end" : "justify-start"}`}
                    animate={
                      active
                        ? { opacity: [0.38, 1, 0.54], y: [10, 0, 4] }
                        : { opacity: 0.36, y: 6 }
                    }
                    transition={{
                      duration: 3.8,
                      delay: thread.delay,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <div className={`${thread.width} rounded-[1.15rem] border border-[rgba(255,255,255,0.08)] px-4 py-3 ${thread.tone}`}>
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]"
                          animate={active ? { scale: [0.9, 1.4, 0.9], opacity: [0.34, 1, 0.34] } : { opacity: 0.28 }}
                          transition={{
                            duration: 2 + threadIndex * 0.24,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />
                        <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
                          {thread.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  className="absolute left-[18%] top-[20%] h-px bg-[linear-gradient(90deg,var(--accent-blue),transparent)]"
                  animate={active ? { width: ["0%", "24%", "0%"], opacity: [0, 0.9, 0] } : { width: "0%", opacity: 0 }}
                  transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute right-[16%] top-[44%] h-px bg-[linear-gradient(90deg,var(--accent-pink),transparent)]"
                  animate={active ? { width: ["0%", "22%", "0%"], opacity: [0, 0.78, 0] } : { width: "0%", opacity: 0 }}
                  transition={{ duration: 3.7, delay: 0.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute left-[30%] top-[67%] h-px bg-[linear-gradient(90deg,var(--accent),transparent)]"
                  animate={active ? { width: ["0%", "18%", "0%"], opacity: [0, 0.72, 0] } : { width: "0%", opacity: 0 }}
                  transition={{ duration: 3.4, delay: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <MotionDivider className="h-px w-24 origin-left bg-[linear-gradient(90deg,var(--accent),transparent)]" />
              <h3 className="mt-6 text-[2.15rem] font-semibold tracking-[-0.06em] text-[#f8f4ec]">
                {service.title}
              </h3>
              <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--muted)]">
                {service.description}
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  "Community signals translated into clear responses",
                  "Player-facing communication shaped before issues escalate",
                  "A steadier external voice when attention gets loud",
                ].map((point, pointIndex) => (
                  <motion.div
                    key={point}
                    className="rounded-[1.15rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3"
                    animate={
                      active
                        ? {
                            opacity: [0.38, 1, 0.52],
                            borderColor: [
                              "rgba(255,255,255,0.08)",
                              "rgba(174,239,234,0.18)",
                              "rgba(255,255,255,0.08)",
                            ],
                          }
                        : { opacity: 0.4 }
                    }
                    transition={{
                      duration: 4.2,
                      delay: pointIndex * 0.36,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
                      {point}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between pt-8">
                <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  Trusted external voice
                </div>
                <motion.div
                  className="h-10 w-10 rounded-full border border-[rgba(174,239,234,0.18)]"
                  animate={active ? { scale: [0.92, 1.08, 0.92], opacity: [0.34, 1, 0.42] } : { opacity: 0.26 }}
                  transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </motion.div>
    </motion.article>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [enhanced, setEnhanced] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const stagedProgress = useTransform(sectionProgress, [0.08, 0.92], [0, 1]);
  const smoothedProgress = useSpring(stagedProgress, {
    stiffness: 48,
    damping: 26,
    mass: 0.9,
  });
  const lane = useTransform(smoothedProgress, (value) => value * (services.length - 1));
  const stageGlowScale = useTransform(smoothedProgress, [0, 1], [0.92, 1.08]);
  const stageGlowOpacity = useTransform(smoothedProgress, [0, 1], [0.22, 0.34]);

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
      const next = Math.max(0, Math.min(services.length - 1, Math.round(latest * (services.length - 1))));
      setActiveIndex((current) => (current === next ? current : next));
    });

    return unsubscribe;
  }, [smoothedProgress]);

  const activeService = services[activeIndex];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-shell relative overflow-clip py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Services"
          title="A service system designed to strengthen delivery, communication, and growth."
          description="Each discipline is structured to complement the others, giving your team focused support without diluting ownership or creative direction."
        />

        <div ref={sceneRef} className={`relative mt-16 ${enhanced ? "h-[620vh]" : ""}`}>
          {enhanced ? (
            <div className="sticky top-0 flex min-h-screen items-center">
              <div className="grid w-full gap-10 lg:grid-cols-[0.78fr_1.22fr]">
                <div className="relative overflow-hidden rounded-[2.2rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(7,8,14,0.94))] p-8 md:p-10">
                  <div className="section-frame" />
                  <div className="absolute inset-0 grid-overlay opacity-10" />
                  <div className="relative flex h-full min-h-[42rem] flex-col">
                    <div className="text-xs uppercase tracking-[0.34em] text-[var(--accent)]">Service studio</div>
                    <MotionDivider className="mt-6 h-px w-28 origin-left bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-pink),transparent)]" />
                    <div className="mt-8 text-[clamp(3rem,7vw,5.8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.08em] text-[#f8f4ec]">
                      Support
                      <br />
                      modes.
                    </div>
                    <p className="mt-6 max-w-sm text-base leading-7 text-[var(--muted)]">
                      Each service now plays like its own mode on stage instead of another card in the same stack.
                    </p>

                    <div className="mt-10 space-y-3">
                      {services.map((service, index) => (
                        <motion.div
                          key={service.title}
                          animate={{
                            opacity: activeIndex === index ? 1 : 0.5,
                            x: activeIndex === index ? 0 : 0,
                            scale: activeIndex === index ? 1 : 0.98,
                          }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className={`rounded-[1.4rem] border px-4 py-4 ${
                            activeIndex === index
                              ? "border-[rgba(174,239,234,0.24)] bg-[rgba(255,255,255,0.06)]"
                              : "border-[var(--line)] bg-[rgba(255,255,255,0.02)]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-semibold tracking-[-0.03em] text-[#f8f4ec]">
                              {service.title}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                              {service.eyebrow}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-auto rounded-[1.7rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5">
                      <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">Active service</div>
                      <div className="mt-4 text-3xl font-semibold tracking-[-0.06em] text-[#f8f4ec]">
                        {activeService.title}
                      </div>
                      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                        {activeService.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative h-[45rem] overflow-visible rounded-[2.4rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(8,10,16,0.9))] p-6">
                  <div className="section-frame" />
                  <motion.div
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(169,210,255,0.12),rgba(255,209,220,0.08)_42%,transparent_72%)] blur-3xl"
                    style={{ scale: stageGlowScale, opacity: stageGlowOpacity }}
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-x-[12%] top-[12%] h-px bg-[linear-gradient(90deg,transparent,rgba(169,210,255,0.2),transparent)]"
                    animate={{ opacity: [0.18, 0.42, 0.2], scaleX: [0.88, 1.04, 0.9] }}
                    transition={{ duration: 5.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-x-[18%] bottom-[12%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,209,220,0.16),transparent)]"
                    animate={{ opacity: [0.12, 0.36, 0.14], scaleX: [0.82, 1.02, 0.84] }}
                    transition={{ duration: 6.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                  {services.map((service, index) => (
                    <motion.div key={service.title} style={{ pointerEvents: "none" }}>
                      <SceneCard
                        service={service}
                        index={index}
                        progress={smoothedProgress}
                        active={activeIndex === index}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <StackCard key={service.title} service={service} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
