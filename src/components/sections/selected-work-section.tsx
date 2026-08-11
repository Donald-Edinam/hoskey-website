import React from "react";
import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Heading, Mono } from "@/components/ui/typography";
import { Frame } from "@/components/ui/frame";
import { Rise } from "@/components/ui/rise";
import { Project } from "@/lib/content";
import { ProjectCard } from "@/components/work/project-card";

export interface SelectedWorkSectionProps {
  projects: Project[];
}

export function SelectedWorkSection({ projects }: SelectedWorkSectionProps) {
  const displayProjects = projects.slice(0, 3);
  const isEmpty = displayProjects.length === 0;

  return (
    <Section variant="default" id="work">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-12">
          <Rise>
            <Eyebrow className="mb-4">Selected work</Eyebrow>
            <Display level={2} className="max-w-[20ch]">
              Recent Productions & Case Studies
            </Display>
          </Rise>

          <Link
            href="/work"
            className="font-mono text-[length:var(--step--1)] text-ink-2 hover:text-red tracking-[0.16em] uppercase py-2 inline-flex items-center gap-2 group transition-colors focus-visible:outline-2 focus-visible:outline-red"
          >
            <span>View all work</span>
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        {/* 3 columns at 760px, 4:3 ratio, 20px gap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {isEmpty ? (
            <>
              {/* Marked Frames as asset requests when empty */}
              <div className="flex flex-col gap-3">
                <Frame ratio="4/3" label="Project 01 — TV Production" />
                <div>
                  <Mono className="text-[10px] text-ink-2">Category — Broadcast</Mono>
                  <Heading level={4} className="text-[length:var(--step-0)] text-ink mt-1">
                    Television & Outside Broadcast
                  </Heading>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Frame ratio="4/3" label="Project 02 — Documentary" />
                <div>
                  <Mono className="text-[10px] text-ink-2">Category — Cultural Film</Mono>
                  <Heading level={4} className="text-[length:var(--step-0)] text-ink mt-1">
                    Documentary & Community Storytelling
                  </Heading>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Frame ratio="4/3" label="Project 03 — Brand Film" />
                <div>
                  <Mono className="text-[10px] text-ink-2">Category — Commercial</Mono>
                  <Heading level={4} className="text-[length:var(--step-0)] text-ink mt-1">
                    Brand Film & Corporate Campaign
                  </Heading>
                </div>
              </div>
            </>
          ) : (
            displayProjects.map((project, idx) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={idx}
                priority={idx < 3}
              />
            ))
          )}
        </div>
      </Container>
    </Section>
  );
}

