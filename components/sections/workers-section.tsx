"use client";

import { motion } from "framer-motion";

import { AnimatedSection } from "@/components/ui/animated-section";
import { MotionDivider } from "@/components/ui/line-system";
import { SectionHeading } from "@/components/ui/section-heading";
import { workers } from "@/lib/content";

export function WorkersSection() {
  return (
    <section id="workers" className="section-shell relative py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(169,210,255,0.08),transparent_22%),radial-gradient(circle_at_82%_76%,rgba(255,209,220,0.06),transparent_20%)]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Workers"
          title="The people behind High Ambitions Studios."
          description="Names for the team can live here for now, with full roles and profiles ready to be added once you send the final worker list."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {workers.map((worker, index) => (
            <AnimatedSection key={worker.name} delay={index * 0.05}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-full overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(160deg,rgba(18,22,28,0.92),rgba(10,12,18,0.94))] p-6 shadow-[var(--shadow)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(169,210,255,0.08),transparent_36%,rgba(255,209,220,0.06)_74%,rgba(174,239,234,0.08))] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="section-frame" />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                        Team member
                      </div>
                      <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#f7f3ea]">
                        {worker.name}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ opacity: [0.18, 0.42, 0.2], scale: [0.92, 1.06, 0.92] }}
                      transition={{ duration: 4.6 + index * 0.28, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(174,239,234,0.16),transparent_72%)]"
                    />
                  </div>

                  <MotionDivider className="mt-6 h-px w-24 origin-left bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-pink),transparent)]" />
                  <p className="mt-6 text-sm leading-7 text-[var(--muted)]">
                    Worker profile details can be added here once the final team list is ready.
                  </p>
                </div>
              </motion.article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
