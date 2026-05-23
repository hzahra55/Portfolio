import { cn } from "@/lib/utils";
import * as React from "react";

export function GradientText({
  children,
  className,
  animate = false,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { animate?: boolean }) {
  return (
    <span
      className={cn(animate ? "text-gradient-anim" : "text-gradient", className)}
      {...props}
    >
      {children}
    </span>
  );
}
