# onyx-cars

# Stillward

Marketing site for an early-stage Israeli robotics prototype: a home night-guard robot. The brand is Stillward. The product is Stillward One. The dock is the Post.

It is a standalone night guard, sold direct to homeowners of villas, cottages, and ground-floor apartments. It learns a normal night in the house. When you are away and it detects a person, it answers with light, a siren, and a photo on your phone. It does not use face recognition. This site recruits a beta. It is not a store.

The visuals are concept renders. The page says so.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4317/](http://127.0.0.1:4317/). `/` serves the English landing. `/he` redirects there. The longer Hebrew and English sections are still in the repo and are not rendered.

```bash
npm test
npm run lint
npm run build
npm start
```

Nothing here is deployed, and the site does not load analytics or other trackers. Pages send `noindex` so a draft is less likely to be indexed if it is hosted by mistake.

## What is on the page

One English screen. The hero is the power-on film (`heroMedia` in `src/theme/images.ts`). Desktop plays the 1080p WebM, then the MP4. Viewports at 768px and below play the portrait WebM, then the portrait MP4. The video preloads (`preload="auto"`) behind the dark poster and starts as soon as it can play. It plays once, muted, and holds the last frame. The headline and call to action fade in at `lightOnTime` (1.9s), over 600ms. Reduced motion, a stall, or blocked autoplay shows `final-lit.jpg` (or the portrait still). The call to action is `Join the beta [TBD]`, a mailto with no address. A one-line “Concept renders” footer sits under it. There is no language switcher and the rendered page is left to right.

The steps, problem, privacy, homeowners, monitoring centers, FAQ, form, and long footer components are unused. `DraftHome` in [`src/components/draft-home.tsx`](src/components/draft-home.tsx) still composes them. Hebrew copy remains in [`src/content/he.ts`](src/content/he.ts).

## Swap the visual language

Product design owns two files. Components do not hard-code colors, fonts, or media paths.

| Change | Edit |
| --- | --- |
| Colors, light-bar accent, chamfer, fonts | [`src/theme/theme.ts`](src/theme/theme.ts) |
| Chamfer, light bar, and facet-line behavior | [`src/theme/theme.css`](src/theme/theme.css) (uses the variables from `theme.ts`, no extra hues) |
| Product stills and videos | [`src/theme/images.ts`](src/theme/images.ts) and the files in [`public/assets/product/`](public/assets/product/) |

`heroMedia` names the power-on films, the dark posters, and the lit stills. `selected-design.jpg` remains the earlier studio still and is not the hero fallback. The open-shell sequence scrubs with scroll; reduced motion shows `exploded-view.jpg` instead. Do not add part labels or component specs to that section.

## Logo, icons and share image

The Stillward logo is final (v1.0, approved by product design). `brand` in [`src/theme/brand.ts`](src/theme/brand.ts) names every file.

- Header: `public/brand/stillward-nav-light-on-dark.svg` (nav lockup, no glow), 20px tall on mobile and 22px on desktop, never under 20px, with at least half a cap height of clear space. It links to `/`.
- Icons: `favicon.svg` (SVG icon), `favicon-32.png` (PNG fallback), `apple-touch-icon.png` (180), and `icon-512.png` in `/manifest.webmanifest` (`src/app/manifest.ts`). Theme colour `#0B0A0D`.
- Share image: `public/og.jpg`, 1200x630, the lit final frame with the glow primary logo at a 44px cap height. It is used for `og:image` and `twitter:image` (`summary_large_image`). The absolute URL uses `NEXT_PUBLIC_SITE_URL` (default `http://localhost:4317`), so set it at build time for a real host.
- Do not use the glow logo below 32px tall, and do not recolour the light bar or the red marks.

## Drop in the 360° frames

`rotateMedia` in [`src/theme/images.ts`](src/theme/images.ts) is the only config for the turn after the hero. The section is not rendered until every file below exists, so the live page stays the signed-off hero. Do not add stand-in frames.

```text
public/assets/product/rotate/desktop/frame_000.webp … frame_119.webp
public/assets/product/rotate/desktop/poster.webp
public/assets/product/rotate/mobile/frame_000.webp … frame_119.webp
public/assets/product/rotate/mobile/poster.webp
public/assets/product/rotate/scrub.mp4
```

`frame_000.webp` is frame 0. A count of 120 ends at `frame_119.webp`. Posters are the reduced-motion stills. `scrub.mp4` is the all-intra film that ships with the set; the page draws the WebP frames. Background is `rgb(11, 10, 13)`. After the files are in place, rebuild. The exploded view mounts after the rotation and stays unrendered (`explodedMedia.enabled` is false).

Keep video files under about 2 MB, except the four `hero-poweron-*` films. Those are the designer-approved high-quality hero set (desktop WebM 4.2 MB, MP4 6.4 MB; mobile WebM 2.2 MB, MP4 3.4 MB) and are capped at 8 MB each.

## Pilot form

The form checks name, email, phone, city, home type, and role (homeowner or monitoring center) in the browser, then shows a thank-you state. **It does not send data anywhere.**

The hook is `deliverWaitlist` in [`src/lib/waitlist.ts`](src/lib/waitlist.ts). That function is a no-op with a `TODO(backend)` comment. When an endpoint exists, implement the POST there and set `NEXT_PUBLIC_WAITLIST_ENDPOINT`. Do not add `fetch` in the form component.

## Placeholders

The copy does not invent prices, certifications, patents, statistics, customers, testimonials, partner logos, or launch dates. Those spots are marked `[TBD]`.

Also still open: a public contact address, retention and access rules for evidence, how a monitoring center would connect, and commercial terms. Sound is described as capped at 87 dB, not as a loud siren. The robot is described as an indoor entry-floor device.
