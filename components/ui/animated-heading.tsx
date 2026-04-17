"use client";

import { motion } from "framer-motion";

import { smoothEase } from "@/lib/animations";

type AnimatedHeadingProps = {
  title: string;
  className?: string;
};

export function AnimatedHeading({ title, className }: AnimatedHeadingProps) {
  const words = title.split(" ");

  return (
    <div className="relative">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
        className={className}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="mr-[0.22em] inline-block overflow-hidden align-top">
            <motion.span
              className="inline-block"
              variants={{
                hidden: {
                  y: index % 3 === 1 ? "-115%" : "115%",
                  opacity: 0,
                  filter: "blur(10px)",
                },
                visible: {
                  y: "0%",
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: {
                    duration: 1.12,
                    delay: index * 0.06,
                    ease: smoothEase,
                  },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h2>
      <motion.span
        initial={{ scaleX: 0, opacity: 0.5, x: -18 }}
        whileInView={{ scaleX: 1, opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 1, delay: 0.24, ease: smoothEase }}
        className="mt-5 block h-px origin-left bg-[linear-gradient(90deg,var(--accent),transparent)]"
      />
    </div>
  );
}
