import { Button } from "@/components/ui/button";
import { Rich } from "@/components/rich-text";
import type { Dictionary } from "@/content/types";

export function Contact({ t }: { t: Dictionary["contact"] }) {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-20 sm:px-8">
        <p className="kicker">{t.kicker}</p>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h2>
        <p className="max-w-xl text-lg text-shade">
          <Rich text={t.body} />
        </p>
        <Button size="lg" variant="outline" render={<a href="#pilot" />}>
          {t.cta}
        </Button>
      </div>
    </section>
  );
}
