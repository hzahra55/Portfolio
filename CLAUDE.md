# CLAUDE.md — Portfolio Revamp Brief

This file is the implementation brief for the futuristic portfolio rebuild. Read it end-to-end before writing any code. It captures the goal, decisions already made, content to preserve, design system, scope, and open questions.

---

## 1. Mission

Rebuild the existing Vite + React portfolio at this repo into a **modern, futuristic, premium developer/designer portfolio**. Target aesthetic: a blend of **Linear, Vercel, Raycast, Framer, Apple, and modern AI-startup landing pages**. Dark theme. Heavy but tasteful motion. Production-grade architecture.

The rebuild is **from scratch on a feature branch**, not an incremental refactor. The current site's *written* content is preserved; existing images/screenshots are discarded (most are low-fidelity or not on-brand).

---

## 2. Owner Profile

- **Name:** Huda Zahra
- **Role:** Machine Learning Engineer / Software Engineering student at NUST
- **Bio (verbatim, to reuse):**
  > "I'm Huda Zahra — a Machine Learning enthusiast and student at NUST, passionate about exploring new ideas and turning them into real-world projects. I love diving deep into AI, learning continuously, and pushing my boundaries. I'm always excited to collaborate, grow, and create things that make a meaningful impact."
- **Email:** hudazahrabangash@gmail.com
- **Socials:** LinkedIn (`hudazahraa`), GitHub (`hzahra55`), Medium (`@hudazahrabangash`), HuggingFace (`huda55`), LeetCode (`hudazahra`)
- **Resume:** Google Drive link (ID `12MB2cOw5MHDfYWO6AfDIi5UKiVMvdp7a`) — keep as external download for now.

---

## 3. Tech Stack (locked)

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js (latest, App Router)** | Server Components by default, Server Actions for mutations |
| Language | **TypeScript** (strict) | |
| Styling | **Tailwind CSS** + **shadcn/ui** | shadcn components copied in, not imported |
| Motion | **Framer Motion** (primary), **Lenis** (smooth scroll) | GSAP only if a specific effect demands it |
| Forms | **React Hook Form** + **Zod** | |
| Icons | **Lucide** | |
| Database | **PostgreSQL via Neon** + **Prisma** | Owner provisions Neon manually via Vercel integration |
| Image hosting | **Cloudinary** | `next-cloudinary` for optimized delivery |
| Email (contact form) | **Nodemailer over SMTP** | Credentials via env vars |
| Deployment | **Vercel** | Owner handles deploy + env vars |
| Auth | **NONE in v1** — see §4 | |

### Typography
- Primary: **Geist Sans** + **Geist Mono** (free via `next/font`)
- Display accent: **Space Grotesk** for hero/section headlines
- Fallback: Inter

### Optional libs (add only if a feature needs it)
- Zustand — only if a piece of UI state crosses 3+ components
- Motion One — skip; Framer Motion covers the use cases
- GSAP — skip unless a scroll-pinned hero effect demands it

---

## 4. Auth & Admin Decision

**Recommendation: skip Clerk and skip the admin CRUD UI for v1.**

Reasoning:
- This is a personal portfolio with **one admin** (the owner). Building a full authed CRUD dashboard adds Clerk + protected routes + upload pipeline + form UIs for marginal benefit.
- Portfolio content changes rarely (a new project every few weeks at most). Editing JSON or running `prisma studio` locally is faster than logging into a dashboard.
- Clerk's value (social auth, multi-user sessions, org management) doesn't apply here.

**v1 content management approach:**
- All content lives in the Postgres DB via Prisma models.
- Owner edits content by running `npx prisma studio` locally against the Neon DB, or by editing a `prisma/seed.ts` file and re-running the seed.
- Cloudinary uploads are done manually via the Cloudinary dashboard; resulting URLs are pasted into the DB.

**If owner later wants a UI**, add it as v2:
- Single `/admin` route protected by a single env var password using `iron-session` (one dependency, no third-party service).
- Only add Clerk if multiple admins or social login is needed — currently neither is.

**Action for v1:** Do not install `@clerk/nextjs`. Do not build `/admin` routes. The implementer should flag this section to the owner before starting and confirm.

---

## 5. Content to Preserve

Authoritative source: [`src/assets/resume.json`](src/assets/resume.json) on the **current `main` branch** (pre-revamp). Migrate the following into Prisma models — do **not** copy images.

### 5.1 Skills (~37 items)
Categorized into:
- **ML / AI:** Hugging Face, LangChain, PyTorch, TensorFlow, Keras, Scikit-Learn, Pandas, NumPy
- **Web:** React, Node, Express, FastAPI, Flask
- **DevOps:** Docker
- **Data Viz:** Matplotlib, Seaborn
- **Other:** MATLAB, AutoCAD, LaTeX, Assembly

