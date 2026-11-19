import Link from "next/link";
import { ArrowRight, ArrowUpRight, Globe } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { projectHref } from "@/lib/i18n/routes";
import type { Project } from "@/lib/content/projects";
import { AppIcon, ProjectShowcase } from "@/components/ui/project-media";
import { Badge, TechTag } from "@/components/ui/badge";
import { GooglePlayIcon, type IconComponent } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * The store and site links of a project, as real anchors. They sit above the
 * card's stretched link (`relative z-10`), so the card stays one big target
 * for the case study while these two still go straight to Google Play or the
 * app's own site.
 */
function ProjectLinkRow({
  project,
  locale,
  dict,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
}) {
  const links: Array<{ key: string; href: string; label: string; icon: IconComponent }> = [];
  if (project.links.googlePlay) {
    links.push({
      key: "play",
      href: project.links.googlePlay,
      label: dict.common.googlePlayShort,
      icon: GooglePlayIcon,
    });
  }
  if (project.links.website) {
    links.push({
      key: "site",
      href: project.links.website[locale],
      label: dict.common.websiteShort,
      icon: Globe,
    });
  }

  if (links.length === 0 && project.status !== "testing") return null;

  return (
    <div className="relative z-10 flex flex-wrap items-center gap-2">
      {links.map(({ key, href, label, icon: Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1.5 rounded-md border border-line bg-bg px-2.5 py-1.5 text-xs text-fg-muted transition-colors hover:border-accent-line hover:text-fg"
        >
          <Icon className="size-3.5" aria-hidden="true" />
          {label}
          <ArrowUpRight
            className="size-3 text-fg-subtle transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            aria-hidden="true"
          />
          <span className="sr-only">
            ({project.name}, {dict.common.externalLink})
          </span>
        </a>
      ))}
      {project.status === "testing" && <Badge tone="accent">{dict.common.closedTesting}</Badge>}
    </div>
  );
}

export function ProjectCard({
  project,
  locale,
  dict,
  layout = "grid",
  reverse = false,
  priority = false,
  className,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
  layout?: "grid" | "feature";
  reverse?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const feature = layout === "feature";

  return (
    <article className={cn("group relative h-full", className)}>
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface/50 transition-colors duration-300 group-hover:border-accent-line",
          feature && "lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]",
        )}
      >
        <div
          className={cn(
            "relative aspect-16/10 overflow-hidden border-b border-line",
            feature && "lg:aspect-auto lg:min-h-[27rem] lg:border-b-0",
            feature && (reverse ? "lg:order-last lg:border-l" : "lg:border-r"),
          )}
        >
          <ProjectShowcase
            project={project}
            locale={locale}
            size={feature ? "lg" : "md"}
            priority={priority}
            className="absolute inset-0"
          />
        </div>

        <div className={cn("flex flex-1 flex-col gap-4 p-6", feature && "sm:p-8 lg:gap-5 lg:p-10")}>
          <div className="flex items-center gap-4">
            <AppIcon project={project} size={feature ? 56 : 48} />
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-subheading text-fg">
                <Link
                  href={projectHref(locale, project.slug)}
                  className="before:absolute before:inset-0 before:rounded-lg"
                >
                  {project.name}
                </Link>
              </h3>
              <p className="mt-1 font-mono text-micro uppercase text-fg-subtle">
                {project.category[locale]}
              </p>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 shrink-0 self-start text-fg-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </div>

          <p className={cn("text-sm text-accent", feature && "font-display text-lg italic")}>
            {project.tagline[locale]}
          </p>
          <p
            className={cn(
              "text-sm leading-relaxed text-fg-muted",
              !feature && "line-clamp-3",
            )}
          >
            {project.summary[locale]}
          </p>

          {feature && (
            <dl className="grid grid-cols-3 gap-4 border-y border-line py-5">
              {project.metrics.map((metric) => (
                <div key={metric.label[locale]} className="flex flex-col gap-1">
                  <dd className="font-display text-2xl leading-none text-fg">{metric.value}</dd>
                  <dt className="font-mono text-[0.625rem] uppercase leading-snug tracking-[0.12em] text-fg-subtle">
                    {metric.label[locale]}
                  </dt>
                </div>
              ))}
            </dl>
          )}

          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li key={tech}>
                <TechTag>{tech}</TechTag>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <ProjectLinkRow project={project} locale={locale} dict={dict} />
            {feature && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-fg-muted transition-colors group-hover:text-accent">
                {dict.common.readCaseStudy}
                <ArrowRight
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
