"use client";

import { useEffect, useRef, useState } from "react";
import { ProductStill } from "@/components/product-still";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/content/types";
import { images, posterSrc } from "@/theme/images";

export function Inside({ t }: { t: Dictionary["inside"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const video = videoRef.current;
    const bar = barRef.current;
    if (!section || !video || !bar) return;

    let frame = 0;
    const apply = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = scrollable <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / scrollable));
      const duration = video.duration;
      if (Number.isFinite(duration) && duration > 0) {
        const next = Math.min(duration - 0.04, progress * duration);
        if (Math.abs(video.currentTime - next) > 0.03) {
          video.currentTime = next;
        }
      }
      bar.style.transform = `scaleX(${progress})`;
      if (progressRef.current) {
        progressRef.current.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
      }
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };
    const onMeta = () => apply();
    video.addEventListener("loadedmetadata", onMeta);
    video.preload = "auto";
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section id="inside" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2">
          <SectionHeading kicker={t.kicker} title={t.title} intro={`${t.body} ${t.still}`} />
          <figure>
            <div className="chamfer relative overflow-hidden bg-card">
              <ProductStill id="explodedView" alt={t.imageAlt} className="h-auto w-full" sizes="(min-width: 1024px) 40rem, 100vw" />
            </div>
            <figcaption className="concept-note mt-3">{t.concept}</figcaption>
          </figure>
        </div>
      </section>
    );
  }

  return (
    <section id="inside" ref={sectionRef} className="relative h-[170vh] scroll-mt-20 border-t border-line">
      <div className="sticky top-0 flex h-svh items-center">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <SectionHeading kicker={t.kicker} title={t.title} intro={t.body} />
            <div
              ref={progressRef}
              className="mt-8 h-2 max-w-xs"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={0}
              aria-label={t.progress}
            >
              <div className="h-px w-full bg-line" />
              <div ref={barRef} className="light-bar -mt-px origin-left rtl:origin-right" style={{ transform: "scaleX(0)" }} />
            </div>
            <p className="concept-note mt-6">{t.concept}</p>
          </div>
          <div className="chamfer overflow-hidden bg-card">
            <video
              ref={videoRef}
              className="aspect-video h-auto w-full object-contain"
              muted
              playsInline
              preload="metadata"
              poster={posterSrc("explodeVideo")}
              aria-label={t.videoLabel}
              width={images.explodeVideo.width}
              height={images.explodeVideo.height}
            >
              <source src={images.explodeVideo.src} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
