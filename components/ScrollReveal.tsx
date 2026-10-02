"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Animate once when scrolled into view (default) or every time. */
  once?: boolean;
};

/** Shared scroll-into-view reveal used by marketing sections. */
export function ScrollReveal({ children, className, delay = 0, once = true }: ScrollRevealProps) {
  return (
    <motion.div
      className={cn(className)}
      custom={delay}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
