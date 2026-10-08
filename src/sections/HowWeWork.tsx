import { useEffect, useRef } from 'react';

const HowWeWork = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const word3Ref = useRef<HTMLSpanElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (trackRef.current) {
            const track = trackRef.current;
            const rect = track.getBoundingClientRect();
            
            // Progress from 0 to 1 over the sticky scroll distance
            const scrollY = -rect.top;
            const maxScroll = track.offsetHeight - window.innerHeight;
            
            let progress = 0;
            if (maxScroll > 0) {
              if (scrollY < 0) {
                progress = 0;
              } else if (scrollY > maxScroll) {
                progress = 1;
              } else {
                progress = scrollY / maxScroll;
              }
            }

            const setWordStyle = (
              wordRef: React.RefObject<HTMLSpanElement | null>,
              start: number,
              end: number,
              prog: number
            ) => {
              if (!wordRef.current) return;
              const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              if (isReducedMotion) {
                wordRef.current.style.opacity = '1';
                wordRef.current.style.transform = 'translateY(0)';
                return;
              }

              if (prog <= start) {
                wordRef.current.style.opacity = '0';
                wordRef.current.style.transform = 'translateY(40px)';
              } else if (prog >= end) {
                wordRef.current.style.opacity = '1';
                wordRef.current.style.transform = 'translateY(0)';
              } else {
                const localProgress = (prog - start) / (end - start);
                const ease = 1 - Math.pow(1 - localProgress, 4);
                wordRef.current.style.opacity = ease.toString();
                wordRef.current.style.transform = `translateY(${(1 - ease) * 40}px)`;
              }
            };

            setWordStyle(word1Ref, 0.0, 0.25, progress);
            setWordStyle(word2Ref, 0.25, 0.50, progress);
            setWordStyle(word3Ref, 0.50, 0.75, progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Intersection Observer for the 4 principles
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1,
      }
    );

    const principles = principlesRef.current?.querySelectorAll('.hww-principle-item');
    principles?.forEach((p) => observer.observe(p));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      principles?.forEach((p) => observer.unobserve(p));
    };
  }, []);

  return (
    <section className="hww-editorial-section" id="how-we-work" aria-labelledby="hww-heading">
      
      <div className="hww-scroll-track" ref={trackRef}>
        <div className="hww-sticky-viewport">
          <h2 className="hww-headline" id="hww-heading">
            <span className="hww-word" ref={word1Ref}>HOW</span>
            <span className="hww-word" ref={word2Ref}>WE</span>
            <span className="hww-word" ref={word3Ref}>WORK</span>
          </h2>
        </div>
      </div>

      <div className="hww-principles-container" ref={principlesRef}>
        <div className="hww-principles-grid">
          
          <div className="hww-principle-item">
            <div className="hww-principle-header">
              <span className="hww-principle-num">01</span>
              <h3 className="hww-principle-title">QUALITY YOU CAN RELY ON</h3>
            </div>
            <hr className="hww-principle-rule" />
            <p className="hww-principle-desc">
              Every project is scoped, overseen, and delivered directly by our team, from first call to final handoff.
            </p>
          </div>

          <div className="hww-principle-item">
            <div className="hww-principle-header">
              <span className="hww-principle-num">02</span>
              <h3 className="hww-principle-title">REAL TECHNICAL BACKGROUND</h3>
            </div>
            <hr className="hww-principle-rule" />
            <p className="hww-principle-desc">
              Hands-on experience with RAG systems, vector databases, and applied machine learning — not marketing language borrowed from bigger companies.
            </p>
          </div>

          <div className="hww-principle-item">
            <div className="hww-principle-header">
              <span className="hww-principle-num">03</span>
              <h3 className="hww-principle-title">SMALL BY DESIGN, FOR NOW</h3>
            </div>
            <hr className="hww-principle-rule" />
            <p className="hww-principle-desc">
              We take on a limited number of clients at a time, so every project gets real attention instead of a place in a queue.
            </p>
          </div>

          <div className="hww-principle-item">
            <div className="hww-principle-header">
              <span className="hww-principle-num">04</span>
              <h3 className="hww-principle-title">TRANSPARENT PRICING</h3>
            </div>
            <hr className="hww-principle-rule" />
            <p className="hww-principle-desc">
              Setup costs and monthly retainers are explained upfront — no hidden fees, no vague "contact us for a quote" stalling.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
