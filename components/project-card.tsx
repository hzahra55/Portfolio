"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/primitives/glass-card";
import { fadeUp, easeOutExpo } from "@/lib/motion";
import type { Project } from "@/data/content";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  span?: string;
}

const categoryAccent: Record<Project["category"], string> = {
  ml: "from-accent-1/20 via-accent-2/10 to-transparent",
  web: "from-accent-3/20 via-accent-1/10 to-transparent",
  other: "from-accent-2/20 via-accent-3/10 to-transparent",
};

export function ProjectCard({ project, onOpen, span }: ProjectCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      layout="position"
      transition={{ duration: 0.5, ease: easeOutExpo }}
      className={span}
    >
      <GlassCard className="group relative h-full overflow-hidden">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="flex h-full w-full flex-col p-7 text-left md:p-8"
          aria-label={`Open details for ${project.name}`}
        >
          {/* Decorative accent gradient */}
          <div
            className={`pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-gradient-to-br ${categoryAccent[project.category]} blur-3xl transition-opacity duration-500 opacity-50 group-hover:opacity-100`}
          />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {project.startedAt && <span>{project.startedAt}</span>}
              {project.featured && (
                <Badge variant="accent" className="text-[10px]">
                  Featured
                </Badge>
              )}
            </div>
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full border border-border bg-surface-glass transition-all group-hover:border-accent-3/50 group-hover:bg-surface-glass-hi group-hover:rotate-[-12deg] group-hover:shadow-glow">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>

          <h3 className="relative mt-6 font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
            {project.name}
          </h3>

          <p className="relative mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.description}
          </p>

          <div className="relative mt-auto pt-6">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="inline-block rounded-full border border-border bg-surface-glass px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  {t}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="inline-block rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          </div>
        </button>

        {/* External link buttons (overlaid, click-through) */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${project.name} on GitHub`}
            className="absolute bottom-5 right-5 z-10 grid h-9 w-9 place-items-center rounded-full border border-border bg-surface-glass text-muted-foreground opacity-0 transition-all hover:border-accent-3/50 hover:text-foreground group-hover:opacity-100"
          >
            <Github className="h-4 w-4" />
          </a>
        )}
      </GlassCard>
    </motion.div>
  );
}
