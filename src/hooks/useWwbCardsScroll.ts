import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export function useWwbCardsScroll(trackRef: RefObject<HTMLElement | null>, numCards: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;

    let frameId: number | null = null;

    const updateActiveCard = () => {
      const rect = track.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const stickyTop = 120; // Approximately nav-h + 40px
      
      if (rect.top > stickyTop) {
        if (activeIndexRef.current !== 0) {
          activeIndexRef.current = 0;
          setActiveIndex(0);
        }
        return;
      }
      
      const scrolledPast = stickyTop - rect.top;
      const totalScrollable = rect.height - windowHeight;
      
      if (totalScrollable <= 0) return;
      
      let p = scrolledPast / totalScrollable;
      p = Math.max(0, Math.min(1, p));
      
      let newIndex = Math.floor(p * numCards);
      if (newIndex >= numCards) newIndex = numCards - 1;
      
      if (newIndex !== activeIndexRef.current) {
        activeIndexRef.current = newIndex;
        setActiveIndex(newIndex);
      }
    };

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateActiveCard();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    updateActiveCard();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [trackRef, numCards]);

  return activeIndex;
}
