import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { TimelineItem } from "@/components/timeline-item";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import type { Experience as ExperienceType } from "@/data/content";

export function Experience({ experience }: { experience: ExperienceType[] }) {
  return (
    <Section id="experience" className="relative">
      <Container>
        <SectionHeader
          eyebrow="Career"
          title="Where I've been building."
          description="Internships and engineering roles I've taken on while studying."
        />

        <ScrollReveal staggerChildren={0.08} className="mt-16">
          <ol className="relative space-y-10">
            {/* Vertical timeline line on md+ */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-[calc(25%-1px)] top-2 bottom-2 hidden w-px bg-gradient-to-b from-accent-1/30 via-border to-transparent md:block"
            />
            {experience.map((e) => (
              <TimelineItem
                key={`${e.company}-${e.startDate}`}
                company={e.company}
                role={e.role}
                startDate={e.startDate}
                endDate={e.endDate}
                bullets={e.bullets}
              />
            ))}
          </ol>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
