import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/content/types";

export function HowItWorks({ t }: { t: Dictionary["how"] }) {
  return (
    <section id="how" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading kicker={t.kicker} title={t.title} intro={t.intro} />
        <div className="light-bar mt-12 hidden md:block" aria-hidden="true" />
        <ol className="mt-8 grid gap-8 md:mt-10 md:grid-cols-4 md:gap-6">
          {t.steps.map((step) => (
            <li key={step.n} className="border-s border-line ps-5 md:border-s-0 md:ps-0">
              <p className="font-display text-sm text-lightbar">{step.n}</p>
              <h3 className="mt-3 text-xl font-medium">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-shade">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
