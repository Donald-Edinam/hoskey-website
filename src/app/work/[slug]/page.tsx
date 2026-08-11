import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProjects,
  getProject,
  getTeam,
} from "@/lib/content";
import {
  CaseStudyHeader,
  CaseStudyHeroMedia,
  CaseStudyBrief,
  CaseStudyApproach,
  CaseStudyGallery,
  CaseStudyOutcome,
  CaseStudyCredits,
  CaseStudyNextProject,
} from "@/components/case-study";
import { SITE } from "@/lib/config";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found — Hoskey Production",
    };
  }

  const title = `${project.title} — Hoskey Production`;
  const description = project.summary;
  const canonicalUrl = `/work/${project.slug}`;
  const posterUrl = project.poster ? `${SITE.url}${project.poster}` : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: `${SITE.url}${canonicalUrl}`,
      type: "article",
      images: posterUrl ? [{ url: posterUrl, alt: project.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: posterUrl ? [posterUrl] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const [project, allProjects, team] = await Promise.all([
    getProject(slug),
    getProjects(),
    getTeam(),
  ]);

  if (!project) {
    notFound();
  }

  // Schema.org CreativeWork & VideoObject JSON-LD
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": project.videoId ? "VideoObject" : "CreativeWork",
    name: project.title,
    description: project.summary,
    datePublished: project.date,
    author: {
      "@type": "Organization",
      name: "Hoskey Production",
      url: SITE.url,
    },
    ...(project.poster && {
      thumbnailUrl: `${SITE.url}${project.poster}`,
    }),
    ...(project.videoId && {
      embedUrl: `https://www.youtube-nocookie.com/embed/${project.videoId}`,
    }),
  };

  return (
    <article className="w-full flex flex-col">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      {/* S1: Title Block */}
      <CaseStudyHeader project={project} />

      {/* S2: Full-Bleed Hero Media */}
      <CaseStudyHeroMedia project={project} />

      {/* S3: The Brief (Sticky Rail + Prose) */}
      <CaseStudyBrief project={project} />

      {/* S4: The Approach (Sticky Rail + Prose + Figures) */}
      <CaseStudyApproach project={project} />

      {/* S5: Asymmetric Visual Gallery & Lightbox */}
      <CaseStudyGallery gallery={project.gallery} title={project.title} />

      {/* S6: Outcome, Deliverables & Client Quote */}
      <CaseStudyOutcome project={project} />

      {/* S7: Crew & Production Credits */}
      <CaseStudyCredits credits={project.credits} team={team} />

      {/* S8: Next Project Dark Transition */}
      <CaseStudyNextProject
        currentProject={project}
        allProjects={allProjects}
      />
    </article>
  );
}
