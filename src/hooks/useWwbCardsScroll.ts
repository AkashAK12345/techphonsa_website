import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export function useWwbCardsScroll(trackRef: RefObject<HTMLElement | null>, numCards: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;

    const handleScroll = () => {
      const rect = track.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const stickyTop = 120; // Approximately nav-h + 40px
      
      if (rect.top > stickyTop) {
        if (activeIndex !== 0) setActiveIndex(0);
        return;
      }
      
      const scrolledPast = stickyTop - rect.top;
      const totalScrollable = rect.height - windowHeight;
      
      if (totalScrollable <= 0) return;
      
      let p = scrolledPast / totalScrollable;
      p = Math.max(0, Math.min(1, p));
      
      let newIndex = Math.floor(p * numCards);
      if (newIndex >= numCards) newIndex = numCards - 1;
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [trackRef, activeIndex, numCards]);

  return activeIndex;
}
