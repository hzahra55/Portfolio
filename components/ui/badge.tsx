import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-surface-glass text-foreground",
        accent: "border-accent-1/30 bg-accent-1/10 text-accent-1",
        outline: "border-border text-muted-foreground",
        glow: "border-accent-3/30 bg-accent-3/5 text-accent-3 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
