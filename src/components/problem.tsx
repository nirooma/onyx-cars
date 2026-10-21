import { ProductStill } from "@/components/product-still";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/content/types";

export function Problem({ t }: { t: Dictionary["problem"] }) {
  return (
    <section id="problem" className="scroll-mt-20">
      <div className="relative">
        <div className="relative h-72 md:absolute md:inset-0 md:h-full">
          <ProductStill
            id="nightHallway"
            alt={t.imageAlt}
            fill
            sizes="100vw"
            className="object-cover object-[72%_center]"
          />
        </div>
        <div
          className="hallway-scrim pointer-events-none absolute inset-0 hidden md:block"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex min-h-0 max-w-6xl items-center px-5 py-12 sm:px-8 md:min-h-[88svh] md:py-24">
          <div className="mr-auto max-w-lg">
            <SectionHeading kicker={t.kicker} title={t.title} intro={t.intro} />
            <p className="concept-note mt-8">{t.concept}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-4 px-5 py-16 sm:px-8 md:grid-cols-3">
        {t.cards.map((card, index) => (
          <article key={card.title} className="chamfer border border-line bg-card p-6">
            <p className="font-display text-xs text-shade">0{index + 1}</p>
            <h3 className="mt-4 text-xl font-medium">{card.title}</h3>
            <p className="mt-3 leading-relaxed text-shade">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
