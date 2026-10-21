export type Card = { title: string; body: string };
export type Step = { n: string; title: string; body: string };
export type FaqItem = { q: string; a: string };

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    skip: string;
    menu: string;
    close: string;
    language: string;
    cta: string;
    links: { href: string; label: string }[];
  };
  hero: {
    eyebrow: string;
    title: string;
    sub: string;
    stat?: string;
    statSource?: string;
    statHref?: string;
    cta: string;
    secondary: string;
    note: string;
    concept: string;
    videoLabel: string;
    imageAlt: string;
    facts: { label: string; value: string }[];
  };
  problem: {
    kicker: string;
    title: string;
    intro: string;
    imageAlt: string;
    concept: string;
    cards: Card[];
  };
  how: { kicker: string; title: string; intro: string; steps: Step[] };
  inside: {
    kicker: string;
    title: string;
    body: string;
    still: string;
    imageAlt: string;
    videoLabel: string;
    concept: string;
    progress: string;
  };
  privacy: {
    kicker: string;
    title: string;
    intro: string;
    points: Card[];
    sketchLabel: string;
    sketchNote: string;
    rows: { label: string; value: string }[];
  };
  homeowners: { kicker: string; title: string; body: string; points: string[] };
  centers: {
    kicker: string;
    title: string;
    body: string;
    points: string[];
    cta: string;
  };
  pilot: {
    kicker: string;
    title: string;
    intro: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    homeType: string;
    homeTypePlaceholder: string;
    homeTypes: { value: string; label: string }[];
    role: string;
    roles: { value: "homeowner" | "center"; label: string; hint: string }[];
    submit: string;
    submitting: string;
    required: string;
    localNote: string;
    errors: {
      name: string;
      email: string;
      phone: string;
      city: string;
      homeType: string;
      role: string;
    };
    thanksTitle: string;
    thanksBody: string;
    thanksDetail: string;
    again: string;
    summary: string;
  };
  faq: { kicker: string; title: string; items: FaqItem[] };
  contact: { kicker: string; title: string; body: string; cta: string };
  footer: {
    working: string;
    blurb: string;
    place: string;
    prototype: string;
    concept: string;
    rights: string;
  };
};
