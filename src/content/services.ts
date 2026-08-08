import { Service } from "./types";

export const services: Service[] = [
  {
    slug: "tv-production",
    title: "TV Production & Outside Broadcast",
    summary:
      "Multi-camera television production and outside broadcast coverage engineered for national broadcast and regional syndication.",
    description:
      "End-to-end studio and field production for television programs, news segments, panel shows, and outside broadcast events. We coordinate cameras, director communication, tally, live graphics, and redundant recording pipelines.",
    included: [
      "Multi-camera field & studio setup",
      "Live vision mixing & broadcast routing",
      "Wireless director & tally communication",
      "Redundant master recording & ISO feeds",
      "Broadcast-compliant color grading & audio mastering",
    ],
    process: [
      "Pre-production rundown & script review",
      "Camera blocking & technical rehearsal",
      "Live broadcast & multicam capture",
      "Post-broadcast wrap & master archival",
    ],
  },
  {
    slug: "brand-films",
    title: "Brand Films & Commercials",
    summary:
      "Narrative corporate films, commercial spots, and product campaigns crafted with cinema-grade visual language.",
    description:
      "We produce corporate profiles, commercial campaigns, and brand narratives that communicate institutional value with visual clarity. From treatment development to cinema camera operation and color finishing.",
    included: [
      "Creative concept & storyboard development",
      "Cinema camera package & prime lenses",
      "Dedicated gaffer & lighting design",
      "Professional voiceover recording & sound design",
      "Multi-format delivery for broadcast and social",
    ],
    process: [
      "Brand discovery & narrative treatment",
      "Location scouting & casting",
      "Principal photography",
      "Editorial, color grading, and final delivery",
    ],
  },
  {
    slug: "documentaries",
    title: "Documentaries & Cultural Storytelling",
    summary:
      "Investigative, cultural, and institutional documentary storytelling capturing authentic Ghanaian and African narratives.",
    description:
      "In-depth non-fiction storytelling exploring community heritage, agricultural development, education, and institutional impact across Ghana. We prioritize narrative authenticity, respectful subject engagement, and broadcast technical standards.",
    included: [
      "Research & subject pre-interviews",
      "On-location documentary cinematography",
      "Field audio capture with dual backup",
      "Archival research & visual contextualization",
      "Full documentary post-production & subtitle mastering",
    ],
    process: [
      "Story research & field reconnaissance",
      "Longitudinal filming & interview sessions",
      "Transcript logging & assembly edit",
      "Fine cut, sound mix, and festival/broadcast mastering",
    ],
  },
  {
    slug: "live-streaming",
    title: "Live Streaming & Multi-Camera Coverage",
    summary:
      "Low-latency multi-camera live streaming and broadcast distribution for corporate summits, concerts, and public events.",
    description:
      "Professional live streaming infrastructure featuring hardware encoding, multi-CDN distribution, synchronized audio mixing, and on-screen graphics for corporate summits, state functions, religious conventions, and musical performances.",
    included: [
      "Hardware H.264/H.265 encoders with cellular bonding",
      "Multi-platform streaming (YouTube, Facebook, custom RTMP)",
      "Live lower thirds, scoreboard, and presentation integration",
      "Direct soundboard audio integration",
      "Instant high-definition replay & full archive delivery",
    ],
    process: [
      "Site survey & bandwidth assessment",
      "Signal routing & graphics setup",
      "Live event execution & stream monitoring",
      "Instant raw and clean archive handover",
    ],
  },
  {
    slug: "sound-engineering",
    title: "Sound Engineering & Audio Post-Production",
    summary:
      "Field audio acquisition, multi-track studio recording, dialogue cleanup, sound design, and broadcast audio mastering.",
    description:
      "Comprehensive audio services spanning location sound recording with boom and wireless lavalier systems, studio vocal tracking, spectral dialogue cleanup, Foley sound design, and EBU R128 loudness-compliant broadcast mastering.",
    included: [
      "Location sound recording with 32-bit float backup",
      "Spectral noise reduction & dialogue restoration",
      "Original sound design & Foley effects",
      "Multi-track music mixing & vocal production",
      "Broadcast and streaming loudness mastering",
    ],
    process: [
      "Audio audit & acoustic evaluation",
      "Recording / track import & cleanup",
      "Balance mixing & spatial sound design",
      "Loudness normalization & quality control",
    ],
  },
  {
    slug: "technical-stage",
    title: "Technical Stage Engineering & Lighting",
    summary:
      "Stage lighting design, visual projection mapping, truss rigging, and technical live crew for events and productions.",
    description:
      "Technical stagecraft for live events, theatrical productions, and broadcast stages. We design and operate DMX lighting rigs, projection displays, stage audio monitoring, and coordinated stage management.",
    included: [
      "DMX lighting fixtures, moving heads, and wash profiles",
      "Stage trussing, rigging, and power distribution safety",
      "High-lumen projection & video wall management",
      "Stage monitor engineering & wireless IEM systems",
      "Experienced technical crew & stage managers",
    ],
    process: [
      "Stage CAD layout & power calculation",
      "Rigging, cabling, and fixture addressing",
      "Cue programming & light-to-sound rehearsal",
      "Live stage execution & technical supervision",
    ],
  },
];
