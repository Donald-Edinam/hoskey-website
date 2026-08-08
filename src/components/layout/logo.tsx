import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex flex-col items-start leading-none select-none group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red",
        className
      )}
      aria-label="Hoskey Production homepage"
    >
      <span className="font-black text-[22px] tracking-[-0.03em] text-ink flex items-center">
        H<span className="text-navy">osk</span>ey
      </span>
      <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-ink-2 mt-0.5">
        Production
      </span>
    </Link>
  );
}
