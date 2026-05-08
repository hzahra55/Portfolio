/**
 * Seed script — populates the database with content from data/content.ts.
 *
 * Run when DATABASE_URL is configured:
 *   npm run db:push   # apply schema
 *   npm run db:seed   # populate
 */

import { PrismaClient } from "@prisma/client";
import {
  projects,
  experience,
  skills,
  education,
} from "../data/content";

const prisma = new PrismaClient();

async function main() {
  console.log("→ clearing existing rows");
  await prisma.contactMessage.deleteMany();
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.education.deleteMany();

  console.log(`→ seeding ${projects.length} projects`);
  for (const p of projects) {
    await prisma.project.create({
      data: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        techStack: p.techStack,
        githubUrl: p.githubUrl,
        demoUrl: p.demoUrl,
        imageUrl: p.imageUrl,
        category: p.category,
        featured: p.featured,
        startedAt: p.startedAt,
        order: p.order,
      },
    });
  }

  console.log(`→ seeding ${experience.length} experience entries`);
  for (const e of experience) {
    await prisma.experience.create({
      data: {
        company: e.company,
        role: e.role,
        startDate: e.startDate,
        endDate: e.endDate,
        bullets: e.bullets,
        logoUrl: e.logoUrl,
        order: e.order,
      },
    });
  }

  console.log(`→ seeding ${skills.length} skills`);
  for (const s of skills) {
    await prisma.skill.create({
      data: {
        name: s.name,
        category: s.category,
        order: s.order,
      },
    });
  }

  console.log(`→ seeding ${education.length} education entries`);
  for (const ed of education) {
    await prisma.education.create({
      data: {
        institution: ed.institution,
        degree: ed.degree,
        startDate: ed.startDate,
        endDate: ed.endDate,
        details: ed.details,
        logoUrl: ed.logoUrl,
        order: ed.order,
      },
    });
  }

  console.log("✓ seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
