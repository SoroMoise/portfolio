import { getDictionary } from "@/lib/i18n";
import { NotFoundContent } from "@/components/layout/not-found-content";

export default function LocaleNotFound() {
  return (
    <NotFoundContent
      strings={{
        fr: getDictionary("fr").notFound,
        en: getDictionary("en").notFound,
      }}
    />
  );
}
