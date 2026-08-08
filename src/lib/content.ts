import {
  Project,
  Service,
  TeamMember,
  StudioSpace,
  Testimonial,
  SiteSettings,
  AboutContent,
  projects,
  services,
  studioSpaces,
  team,
  testimonials,
  siteSettings,
  aboutContent,
} from "@/content";

// Re-export all types so callers can import types strictly from @/lib/content
export type * from "@/content/types";

/**
 * Accessor for all production projects.
 * Returns an empty array until projects are published.
 */
export async function getProjects(): Promise<Project[]> {
  return projects;
}

/**
 * Accessor for featured production projects.
 */
export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const featured = projects.filter((p) => p.featured);
  return (featured.length > 0 ? featured : projects).slice(0, limit);
}

/**
 * Accessor for a single project by slug.
 */
export async function getProject(slug: string): Promise<Project | null> {
  const project = projects.find((p) => p.slug === slug);
  return project ?? null;
}

/**
 * Accessor for the six core production services.
 */
export async function getServices(): Promise<Service[]> {
  return services;
}

/**
 * Accessor for a single service by slug.
 */
export async function getService(slug: string): Promise<Service | null> {
  const service = services.find((s) => s.slug === slug);
  return service ?? null;
}

/**
 * Accessor for the production team directory.
 */
export async function getTeam(): Promise<TeamMember[]> {
  return team;
}

/**
 * Accessor for Demes shr Studios facilities.
 */
export async function getStudioSpaces(): Promise<StudioSpace[]> {
  return studioSpaces;
}

/**
 * Accessor for client and partner testimonials.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonials;
}

/**
 * Accessor for global site settings.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}

/**
 * Accessor for about content (founder story, acrostic, values, mission, vision).
 */
export async function getAbout(): Promise<AboutContent> {
  return aboutContent;
}

/**
 * Backwards compatibility helper for company metadata and foundational info.
 */
export async function getCompanyInfo() {
  return {
    name: siteSettings.name,
    founded: "2024-12-01",
    founder: `${aboutContent.founder.name} (${aboutContent.founder.alias})`,
    origin: aboutContent.founder.origin,
    education: aboutContent.founder.education,
    phone: siteSettings.phone ?? "",
    whatsapp: siteSettings.whatsapp ?? "",
  };
}

/**
 * Backwards compatibility helper for site motto.
 */
export async function getMotto(): Promise<string> {
  return siteSettings.motto;
}
