import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { href } from "@/lib/i18n/routes";
import { profile, socials } from "@/lib/content/site";
import { projects } from "@/lib/content/projects";
import { Container } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/badge";
import { Enter } from "@/components/ui/reveal";
import { socialIcon } from "@/components/ui/icons";
import { LocalTime } from "@/components/ui/local-time";
import { formatAbidjanTime } from "@/lib/time";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const stats = [
    { value: String(projects.length), label: dict.home.stats.apps },
    { value: "2023 →", label: dict.home.stats.since },
    { value: "170+", label: dict.home.stats.currencies },
  ];

  const rail = socials.filter((s) => s.primary);

  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Quiet hairline grid, masked so it never fights the text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-fade-y"
      />
      {/* Single warm bloom behind the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 size-[36rem] rounded-full bg-accent opacity-[0.07] blur-3xl"
      />

      <Container width="wide" className="relative py-section">
        <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-20">
          <div className="flex flex-col">
            <Enter className="flex max-w-xl items-start gap-3 text-fg-muted">
              <StatusDot className="mt-1.5" />
              <p className="font-mono text-micro uppercase">{dict.home.status}</p>
            </Enter>

            <Enter delay={0.06} className="mt-8">
              <h1 className="font-display text-display text-fg">
                <span className="block">SORO</span>
                <span className="block italic text-accent">Colotcholoman Moïse</span>
              </h1>
            </Enter>

            <Enter
              delay={0.12}
              className="mt-7 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-fg-muted sm:text-[0.8125rem]"
            >
              <span aria-hidden="true" className="h-px w-10 bg-accent" />
              <p>{dict.home.roleLine}</p>
            </Enter>

            <Enter delay={0.18} className="mt-8 max-w-2xl">
              <p className="text-lead text-fg-muted">{dict.home.intro}</p>
            </Enter>

            <Enter delay={0.24} className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href={href(locale, "work")} size="lg">
                {dict.home.primaryCta}
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </ButtonLink>
              <ButtonLink href={href(locale, "contact")} variant="secondary" size="lg">
                {dict.home.secondaryCta}
              </ButtonLink>
            </Enter>

            <Enter delay={0.3} className="mt-10">
              <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {rail.map((social) => {
                  const Icon = socialIcon(social.id);
                  return (
                    <li key={social.id}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="group inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-xs text-fg-muted transition-colors hover:border-accent-line hover:text-fg"
                      >
                        <Icon className="size-4" aria-hidden="true" />
                        <span>{social.label}</span>
                        <ArrowUpRight
                          className="size-3 text-fg-subtle transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                        <span className="sr-only">({dict.common.externalLink})</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Enter>
          </div>

          {/* Identity card — the editorial "spec sheet" that replaces a stock photo. */}
          <Enter
            delay={0.16}
            className="rounded-lg border border-line bg-surface/60 p-2 backdrop-blur-sm lg:sticky lg:top-24"
          >
            <div className="relative aspect-4/3 overflow-hidden rounded-md border border-line bg-bg-subtle">
              {profile.portrait.available ? (
                <Image
                  src={profile.portrait.src}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
                  <span className="relative font-display text-[7rem] leading-none text-fg-subtle/60">
                    {profile.initials}
                  </span>
                </div>
              )}
            </div>

            <dl className="divide-y divide-line px-4">
              {[
                { label: dict.about.facts.role, value: `${profile.company.name}` },
                {
                  label: dict.about.facts.location,
                  value: `${profile.location.city}, ${profile.location.country[locale]}`,
                },
                { label: dict.about.facts.focus, value: dict.about.facts.focusValue },
              ].map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="font-mono text-micro uppercase text-fg-subtle">{row.label}</dt>
                  <dd className="text-right text-sm text-fg">{row.value}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="font-mono text-micro uppercase text-fg-subtle">
                  {dict.common.localTime}
                </dt>
                <dd className="text-right text-sm text-fg">
                  <LocalTime initial={formatAbidjanTime(new Date())} />
                  <span className="ml-1.5 text-fg-subtle">GMT</span>
                </dd>
              </div>
            </dl>
          </Enter>
        </div>

        {/* Proof strip. */}
        <Enter delay={0.36} className="mt-16 border-t border-line pt-10">
          <dl className="grid gap-8 sm:grid-cols-3 sm:gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1.5">
                <dd className="font-display text-heading leading-none text-fg">{stat.value}</dd>
                <dt className="max-w-[22ch] font-mono text-micro uppercase text-fg-subtle">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Enter>
      </Container>
    </section>
  );
}
