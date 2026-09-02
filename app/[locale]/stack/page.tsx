import type { Metadata } from "next";
import { resolveLocale } from "@/lib/page-params";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { stack, techLabel } from "@/lib/content/stack";
import { JsonLd } from "@/components/ui/json-ld";
import { Container, Section, SectionHeader } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

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
    path: "/stack",
    title: dict.meta.stack.title,
    description: dict.meta.stack.description,
  });
}

export default async function StackPage({
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
          { name: dict.nav.stack, path: "/stack" },
        ])}
      />

      <Section labelledBy="stack-title">
        <Container width="wide">
          <SectionHeader
            id="stack-title"
            level={1}
            eyebrow={dict.stack.eyebrow}
            title={dict.stack.title}
            lead={dict.stack.lead}
          />

          <div className="mt-16 flex flex-col gap-16">
            {stack.map((group) => (
              <section key={group.id} aria-labelledby={`stack-${group.id}`}>
                <Reveal className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
                  <div className="flex items-baseline gap-3 lg:sticky lg:top-24 lg:block lg:self-start">
                    <h2
                      id={`stack-${group.id}`}
                      className="font-display text-heading text-fg"
                    >
                      {group.label[locale]}
                    </h2>
                    <p className="font-mono text-micro uppercase text-fg-subtle lg:mt-2">
                      {String(group.items.length).padStart(2, "0")}
                    </p>
                  </div>

                  <dl className="border-t border-line">
                    {group.items.map((item) => (
                      <div
                        key={item.name}
                        className="grid gap-1 border-b border-line py-6 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-8"
                      >
                        <dt className="font-mono text-sm text-fg">{techLabel(item, locale)}</dt>
                        <dd className="text-sm leading-relaxed text-fg-muted">
                          {item.use[locale]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
