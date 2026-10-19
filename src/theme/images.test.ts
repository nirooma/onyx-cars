import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import { describe, it } from "node:test";
import { images } from "./images.ts";

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
});
