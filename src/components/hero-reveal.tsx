"use client";

import { useEffect, useRef, useState } from "react";
import { heroMedia, HERO_VIDEO_SCALE } from "@/theme/images";

const COPY_DELAY_S = 0.4;

export function HeroReveal({
  eyebrow,
  title,
  support,
  cta,
  href,
  videoLabel,
  stillAlt,
}: {
  eyebrow: string;
  title: string;
  support: string;
  cta: string;
  href: string;
  videoLabel: string;
  stillAlt: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [booted, setBooted] = useState(false);
  const [copyOn, setCopyOn] = useState(false);
  const [holding, setHolding] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    setBooted(true);
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!booted || reduced) return;
    const video = videoRef.current;
    if (!video) return;

    let revealed = false;
    const show = () => {
      if (revealed) return;
      revealed = true;
      setCopyOn(true);
    };
    const revealAt = heroMedia.lightOnTime + COPY_DELAY_S;
    const onTime = () => {
      if (video.currentTime >= revealAt) show();
    };
    const hold = () => {
      video.pause();
      if (Number.isFinite(video.duration) && video.duration > 0) {
        const frame = Math.max(0, video.duration - 0.04);
        if (Math.abs(video.currentTime - frame) > 0.08) video.currentTime = frame;
      }
      setHolding(true);
      show();
    };
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended", hold);
    const fallback = window.setTimeout(show, (revealAt + 1.5) * 1000);
    const played = video.play();
    played.catch(() => {
      window.clearTimeout(fallback);
      window.setTimeout(show, 700);
    });
    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("ended", hold);
      window.clearTimeout(fallback);
    };
  }, [booted, reduced]);

  const cap = Math.round(heroMedia.desktopVideo.width * HERO_VIDEO_SCALE);
  const showVideo = booted && !reduced;

  return (
    <>
      <div className={`hero-reveal-copy${copyOn || reduced ? " is-in" : ""}`}>
        <p className="eyebrow">{eyebrow}</p>
        <div className="light-bar hero-bar" aria-hidden="true" />
        <h1 className="hero-title">{title}</h1>
        <p className="hero-support">{support}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={href}>
            {cta}
          </a>
        </div>
      </div>
      <figure className="hero-visual" style={{ ["--hero-cap" as string]: String(cap) }}>
        {showVideo ? (
          <div className="hero-video-wrap">
            <video
              ref={videoRef}
              className="hero-video"
              muted
              playsInline
              autoPlay
              preload="auto"
              poster={heroMedia.poster.src}
              width={heroMedia.desktopVideo.width}
              height={heroMedia.desktopVideo.height}
              aria-label={videoLabel}
            >
              <source
                media="(max-width: 767px)"
                src={heroMedia.mobileVideo.webm}
                type="video/webm"
              />
              <source
                media="(max-width: 767px)"
                src={heroMedia.mobileVideo.src}
                type="video/mp4"
              />
              <source src={heroMedia.desktopVideo.webm} type="video/webm" />
              <source src={heroMedia.desktopVideo.src} type="video/mp4" />
            </video>
            {/* eslint-disable-next-line @next/next/no-img-element -- overlays the video at the same pixels */}
            <img
              className={holding ? "hero-final is-on" : "hero-final"}
              src={heroMedia.finalFrame.src}
              alt=""
              width={heroMedia.finalFrame.width}
              height={heroMedia.finalFrame.height}
            />
          </div>
        ) : (
          <div className="hero-still-wrap">
            <div className="hero-still-glow" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element -- transparent still, kept unoptimized */}
            <img
              className="hero-still"
              src={reduced ? heroMedia.reducedMotionStill.src : heroMedia.poster.src}
              alt={reduced ? stillAlt : ""}
              width={reduced ? heroMedia.reducedMotionStill.width : heroMedia.poster.width}
              height={reduced ? heroMedia.reducedMotionStill.height : heroMedia.poster.height}
            />
          </div>
        )}
      </figure>
    </>
  );
}
