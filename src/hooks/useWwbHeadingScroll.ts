import { useEffect, useRef } from 'react';

export function useWwbHeadingScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId: number | null = null;
    let currentX = 0;
    let targetX = 0;
    let isDesktop = window.innerWidth >= 900; // Matches CSS breakpoint

    const calculateTarget = () => {
      if (!isDesktop) {
        targetX = 0;
        return;
      }
      
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      
      // Navigation height approx 80px + 40px padding = 120px sticky top
      const stickyTop = 120; 
      
      const distance = vh - stickyTop;
      const scrolled = vh - rect.top;
      
      let p = scrolled / distance;
      p = Math.max(0, Math.min(1, p)); // clamp 0 to 1
      
      // Start 40vw to the right, animate to 0
      const startX = window.innerWidth * 0.4; 
      
      targetX = startX * (1 - p);
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.1;
      
      heading.style.transform = `translateX(${currentX}px)`;

      if (Math.abs(targetX - currentX) > 0.5) {
        rafId = requestAnimationFrame(loop);
      } else {
        heading.style.transform = `translateX(${targetX}px)`;
        rafId = null;
      }
    };

    const handleScroll = () => {
      calculateTarget();
      if (rafId === null) {
        rafId = requestAnimationFrame(loop);
      }
    };

    const handleResize = () => {
      isDesktop = window.innerWidth >= 900;
      if (!isDesktop) {
        heading.style.transform = 'translateX(0)';
      }
      handleScroll();
    };

    handleResize();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return { sectionRef, headingRef };
}
