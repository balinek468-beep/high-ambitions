"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { MotionDivider } from "@/components/ui/line-system";
import { portfolioProjects } from "@/lib/content";

function PortfolioCta({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: "primary" | "secondary";
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.26em] transition-all duration-300 hover:-translate-y-1";
  const styles =
    variant === "primary"
      ? "border border-[rgba(169,210,255,0.34)] bg-[linear-gradient(135deg,rgba(130,220,255,0.95),rgba(105,154,255,0.86))] text-[#061018] shadow-[0_14px_36px_rgba(80,160,255,0.24)] hover:brightness-105 hover:shadow-[0_18px_42px_rgba(80,160,255,0.3)]"
      : "border border-[rgba(200,235,255,0.22)] bg-[rgba(255,255,255,0.04)] text-[#f5f8ff] shadow-[0_12px_28px_rgba(0,0,0,0.22)] hover:border-[rgba(169,210,255,0.38)] hover:bg-[rgba(255,255,255,0.07)]";

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${styles}`}
    >
      <span>{label}</span>
      <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
    </Link>
  );
}

function ProjectPreview({
  project,
}: {
  project: (typeof portfolioProjects)[number];
}) {
  const images = project.images ?? [];

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(174,239,234,0.22)] bg-[rgba(174,239,234,0.08)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          Live
        </span>
        <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
          Project dossier
        </span>
      </div>

      <div className="relative h-[clamp(280px,34vw,430px)] overflow-visible rounded-[1.75rem] border border-[rgba(160,210,230,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        {images[0] ? (
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute inset-0 overflow-hidden rounded-[inherit]"
          >
            <Image
              src={images[0]}
              alt={`${project.title} primary artwork`}
              fill
              className="object-cover saturate-110 contrast-105"
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,18,0.06),rgba(7,10,18,0.46)_54%,rgba(7,10,18,0.76))]" />
          </motion.div>
        ) : (
          <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_24%_22%,rgba(169,210,255,0.3),transparent_28%),radial-gradient(circle_at_68%_30%,rgba(255,209,220,0.22),transparent_24%),linear-gradient(160deg,rgba(8,10,16,0.32),rgba(8,10,16,0.94))]" />
        )}

        <div className="pointer-events-none absolute inset-[4.5%] rounded-[1.45rem] border border-[rgba(255,255,255,0.11)]" />

        {images[1] ? (
          <motion.div
            className="absolute bottom-[11%] left-[7%] z-[2] w-[clamp(155px,25vw,270px)] overflow-hidden rounded-[1.1rem] border border-[rgba(200,235,255,0.28)] bg-[rgba(255,255,255,0.04)] shadow-[0_18px_48px_rgba(0,0,0,0.55),0_0_28px_rgba(120,210,255,0.12)]"
            animate={{ y: [0, -8, 0], rotate: [-1.5, -0.7, -1.5] }}
            transition={{ duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={images[1]}
                alt={`${project.title} supporting artwork left`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 46vw, 24vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(8,10,16,0.18)_18%,rgba(8,10,16,0.42))]" />
            </div>
          </motion.div>
        ) : null}

        {images[2] ? (
          <motion.div
            className="absolute bottom-[7%] right-[7%] z-[2] w-[clamp(150px,23vw,250px)] overflow-hidden rounded-[1.1rem] border border-[rgba(200,235,255,0.28)] bg-[rgba(255,255,255,0.04)] shadow-[0_18px_48px_rgba(0,0,0,0.55),0_0_28px_rgba(120,210,255,0.12)]"
            animate={{ y: [0, 7, 0], rotate: [1.5, 0.7, 1.5] }}
            transition={{ duration: 6.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={images[2]}
                alt={`${project.title} supporting artwork right`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 44vw, 22vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(8,10,16,0.18)_18%,rgba(8,10,16,0.42))]" />
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

function ProjectSelectorItem({
  project,
  active,
}: {
  project: (typeof portfolioProjects)[number];
  active: boolean;
}) {
  return (
    <button
      type="button"
      className={`group flex w-full items-center justify-between gap-4 rounded-[1.25rem] border px-4 py-4 text-left transition-all duration-300 ${
        active
          ? "border-[rgba(169,210,255,0.26)] bg-[rgba(255,255,255,0.06)] shadow-[0_14px_34px_rgba(0,0,0,0.2)]"
          : "border-[var(--line)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(169,210,255,0.18)] hover:bg-[rgba(255,255,255,0.04)]"
      }`}
      aria-pressed={active}
    >
      <div>
        <div className="text-sm font-semibold tracking-[-0.03em] text-[#f7f3ea]">{project.title}</div>
        <div className="mt-2 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">{project.platform}</div>
      </div>
      <div className="flex items-center gap-3">
        {active ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(174,239,234,0.24)] bg-[rgba(174,239,234,0.08)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--accent)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            Live
          </span>
        ) : null}
        <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">{project.status}</span>
      </div>
    </button>
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
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(169,210,255,0.08),transparent_36%,rgba(255,209,220,0.06)_74%,rgba(174,239,234,0.08))] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <ProjectPreview project={project} />

        <div className="mt-6 rounded-[1.5rem] border border-[rgba(160,210,230,0.16)] bg-[rgba(10,14,22,0.62)] p-5">
          <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Scene 01</div>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[#f7f3ea]">{project.title}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{project.description}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Role</div>
              <div className="mt-2 text-sm font-medium text-[#f7f3ea]">{project.role}</div>
            </div>
            <div className="rounded-[1rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Platform</div>
              <div className="mt-2 text-sm font-medium text-[#f7f3ea]">{project.platform}</div>
            </div>
            <div className="rounded-[1rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Status</div>
              <div className="mt-2 text-sm font-medium text-[#f7f3ea]">{project.status}</div>
            </div>
            <div className="rounded-[1rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Genre</div>
              <div className="mt-2 text-sm font-medium text-[#f7f3ea]">{project.genre}</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.gameUrl ? <PortfolioCta href={project.gameUrl} label="Visit Game" variant="primary" /> : null}
            {project.groupUrl ? <PortfolioCta href={project.groupUrl} label="Visit Group" variant="secondary" /> : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function FeaturedProjectCard({
  project,
}: {
  project: (typeof portfolioProjects)[number];
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(145deg,rgba(22,26,34,0.96),rgba(12,14,20,0.92))] p-6 shadow-[var(--shadow-glow)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(169,210,255,0.11),transparent_34%,rgba(255,209,220,0.09)_68%,rgba(174,239,234,0.12))]" />
      <div className="absolute left-7 right-7 top-7 h-px bg-[linear-gradient(90deg,rgba(169,210,255,0.28),transparent)]" />
      <div className="relative">
        <ProjectPreview project={project} />

        <div className="mt-6 rounded-[1.5rem] border border-[rgba(160,210,230,0.16)] bg-[rgba(10,14,22,0.62)] p-5 xl:p-6">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">Scene 01</div>
              <h3 className="mt-3 text-[clamp(2rem,3.4vw,3.35rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#f7f3ea]">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Roblox roleplay experience framed as a live project dossier with real game art, community presence, and direct project support context.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 xl:justify-end">
              {project.gameUrl ? <PortfolioCta href={project.gameUrl} label="Visit Game" variant="primary" /> : null}
              {project.groupUrl ? <PortfolioCta href={project.groupUrl} label="Visit Group" variant="secondary" /> : null}
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Role</div>
              <div className="mt-3 text-sm font-medium text-[#f7f3ea]">{project.role}</div>
            </div>
            <div className="rounded-[1rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Platform</div>
              <div className="mt-3 text-sm font-medium text-[#f7f3ea]">{project.platform}</div>
            </div>
            <div className="rounded-[1rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Status</div>
              <div className="mt-3 text-sm font-medium text-[#f7f3ea]">{project.status}</div>
            </div>
            <div className="rounded-[1rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Studio role</div>
              <div className="mt-3 text-sm font-medium text-[#f7f3ea]">{project.role}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function PortfolioSection() {
  const activeProject = portfolioProjects[0];

  return (
    <section id="portfolio" className="section-shell relative py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_16%,rgba(169,210,255,0.08),transparent_18%),radial-gradient(circle_at_76%_68%,rgba(255,209,220,0.08),transparent_18%)]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Our Portfolio"
          title="A showcase of projects, concepts, and development work created or supported by High Ambitions Studios."
          description="A curated look at the games, systems, and support frameworks connected to the studio, presented with the same level of care as the rest of the brand experience."
        />

        <div className="mt-16 grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(8,10,16,0.88))] p-8"
          >
            <div className="section-frame" />
            <div className="line-sweep top-[5.75rem]" />
            <div className="ambient-node left-8 top-24 h-2 w-2" />
            <div className="text-xs uppercase tracking-[0.34em] text-[var(--accent)]">Showcase stage</div>
            <MotionDivider className="mt-6 h-px w-28 origin-left bg-[linear-gradient(90deg,var(--accent-blue),var(--accent),transparent)]" />
            <div className="mt-6 text-[clamp(3rem,7vw,5.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.08em] text-[#f7f3ea]">
              Our
              <br />
              portfolio.
            </div>
            <p className="mt-8 max-w-sm text-base leading-7 text-[var(--muted)]">
              Each project is framed like a live studio dossier, with the concept, delivery role, genre, and platform gathered into one controlled presentation.
            </p>

            <div className="mt-10 grid gap-3">
              {portfolioProjects.map((project) => (
                <ProjectSelectorItem key={project.title} project={project} active={project.title === activeProject.title} />
              ))}
            </div>
          </motion.div>

          <div className="grid gap-6">
            <div className="hidden lg:block">
              <FeaturedProjectCard project={activeProject} />
            </div>

            <div className="grid gap-6 lg:hidden">
              {portfolioProjects.map((project, index) => (
                <ProjectStackCard key={`${project.title}-${index}`} project={project} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
