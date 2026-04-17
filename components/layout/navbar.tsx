"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/ui/brand-mark";
import { navItems } from "@/lib/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#about");
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 36);
  });

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.15, 0.3, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 section-shell py-4"
      animate={{
        paddingTop: scrolled ? 12 : 16,
        paddingBottom: scrolled ? 12 : 16,
      }}
    >
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-[2px] origin-left bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-pink),var(--accent))]"
        style={{ scaleX: scrollYProgress }}
      />
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 md:px-6 ${
          scrolled
            ? "border-[var(--line)] bg-[rgba(11,12,14,0.84)] shadow-[var(--shadow)] backdrop-blur-xl"
            : "border-[rgba(255,255,255,0.05)] bg-[rgba(10,12,14,0.28)] backdrop-blur-md"
        }`}
      >
        <Link href="#hero" className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(206,224,244,0.18)] bg-[linear-gradient(145deg,rgba(169,210,255,0.08),rgba(255,209,220,0.08)_50%,rgba(174,239,234,0.08))] p-1 shadow-[0_12px_25px_rgba(0,0,0,0.2)]">
            <BrandMark className="h-full w-full" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f7f3ea]">
              High Ambitions
            </div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
              Studio
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-cursor-label={item.label}
              className={`group relative rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] ${
                activeHref === item.href ? "text-[#f7f3ea]" : "text-[var(--muted)] hover:text-[#f7f3ea]"
              }`}
            >
              {activeHref === item.href ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full border border-[rgba(206,224,244,0.22)] bg-[linear-gradient(135deg,rgba(169,210,255,0.1),rgba(255,209,220,0.08)_55%,rgba(174,239,234,0.1))]"
                  transition={{ type: "spring", stiffness: 220, damping: 24 }}
                />
              ) : null}
              <span className="relative">{item.label}</span>
              <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-pink),transparent)] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
          <Link
            href="#contact"
            data-cursor-label="Partner"
            className="group relative overflow-hidden rounded-full border border-[rgba(206,224,244,0.28)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)] hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 translate-y-full bg-[linear-gradient(135deg,rgba(169,210,255,0.14),rgba(255,209,220,0.14)_52%,rgba(174,239,234,0.12))] transition-transform duration-300 group-hover:translate-y-0" />
            <span className="relative">Partner With Us</span>
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.03)] text-[#f7f3ea] md:hidden"
          aria-label="Toggle navigation"
        >
          <span className="space-y-1.5">
            <span className={`block h-px w-4 bg-current transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-px w-4 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-4 bg-current transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="mx-auto mt-3 max-w-7xl rounded-[28px] border border-[var(--line)] bg-[rgba(11,12,14,0.92)] p-5 shadow-[var(--shadow)] backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-2xl border px-4 py-3 text-sm uppercase tracking-[0.24em] ${
                  activeHref === item.href
                    ? "border-[rgba(206,224,244,0.24)] bg-[linear-gradient(135deg,rgba(169,210,255,0.1),rgba(255,209,220,0.08)_55%,rgba(174,239,234,0.08))] text-[#f7f3ea]"
                    : "border-[transparent] text-[var(--muted)] hover:border-[var(--line)] hover:bg-[rgba(255,255,255,0.03)] hover:text-[#f7f3ea]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl border border-[rgba(206,224,244,0.28)] bg-[linear-gradient(135deg,rgba(169,210,255,0.12),rgba(255,209,220,0.1)_55%,rgba(174,239,234,0.1))] px-4 py-3 text-sm uppercase tracking-[0.24em] text-[var(--accent)]"
            >
              Partner With Us
            </Link>
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  );
}
