import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { getDictionary } from "@/content";
import { images } from "@/theme/images";

const pilotMail = "mailto:?subject=NightGuard%20pilot%20%5BTBD%5D";

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
        <div className="hero-copy">
          <p className="eyebrow rise rise-1">{t.eyebrow}</p>
          <div className="light-bar hero-bar" aria-hidden="true" />
          <h1 className="hero-title rise rise-3">{t.title}</h1>
          <p className="hero-support rise rise-4">
            An early prototype that patrols the entry floor at night, then checks the zone where an alarm fired.
          </p>
          <div className="hero-actions rise rise-5">
            <a className="btn btn-primary" href={pilotMail}>
              {t.cta} [TBD]
            </a>
          </div>
        </div>
        <figure className="hero-visual rise rise-6">
          <div className="hero-glow" aria-hidden="true" />
          <Image
            src={images.heroPoster.src}
            alt="Concept render of the robot from the front three-quarter view, white faceted shell, light bar on, against a dark background"
            width={images.heroPoster.width}
            height={images.heroPoster.height}
            priority
            quality={95}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="hero-product"
          />
          <div className="hero-reflect" aria-hidden="true" />
        </figure>
      </main>
      <footer className="landing-foot">
        <p>
          {t.concept}. NightGuard is a working name.
        </p>
      </footer>
    </div>
  );
}
