"use client";

import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { capabilities, capabilityEdges, capabilityNodeStyle } from "@/content/capabilities";

const EDGES = capabilityEdges();

function clamp(value: number) {
  return Math.min(95, Math.max(5, value));
}

/** Night view leads on load. The one-shot hint returns here. */
const SLIDER_REST = 70;

function NightSlider({ revealed, reduced }: { revealed: boolean; reduced: boolean }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const userMoved = useRef(false);
  const [pct, setPct] = useState(SLIDER_REST);
  const panel = capabilities.panels[1];

  useEffect(() => {
    if (!revealed || reduced || userMoved.current) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      if (userMoved.current) return;
      const t = Math.min(1, (now - start) / 1400);
      setPct(SLIDER_REST + Math.sin(t * Math.PI) * 22);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [revealed, reduced]);

  function setFromClient(clientX: number) {
    const box = sliderRef.current?.getBoundingClientRect();
    if (!box || box.width === 0) return;
    setPct(clamp(((clientX - box.left) / box.width) * 100));
  }

  return (
    <div
      ref={sliderRef}
      className="cap-slider"
      style={{ ["--cap-pct" as string]: `${pct}%` }}
      role="slider"
      tabIndex={0}
      aria-valuemin={5}
      aria-valuemax={95}
      aria-valuenow={Math.round(pct)}
      aria-orientation="horizontal"
      aria-label="Compare the night view with the light bar and the same view in the dark"
      onPointerDown={(event) => {
        userMoved.current = true;
        dragging.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        setFromClient(event.clientX);
      }}
      onPointerMove={(event) => {
        if (dragging.current) setFromClient(event.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          userMoved.current = true;
          setPct((current) => clamp(current + (event.key === "ArrowRight" ? 5 : -5)));
        }
        if (event.key === "Home") {
          event.preventDefault();
          userMoved.current = true;
          setPct(5);
        }
        if (event.key === "End") {
          event.preventDefault();
          userMoved.current = true;
          setPct(95);
        }
      }}
    >
      <Image
        className="cap-photo"
        src={panel.dark}
        alt={panel.darkAlt}
        fill
        sizes="(max-width: 900px) 100vw, 60vw"
      />
      <div className="cap-slider-lit">
        <Image className="cap-photo" src={panel.image} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" />
      </div>
      <div className="cap-slider-handle" aria-hidden="true" />
      <span className="cap-cap cap-cap-l cap-mono">Night view</span>
      <span className="cap-cap cap-cap-r cap-mono">Dark</span>
    </div>
  );
}

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleId = useId();
  const [reduced, setReduced] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [live, setLive] = useState("ai");
  const [railOn, setRailOn] = useState(false);
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
    const intro = section.querySelector<HTMLElement>("[data-cap-intro]");
    const panels = [...section.querySelectorAll<HTMLElement>("[data-cap-panel]")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const node = entry.target.getAttribute("data-node");
          if (!entry.isIntersecting || !node) return;
          setShown((current) => (current[node] ? current : { ...current, [node]: true }));
          setLive(node);
        });
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" },
    );
    panels.forEach((panel) => observer.observe(panel));
    const introObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry) setRailOn(!entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    if (intro) introObserver.observe(intro);
    return () => {
      observer.disconnect();
      introObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cap-section"
      id="capabilities"
      aria-labelledby={titleId}
      data-reveal={reveal ? "" : undefined}
    >
      <div className="cap-intro" data-cap-intro="">
        <div>
          <p className="cap-eyebrow cap-mono">{capabilities.eyebrow}</p>
          <h2 className="cap-headline" id={titleId}>
            One mind.
            <br />
            Every sense.
          </h2>
          <p className="cap-lede">{capabilities.lede}</p>
        </div>
        <div className="cap-net" aria-hidden="true">
          <svg viewBox="0 0 520 400">
            <g fill="none" stroke="rgba(242,246,255,0.18)" strokeWidth="0.9">
              {EDGES.map((edge) => (
                <path
                  key={`${edge.from}-${edge.to}`}
                  className={edge.from === live || edge.to === live ? "cap-edge is-hot" : "cap-edge"}
                  d={edge.d}
                />
              ))}
            </g>
          </svg>
          {capabilities.nodes.map((node) => (
            <div
              key={node.id}
              className={`cap-node${node.core ? " core" : ""}${live === node.id ? " is-live" : ""}`}
              style={capabilityNodeStyle(node.x, node.y)}
            >
              <div className="cap-dot" />
              <div className="cap-node-label cap-mono">{node.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`cap-rail${railOn ? " on" : ""}`} aria-hidden="true">
        <div className="cap-pill">
          {capabilities.nodes.map((node) => (
            <div key={node.id} className="cap-pill-item">
              <span className={`cap-pill-dot${node.core ? " core" : ""}${live === node.id ? " on" : ""}`} />
              <span className="cap-pill-label cap-mono">{node.name}</span>
            </div>
          ))}
        </div>
      </div>

      {capabilities.panels.map((panel) => (
        <article
          key={panel.id}
          className={`cap-panel${"reverse" in panel && panel.reverse ? " reverse" : ""}${shown[panel.id] ? " is-in" : ""}`}
          data-cap-panel=""
          data-node={panel.id}
          id={`panel-${panel.id}`}
        >
          <div className="cap-copy">
            <p className="cap-eye cap-mono">{panel.eyebrow}</p>
            <h3 className="cap-head">{panel.headline}</h3>
            <p className="cap-line">{panel.line}</p>
            <div className="cap-chips">
              {panel.chips.map((chip) => (
                <span key={chip.label} className={`cap-chip cap-mono${chip.tone === "dim" ? " dim" : ""}${chip.tone === "asp" ? " asp" : ""}`}>
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
          <div className="cap-visual">
            <div className={`cap-frame${panel.kind === "ai" || panel.kind === "privacy" ? " warm" : ""}`}>
              {panel.kind === "slider" ? (
                <NightSlider revealed={Boolean(shown[panel.id])} reduced={reduced} />
              ) : (
                <Image className="cap-photo" src={panel.image} alt={panel.alt} fill sizes="(max-width: 900px) 100vw, 60vw" />
              )}
              {panel.kind === "ai" ? (
                <div className="cap-overlay" aria-hidden="true">
                  <span className="cap-hud cap-mono">Live · On-device</span>
                  <div className="cap-box" style={{ left: "33%", top: "8%", width: "13%", height: "50%" }}>
                    <span className="cap-tag cap-mono">Person</span>
                  </div>
                  <div className="cap-box ignore" style={{ left: "11%", top: "45%", width: "12%", height: "14%" }}>
                    <span className="cap-tag cap-mono">Pet · ignored</span>
                  </div>
                  <div className="cap-box ignore" style={{ left: "72%", top: "1%", width: "27%", height: "55%" }}>
                    <span className="cap-tag cap-tag-in cap-mono">Motion · ignored</span>
                  </div>
                </div>
              ) : null}
              {panel.kind === "privacy" ? (
                <div className="cap-overlay" aria-hidden="true">
                  <div className="cap-face" style={{ left: "17%", top: "8%", width: "12%", height: "17%" }} />
                  <div className="cap-box" style={{ left: "15%", top: "8%", width: "16%", height: "50%" }}>
                    <span className="cap-tag cap-mono">Person · face masked</span>
                    <div className="cap-lock">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#F2F6FF" strokeWidth="1.8" aria-hidden="true">
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
