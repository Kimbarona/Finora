"use client";

import { useEffect } from "react";

/**
 * One observer for the entire page.
 *
 * Mounted once in the layout, it reveals every `[data-reveal]` element as it
 * enters the viewport and then stops watching it. If the visitor prefers
 * reduced motion — or the browser has no IntersectionObserver — everything is
 * revealed immediately, so content is never gated behind an animation.
 */
export function RevealObserver() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (elements.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      elements.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    elements.forEach((el) => {
      // Anything already on screen at load shows without waiting for a scroll.
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("is-revealed");
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
