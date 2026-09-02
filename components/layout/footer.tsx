import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { href, navItems } from "@/lib/i18n/routes";
import { profile, socials } from "@/lib/content/site";
import { socialIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/layout";

export function Footer({
  locale,
  dict,
  year,
}: {
  locale: Locale;
  dict: Dictionary;
  /**
   * Passed in rather than computed here: every page is prerendered, so a
   * `new Date()` in this component would freeze the build year into the HTML
   * and silently go stale on 1 January.
   */
  year: number;
}) {
  const items = navItems(locale, dict.nav);

  return (
    <footer className="border-t border-line bg-bg-subtle">
      <Container width="wide" className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link href={href(locale, "home")} className="font-display text-heading text-fg">
              {profile.shortName}
            </Link>
            <p className="max-w-xs text-sm text-fg-muted">{dict.footer.tagline}</p>
            <p className="flex items-center gap-2 font-mono text-micro uppercase text-fg-subtle">
              <MapPin className="size-3.5" aria-hidden="true" />
              {profile.location.city}, {profile.location.country[locale]}
            </p>
          </div>

          <nav aria-label={dict.nav.footerNavLabel} className="flex flex-col gap-4">
            <h2 className="font-mono text-micro uppercase text-fg-subtle">
              {dict.footer.navTitle}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {items.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-fg-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <h2 className="font-mono text-micro uppercase text-fg-subtle">
              {dict.footer.contactTitle}
            </h2>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent"
            >
              <Mail className="size-3.5 shrink-0" aria-hidden="true" />
              {profile.email}
            </a>
            <ul className="mt-1 flex flex-wrap gap-2">
              {socials.map((social) => {
                const Icon = socialIcon(social.id);
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="inline-flex size-9 items-center justify-center rounded-md border border-line text-fg-muted transition-colors hover:border-accent-line hover:text-accent"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      <span className="sr-only">
                        {social.label} ({dict.common.externalLink})
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-8 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. {dict.footer.brandNote}
          </p>
          <p>{dict.footer.builtWith}</p>
        </div>
      </Container>
    </footer>
  );
}
