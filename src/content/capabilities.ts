/** Capabilities section copy. Proof chips stay exactly as approved. */

export const capabilities = {
  eyebrow: "Capabilities",
  headline: "One mind. Every sense.",
  lede: "Five ways Stillward One protects the entry—without ever asking who you are.",
  nodes: [
    { id: "ai", name: "On-device AI", x: 260, y: 200, core: true },
    { id: "camera", name: "Night camera", x: 110, y: 90, core: false },
    { id: "privacy", name: "Privacy", x: 400, y: 80, core: false },
    { id: "sensors", name: "Sensors", x: 430, y: 240, core: false },
    { id: "motors", name: "Motors", x: 300, y: 340, core: false },
  ],
  panels: [
    {
      id: "ai",
      eyebrow: "01 · On-device AI",
      headline: "Knows what matters.",
      line: "A person is noted. A pet is ignored. A curtain is just a curtain. Decided on the robot—never who.",
      chips: [{ label: "Processed on the robot", tone: "solid" as const }],
      image: "/assets/product/capabilities/cam_ai.jpg",
      alt: "Night camera view of an entry, with a person, a cat, and a curtain",
      kind: "ai" as const,
    },
    {
      id: "camera",
      eyebrow: "02 · Night camera",
      headline: "Sees in total darkness.",
      line: "The light bar opens a cool path. The camera behind the window watches the floor ahead.",
      chips: [{ label: "Light bar + night camera", tone: "solid" as const }],
      image: "/assets/product/capabilities/cam_night_lit.jpg",
      dark: "/assets/product/capabilities/cam_night_dark.jpg",
      alt: "Night view with the light bar on",
      darkAlt: "The same entry in the dark, before the light bar",
      kind: "slider" as const,
      reverse: true,
    },
    {
      id: "privacy",
      eyebrow: "03 · Privacy",
      headline: "Watches. Never identifies.",
      line: "Faces are blurred on the robot. Nothing is recognized. Nothing is stored as an identity.",
      chips: [
        { label: "No face recognition", tone: "solid" as const },
        { label: "Nothing leaves the home unless you choose", tone: "asp" as const },
      ],
      image: "/assets/product/capabilities/cam_privacy.jpg",
      alt: "Camera view of a person whose face is masked",
      kind: "privacy" as const,
    },
    {
      id: "sensors",
      eyebrow: "04 · Advanced sensors",
      headline: "360° awareness.",
      line: "Lidar maps the room. Cliff sensors watch the edge. The mic listens at the door.",
      chips: [
        { label: "360° scan", tone: "solid" as const },
        { label: "10 Hz", tone: "solid" as const },
        { label: "Up to 12 m", tone: "solid" as const },
        { label: "Cliff sensing", tone: "dim" as const },
      ],
      image: "/assets/product/capabilities/lidar.jpg",
      alt: "The robot in a dark hallway, with a lidar sweep around it",
      kind: "photo" as const,
      reverse: true,
    },
    {
      id: "motors",
      eyebrow: "05 · Powerful motors",
      headline: "Four motors. Any floor.",
      line: "Planetary gears and off-road wheels take rugs, tile, and door sills in stride.",
      chips: [
        { label: "4WD", tone: "solid" as const },
        { label: "4× planetary gear motors", tone: "solid" as const },
        { label: "120 mm off-road wheels", tone: "solid" as const },
      ],
      image: "/assets/product/capabilities/motors.jpg",
      alt: "Close-up of an off-road wheel crossing a threshold",
      kind: "photo" as const,
    },
  ],
} as const;

const VIEW_W = 520;
const VIEW_H = 400;

export function capabilityEdges() {
  const byId = Object.fromEntries(capabilities.nodes.map((node) => [node.id, node]));
  const pairs = [
    ["ai", "camera"],
    ["ai", "privacy"],
    ["ai", "sensors"],
    ["ai", "motors"],
    ["camera", "privacy"],
    ["sensors", "motors"],
    ["camera", "motors"],
  ] as const;
  return pairs.map(([from, to], index) => {
    const start = byId[from];
    const end = byId[to];
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    const bend = index % 2 ? 1 : -1;
    return {
      from,
      to,
      d: `M${start.x} ${start.y} Q${midX + bend * 20} ${midY + bend * -16} ${end.x} ${end.y}`,
    };
  });
}

export function capabilityNodeStyle(x: number, y: number) {
  return { left: `${(x / VIEW_W) * 100}%`, top: `${(y / VIEW_H) * 100}%` };
}
