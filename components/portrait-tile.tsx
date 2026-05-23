"use client";

import { motion } from "framer-motion";

/**
 * Stylized geometric portrait placeholder. Used when no profile photo is
 * supplied — a layered, animated tile of brand-tinted shapes that reads
 * as a "designed" portrait rather than an empty avatar.
 */
export function PortraitTile() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl glass"
    >
      {/* Concentric arcs */}
      <svg
        viewBox="0 0 320 320"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <radialGradient id="rg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.65 0.25 280)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.65 0.25 280)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.65 0.25 280)" />
            <stop offset="50%" stopColor="oklch(0.68 0.27 310)" />
            <stop offset="100%" stopColor="oklch(0.78 0.18 200)" />
          </linearGradient>
        </defs>

        <circle cx="160" cy="160" r="160" fill="url(#rg)" />

        {/* Concentric rings */}
        {[140, 110, 80, 50].map((r) => (
          <circle
            key={r}
            cx="160"
            cy="160"
            r={r}
            fill="none"
            stroke="oklch(1 0 0 / 0.06)"
            strokeWidth="1"
          />
        ))}

        {/* Orbiting accent dots */}
        <g>
          <circle cx="300" cy="160" r="4" fill="url(#lg)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 160 160"
              to="360 160 160"
              dur="14s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
        <g>
          <circle cx="20" cy="160" r="3" fill="oklch(0.78 0.18 200)" opacity="0.7">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="180 160 160"
              to="-180 160 160"
              dur="22s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Initials */}
        <text
          x="160"
          y="178"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontSize="80"
          fontWeight="700"
          fill="url(#lg)"
        >
          HZ
        </text>
      </svg>

      {/* Top hairline */}
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </motion.div>
  );
}
