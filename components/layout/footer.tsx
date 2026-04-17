"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { BrandMark } from "@/components/ui/brand-mark";
import { navItems } from "@/lib/content";

export function Footer() {
  const linkClass =
    "relative transition-colors hover:text-[#f7f3ea] after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[linear-gradient(90deg,var(--accent),transparent)] after:transition-transform after:duration-300 hover:after:scale-x-100";

  return (
    <footer className="section-shell relative overflow-hidden border-t border-[var(--line)] py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(169,210,255,0.45),rgba(255,209,220,0.35),transparent)]" />
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 bg-[radial-gradient(circle,rgba(255,209,220,0.08),transparent_70%)] blur-2xl" />
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <div className="flex items-center gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(206,224,244,0.18)] bg-[linear-gradient(145deg,rgba(169,210,255,0.08),rgba(255,209,220,0.08)_50%,rgba(174,239,234,0.08))] p-1">
              <BrandMark className="h-full w-full" />
            </span>
            <div className="text-lg font-semibold uppercase tracking-[0.22em] text-[#f7f3ea]">
              High Ambitions Studio
            </div>
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
            Premium support for ambitious game teams that need clarity, discipline, and a stronger path to performance.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-[var(--muted)] md:items-end">
          <div className="flex flex-wrap gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
            <Link href="#" className={linkClass}>
              Instagram
            </Link>
            <Link href="#" className={linkClass}>
              LinkedIn
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            <span>© 2026 High Ambitions Studio</span>
            <Link href="#" className={linkClass}>
              Privacy
            </Link>
            <Link href="#" className={linkClass}>
              Terms
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
