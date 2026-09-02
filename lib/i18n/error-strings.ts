import type { Locale } from "./config";

/**
 * Copy for the route-level error boundary, in its own module.
 *
 * `error.tsx` must be a Client Component — Next requires it — so unlike
 * `not-found.tsx` it cannot be handed its strings by a server wrapper. That
 * leaves a static client-side import, and importing a dictionary would pull
 * in the whole thing: each dictionary is a single large object literal, so no
 * bundler can tree-shake one property out of it.
 *
 * These four strings are therefore defined here and spread into both
 * dictionaries, keeping one source of truth while letting the boundary import
 * only what it renders.
 */
export const errorStrings: Record<Locale, {
  title: string;
  body: string;
  retry: string;
  home: string;
}> = {
  fr: {
    title: "Une erreur est survenue",
    body: "Le contenu n'a pas pu être chargé. Rechargez la page ; si le problème persiste, écrivez-moi à soromoise4@gmail.com",
    retry: "Réessayer",
    home: "Retour à l'accueil",
  },
  en: {
    title: "Something went wrong",
    body: "This content could not be loaded. Reload the page; if it keeps happening, email me at soromoise4@gmail.com",
    retry: "Try again",
    home: "Back to home",
  },
};
