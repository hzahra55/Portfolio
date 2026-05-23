import { socials } from "@/data/content";
import { SocialIcon } from "@/components/social-icon";
import { cn } from "@/lib/utils";

export function SocialLinks({
  className,
  variant = "row",
}: {
  className?: string;
  variant?: "row" | "stack";
}) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center gap-2",
        variant === "stack" && "flex-col items-stretch",
        className,
      )}
    >
      {socials.map((s) => (
        <li key={s.name}>
          <a
            href={s.url}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface-glass px-4 py-2 text-sm transition-all hover:border-accent-3/40 hover:bg-surface-glass-hi hover:text-foreground hover:shadow-glow"
          >
            <SocialIcon name={s.name} className="h-4 w-4 text-muted-foreground group-hover:text-accent-3 transition-colors" />
            <span className="text-muted-foreground transition-colors group-hover:text-foreground">
              {s.label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
