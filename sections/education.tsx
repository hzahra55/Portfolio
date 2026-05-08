import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { GlassCard } from "@/components/primitives/glass-card";
import { ScrollReveal, RevealItem } from "@/components/motion/scroll-reveal";
import { GraduationCap } from "lucide-react";
import { formatDateRange } from "@/lib/utils";
import type { Education as EducationType } from "@/data/content";

export function Education({ education }: { education: EducationType[] }) {
  return (
    <Section id="education" className="relative">
      <Container>
        <SectionHeader
          eyebrow="Education"
          title="Academic foundation."
        />

        <ScrollReveal className="mt-12 grid gap-4" staggerChildren={0.08}>
          {education.map((e) => (
            <RevealItem key={e.institution}>
              <GlassCard className="p-7 md:p-8" interactive>
                <div className="flex flex-wrap items-start gap-5">
                  <div className="grid h-14 w-14 flex-none place-items-center rounded-2xl border border-accent-1/30 bg-accent-1/5 text-accent-1 shadow-[inset_0_0_24px_rgba(124,58,237,0.15)]">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {formatDateRange(e.startDate, e.endDate)}
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight md:text-2xl">
                      {e.degree}
                    </h3>
                    <p className="mt-1 text-sm text-foreground/80">
                      {e.institution}
                    </p>
                    {e.details && (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-glass px-3 py-1 font-mono text-xs text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-3" />
                        {e.details}
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </RevealItem>
          ))}
        </ScrollReveal>
      </Container>
    </Section>
  );
}
