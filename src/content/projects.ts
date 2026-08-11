import { Project } from "./types";

/**
 * Production projects archive for Hoskey Production.
 * High-definition case studies across broadcast, documentary, commercial, and live streaming.
 */
export const projects: Project[] = [
  {
    slug: "echoes-of-the-savanna",
    title: "Echoes of the Savanna: Elders of Walawala",
    client: "Heritage Trust Ghana",
    clientVisible: true,
    date: "2024-12-20",
    categories: ["Documentary", "Cultural"],
    summary:
      "Cinematic non-fiction cultural documentary exploring traditional folklore, community heritage, and ancient oral history in northern Ghana.",
    runtime: "18:40",
    role: "Full Production & Cinematography",
    brief:
      "Document the living memories and oral traditions of northern Ghanaian elders before modern displacement and urban migration erode centuries of unwritten lineage.",
    briefParagraphs: [
      "Heritage Trust Ghana commissioned Hoskey Production to create an archival-grade cultural documentary centered on the storytelling traditions of Walawala in the North East Region.",
      "The primary mandate was authenticity without intrusion: capturing the unhurried cadence of elder discourse, the acoustic texture of rural evenings, and the physical architecture of earthen homesteads that have stood for generations.",
      "The key constraint was environmental. With temperatures exceeding 38°C at midday and limited electrical infrastructure, our crew designed an off-grid solar-buffered charging station and relied on natural light transitions from sunrise mist to twilight embers.",
    ],
    approach:
      "Longitudinal cinema-camera filming over 14 days during golden hour, pairing anamorphic optics with authentic community dialogue and multi-channel field audio.",
    approachParagraphs: [
      "We deployed a lean four-person crew equipped with a primary cinema package paired with anamorphic prime lenses to render the vast northern savanna with dramatic widescreen depth.",
      "Rather than staging formal interview sets, we established camera positions at natural community gathering points — beneath baobab canopies and along homestead verandas. We utilized heavy-duty ground tracking sliders to introduce slow, deliberate parallax that mirrored the rhythm of oral history.",
      "Location sound was treated as an equal narrative partner. Using dual shotgun microphones in blimp wind protection and discrete wireless lavaliers woven into traditional fugu smocks, we preserved ambient birdsong, dry savanna wind, and the resonant sub-tones of carved wooden talking drums.",
    ],
    figures: [
      {
        src: "/images/projects/savanna/still-03.png",
        alt: "Panoramic savanna landscape at twilight with silhouetted baobab trees",
        caption: "Figure 01 — 21:9 Widescreen twilight framing across the Walawala grassland corridor.",
        variant: "full",
        aspect: "21/9",
      },
      {
        src: "/images/projects/savanna/still-04.png",
        alt: "Location sound engineer with boom pole and windshield blimp",
        caption: "Figure 02 — Multi-channel acoustic field recording using blimp wind protection.",
        variant: "half",
        aspect: "1/1",
      },
      {
        src: "/images/projects/savanna/still-07.png",
        alt: "Cinema camera rig mounted on a heavy-duty tracking slider at sunset",
        caption: "Figure 03 — Ground tracking slider capturing sunset parallax.",
        variant: "half",
        aspect: "1/1",
      },
    ],
    gallery: [
      {
        src: "/images/projects/savanna/still-01.png",
        alt: "Cinematographer setting up cinema camera on tripod at sunrise in Walawala",
      },
      {
        src: "/images/projects/savanna/still-02.png",
        alt: "Elder storyteller in traditional indigo smock holding carved wooden staff",
      },
      {
        src: "/images/projects/savanna/still-03.png",
        alt: "Twilight savanna horizon with baobab trees and glowing village hearths",
      },
      {
        src: "/images/projects/savanna/still-04.png",
        alt: "Location sound recordist capturing rural savanna ambience",
      },
      {
        src: "/images/projects/savanna/still-05.png",
        alt: "Director Ziblim Abu James reviewing field monitor rushes on set",
      },
      {
        src: "/images/projects/savanna/still-06.png",
        alt: "Community women singing traditional songs in colorful kente and fugu textiles",
      },
      {
        src: "/images/projects/savanna/still-07.png",
        alt: "Tracking slider cinema rig capturing golden hour sun flare",
      },
    ],
    deliverables: [
      "4K DCI Master Film (ProRes 4444 XQ)",
      "Digital Cinema Package (DCP 24fps 5.1 Surround)",
      "Broadcast TV Cut (1080p50 EBU R128 Compliant)",
      "High-Resolution Archival Stills Suite",
      "Uncompressed 96kHz / 24-bit Field Audio Archive",
    ],
    quote: {
      quote:
        "Hoskey Production brought an extraordinary sensitivity to our community elders. They captured not merely pictures, but the soul and dignity of our ancestors' stories.",
      author: "Alhaji Issahaku Bawa",
      role: "Director of Cultural Preservation, Heritage Trust Ghana",
    },
    credits: [
      { role: "Director", name: "Ziblim Abu James" },
      { role: "Director of Photography", name: "Demes shr" },
      { role: "Location Sound Recordist", name: "Aminu Fuseini" },
      { role: "Gaffer & Grip", name: "Kwame Mensah" },
      { role: "Colorist & Post Supervisor", name: "Hoskey Technical Group" },
      { role: "Cultural Advisor", name: "Alhaji Issahaku Bawa" },
    ],
    poster: "/images/projects/savannah-documentary.png",
    featured: true,
  },
  {
    slug: "ghana-now-outside-broadcast",
    title: "National Outside Broadcast & Live Switch",
    client: "GTV Ghana",
    clientVisible: true,
    date: "2025-01-15",
    categories: ["Broadcast", "Live"],
    summary:
      "Multi-camera outside broadcast coverage with redundant SDI vision mixing, wireless director tally communication, and master ISO recording.",
    runtime: "03:15:00",
    role: "Lead Outside Broadcast Unit",
    brief:
      "Deliver live outside broadcast switching and clean master archival for national television broadcast in Accra.",
    briefParagraphs: [
      "GTV Ghana required an agile outside broadcast unit capable of rapid deployment and uninterrupted transmission during national civic coverage in central Accra.",
      "The broadcast demanded zero latency, synchronized studio return feeds, and clean ISO recording on every channel for same-day highlight packages.",
    ],
    approach:
      "Deployed a 5-camera broadcast package with optical fiber routing, calibrated studio wash lighting, and multi-track audio backup.",
    approachParagraphs: [
      "Our mobile OB unit was configured with optical fiber SDI lines running directly to three pedestal cameras on the main stage and two wireless shoulder rigs covering audience interactions.",
      "A redundant hardware vision mixer ensured seamless live cuts with automated graphic overlays and lower-thirds fed from our on-site graphics station.",
    ],
    deliverables: [
      "Live 1080i50 SDI Program Feed to GTV Master Control",
      "Simultaneous 5-Channel Clean ISO Recorders",
      "Master Broadcast Archive on LTO-8 Tape",
    ],
    quote: {
      quote:
        "Hoskey delivered a rock-solid outside broadcast feed without a single dropped frame during 3 continuous hours of live national transmission.",
      author: "Kofi Owusu",
      role: "Head of Engineering, GTV",
    },
    credits: [
      { role: "Broadcast Director", name: "Ziblim Abu James" },
      { role: "Vision Mixer", name: "Emmanuel Darko" },
      { role: "Technical Director", name: "Demes shr" },
      { role: "Senior Camera Operator", name: "Aminu Fuseini" },
    ],
    poster: "/images/projects/broadcast-tv.png",
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
    runtime: "01:30",
    role: "Creative Direction & Production",
    brief:
      "Create a premium 90-second brand film highlighting digital banking transformation across West Africa.",
    briefParagraphs: [
      "Apex Financial Group required a sleek cinematic brand narrative to anchor their Pan-African investor summit and television commercial campaign.",
      "The film needed to balance boardroom authority with technological dynamism, shot in modern glass architecture overlooking the Accra skyline.",
    ],
    approach:
      "Full lighting package with dolly tracking across modern architectural glass offices, complemented by calibrated dialogue recording.",
    approachParagraphs: [
      "We utilized high-output diffused softboxes to balance interior skin tones against bright architectural glass exteriors, maintaining a natural contrast ratio.",
      "Motorized dolly moves were choreographed with executive blocking to create fluid, cinematic transitions between boardroom strategy and digital innovation scenes.",
    ],
    deliverables: [
      "90-Second Cinema Master (4K ProRes 4444)",
      "60-Second TV Commercial Cut (EBU R128)",
      "30-Second & 15-Second Digital Social Cuts (9:16 & 1:1)",
    ],
    credits: [
      { role: "Director", name: "Ziblim Abu James" },
      { role: "Cinematographer", name: "Demes shr" },
      { role: "Art Director", name: "Selasi Agbenu" },
    ],
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
    runtime: "05:45:00",
    role: "Live Multi-Cam Streaming Crew",
    brief:
      "Broadcast a 6-hour outdoor music festival to an international audience with low latency.",
    briefParagraphs: [
      "An outdoor concert with 10,000 attendees required a resilient broadcast pipeline with zero tolerance for audio distortion or streaming dropouts.",
    ],
    approach:
      "Multi-camera jib and pit operators paired with hardware H.265 encoders and direct soundboard multi-track audio feeds.",
    approachParagraphs: [
      "We integrated a 24-foot camera jib for sweeping crowd shots with two front-of-house zoom cameras and two handheld stage operators on wireless transmitters.",
      "Audio was captured directly via Dante digital network from the main front-of-house soundboard, mastered on the fly with multi-band compression.",
    ],
    deliverables: [
      "1080p60 Low-Latency YouTube / Twitch Stream",
      "Multi-Track 32-Channel Concert Audio Recording",
      "4K Full Performance Archival Master",
    ],
    credits: [
      { role: "Stream Director", name: "Ziblim Abu James" },
      { role: "Audio Engineer", name: "Yaw Boateng" },
      { role: "Jib Operator", name: "Demes shr" },
    ],
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
    runtime: "45:00 / Episode",
    role: "Studio Engineering & Post-Production",
    brief:
      "Produce a 10-episode thought leadership video podcast series for creators and entrepreneurs.",
    briefParagraphs: [
      "Demes shr Studios initiated an in-house interview series to spotlight visionary creators, cultural archivists, and entrepreneurs in northern Ghana.",
    ],
    approach:
      "Three 4K cinema cameras switched live in our acoustically conditioned podcast studio with broadcast dynamic microphones.",
    approachParagraphs: [
      "Calibrated Shure SM7B microphones were processed through hardware channel strips with optical compression, feeding isolated 4K video tracks with live switching.",
    ],
    deliverables: [
      "10 Full Episodes (4K Master + 1080p Web)",
      "30 Social Highlight Clips (Vertical 9:16)",
      "Master Audio Stems & Transcripts",
    ],
    credits: [
      { role: "Executive Producer", name: "Ziblim Abu James" },
      { role: "Studio Engineer", name: "Demes shr" },
      { role: "Post-Production Editor", name: "Aminu Fuseini" },
    ],
    poster: "/images/projects/podcast-studio.png",
    featured: false,
  },
];
