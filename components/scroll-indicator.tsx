"use client";

import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground md:flex"
      aria-hidden
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
        Scroll
      </span>
      <div className="relative h-10 w-px overflow-hidden">
        <motion.span
          className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-accent-3 to-transparent"
          animate={{ y: [-12, 40] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="absolute inset-0 bg-border" />
      </div>
    </motion.div>
  );
}
