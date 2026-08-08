import React from "react";
import { Frame } from "@/components/ui/frame";

export function WorkCardSkeleton({ label }: { label?: string }) {
  return (
    <div className="flex flex-col gap-3 animate-pulse" aria-hidden="true">
      {/* 4:3 Still frame placeholder */}
      <Frame ratio="4/3" label={label}>
        <div className="w-full h-full bg-paper-2/80" />
      </Frame>

      {/* Card text content skeleton */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <div className="w-24 h-3 bg-rule/70 rounded-[var(--radius)]" />
          <div className="w-10 h-3 bg-rule/70 rounded-[var(--radius)]" />
        </div>
        <div className="w-3/4 h-5 bg-ink/10 rounded-[var(--radius)]" />
        <div className="w-full h-3.5 bg-rule/50 rounded-[var(--radius)]" />
      </div>
    </div>
  );
}
