'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const TARGET_SELECTOR = '[data-reveal]';
const REVEALED_CLASS = 'is-revealed';
const SENTINEL_SELECTOR = '[data-reveal-sentinel]';

/**
 * Single observer for every `[data-reveal]` element on the page.
 *
 * - Reveals once, then stops observing (no re-triggering on scroll up).
 * - Triggers when the element is ~15% inside the viewport.
 * - Reveals anything left once the end-of-page sentinel is reached, so items
 *   pinned to the bottom of the document can never stay hidden.
 * - Keyboard focus reveals its element immediately, even below the fold.
 * - Falls back to showing everything without IntersectionObserver or when
 *   the user switches to reduced motion mid-session.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.setAttribute('data-reveal-ready', '');

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(TARGET_SELECTOR),
    );

    if (targets.length === 0) {
      return;
    }

    const show = (target: Element) => target.classList.add(REVEALED_CLASS);
    const showAll = () => targets.forEach(show);

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    let sentinelObserver: IntersectionObserver | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          show(entry.target);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -15% 0px',
      },
    );

    targets.forEach((target) => observer.observe(target));

    const sentinel = document.querySelector(SENTINEL_SELECTOR);

    if (sentinel) {
      sentinelObserver = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) {
            return;
          }

          showAll();
          observer.disconnect();
          sentinelObserver?.disconnect();
        },
        { threshold: 0 },
      );

      sentinelObserver.observe(sentinel);
    }

    const onFocusIn = (event: FocusEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest(TARGET_SELECTOR)
          : null;

      if (target) {
        show(target);
      }
    };

    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        return;
      }

      showAll();
      observer.disconnect();
      sentinelObserver?.disconnect();
    };

    document.addEventListener('focusin', onFocusIn);
    reduceMotion.addEventListener('change', onMotionPreferenceChange);

    return () => {
      document.removeEventListener('focusin', onFocusIn);
      reduceMotion.removeEventListener('change', onMotionPreferenceChange);
      observer.disconnect();
      sentinelObserver?.disconnect();
    };
  }, [pathname]);

  return (
    <div
      data-reveal-sentinel=""
      aria-hidden="true"
      className="pointer-events-none h-px w-full bg-brand-bg-alt"
    />
  );
}
