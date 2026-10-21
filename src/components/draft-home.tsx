import { Suspense } from "react";
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
import type { Locale } from "@/lib/i18n";

/** Full draft composition. Not mounted. Restore from here when the longer page returns. */
export function DraftHome({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <SiteHeader locale={locale} t={t.nav} />
      <main id="content">
        <Hero t={t.hero} />
        <Problem t={t.problem} />
        <HowItWorks t={t.how} />
        <Inside t={t.inside} />
        <Privacy t={t.privacy} />
        <Audiences locale={locale} homeowners={t.homeowners} centers={t.centers} />
        <Suspense fallback={null}>
          <PilotForm locale={locale} t={t.pilot} />
        </Suspense>
        <Faq t={t.faq} />
        <Contact t={t.contact} />
      </main>
      <SiteFooter locale={locale} t={t.footer} links={t.nav.links} />
    </>
  );
}
