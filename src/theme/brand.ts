/**
 * Stillward brand files (logo final v1.0, approved by product design).
 * Source: brand/logo_final. Do not recolour the light bar or the red marks,
 * and do not use the glow version below 32 px tall.
 */
export const brand = {
  name: "Stillward",
  background: "#0B0A0D",
  /** Nav lockup, light on dark, no glow. 20–28 px tall, never under 20 px. */
  navLogo: {
    src: "/brand/stillward-nav-light-on-dark.svg",
    /** SVG viewBox size; cap height is 100 of the 147.61 units. */
    width: 940.2,
    height: 147.61,
    capRatio: 100 / 147.61,
    heightDesktop: 22,
    heightMobile: 20,
  },
  icons: {
    svg: "/favicon.svg",
    png32: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
    png512: "/icon-512.png",
  },
  og: {
    src: "/og.jpg",
    width: 1200,
    height: 630,
    alt: "Stillward logo over a concept render of the robot, front three-quarter view, lights on, on a dark background",
  },
} as const;
