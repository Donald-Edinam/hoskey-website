import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { Display, Mono } from "@/components/ui/typography";
import { Img } from "@/components/ui/img";
import { Project } from "@/lib/content";

export interface CaseStudyNextProjectProps {
  currentProject: Project;
  allProjects: Project[];
}

export function CaseStudyNextProject({
  currentProject,
  allProjects,
}: CaseStudyNextProjectProps) {
  // S8: Never links to itself, even with one project in dataset
  const otherProjects = allProjects.filter((p) => p.slug !== currentProject.slug);

  if (otherProjects.length === 0) {
    return null;
  }

  // Find index of current project in all projects
  const currentIndex = allProjects.findIndex((p) => p.slug === currentProject.slug);
  // Next project by date sequence or wrap around to the first other project
  let nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  if (nextProject.slug === currentProject.slug) {
    nextProject = otherProjects[0];
  }

  const posterSrc = nextProject.poster ?? (nextProject.gallery && nextProject.gallery[0]?.src);

  return (
    <section
      aria-label="Next Project"
      className="relative w-full bg-ink text-paper overflow-hidden group select-none"
    >
      {/* Background Image at low opacity behind title */}
      {posterSrc && (
        <div className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30">
          <Img
            src={posterSrc}
            alt={nextProject.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/60" />
        </div>
      )}

      <Container className="relative z-10 py-[clamp(64px,10vw,128px)]">
        <Link
          href={`/work/${nextProject.slug}`}
          className="block focus-visible:outline-2 focus-visible:outline-red"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-red" aria-hidden="true" />
            <Mono className="text-paper-2 text-[length:var(--step--1)] tracking-[0.16em] uppercase">
              Next Project →
            </Mono>
          </div>

          <Display
            level={2}
            className="text-paper group-hover:text-red transition-colors max-w-[20ch]"
          >
            {nextProject.title}
          </Display>

          <div className="mt-4 flex items-center gap-4 text-paper-2 font-mono text-[11px] tracking-[0.16em] uppercase">
            <span>{nextProject.categories.join(" · ")}</span>
            {nextProject.date && <span>· {nextProject.date.slice(0, 4)}</span>}
          </div>
        </Link>
      </Container>
    </section>
  );
}
