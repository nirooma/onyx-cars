import { existsSync } from "node:fs";
import path from "node:path";
import { explodedMedia, rotateRequiredSrcs } from "./images";

function publicFile(src: string) {
  return path.join(process.cwd(), "public", src.replace(/^\//, ""));
}

/** True only when both frame sets and both posters are on disk. */
export function rotateSequenceReady() {
  return rotateRequiredSrcs().every((src) => existsSync(publicFile(src)));
}

/** The exploded view stays off until its own delivery is wired. */
export function explodedSequenceReady() {
  return explodedMedia.enabled;
}
