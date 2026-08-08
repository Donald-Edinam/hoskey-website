"use client";

import React, { useTransition } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface WorkFilterProps {
  categories: string[];
  activeCategory?: string;
  className?: string;
}

export function WorkFilter({
  categories,
  activeCategory,
  className,
}: WorkFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCategory = activeCategory ?? searchParams.get("category") ?? "All";

  const allCategories = ["All", ...categories.filter((c) => c.toLowerCase() !== "all")];

  const handleSelect = (category: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (category === "All" || !category) {
        params.delete("category");
      } else {
        params.set("category", category);
      }

      const queryString = params.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(targetUrl, { scroll: false });
    });
  };

  return (
    <nav
      aria-label="Filter productions by category"
      className={cn("flex flex-wrap items-center gap-2 sm:gap-3", className)}
    >
      {allCategories.map((category) => {
        const isSelected =
          category.toLowerCase() === currentCategory.toLowerCase() ||
          (category === "All" && (!currentCategory || currentCategory.toLowerCase() === "all"));

        return (
          <button
            key={category}
            type="button"
            onClick={() => handleSelect(category)}
            aria-pressed={isSelected}
            disabled={isPending}
            className={cn(
              "px-3.5 py-1.5 font-mono text-[length:var(--step--1)] tracking-[0.12em] uppercase rounded-[var(--radius)]",
              "border transition-all duration-150 select-none cursor-pointer",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red",
              isSelected
                ? "bg-red text-white border-red font-semibold shadow-xs"
                : "bg-paper text-ink-2 border-rule hover:text-ink hover:border-ink-2 active:bg-paper-2"
            )}
          >
            {category}
          </button>
        );
      })}
    </nav>
  );
}
