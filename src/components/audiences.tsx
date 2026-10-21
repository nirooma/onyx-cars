import { Button } from "@/components/ui/button";
import { Rich } from "@/components/rich-text";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";

export function Audiences({
  locale,
  homeowners,
  centers,
}: {
  locale: Locale;
  homeowners: Dictionary["homeowners"];
  centers: Dictionary["centers"];
}) {
  return (
    <>
      <section id="who" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-start">
          <SectionHeading kicker={homeowners.kicker} title={homeowners.title} intro={homeowners.body} />
          <ul className="grid gap-3">
            {homeowners.points.map((point) => (
              <li key={point} className="chamfer border border-line bg-card px-5 py-4 text-sm leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="centers" className="scroll-mt-20 border-t border-line bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading kicker={centers.kicker} title={centers.title} intro={centers.body} />
            <Button size="lg" className="mt-8" render={<a href={`/${locale}?as=center#pilot`} />}>
              {centers.cta}
            </Button>
          </div>
          <ul className="grid gap-3">
            {centers.points.map((point) => (
              <li key={point} className="border border-line bg-page px-5 py-4 text-sm leading-relaxed">
                <Rich text={point} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
