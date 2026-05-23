import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-7xl">
        <span className="text-gradient">Lost in the void</span>
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        This page slipped through the wormhole. Let&apos;s get you back to safer
        coordinates.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface-glass px-6 py-3 text-sm font-medium transition hover:bg-surface-glass-hi"
      >
        Return home
      </Link>
    </section>
  );
}
