import React, { ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type PolymorphicProps<T extends ElementType, P = object> = P &
  Omit<ComponentPropsWithoutRef<T>, keyof P | "as"> & {
    as?: T;
  };

/* =========================================================================
   Container
   Max-width 1240px (--maxw), horizontal padding clamp(20px, 5vw, 64px) (--pad)
   ========================================================================= */
export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  bleed?: boolean;
}

export function Container<T extends ElementType = "div">({
  as,
  className,
  bleed = false,
  children,
  ...props
}: PolymorphicProps<T, ContainerProps>) {
  const Component = as || "div";

  return (
    <Component
      className={cn(
        "w-full mx-auto",
        bleed ? "max-w-none px-0" : "max-w-[var(--maxw)] px-[var(--pad)]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/* =========================================================================
   Section
   Vertical rhythm & background variants. All section padding lives here.
   Variants: default (paper), tint (paper-2), dark (ink inversion band)
   ========================================================================= */
export type SectionVariant = "default" | "tint" | "dark";

export interface SectionProps {
  variant?: SectionVariant;
  dark?: boolean;
  tint?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Section<T extends ElementType = "section">({
  variant,
  dark,
  tint,
  as,
  className,
  children,
  ...props
}: PolymorphicProps<T, SectionProps>) {
  const Component = as || "section";

  // Determine variant from either prop
  const activeVariant: SectionVariant =
    variant ?? (dark ? "dark" : tint ? "tint" : "default");

  const variantClasses = {
    default: "bg-paper text-ink",
    tint: "bg-paper-2 text-ink",
    dark: "bg-ink text-paper section-dark",
  }[activeVariant];

  return (
    <Component
      data-variant={activeVariant}
      className={cn(
        "w-full py-[clamp(48px,8vw,112px)] transition-colors relative",
        variantClasses,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/* =========================================================================
   Eyebrow
   Mono 11px, .16em tracking, uppercase, preceded by a 7px red tally dot
   ========================================================================= */
export interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function Eyebrow<T extends ElementType = "span">({
  as,
  className,
  dot = true,
  children,
  ...props
}: PolymorphicProps<T, EyebrowProps>) {
  const Component = as || "span";

  return (
    <Component
      className={cn(
        "inline-flex items-center font-mono text-[length:var(--step--1)] tracking-[0.16em] uppercase text-ink-2",
        "section-dark:text-paper-2",
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className="inline-block w-[7px] h-[7px] rounded-full bg-red mr-2 shrink-0"
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </Component>
  );
}

/* =========================================================================
   Rule
   1px hairline divider with rule token
   ========================================================================= */
export interface RuleProps {
  className?: string;
  vertical?: boolean;
}

export function Rule({ className, vertical = false }: RuleProps) {
  if (vertical) {
    return (
      <div
        className={cn(
          "w-[1px] h-full bg-rule self-stretch section-dark:bg-ink-2/30",
          className
        )}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  return (
    <hr
      className={cn(
        "w-full h-[1px] border-0 bg-rule m-0 section-dark:bg-ink-2/30",
        className
      )}
    />
  );
}

/* =========================================================================
   Grid
   Hairline-gap grid: 1px gap filled with --rule, cells filled with background
   ========================================================================= */
export interface GridProps {
  cols?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

export function Grid<T extends ElementType = "div">({
  cols = 3,
  as,
  className,
  children,
  ...props
}: PolymorphicProps<T, GridProps>) {
  const Component = as || "div";

  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[cols];

  return (
    <Component
      className={cn(
        "grid gap-[1px] bg-rule border border-rule",
        "section-dark:bg-ink-2/30 section-dark:border-ink-2/30",
        colClasses,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/* =========================================================================
   GridCell
   Cell inside Hairline Grid with automatic section background matching
   ========================================================================= */
export interface GridCellProps {
  children: React.ReactNode;
  className?: string;
}

export function GridCell<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: PolymorphicProps<T, GridCellProps>) {
  const Component = as || "div";

  return (
    <Component
      className={cn(
        "bg-paper p-[clamp(20px,3vw,36px)] flex flex-col",
        "section-tint:bg-paper-2 section-dark:bg-ink",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
