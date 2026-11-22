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

// 2. Floating Fragment Pop: spring physics with lively character
export const SPRING_POP: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 24,
  mass: 0.85
};

// 3. Viewport Trigger Default - sensitive threshold so animation triggers immediately when scrolled into view
export const VIEWPORT_DEFAULT = {
  once: true,
  amount: 0.12
} as const;

// Standard fade-up variants with palpable 28px slide
export const createFadeUpVariants = (yOffset = 28, duration = 0.55, delay = 0): Variants => ({
  hidden: {
    opacity: 0,
    y: yOffset
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: REVEAL_EASE
    }
  }
});

// Detached Fragment Pop variants with spring pop and stagger
export const createPopVariants = (delay = 0.25, yOffset = 16): Variants => ({
  hidden: {
    opacity: 0,
    scale: 0.88,
    y: yOffset
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      ...SPRING_POP,
      delay
    }
  }
});
