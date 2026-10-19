import type { Metadata, Viewport } from "next";
import { getDictionary } from "@/content";
import { direction, isLocale, locales, type Locale } from "@/lib/i18n";
import { brand } from "@/theme/brand";
import { fontHebrew, fontLatin, themeCss } from "@/theme/theme";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Absolute base for og:image. Set NEXT_PUBLIC_SITE_URL at build time when the site has a real host. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4317";

export const viewport: Viewport = {
  themeColor: brand.background,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "he";
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    icons: {
      icon: [
        { url: brand.icons.svg, type: "image/svg+xml" },
        { url: brand.icons.png32, type: "image/png", sizes: "32x32" },
      ],
      apple: [{ url: brand.icons.apple, sizes: "180x180", type: "image/png" }],
    },
    robots: { index: false, follow: false },
    alternates: {
      languages: {
        he: "/he",
        en: "/en",
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      siteName: "Stillward",
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
      images: [{ url: brand.og.src, width: brand.og.width, height: brand.og.height, alt: brand.og.alt, type: "image/jpeg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: brand.og.src, width: brand.og.width, height: brand.og.height, alt: brand.og.alt }],
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
