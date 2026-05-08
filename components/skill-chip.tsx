"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export function SkillChip({ name, index = 0 }: { name: string; index?: number }) {
  return (
    <motion.li
      variants={fadeUp}
      whileHover={{ y: -2, scale: 1.04 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group relative inline-flex cursor-default select-none items-center gap-2 rounded-full border border-border bg-surface-glass px-3.5 py-1.5 text-sm transition-colors hover:border-accent-3/40 hover:bg-surface-glass-hi"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent-3/70 transition group-hover:bg-accent-3 group-hover:shadow-[0_0_8px_var(--accent-3)]" />
      <span className="text-foreground/85 transition group-hover:text-foreground">{name}</span>
    </motion.li>
  );
}
