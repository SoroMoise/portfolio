import { profile } from "@/lib/content/site";

export function formatAbidjanTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: profile.location.timeZone,
  }).format(date);
}

/** Current year in Abidjan, for copyright lines and experience maths. */
export function abidjanYear(date: Date = new Date()): number {
  return Number(
    new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      timeZone: profile.location.timeZone,
    }).format(date),
  );
}
