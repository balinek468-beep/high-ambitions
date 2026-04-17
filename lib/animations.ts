import type { Variants } from "framer-motion";

export const premiumEase = [0.22, 1, 0.36, 1] as const;
export const smoothEase = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: smoothEase },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.12,
    },
  },
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0 round 24px)", opacity: 0.2 },
  visible: {
    clipPath: "inset(0 0 0% 0 round 24px)",
    opacity: 1,
    transition: { duration: 1.2, ease: smoothEase },
  },
};
