import { fr, type Dictionary } from "./dictionaries/fr";
import { en } from "./dictionaries/en";
import { type Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { fr, en };

/**
 * Both dictionaries are plain modules, so this is a synchronous lookup — no
 * dynamic import and no async boundary in the pages that consume it.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
