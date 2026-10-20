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
  posterDark: {
    kind: "image" as const,
    src: "/assets/product/poster-dark.jpg",
    width: 1920,
    height: 1080,
  },
  heroVideo: {
    kind: "video" as const,
    src: "/assets/product/hero-poweron-1080p.mp4",
    poster: "posterDark" as const,
    width: 1920,
    height: 1080,
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
 * names. The player reads breakpoints, posters, and lightOnTime from here.
 *
 * Both cuts list WebM first with the MP4 as fallback. Mobile (max-width 1023px)
 * uses the portrait files. Copy fades in at lightOnTime, when the bar is fully on.
 * Reduced motion, a stall, or blocked autoplay shows the lit still.
 */
export const heroMedia = {
  desktopVideo: {
    webm: "/assets/product/hero-poweron-1080p.webm",
    src: "/assets/product/hero-poweron-1080p.mp4",
    width: 1920,
    height: 1080,
  },
  mobileVideo: {
    webm: "/assets/product/hero-poweron-mobile.webm",
    src: "/assets/product/hero-poweron-mobile.mp4",
    width: 1080,
    height: 1350,
  },
  poster: {
    src: "/assets/product/poster-dark.jpg",
    width: 1920,
    height: 1080,
  },
  posterMobile: {
    src: "/assets/product/poster-dark-mobile.jpg",
    width: 1080,
    height: 1350,
  },
  finalFrame: {
    src: "/assets/product/final-lit.jpg",
    width: 1920,
    height: 1080,
  },
  finalFrameMobile: {
    src: "/assets/product/final-lit-mobile.jpg",
    width: 1080,
    height: 1350,
  },
  /** Seconds from the start when the light bar is fully on. Copy starts here. */
  lightOnTime: 1.9,
} as const;

/** Portrait cut, including the 1023px boundary. */
export const HERO_MOBILE_MQ = "(max-width: 1023px)";
