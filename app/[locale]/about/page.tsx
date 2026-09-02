import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { resolveLocale } from "@/lib/page-params";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { profile } from "@/lib/content/site";
import { education } from "@/lib/content/experience";
import { principles } from "@/lib/content/stack";
import { JsonLd } from "@/components/ui/json-ld";
import { Container, Hairline, Section, SectionHeader } from "@/components/ui/layout";
import { ExternalButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

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
    path: "/about",
    title: dict.meta.about.title,
    description: dict.meta.about.description,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolveLocale(params);

  const facts = [
    { label: dict.about.facts.role, value: `${profile.role[locale]} · ${profile.company.name}` },
    {
      label: dict.about.facts.location,
      value: `${profile.location.city}, ${profile.location.country[locale]}`,
    },
    { label: dict.about.facts.education, value: education[0].degree[locale] },
    {
      label: dict.about.facts.languages,
      value: profile.languages.map((l) => `${l.name[locale]} (${l.level[locale]})`).join(" · "),
    },
    { label: dict.about.facts.focus, value: dict.about.facts.focusValue },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "" },
          { name: dict.nav.about, path: "/about" },
        ])}
      />

      <Section labelledBy="about-title">
        <Container width="wide">
          <SectionHeader
            id="about-title"
            level={1}
            eyebrow={dict.about.eyebrow}
            title={dict.about.title}
            lead={dict.about.lead}
          />

          <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-20">
            <div className="flex flex-col gap-6">
              {dict.about.paragraphs.map((paragraph, index) => (
                <Reveal key={index} as="p" className="text-lead text-fg-muted">
                  {paragraph}
                </Reveal>
              ))}

              <Reveal className="mt-4">
                <ExternalButtonLink
                  href={profile.resume.href[locale]}
                  variant="secondary"
                  newTabLabel={dict.common.externalLink}
                >
                  <Download className="size-4" aria-hidden="true" />
                  {dict.common.downloadCv}
                </ExternalButtonLink>
              </Reveal>
            </div>

            <Reveal className="lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-lg border border-line bg-surface/50">
                <div className="relative aspect-square border-b border-line bg-bg-subtle">
                  {profile.portrait.available ? (
                    <Image
                      src={profile.portrait.src}
                      alt={profile.name}
                      fill
                      sizes="(min-width: 1024px) 24rem, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
                      <span className="relative font-display text-[6rem] leading-none text-fg-subtle/60">
                        {profile.initials}
                      </span>
                    </div>
                  )}
                </div>

                <dl className="divide-y divide-line px-6">
                  {facts.map((fact) => (
                    <div key={fact.label} className="flex flex-col gap-1 py-4">
                      <dt className="font-mono text-micro uppercase text-fg-subtle">
                        {fact.label}
                      </dt>
                      <dd className="text-sm text-fg">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section bordered tone="subtle" labelledBy="principles-title">
        <Container width="wide">
          <SectionHeader
            id="principles-title"
            title={dict.about.principlesTitle}
            lead={dict.about.principlesLead}
          />

          <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {principles.map((principle, index) => (
              <li key={principle.id} className="bg-bg p-8">
                <Reveal className="flex flex-col gap-3">
                  <span className="font-mono text-micro text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-subheading text-fg">
                    {principle.title[locale]}
                  </h3>
                  <p className="text-sm leading-relaxed text-fg-muted">
                    {principle.body[locale]}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section bordered labelledBy="education-title">
        <Container width="wide">
          <SectionHeader id="education-title" title={dict.about.educationTitle} />

          <ul className="mt-12 flex flex-col">
            {education.map((entry) => (
              <li key={entry.id}>
                <Reveal className="grid gap-3 py-7 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
                  <p className="font-mono text-micro uppercase text-fg-subtle sm:pt-1">
                    {entry.period}
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-subheading text-fg">
                        {entry.degree[locale]}
                      </h3>
                      {entry.inProgress && (
                        <Badge tone="accent">{dict.common.inProgress}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-fg-muted">{entry.school}</p>
                    <p className="text-sm text-fg-subtle">{entry.note[locale]}</p>
                  </div>
                </Reveal>
                <Hairline />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
