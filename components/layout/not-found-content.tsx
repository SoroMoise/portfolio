"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { href } from "@/lib/i18n/routes";
import { Container, Section } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/button";

export type NotFoundStrings = Record<Locale, Dictionary["notFound"]>;

export function NotFoundContent({ strings }: { strings: NotFoundStrings }) {
  const segment = usePathname().split("/")[1];
  const locale = isLocale(segment) ? segment : defaultLocale;
  const copy = strings[locale];

  return (
    <Section labelledBy="not-found-title">
      <Container width="default" className="flex flex-col items-center gap-8 text-center">
        <p className="font-display text-display leading-none text-accent">{copy.code}</p>
        <h1 id="not-found-title" className="font-display text-title text-fg">
          {copy.title}
        </h1>
        <p className="max-w-xl text-lead text-fg-muted">{copy.body}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={href(locale, "home")}>{copy.cta}</ButtonLink>
          <ButtonLink href={href(locale, "work")} variant="secondary">
            {copy.secondaryCta}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