(Pull the full list from `resume.json`; the categories above are the grouping to render.)

### 5.2 Projects (9 entries)
- Silent STT
- EchoChain
- RAG Medico BOT
- SpeechSmart
- Gesture Control
- HEP Segmentation
- GitHub Repos Scraper
- Library Management System
- RL-robo

For each, preserve: **name, description, tech stack, GitHub URL, date**. Drop the existing screenshots — they will be regenerated or replaced with on-brand visual treatments (animated thumbnails, code-style cards, or Cloudinary-hosted re-shoots later).

### 5.3 Experience (3 entries)
- **Marketing Lads** — AI Intern, Mar 2024–present
- **Rohde & Schwarz** — Software Engineering Intern, Aug–Sep 2024
- **Washify** — Web Developer, Apr–Jun 2024 *(fix typo "April 202" → "April 2024" during migration)*

### 5.4 Education (1 entry)
- **NUST**, Bachelor of Software Engineering, Nov 2021–May 2025, CGPA 3.52

### 5.5 Things to drop
- All existing logos in `public/assets/education/` and `public/assets/experience/` (use text-only or refined logo treatment)
- All existing project screenshots (regenerate later)
- Existing `profile.png` (owner to supply a higher-quality photo or we skip the photo entirely)

---

## 6. Design System

### 6.1 Color tokens — single source of truth (globally swappable)

**Rule:** All colors live in **one file** — `app/globals.css` — as CSS custom properties under `:root`. Tailwind's `tailwind.config.ts` references these variables (not hex literals), and **no component is allowed to use a raw hex/rgb/hsl color**. Changing the entire site's color scheme = editing this one file.

This makes themes hot-swappable: the owner can paste a new palette into `globals.css` and the whole site retones instantly — no component edits required.

#### File layout

`app/globals.css`:
```css
@layer base {
  :root {
    /* === Brand palette (edit here to retheme the entire site) === */
    --background:        oklch(0.12 0.02 270);   /* deep near-black, hint of indigo */
    --foreground:        oklch(0.97 0.01 270);   /* near-white */
    --muted:             oklch(0.65 0.02 270);   /* secondary text */
    --border:            oklch(1 0 0 / 0.08);    /* hairlines */

    --accent-1:          oklch(0.65 0.25 280);   /* indigo (primary accent) */
    --accent-2:          oklch(0.68 0.27 310);   /* purple */
    --accent-3:          oklch(0.78 0.18 200);   /* cyan */

    --surface:           oklch(0.16 0.02 270);   /* cards, raised surfaces */
    --surface-glass:     oklch(1 0 0 / 0.04);    /* glassmorphic overlay */
    --surface-glass-hi:  oklch(1 0 0 / 0.08);    /* glass on hover */

    --ring:              var(--accent-3);        /* focus ring */
    --danger:            oklch(0.65 0.22 25);
    --success:           oklch(0.72 0.18 150);

    /* === Aurora gradient stops (hero background) === */
    --aurora-1: var(--accent-1);
    --aurora-2: var(--accent-2);
    --aurora-3: var(--accent-3);

    /* === Effects === */
    --glow-accent: 0 0 40px oklch(0.65 0.25 280 / 0.35);
    --grain-opacity: 0.03;
  }
}
```

#### Tailwind wiring (`tailwind.config.ts`)
```ts
theme: {
  extend: {
    colors: {
      background:    "var(--background)",
      foreground:    "var(--foreground)",
      muted:         "var(--muted)",
      border:        "var(--border)",
      surface:       "var(--surface)",
      "surface-glass":    "var(--surface-glass)",
      "surface-glass-hi": "var(--surface-glass-hi)",
      "accent-1":    "var(--accent-1)",
      "accent-2":    "var(--accent-2)",
      "accent-3":    "var(--accent-3)",
      ring:          "var(--ring)",
      danger:        "var(--danger)",
      success:       "var(--success)",
    },
    boxShadow: {
      glow: "var(--glow-accent)",
    },
  },
}
```

#### Usage rules (enforce in code review)
- ✅ `bg-background`, `text-foreground`, `bg-accent-1/20`, `border-border`, `shadow-glow`
- ✅ Inline `style={{ background: "var(--accent-1)" }}` when Tailwind utility doesn't fit
- ❌ `bg-[#0a0a0f]`, `text-indigo-500`, `style={{ color: "#fff" }}` — **never**
- ❌ Importing colors from a TS constants file — tokens live in CSS only, so runtime theme swaps work without rebuilds.

