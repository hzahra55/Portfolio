"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  staggerChildren?: number;
  className?: string;
  variants?: Variants;
  amount?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  delay = 0,
  staggerChildren,
  className,
  variants,
  amount = 0.2,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={
        variants ??
        (staggerChildren !== undefined ? stagger(delay, staggerChildren) : fadeUp)
      }
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  variants,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div variants={variants ?? fadeUp} className={className}>
      {children}
    </motion.div>
  );
}
