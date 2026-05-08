"use client";

import { cn } from "@/lib/utils";

/**
 * Decorative animated aurora gradient. Pure CSS — no JS animation cost.
 * Disabled visually via the global prefers-reduced-motion stylesheet rule
 * in app/globals.css.
 */
export function AuroraBackground({
  className,
  intensity = "default",
}: {
  className?: string;
  intensity?: "subtle" | "default" | "intense";
}) {
  const opacity =
    intensity === "subtle" ? 0.45 : intensity === "intense" ? 0.85 : 0.65;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* Top-left orb */}
      <div
        className="absolute -top-40 -left-32 h-[40rem] w-[40rem] rounded-full blur-[120px] animate-aurora-drift"
        style={{
          background:
            "radial-gradient(circle, var(--aurora-1) 0%, transparent 70%)",
          opacity,
        }}
      />
      {/* Top-right orb */}
      <div
        className="absolute -top-20 right-0 h-[36rem] w-[36rem] rounded-full blur-[120px] animate-aurora-drift"
        style={{
          background:
            "radial-gradient(circle, var(--aurora-2) 0%, transparent 70%)",
          opacity: opacity * 0.85,
          animationDelay: "-7s",
        }}
      />
      {/* Bottom-center orb */}
      <div
        className="absolute -bottom-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-[120px] animate-aurora-drift"
        style={{
          background:
            "radial-gradient(circle, var(--aurora-3) 0%, transparent 70%)",
          opacity: opacity * 0.7,
          animationDelay: "-14s",
        }}
      />
      {/* Subtle vignette to keep content legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
    </div>
  );
}
