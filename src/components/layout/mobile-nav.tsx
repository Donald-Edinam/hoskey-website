"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Eyebrow } from "@/components/ui/layout";
import { useReducedMotion } from "@/components/ui/rise";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/services", label: "Services", number: "01" },
  { href: "/work", label: "Work", number: "02" },
  { href: "/studios", label: "Studios", number: "03" },
  { href: "/about", label: "About", number: "04" },
  { href: "/contact", label: "Contact", number: "05" },
];

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function MobileNav({ isOpen, onClose, triggerRef }: MobileNavProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();
  const prevPathnameRef = useRef(pathname);

  // Close on route change
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (isOpen) {
        onClose();
      }
    }
  }, [pathname, isOpen, onClose]);

  // Lock body scroll and trap focus
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus first element in panel
    const timer = setTimeout(() => {
      firstFocusableRef.current?.focus();
    }, 50);

    // Handle Escape key & Focus Trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        triggerRef?.current?.focus();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
      ref={panelRef}
      onClick={(e) => {
        // Close on backdrop click (clicking container background outside interactive children)
        if (e.target === e.currentTarget) {
          onClose();
          triggerRef?.current?.focus();
        }
      }}
      className={cn(
        "fixed inset-0 z-50 min-[900px]:hidden flex flex-col justify-between",
        "bg-paper text-ink p-[var(--pad)] pt-6 pb-8 overflow-y-auto",
        prefersReduced ? "opacity-100" : "animate-slide-down"
      )}
    >
      {/* Top Bar: Eyebrow + Close Button */}
      <div className="flex items-center justify-between border-b border-rule pb-4">
        <Eyebrow>Menu</Eyebrow>
        <button
          ref={firstFocusableRef}
          type="button"
          onClick={() => {
            onClose();
            triggerRef?.current?.focus();
          }}
          aria-label="Close navigation menu"
          className={cn(
            "p-2 text-ink rounded-[var(--radius)] border border-rule hover:bg-paper-2",
            "focus-visible:outline-2 focus-visible:outline-red"
          )}
        >
          <svg
            className="w-5 h-5 fill-none stroke-current stroke-2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Navigation Links at Display Scale */}
      <nav aria-label="Mobile Navigation" className="flex flex-col gap-6 my-auto py-8">
        {NAV_LINKS.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname?.startsWith(`${link.href}/`));

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "group flex items-baseline justify-between py-2 border-b border-rule/50",
                "font-black tracking-[-0.02em] leading-[0.98] text-[length:var(--step-4)] text-ink",
                "hover:text-red transition-colors focus-visible:outline-2 focus-visible:outline-red",
                isActive && "text-red"
              )}
            >
              <span>{link.label}</span>
              <span className="font-mono text-[length:var(--step--1)] tracking-[0.16em] uppercase text-ink-2 group-hover:text-red">
                {link.number}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Conversion CTA */}
      <div className="pt-6 border-t border-rule flex flex-col gap-3">
        <WhatsAppButton context="project" size="md" className="w-full">
          Message us on WhatsApp
        </WhatsAppButton>
        <span className="font-mono text-[length:var(--step--1)] tracking-[0.16em] uppercase text-ink-2 text-center">
          +233 59 794 8979 · Direct Line
        </span>
      </div>
    </div>
  );
}
