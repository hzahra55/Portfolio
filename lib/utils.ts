import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateRange(start: string, end: string | null) {
  return end ? `${start} — ${end}` : `${start} — Present`;
}

export function isPresent(end: string | null) {
  return end === null;
}
