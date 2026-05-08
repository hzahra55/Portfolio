import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { GlassCard } from "@/components/primitives/glass-card";
import { SkillChip } from "@/components/skill-chip";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { skillCategoryLabels, type Skill, type SkillCategory } from "@/data/content";

const categoryOrder: SkillCategory[] = ["ml", "web", "viz", "devops", "lang", "other"];

const categoryDescriptions: Record<SkillCategory, string> = {
  ml: "Models, frameworks & inference stacks I reach for first.",
  web: "Backends, frontends & the tooling between them.",
  viz: "Numerical, statistical, and visualization workhorses.",
  devops: "Container, version-control & environment essentials.",
  lang: "Programming languages I'm fluent in.",
  other: "Everything else worth mentioning.",
};

export function Skills({ skills }: { skills: Skill[] }) {
  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      label: skillCategoryLabels[cat],
      description: categoryDescriptions[cat],
      items: skills.filter((s) => s.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <Section id="skills" className="relative">
      <Container>
        <SectionHeader
          eyebrow="Toolbelt"
          title="The stack I build with."
          description="Tools I've shipped real work in — grouped by where they live in the pipeline."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {grouped.map((g, idx) => {
            // Bento sizing: alternate to create visual rhythm
            const span =
              idx === 0 ? "lg:col-span-7" :
              idx === 1 ? "lg:col-span-5" :
              idx === 2 ? "lg:col-span-5" :
              idx === 3 ? "lg:col-span-4" :
              idx === 4 ? "lg:col-span-3" :
              "lg:col-span-12";
            return (
              <ScrollReveal key={g.category} className={span} staggerChildren={0.04}>
                <GlassCard className="h-full p-7 md:p-8" interactive>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-accent-1 shadow-[0_0_12px_var(--accent-1)]" />
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      {g.label}
                    </h3>
                    <span className="ml-auto font-mono text-xs text-muted-foreground">
                      {String(g.items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {g.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {g.items.map((s, i) => (
                      <SkillChip key={s.name} name={s.name} index={i} />
                    ))}
                  </ul>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
