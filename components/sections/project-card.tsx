import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { projectHref } from "@/lib/i18n/routes";
import type { Project } from "@/lib/content/projects";
import { ProjectArtwork } from "@/components/ui/project-artwork";
import { Badge, TechTag } from "@/components/ui/badge";
import { GooglePlayIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * One project, as a single card-wide link.
 *
 * The whole card is one anchor rather than a card with a nested button, so
 * there is exactly one tab stop and one hit area per project. The Google Play
 * badge is decoration here; the store link lives on the detail page, where it
 * can sit beside the rest of the project's context.
 */
export function ProjectCard({
  project,
  locale,
  dict,
  priority = false,
  className,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
  priority?: boolean;
  className?: string;
}) {
  const cover = project.shots[0];

  return (
    <article className={cn("group relative", className)}>
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface/50 transition-colors duration-300 group-hover:border-accent-line">
        <div className="relative aspect-16/10 overflow-hidden border-b border-line bg-bg-subtle">
          {cover ? (
            <Image
              src={cover}
              alt=""
              fill
              priority={priority}
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
            />
          ) : (
            <ProjectArtwork
              slug={project.slug}
              hue={project.hue}
              className="h-full transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
            />
          )}

          {project.links.googlePlay && (
            <div className="absolute left-4 top-4">
              <Badge tone="accent" icon={GooglePlayIcon}>
                {dict.common.googlePlayShort}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-subheading text-fg">
              <Link href={projectHref(locale, project.slug)} className="before:absolute before:inset-0">
                {project.name}
              </Link>
            </h3>
            <ArrowUpRight
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-fg-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </div>

          <p className="text-sm text-accent">{project.tagline[locale]}</p>
          <p className="flex-1 text-sm leading-relaxed text-fg-muted">
            {project.summary[locale]}
          </p>

          <ul className="mt-2 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li key={tech}>
                <TechTag>{tech}</TechTag>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
