"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type PrimaryButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
};

export function PrimaryButton({ href, children, variant = "solid" }: PrimaryButtonProps) {
  const solid = variant === "solid";

  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={href}
        data-cursor-label={solid ? "Open" : "Explore"}
        data-magnetic="true"
        className={`magnetic-target group relative inline-flex items-center gap-3 overflow-hidden rounded-full border px-5 py-3 text-sm font-medium tracking-[0.2em] uppercase ${
          solid
            ? "border-[rgba(174,239,234,0.5)] bg-[linear-gradient(135deg,var(--accent-blue),var(--accent-pink)_52%,var(--accent))] text-[#050505] shadow-[0_0_0_1px_rgba(174,239,234,0.35),0_15px_35px_rgba(169,210,255,0.18)]"
            : "border-[var(--line-strong)] bg-[rgba(255,255,255,0.02)] text-[#f3f1ea]"
        }`}
      >
        <span
          className={`absolute inset-0 ${
            solid
              ? "bg-[linear-gradient(90deg,rgba(255,255,255,0.26),transparent_35%,rgba(255,255,255,0.12))]"
              : "bg-[linear-gradient(90deg,rgba(169,210,255,0.16),rgba(255,209,220,0.12)_48%,rgba(174,239,234,0.08))]"
          } translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-0`}
        />
        <span className="relative overflow-hidden">
          <span className="block transition-transform duration-500 group-hover:-translate-y-full">{children}</span>
          <span className="absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
            {children}
          </span>
        </span>
        <span
          className={`relative h-2 w-2 rounded-full transition-transform duration-500 group-hover:translate-x-1 ${
            solid ? "bg-[#050505]" : "bg-[var(--accent)]"
          }`}
        />
      </Link>
    </motion.div>
  );
}
