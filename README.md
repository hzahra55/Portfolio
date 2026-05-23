# Huda Zahra — Portfolio

A futuristic, motion-driven personal portfolio built on a modern Next.js stack.

## Stack

- **Next.js 15** (App Router, Server Components, Server Actions)
- **TypeScript** (strict)
- **Tailwind CSS 3** + **shadcn/ui** primitives
- **Framer Motion** for animation
- **Lenis** for smooth scrolling
- **Prisma** + **PostgreSQL** (optional — falls back to static content when no DB)
- **Nodemailer** + SMTP (optional — graceful mailto: fallback when not configured)
- **Cloudinary** (optional — for image hosting)

## Getting started

### 1. Install

```bash
npm install
```

### 2. (Optional) Configure environment

Copy `.env.example` to `.env.local` and fill in any keys you have. **Every variable is optional** — leave them empty and the site will still render with static content and a mailto-based contact form.

```bash
cp .env.example .env.local
```

### 3. Run

```bash
npm run dev          # development (http://localhost:3000)
npm run build && npm start   # production
```

## Content management

Content lives in [`data/content.ts`](data/content.ts) (TypeScript constants) — this is the **fallback** consumed when `DATABASE_URL` is not set.

When a Postgres DB is provisioned (e.g. via Neon → Vercel integration):

```bash
npm run db:push      # apply Prisma schema
npm run db:seed      # populate from data/content.ts
npm run db:studio    # browse/edit rows in a UI
```

Edits in `db:studio` take precedence at runtime; the static file is only used as a fallback if the DB is empty or unreachable.

## Theming

All colors are CSS custom properties in [`app/globals.css`](app/globals.css) under `:root`. Edit them to retheme the entire site — components reference Tailwind utilities that resolve to these tokens, so no per-component edits are needed.

Bonus: optional preset themes are available via `<html data-theme="cyberpunk">` (or `aurora-warm`, `midnight`).

## Project structure

```
app/                  # routes, layout, server actions
sections/             # composed page sections (Hero, About, …)
components/
  ui/                 # shadcn primitives (Button, Dialog, Input, …)
  primitives/         # design primitives (GlassCard, Section, …)
  motion/             # animation building blocks
data/                 # static fallback content (single source of truth)
lib/                  # data access, utils, validators, motion variants
hooks/                # custom hooks (magnetic, mouse, mounted)
prisma/               # schema + seed
```

## Accessibility

- Skip-to-content link
- Keyboard-reachable interactive elements
- WCAG AA contrast targets
- `prefers-reduced-motion` honored across all decorative animations

## License

MIT — see [LICENSE](LICENSE).
