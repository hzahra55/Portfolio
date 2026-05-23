"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, stagger } from "@/lib/motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger(0, 0.08)}
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto text-center items-center",
        className,
      )}
    >
      {eyebrow && (
        <motion.div variants={fadeUp}>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-glass px-3 py-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-3 shadow-[0_0_8px_var(--accent-3)]" />
            {eyebrow}
          </div>
        </motion.div>
      )}
      <motion.h2
        variants={fadeUp}
        className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
