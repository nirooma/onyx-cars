import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Audiences } from "@/components/audiences";
import { Contact } from "@/components/contact";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Inside } from "@/components/inside";
import { PilotForm } from "@/components/pilot-form";
import { Privacy } from "@/components/privacy";
import { Problem } from "@/components/problem";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/content";
import { isLocale } from "@/lib/i18n";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const t = getDictionary(raw);

  return (
    <>
      <SiteHeader locale={raw} t={t.nav} />
      <main id="content">
        <Hero t={t.hero} />
        <Problem t={t.problem} />
        <HowItWorks t={t.how} />
        <Inside t={t.inside} />
        <Privacy t={t.privacy} />
        <Audiences locale={raw} homeowners={t.homeowners} centers={t.centers} />
        <Suspense fallback={null}>
          <PilotForm locale={raw} t={t.pilot} />
        </Suspense>
        <Faq t={t.faq} />
        <Contact t={t.contact} />
      </main>
      <SiteFooter locale={raw} t={t.footer} links={t.nav.links} />
    </>
  );
}
