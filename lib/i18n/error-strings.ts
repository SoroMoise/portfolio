import type { Locale } from "./config";

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
