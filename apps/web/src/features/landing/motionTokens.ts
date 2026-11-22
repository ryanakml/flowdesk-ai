import type { Transition, Variants } from "framer-motion";

// Safe polyfill for environments without IntersectionObserver (e.g. jsdom / SSR)
if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
  class MockIntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  // @ts-expect-error jsdom fallback
  window.IntersectionObserver = MockIntersectionObserver;
}

/**
 * WhatsApp Reference Design Motion & Choreography Tokens
 * Extracted from /Users/ryanakmalpasya/Downloads/whatsapp.com-DESIGN.md
 */

// 1. Core Easing: cubic-bezier(0.22, 1, 0.36, 1) - smooth deceleration, zero overshoot
export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

// 2. Floating Fragment Pop: spring physics
export const SPRING_POP: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 26,
  mass: 0.9
};

// 3. Viewport Trigger Default
export const VIEWPORT_DEFAULT = {
  once: true,
  amount: 0.22
} as const;

// Standard fade-up variants with reduced motion support
export const createFadeUpVariants = (
  yOffset = 28,
  duration = 0.55,
  delay = 0,
  reduced = false
): Variants => ({
  hidden: {
    opacity: 0,
    y: reduced ? 0 : yOffset
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reduced ? 0.05 : duration,
      delay: reduced ? 0 : delay,
      ease: REVEAL_EASE
    }
  }
});

// Detached Fragment Pop variants (+180ms delay, spring physics)
export const createPopVariants = (delay = 0.18, yOffset = 12, reduced = false): Variants => ({
  hidden: {
    opacity: 0,
    scale: reduced ? 1 : 0.92,
    y: reduced ? 0 : yOffset
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: reduced
      ? { duration: 0.05 }
      : {
          ...SPRING_POP,
          delay
        }
  }
});
