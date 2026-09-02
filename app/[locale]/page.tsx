import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata, personJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { Hero } from "@/components/sections/hero";
import {
  Approach,
  ContactCta,
  ExperienceTeaser,
  SelectedWork,
  StackTeaser,
} from "@/components/sections/home-sections";

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
    path: "",
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <JsonLd data={personJsonLd(locale)} />
      <Hero locale={locale} dict={dict} />
      <SelectedWork locale={locale} dict={dict} />
      <Approach locale={locale} dict={dict} />
      <StackTeaser locale={locale} dict={dict} />
      <ExperienceTeaser locale={locale} dict={dict} />
      <ContactCta locale={locale} dict={dict} />
    </>
  );
}
