/**
 * Generates a styled PDF resume from the content in data/content.ts.
 *
 * Run:   npm run generate:resume
 * Output: public/huda-zahra-resume.pdf
 *
 * This is a placeholder generator — when the owner supplies a designer
 * resume, replace public/huda-zahra-resume.pdf with that file and this
 * script becomes optional. The resumeUrl in data/content.ts already
 * points at the local path.
 */

import path from "node:path";
import fs from "node:fs";
import PDFDocument from "pdfkit";
import {
  profile,
  experience,
  education,
  skills,
  socials,
  skillCategoryLabels,
  type SkillCategory,
} from "../data/content";

const OUT_PATH = path.join(process.cwd(), "public", "huda-zahra-resume.pdf");
fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });

const ACCENT = "#7c3aed"; // matches --accent-1 in oklch ≈ this hex
const MUTED = "#6b7280";
const FG = "#111827";

const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: 56, bottom: 56, left: 56, right: 56 },
  info: {
    Title: `${profile.name} — Resume`,
    Author: profile.name,
    Subject: profile.titles[0],
    Keywords: "resume, machine learning, AI, portfolio",
  },
});

doc.pipe(fs.createWriteStream(OUT_PATH));

// ─────────────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────────────
doc
  .font("Helvetica-Bold")
  .fontSize(28)
  .fillColor(FG)
  .text(profile.name, { align: "left" });

doc
  .moveDown(0.15)
  .font("Helvetica")
  .fontSize(13)
  .fillColor(ACCENT)
  .text(profile.titles[0]);

doc
  .moveDown(0.4)
  .font("Helvetica")
  .fontSize(10)
  .fillColor(MUTED)
  .text(`${profile.email}   ·   ${profile.location}`, { continued: false });

const linkLine = socials
  .filter((s) => ["github", "linkedin", "huggingface"].includes(s.name))
  .map((s) => `${s.label}: ${s.url.replace(/^https?:\/\//, "")}`)
  .join("   ·   ");
doc.moveDown(0.15).text(linkLine);

// Divider
doc
  .moveDown(0.7)
  .strokeColor(ACCENT)
  .lineWidth(0.8)
  .moveTo(doc.page.margins.left, doc.y)
  .lineTo(doc.page.width - doc.page.margins.right, doc.y)
  .stroke();

// ─────────────────────────────────────────────────────────────────────
// Summary
// ─────────────────────────────────────────────────────────────────────
section("Summary");
doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor(FG)
  .text(profile.bio, { align: "left", lineGap: 2 });

// ─────────────────────────────────────────────────────────────────────
// Experience
// ─────────────────────────────────────────────────────────────────────
section("Experience");
for (const e of experience) {
  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(FG)
    .text(`${e.role} · ${e.company}`, { continued: true })
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(MUTED)
    .text(`   ${e.startDate} — ${e.endDate ?? "Present"}`, { align: "left" });

  doc.moveDown(0.2);
  for (const b of e.bullets) {
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(FG)
      .text(`•  ${b}`, {
        indent: 12,
        lineGap: 1.5,
      });
  }
  doc.moveDown(0.4);
}

// ─────────────────────────────────────────────────────────────────────
// Skills (grouped)
// ─────────────────────────────────────────────────────────────────────
section("Skills");
const ORDER: SkillCategory[] = ["ml", "web", "viz", "devops", "lang", "other"];
for (const cat of ORDER) {
  const items = skills.filter((s) => s.category === cat);
  if (items.length === 0) continue;
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(ACCENT)
    .text(`${skillCategoryLabels[cat]}:  `, { continued: true })
    .font("Helvetica")
    .fillColor(FG)
    .text(items.map((s) => s.name).join(", "), { lineGap: 2 });
  doc.moveDown(0.15);
}

// ─────────────────────────────────────────────────────────────────────
// Education
// ─────────────────────────────────────────────────────────────────────
section("Education");
for (const ed of education) {
  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(FG)
    .text(ed.degree);
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(MUTED)
    .text(
      `${ed.institution}   ·   ${ed.startDate} — ${ed.endDate ?? "Present"}${
        ed.details ? `   ·   ${ed.details}` : ""
      }`,
      { lineGap: 2 },
    );
  doc.moveDown(0.3);
}

// ─────────────────────────────────────────────────────────────────────
// Footer note
// ─────────────────────────────────────────────────────────────────────
doc
  .moveDown(1)
  .fontSize(8)
  .fillColor(MUTED)
  .text(
    "Auto-generated placeholder · regenerate with `npm run generate:resume` · replace with a designer-laid-out PDF anytime",
    { align: "center" },
  );

doc.end();

doc.on("end", () => {
  // pdfkit's "end" fires after the stream is drained; fs.createWriteStream
  // emits "finish" when the file is fully written. Either is fine for logging.
  console.log(`✓ wrote ${path.relative(process.cwd(), OUT_PATH)}`);
});

function section(title: string) {
  doc
    .moveDown(0.6)
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(ACCENT)
    .text(title.toUpperCase(), { characterSpacing: 1.5 })
    .moveDown(0.3);
}
