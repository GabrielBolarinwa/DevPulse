import { LANGUAGE_COLORS } from "@/constants";

export function parseTime(seconds: number): string {
  let metric;
  metric = `${seconds} seconds ago`;
  if (seconds >= 60) {
    metric = `${Math.floor(seconds / 60)} minutes ago`;
  }
  if (seconds >= 60 * 60) {
    metric = `${Math.floor(seconds / 3600)} hours ago`;
  }
  if (seconds >= 60 * 60 * 24) {
    metric = `${Math.floor(seconds / 86400)} days ago`;
  }
  if (seconds >= 60 * 60 * 24 * 30.44) {
    metric = `${Math.floor(seconds / (60 * 60 * 24 * 30.44))} months ago`;
  }
  if (seconds >= 60 * 60 * 24 * 30.44 * 12) {
    metric = `${Math.floor(seconds / (60 * 60 * 24 * 30.44 * 12))} ${Math.floor(seconds / (60 * 60 * 24 * 30.44 * 12)) > 1 ? "years" : "year"} ago`;
  }
  return metric;
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
