import React from "react";
import { Frame } from "@/components/ui/frame";
import { Img } from "@/components/ui/img";
import { VideoFacade } from "@/components/ui/video-facade";
import { Project } from "@/lib/content";

export interface CaseStudyHeroMediaProps {
  project: Project;
}

export function CaseStudyHeroMedia({ project }: CaseStudyHeroMediaProps) {
  const posterSrc = project.poster ?? (project.gallery && project.gallery[0]?.src);

  return (
    <section
      aria-label={`${project.title} Hero Media`}
      className="w-full overflow-hidden my-8 md:my-12"
    >
      {/* Full-bleed media wrapper: stretches across the viewport without horizontal scroll */}
      <div className="w-full max-w-[1920px] mx-auto">
        {project.videoId ? (
          <VideoFacade
            src={`https://www.youtube-nocookie.com/embed/${project.videoId}`}
            poster={posterSrc}
            title={`${project.title} — Film`}
            label={`Film Master — ${project.runtime ?? "01:30"}`}
            ratio="21/9"
            className="rounded-none border-x-0"
          />
        ) : posterSrc ? (
          <Frame
            ratio="21/9"
            label={`${project.title} — Key Production Still`}
            className="rounded-none border-x-0"
          >
            <Img
              src={posterSrc}
              alt={`${project.title} production still`}
              fill
              priority
              className="object-cover"
            />
          </Frame>
        ) : null}
      </div>
    </section>
  );
}
