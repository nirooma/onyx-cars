import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "./types";
import en from "./en";
import he from "./he";

const dictionaries: Record<Locale, Dictionary> = { he, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
