# onyx-cars

# NightGuard

Marketing site for an early-stage Israeli robotics prototype: a home night-guard robot. **NightGuard is a working name.** The product name is not decided.

At night the robot patrols the entry floor indoors. When an alarm zone fires it drives there, checks what is happening, deters with light, sound, and presence, and sends privacy-blurred evidence to a professional monitoring center. The first market is villas, cottages, and ground-floor homes in Israel, reached through monitoring centers. This site recruits a pilot. It is not a store.

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

One English screen. The hero is the power-on film (`heroMedia` in `src/theme/images.ts`): it plays once, then holds the lit frame. Copy fades in 0.4s after `lightOnTime`. Reduced motion shows `hero-still.webp` instead. The call to action is `Join the beta [TBD]`, a mailto with no address. A one-line “Concept renders” footer sits under it. There is no language switcher and the rendered page is left to right.

The steps, problem, privacy, homeowners, monitoring centers, FAQ, form, and long footer components are unused. `DraftHome` in [`src/components/draft-home.tsx`](src/components/draft-home.tsx) still composes them. Hebrew copy remains in [`src/content/he.ts`](src/content/he.ts).

## Swap the visual language

Product design owns two files. Components do not hard-code colors, fonts, or media paths.

| Change | Edit |
| --- | --- |
| Colors, light-bar accent, chamfer, fonts | [`src/theme/theme.ts`](src/theme/theme.ts) |
| Chamfer, light bar, and facet-line behavior | [`src/theme/theme.css`](src/theme/theme.css) (uses the variables from `theme.ts`, no extra hues) |
| Product stills and videos | [`src/theme/images.ts`](src/theme/images.ts) and the files in [`public/assets/product/`](public/assets/product/) |

`heroPoster` is the studio front 3/4 still at `public/assets/product/selected-design.jpg`. The hero video, the night interior plate, and the open-shell scroll video stay on their own keys. The earlier frame grabbed from the reveal video remains in the folder as `hero-reveal-poster.jpg` and is no longer the poster.

The hero reveal plays only when the visitor has not asked for reduced motion. Otherwise the poster still stays in place. The open-shell sequence scrubs with scroll; reduced motion shows `exploded-view.jpg` instead. Do not add part labels or component specs to that section.

Keep video files under about 2 MB.

## Pilot form

The form checks name, email, phone, city, home type, and role (homeowner or monitoring center) in the browser, then shows a thank-you state. **It does not send data anywhere.**

The hook is `deliverWaitlist` in [`src/lib/waitlist.ts`](src/lib/waitlist.ts). That function is a no-op with a `TODO(backend)` comment. When an endpoint exists, implement the POST there and set `NEXT_PUBLIC_WAITLIST_ENDPOINT`. Do not add `fetch` in the form component.

## Placeholders

The copy does not invent prices, certifications, patents, statistics, customers, testimonials, partner logos, or launch dates. Those spots are marked `[TBD]`.

Also still open: a public contact address, retention and access rules for evidence, how a monitoring center would connect, and commercial terms. Sound is described as capped at 87 dB, not as a loud siren. The robot is described as an indoor entry-floor device.
