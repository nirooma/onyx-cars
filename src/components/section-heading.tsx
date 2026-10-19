import { Rich } from "@/components/rich-text";

export function SectionHeading({
  kicker,
  title,
  intro,
  id,
}: {
  kicker: string;
  title: string;
  intro?: string;
  id?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="kicker">{kicker}</p>
      <div className="light-bar mt-4 max-w-40" aria-hidden="true" />
      <h2 id={id} className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-lg leading-relaxed text-shade">
          <Rich text={intro} />
        </p>
      ) : null}
    </div>
  );
}
