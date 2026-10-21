import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { turnFrame } from "./turn-motion.ts";

function visible(values: number[], epsilon = 1e-6) {
  return values.filter((value) => value > epsilon).length;
}

describe("turn frame", () => {
  for (const narrow of [false, true]) {
    it(`keeps a single robot and a single label (${narrow ? "mobile" : "desktop"})`, () => {
      for (let step = 0; step <= 10000; step += 1) {
        const frame = turnFrame(step / 10000, narrow);
        const opacities = frame.shots.map((shot) => shot.opacity);
        const labels = frame.shots.map((shot) => shot.label);
        assert.ok(visible(opacities) <= 1, `two robots at ${step}`);
        assert.ok(visible(labels) <= 1, `two labels at ${step}`);
        assert.ok(frame.glow >= 0.34 - 1e-6 && frame.glow <= 1);
      }
    });
  }

  it("rests on the first angle and finishes on the last", () => {
    const start = turnFrame(0, false);
    assert.equal(start.shots[0].opacity, 1);
    assert.equal(start.shots[0].label, 1);
    assert.equal(start.glow, 1);
    const end = turnFrame(1, false);
    assert.equal(end.shots[4].opacity, 1);
    assert.equal(end.shots[4].label, 1);
    assert.equal(end.shots[4].scale, 1);
  });
});
