import type { Dictionary } from "./types";

const en: Dictionary = {
  meta: {
    title: "Stillward · It stands guard at night",
    description:
      "A standalone night guard for villas, cottages, and ground-floor homes. It learns an ordinary night in the house, and when you are away it answers a person with light, a siren, and a photo on your phone. A beta.",
  },
  nav: {
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    language: "Language",
    cta: "Join the beta",
    links: [
      { href: "#how", label: "How it works" },
      { href: "#inside", label: "Inside" },
      { href: "#privacy", label: "Privacy" },
      { href: "#centers", label: "For centers" },
      { href: "#faq", label: "Questions" },
    ],
  },
  hero: {
    eyebrow: "For villas, cottages, and ground\u2011floor homes",
    title: "No install. Sees in the dark. Deters instantly.",
    sub: "It learns a normal night in your home, and when you are away it answers a person with light, a siren, and a photo on your\u00A0phone.",
    stat: "Burglaries of private homes and garden flats in Israel rose 37% in H1 2026, year on year.",
    statSource: "Source: Moked Emun, Jan–Jun 2026 vs. H1 2025",
    statHref: "https://www.ice.co.il/local-news/news/article/1119112",
    cta: "Join the beta",
    secondary: "How it works",
    note: "A working name. No price, no certification, and no launch date.",
    concept: "Concept renders",
    videoLabel: "Concept render: the robot emerges from darkness and the light bar switches on",
    imageAlt: "Concept render of the robot from the side, front light bar on, against a dark background",
    facts: [
      { label: "Where", value: "Indoors" },
      { label: "Coverage", value: "Entry floor" },
      { label: "Channel", value: "Your phone" },
    ],
  },
  problem: {
    kicker: "The problem",
    title: "At night the house is quiet, and the alarm is alone.",
    intro:
      "In a home with a ground-level entrance, the question is not only whether the alarm rang. It is what happened there.",
    imageAlt: "Concept render: the robot inside a house at night, on a wood floor, light bar on",
    concept: "Concept renders",
    cards: [
      {
        title: "Break-ins at night",
        body: "A house or ground-floor home is usually entered through a door or a window. At night there is not always someone awake to go and look.",
      },
      {
        title: "False alarms",
        body: "A ring by itself does not tell a monitoring center whether someone came in, or whether the room is empty. A patrol may roll for nothing, and a real event may wait.",
      },
      {
        title: "Cameras that only record",
        body: "A fixed camera sees one corner. Few families want a camera in every room, and not in bedrooms. Recording is not a check, and it is not presence in the room.",
      },
    ],
  },
  how: {
    kicker: "How it works",
    title: "Four steps. One floor.",
    intro: "This is what the prototype is being built to do indoors. The pilot is how we learn whether it holds up in a real home.",
    steps: [
      {
        n: "01",
        title: "Patrol",
        body: "At night it moves around the entry floor and returns to the dock. The first version is one floor. Stairs are outside the pilot.",
      },
      {
        n: "02",
        title: "Alarm response",
        body: "When a zone on the existing alarm fires, it drives there. It does not replace the alarm or the monitoring center. It responds to them.",
      },
      {
        n: "03",
        title: "Verify and deter",
        body: "It checks what is there. If something is wrong, it deters with light, sound, and presence. We do not claim it can already tell every family member or pet apart.",
      },
      {
        n: "04",
        title: "Evidence to the center",
        body: "A short packet, with a blurred image, goes to the professional monitoring center. A person there decides whether to call, send a patrol, or close the event.",
      },
    ],
  },
  inside: {
    kicker: "Inside",
    title: "It can be opened.",
    body: "Scrolling opens the concept render. There are no part names and no spec sheet. What stays in the pilot version: [TBD].",
    still: "With reduced motion, the still of that same render is shown.",
    imageAlt: "Concept render of the robot with the shell open, and no part labels",
    videoLabel: "Concept render: the robot opens as you scroll, with no labels",
    concept: "Concept renders",
    progress: "Open-render progress",
  },
  privacy: {
    kicker: "Privacy",
    title: "Blurred evidence. Not an archive of the home.",
    intro: "A camera that moves through a home has to earn trust. Privacy is part of the prototype’s design, not a layer added later.",
    points: [
      {
        title: "For an event, not a shift",
        body: "The camera is for a check when there is an alarm or a patrol, not for watching the family all night.",
      },
      {
        title: "Blur before it leaves",
        body: "The intent is to blur the evidence on the device, before it leaves the house. That is a prototype goal, not a certification.",
      },
      {
        title: "No cloud archive by default",
        body: "The monitoring center needs a short image in order to decide. Not a recording of the whole night.",
      },
      {
        title: "Still open",
        body: "Retention, who at the center can see the evidence, and an access log: [TBD]. A review against Israeli privacy law is still ahead of us.",
      },
    ],
    sketchLabel: "Sketch of an evidence packet",
    sketchNote: "A diagram, not a screenshot and not a real event.",
    rows: [
      { label: "Faces", value: "Blurred" },
      { label: "Verdict", value: "[TBD]" },
      { label: "Retention", value: "[TBD]" },
    ],
  },
  homeowners: {
    kicker: "Who it is for",
    title: "Homes with a ground-level entrance.",
    body: "The first market is villas, cottages, and ground-floor homes in Israel, especially homes already on a monitoring contract or about to join one. The robot stays indoors, on the entry floor. An upper floor, if there is one, is outside this version.",
    points: [
      "A villa, cottage, garden apartment, or ground floor",
      "An alarm already in place, or a plan to add one",
      "The monitoring center still makes the call",
      "Not upper floors, in this version",
    ],
  },
  centers: {
    kicker: "For monitoring centers",
    title: "A verification layer on the alarm you already run.",
    body: "Stillward is not here to replace a monitoring center. It is meant to give a clearer picture before someone calls the home or sends a car. We are looking for a small number of centers for a pilot, starting with staged events.",
    points: [
      "Less guesswork when a zone fires",
      "Blurred evidence, and a person still decides",
      "How it connects to the current system: [TBD]",
      "Commercial terms and a service agreement: [TBD]",
    ],
    cta: "Talk to us about a pilot",
  },
  pilot: {
    kicker: "Pilot",
    title: "Leave your details. There is no date yet.",
    intro:
      "If the home fits, or you are a monitoring center that wants to examine this, fill in the form. There is no payment and no commitment. In this draft the form is checked in the browser and is not sent to a server.",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    city: "City",
    homeType: "Home type",
    homeTypePlaceholder: "Choose",
    homeTypes: [
      { value: "villa", label: "Villa or private house" },
      { value: "cottage", label: "Cottage or semi-detached" },
      { value: "ground", label: "Garden or ground-floor apartment" },
      { value: "other", label: "Other" },
      { value: "na", label: "Not applicable (monitoring center)" },
    ],
    role: "I am",
    roles: [
      { value: "homeowner", label: "A homeowner", hint: "A home with a ground-level entrance" },
      { value: "center", label: "A center or partner", hint: "Monitoring center, installer, or distribution partner" },
    ],
    submit: "Submit details",
    submitting: "Checking…",
    required: "Every field is required.",
    localNote: "In this draft, details do not leave the browser.",
    errors: {
      name: "Enter a name.",
      email: "Enter a valid email.",
      phone: "Enter a phone number.",
      city: "Enter a city.",
      homeType: "Choose a home type.",
      role: "Choose homeowner or monitoring center.",
    },
    thanksTitle: "Thank you.",
    thanksBody: "The details are valid, and they stayed on this screen. They were not sent.",
    thanksDetail:
      "This draft has no server. The code marks a TODO where a real submission will connect, and only then will the form leave the browser.",
    again: "Fill another",
    summary: "What you entered",
  },
  faq: {
    kicker: "Questions",
    title: "Before the pilot.",
    items: [
      {
        q: "Can I buy this?",
        a: "No. This is a prototype, and we are recruiting a pilot. Date: [TBD].",
      },
      {
        q: "Does it replace the alarm or the monitoring center?",
        a: "No. It is meant to work with an existing alarm and a human monitoring center.",
      },
      {
        q: "Does it go upstairs?",
        a: "Not in the first version. The pilot is one entry floor, indoors, with no stairs.",
      },
      {
        q: "Does it film the family all night?",
        a: "That is not the intent. The camera is for checking an event, and the evidence is meant to be blurred before it leaves the house. Retention: [TBD].",
      },
      {
        q: "What does it cost?",
        a: "[TBD]. This draft has no price and no subscription.",
      },
      {
        q: "Are there certifications, patents, or an insurer’s approval?",
        a: "Nothing to present. No certification, no patent we are publishing, and no insurer approval. [TBD].",
      },
      {
        q: "What about children, guests, and pets at night?",
        a: "That is a question the pilot has to answer. We do not promise it can recognize the household.",
      },
      {
        q: "How strong is the sound?",
        a: "Deterrence is light, sound, and presence. Sound is capped at 87 dB and is not meant to be a loud siren.",
      },
      {
        q: "Where does it operate?",
        a: "The first market is Israel: villas, cottages, and ground-floor homes, indoors, through monitoring centers.",
      },
    ],
  },
  contact: {
    kicker: "Contact",
    title: "There is no public email address yet.",
    body: "A contact address: [TBD]. The pilot form is how to reach us.",
    cta: "To the form",
  },
  footer: {
    working: "Stillward is a working name.",
    blurb: "A standalone night guard for ground-level homes, sold direct. A beta.",
    place: "Israel",
    prototype: "Not for sale",
    concept: "Concept renders",
    rights: "No registered company is presented here. [TBD]",
  },
};

export default en;
