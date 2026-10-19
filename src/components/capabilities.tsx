"use client";

import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { capabilities } from "@/content/capabilities";

const SIZES = "(max-width: 860px) 100vw, 64vw";

const UNIT_TOKENS = ["87 dB(A)", "0.05–12 m", "10 Hz", "20 s", "6 min"] as const;

function unitText(token: string) {
  return token.replace(" ", "\u00A0");
}

function LiteralText({ text }: { text: string }) {
  const pattern = new RegExp(
    `(${UNIT_TOKENS.map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g",
  );
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, index) =>
        (UNIT_TOKENS as readonly string[]).includes(part) ? (
          <span key={index} className={part === "87 dB(A)" ? "cap-literal cap-red" : "cap-literal"}>
            {unitText(part)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

const THREAD_FOR_PILLAR: Record<string, number> = {
  ai: 1,
  sensors: 1,
  recog: 2,
  alerts: 3,
};

function FramePhoto({ src, alt }: { src: string; alt: string }) {
  return <Image className="cap-photo" src={src} alt={alt} fill sizes={SIZES} />;
}

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleId = useId();
  const [reveal, setReveal] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [lit, setLit] = useState<number[]>([0]);
  const [shown, setShown] = useState<Record<string, boolean>>({});

  useLayoutEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(motion.matches);
      setReveal(!motion.matches);
    };
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const pillars = [...section.querySelectorAll<HTMLElement>("[data-cap-pillar]")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("data-pillar");
          if (!id) return;
          setShown((current) => (current[id] ? current : { ...current, [id]: true }));
          const step = THREAD_FOR_PILLAR[id] ?? 0;
          setLit(Array.from({ length: step + 1 }, (_, index) => index));
        });
      },
      { threshold: 0.4 },
    );
    pillars.forEach((pillar) => observer.observe(pillar));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    let tick = 0;
    const timer = window.setInterval(() => {
      if (window.scrollY > 200 && Object.keys(shown).length > 0) return;
      tick = (tick + 1) % 4;
      setLit([tick]);
    }, 1800);
    return () => window.clearInterval(timer);
  }, [reduced, shown]);

  const ai = capabilities.pillars[0];
  const sensors = capabilities.pillars[1];
  const recog = capabilities.pillars[2];
  const alerts = capabilities.pillars[3];

  return (
    <section
      ref={sectionRef}
      className="cap-section"
      id="capabilities"
      aria-labelledby={titleId}
      data-reveal={reveal ? "" : undefined}
    >
      <div className="cap-wrap">
        <header className="cap-intro">
          <p className="cap-eyebrow cap-mono">{capabilities.eyebrow}</p>
          <h2 className="cap-headline" id={titleId}>
            {capabilities.headline[0]}
            <br />
            {capabilities.headline[1]}
          </h2>
          <p className="cap-lede">{capabilities.lede}</p>
        </header>

        <div className="cap-thread" aria-label="Night story">
          {capabilities.thread.map((label, index) => (
            <div key={label} className="cap-thread-pair">
              {index > 0 ? <span className="cap-thread-line" aria-hidden="true" /> : null}
              <div className={`cap-thread-step${lit.includes(index) ? " is-on" : ""}`}>
                <span className="cap-dot" />
                <span className="cap-mono">{label}</span>
              </div>
            </div>
          ))}
        </div>

        <article
          className={`cap-pillar${shown.ai ? " is-in" : ""}`}
          data-cap-pillar=""
          data-pillar="ai"
          id="pillar-ai"
        >
          <div className="cap-copy">
            <p className="cap-num cap-mono">{ai.eyebrow}</p>
            <h3 className="cap-title">{ai.title}</h3>
            <p className="cap-body">{ai.body}</p>
          </div>
          <div className="cap-visual">
            <div className="cap-frame">
              <FramePhoto src={ai.image} alt={ai.alt} />
              <div className="cap-overlay" aria-hidden="true">
                <span className="cap-hud cap-mono">Live · On-device</span>
                <div className="cap-box" style={{ left: "34.3%", top: "2.6%", width: "9.2%", height: "42.6%", animationDelay: "0.15s" }}>
                  <span className="cap-tag cap-mono">Person</span>
                </div>
                <div className="cap-box ignore cap-box-pet" style={{ left: "16.6%", top: "37%", width: "8.2%", height: "16.8%", animationDelay: "0.35s" }}>
                  <span className="cap-tag cap-mono">Pet · ignored</span>
                </div>
                <div className="cap-box ignore" style={{ left: "73%", top: "0%", width: "27%", height: "57%", animationDelay: "0.5s" }}>
                  <span className="cap-tag cap-tag-end cap-mono">Curtain · ignored</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article
          className={`cap-pillar reverse${shown.sensors ? " is-in" : ""}`}
          data-cap-pillar=""
          data-pillar="sensors"
          id="pillar-sensors"
        >
          <div className="cap-copy">
            <p className="cap-num cap-mono">{sensors.eyebrow}</p>
            <h3 className="cap-title">{sensors.title}</h3>
            <p className="cap-body">{sensors.body}</p>
          </div>
          <div className="cap-visual">
            <div className="cap-frame">
              <FramePhoto src={sensors.image} alt={sensors.alt} />
              <div className="cap-sensor-tags cap-mono">
                {sensors.chips.map((chip) => (
                  <span key={chip}>
                    <LiteralText text={chip} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article
          className={`cap-pillar${shown.recog ? " is-in" : ""}`}
          data-cap-pillar=""
          data-pillar="recog"
          id="pillar-recog"
        >
          <div className="cap-copy">
            <p className="cap-num cap-mono">{recog.eyebrow}</p>
            <h3 className="cap-title">{recog.title}</h3>
            <p className="cap-body">{recog.body}</p>
          </div>
          <div className="cap-visual">
            <div className="cap-frame cap-split">
              <div className="cap-half">
                <FramePhoto src={recog.family.image} alt={recog.family.alt} />
                <div className="cap-overlay" aria-hidden="true">
                  <div className="cap-box family" style={{ left: "10%", top: "2.5%", width: "20%", height: "43%", animationDelay: "0.2s" }}>
                    <span className="cap-tag cap-mono">
                      {recog.family.label.slice(0, -"Dana".length)}
                      <span className="cap-literal">Dana</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="cap-half">
                <FramePhoto src={recog.unknown.image} alt={recog.unknown.alt} />
                <div className="cap-overlay" aria-hidden="true">
                  <div className="cap-box unknown" style={{ left: "15.4%", top: "2.5%", width: "21.2%", height: "43%", animationDelay: "0.35s" }}>
                    <span className="cap-tag cap-mono">{recog.unknown.label}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article
          className={`cap-pillar reverse${shown.alerts ? " is-in" : ""}`}
          data-cap-pillar=""
          data-pillar="alerts"
          id="pillar-alerts"
        >
          <div className="cap-copy">
            <p className="cap-num cap-mono">{alerts.eyebrow}</p>
            <h3 className="cap-title">{alerts.title}</h3>
            <p className="cap-body">{alerts.body}</p>
          </div>
          <div className="cap-visual">
            <div className="cap-frame cap-phone-frame">
              <div className="cap-phone-stage">
                <div className="cap-phone">
                  <div className="cap-notch" />
                  <div className="cap-notif">
                    <div className="cap-notif-top">
                      <div className="cap-notif-icon" aria-hidden="true">
                        <span>S</span>
                      </div>
                      <span className="cap-notif-app cap-mono">Stillward</span>
                      <span className="cap-notif-time">now</span>
                    </div>
                    <p className="cap-notif-title">{alerts.notifTitle}</p>
                    <p className="cap-notif-body">{alerts.notifBody}</p>
                    <div className="cap-notif-snap">
                      <Image className="cap-photo" src={alerts.image} alt={alerts.alt} fill sizes="220px" />
                    </div>
                  </div>
                  <div className="cap-modes">
                    <p className="cap-mode cap-mono">
                      <strong>Away</strong>
                      {" — "}
                      <LiteralText text={alerts.away} />
                    </p>
                    <p className="cap-mode cap-mono">
                      <strong>Home-night</strong>
                      {" — "}
                      <LiteralText text={alerts.home} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <p className="cap-foot cap-mono">{capabilities.foot}</p>
      </div>
    </section>
  );
}
