"use client";

import { useEffect, useRef, useState } from "react";
import {
  HERO_MOBILE_MQ,
  frameIndexForProgress,
  rotateFrameSrc,
  rotateMedia,
  type RotateCut,
} from "@/theme/images";

function paintContain(canvas: HTMLCanvasElement, image: HTMLImageElement, background: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
  const sourceWidth = image.naturalWidth;
  const sourceHeight = image.naturalHeight;
  if (!sourceWidth || !sourceHeight) return;
  const scale = Math.min(width / sourceWidth, height / sourceHeight);
  const destWidth = sourceWidth * scale;
  const destHeight = sourceHeight * scale;
  ctx.drawImage(image, (width - destWidth) / 2, (height - destHeight) / 2, destWidth, destHeight);
}

function nearestLoaded(cache: (HTMLImageElement | undefined)[], index: number) {
  if (cache[index]) return cache[index];
  for (let distance = 1; distance < cache.length; distance += 1) {
    if (index - distance >= 0 && cache[index - distance]) return cache[index - distance];
    if (index + distance < cache.length && cache[index + distance]) return cache[index + distance];
  }
  return undefined;
}

/**
 * Sticky pin. Scroll progress maps onto frame 0..count-1.
 * Mounted only after `rotateSequenceReady()` is true.
 */
export function RotateSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cut, setCut] = useState<RotateCut | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const width = window.matchMedia(HERO_MOBILE_MQ);
    const sync = () => {
      setReduced(motion.matches);
      setCut(width.matches ? "mobile" : "desktop");
    };
    sync();
    motion.addEventListener("change", sync);
    width.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      width.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!cut || reduced) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const cache: (HTMLImageElement | undefined)[] = Array.from({ length: rotateMedia.frameCount });
    let cancelled = false;
    let scheduled = false;
    let wanted = 0;

    const draw = (index: number) => {
      const image = nearestLoaded(cache, index);
      if (!image) return;
      paintContain(canvas, image, rotateMedia.background);
    };

    const apply = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = scrollable <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / scrollable));
      wanted = frameIndexForProgress(progress, rotateMedia.frameCount);
      draw(wanted);
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        if (!cancelled) apply();
      });
    };

    const load = (index: number) =>
      new Promise<void>((resolve) => {
        const image = new Image();
        image.decoding = "async";
        image.onload = () => {
          if (!cancelled) cache[index] = image;
          resolve();
        };
        image.onerror = () => resolve();
        image.src = rotateFrameSrc(cut, index);
      });

    const resize = new ResizeObserver(() => onScroll());
    resize.observe(canvas);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    void (async () => {
      await load(0);
      if (cancelled) return;
      draw(wanted);
      for (let index = 1; index < rotateMedia.frameCount; index += 1) {
        if (cancelled) return;
        await load(index);
        if (Math.abs(index - wanted) <= 1) draw(wanted);
      }
    })();

    onScroll();

    return () => {
      cancelled = true;
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [cut, reduced]);

  const poster = cut ? rotateMedia[cut].poster : undefined;

  return (
    <section
      id="rotate"
      ref={sectionRef}
      className="rotate-pin"
      style={{
        background: rotateMedia.background,
        ["--rotate-pin" as string]: `${rotateMedia.pinLengthVh}vh`,
      }}
      aria-label="Concept render of the robot turning"
    >
      <div className="rotate-sticky">
        <canvas ref={canvasRef} className="rotate-canvas" role="img" aria-label="Concept render of the robot turning" />
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element -- sequence poster, shown only for reduced motion
          <img className="rotate-poster" src={poster} alt="Concept render of the robot turning" />
        ) : null}
      </div>
    </section>
  );
}
