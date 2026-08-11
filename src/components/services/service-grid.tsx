import React from "react";
import Link from "next/link";
import { Grid, GridCell } from "@/components/ui/layout";
import { Heading, Body, Mono } from "@/components/ui/typography";
import { Service } from "@/lib/content";
import { cn } from "@/lib/utils";

export type ServiceGridVariant = "home" | "index";

export interface ServiceGridProps {
  services: Service[];
  variant?: ServiceGridVariant;
  className?: string;
}

export function ServiceGrid({
  services,
  variant = "index",
  className,
}: ServiceGridProps) {
  return (
    <Grid
      cols={3}
      className={cn(
        "bg-rule border border-rule transition-colors",
        className
      )}
    >
      {services.map((service, index) => {
        const indexStr = String(index + 1).padStart(2, "0");
        const isIndexVariant = variant === "index";

        return (
          <GridCell
            key={service.slug}
            className={cn(
              "group relative flex flex-col justify-between transition-colors bg-paper hover:bg-paper-2/40",
              isIndexVariant ? "p-6 sm:p-8 lg:p-10" : "p-6 md:p-8"
            )}
          >
            <div>
              {/* Header: Index Number & Optional Price Band */}
              <div className="flex items-center justify-between mb-4">
                <Mono className="text-[11px] text-ink-2 group-hover:text-red transition-colors font-medium">
                  {indexStr}
                </Mono>

                {service.priceBand && (
                  <Mono className="text-[10px] text-ink-2 uppercase tracking-[0.16em]">
                    {service.priceBand}
                  </Mono>
                )}
              </div>

              {/* Service Title */}
              <Heading
                level={3}
                className={cn(
                  "leading-[1.2] mb-3 group-hover:text-red transition-colors",
                  isIndexVariant
                    ? "text-[length:var(--step-1)]"
                    : "text-[length:var(--step-1)]"
                )}
              >
                {service.title}
              </Heading>

              {/* Service Summary (One-liner) */}
              <Body
                size="sm"
                className="text-ink-2 leading-relaxed"
              >
                {service.summary}
              </Body>
            </div>

            {/* Bottom Affordance */}
            <div className="mt-8 pt-4 border-t border-rule/50 flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-2 group-hover:text-ink transition-colors font-medium">
                {isIndexVariant ? "View service scope" : "Learn more"}
              </span>
              <span
                className="font-mono text-[13px] text-ink-2 group-hover:text-red group-hover:translate-x-1.5 transition-all duration-200"
                aria-hidden="true"
              >
                →
              </span>
            </div>

            {/* Full Card Accessible Hit Target */}
            <Link
              href={`/services/${service.slug}`}
              className="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
              aria-label={`${service.title} — ${service.summary}`}
            />
          </GridCell>
        );
      })}
    </Grid>
  );
}
