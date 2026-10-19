import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import { describe, it } from "node:test";
import { heroMedia, images } from "./images.ts";

const MAX_VIDEO_BYTES = 2 * 1024 * 1024;
/** Designer-approved desktop hero. The 2 MB cap does not apply to this file. */
const APPROVED_LARGE_HERO = "public/assets/product/hero-poweron-1080p.mp4";
/** Designer-approved high-quality hero set (v3). Capped at 8 MB each instead of 2 MB. */
const APPROVED_HQ_HERO = new Set([
  APPROVED_LARGE_HERO,
  "public/assets/product/hero-poweron-1080p.webm",
  "public/assets/product/hero-poweron-mobile.mp4",
  "public/assets/product/hero-poweron-mobile.webm",
]);
const MAX_HQ_HERO_BYTES = 8 * 1024 * 1024;

function assertVideoSize(relative: string) {
  const size = statSync(relative).size;
  const cap = APPROVED_HQ_HERO.has(relative) ? MAX_HQ_HERO_BYTES : MAX_VIDEO_BYTES;
  assert.ok(size < cap, `${relative} is ${size} bytes`);
}

describe("product media manifest", () => {
  it("points every asset at a file under public/assets/product", () => {
    for (const entry of Object.values(images)) {
      const relative = `public${entry.src}`;
      assert.equal(existsSync(relative), true, relative);
      if (entry.kind === "video") assertVideoSize(relative);
    }
  });

  it("keeps the power-on hero swap in one config", () => {
    assert.equal(heroMedia.lightOnTime, 1.9);
    assert.equal(heroMedia.desktopVideo.width, 1920);
    assert.equal(heroMedia.mobileVideo.width, 1080);
    const files = [
      heroMedia.desktopVideo.webm,
      heroMedia.desktopVideo.src,
      heroMedia.mobileVideo.webm,
      heroMedia.mobileVideo.src,
      heroMedia.poster.src,
      heroMedia.posterMobile.src,
      heroMedia.finalFrame.src,
      heroMedia.finalFrameMobile.src,
    ];
    for (const src of files) {
      const relative = `public${src}`;
      assert.equal(existsSync(relative), true, relative);
      if (src.endsWith(".mp4") || src.endsWith(".webm")) assertVideoSize(relative);
    }
    const desktopMp4 = statSync(APPROVED_LARGE_HERO).size;
    assert.ok(desktopMp4 > MAX_VIDEO_BYTES);
    assert.ok(desktopMp4 < MAX_HQ_HERO_BYTES);
  });
});
