import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { href } from "@/lib/i18n/routes";
import { featuredProjects } from "@/lib/content/projects";
import { principles, stack, techLabel } from "@/lib/content/stack";
import { roles } from "@/lib/content/experience";
import { profile } from "@/lib/content/site";
import { Container, Eyebrow, Hairline, Section, SectionHeader } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { TechTag } from "@/components/ui/badge";
import { ProjectCard } from "./project-card";

export function SelectedWork({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section bordered labelledBy="selected-work">
      <Container width="wide">
        <SectionHeader
          id="selected-work"
          eyebrow={dict.home.selectedWork.eyebrow}
          title={dict.home.selectedWork.title}
          lead={dict.home.selectedWork.lead}
          action={
            <ButtonLink href={href(locale, "work")} variant="outline" size="sm">
              {dict.common.viewAllProjects}
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </ButtonLink>
          }
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
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
  );
}

export function Approach({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section bordered tone="subtle" labelledBy="approach">
      <Container width="wide">
        <SectionHeader
          id="approach"
          eyebrow={dict.home.approach.eyebrow}
          title={dict.home.approach.title}
          lead={dict.home.approach.lead}
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
  );
}

export function StackTeaser({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section bordered labelledBy="stack-teaser">
      <Container width="wide">
        <SectionHeader
          id="stack-teaser"
          eyebrow={dict.home.stackTeaser.eyebrow}
          title={dict.home.stackTeaser.title}
          lead={dict.home.stackTeaser.lead}
          action={
            <ButtonLink href={href(locale, "stack")} variant="outline" size="sm">
              {dict.home.stackTeaser.cta}
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </ButtonLink>
          }
        />

        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((group) => (
            <Reveal key={group.id} className="flex flex-col gap-4">
              <Eyebrow rule={false}>{group.label[locale]}</Eyebrow>
              <Hairline />
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <TechTag>{techLabel(item, locale)}</TechTag>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function ExperienceTeaser({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const current = roles[0];

  return (
    <Section bordered tone="subtle" labelledBy="experience-teaser">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <SectionHeader
            id="experience-teaser"
            eyebrow={dict.home.experienceTeaser.eyebrow}
            title={dict.home.experienceTeaser.title}
            action={
              <ButtonLink href={href(locale, "experience")} variant="outline" size="sm">
                {dict.home.experienceTeaser.cta}
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </ButtonLink>
            }
          />

          <Reveal className="flex flex-col gap-6 rounded-lg border border-line bg-bg p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-subheading text-fg">
                {current.position[locale]} · {current.company}
              </h3>
              <span className="font-mono text-micro uppercase text-fg-subtle">
                {current.start} — {dict.common.present}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-fg-muted">{current.summary[locale]}</p>
            <Hairline />
            <ul className="flex flex-wrap gap-1.5">
              {current.stack.slice(0, 8).map((tech) => (
                <li key={tech}>
                  <TechTag>{tech}</TechTag>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export function ContactCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section bordered labelledBy="contact-cta">
      <Container width="default">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <h2 id="contact-cta" className="max-w-3xl font-display text-title text-fg">
            {dict.home.contactTeaser.title}
          </h2>
          <p className="max-w-2xl text-lead text-fg-muted">{dict.home.contactTeaser.lead}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={href(locale, "contact")} size="lg">
              {dict.home.contactTeaser.cta}
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </ButtonLink>
            <Link
              href={`mailto:${profile.email}`}
              className="rounded-md px-2 py-1 font-mono text-sm text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {profile.email}
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
