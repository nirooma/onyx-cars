"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";

export function SiteHeader({ locale, t }: { locale: Locale; t: Dictionary["nav"] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function switchLanguage(event: { metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean; preventDefault: () => void }, next: Locale) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const url = new URL(window.location.href);
    url.pathname = `/${next}`;
    window.location.assign(url.toString());
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors ${
        scrolled || open ? "border-line bg-page/90 backdrop-blur-md" : "border-transparent bg-page/40 backdrop-blur-sm"
      }`}
    >
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:bg-shell focus:px-3 focus:py-2 focus:text-skirt"
      >
        {t.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-8">
        <a href={`/${locale}`} className="text-shell" aria-label="Stillward">
          <Logo />
        </a>
        <nav className="ms-auto hidden items-center gap-6 lg:flex" aria-label={t.menu}>
          {t.links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-shade hover:text-shell">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-3 lg:ms-0">
          <nav aria-label={t.language} className="flex items-center gap-2 text-xs">
            <Link
              href="/he"
              hrefLang="he"
              lang="he"
              aria-current={locale === "he" ? "page" : undefined}
              onClick={(event) => switchLanguage(event, "he")}
              className={locale === "he" ? "text-shell" : "text-shade hover:text-shell"}
            >
              עברית
            </Link>
            <span aria-hidden="true" className="text-line">
              /
            </span>
            <Link
              href="/en"
              hrefLang="en"
              lang="en"
              aria-current={locale === "en" ? "page" : undefined}
              onClick={(event) => switchLanguage(event, "en")}
              className={locale === "en" ? "text-shell" : "text-shade hover:text-shell"}
            >
              English
            </Link>
          </nav>
          <Button size="lg" className="hidden sm:inline-flex" render={<a href="#pilot" />}>
            {t.cta}
          </Button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center border border-line text-shell lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="sr-only">{open ? t.close : t.menu}</span>
          </button>
        </div>
      </div>
      {open ? (
        <nav id={panelId} className="border-t border-line bg-page px-5 py-4 lg:hidden" aria-label={t.menu}>
          <ul className="grid gap-1">
            {t.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-3 text-lg"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button size="lg" className="mt-3 w-full" render={<a href="#pilot" onClick={() => setOpen(false)} />}>
            {t.cta}
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
