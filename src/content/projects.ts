import { Project } from "./types";

/**
 * Production projects archive for Hoskey Production.
 * High-definition case studies across broadcast, documentary, commercial, and live streaming.
 */
export const projects: Project[] = [
  {
    slug: "ghana-now-outside-broadcast",
    title: "National Outside Broadcast & Live Switch",
    client: "GTV Ghana",
    clientVisible: true,
    date: "2025-01-15",
    categories: ["Broadcast", "Live"],
    summary:
      "Multi-camera outside broadcast coverage with redundant SDI vision mixing, wireless director tally communication, and master ISO recording.",
    brief:
      "Deliver live outside broadcast switching and clean master archival for national television broadcast in Accra.",
    approach:
      "Deployed a 5-camera broadcast package with optical fiber routing, calibrated studio wash lighting, and multi-track audio backup.",
    outcome:
      "Flawless 3-hour live broadcast with zero dropped frames and instant delivery of high-bitrate clean feeds.",
    poster: "/images/projects/broadcast-tv.png",
    featured: true,
  },
  {
    slug: "echoes-of-the-savanna",
    title: "Echoes of the Savanna: Elders of Walawala",
    client: "Heritage Trust Ghana",
    clientVisible: true,
    date: "2024-12-20",
    categories: ["Documentary", "Cultural"],
    summary:
      "Cinematic non-fiction cultural documentary exploring traditional folklore, community heritage, and ancient oral history in northern Ghana.",
    brief:
      "Document the living memories and oral traditions of northern Ghanaian elders before modern displacement.",
    approach:
      "Longitudinal cinema-camera filming over 14 days during golden hour, pairing anamorphic optics with authentic community dialogue.",
    outcome:
      "Selected for regional cultural preservation screenings with full archival preservation in Accra.",
    poster: "/images/projects/savannah-documentary.png",
    featured: true,
  },
  {
    slug: "accra-fintech-brand-narrative",
    title: "Accra Financial Enterprise Narrative",
    client: "Apex Financial Group",
    clientVisible: true,
    date: "2025-02-05",
    categories: ["Commercial", "Corporate"],
    summary:
      "Narrative brand commercial shot on cinema glass with anamorphic framing, capturing corporate leadership and technological vision.",
    brief:
      "Create a premium 90-second brand film highlighting digital banking transformation across West Africa.",
    approach:
      "Full lighting package with dolly tracking across modern architectural glass offices, complemented by calibrated dialogue recording.",
    outcome:
      "Broadcast across national commercial breaks and syndicated across digital investor channels.",
    poster: "/images/projects/brand-film.png",
    featured: true,
  },
  {
    slug: "accra-fusion-live-concert",
    title: "Accra Live Fusion Festival Multi-Cam Stream",
    client: "Live In Ghana Media",
    clientVisible: true,
    date: "2025-01-28",
    categories: ["Live", "Broadcast"],
    summary:
      "High-definition concert live streaming with stage lighting synchronization, multi-channel soundboard capture, and cellular bonded uplinks.",
    brief:
      "Broadcast a 6-hour outdoor music festival to an international audience with low latency.",
    approach:
      "Multi-camera jib and pit operators paired with hardware H.265 encoders and direct soundboard multi-track audio feeds.",
    outcome:
      "Over 45,000 concurrent viewers across platforms with studio-grade sound loudness balance.",
    poster: "/images/projects/live-concert.png",
    featured: false,
  },
  {
    slug: "voices-of-the-north-podcast",
    title: "Voices of the North: Studio Series",
    client: "Demes shr Studios",
    clientVisible: true,
    date: "2025-02-12",
    categories: ["Corporate", "Broadcast"],
    summary:
      "4K multi-camera studio interview series recorded in our acoustically treated podcast suite with calibrated dynamic microphones.",
    brief:
      "Produce a 10-episode thought leadership video podcast series for creators and entrepreneurs.",
    approach:
      "Three 4K cinema cameras switched live in our acoustically conditioned podcast studio with broadcast dynamic microphones.",
    outcome:
      "Syndicated on YouTube and audio platforms with automated chapter markers and social cutdowns.",
    poster: "/images/projects/podcast-studio.png",
    featured: false,
  },
];
