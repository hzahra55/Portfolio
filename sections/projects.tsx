"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import { stagger } from "@/lib/motion";
import type { Project } from "@/data/content";
import { cn } from "@/lib/utils";

type Filter = "all" | "ml" | "web" | "other";
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ml", label: "ML / AI" },
  { id: "web", label: "Web" },
  { id: "other", label: "Other" },
];

// Bento spans rotate so the grid never feels uniform.
const BENTO_SPANS = [
  "md:col-span-2 lg:col-span-7",
  "md:col-span-1 lg:col-span-5",
  "md:col-span-1 lg:col-span-5",
  "md:col-span-2 lg:col-span-7",
  "md:col-span-2 lg:col-span-7",
  "md:col-span-1 lg:col-span-5",
  "md:col-span-1 lg:col-span-4",
  "md:col-span-1 lg:col-span-4",
  "md:col-span-1 lg:col-span-4",
];

export function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () =>
      projects
        .filter((p) => filter === "all" || p.category === filter)
        .sort((a, b) => {
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          return a.order - b.order;
        }),
    [projects, filter],
  );

  const handleOpen = (p: Project) => {
    setActive(p);
    setOpen(true);
  };

  return (
    <Section id="projects" className="relative">
      <Container>
        <SectionHeader
          eyebrow="Selected work"
          title="Projects I've shipped & explored."
          description="A mix of research-flavored ML, end-to-end web builds, and the playful experiments in between."
        />

        {/* Filter pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2 sm:mt-10">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-xs font-medium transition-all sm:px-5 sm:py-2 sm:text-sm",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full border border-accent-1/40 bg-accent-1/10 shadow-glow"
                    />
                  )}
                  <span className="relative">{f.label}</span>
                </button>
              );
            })}
          </div>
          <span className="ml-auto font-mono text-[11px] text-muted-foreground sm:text-xs">
            {String(filtered.length).padStart(2, "0")} project
            {filtered.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Bento grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger(0, 0.08)}
          className="mt-8 grid auto-rows-[minmax(240px,_auto)] grid-cols-1 gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2 md:auto-rows-[minmax(300px,_auto)] lg:grid-cols-12"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                onOpen={handleOpen}
                span={BENTO_SPANS[i % BENTO_SPANS.length]}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-border bg-surface-glass p-10 text-center text-muted-foreground">
            No projects in this category yet — check back soon.
          </div>
        )}
      </Container>

      <ProjectModal project={active} open={open} onOpenChange={setOpen} />
    </Section>
  );
}
