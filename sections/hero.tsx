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
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 md:pt-24"
    >
      <AuroraBackground intensity="default" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-dots opacity-30" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col justify-center gap-6 lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              {profile.available && <StatusPill label="Open to opportunities" />}
            </motion.div>

            <AnimatedHeadline
              as="h1"
              className="text-[12vw] font-semibold leading-[0.95] tracking-tight sm:text-[10vw] md:text-[8vw] lg:text-[7rem] xl:text-[8rem]"
            >
              {profile.name}
            </AnimatedHeadline>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.6 }}
              className="flex flex-wrap items-baseline gap-x-4 gap-y-2"
            >
              <span className="font-display text-3xl font-medium tracking-tight md:text-4xl">
                <span className="text-gradient-anim">{profile.titles[0]}</span>
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                / {profile.location}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.75 }}
              className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.9 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Magnetic strength={0.3}>
                <Button asChild variant="primary" size="lg">
                  <a href="#projects">
                    View work
                    <ArrowDown className="h-4 w-4" />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Button asChild variant="outline" size="lg">
                  <a href="#contact">
                    Get in touch
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right: stat cluster (hidden on small) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.9 }}
            className="hidden flex-col gap-3 lg:col-span-3 lg:flex lg:justify-center"
          >
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
          </motion.div>
        </div>
      </Container>

      <ScrollIndicator />
    </section>
  );
}
