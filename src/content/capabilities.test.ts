import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { describe, it } from "node:test";
import { capabilities } from "./capabilities.ts";

describe("capabilities copy", () => {
  it("keeps the approved proof chips and does not add identify claims", () => {
    const chips = capabilities.panels.flatMap((panel) => panel.chips.map((chip) => chip.label));
    assert.deepEqual(chips, [
      "Processed on the robot",
      "Light bar + night camera",
      "No face recognition",
      "Nothing leaves the home unless you choose",
      "360° scan",
      "10 Hz",
      "Up to 12 m",
      "Cliff sensing",
      "4WD",
      "4× planetary gear motors",
      "120 mm off-road wheels",
    ]);
    assert.equal(
      capabilities.lede,
      "Five ways Stillward One protects the entry—without ever asking who you are.",
    );
    assert.equal(capabilities.panels[2].line.includes("Nothing is recognized"), true);
    const joined = chips.join(" ");
    assert.equal(joined.includes("recognize people"), false);
    assert.equal(joined.includes("identifies people"), false);
  });

  it("points each panel at a file under public/assets/product/capabilities", () => {
    for (const panel of capabilities.panels) {
      assert.equal(existsSync(`public${panel.image}`), true, panel.image);
      if ("dark" in panel) {
        assert.equal(existsSync(`public${panel.dark}`), true, panel.dark);
      }
    }
  });
});
