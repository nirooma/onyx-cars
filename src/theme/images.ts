/**
 * Product media manifest.
 *
 * Drop a new render or video into /public/assets/product and update the
 * matching entry here. Components import `images` and never hard-code paths.
 *
 * heroPoster is the original studio front 3/4 still. The landing hero does
 * not use it directly; see `heroMedia` below.
 * nightHallway is the indoor night plate. explodedView is the open-shell
 * still and the poster for the scroll video. Do not add part-label art.
 */

export const images = {
  heroPoster: {
    kind: "image" as const,
    src: "/assets/product/selected-design.jpg",
    width: 1280,
    height: 720,
  },
  nightHallway: {
    kind: "image" as const,
    src: "/assets/product/night-hallway.jpg",
    width: 1280,
    height: 720,
  },
  explodedView: {
    kind: "image" as const,
    src: "/assets/product/exploded-view.jpg",
    width: 1280,
    height: 720,
  },
  heroVideo: {
    kind: "video" as const,
    src: "/assets/product/hero-reveal.mp4",
    poster: "heroPoster" as const,
    width: 848,
    height: 480,
  },
  explodeVideo: {
    kind: "video" as const,
    src: "/assets/product/scroll-explode.mp4",
    poster: "explodedView" as const,
    width: 848,
    height: 480,
  },
} as const;

export type ImageId = keyof typeof images;

export function posterSrc(id: "heroVideo" | "explodeVideo") {
  const posterId = images[id].poster;
  return images[posterId].src;
}

/**
 * Power-on hero. Swap the film by editing this object and the files it
 * names. Nothing else in the player needs to change.
 *
 * mobileVideo may point at the desktop file until a portrait cut exists.
 * The player selects it with a portrait media query.
 * Copy fades in 0.4s after lightOnTime.
 */
export const heroMedia = {
  desktopVideo: {
    src: "/assets/product/hero-reveal.mp4",
    webm: "/assets/product/hero-reveal.webm",
    width: 848,
    height: 480,
  },
  mobileVideo: {
    src: "/assets/product/hero-reveal.mp4",
    webm: "/assets/product/hero-reveal.webm",
    width: 848,
    height: 480,
  },
  poster: {
    src: "/assets/product/hero-reveal-poster.jpg",
    width: 848,
    height: 480,
  },
  finalFrame: {
    src: "/assets/product/hero-reveal-final.jpg",
    width: 848,
    height: 480,
  },
  /** Seconds from the start when the light bar is visibly on. */
  lightOnTime: 2.1,
  reducedMotionStill: {
    src: "/assets/product/hero-still.webp",
    width: 1124,
    height: 546,
  },
} as const;

/** Do not draw the current low-res film larger than this multiple of its width. */
export const HERO_VIDEO_SCALE = 1.1;
