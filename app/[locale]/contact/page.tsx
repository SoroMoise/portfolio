import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { resolveLocale } from "@/lib/page-params";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { profile, socials } from "@/lib/content/site";
import { formatAbidjanTime } from "@/lib/time";
import { JsonLd } from "@/components/ui/json-ld";
import { Container, Section, SectionHeader } from "@/components/ui/layout";
import { StatusDot } from "@/components/ui/badge";
import { socialIcon } from "@/components/ui/icons";
import { LocalTime } from "@/components/ui/local-time";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/sections/contact-form";

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
    path: "/contact",
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolveLocale(params);
  const whatsapp = socials.find((s) => s.id === "whatsapp");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "" },
          { name: dict.nav.contact, path: "/contact" },
        ])}
      />

      <Section labelledBy="contact-title">
        <Container width="wide">
          <SectionHeader
            id="contact-title"
            level={1}
            eyebrow={dict.contact.eyebrow}
            title={dict.contact.title}
            lead={dict.contact.lead}
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
            <div className="flex flex-col gap-8">
              <Reveal className="flex items-start gap-3 rounded-lg border border-positive/30 bg-positive-soft p-5">
                <StatusDot className="mt-1" />
                <p className="text-sm text-fg">{dict.home.status}</p>
              </Reveal>

              <Reveal className="flex flex-col">
                <h2 className="font-mono text-micro uppercase text-fg-subtle">
                  {dict.contact.directTitle}
                </h2>

                <dl className="mt-5 divide-y divide-line border-y border-line">
                  <ContactRow
                    icon={<Mail className="size-4" aria-hidden="true" />}
                    label={dict.contact.fields.email}
                  >
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-fg transition-colors hover:text-accent"
                    >
                      {profile.email}
                    </a>
                  </ContactRow>

                  {whatsapp && (
                    <ContactRow
                      icon={<Phone className="size-4" aria-hidden="true" />}
                      label={dict.contact.whatsappNote}
                    >
                      <a
                        href={whatsapp.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fg transition-colors hover:text-accent"
                      >
                        {profile.phone}
                        <span className="sr-only"> ({dict.common.externalLink})</span>
                      </a>
                    </ContactRow>
                  )}

                  <ContactRow
                    icon={<MapPin className="size-4" aria-hidden="true" />}
                    label={dict.common.localTime}
                  >
                    <span className="text-fg">
                      {profile.location.city} ·{" "}
                      <LocalTime initial={formatAbidjanTime(new Date())} /> GMT
                    </span>
                  </ContactRow>
                </dl>
              </Reveal>

              <Reveal className="flex flex-wrap gap-2">
                {socials.map((social) => {
                  const Icon = socialIcon(social.id);
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-xs text-fg-muted transition-colors hover:border-accent-line hover:text-fg"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      {social.label}
                      <span className="sr-only"> ({dict.common.externalLink})</span>
                    </a>
                  );
                })}
              </Reveal>
            </div>

            <ContactForm
              locale={locale}
              strings={dict.contact}
              phone={profile.phoneE164}
              newTabLabel={dict.common.externalLink}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  /*
   * `dt` and `dd` sit directly inside this wrapper: a `dl` may group its pairs
   * in a `div`, but only one level deep, and only with `dt`/`dd` as children.
   * The icon is painted by the wrapper's `::before` slot instead of a sibling
   * span, which would break that grouping.
   */
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 py-4">
      <dt className="col-start-2 font-mono text-micro uppercase text-fg-subtle">{label}</dt>
      <dd className="col-start-2 text-sm">{children}</dd>
      <span aria-hidden="true" className="col-start-1 row-span-2 row-start-1 text-accent">
        {icon}
      </span>
    </div>
  );
}
