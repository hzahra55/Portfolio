"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { delay: i * 0.07, duration: 0.7, ease: easeOutExpo },
  }),
};

interface AnimatedHeadlineProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

/**
 * Word-by-word rise animation for headline reveals. Each word is wrapped
 * in an overflow-hidden span and rises from below.
 */
export function AnimatedHeadline({
  children,
  className,
  as = "h1",
}: AnimatedHeadlineProps) {
  const words = children.split(" ");
  const Tag = as;
  return (
    <Tag className={cn("font-display", className)}>
      <span className="sr-only">{children}</span>
      <span aria-hidden className="inline-flex flex-wrap gap-x-[0.25em]">
        {words.map((w, i) => (
          <span key={i} className="overflow-hidden inline-block leading-[1.1] pb-[0.05em]">
            <motion.span
              custom={i}
              initial="hidden"
              animate="visible"
              variants={word}
              className="inline-block"
            >
              {w}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
