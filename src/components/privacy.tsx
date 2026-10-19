import { Rich } from "@/components/rich-text";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/content/types";

export function Privacy({ t }: { t: Dictionary["privacy"] }) {
  return (
    <section id="privacy" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <SectionHeading kicker={t.kicker} title={t.title} intro={t.intro} />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {t.points.map((point) => (
              <li key={point.title}>
                <h3 className="text-lg font-medium">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-shade">
                  <Rich text={point.body} />
                </p>
              </li>
            ))}
          </ul>
        </div>
        <aside className="chamfer border border-line bg-card p-5 sm:p-6" aria-label={t.sketchLabel}>
          <p className="text-sm font-medium">{t.sketchLabel}</p>
          <div className="relative mt-4 aspect-video overflow-hidden bg-page" aria-hidden="true">
            <div className="packet-blur absolute inset-6" />
            <span className="absolute bottom-3 start-3 border border-line bg-page/80 px-2 py-1 text-xs text-shade">
              <Rich text={t.rows[0]?.value ?? ""} />
            </span>
          </div>
          <dl className="mt-4 grid gap-3">
            {t.rows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-line pb-2 text-sm">
                <dt className="text-shade">{row.label}</dt>
                <dd>
                  <Rich text={row.value} />
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-shade">{t.sketchNote}</p>
        </aside>
      </div>
    </section>
  );
}
