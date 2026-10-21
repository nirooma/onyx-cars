import { Logo } from "@/components/logo";
import { Rich } from "@/components/rich-text";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";

export function SiteFooter({ locale, t, links }: { locale: Locale; t: Dictionary["footer"]; links: Dictionary["nav"]["links"] }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <a href={`/${locale}`} className="text-shell">
            <Logo />
          </a>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-shade">
            <Rich text={t.working} /> {t.blurb}
          </p>
          <p className="concept-note mt-4">{t.concept}</p>
        </div>
        <nav aria-label={t.place} className="grid grid-cols-2 gap-2 text-sm">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-shade hover:text-shell">
              {link.label}
            </a>
          ))}
          <a href="#pilot" className="text-shade hover:text-shell">
            {locale === "he" ? "פיילוט" : "Pilot"}
          </a>
          <a href="#contact" className="text-shade hover:text-shell">
            {locale === "he" ? "יצירת קשר" : "Contact"}
          </a>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-shade sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            {t.place}
            <span aria-hidden="true"> · </span>
            {t.prototype}
          </p>
          <p>
            <Rich text={t.rights} />
          </p>
        </div>
      </div>
    </footer>
  );
}
