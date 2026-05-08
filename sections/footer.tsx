import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { SocialLinks } from "@/components/social-links";
import { profile, navLinks } from "@/data/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 border-t border-border bg-background/40 sm:mt-24">
      {/* Big watermark name — clamped + nowrap so it doesn't wrap awkwardly on mobile */}
      <div
        aria-hidden
        className="pointer-events-none relative overflow-hidden"
      >
        <div className="relative w-full">
          <div
            className="whitespace-nowrap font-display font-bold leading-none tracking-tighter text-transparent text-center"
            style={{
              WebkitTextStroke: "1px var(--border)",
              fontSize: "clamp(2.5rem, 14vw, 14rem)",
            }}
          >
            {profile.name.toUpperCase()}
          </div>
        </div>
      </div>

      <Container className="relative pb-10 pt-6 sm:pb-12 sm:pt-8">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="#hero" className="group inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent-1 via-accent-2 to-accent-3 font-display text-sm font-bold text-white">
                HZ
              </span>
              <span className="font-display text-base font-semibold tracking-tight">
                {profile.name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {profile.shortTagline}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Sitemap
            </div>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-foreground/70 transition hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Connect
            </div>
            <SocialLinks className="mt-4" />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 sm:mt-12">
          <p className="font-mono text-[11px] text-muted-foreground sm:text-xs">
            © {year} {profile.name}. Crafted with intent.
          </p>
          <a
            href="#hero"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface-glass px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition hover:border-accent-3/40 hover:bg-surface-glass-hi hover:text-foreground sm:px-4 sm:text-xs"
            aria-label="Back to top"
          >
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            Back to top
          </a>
        </div>
      </Container>
    </footer>
  );
}
