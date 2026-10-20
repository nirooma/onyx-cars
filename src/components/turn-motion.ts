const DIP = 0.34;

export type TurnShot = {
  opacity: number;
  scale: number;
  label: number;
};

export type TurnFrame = {
  shots: TurnShot[];
  glow: number;
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smooth(value: number) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

/**
 * One still at a time. The current angle fades and scales out, the floor glow
 * dips, then the next angle fades in. Labels hand off with a gap so two
 * captions are never on screen together.
 */
export function turnFrame(progress: number, narrow: boolean, count = 5): TurnFrame {
  const steps = count - 1;
  const hold = narrow ? 0.72 : 0.68;
  const outDur = narrow ? 0.11 : 0.12;
  const gap = 0.04;
  const inDur = 1 - hold - outDur - gap;
  const grow = narrow ? 0.016 : 0.028;
  const shots: TurnShot[] = Array.from({ length: count }, () => ({
    opacity: 0,
    scale: 1,
    label: 0,
  }));

  const p = clamp01(progress);
  if (p >= 1) {
    shots[count - 1] = { opacity: 1, scale: 1, label: 1 };
    return { shots, glow: 1 };
  }

  const x = p * steps;
  const index = Math.min(steps - 1, Math.floor(x));
  const local = x - index;
  const outStart = hold;
  const gapStart = hold + outDur;
  const inStart = gapStart + gap;
  let glow = 1;

  if (local < outStart) {
    shots[index].opacity = 1;
    shots[index].label = 1;
  } else if (local < gapStart) {
    const t = smooth((local - outStart) / outDur);
    shots[index].opacity = 1 - t;
    shots[index].scale = 1 - t * grow;
    shots[index].label = 1 - smooth(Math.min(1, t / 0.62));
    glow = 1 - t * (1 - DIP);
  } else if (local < inStart) {
    glow = DIP;
  } else {
    const t = smooth((local - inStart) / inDur);
    const next = index + 1;
    shots[next].opacity = t;
    shots[next].scale = 1 + (1 - t) * grow;
    shots[next].label = t <= 0.18 ? 0 : smooth((t - 0.18) / 0.82);
    glow = DIP + t * (1 - DIP);
  }

  return { shots, glow };
}
