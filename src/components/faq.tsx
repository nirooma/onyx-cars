import { Rich } from "@/components/rich-text";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/content/types";

export function Faq({ t }: { t: Dictionary["faq"] }) {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.1fr)]">
        <SectionHeading kicker={t.kicker} title={t.title} />
        <div className="border-t border-line">
          {t.items.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-lg font-medium">
                {item.q}
                <span className="font-display text-shade transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="pb-5 leading-relaxed text-shade">
                <Rich text={item.a} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
