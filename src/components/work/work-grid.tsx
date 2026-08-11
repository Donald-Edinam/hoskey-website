import React from "react";
import { Frame } from "@/components/ui/frame";
import { Heading, Body, Mono } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/content";
import { ProjectCard } from "./project-card";

export interface WorkGridProps {
  projects: Project[];
  hasGlobalProjects: boolean;
  activeCategory?: string;
}

export function WorkGrid({
  projects,
  hasGlobalProjects,
  activeCategory,
}: WorkGridProps) {
  // Case 1: No projects at all in archive -> render three marked frames (asset request)
  if (!hasGlobalProjects) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="flex flex-col gap-3">
          <Frame ratio="4/3" label="Project 01 — TV Production" />
          <div>
            <div className="flex items-center justify-between text-[length:var(--step--1)] text-ink-2">
              <Mono className="text-[10px]">Broadcast · Television</Mono>
              <Mono className="text-[10px]">2025</Mono>
            </div>
            <Heading level={4} className="text-[length:var(--step-0)] text-ink mt-1">
              Multi-Camera Outside Broadcast
            </Heading>
            <Body size="sm" className="text-ink-2 mt-1">
              Live studio multicam and remote outside broadcast coverage.
            </Body>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Frame ratio="4/3" label="Project 02 — Documentary" />
          <div>
            <div className="flex items-center justify-between text-[length:var(--step--1)] text-ink-2">
              <Mono className="text-[10px]">Documentary · Cultural</Mono>
              <Mono className="text-[10px]">2025</Mono>
            </div>
            <Heading level={4} className="text-[length:var(--step-0)] text-ink mt-1">
              Community Cultural Documentary
            </Heading>
            <Body size="sm" className="text-ink-2 mt-1">
              Long-form cultural and non-fiction storytelling from northern Ghana.
            </Body>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Frame ratio="4/3" label="Project 03 — Brand Film" />
          <div>
            <div className="flex items-center justify-between text-[length:var(--step--1)] text-ink-2">
              <Mono className="text-[10px]">Commercial · Narrative</Mono>
              <Mono className="text-[10px]">2024</Mono>
            </div>
            <Heading level={4} className="text-[length:var(--step-0)] text-ink mt-1">
              Institutional Brand Narrative
            </Heading>
            <Body size="sm" className="text-ink-2 mt-1">
              Cinema-grade brand film capturing mission and community footprint.
            </Body>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Archive has projects, but 0 match the active category filter
  if (projects.length === 0) {
    return (
      <div className="p-8 sm:p-12 bg-paper-2 border border-rule text-center flex flex-col items-center justify-center rounded-[var(--radius)]">
        <Mono className="text-ink-2 mb-2">No matching results</Mono>
        <Heading level={3} className="text-ink mb-3">
          No productions in &ldquo;{activeCategory}&rdquo;
        </Heading>
        <Body className="text-ink-2 max-w-md mx-auto mb-6">
          There are currently no published projects categorized under &ldquo;{activeCategory}&rdquo;.
          You can reset the filter to view all productions.
        </Body>
        <Button href="/work" variant="ghost" size="sm">
          Reset filter to All
        </Button>
      </div>
    );
  }

  // Case 3: Render matching project cards using ProjectCard
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {projects.map((project, idx) => (
        <ProjectCard
          key={project.slug}
          project={project}
          index={idx}
          priority={idx < 3}
        />
      ))}
    </div>
  );
}

