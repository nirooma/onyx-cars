"use client";

import { useEffect, useId, useRef } from "react";
import { turnFrame } from "./turn-motion";

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

export function Turn() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleId = useId();
  const shotRefs = useRef<Array<HTMLImageElement | null>>([]);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const glowRef = useRef<HTMLDivElement>(null);
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

    const loadPicture = (img: HTMLImageElement, priority: "high" | "low") => {
      if (img.getAttribute("src")) return;
      const picture = img.parentElement;
      picture?.querySelectorAll("source").forEach((source) => {
        const srcset = source.getAttribute("data-srcset");
        if (srcset) source.setAttribute("srcset", srcset);
      });
      const src = img.getAttribute("data-src");
      if (!src) return;
      img.fetchPriority = priority;
      img.setAttribute("src", src);
    };

    const margin = Math.round(window.innerHeight * 1.5);
    let armed = false;
    const arm = () => {
      if (armed) return;
      armed = true;
      if (motion.matches) {
        section.querySelectorAll<HTMLImageElement>(".turn-grid img").forEach((img) => {
          loadPicture(img, "low");
        });
        return;
      }
      const first = shotRefs.current[0];
      if (!first) return;
      loadPicture(first, "high");
      const rest = () => {
        shotRefs.current.slice(1).forEach((img) => {
          if (!img) return;
          loadPicture(img, "low");
          img.decode?.().catch(() => {});
        });
      };
      const pending = first.decode?.();
      if (pending) pending.then(rest).catch(rest);
      else rest();
    };
    const early = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) arm();
      },
      { rootMargin: `0px 0px ${margin}px 0px` },
    );
    early.observe(section);

    if (motion.matches) {
      return () => {
        mobile.removeEventListener("change", syncMobile);
        early.disconnect();
      };
    }

    let frame = 0;
    const apply = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      const progress = distance <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / distance));
      const pose = turnFrame(progress, mobileRef.current, ANGLES.length);
      shotRefs.current.forEach((img, shot) => {
        const state = pose.shots[shot];
        if (img) {
          img.style.opacity = state.opacity.toFixed(3);
          img.style.transform = `translate3d(0, 0, 0) scale(${state.scale.toFixed(4)})`;
        }
        const label = labelRefs.current[shot];
        if (label) label.style.opacity = state.label.toFixed(3);
      });
      if (glowRef.current) glowRef.current.style.opacity = pose.glow.toFixed(3);
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
      <div className="turn-sticky">
        <h2 className="turn-kicker" id={titleId}>
          Stillward One, from every angle.
        </h2>
        <div className="turn-stage">
          <div className="turn-scaler">
            <div className="turn-shots" aria-hidden="true">
              <div className="turn-glow" ref={glowRef} aria-hidden="true" />
              {ANGLES.map((angle, index) => (
                <picture key={angle.id}>
                  <source type="image/avif" data-srcset={srcSet(angle.id, "avif")} />
                  <source type="image/webp" data-srcset={srcSet(angle.id, "webp")} />
                  <img
                    ref={(node) => {
                      shotRefs.current[index] = node;
                    }}
                    className={index === 0 ? "turn-shot is-first" : "turn-shot"}
                    data-src={asset(angle.id, "webp", true)}
                    alt=""
                    width={1920}
                    height={1080}
                    decoding="async"
                  />
                </picture>
              ))}
            </div>
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
                <source type="image/avif" data-srcset={srcSet(angle.id, "avif")} />
                <source type="image/webp" data-srcset={srcSet(angle.id, "webp")} />
                <img
                  data-src={asset(angle.id, "webp", true)}
                  alt={angle.alt}
                  width={1920}
                  height={1080}
                  decoding="async"
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
