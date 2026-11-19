import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { Project } from "@/lib/content/projects";
import { cn } from "@/lib/utils";

export function AppIcon({
  project,
  size = 48,
  className,
}: {
  project: Pick<Project, "icon">;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={project.icon}
      alt=""
      width={size}
      height={size}
      className={cn(
        "shrink-0 rounded-[22%] shadow-xs ring-1 ring-line",
        className,
      )}
    />
  );
}

function Shot({
  src,
  sizes,
  priority,
  className,
}: {
  src: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 self-start overflow-hidden rounded-[2.4cqw] bg-surface shadow-float ring-1 ring-fg/10 transition-[translate,rotate] duration-700 ease-out-expo",
        className,
      )}
    >
      <Image
        src={src}
        alt=""
        width={720}
        height={1280}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full"
      />
    </div>
  );
}

/**
 * The cover of a project: three of its store screenshots set on a stage drawn
 * in the site's own palette (warm neutral surface, hairline grid, an accent
 * glow) rather than the app's colours, so seven different apps still read as
 * one portfolio. The center shot rises out of the bottom edge; the two others
 * lean back behind it and spread a little when the card is hovered.
 *
 * Purely decorative: the card or the case study around it carries the name and
 * the description, and the full set has real alt text in `ProjectGallery`.
 */
export function ProjectShowcase({
  project,
  locale,
  size = "md",
  priority = false,
  className,
}: {
  project: Project;
  locale: Locale;
  size?: "md" | "lg";
  priority?: boolean;
  className?: string;
}) {
  const [center, left, right] = project.shots[locale];
  const sizes =
    size === "lg"
      ? "(min-width: 1024px) 14rem, 34vw"
      : "(min-width: 1024px) 9rem, (min-width: 640px) 17vw, 34vw";

  return (
    <div
      aria-hidden="true"
      className={cn("project-stage @container relative isolate h-full w-full overflow-hidden", className)}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-fade-y" />
      <div className="absolute inset-x-0 bottom-0 top-[9%] flex justify-center">
        {left && (
          <Shot
            src={left}
            sizes={sizes}
            className="z-0 -mr-[7%] mt-[8%] w-[29%] origin-bottom -rotate-6 motion-safe:group-hover:-translate-x-[7%] motion-safe:group-hover:-rotate-8"
          />
        )}
        <Shot
          src={center}
          sizes={sizes}
          priority={priority}
          className="z-10 w-[33%] motion-safe:group-hover:-translate-y-[2.5%]"
        />
        {right && (
          <Shot
            src={right}
            sizes={sizes}
            className="z-0 -ml-[7%] mt-[8%] w-[29%] origin-bottom rotate-6 motion-safe:group-hover:translate-x-[7%] motion-safe:group-hover:rotate-8"
          />
        )}
      </div>
    </div>
  );
}

/**
 * Every screenshot of a project, in the visitor's language. A scroll-snapping
 * strip on small screens (the region is focusable so the keyboard can scroll
 * it), a single row of six from `lg` up.
 */
export function ProjectGallery({
  project,
  locale,
  label,
  altTemplate,
  className,
}: {
  project: Project;
  locale: Locale;
  label: string;
  altTemplate: string;
  className?: string;
}) {
  const shots = project.shots[locale];

  return (
    <div
      className={cn(
        "project-stage relative overflow-hidden rounded-lg border border-line",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-fade-y"
      />
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className="relative snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
      >
        <ul className="flex w-max gap-4 px-6 py-8 sm:gap-5 sm:px-10 sm:py-12 lg:grid lg:w-auto lg:grid-cols-6 lg:gap-5">
          {shots.map((src, index) => (
            <li key={src} className="w-44 shrink-0 snap-center sm:w-52 lg:w-auto">
              <div className="overflow-hidden rounded-xl bg-surface shadow-float ring-1 ring-fg/10">
                <Image
                  src={src}
                  alt={altTemplate
                    .replace("{name}", project.name)
                    .replace("{index}", String(index + 1))
                    .replace("{total}", String(shots.length))}
                  width={720}
                  height={1280}
                  sizes="(min-width: 1024px) 11rem, (min-width: 640px) 13rem, 11rem"
                  priority={index < 3}
                  className="block h-auto w-full"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
