"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { href, navItems } from "@/lib/i18n/routes";
import { profile } from "@/lib/content/site";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";

/**
 * Every prop a client component receives is serialised into the RSC payload of
 * every page. Handing the whole dictionary to the header would inline all of it
 * — twice, counting the flight data — into each of the 27 prerendered pages, so
 * the header takes only the strings it renders.
 */
export type HeaderStrings = {
  nav: Dictionary["nav"];
  theme: Dictionary["theme"];
  localeLabel: string;
  downloadCv: string;
};

export function Header({
  locale,
  strings,
}: {
  locale: Locale;
  strings: HeaderStrings;
}) {
  const nav = strings.nav;
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /*
   * The drawer stores the route it was opened on rather than a plain boolean.
   * A navigation therefore closes it as a consequence of rendering the new
   * path — no effect synchronising one piece of state against another, and no
   * frame where the drawer covers the page the visitor just moved to.
   */
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;

  const setOpen = (next: boolean) => setOpenedAt(next ? pathname : null);

  const items = navItems(locale, strings.nav);

  useEffect(() => {
    if (!open) return;

    // Captured now so the cleanup does not read a ref that may have changed.
    const toggle = toggleRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenedAt(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      // Send focus back to the control that opened the drawer.
      toggle?.focus();
    };
  }, [open]);

  const isActive = (target: string) =>
    target === href(locale, "home") ? pathname === target : pathname.startsWith(target);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-gutter">
        <Link
          href={href(locale, "home")}
          aria-label={nav.brandAria}
          className="group flex items-baseline gap-2"
        >
          <span className="font-display text-xl leading-none text-fg">
            {profile.shortName}
          </span>
          <span
            aria-hidden="true"
            className="hidden font-mono text-micro uppercase text-fg-subtle transition-colors group-hover:text-accent sm:inline"
          >
            {profile.brand}
          </span>
        </Link>

        <nav aria-label={nav.primaryNavLabel} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm transition-colors",
                      active ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume.href[locale]}
            download={profile.resume.fileName[locale]}
            className="hidden items-center gap-2 rounded-md border border-line-strong px-3 py-2 text-sm text-fg transition-colors hover:border-accent-line hover:bg-surface-hover lg:inline-flex"
          >
            <Download className="size-4" aria-hidden="true" />
            {strings.downloadCv}
          </a>

          <LocaleSwitcher locale={locale} label={strings.localeLabel} className="hidden sm:flex" />
          <ThemeToggle labels={strings.theme} />

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={nav.openMenu}
            className="inline-flex size-9 items-center justify-center rounded-md border border-line text-fg-muted transition-colors hover:border-accent-line hover:text-fg md:hidden"
          >
            <Menu className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/*
       * `inert` (rather than unmounting) keeps the drawer out of the tab order
       * and the accessibility tree while closed, while still allowing the slide
       * transition to run in both directions.
       */}
      <div
        id="mobile-nav"
        inert={!open}
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          open ? "visible" : "invisible delay-300",
        )}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 h-full w-full cursor-default bg-black/50 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-label={nav.menuTitle}
          className={cn(
            "absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col border-l border-line bg-bg shadow-float transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-5">
            <span className="font-mono text-micro uppercase text-fg-subtle">
              {nav.menuTitle}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label={nav.closeMenu}
              className="inline-flex size-9 items-center justify-center rounded-md border border-line text-fg-muted transition-colors hover:border-accent-line hover:text-fg"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label={nav.mobileNavLabel} className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="flex flex-col">
              {items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.key} className="border-b border-line last:border-0">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between py-4 font-display text-subheading transition-colors",
                        active ? "text-accent" : "text-fg hover:text-accent",
                      )}
                    >
                      {item.label}
                      {active && (
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-5">
            <LocaleSwitcher locale={locale} label={strings.localeLabel} />
            <a
              href={profile.resume.href[locale]}
              download={profile.resume.fileName[locale]}
              className="inline-flex items-center gap-2 rounded-md border border-line-strong px-3 py-2 text-sm text-fg transition-colors hover:border-accent-line"
            >
              <Download className="size-4" aria-hidden="true" />
              {strings.downloadCv}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
