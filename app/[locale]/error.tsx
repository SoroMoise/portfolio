"use client";

import { useEffect } from "react";
import { getDictionary } from "@/lib/i18n";
import { defaultLocale } from "@/lib/i18n/config";
import { href } from "@/lib/i18n/routes";
import { Container, Section } from "@/components/ui/layout";
import { Button, ButtonLink } from "@/components/ui/button";

/**
 * Route-level error boundary. The old site had none, so a single failed client
 * fetch replaced the whole page with Next's default error screen.
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = defaultLocale;
  const dict = getDictionary(locale);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section labelledBy="error-title">
      <Container width="default" className="flex flex-col items-center gap-8 text-center">
        <h1 id="error-title" className="font-display text-title text-fg">
          {dict.error.title}
        </h1>
        <p className="max-w-xl text-lead text-fg-muted">{dict.error.body}</p>
        {error.digest && (
          <p className="font-mono text-micro uppercase text-fg-subtle">{error.digest}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset}>{dict.error.retry}</Button>
          <ButtonLink href={href(locale, "home")} variant="secondary">
            {dict.error.home}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
