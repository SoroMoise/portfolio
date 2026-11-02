import { fr, type Dictionary } from "./dictionaries/fr";
import { en } from "./dictionaries/en";
import { type Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
