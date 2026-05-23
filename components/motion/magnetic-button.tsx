"use client";

import * as React from "react";
import { useMagnetic } from "@/hooks/use-magnetic";
import { cn } from "@/lib/utils";

interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  strength?: number;
  children: React.ReactNode;
}

export function Magnetic({
  strength = 0.25,
  className,
  children,
  ...props
}: MagneticProps) {
  const ref = useMagnetic<HTMLDivElement>(strength);
  return (
    <div
      ref={ref}
      className={cn("inline-block transition-transform duration-300 ease-out-expo will-change-transform", className)}
      {...props}
    >
      {children}
    </div>
  );
}
