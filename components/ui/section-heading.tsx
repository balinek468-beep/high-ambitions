"use client";

import { motion } from "framer-motion";

import { AnimatedCopy } from "@/components/ui/animated-copy";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { fadeUp, staggerContainer } from "@/lib/animations";

type SectionHeadingProps = {
  label: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";

  return (
    <motion.div
      className={alignment}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-3">
        <span className="h-px w-12 bg-[var(--accent)]" />
        <span className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--accent)]">
          {label}
        </span>
      </motion.div>
      <AnimatedHeading
        title={title}
        className="text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#f6f3ec] md:text-6xl"
      />
      <AnimatedCopy
        text={description}
        className="mt-6 text-base leading-7 text-[var(--muted)] md:text-lg"
        delay={0.12}
      />
    </motion.div>
  );
}
