import { siteContent, Project, Service } from "@/content";

export async function getCompanyInfo() {
  return siteContent.company;
}

export async function getMotto(): Promise<string> {
  return siteContent.motto;
}

export async function getServices(): Promise<Service[]> {
  return siteContent.services;
}

export async function getProjects(): Promise<Project[]> {
  return siteContent.projects;
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  return siteContent.services.find((s) => s.slug === slug);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return siteContent.projects.find((p) => p.slug === slug);
}
