import React from "react";
import { cn } from "@/lib/utils";

export interface FrameProps {
  ratio?: "16/9" | "4/3" | "1/1" | "21/9" | "3/2" | "9/16" | string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Frame({
  ratio = "16/9",
  label,
  className,
  children,
}: FrameProps) {
  // Convert standard ratios to CSS aspect-ratio values
  const aspectStyle = {
    aspectRatio: ratio.includes("/") ? ratio.replace("/", " / ") : ratio,
  };

  return (
    <div
      style={aspectStyle}
      className={cn(
        "relative w-full overflow-hidden bg-paper-2 border border-rule/50",
        "section-dark:bg-white/[0.04] section-dark:border-white/10",
        "flex items-center justify-center select-none",
        className
      )}
    >
      {/* Top-left corner bracket (18px, 2px) */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-2 left-2 w-[18px] h-[18px] pointer-events-none z-10",
          "border-t-2 border-l-2 border-ink-2/60",
          "section-dark:border-white/40"
        )}
      />

      {/* Bottom-right corner bracket (18px, 2px) */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-2 right-2 w-[18px] h-[18px] pointer-events-none z-10",
          "border-b-2 border-r-2 border-ink-2/60",
          "section-dark:border-white/40"
        )}
      />

      {/* Embedded child content (if provided) */}
      {children ? (
        <div className="relative w-full h-full object-cover">{children}</div>
      ) : null}

      {/* Bottom-left mono label */}
      {label && (
        <div
          className={cn(
            "absolute bottom-3 left-3 z-10",
            "font-mono text-[length:var(--step--1)] tracking-[0.16em] uppercase",
            "text-ink-2 px-1.5 py-0.5 bg-paper/80 backdrop-blur-xs",
            "section-dark:text-paper-2 section-dark:bg-ink/80"
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
}
