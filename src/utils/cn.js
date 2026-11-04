import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Aceternity-style `cn` utility — merges Tailwind classes cleanly.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
