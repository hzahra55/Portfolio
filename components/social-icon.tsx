import { Github, Linkedin, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialIconProps {
  name: string;
  className?: string;
}

export function SocialIcon({ name, className }: SocialIconProps) {
  const cls = cn("h-4 w-4", className);
  switch (name) {
    case "github":
      return <Github className={cls} />;
    case "linkedin":
      return <Linkedin className={cls} />;
    case "leetcode":
      return <Code2 className={cls} />;
    case "medium":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden>
          <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      );
    case "huggingface":
      return (
        <span className={cn("inline-block text-base leading-none", className)} aria-hidden>
          🤗
        </span>
      );
    default:
      return null;
  }
}
