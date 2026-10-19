/**
 * Product media manifest.
 *
 * Drop a new render or video into /public/assets/product and update the
 * matching entry here. Components import `images` and never hard-code paths.
 *
 * heroPoster is the studio front 3/4 still (poster + reduced-motion
 * fallback). The file is graded so the faceted shell reads white on #0B0B0D.
 * nightHallway is the indoor night plate. explodedView is the open-shell
 * still and the poster for the scroll video. Do not add part-label art.
 */

export const images = {
  heroPoster: {
    kind: "image" as const,
    src: "/assets/product/selected-design.jpg",
    width: 1280,
    height: 529,
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
