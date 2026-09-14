import { LANGUAGE_COLORS } from "@/constants";

export function now() {
  return Date.now();
}

export function getLanguageColor(name: string) {
  return LANGUAGE_COLORS[name] ?? LANGUAGE_COLORS.Other;
}

export const dateFormat = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
