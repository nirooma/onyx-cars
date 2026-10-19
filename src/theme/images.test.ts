import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import { describe, it } from "node:test";
import { heroMedia, images } from "./images.ts";

const MAX_VIDEO_BYTES = 2 * 1024 * 1024;

describe("product media manifest", () => {
  it("points every asset at a file under public/assets/product", () => {
    for (const entry of Object.values(images)) {
      const relative = `public${entry.src}`;
      assert.equal(existsSync(relative), true, relative);
      if (entry.kind === "video") {
        const size = statSync(relative).size;
        assert.ok(size < MAX_VIDEO_BYTES, `${relative} is ${size} bytes`);
      }
    }
  });

  it("keeps the power-on hero swap in one config", () => {
    assert.equal(Number.isFinite(heroMedia.lightOnTime), true);
    assert.ok(heroMedia.lightOnTime > 0);
    const files = [
      heroMedia.desktopVideo.src,
      heroMedia.desktopVideo.webm,
      heroMedia.mobileVideo.src,
      heroMedia.poster.src,
      heroMedia.finalFrame.src,
      heroMedia.reducedMotionStill.src,
    ];
    for (const src of files) {
      const relative = `public${src}`;
      assert.equal(existsSync(relative), true, relative);
      if (src.endsWith(".mp4") || src.endsWith(".webm")) {
        const size = statSync(relative).size;
        assert.ok(size < MAX_VIDEO_BYTES, `${relative} is ${size} bytes`);
      }
    }
  });
});
