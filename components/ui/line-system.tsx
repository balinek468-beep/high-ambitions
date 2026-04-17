"use client";

import { motion } from "framer-motion";
import type { MotionStyle } from "framer-motion";

type AnimatedConnectorLineProps = {
  className?: string;
  orientation?: "horizontal" | "vertical" | "diagonal-down" | "diagonal-up";
  color?: string;
  delay?: number;
  duration?: number;
  style?: MotionStyle;
};

export function AnimatedConnectorLine({
  className = "",
  orientation = "horizontal",
  color = "rgba(174,239,234,0.55)",
  delay = 0,
  duration = 2.8,
  style,
}: AnimatedConnectorLineProps) {
  const gradient =
    orientation === "vertical"
      ? `linear-gradient(180deg, transparent, ${color}, transparent)`
      : orientation === "diagonal-down"
        ? `linear-gradient(135deg, transparent, ${color}, transparent)`
        : orientation === "diagonal-up"
          ? `linear-gradient(45deg, transparent, ${color}, transparent)`
          : `linear-gradient(90deg, transparent, ${color}, transparent)`;

  const scaleKey =
    orientation === "vertical" ? { scaleY: [0.2, 1, 0.34] } : { scaleX: [0.2, 1, 0.34] };

  return (
    <motion.div
      className={className}
      style={{ background: gradient, ...style }}
      animate={{
        opacity: [0.1, 0.7, 0.18],
        ...scaleKey,
      }}
      transition={{
        duration: duration + delay * 0.35,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 0.55 + delay * 0.2,
        ease: "easeInOut",
      }}
    />
  );
}

type SignalNodeProps = {
  className?: string;
  delay?: number;
  color?: string;
  style?: MotionStyle;
};

export function SignalNode({
  className = "",
  delay = 0,
  color = "rgba(174,239,234,0.92)",
  style,
}: SignalNodeProps) {
  return (
    <motion.span
      className={className}
      style={{
        background: color,
        boxShadow: `0 0 22px ${color.replace("0.92", "0.34")}`,
        ...style,
      }}
      animate={{
        scale: [0.88, 1.28, 0.92],
        opacity: [0.34, 1, 0.4],
      }}
      transition={{
        duration: 2.1 + delay * 0.4,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 0.7 + delay * 0.22,
        ease: "easeInOut",
      }}
    />
  );
}

type MotionDividerProps = {
  className?: string;
  delay?: number;
};

export function MotionDivider({ className = "", delay = 0 }: MotionDividerProps) {
  return (
    <motion.div
      className={className}
      initial={{ scaleX: 0.16, opacity: 0.2 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

type RoutePathProps = {
  className?: string;
  path: string;
  color?: string;
  delay?: number;
};

export function RoutePath({
  className = "",
  path,
  color = "rgba(169,210,255,0.52)",
  delay = 0,
}: RoutePathProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.2 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="4 18"
        animate={{ strokeDashoffset: [0, -28] }}
        transition={{
          duration: 2.6 + delay * 0.45,
          delay,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 0.65 + delay * 0.18,
          ease: "linear",
        }}
      />
    </svg>
  );
}
