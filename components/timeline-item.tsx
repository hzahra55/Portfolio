"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/primitives/glass-card";
import { fadeUp } from "@/lib/motion";
import { formatDateRange, isPresent } from "@/lib/utils";

interface TimelineItemProps {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  bullets: string[];
}

export function TimelineItem({
  company,
  role,
  startDate,
  endDate,
  bullets,
}: TimelineItemProps) {
  const present = isPresent(endDate);

  return (
    <motion.li variants={fadeUp} className="relative grid gap-4 md:grid-cols-12">
      {/* Date column */}
      <div className="md:col-span-3">
        <div className="sticky top-28 flex items-center gap-3 md:flex-col md:items-start">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-2.5 w-2.5">
              {present && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-3 opacity-75" />
              )}
              <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${present ? "bg-accent-3 shadow-[0_0_10px_var(--accent-3)]" : "bg-muted-foreground"}`} />
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {formatDateRange(startDate, endDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Content card */}
      <div className="md:col-span-9">
        <GlassCard className="p-6 md:p-8" interactive>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                {role}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                <span className="text-foreground/80">{company}</span>
              </p>
            </div>
            {present && (
              <span className="rounded-full border border-accent-3/30 bg-accent-3/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-3">
                Current
              </span>
            )}
          </div>
          <ul className="mt-5 space-y-2.5">
            {bullets.map((b, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm leading-relaxed text-foreground/80"
              >
                <span className="mt-2 inline-block h-1 w-1 flex-none rounded-full bg-accent-1" />
                {b}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </motion.li>
  );
}
