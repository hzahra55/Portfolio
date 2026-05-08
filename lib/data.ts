/**
 * Smart data layer.
 *
 * - When DATABASE_URL is set, queries Postgres via Prisma.
 * - Otherwise, returns the typed static content from data/content.ts.
 *
 * Components consume the same async API regardless of source, so empty env
 * vars never break the site.
 */

import {
  projects as staticProjects,
  experience as staticExperience,
  skills as staticSkills,
  education as staticEducation,
  type Project,
  type Experience,
  type Skill,
  type Education,
  type SkillCategory,
} from "@/data/content";

const useDB = Boolean(process.env.DATABASE_URL);

async function safePrisma() {
  if (!useDB) return null;
  try {
    const { prisma } = await import("./prisma");
    return prisma;
  } catch (err) {
    console.warn("[data] Prisma unavailable, falling back to static:", err);
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  const db = await safePrisma();
  if (db) {
    try {
      const rows = await db.project.findMany({ orderBy: { order: "asc" } });
      if (rows.length > 0) {
        return rows.map((r) => ({
          slug: r.slug,
          name: r.name,
          description: r.description,
          techStack: r.techStack,
          githubUrl: r.githubUrl,
          demoUrl: r.demoUrl,
          imageUrl: r.imageUrl,
          category: (r.category as Project["category"]) ?? "other",
          featured: r.featured,
          startedAt: r.startedAt,
          order: r.order,
        }));
      }
    } catch (err) {
      console.warn("[data] getProjects DB failed:", err);
    }
  }
  return staticProjects;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.featured);
}

export async function getExperience(): Promise<Experience[]> {
  const db = await safePrisma();
  if (db) {
    try {
      const rows = await db.experience.findMany({ orderBy: { order: "asc" } });
      if (rows.length > 0) {
        return rows.map((r) => ({
          company: r.company,
          role: r.role,
          startDate: r.startDate,
          endDate: r.endDate,
          bullets: r.bullets,
          logoUrl: r.logoUrl,
          order: r.order,
        }));
      }
    } catch (err) {
      console.warn("[data] getExperience DB failed:", err);
    }
  }
  return staticExperience;
}

export async function getSkills(): Promise<Skill[]> {
  const db = await safePrisma();
  if (db) {
    try {
      const rows = await db.skill.findMany({
        orderBy: [{ category: "asc" }, { order: "asc" }],
      });
      if (rows.length > 0) {
        return rows.map((r) => ({
          name: r.name,
          category: (r.category as SkillCategory) ?? "other",
          order: r.order,
        }));
      }
    } catch (err) {
      console.warn("[data] getSkills DB failed:", err);
    }
  }
  return staticSkills;
}

export async function getEducation(): Promise<Education[]> {
  const db = await safePrisma();
  if (db) {
    try {
      const rows = await db.education.findMany({ orderBy: { order: "asc" } });
      if (rows.length > 0) {
        return rows.map((r) => ({
          institution: r.institution,
          degree: r.degree,
          startDate: r.startDate,
          endDate: r.endDate,
          details: r.details,
          logoUrl: r.logoUrl,
          order: r.order,
        }));
      }
    } catch (err) {
      console.warn("[data] getEducation DB failed:", err);
    }
  }
  return staticEducation;
}

export async function saveContactMessage(input: {
  name: string;
  email: string;
  message: string;
}) {
  const db = await safePrisma();
  if (!db) return false;
  try {
    await db.contactMessage.create({ data: input });
    return true;
  } catch (err) {
    console.warn("[data] saveContactMessage failed:", err);
    return false;
  }
}
