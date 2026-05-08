"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Subtle radial light that tracks the cursor on desktop.
 * Hidden on touch devices and when prefers-reduced-motion is set.
 */
export function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isTouch) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
        el.style.opacity = "1";
      });
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [prefersReducedMotion, isTouch]);

  if (prefersReducedMotion || isTouch) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[2] h-[400px] w-[400px] rounded-full opacity-0 transition-opacity duration-500 will-change-transform mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, oklch(0.65 0.25 280 / 0.18) 0%, transparent 60%)",
      }}
    />
  );
}
