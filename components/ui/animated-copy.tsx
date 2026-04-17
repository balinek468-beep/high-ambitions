"use client";

import { motion } from "framer-motion";

import { smoothEase } from "@/lib/animations";

type AnimatedCopyProps = {
  text: string;
  className?: string;
  amount?: number;
  delay?: number;
  mode?: "flow" | "alternate";
};

export function AnimatedCopy({
  text,
  className,
  amount = 0.35,
  delay = 0,
  mode = "alternate",
}: AnimatedCopyProps) {
  const words = text.split(" ");

  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      className={className}
    >
      {words.map((word, index) => {
        const fromTop = mode === "flow" ? false : index % 3 === 1;

        return (
          <span key={`${word}-${index}`} className="mr-[0.24em] inline-block overflow-hidden align-top">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: {
                  y: fromTop ? "-118%" : "118%",
                  opacity: 0,
                  filter: "blur(8px)",
                },
                visible: {
                  y: "0%",
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: {
                    duration: 1.15,
                    delay: delay + index * 0.032,
                    ease: smoothEase,
                  },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.p>
  );
}
