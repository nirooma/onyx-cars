import Link from "next/link";
import { HeroReveal } from "@/components/hero-reveal";
import { Logo } from "@/components/logo";
import { getDictionary } from "@/content";

const pilotMail = "mailto:?subject=NightGuard%20beta%20%5BTBD%5D";

export function Landing() {
  const t = getDictionary("en").hero;

  return (
    <div className="landing-root">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:bg-shell focus:px-3 focus:py-2 focus:text-skirt"
      >
        Skip to content
      </a>
      <header className="landing-nav">
        <Link href="/" className="text-shell" aria-label="NightGuard">
          <Logo />
        </Link>
        <a className="btn btn-primary" href={pilotMail}>
          {t.cta} [TBD]
        </a>
      </header>
      <main id="content" className="hero-screen">
        <HeroReveal
          eyebrow={t.eyebrow}
          title={t.title}
          support={t.sub}
          cta={`${t.cta} [TBD]`}
          href={pilotMail}
          videoLabel={t.videoLabel}
          stillAlt="Concept render of the robot, front three-quarter view, on a dark background"
        />
      </main>
      <footer className="landing-foot">
        <p>
          {t.concept}. NightGuard is a working name.
        </p>
      </footer>
    </div>
  );
}
