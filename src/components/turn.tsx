"use client";

import { useEffect, useId, useRef } from "react";

const ANGLES = [
  {
    id: "front-three-quarter",
    label: "Front three-quarter",
    alt: "Concept render of the robot, front three-quarter view",
  },
  {
    id: "side",
    label: "Side",
    alt: "Concept render of the robot, side view",
  },
  {
    id: "rear-three-quarter",
    label: "Rear three-quarter",
    alt: "Concept render of the robot, rear three-quarter view",
  },
  {
    id: "top-three-quarter",
    label: "Top three-quarter",
    alt: "Concept render of the robot, top three-quarter view",
  },
  {
    id: "front",
    label: "Front",
    alt: "Concept render of the robot, front view",
  },
] as const;

const GRID = ANGLES.slice(1);

function asset(id: string, kind: "avif" | "webp", doubled: boolean) {
  return `/assets/product/turn/${id}${doubled ? "@2x" : ""}.${kind}`;
}

function srcSet(id: string, kind: "avif" | "webp") {
  return `${asset(id, kind, false)} 1x, ${asset(id, kind, true)} 2x`;
}

function smooth(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

export function Turn() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleId = useId();
  const shotRefs = useRef<Array<HTMLImageElement | null>>([]);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const mobileRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 768px)");
    const syncMobile = () => {
      mobileRef.current = mobile.matches;
    };
    syncMobile();
    mobile.addEventListener("change", syncMobile);

    let armed = false;
    const arm = () => {
      if (armed) return;
      armed = true;
      shotRefs.current.slice(1).forEach((img) => {
        if (!img) return;
        img.decode?.().catch(() => {});
      });
    };
    const early = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) arm();
      },
      { rootMargin: "100% 0px" },
    );
    early.observe(section);

    if (motion.matches) {
      return () => {
        mobile.removeEventListener("change", syncMobile);
        early.disconnect();
      };
    }

    const steps = ANGLES.length - 1;
    let frame = 0;
    const apply = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      const progress = distance <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / distance));
      const narrow = mobileRef.current;
      const hold = narrow ? 0.74 : 0.6;
      const shift = narrow ? 5 : 12;
      const grow = narrow ? 0.01 : 0.026;
      const x = progress * steps;
      const index = Math.min(steps - 1, Math.floor(x));
      const local = x >= steps ? 1 : x - index;
      const fade = local <= hold ? 0 : smooth((local - hold) / (1 - hold));

      shotRefs.current.forEach((img, shot) => {
        const label = labelRefs.current[shot];
        let opacity = 0;
        let y = 0;
        let scale = 1;
        if (progress >= 1 && shot === steps) {
          opacity = 1;
        } else if (shot === index) {
          opacity = 1 - fade;
          y = fade * -shift;
          scale = 1 + fade * grow;
        } else if (shot === index + 1) {
          opacity = fade;
          y = (1 - fade) * shift;
          scale = 1 + grow - fade * grow;
        }
        if (img) {
          img.style.opacity = opacity.toFixed(3);
          img.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
        }
        if (label) label.style.opacity = opacity.toFixed(3);
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      mobile.removeEventListener("change", syncMobile);
      early.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="turn-section" ref={sectionRef} aria-labelledby={titleId}>
      <link
        rel="preload"
        as="image"
        href={asset(ANGLES[0].id, "avif", true)}
        type="image/avif"
        imageSrcSet={srcSet(ANGLES[0].id, "avif")}
      />
      <div className="turn-sticky">
        <h2 className="turn-kicker" id={titleId}>
          Stillward One, from every angle.
        </h2>
        <div className="turn-stage">
          <div className="turn-glow" aria-hidden="true" />
          <div className="turn-shots" aria-hidden="true">
            {ANGLES.map((angle, index) => (
              <picture key={angle.id}>
                <source type="image/avif" srcSet={srcSet(angle.id, "avif")} />
                <source type="image/webp" srcSet={srcSet(angle.id, "webp")} />
                <img
                  ref={(node) => {
                    shotRefs.current[index] = node;
                  }}
                  className={index === 0 ? "turn-shot is-first" : "turn-shot"}
                  src={asset(angle.id, "webp", true)}
                  alt=""
                  width={1920}
                  height={1080}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "low"}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </picture>
            ))}
          </div>
          <p className="turn-labels" aria-hidden="true">
            {ANGLES.map((angle, index) => (
              <span
                key={angle.id}
                ref={(node) => {
                  labelRefs.current[index] = node;
                }}
                className={index === 0 ? "turn-label is-first" : "turn-label"}
              >
                {angle.label}
              </span>
            ))}
          </p>
        </div>
        <div className="turn-grid">
          {GRID.map((angle) => (
            <figure key={angle.id}>
              <picture>
                <source type="image/avif" srcSet={srcSet(angle.id, "avif")} />
                <source type="image/webp" srcSet={srcSet(angle.id, "webp")} />
                <img
                  src={asset(angle.id, "webp", true)}
                  alt={angle.alt}
                  width={1920}
                  height={1080}
                  decoding="async"
                  loading="lazy"
                />
              </picture>
              <figcaption>{angle.label}</figcaption>
            </figure>
          ))}
        </div>
        <p className="concept-note turn-note">Concept renders.</p>
      </div>
    </section>
  );
}
