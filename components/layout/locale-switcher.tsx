"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/lib/i18n/config";
import { swapLocale } from "@/lib/i18n/routes";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex items-center rounded-md border border-line p-0.5",
        className,
      )}
      role="group"
      aria-label={label}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={swapLocale(pathname, code)}
            hrefLang={code}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-[0.3rem] px-2 py-1 font-mono text-[0.6875rem] font-medium uppercase transition-colors",
              active
                ? "bg-surface-strong text-fg"
                : "text-fg-subtle hover:text-fg",
            )}
          >
            {localeLabels[code].short}
            <span className="sr-only"> ({localeLabels[code].long})</span>
          </Link>
        );
      })}
    </div>
  );
}
