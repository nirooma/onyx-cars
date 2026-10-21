"use client";

import { useEffect, useRef, useState } from "react";
import { heroMedia } from "@/theme/images";

const STALL_MS = 2500;

export function HeroReveal({
  eyebrow,
  title,
  support,
  stat,
  statSource,
  statHref,
  cta,
  href,
  videoLabel,
  stillAlt,
}: {
  eyebrow: string;
  title: string;
  support: string;
  stat?: string;
  statSource?: string;
  statHref?: string;
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
  const [useStill, setUseStill] = useState(false);
  const [presented, setPresented] = useState(false);
  const [cut, setCut] = useState<"desktop" | "mobile" | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const next = media.matches;
      setReduced(next);
      if (next) {
        setUseStill(true);
        setCopyOn(true);
      }
      setBooted(true);
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setCut(mq.matches ? "mobile" : "desktop");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!booted || reduced || useStill || !cut) return;
    const video = videoRef.current;
    if (!video) return;

    let revealed = false;
    let stopped = false;
    const show = () => {
      if (revealed) return;
      revealed = true;
      setCopyOn(true);
    };
    const giveUp = () => {
      if (stopped || video.ended) return;
      stopped = true;
      setUseStill(true);
      show();
    };
    const onTime = () => {
      if (video.currentTime >= heroMedia.lightOnTime) show();
    };
    const hold = () => {
      video.pause();
      setHolding(true);
      show();
    };

    let last = -1;
    let progressedAt = performance.now();
    const mark = () => {
      if (video.currentTime > last + 0.01) {
        last = video.currentTime;
        progressedAt = performance.now();
      }
      onTime();
    };
    const watch = window.setInterval(() => {
      if (stopped || video.ended) return;
      if (performance.now() - progressedAt > STALL_MS) giveUp();
    }, 400);

    const onPresented = () => setPresented(true);
    video.addEventListener("timeupdate", mark);
    video.addEventListener("seeked", onTime);
    video.addEventListener("loadeddata", onPresented);
    video.addEventListener("playing", onPresented);
    video.addEventListener("ended", hold);
    video.addEventListener("error", giveUp);

    let frame = 0;
    const tick = () => {
      if (stopped) return;
      mark();
      if (!video.paused && !video.ended) frame = requestAnimationFrame(tick);
    };
    const played = video.play();
    played.then(() => {
      frame = requestAnimationFrame(tick);
    }).catch(() => giveUp());

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      window.clearInterval(watch);
      video.removeEventListener("timeupdate", mark);
      video.removeEventListener("seeked", onTime);
      video.removeEventListener("loadeddata", onPresented);
      video.removeEventListener("playing", onPresented);
      video.removeEventListener("ended", hold);
      video.removeEventListener("error", giveUp);
    };
  }, [booted, reduced, useStill, cut]);

  const showVideo = booted && !reduced && !useStill && cut !== null;
  const showFinal = holding || useStill || reduced;
  const showPoster = !showFinal && !presented;
  const plateAlt = showFinal ? stillAlt : "";
  const sourceParts = statSource?.split("Jan–Jun");

  return (
    <>
      <div className={`hero-reveal-copy${copyOn || reduced ? " is-in" : ""}`}>
        <p className="eyebrow">{eyebrow}</p>
        <div className="light-bar hero-bar" aria-hidden="true" />
        <h1 className="hero-title">
          {title.split(/(?<=\.)\s+/).map((line, index, lines) => (
            <span className="hero-line hero-keep" key={line}>
              {line}
              {index < lines.length - 1 ? " " : null}
            </span>
          ))}
        </h1>
        <p className="hero-support">{support}</p>
        {stat ? (
          <p className="hero-stat">
            {stat}
            {statSource && statHref ? (
              <a className="hero-stat-source" href={statHref} target="_blank" rel="noopener">
                {sourceParts && sourceParts.length === 2 ? (
                  <>
                    {sourceParts[0]}
                    <span className="hero-nobreak">Jan–Jun</span>
                    {sourceParts[1]}
                  </>
                ) : (
                  statSource
                )}
              </a>
            ) : null}
          </p>
        ) : null}
        <div className="hero-actions">
          <a className="btn btn-primary" href={href}>
            {cta}
          </a>
        </div>
      </div>
      <figure className="hero-visual">
        <div className={`hero-video-wrap${showPoster ? " is-poster" : ""}${showFinal ? " is-hold" : ""}`}>
          {showVideo ? (
            <video
              key={cut}
              ref={videoRef}
              className="hero-video"
              muted
              playsInline
              autoPlay
              preload="auto"
              poster={cut === "mobile" ? heroMedia.posterMobile.src : heroMedia.poster.src}
              width={cut === "mobile" ? heroMedia.mobileVideo.width : heroMedia.desktopVideo.width}
              height={cut === "mobile" ? heroMedia.mobileVideo.height : heroMedia.desktopVideo.height}
              aria-label={videoLabel}
            >
              {cut === "mobile" ? (
                <>
                  <source src={heroMedia.mobileVideo.webm} type="video/webm" />
                  <source src={heroMedia.mobileVideo.src} type="video/mp4" />
                </>
              ) : (
                <>
                  <source src={heroMedia.desktopVideo.webm} type="video/webm" />
                  <source src={heroMedia.desktopVideo.src} type="video/mp4" />
                </>
              )}
            </video>
          ) : null}
          {/* eslint-disable-next-line @next/next/no-img-element -- dark first frame, hidden once the film is showing */}
          <img
            className="hero-plate hero-poster hero-plate-desktop"
            src={heroMedia.poster.src}
            alt=""
            width={heroMedia.poster.width}
            height={heroMedia.poster.height}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- portrait dark first frame */}
          <img
            className="hero-plate hero-poster hero-plate-mobile"
            src={heroMedia.posterMobile.src}
            alt=""
            width={heroMedia.posterMobile.width}
            height={heroMedia.posterMobile.height}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- lit hold, full brightness, no fade */}
          <img
            className="hero-plate hero-final hero-plate-desktop"
            src={heroMedia.finalFrame.src}
            alt={plateAlt}
            width={heroMedia.finalFrame.width}
            height={heroMedia.finalFrame.height}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- portrait lit hold */}
          <img
            className="hero-plate hero-final hero-plate-mobile"
            src={heroMedia.finalFrameMobile.src}
            alt=""
            width={heroMedia.finalFrameMobile.width}
            height={heroMedia.finalFrameMobile.height}
          />
        </div>
      </figure>
    </>
  );
}