#### Optional: preset themes
If the owner wants multiple named themes (e.g., "indigo", "cyberpunk", "aurora-warm"), add them as scoped overrides in the same file:
```css
[data-theme="cyberpunk"] {
  --accent-1: oklch(0.7 0.3 330);   /* hot pink */
  --accent-2: oklch(0.8 0.2 90);    /* electric yellow */
  --accent-3: oklch(0.7 0.25 200);  /* cyan */
}
```
Set `<html data-theme="cyberpunk">` in `app/layout.tsx` (or via a client toggle). All tokens cascade automatically.

### 6.2 Visual language
- **Glassmorphism** for elevated surfaces (cards, navs) — `bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]`
- **Aurora gradients** behind hero — animated radial gradients in indigo/purple/cyan, low opacity, slow drift
- **Bento grid** for project showcase and skills section — varying card sizes
- **Soft glow** on interactive elements via `box-shadow` with accent colors at low alpha
- **Grain/noise overlay** at ~3% opacity over hero for texture

### 6.3 Motion principles
- Default transition: **200–300ms**, easing `cubic-bezier(0.22, 1, 0.36, 1)` (out-expo feel)
- Scroll reveals: stagger 60ms, y: 16px → 0, opacity 0 → 1
- Page transitions: layout-aware via Framer Motion's `AnimatePresence`
- Magnetic buttons: cursor pulls element ±8px max
- Cursor follower: subtle, optional, **disabled on touch + on `prefers-reduced-motion`**
- **All motion respects `prefers-reduced-motion: reduce`** — wrap with a `useReducedMotion` hook

### 6.4 Typography scale
- Hero display: `clamp(3rem, 8vw, 7rem)`, Space Grotesk, weight 600, tight tracking
- Section headers: `clamp(2rem, 4vw, 3.5rem)`, Geist Sans, weight 600
- Body: `1rem` / `1.125rem`, Geist Sans, weight 400, leading 1.6
- Mono / code: Geist Mono

---

## 7. Site Sections (scope)

| Section | Key elements |
|---|---|
| **Hero** | Animated headline (typewriter or word-stagger reveal), subheadline, two CTAs (View Work + Contact), aurora gradient bg, mouse-follow glow, scroll-down indicator |
| **About** | Bio + portrait (or stylized illustration if no photo) + quick stats (years coding, projects shipped, etc.) |
| **Skills** | Bento or marquee of skill chips grouped by category, hover reveals proficiency or fun facts |
| **Projects** | Filterable grid (All / ML / Web / Other), animated cards, click → modal with description, tech stack, links. Featured projects pinned |
| **Experience** | Vertical timeline w/ scroll-triggered reveal per entry |
| **Education** | Compact card or single timeline node |
| **Contact** | Form (name, email, message) → server action → SMTP email; success/error states; social links beside form |
| **Footer** | Socials, copyright, optional "built with" credits |

Optional sections (defer unless owner asks):
- Testimonials
- Services
- Blog/Writings (could pull from Medium RSS later)

---

## 8. Architecture

```
app/
  layout.tsx            # root, fonts, theme
  page.tsx              # landing (composes all sections)
  globals.css           # tokens, base styles
  api/
    contact/route.ts    # POST → SMTP send
sections/               # Hero, About, Skills, Projects, Experience, Contact
components/
  ui/                   # shadcn primitives
  motion/               # MagneticButton, ScrollReveal, CursorFollower, AuroraBackground
  primitives/           # GlassCard, Section, Container
lib/
  prisma.ts
  motion.ts             # variants, easings
  cloudinary.ts
  email.ts              # SMTP transport
  validators.ts         # Zod schemas
prisma/
  schema.prisma
  seed.ts               # initial content from resume.json
public/
  fonts/ (if self-hosting beyond next/font)
```

**Patterns:**
- Server Components default; mark `"use client"` only where motion/state requires it.
- Section data fetched in Server Components from Prisma; passed to client motion wrappers as props.
- Contact form: client component → Server Action → Zod validate → Nodemailer.
- Each section file < 300 lines; extract sub-components when crossing.

---

## 9. Database (Prisma) — initial schema sketch

```prisma
model Project {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  description String   @db.Text
  techStack   String[] // postgres array
  githubUrl   String?
  demoUrl     String?
  imageUrl    String?  // cloudinary URL
  category    String   // "ml" | "web" | "other"
  featured    Boolean  @default(false)
  startedAt   DateTime?
  order       Int      @default(0)
  createdAt   DateTime @default(now())
}

model Experience {
  id          String   @id @default(cuid())
  company     String
  role        String
  startDate   DateTime
  endDate     DateTime?  // null = present
  description String   @db.Text
  logoUrl     String?
  order       Int      @default(0)
}

model Skill {
  id       String @id @default(cuid())
  name     String
  category String   // "ml" | "web" | "devops" | "viz" | "other"
  order    Int    @default(0)
}

model Education {
  id          String   @id @default(cuid())
  institution String
  degree      String
  startDate   DateTime
  endDate     DateTime?
  details     String?  // CGPA, honors
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String   @db.Text
  createdAt DateTime @default(now())
}
```

