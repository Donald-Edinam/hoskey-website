import React, { ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type PolymorphicProps<T extends ElementType, P = object> = P &
  Omit<ComponentPropsWithoutRef<T>, keyof P | "as"> & {
    as?: T;
  };

/* =========================================================================
   Display (h1 / h2 levels)
   Weight 900, tight tracking (-.02em), line-height .98, text-wrap: balance
   ========================================================================= */
export interface DisplayProps {
  level?: 1 | 2;
  children: React.ReactNode;
  className?: string;
}

export function Display<T extends ElementType = "h1">({
  level = 1,
  as,
  className,
  children,
  ...props
}: PolymorphicProps<T, DisplayProps>) {
  const Component = as || (level === 1 ? "h1" : "h2");

  const sizeClasses =
    level === 1
      ? "text-[length:var(--step-5)]"
      : "text-[length:var(--step-4)]";

  return (
    <Component
      className={cn(
        "font-black tracking-[-0.02em] leading-[0.98] [text-wrap:balance]",
        sizeClasses,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/* =========================================================================
   Heading (h3 / h4 levels)
   Weight 900, tight tracking (-.02em), line-height .98, text-wrap: balance
   ========================================================================= */
export interface HeadingProps {
  level?: 3 | 4;
  children: React.ReactNode;
  className?: string;
}

export function Heading<T extends ElementType = "h3">({
  level = 3,
  as,
  className,
  children,
  ...props
}: PolymorphicProps<T, HeadingProps>) {
  const Component = as || (level === 3 ? "h3" : "h4");

  const sizeClasses =
    level === 3
      ? "text-[length:var(--step-3)]"
      : "text-[length:var(--step-2)]";

  return (
    <Component
      className={cn(
        "font-black tracking-[-0.02em] leading-[0.98] [text-wrap:balance]",
        sizeClasses,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/* =========================================================================
   Lede
   Caps at 56ch, fluid step-1 font size, 1.4 line-height
   ========================================================================= */
export interface LedeProps {
  children: React.ReactNode;
  className?: string;
}

export function Lede<T extends ElementType = "p">({
  as,
  className,
  children,
  ...props
}: PolymorphicProps<T, LedeProps>) {
  const Component = as || "p";

  return (
    <Component
      className={cn(
        "text-[length:var(--step-1)] leading-[1.4] max-w-[56ch] text-ink-2",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/* =========================================================================
   Body
   Caps at 66ch, step-0 / step--1 font size, 1.5 line-height
   ========================================================================= */
export interface BodyProps {
  size?: "base" | "sm";
  children: React.ReactNode;
  className?: string;
}

export function Body<T extends ElementType = "p">({
  size = "base",
  as,
  className,
  children,
  ...props
}: PolymorphicProps<T, BodyProps>) {
  const Component = as || "p";

  const sizeClasses =
    size === "sm"
      ? "text-[length:var(--step--1)] leading-[1.45]"
      : "text-[length:var(--step-0)] leading-[1.5]";

  return (
    <Component
      className={cn("max-w-[66ch] text-ink-2", sizeClasses, className)}
      {...props}
    >
      {children}
    </Component>
  );
}

/* =========================================================================
   Mono
   IBM Plex Mono, 11px fluid (step--1), .16em uppercase tracking
   ========================================================================= */
export interface MonoProps {
  children: React.ReactNode;
  className?: string;
}

export function Mono<T extends ElementType = "span">({
  as,
  className,
  children,
  ...props
}: PolymorphicProps<T, MonoProps>) {
  const Component = as || "span";

  return (
    <Component
      className={cn(
        "font-mono text-[length:var(--step--1)] tracking-[0.16em] uppercase",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
