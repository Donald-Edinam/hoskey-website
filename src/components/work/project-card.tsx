import React from "react";
import Link from "next/link";
import { Frame } from "@/components/ui/frame";
import { Img } from "@/components/ui/img";
import { Heading, Body, Mono } from "@/components/ui/typography";
import { Project } from "@/lib/content";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: Project;
  index?: number;
  priority?: boolean;
  className?: string;
}

export function ProjectCard({
  project,
  index,
  priority = false,
  className,
}: ProjectCardProps) {
  const year = project.date ? project.date.slice(0, 4) : "";
  const label =
    typeof index === "number"
      ? `Project ${String(index + 1).padStart(2, "0")}`
      : undefined;

  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group flex flex-col gap-3 rounded-[var(--radius)]",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red",
        className
      )}
      aria-label={`${project.title} case study`}
    >
      {/* 4:3 Still with overflow-hidden and hover scale on image */}
      <div className="relative w-full overflow-hidden rounded-[var(--radius)]">
        <Frame ratio="4/3" label={label}>
          {project.poster ? (
            <Img
              src={project.poster}
              alt={project.title}
              fill
              priority={priority}
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full bg-paper-2" />
          )}
        </Frame>
      </div>

      {/* Project Details */}
      <div className="flex flex-col">
        {/* Category & Year */}
        <div className="flex items-center justify-between text-[length:var(--step--1)] text-ink-2 mb-1">
          <Mono className="text-[10px] uppercase text-ink-2">
            {project.categories.join(" · ")}
          </Mono>

          {year && <Mono className="text-[10px] text-ink-2">{year}</Mono>}
        </div>

        {/* Client name in mono (only if clientVisible) */}
        {project.clientVisible && project.client && (
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-red font-semibold mb-0.5">
            Client: {project.client}
          </span>
        )}

        {/* Title with red hover transition */}
        <Heading
          level={4}
          className="text-[length:var(--step-0)] text-ink group-hover:text-red transition-colors leading-[1.2]"
        >
          {project.title}
        </Heading>

        {/* Summary */}
        {project.summary && (
          <Body
            size="sm"
            className="text-ink-2 mt-1 line-clamp-2 leading-relaxed"
          >
            {project.summary}
          </Body>
        )}
      </div>
    </Link>
  );
}
