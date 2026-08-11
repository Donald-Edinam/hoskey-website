import { StudioSpace } from "./types";

export const studioSpaces: StudioSpace[] = [
  {
    slug: "podcast-suite",
    name: "Podcast Suite",
    description:
      "Acoustically treated multi-mic studio optimized for video podcasts, talk shows, and interview broadcasts with 4K multicam framing.",
    capacity: 4,
    included: [
      "Broadcast dynamic microphones with boom arms",
      "Multi-channel audio recorder & headphone monitoring",
      "Multi-camera 4K video capture & soft key lighting",
      "Acoustically conditioned room surfaces",
    ],
  },
  {
    slug: "audio-recording",
    name: "Audio Recording Studio",
    description:
      "Isolated recording environment for vocal tracking, voiceovers, instrumental overdubs, and sound design sessions.",
    capacity: 6,
    included: [
      "Large-diaphragm condenser and dynamic microphone locker",
      "Zero-latency monitoring & reference studio monitors",
      "DAW control surface & audio interface",
      "Acoustic isolation booth",
    ],
  },
  {
    slug: "co-working",
    name: "Co-working & Creator Hub",
    description:
      "Collaborative creative workspace equipped with high-speed internet and editing desks for filmmakers, designers, and editors.",
    capacity: 12,
    included: [
      "High-speed fiber connectivity",
      "Ergonomic workstations with dual-monitor capability",
      "Power backup and surge-protected outlets",
      "Quiet meeting and collaboration nooks",
    ],
  },
  {
    slug: "workshop-space",
    name: "Creative Workshop Space",
    description:
      "Flexible multipurpose floor for creative masterclasses, script read-throughs, technical demonstrations, and media training.",
    capacity: 25,
    included: [
      "Modular seating and folding work tables",
      "Presentation projection display & PA system",
      "Whiteboards and brainstorming boards",
      "Dedicated air conditioning & ambient lighting",
    ],
  },
  {
    slug: "musical-jams",
    name: "Musical Jams & Live Session Stage",
    description:
      "Rehearsal and live performance stage setup for band practice, live acoustic jams, and audio-visual performance recordings.",
    capacity: 15,
    included: [
      "Stage monitor wedges & multi-channel mixer",
      "Instrument direct boxes & backline microphone kit",
      "Multi-track audio recording from stage feeds",
      "Stage wash lighting fixtures",
    ],
  },
  {
    slug: "chop-bar",
    name: "Chop Bar & Hospitality Lounge",
    description:
      "On-site hospitality and breakout space providing traditional refreshments, fresh meals, and informal conversation between studio sessions.",
    capacity: 20,
    included: [
      "Comfortable lounge seating and dining tables",
      "Traditional and contemporary refreshment service",
      "Beverage station and water dispenser",
      "Informal client meeting area",
    ],
  },
];

export const studioGallery = [
  {
    src: "/images/studio/the-room.png",
    alt: "The room — main studio floor at Demes shr Studios with acoustic wood slats and cinema rig",
  },
  {
    src: "/images/studio/booth.png",
    alt: "Booth — vocal and podcast isolation booth with Shure SM7B broadcast mic",
  },
  {
    src: "/images/studio/desk.png",
    alt: "Desk — video editing and post-production workstation",
  },
];


