import React, { ComponentPropsWithoutRef, ElementType } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "ghost" | "onDark";
export type ButtonSize = "sm" | "md";

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

export type ButtonProps<T extends ElementType = "button"> = ButtonBaseProps & {
  as?: T;
  href?: string;
} & Omit<ComponentPropsWithoutRef<T>, keyof ButtonBaseProps | "as" | "href">;

export function Button<T extends ElementType = "button">({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  as,
  ...props
}: ButtonProps<T>) {
  const variantClasses = {
    primary:
      "bg-red text-white border border-red hover:opacity-90 active:opacity-95",
    ghost:
      "bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper",
    onDark:
      "bg-transparent text-paper border border-paper hover:bg-paper hover:text-ink",
  }[variant];

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-[length:var(--step--1)] tracking-[0.06em]",
    md: "px-5 py-2.5 text-[length:var(--step-0)] tracking-[0.02em]",
  }[size];

  const commonClasses = cn(
    "inline-flex items-center justify-center font-medium rounded-[var(--radius)]",
    "transition-all duration-150 select-none cursor-pointer text-center",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red",
    variantClasses,
    sizeClasses,
    className
  );

  if (href) {
    const isExternal =
      href.startsWith("http") ||
      href.startsWith("https://wa.me") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (isExternal) {
      return (
        <a
          {...(props as ComponentPropsWithoutRef<"a">)}
          href={href}
          className={commonClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        {...(props as unknown as Omit<ComponentPropsWithoutRef<typeof Link>, "href">)}
        href={href}
        className={commonClasses}
      >
        {children}
      </Link>
    );
  }

  const Component = as || "button";
  return (
    <Component
      className={commonClasses}
      {...(props as ComponentPropsWithoutRef<"button">)}
    >
      {children}
    </Component>
  );
}
