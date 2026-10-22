import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Reveals matching children once without a scroll handler. The ready class is
 * applied only after hydration, so content remains visible if JavaScript is
 * unavailable.
 */
export function useRevealOnScroll(
  scopeRef: RefObject<HTMLElement | null>,
  selector: string,
  options: { repeat?: boolean } = {},
) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const items = Array.from(scope.querySelectorAll<HTMLElement>(selector));
    if (!items.length) return;

    scope.classList.add('reveal-ready');

    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      items.forEach((item) => item.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            if (!options.repeat) currentObserver.unobserve(entry.target);
            return;
          }

          if (options.repeat) entry.target.classList.remove('is-revealed');
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [scopeRef, selector, options.repeat]);
}
