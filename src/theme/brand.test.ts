import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { brand } from "./brand.ts";

function jpegSize(file: string) {
  const b = readFileSync(file);
  let i = 2;
  while (i < b.length) {
    const marker = b[i + 1];
    const len = b.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xc3) return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
    i += 2 + len;
  }
  throw new Error("no SOF");
}

describe("brand files", () => {
  it("ships the logo, icons and og image under public/", () => {
    for (const src of [brand.navLogo.src, ...Object.values(brand.icons), brand.og.src]) {
      assert.equal(existsSync(`public${src}`), true, src);
    }
  });

  it("keeps the nav logo in its 20-28px band", () => {
    assert.ok(brand.navLogo.heightMobile >= 20);
    assert.ok(brand.navLogo.heightDesktop <= 28);
    assert.equal(brand.background, "#0B0A0D");
  });

  it("has a 1200x630 og image", () => {
    assert.deepEqual(jpegSize(`public${brand.og.src}`), { width: 1200, height: 630 });
  });
});
