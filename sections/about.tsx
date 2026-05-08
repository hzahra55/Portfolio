import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { GlassCard } from "@/components/primitives/glass-card";
import { PortraitTile } from "@/components/portrait-tile";
import { SocialLinks } from "@/components/social-links";
import { profile, stats } from "@/data/content";
import { ScrollReveal, RevealItem } from "@/components/motion/scroll-reveal";

export function About() {
  return (
    <Section id="about" className="relative">
      <Container>
        <SectionHeader
          eyebrow="About"
          title="Building intelligent systems with intent."
          description="A snapshot of who I am, what I'm chasing, and how I show up to the work."
        />

        <div className="mt-12 grid gap-8 sm:mt-16 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Portrait + socials */}
          <ScrollReveal className="flex flex-col items-center gap-6 sm:items-start lg:col-span-4">
            <PortraitTile />
            <RevealItem className="w-full">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Find me on
              </p>
              <SocialLinks className="mt-3" />
            </RevealItem>
          </ScrollReveal>

          {/* Bio + stats */}
          <ScrollReveal
            className="flex flex-col gap-6 sm:gap-8 lg:col-span-8"
            staggerChildren={0.08}
          >
            <RevealItem>
              <GlassCard interactive={false} className="p-6 sm:p-8 md:p-10">
                <p className="text-base leading-relaxed text-foreground/90 sm:text-lg md:text-xl">
                  {profile.bio}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Reach me
                  </div>
                  <a
                    href={`mailto:${profile.email}`}
                    className="group inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface-glass px-4 py-1.5 text-sm transition hover:border-accent-3/40 hover:bg-surface-glass-hi"
                  >
                    <span className="h-1.5 w-1.5 flex-none rounded-full bg-accent-3 shadow-[0_0_8px_var(--accent-3)]" />
                    <span className="truncate font-mono text-xs">{profile.email}</span>
                  </a>
                </div>
              </GlassCard>
            </RevealItem>

            <RevealItem className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((s) => (
                <GlassCard
                  key={s.label}
                  interactive={false}
                  className="p-4 sm:p-5"
                >
                  <div className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    <span className="text-gradient">{s.value}</span>
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                    {s.label}
                  </div>
                </GlassCard>
              ))}
            </RevealItem>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
