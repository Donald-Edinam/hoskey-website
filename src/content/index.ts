export interface Project {
  slug: string;
  title: string;
  category: string;
  year: number;
  description?: string;
  client?: string;
}

export interface Service {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  capabilities: string[];
}

export const siteContent = {
  motto: "Where Stories Come Alive",
  company: {
    name: "Hoskey Production",
    founded: "2024-12-01",
    founder: "Ziblim Abu James (Demes shr)",
    origin: "Walawala, northern Ghana",
    education: "Unimac IFT",
    phone: "+233 59 794 8979",
    whatsapp: "233597948979",
  },
  services: [
    {
      slug: "production",
      title: "Production Services",
      eyebrow: "Broadcast & Film",
      description: "TV, brand film, documentary, live streaming, and post-production.",
      capabilities: ["TV Production", "Brand Films", "Documentaries", "Live Streaming", "Post-Production"],
    },
    {
      slug: "studios",
      title: "Demes shr Studios",
      eyebrow: "Creator Space",
      description: "Podcast recording, audio production, co-working, workshops, and musical jams.",
      capabilities: ["Podcast Studio", "Audio Recording", "Co-working Space", "Creative Workshops", "Musical Jams"],
    },
    {
      slug: "technical",
      title: "Technical & Stage",
      eyebrow: "Live Support",
      description: "Lighting design, live sound engineering, projection, and technical crew.",
      capabilities: ["Lighting Design", "Live Sound Engineering", "Visual Projection", "Technical Crew"],
    },
  ],
  projects: [] as Project[],
};
