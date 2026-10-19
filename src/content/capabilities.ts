/** Capabilities v4. Copy is the approved text. No privacy claims. */

export const capabilities = {
  eyebrow: "Capabilities",
  headline: ["Sleep soundly.", "Stillward is awake."] as const,
  lede: "It watches the entry floor through the night—so the house can rest.",
  thread: ["Sleep", "Detect", "Alert", "Rest"] as const,
  foot: "Four-wheel drive · planetary motors · returns to the Post",
  pillars: [
    {
      id: "ai",
      eyebrow: "01 · AI",
      title: "Knows what matters.",
      body: "An on-device brain that understands the scene—and ignores pets, curtains, and shadows.",
      image: "/assets/product/capabilities/cam_ai@2x.jpg",
      alt: "Night view of an entry, with a person, a cat, and a curtain",
    },
    {
      id: "sensors",
      eyebrow: "02 · Smart sensors",
      title: "Sees the whole entry.",
      body: "Night camera, 360° lidar, cliff sensors, and a mic—working as one quiet watch.",
      chips: ["Night camera", "360° · 10 Hz · 0.05–12 m", "Cliff", "Mic"] as const,
      image: "/assets/product/capabilities/lidar@2x.jpg",
      alt: "The robot in a dark hallway, with a lidar sweep around it",
      reverse: true,
    },
    {
      id: "recog",
      eyebrow: "03 · Recognition",
      title: "Family or stranger.",
      body: "Recognises household members, unknown people, pets, and objects at the entry.",
      family: {
        image: "/assets/product/capabilities/cam_family@2x.jpg",
        alt: "Recognised household member Dana",
        label: "Family · Dana",
      },
      unknown: {
        image: "/assets/product/capabilities/cam_unknown@2x.jpg",
        alt: "Unknown person at the entry",
        label: "Unknown person",
      },
    },
    {
      id: "alerts",
      eyebrow: "04 · Smart alerts",
      title: "Only when it matters.",
      body: "A phone alert with a snapshot—then lights, and the siren if you’re away.",
      notifTitle: "Unknown person at the entry",
      notifBody: "Away mode · snapshot attached",
      away: "lights, then siren 87 dB(A) · 6 min",
      home: "lights + 20 s countdown",
      image: "/assets/product/capabilities/cam_ai@2x.jpg",
      alt: "Alert snapshot of the entry",
      reverse: true,
    },
  ],
} as const;
