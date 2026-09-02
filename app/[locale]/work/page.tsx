import type { Metadata } from "next";
import { resolveLocale } from "@/lib/page-params";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { clientWork, projects } from "@/lib/content/projects";
import { googlePlayDeveloperUrl, profile } from "@/lib/content/site";
import { JsonLd } from "@/components/ui/json-ld";
import { Container, Section, SectionHeader } from "@/components/ui/layout";
import { ExternalButtonLink } from "@/components/ui/button";
import { Badge, TechTag } from "@/components/ui/badge";
import { GooglePlayIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/sections/project-card";

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
    path: "/work",
    title: dict.meta.work.title,
    description: dict.meta.work.description,
  });
}

export default async function WorkPage({
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
          { name: dict.nav.work, path: "/work" },
        ])}
      />

      <Section labelledBy="work-title">
        <Container width="wide">
          <SectionHeader
            id="work-title"
            level={1}
            eyebrow={dict.work.eyebrow}
            title={dict.work.title}
            lead={dict.work.lead}
            action={
              <ExternalButtonLink
                href={googlePlayDeveloperUrl}
                variant="secondary"
                size="sm"
                newTabLabel={dict.common.externalLink}
              >
                <GooglePlayIcon className="size-4" />
                {profile.brand}
              </ExternalButtonLink>
            }
          />

          <h2 className="mt-14 font-mono text-micro uppercase text-fg-subtle">
            {dict.work.publishedTitle}
          </h2>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal
                key={project.slug}
                className={index === 0 ? "lg:col-span-2" : undefined}
              >
                <ProjectCard
                  project={project}
                  locale={locale}
                  dict={dict}
                  priority={index === 0}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section bordered tone="subtle" labelledBy="client-work-title">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
            <div className="flex flex-col gap-5">
              <Badge tone="muted">{dict.common.privateSource}</Badge>
              <h2 id="client-work-title" className="font-display text-heading text-fg">
                {clientWork.title[locale]}
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {clientWork.body[locale].map((paragraph, index) => (
                <Reveal key={index} as="p" className="text-lead text-fg-muted">
                  {paragraph}
                </Reveal>
              ))}

              <Reveal>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {clientWork.stack.map((tech) => (
                    <li key={tech}>
                      <TechTag>{tech}</TechTag>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
