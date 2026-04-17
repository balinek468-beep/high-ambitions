"use client";

import { motion } from "framer-motion";

import { fadeUp } from "@/lib/animations";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  amount?: number;
  delay?: number;
};

export function AnimatedSection({
  children,
  className,
  amount = 0.2,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
