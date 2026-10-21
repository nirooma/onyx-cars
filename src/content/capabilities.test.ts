import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { describe, it } from "node:test";
import { capabilities } from "./capabilities.ts";

describe("capabilities v4 copy", () => {
  it("uses the approved four-pillar copy and does not revive privacy claims", () => {
    assert.equal(capabilities.eyebrow, "Capabilities");
    assert.deepEqual(capabilities.headline, ["Sleep soundly.", "Stillward is awake."]);
    assert.equal(
      capabilities.lede,
      "It watches the entry floor through the night—so the house can rest.",
    );
    assert.deepEqual(capabilities.thread, ["Sleep", "Detect", "Alert", "Rest"]);
    assert.equal(capabilities.pillars.length, 4);
    assert.equal(capabilities.pillars[0].title, "Knows what matters.");
    assert.equal(capabilities.pillars[1].title, "Sees the whole entry.");
    assert.equal(capabilities.pillars[2].title, "Family or stranger.");
    assert.equal(capabilities.pillars[2].body.startsWith("Recognises household members"), true);
    assert.equal(capabilities.pillars[2].family.label, "Family · Dana");
    assert.equal(capabilities.pillars[2].unknown.label, "Unknown person");
    assert.equal(capabilities.pillars[3].title, "Only when it matters.");
    assert.equal(capabilities.pillars[3].away, "lights, then siren 87 dB(A) · 6 min");
    assert.equal(capabilities.pillars[3].home, "lights + 20 s countdown");
    assert.equal(capabilities.foot, "Four-wheel drive · planetary motors · returns to the Post");
    assert.deepEqual(capabilities.pillars[1].chips, [
      "Night camera",
      "360° · 10 Hz · 0.05–12 m",
      "Cliff",
      "Mic",
    ]);

    const blob = JSON.stringify(capabilities);
    assert.equal(blob.includes("Never identifies"), false);
    assert.equal(blob.includes("never identifies"), false);
    assert.equal(blob.includes("No face recognition"), false);
    assert.equal(blob.includes("Nothing leaves the home"), false);
    assert.equal(blob.includes("Nothing is recognized"), false);
    assert.equal(/9\d dB/.test(blob), false);
    assert.equal(blob.includes("87 dB(A)"), true);
  });

  it("points each rendered still at a 2x file under public/assets/product/capabilities", () => {
    const srcs = [
      capabilities.pillars[0].image,
      capabilities.pillars[1].image,
      capabilities.pillars[2].family.image,
      capabilities.pillars[2].unknown.image,
      capabilities.pillars[3].image,
    ];
    for (const src of srcs) {
      assert.equal(src.includes("@2x"), true, src);
      assert.equal(existsSync(`public${src}`), true, src);
    }
    assert.equal(existsSync("public/assets/product/capabilities/cam_privacy.jpg"), false);
    assert.equal(existsSync("public/assets/product/capabilities/motors.jpg"), false);
  });
});
