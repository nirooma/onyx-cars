import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { direction, isLocale, locales, type Locale } from "@/lib/i18n";
import { fontHebrew, fontLatin, themeCss } from "@/theme/theme";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "he";
  const t = getDictionary(locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    robots: { index: false, follow: false },
    alternates: {
      languages: {
        he: "/he",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "he";
  const dir = direction(locale);
  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontHebrew.variable} ${fontLatin.variable}`}
      suppressHydrationWarning
    >
      <body className={`${locale === "en" ? "font-display" : "font-sans"} antialiased`}>
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        {children}
      </body>
    </html>
  );
}
