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

import { SectionHeading } from "@/components/ui/section-heading";
import {
  MotionDivider,
} from "@/components/ui/line-system";
import { portfolioProjects } from "@/lib/content";

function ProjectThumbnail({
  index,
  active,
}: {
  index: number;
  active: boolean;
}) {
  const mode = index % 3;

  return (
    <div className="relative aspect-[1.08] overflow-hidden rounded-[1.75rem] border border-[rgba(255,255,255,0.1)] bg-[linear-gradient(145deg,rgba(169,210,255,0.14),rgba(255,209,220,0.08)_42%,rgba(6,8,14,0.92))]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(169,210,255,0.3),transparent_28%),radial-gradient(circle_at_68%_30%,rgba(255,209,220,0.22),transparent_24%),linear-gradient(160deg,rgba(8,10,16,0.32),rgba(8,10,16,0.94))]" />
      <motion.div
        className="absolute inset-[8%] rounded-[1.4rem] border border-[rgba(255,255,255,0.11)]"
        animate={
          mode === 0 && active
            ? { rotate: [0, 1.8, 0] }
            : mode === 1 && active
              ? { scale: [0.97, 1.02, 0.97], opacity: [0.7, 1, 0.7] }
              : mode === 2 && active
                ? { x: [0, 8, 0], y: [0, -8, 0] }
                : undefined
        }
        transition={{ duration: 7, repeat: active ? Number.POSITIVE_INFINITY : 0, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[12%] top-[14%] h-[18%] w-[48%] rounded-[1.15rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] backdrop-blur-sm"
        animate={
          mode === 0 && active
            ? { x: [0, 8, 0] }
            : mode === 1 && active
              ? { y: [0, -12, 0], rotate: [0, -1.2, 0] }
              : mode === 2 && active
                ? { scaleX: [0.94, 1.06, 0.94], opacity: [0.64, 1, 0.68] }
                : undefined
        }
        transition={{ duration: 5.5, repeat: active ? Number.POSITIVE_INFINITY : 0, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] top-[28%] h-[34%] w-[26%] rounded-[1.4rem] border border-[rgba(174,239,234,0.18)] bg-[rgba(174,239,234,0.08)]"
        animate={
          mode === 0 && active
            ? { y: [0, 10, 0] }
            : mode === 1 && active
              ? { x: [0, -12, 0], opacity: [0.42, 0.82, 0.42] }
              : mode === 2 && active
                ? { rotate: [0, 2, 0], y: [0, 6, 0] }
                : undefined
        }
        transition={{ duration: 6, repeat: active ? Number.POSITIVE_INFINITY : 0, ease: "easeInOut" }}
      />
      <div className="absolute bottom-[12%] left-[10%] right-[12%] rounded-[1.25rem] border border-[rgba(255,255,255,0.14)] bg-[rgba(8,10,16,0.74)] p-4 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
            Scene {index + 1}
          </span>
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_14px_rgba(174,239,234,0.42)]" />
        </div>
        <div className="mt-4 space-y-2">
          {[66, 82, 52].map((width) => (
            <div key={width} className="h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-pink),var(--accent))]"
                animate={{ width: active ? `${width}%` : `${width - 8}%` }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="scan-line" />
    </div>
  );
}

function ProjectStackCard({
  project,
  index,
}: {
  project: (typeof portfolioProjects)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(169,210,255,0.08),transparent_36%,rgba(255,209,220,0.06)_74%,rgba(174,239,234,0.08))] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
              {project.status}
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
              {project.tags.join(" / ")}
            </span>
          </div>
          <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-[#f7f3ea]">
            {project.title}
          </h3>
          <p className="mt-3 text-base leading-7 text-[var(--muted)]">{project.role}</p>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)]">{project.description}</p>
        </div>
        <ProjectThumbnail index={index} active={false} />
      </div>
    </motion.article>
  );
}

function FeaturedProjectCard({
  project,
  index,
  active,
}: {
  project: (typeof portfolioProjects)[number];
  index: number;
  active: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.92, rotateX: 8, y: 24, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.03, rotateX: -6, y: -16, filter: "blur(8px)" }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(145deg,rgba(22,26,34,0.96),rgba(12,14,20,0.92))] p-6 shadow-[var(--shadow-glow)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(169,210,255,0.11),transparent_34%,rgba(255,209,220,0.09)_68%,rgba(174,239,234,0.12))]" />
      <div className="absolute left-7 right-7 top-7 h-px bg-[linear-gradient(90deg,rgba(169,210,255,0.28),transparent)]" />
      <motion.div
        animate={active ? { opacity: [0.4, 1, 0.52], scale: [0.92, 1.02, 0.94] } : { opacity: 0.4, scale: 0.92 }}
        transition={{ duration: 3.8, repeat: active ? Number.POSITIVE_INFINITY : 0, ease: "easeInOut" }}
        className="absolute right-7 top-7 h-20 w-20 rounded-full border border-[rgba(174,239,234,0.18)] bg-[radial-gradient(circle,rgba(174,239,234,0.22),transparent_72%)] blur-sm"
      />
      <div className="relative grid h-full gap-6 xl:grid-cols-[1.14fr_0.86fr]">
        <div className="grid grid-rows-[auto_1fr_auto] gap-5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
              {project.status}
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
              Project dossier
            </span>
          </div>

          <div className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="overflow-hidden rounded-[1.7rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
              <ProjectThumbnail index={index} active={active} />
            </div>

            <div className="flex flex-col rounded-[1.7rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5">
              <h3 className="text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#f7f3ea]">
                {project.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">{project.role}</p>
              <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{project.description}</p>
              <div className="mt-auto pt-6">
                <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Support profile
                </div>
                <div className="mt-4 space-y-3">
                  {[72, 56, 84].map((width, lineIndex) => (
                    <div key={width} className="h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                  <motion.div
                        className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-pink),var(--accent))]"
                        animate={
                          active
                            ? { width: [`${Math.max(18, width - 12)}%`, `${width}%`, `${Math.max(20, width - 8)}%`] }
                            : { width: `${Math.max(18, width - 18)}%` }
                        }
                        transition={{
                          duration: 2.8 + lineIndex * 0.35,
                          repeat: active ? Number.POSITIVE_INFINITY : 0,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="rounded-[1.2rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-right">
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                Featured project
              </div>
              <div className="mt-2 text-sm font-semibold tracking-[-0.03em] text-[#f7f3ea]">
                Scene 0{index + 1}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectArchiveSpine({
  project,
  index,
  active,
}: {
  project: (typeof portfolioProjects)[number];
  index: number;
  active: boolean;
}) {
  return (
    <motion.div
      animate={{
        opacity: active ? 1 : 0.42,
        scale: active ? 1 : 0.96,
        borderColor: active ? "rgba(169,210,255,0.24)" : "rgba(255,255,255,0.08)",
        backgroundColor: active ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-[1.2rem] border px-4 py-4"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">Scene 0{index + 1}</div>
          <div className="mt-2 text-sm font-semibold tracking-[-0.03em] text-[#f7f3ea]">{project.title}</div>
        </div>
        <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">{project.status}</div>
      </div>
    </motion.div>
  );
}

export function PortfolioSection() {
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
    stiffness: 46,
    damping: 26,
    mass: 0.92,
  });
  const stageGlowX = useTransform(smoothedProgress, [0, 1], ["16%", "72%"]);
  const stageGlowY = useTransform(smoothedProgress, [0, 1], ["18%", "62%"]);
  const stageLineScale = useTransform(smoothedProgress, [0, 1], [0.82, 1.06]);

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
        Math.min(portfolioProjects.length - 1, Math.round(latest * (portfolioProjects.length - 1))),
      );
      setActiveIndex(next);
    });

    return unsubscribe;
  }, [smoothedProgress]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="section-shell relative py-28 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_16%,rgba(169,210,255,0.08),transparent_18%),radial-gradient(circle_at_76%_68%,rgba(255,209,220,0.08),transparent_18%)]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Portfolio"
          title="Projects staged as a controlled system, not a flat list."
          description="A showcase layer for the games, launches, and operational support tracks the studio contributes to. The structure is ready to populate with live project work over time."
        />

        <div ref={sceneRef} className={`relative mt-16 ${enhanced ? "h-[620vh]" : ""}`}>
        {enhanced ? (
            <div className="sticky top-0 flex min-h-screen items-center">
              <div className="grid w-full gap-10 lg:grid-cols-[0.76fr_1.24fr]">
                <motion.div
                  className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(8,10,16,0.88))] p-8"
                >
                  <div className="section-frame" />
                  <div className="line-sweep top-[5.75rem]" />
                  <div className="ambient-node left-8 top-24 h-2 w-2" />
                  <div className="text-xs uppercase tracking-[0.34em] text-[var(--accent)]">Showcase stage</div>
                  <MotionDivider className="mt-6 h-px w-28 origin-left bg-[linear-gradient(90deg,var(--accent-blue),var(--accent),transparent)]" />
                  <div className="mt-6 text-[clamp(3rem,7vw,5.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.08em] text-[#f7f3ea]">
                    Project
                    <br />
                    dossiers.
                  </div>
                  <p className="mt-8 max-w-sm text-base leading-7 text-[var(--muted)]">
                    Each project is presented like a live working file, with the thumbnail, support profile, and role gathered into one spotlighted scene.
                  </p>
                  <div className="mt-10 grid gap-3">
                    {portfolioProjects.map((project, index) => (
                      <div
                        key={project.title}
                        className={`rounded-[1.25rem] border px-4 py-4 transition-all duration-300 ${
                          activeIndex === index
                            ? "border-[rgba(169,210,255,0.24)] bg-[rgba(255,255,255,0.06)] shadow-[0_14px_34px_rgba(0,0,0,0.2)]"
                            : "border-[var(--line)] bg-[rgba(255,255,255,0.02)]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-semibold tracking-[-0.03em] text-[#f7f3ea]">
                            {project.title}
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                            {project.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div className="relative h-[44rem]">
                  <motion.div
                    className="pointer-events-none absolute left-[6%] top-[11%] h-px w-[74%] bg-[linear-gradient(90deg,rgba(169,210,255,0.26),rgba(255,255,255,0.04),transparent)]"
                    style={{ scaleX: stageLineScale, transformOrigin: "left center" }}
                  />
                  <motion.div
                    className="pointer-events-none absolute h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(174,239,234,0.16),transparent_72%)] blur-xl"
                    style={{ left: stageGlowX, top: stageGlowY }}
                  />
                  <motion.div
                    className="pointer-events-none absolute left-[18%] bottom-[12%] h-px w-[38%] bg-[linear-gradient(90deg,rgba(255,209,220,0.28),transparent)]"
                    style={{ scaleX: stageLineScale, transformOrigin: "left center" }}
                  />
                  <div className="absolute inset-0 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                    <div className="relative">
                      <AnimatePresence mode="wait">
                        <FeaturedProjectCard
                          key={portfolioProjects[activeIndex].title}
                          project={portfolioProjects[activeIndex]}
                          index={activeIndex}
                          active
                        />
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-col justify-center gap-4 pl-2">
                      {portfolioProjects.map((project, index) => (
                        <ProjectArchiveSpine
                          key={project.title}
                          project={project}
                          index={index}
                          active={activeIndex === index}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
        ) : (
          <div className="mt-16 grid gap-6">
            {portfolioProjects.map((project, index) => (
              <ProjectStackCard key={project.title} project={project} index={index} />
            ))}
          </div>
        )}
        </div>
      </div>
    </section>
  );
}
