import type { CSSProperties } from 'react';

/**
 * Motion primitives for the site-wide reveal system.
 *
 * The animation itself lives in `globals.css`; these helpers only attach the
 * `data-*` hooks and the CSS custom properties consumed by those rules. That
 * keeps server components server components and avoids shipping animation
 * logic to every section.
 *
 * The reveal is progressive enhancement:
 * - `html.js` is set by an inline script before first paint.
 * - `prefers-reduced-motion: reduce` never receives the hidden state.
 * - `ScrollReveal` reveals everything if the app fails to boot.
 *
 * Only `transform`/opacity are animated, so reveals never shift layout.
 */

export const revealVariants = {
  fadeUp: 'fade-up',
  fadeIn: 'fade-in',
  slideLeft: 'slide-left',
  slideRight: 'slide-right',
  scaleReveal: 'scale',
} as const;

export type RevealVariant = (typeof revealVariants)[keyof typeof revealVariants];

export type EnterVariant = 'fade-up' | 'fade-in' | 'scale';

/** Distance between staggered items in a group (100-150ms per the spec). */
export const STAGGER_STEP = 110;

/** Keeps long lists from accumulating an excessive wait. */
const STAGGER_LIMIT = 8;

type RevealOptions = {
  variant?: RevealVariant;
  delay?: number;
};

type StaggerItemOptions = RevealOptions & {
  step?: number;
};

/** Marks a container whose direct children should stagger in on page load. */
export const staggerContainer = { 'data-enter-group': '' } as const;

/**
 * Marks an element for the shared scroll-reveal observer.
 * Returns the data attribute and the CSS variable used for its delay.
 *
 * Apply it to elements without their own `transform` utilities so the two
 * never compete.
 */
export function reveal({
  variant = revealVariants.fadeUp,
  delay = 0,
}: RevealOptions = {}) {
  return {
    'data-reveal': variant,
    style: { '--reveal-delay': `${delay}ms` } as CSSProperties,
  };
}

/** Delay helper for grouped reveals (cards, metrics, lists, ...). */
export function staggerItem(
  index: number,
  { step = STAGGER_STEP, delay = 0, ...options }: StaggerItemOptions = {},
) {
  return reveal({
    ...options,
    delay: delay + Math.min(index, STAGGER_LIMIT) * step,
  });
}

/** Marks an element for the one-off page-load entrance (used by the hero). */
export function enter({
  variant = 'fade-up',
  delay = 0,
}: {
  variant?: EnterVariant;
  delay?: number;
} = {}) {
  return {
    'data-enter': variant,
    style: { '--enter-delay': `${delay}ms` } as CSSProperties,
  };
}
