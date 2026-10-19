import { Button } from "@/components/ui/button";
import { HeroMedia } from "@/components/hero-media";
import { Rich } from "@/components/rich-text";
import type { Dictionary } from "@/content/types";

export function Hero({ t }: { t: Dictionary["hero"] }) {
  return (
    <section className="relative overflow-hidden pt-16">
      <div className="facet-field pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:py-20">
        <div className="max-w-xl">
          <p className="kicker">{t.eyebrow}</p>
          <div className="light-bar mt-5 max-w-48" aria-hidden="true" />
          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-shade">
            <Rich text={t.sub} />
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<a href="#pilot" />}>
              {t.cta}
            </Button>
            <Button size="lg" variant="outline" render={<a href="#how" />}>
              {t.secondary}
            </Button>
          </div>
          <p className="mt-6 text-sm text-shade">{t.note}</p>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
            {t.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs text-shade">{fact.label}</dt>
                <dd className="mt-1 text-sm font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure className="chamfer relative bg-card">
          <HeroMedia label={t.videoLabel} />
          <figcaption className="concept-note px-4 py-3">{t.concept}</figcaption>
        </figure>
      </div>
    </section>
  );
}
