import React from "react";
import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display } from "@/components/ui/typography";
import { Rise } from "@/components/ui/rise";
import { Project, Service } from "@/lib/content";
import { ProjectCard } from "@/components/work/project-card";

export interface ServiceRelatedWorkProps {
  service: Service;
  projects: Project[];
}

export function ServiceRelatedWork({
  service,
  projects,
}: ServiceRelatedWorkProps) {
  // State: hidden if none
  if (!projects || projects.length === 0) {
    return null;
  }

  const displayProjects = projects.slice(0, 3);

  return (
    <Section variant="tint" id="related-work" className="border-t border-rule">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-12">
          <Rise>
            <Eyebrow className="mb-4">Selected Case Studies</Eyebrow>
            <Display level={2} className="max-w-[24ch]">
              Featured {service.title} Work
            </Display>
          </Rise>

          <Link
            href="/work"
            className="font-mono text-[length:var(--step--1)] text-ink-2 hover:text-red tracking-[0.16em] uppercase py-2 inline-flex items-center gap-2 group transition-colors focus-visible:outline-2 focus-visible:outline-red"
          >
            <span>View all work</span>
            <span
              className="group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>

        {/* 3-Column Grid reusing ProjectCard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {displayProjects.map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={idx}
              priority={idx < 3}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
