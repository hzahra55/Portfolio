"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/content";

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {project.startedAt && <span>{project.startedAt}</span>}
            {project.featured && (
              <>
                <span>·</span>
                <Badge variant="accent" className="text-[10px]">
                  Featured
                </Badge>
              </>
            )}
          </div>
          <DialogTitle className="text-gradient">{project.name}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Tech stack
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.techStack.map((t) => (
              <Badge key={t} variant="default">
                {t}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {project.githubUrl && (
            <Button asChild variant="outline">
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                View source
              </a>
            </Button>
          )}
          {project.demoUrl && (
            <Button asChild variant="primary">
              <a href={project.demoUrl} target="_blank" rel="noreferrer">
                Live demo
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
