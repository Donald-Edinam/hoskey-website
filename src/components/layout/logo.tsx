import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  inverted?: boolean;
}

export function Logo({ className, inverted = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex flex-col items-start leading-none select-none group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red",
        className
      )}
      aria-label="Hoskey Production homepage"
    >
      <span
        className={cn(
          "font-black text-[22px] tracking-[-0.03em] flex items-center transition-colors",
          inverted ? "text-paper" : "text-ink"
        )}
      >
        H<span className={inverted ? "text-red" : "text-navy"}>osk</span>ey
      </span>
      <span
        className={cn(
          "font-mono text-[9px] tracking-[0.28em] uppercase mt-0.5 transition-colors",
          inverted ? "text-paper-2" : "text-ink-2"
        )}
      >
        Production
      </span>
    </Link>
  );
}

