import { Geist, Heebo } from "next/font/google";

/**
 * Visual language for NightGuard.
 *
 * Product design owns this file. Change colors, the light-bar accent,
 * chamfer size, or fonts here. Components read the CSS variables and
 * Tailwind tokens that this module emits. They do not hard-code a palette.
 *
 * Specified shell, skirt, page, card, light bar, and alert values stay
 * as given. Alpha mixes below are the same hues, used for lines and glow.
 * `--on-alert` is white so label text stays readable on the red hover.
 */

export const theme = {
  color: {
    shell: "#EDEDEB",
    shellShade: "#C9CACC",
    skirt: "#141416",
    page: "#0B0B0D",
    card: "#1C1D20",
    lightBar: "#F2F6FF",
    alert: "#E5262B",
    onAlert: "#FFFFFF",
  },
  chamfer: "10px",
  font: {
    /** Crisp Latin. Swap the next/font call below to change it. */
    latin: "Geist",
    /** Hebrew UI. Swap the next/font call below to change it. */
    hebrew: "Heebo",
  },
} as const;

export const fontLatin = Geist({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

export const fontHebrew = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hebrew",
  display: "swap",
});

const line = "rgba(237, 237, 235, 0.16)";
const lightGlow = "rgba(242, 246, 255, 0.72)";
const facet = "rgba(237, 237, 235, 0.055)";

/** Injected on :root. This is the only runtime copy of the palette. */
export const themeCss = `:root {
  --ng-shell: ${theme.color.shell};
  --ng-shade: ${theme.color.shellShade};
  --ng-skirt: ${theme.color.skirt};
  --ng-page: ${theme.color.page};
  --ng-card: ${theme.color.card};
  --ng-light: ${theme.color.lightBar};
  --ng-alert: ${theme.color.alert};
  --ng-on-alert: ${theme.color.onAlert};
  --ng-line: ${line};
  --ng-chamfer: ${theme.chamfer};
  --ng-glow: 0 0 10px ${lightGlow}, 0 0 28px ${lightGlow};
  --ng-facet: ${facet};
  --background: var(--ng-page);
  --foreground: var(--ng-shell);
  --card: var(--ng-card);
  --card-foreground: var(--ng-shell);
  --primary: var(--ng-shell);
  --primary-foreground: var(--ng-skirt);
  --secondary: var(--ng-card);
  --secondary-foreground: var(--ng-shell);
  --muted: var(--ng-card);
  --muted-foreground: var(--ng-shade);
  --accent: var(--ng-card);
  --accent-foreground: var(--ng-shell);
  --destructive: var(--ng-alert);
  --border: var(--ng-line);
  --input: var(--ng-line);
  --ring: var(--ng-light);
  --radius: 0px;
  color-scheme: dark;
}`;
