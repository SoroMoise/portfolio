import type { Metadata } from "next";
import { resolveLocale } from "@/lib/page-params";
import { isLocale, localeTags } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { profile } from "@/lib/content/site";
import { PRIVACY_UPDATED, privacySections } from "@/lib/content/privacy";
import { JsonLd } from "@/components/ui/json-ld";
import { Container, Section, SectionHeader } from "@/components/ui/layout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return pageMetadata({
    locale,
    path: "/privacy",
    title: dict.meta.privacy.title,
    description: dict.meta.privacy.description,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolveLocale(params);
  const updated = new Intl.DateTimeFormat(localeTags[locale], {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${PRIVACY_UPDATED}T00:00:00Z`));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "" },
          { name: dict.privacy.eyebrow, path: "/privacy" },
        ])}
      />

      <Section labelledBy="privacy-title">
        <Container width="prose">
          <SectionHeader
            id="privacy-title"
            level={1}
            eyebrow={dict.privacy.eyebrow}
            title={dict.privacy.title}
            lead={dict.privacy.lead}
          />
          <p className="mt-6 font-mono text-micro uppercase text-fg-subtle">
            {dict.privacy.updated} <time dateTime={PRIVACY_UPDATED}>{updated}</time>
          </p>

          <div className="mt-14 flex flex-col gap-12">
            {privacySections.map((section) => (
              <section key={section.id} aria-labelledby={`privacy-${section.id}`}>
                <h2 id={`privacy-${section.id}`} className="font-display text-heading text-fg">
                  {section.title[locale]}
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                  {section.paragraphs[locale].map((paragraph, index) => (
                    <p key={index} className="text-fg-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <p className="text-fg-muted">
              {dict.privacy.contact}{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent"
              >
                {profile.email}
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
