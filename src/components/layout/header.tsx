"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/studios", label: "Studios" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className={cn(
          "sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50",
          "bg-ink text-paper px-4 py-2 font-mono text-[length:var(--step--1)] tracking-[0.16em] uppercase",
          "border border-rule rounded-[var(--radius)] shadow-md"
        )}
      >
        Skip to main content
      </a>

      {/* Sticky 64px Header */}
      <header
        className={cn(
          "sticky top-0 z-40 h-16 w-full",
          "bg-[rgba(255,255,255,0.92)] backdrop-blur-md border-b border-rule",
          "transition-colors duration-200"
        )}
      >
        <Container className="h-full flex items-center justify-between">
          {/* Left: Brand Logo Lockup */}
          <div className="flex items-center shrink-0">
            <Logo />
          </div>

          {/* Centre: Five navigation links (Desktop >= 900px) */}
          <nav
            aria-label="Main Navigation"
            className="hidden min-[900px]:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative py-1 font-medium text-[length:var(--step-0)] text-ink-2 hover:text-ink transition-colors",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red",
                    isActive && "text-ink font-semibold",
                    // Underline styles
                    "after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-red after:transition-all after:duration-200",
                    isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: WhatsApp CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden min-[900px]:block">
              <WhatsAppButton context="project" size="sm">
                Message us
              </WhatsAppButton>
            </div>

            {/* Mobile Hamburger Button (< 900px) */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileOpen}
              className={cn(
                "min-[900px]:hidden inline-flex items-center justify-center p-2 text-ink rounded-[var(--radius)]",
                "border border-rule hover:bg-paper-2 focus-visible:outline-2 focus-visible:outline-red"
              )}
            >
              <svg
                className="w-5 h-5 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Navigation Panel */}
      <MobileNav
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        triggerRef={hamburgerRef}
      />
    </>
  );
}
