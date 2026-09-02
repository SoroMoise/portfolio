import type { Metadata } from "next";
import { Download } from "lucide-react";
import { resolveLocale } from "@/lib/page-params";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { education, roles } from "@/lib/content/experience";
import { profile } from "@/lib/content/site";
import { JsonLd } from "@/components/ui/json-ld";
import { Container, Hairline, Section, SectionHeader } from "@/components/ui/layout";
import { ExternalButtonLink } from "@/components/ui/button";
import { Badge, TechTag } from "@/components/ui/badge";
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
    path: "/experience",
    title: dict.meta.experience.title,
    description: dict.meta.experience.description,
  });
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolveLocale(params);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "" },
          { name: dict.nav.experience, path: "/experience" },
        ])}
      />

      <Section labelledBy="experience-title">
        <Container width="wide">
          <SectionHeader
            id="experience-title"
            level={1}
            eyebrow={dict.experience.eyebrow}
            title={dict.experience.title}
            lead={dict.experience.lead}
            action={
              <ExternalButtonLink
                href={profile.resume.href[locale]}
                variant="secondary"
                size="sm"
                newTabLabel={dict.common.externalLink}
              >
                <Download className="size-4" aria-hidden="true" />
                {dict.common.downloadCv}
              </ExternalButtonLink>
            }
          />

          <h2 className="mt-16 font-mono text-micro uppercase text-fg-subtle">
            {dict.experience.rolesTitle}
          </h2>

          {/* Timeline: a single hairline rail with a marker per role. */}
          <ol className="mt-8 border-l border-line">
            {roles.map((role) => (
              <li key={role.id} className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-2 size-2.5 rounded-full border-2 border-bg bg-accent"
                />

                <Reveal className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <p className="font-mono text-micro uppercase text-fg-subtle">
                      {role.start} — {role.end ?? dict.common.present} · {role.location[locale]}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-heading text-fg">
                        {role.position[locale]}
                      </h3>
                      <Badge tone="neutral">{role.kind[locale]}</Badge>
                    </div>
                    <a
                      href={role.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit text-sm text-accent underline decoration-accent-line underline-offset-4 transition-colors hover:decoration-accent"
                    >
                      {role.company}
                      <span className="sr-only"> ({dict.common.externalLink})</span>
                    </a>
                  </div>

                  <p className="max-w-3xl text-lead text-fg-muted">{role.summary[locale]}</p>

                  <div className="flex flex-col gap-3">
                    <h4 className="font-mono text-micro uppercase text-fg-subtle">
                      {dict.experience.responsibilitiesLabel}
                    </h4>
                    <ul className="max-w-3xl">
                      {role.responsibilities[locale].map((item) => (
                        <li
                          key={item}
                          className="border-b border-line py-3 text-sm leading-relaxed text-fg-muted last:border-0"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="font-mono text-micro uppercase text-fg-subtle">
                      {dict.experience.stackLabel}
                    </h4>
                    <ul className="flex flex-wrap gap-1.5">
                      {role.stack.map((tech) => (
                        <li key={tech}>
                          <TechTag>{tech}</TechTag>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section bordered tone="subtle" labelledBy="education-heading">
        <Container width="wide">
          <SectionHeader id="education-heading" title={dict.experience.educationTitle} />

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

          <div className="mt-16 flex flex-col gap-4">
            <h2 className="font-mono text-micro uppercase text-fg-subtle">
              {dict.experience.languagesTitle}
            </h2>
            <dl className="grid gap-6 sm:grid-cols-2 sm:gap-10">
              {profile.languages.map((language) => (
                <div key={language.id} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                  <dt className="font-display text-subheading text-fg">
                    {language.name[locale]}
                  </dt>
                  <dd className="text-sm text-fg-muted">{language.level[locale]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>
    </>
  );
}
