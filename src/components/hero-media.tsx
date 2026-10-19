"use client";

import { useEffect, useRef } from "react";
import { images, posterSrc } from "@/theme/images";

export function HeroMedia({ label }: { label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const poster = posterSrc("heroVideo");

  useEffect(() => {
    const video = videoRef.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (!video) return;
      if (media.matches) {
        video.pause();
        return;
      }
      video.play().catch(() => undefined);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={videoRef}
      className="aspect-video h-auto w-full bg-page object-cover"
      muted
      playsInline
      loop
      preload="none"
      poster={poster}
      aria-label={label}
      width={images.heroVideo.width}
      height={images.heroVideo.height}
    >
      <source src={images.heroVideo.src} type="video/mp4" />
    </video>
  );
}
