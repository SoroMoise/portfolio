import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Github, Globe } from "lucide-react";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { href, projectHref } from "@/lib/i18n/routes";
import { breadcrumbJsonLd, pageMetadata, softwareAppJsonLd } from "@/lib/seo";
import { SITE_URL, profile } from "@/lib/content/site";
import { getProject, nextProject, projects } from "@/lib/content/projects";
import { JsonLd } from "@/components/ui/json-ld";
import { Container, Section } from "@/components/ui/layout";
import { ExternalButtonLink, type ButtonVariant } from "@/components/ui/button";
import { Badge, TechTag } from "@/components/ui/badge";
import { GooglePlayIcon, type IconComponent } from "@/components/ui/icons";
import { AppIcon, ProjectGallery } from "@/components/ui/project-media";
import { Reveal } from "@/components/ui/reveal";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const project = getProject(slug);
  if (!project) return {};

  const seo = project.seo[locale];
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: seo.title,
    description: seo.description,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const next = nextProject(slug);
  const website = project.links.website?.[locale];

  const detail = [
    { label: dict.work.detail.year, value: String(project.year) },
    {
      label: dict.work.detail.platforms,
      value: project.platforms.map((p) => dict.work.platform[p]).join(", "),
    },
    { label: dict.work.detail.status, value: dict.work.status[project.status] },
    { label: dict.work.detail.publisher, value: profile.brand },
  ];

  const ctas = [
    {
      key: "googlePlay",
      url: project.links.googlePlay,
      label: dict.common.getOnGooglePlay,
      icon: GooglePlayIcon,
      variant: "primary",
    },
    {
      key: "website",
      url: website,
      label: dict.common.visitWebsite,
      icon: Globe,
      variant: project.links.googlePlay ? "secondary" : "primary",
    },
    {
      key: "github",
      url: project.links.github,
      label: dict.common.viewOnGithub,
      icon: Github,
      variant: "secondary",
    },
  ] satisfies Array<{
    key: string;
    url: string | undefined;
    label: string;
    icon: IconComponent;
    variant: ButtonVariant;
  }>;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "" },
          { name: dict.nav.work, path: "/work" },
          { name: project.name, path: `/work/${slug}` },
        ])}
      />
      <JsonLd
        data={softwareAppJsonLd({
          locale,
          name: project.name,
          description: project.summary[locale],
          url: `${SITE_URL}/${locale}/work/${slug}`,
          downloadUrl: project.links.googlePlay,
          sameAs: website,
        })}
      />

      <Section labelledBy="project-title" className="pb-0 pt-12 sm:pt-16">
        <Container width="wide">
          <Link
            href={href(locale, "work")}
            className="group inline-flex items-center gap-2 font-mono text-micro uppercase text-fg-subtle transition-colors hover:text-accent"
          >
            <ArrowLeft
              className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            {dict.common.backToWork}
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-5">
                <AppIcon project={project} size={72} className="size-14 sm:size-[4.5rem]" />
                <div className="flex min-w-0 flex-col gap-2">
                  <p className="font-mono text-micro uppercase text-fg-subtle">
                    {project.category[locale]}
                  </p>
                  <h1 id="project-title" className="font-display text-title text-fg">
                    {project.name}
                  </h1>
                </div>
              </div>
              <p className="text-heading font-display italic text-accent">
                {project.tagline[locale]}
              </p>
              <p className="max-w-2xl text-lead text-fg-muted">{project.summary[locale]}</p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                {ctas.map(({ key, url, label, icon: Icon, variant }) => {
                  if (!url) return null;

                  return (
                    <ExternalButtonLink
                      key={key}
                      href={url}
                      variant={variant}
                      newTabLabel={dict.common.externalLink}
                    >
                      <Icon className="size-4" />
                      {label}
                    </ExternalButtonLink>
                  );
                })}
                {project.status === "testing" && (
                  <Badge tone="accent">{dict.common.closedTesting}</Badge>
                )}
                {!project.sourceAvailable && (
                  <Badge tone="muted">{dict.common.closedSource}</Badge>
                )}
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 self-start rounded-lg border border-line bg-surface/50 p-6 sm:grid-cols-4 lg:grid-cols-2">
              {detail.map((row) => (
                <div key={row.label} className="flex flex-col gap-1">
                  <dt className="font-mono text-micro uppercase text-fg-subtle">{row.label}</dt>
                  <dd className="text-sm text-fg">{row.value}</dd>
                </div>
              ))}
              <div className="col-span-full flex flex-col gap-2">
                <dt className="font-mono text-micro uppercase text-fg-subtle">
                  {dict.work.detail.stack}
                </dt>
                <dd className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <Reveal className="mt-14">
            <h2 className="sr-only">{dict.work.detail.screenshots}</h2>
            <ProjectGallery
              project={project}
              locale={locale}
              label={dict.work.detail.screenshots}
              altTemplate={dict.work.detail.screenshotAlt}
            />
          </Reveal>

          <dl className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label[locale]} className="flex flex-col gap-1.5">
                <dd className="font-display text-heading leading-none text-fg">
                  {metric.value}
                </dd>
                <dt className="font-mono text-micro uppercase text-fg-subtle">
                  {metric.label[locale]}
                </dt>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section labelledBy="project-story">
        <Container width="wide">
          <h2 id="project-story" className="sr-only">
            {dict.work.detail.caseStudy}
          </h2>

          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-3">
            {(
              [
                { label: dict.work.detail.problem, body: project.problem[locale] },
                { label: dict.work.detail.build, body: project.build[locale] },
                { label: dict.work.detail.outcome, body: project.outcome[locale] },
              ] as const
            ).map((block, index) => (
              <div key={block.label} className="flex flex-col gap-4 bg-bg p-8">
                <Reveal className="flex flex-col gap-4">
                  <span className="font-mono text-micro text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-subheading text-fg">{block.label}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{block.body}</p>
                </Reveal>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
            <h3 className="font-display text-heading text-fg">{dict.work.detail.features}</h3>
            <ul className="grid gap-x-12 sm:grid-cols-2">
              {project.features[locale].map((feature) => (
                <li key={feature} className="border-b border-line py-4">
                  <Reveal className="flex items-start gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-sm text-fg-muted">{feature}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section bordered tone="subtle" className="py-12">
        <Container width="wide">
          <Link
            href={projectHref(locale, next.slug)}
            className="group flex flex-wrap items-baseline justify-between gap-4"
          >
            <span className="font-mono text-micro uppercase text-fg-subtle">
              {dict.work.detail.nextProject}
            </span>
            <span className="flex items-center gap-3 font-display text-heading text-fg transition-colors group-hover:text-accent">
              {next.name}
              <ArrowRight
                className="size-5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        </Container>
      </Section>
    </>
  );
}
