"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { errorStrings } from "@/lib/i18n/error-strings";
import { href } from "@/lib/i18n/routes";
import { Container, Section } from "@/components/ui/layout";
import { Button, ButtonLink } from "@/components/ui/button";

/**
 * Route-level error boundary. The old site had none, so a single failed client
 * fetch replaced the whole page with Next's default error screen.
 *
 * Next passes no params to an error boundary, so the language is read back off
 * the pathname — the same approach as `not-found-content.tsx`. Hardcoding the
 * default locale here would show French copy inside an `<html lang="en-US">`
 * document and point the only escape link at `/fr`.
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const segment = usePathname().split("/")[1];
  const locale = isLocale(segment) ? segment : defaultLocale;
  const copy = errorStrings[locale];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section labelledBy="error-title">
      <Container width="default" className="flex flex-col items-center gap-8 text-center">
        <h1 id="error-title" className="font-display text-title text-fg">
          {copy.title}
        </h1>
        <p className="max-w-xl text-lead text-fg-muted">{copy.body}</p>
        {error.digest && (
          <p className="font-mono text-micro uppercase text-fg-subtle">{error.digest}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset}>{copy.retry}</Button>
          <ButtonLink href={href(locale, "home")} variant="secondary">
            {copy.home}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