Seed from `resume.json`. No `User`/auth tables since v1 has no auth.

---

## 10. Performance & A11y targets

- **Lighthouse:** Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95 on desktop. Mobile: ≥ 90 across the board.
- All images via `next/image` or `next-cloudinary`; explicit `width`/`height`; AVIF/WebP automatic.
- LCP target < 2s on Vercel CDN. Defer non-critical motion JS via dynamic imports.
- All interactive elements keyboard-reachable; focus-visible rings styled with accent-cyan.
- Color contrast WCAG AA minimum on all text-on-background combos.
- `prefers-reduced-motion: reduce` disables magnetic effects, cursor follower, parallax, and aurora animation (replace with static gradient).
- SEO: OpenGraph image (Cloudinary), Twitter card meta, JSON-LD `Person` schema, `robots.txt`, `sitemap.ts`.

---

## 11. Git Workflow

- Branch: **`revamp/futuristic-portfolio`** off `main`. **Never commit to `main` directly.**
- Commit style: **Conventional Commits**, no personal name in messages.
  - `feat: redesign hero section`
  - `feat(projects): add animated bento grid`
  - `refactor: extract motion variants`
  - `chore: configure prisma + neon`
- Keep commits focused and reviewable (one feature/section per commit when possible).
- No force-push, no rebasing `main`. PR into `main` when revamp is complete.

---

## 12. Environment Variables (owner provides)

```
# Database
DATABASE_URL="postgres://..."   # from Neon
DIRECT_URL="postgres://..."      # Neon direct, for migrations

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# SMTP (contact form)
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM="Huda Portfolio <noreply@example.com>"
CONTACT_TO_EMAIL="hudazahrabangash@gmail.com"

# Site
NEXT_PUBLIC_SITE_URL="https://..."
```

Provide a `.env.example` mirroring these. Never commit real values.

---

## 13. Open Questions / Owner TODO

Before implementation starts, owner should confirm:

1. **Auth/admin:** Confirm v1 ships **without Clerk and without an admin UI** (per §4). Content managed via Prisma Studio.
2. **Profile photo:** Supply a high-resolution portrait, or confirm the hero/about should be photo-free (illustration or initials-only).
3. **Resume hosting:** Keep Google Drive link, or host the PDF on Vercel/Cloudinary for a faster, embed-friendly download?
4. **Featured projects:** Which 2–3 of the 9 projects to feature prominently in the hero/landing area?
5. **Domain:** Custom domain on Vercel, or use the default `*.vercel.app`?
6. **SMTP provider:** Which SMTP service will be used (Gmail App Password, Resend SMTP, Brevo, Postmark)? Affects rate limits + deliverability.
7. **Optional sections:** Do you want testimonials / services / blog now, or defer?

---

## 14. Implementation Phases (proposed)

Each phase = its own commit cluster on the feature branch.

1. **Foundation** — Next.js scaffold, Tailwind, shadcn, fonts, theme tokens, base layout, Prisma + schema + seed
2. **Design primitives** — `GlassCard`, `Section`, `Container`, motion variants, Aurora background, MagneticButton, ScrollReveal
3. **Hero + Navbar** — animated hero, sticky/glass navbar, smooth-scroll links, mobile menu
4. **About + Skills** — bio block, bento skills grid w/ hover interactions
5. **Projects** — bento/grid with filters, project modal, data from Prisma
6. **Experience + Education** — animated timelines
7. **Contact** — form, validation, server action, SMTP send, success/error UX
8. **Footer + meta** — socials, OG image, sitemap, robots, JSON-LD
9. **Polish** — Lenis smooth scroll, page-transition wrappers, reduced-motion audit, Lighthouse pass, accessibility sweep
10. **Docs** — update README with setup steps, env vars, seed instructions

Skip the admin dashboard / Clerk integration entirely unless owner reverses the decision in §4.

---

## 15. Deliverable definition of done

- All sections live with real content from `resume.json`
- Fully responsive (mobile, tablet, desktop, ultrawide)
- Lighthouse targets met (§10)
- `prefers-reduced-motion` honored
- `.env.example` present, README setup steps work end-to-end
- Branch ready for PR review into `main`
- No personal name in commit messages
- No half-finished sections, no TODO comments, no `console.log` left over
