"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic-button";
import { AuroraBackground } from "@/components/motion/aurora-background";
import { AnimatedHeadline } from "@/components/motion/animated-headline";
import { StatusPill } from "@/components/status-pill";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { profile, stats } from "@/data/content";
import { easeOutExpo } from "@/lib/motion";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 sm:pt-28 md:pt-24"
    >
      <AuroraBackground intensity="default" />

      <div className="absolute inset-0 bg-dots opacity-30" />

      <Container className="relative">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12">
          <div className="flex flex-col justify-center gap-5 sm:gap-6 lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              {profile.available && <StatusPill label="Open to opportunities" />}
            </motion.div>

            <AnimatedHeadline
              as="h1"
              className="break-words text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8rem]"
            >
              {profile.name}
            </AnimatedHeadline>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.6 }}
              className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-4 sm:gap-y-2"
            >
              <span className="font-display text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl">
                <span className="text-gradient-anim">{profile.titles[0]}</span>
              </span>
              <span className="font-mono text-[11px] text-muted-foreground sm:text-xs">
                <span className="hidden sm:inline">/ </span>
                {profile.location}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.75 }}
              className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.9 }}
              className="flex flex-col gap-3 pt-2 xs:flex-row xs:flex-wrap xs:items-center sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Magnetic strength={0.3} className="w-full sm:w-auto">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <a href="#projects">
                    View work
                    <ArrowDown className="h-4 w-4" />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.3} className="w-full sm:w-auto">
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <a href="#contact">
                    Get in touch
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Stat cluster — desktop sidebar on lg+, horizontal scroll-row on mobile/tablet */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.9 }}
            className="lg:col-span-3"
          >
            {/* Desktop: vertical stack */}
            <div className="hidden flex-col gap-3 lg:flex lg:justify-center lg:h-full">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass glass-hover rounded-2xl p-5 transition-colors"
                >
                  <div className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                    <span className="text-gradient">{s.value}</span>
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            {/* Mobile/tablet: 2-col grid */}
            <div className="grid grid-cols-2 gap-3 lg:hidden">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-2xl p-4 sm:p-5"
                >
                  <div className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    <span className="text-gradient">{s.value}</span>
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>

      <ScrollIndicator />
    </section>
  );
}
