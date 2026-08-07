"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  ElementType,
  ComponentPropsWithoutRef,
} from "react";
import { cn } from "@/lib/utils";

// Shared IntersectionObserver singleton
type ObserverCallback = (entry: IntersectionObserverEntry) => void;
const observerCallbacks = new Map<Element, ObserverCallback>();

let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = observerCallbacks.get(entry.target);
            if (callback) {
              callback(entry);
              observerCallbacks.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.1,
      }
    );
  }

  return sharedObserver;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

export interface RiseProps {
  stagger?: number; // 0, 1, 2, 3 (capped at 4 items: 0..3)
  delay?: number; // Custom delay in ms
  className?: string;
  children: React.ReactNode;
}

export function Rise<T extends ElementType = "div">({
  stagger = 0,
  delay,
  className,
  children,
  as,
  ...props
}: RiseProps & { as?: T } & Omit<ComponentPropsWithoutRef<T>, keyof RiseProps | "as">) {
  const Component = (as || "div") as ElementType;
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      return;
    }

    const observer = getSharedObserver();
    const element = elementRef.current;

    if (!observer || !element) {
      setIsVisible(true);
      return;
    }

    observerCallbacks.set(element, () => {
      setIsVisible(true);
    });

    observer.observe(element);

    return () => {
      if (element) {
        observerCallbacks.delete(element);
        observer.unobserve(element);
      }
    };
  }, [prefersReduced]);

  // Calculate stagger delay (cap stagger index at 3 / max 4 items)
  const cappedStagger = Math.min(Math.max(0, stagger), 3);
  const calculatedDelay = delay !== undefined ? delay : cappedStagger * 90;

  if (prefersReduced) {
    return (
      <Component
        ref={elementRef}
        className={className}
        {...(props as ComponentPropsWithoutRef<ElementType>)}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={elementRef}
      style={{
        transitionDuration: "550ms",
        transitionDelay: `${calculatedDelay}ms`,
      }}
      className={cn(
        "transition-[opacity,transform] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
        className
      )}
      {...(props as ComponentPropsWithoutRef<ElementType>)}
    >
      {children}
    </Component>
  );
}
