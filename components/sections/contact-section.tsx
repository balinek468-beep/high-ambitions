"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { PrimaryButton } from "@/components/ui/primary-button";
import {
  AnimatedConnectorLine,
  MotionDivider,
  SignalNode,
} from "@/components/ui/line-system";
import { SectionHeading } from "@/components/ui/section-heading";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.24, 0.55, 0.34]);
  const formY = useTransform(scrollYProgress, [0, 0.5], [34, 0]);
  const infoY = useTransform(scrollYProgress, [0, 0.5], [20, 0]);

  return (
    <section id="contact" ref={sectionRef} className="section-shell relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(169,210,255,0.08),rgba(255,255,255,0.03)_28%,rgba(7,8,10,0.98)_100%)] p-8 shadow-[var(--shadow-glow)] md:p-12">
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(174,239,234,0.16),transparent_28%),radial-gradient(circle_at_12%_82%,rgba(255,209,220,0.12),transparent_24%)]"
          style={{ opacity: glowOpacity }}
        />
        <div className="editorial-outline" />
        <div className="section-frame" />
        <div className="pointer-events-none absolute inset-6 rounded-[2rem] border border-[rgba(255,255,255,0.06)]" />
        <div className="pointer-events-none absolute left-8 top-8 h-8 w-8 border-l border-t border-[rgba(169,210,255,0.35)]" />
        <div className="pointer-events-none absolute bottom-8 right-8 h-8 w-8 border-b border-r border-[rgba(255,209,220,0.35)]" />
        <div className="pointer-events-none absolute left-12 top-[6.5rem] h-px w-28 bg-[linear-gradient(90deg,rgba(169,210,255,0.45),transparent)]" />
        <div className="pointer-events-none absolute right-12 bottom-[7rem] h-px w-24 bg-[linear-gradient(90deg,rgba(174,239,234,0.45),transparent)]" />
        <div className="pointer-events-none ambient-node left-[46%] top-[18%] h-2 w-2" />
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div style={{ y: infoY }}>
            <SectionHeading
              label="Partner"
              title="Bring structure, momentum, and sharper support into the room."
              description="Tell us where your team needs support and we will respond with a thoughtful next step. If you still have questions, reach out and we'll help with anything you're unsure about."
            />
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 24 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-10 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.03)] p-6"
            >
              <div className="scan-line" />
              <AnimatedConnectorLine
                className="absolute left-6 top-11 h-px w-20 origin-left"
                color="rgba(169,210,255,0.28)"
                delay={0.08}
              />
              <AnimatedConnectorLine
                className="absolute left-[6.9rem] top-11 h-10 w-px origin-top"
                orientation="vertical"
                color="rgba(174,239,234,0.22)"
                delay={0.16}
              />
              <SignalNode className="absolute left-[6.65rem] top-[4.45rem] h-2 w-2 rounded-full" delay={0.18} />
              <div className="text-xs uppercase tracking-[0.32em] text-[var(--accent)]">Availability</div>
              <p className="mt-4 max-w-md text-sm leading-7 text-[var(--muted)]">
                We partner with game teams that need a disciplined external operator across production, growth, and communication.
              </p>
            </motion.div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: formY }}
            className="relative grid gap-5 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[rgba(7,8,10,0.72)] p-6 backdrop-blur-xl md:grid-cols-2 md:p-8"
          >
            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(169,210,255,0.06),transparent_34%,rgba(255,209,220,0.07)_72%,rgba(174,239,234,0.08))]" />
            <div className="scan-line" />
            <div className="floating-bracket floating-bracket--tl left-4 top-4" />
            <div className="floating-bracket floating-bracket--br bottom-4 right-4" />
            {[
              { label: "First Name", type: "text", span: "" },
              { label: "Roblox User", type: "text", span: "" },
              { label: "Email Address", type: "email", span: "md:col-span-2" },
            ].map((field, index) => (
              <motion.label
                key={field.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`field-shell relative block ${field.span}`}
              >
                <span className="mb-3 block text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
                  {field.label}
                </span>
                <MotionDivider className="mb-3 h-px w-14 origin-left bg-[linear-gradient(90deg,var(--accent-blue),transparent)]" />
                <input
                  type={field.type}
                  className="w-full rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.03)] px-5 py-4 text-sm text-[#f7f3ea] outline-none placeholder:text-[rgba(243,241,234,0.38)] focus:border-[rgba(174,239,234,0.45)] focus:bg-[rgba(255,255,255,0.05)]"
                  placeholder={field.label}
                />
              </motion.label>
            ))}

            <motion.label
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="field-shell relative block md:col-span-2"
            >
              <span className="mb-3 block text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Message</span>
              <MotionDivider className="mb-3 h-px w-[4.5rem] origin-left bg-[linear-gradient(90deg,var(--accent-pink),transparent)]" />
              <textarea
                rows={5}
                className="w-full resize-none rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.03)] px-5 py-4 text-sm text-[#f7f3ea] outline-none placeholder:text-[rgba(243,241,234,0.38)] focus:border-[rgba(174,239,234,0.45)] focus:bg-[rgba(255,255,255,0.05)]"
                placeholder="Tell us about your team, your game, and where support would be most valuable."
              />
            </motion.label>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col gap-4 pt-2 md:col-span-2 md:flex-row md:items-center md:justify-between"
            >
              <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
                We keep outreach focused, discreet, and easy to navigate.
              </p>
              <AnimatedConnectorLine
                className="absolute right-[8.75rem] top-[1.75rem] hidden h-px w-16 origin-right md:block"
                color="rgba(174,239,234,0.34)"
                delay={0.14}
              />
              <SignalNode className="absolute right-[8.55rem] top-[1.5rem] hidden h-2 w-2 rounded-full md:block" delay={0.22} />
              <PrimaryButton href="#contact">Send Inquiry</PrimaryButton>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
