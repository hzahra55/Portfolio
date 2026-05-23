"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type GlassCardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  glow?: boolean;
  interactive?: boolean;
  children?: React.ReactNode;
};

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow, interactive = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={interactive ? { y: -4 } : undefined}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "group relative overflow-hidden rounded-2xl glass",
          interactive && "glass-hover transition-colors",
          glow && "shadow-glow",
          className,
        )}
        {...props}
      >
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        {children}
      </motion.div>
    );
  },
);
GlassCard.displayName = "GlassCard";
