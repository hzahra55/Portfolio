"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks, profile } from "@/data/content";
import { Magnetic } from "@/components/motion/magnetic-button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-[min(96%,1200px)] items-center justify-between rounded-full border border-transparent px-4 py-2 transition-all duration-500 md:px-6",
            scrolled && "border-border bg-background/60 backdrop-blur-xl shadow-glow",
          )}
        >
          {/* Logo */}
          <Link
            href="#hero"
            aria-label={profile.name}
            className="group inline-flex items-center gap-2.5"
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent-1 via-accent-2 to-accent-3 font-display text-sm font-bold text-white shadow-glow">
              HZ
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-1 via-accent-2 to-accent-3 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60" />
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight md:inline">
              {profile.firstName}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                    <span className="absolute inset-x-4 bottom-1 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent-3 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: resume CTA + mobile menu trigger */}
          <div className="flex items-center gap-2">
            <Magnetic strength={0.2} className="hidden md:inline-block">
              <Button
                asChild
                size="sm"
                variant="primary"
                className="rounded-full"
              >
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium"
                >
                  Resume
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-glass transition hover:bg-surface-glass-hi md:hidden"
            >
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-dots opacity-40" />
            </div>
            <nav className="relative flex min-h-screen flex-col items-center justify-center gap-2 px-6">
              <ul className="flex flex-col items-center gap-2">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.5 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block px-6 py-3 font-display text-3xl font-semibold tracking-tight text-foreground transition hover:text-gradient"
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-6"
                >
                  <Button asChild variant="primary" size="lg">
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setOpen(false)}
                    >
                      Resume
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
