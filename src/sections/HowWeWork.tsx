import { useEffect, useRef } from 'react';
import hww1 from '../../assets/hww1.jpg';
import hww2 from '../../assets/hww2.jpg';
import hww3 from '../../assets/hww3.jpg';
import hww4 from '../../assets/hww4.jpg';

/* ─── card data ─────────────────────────────────────────────────────── */
const CARDS = [
  {
    id: 'hww-card-1',
    num: '01',
    title: 'QUALITY YOU CAN RELY ON',
    body: 'Every project is scoped, overseen, and delivered directly by our team, from first call to final handoff.',
    col: 0, // 0 = left, 1 = right
    row: 0, // 0 = top,  1 = bottom
    image: hww1,
  },
  {
    id: 'hww-card-2',
    num: '02',
    title: 'REAL TECHNICAL BACKGROUND',
    body: 'Hands-on experience with RAG systems, vector databases, and applied machine learning — not marketing language borrowed from bigger companies.',
    col: 1,
    row: 0,
    image: hww2,
  },
  {
    id: 'hww-card-3',
    num: '03',
    title: 'SMALL BY DESIGN, FOR NOW',
    body: 'We take on a limited number of clients at a time, so every project gets real attention instead of a place in a queue.',
    col: 0,
    row: 1,
    image: hww3,
  },
  {
    id: 'hww-card-4',
    num: '04',
    title: 'TRANSPARENT PRICING',
    body: 'Setup costs and monthly retainers are explained upfront — no hidden fees, no vague "contact us for a quote" stalling.',
    col: 1,
    row: 1,
    image: hww4,
  },
] as const;

/* ─── easing ────────────────────────────────────────────────────────── */
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/* ─── component ─────────────────────────────────────────────────────── */
const HowWeWork = () => {
  // title track
  const titleTrackRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const word3Ref = useRef<HTMLSpanElement>(null);

  // card deck
  const deckTrackRef = useRef<HTMLDivElement>(null);
  // stageRef is the absolutely-positioned container INSIDE the sticky viewport.
  // Cards are absolute children of this stage — they can never escape the sticky.
  const stageRef    = useRef<HTMLDivElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId: number | null = null;

    /* ── scroll progress for a track element ────────────────────────── */
    const trackProgress = (trackEl: HTMLDivElement): number => {
      const rect   = trackEl.getBoundingClientRect();
      const scrolled = -rect.top;                         // px scrolled past top of track
      const runway   = trackEl.offsetHeight - window.innerHeight; // total animatable px
      if (runway <= 0) return 1;
      return Math.max(0, Math.min(1, scrolled / runway));
    };

    /* ── word reveal ─────────────────────────────────────────────────── */
    const applyWordStyle = (
      el: HTMLSpanElement | null,
      start: number,
      end: number,
      prog: number,
    ) => {
      if (!el) return;
      if (prefersReduced) { el.style.opacity = '1'; el.style.transform = 'none'; return; }
      if (prog <= start) {
        el.style.opacity = '0'; el.style.transform = 'translateY(40px)';
      } else if (prog >= end) {
        el.style.opacity = '1'; el.style.transform = 'translateY(0px)';
      } else {
        const t = easeOutQuart((prog - start) / (end - start));
        el.style.opacity = String(t);
        el.style.transform = `translateY(${(1 - t) * 40}px)`;
      }
    };

    /* ── card deck ───────────────────────────────────────────────────── */
    /*
      THE FIX: cards use position: absolute inside .hww-deck-stage,
      which itself is position: absolute; inset: 0 inside .hww-deck-sticky.

      While the sticky is "stuck", the stage fills the viewport exactly,
      so pixel coordinates are identical to what fixed would produce.
      When scrolling past the track, the sticky un-sticks and scrolls
      away normally — carrying the absolutely-positioned cards with it.
      Cards can never bleed into adjacent sections.
    */

    const getCardGeometry = (stageEl: HTMLDivElement) => {
      const sw = stageEl.offsetWidth;
      const sh = stageEl.offsetHeight;

      const isMobile = sw < 640;
      const isTablet = sw < 960;

      // Outer margins (substantial padding from the edges to feel editorial, not pinned)
      const marginX = isMobile ? 24 : isTablet ? 40 : Math.max(64, sw * 0.08);
      const marginY = isMobile ? 24 : isTablet ? 40 : Math.max(64, sh * 0.06);

      // Central gaps (moderate, not massive)
      const centralGapX = isMobile ? 16 : isTablet ? 32 : Math.max(40, sw * 0.04);
      const centralGapY = isMobile ? 16 : isTablet ? 32 : Math.max(40, sh * 0.04);

      // 1. Establish preferred card width based heavily on viewport width
      // The cards perfectly fill the available space after margins and gap
      const maxAvailableW = (sw - (marginX * 2) - centralGapX) / 2;
      const cardW = Math.max(160, maxAvailableW); // Minimum bound just for extreme edge cases

      // 2. Establish card height
      // Aspect ratio for the image container (matches CSS media queries)
      const imgRatio = isMobile ? (9 / 16) : (11 / 16);
      
      // Required height for content area to prevent clipping the longest description
      // Number + Title (can wrap) + Divider + 5-line Desc + Padding requires generous space
      const contentH = isMobile ? 260 : 280;

      // All 4 cards have exactly identical dimensions
      const cardH = (cardW * imgRatio) + contentH;

      // 3. Position the cards using their actual dimensions
      const leftX = marginX;
      const rightX = sw - marginX - cardW;
      
      const topY = marginY;
      const bottomY = marginY + cardH + centralGapY;

      // 4. Protect the next section from overlap
      // Since cards are now substantial, their 2x2 grid might exceed 100vh (sh).
      // We MUST expand the sticky container height so it doesn't clip them, and so it scrolls 
      // natively away before the About section enters.
      const totalRequiredH = marginY + cardH + centralGapY + cardH + marginY;
      const stickyEl = stageEl.parentElement;
      if (stickyEl) {
        stickyEl.style.height = `${Math.max(sh, totalRequiredH)}px`;
      }

      return {
        cardW, cardH,
        // Calculate center points for absolute positioning based on exactly the requested coordinate system
        finalCX: (col: number) => col === 0 ? leftX + cardW / 2 : rightX + cardW / 2,
        finalCY: (row: number) => row === 0 ? topY + cardH / 2 : bottomY + cardH / 2,
        stackCX: sw / 2,
        stackCY: Math.max(sh, totalRequiredH) / 2,
      };
    };

    const applyCardStyles = () => {
      if (!deckTrackRef.current || !stageRef.current) return;

      const prog = prefersReduced ? 1 : trackProgress(deckTrackRef.current);
      const geo  = getCardGeometry(stageRef.current);

      // 7. FINAL COMPOSITION MUST BE STABLE BEFORE LEAVING THE DECK
      // All cards converge simultaneously at 0.70 progress, leaving a 30% HOLD PHASE.
      const stages = [
        { start: 0.00, end: 0.70 },
        { start: 0.00, end: 0.70 },
        { start: 0.00, end: 0.70 },
        { start: 0.00, end: 0.70 },
      ];

      CARDS.forEach((card, i) => {
        const el = cardRefs.current[i];
        if (!el) return;

        const { start, end } = stages[i];
        const { col, row }   = card;

        const destCX = geo.finalCX(col);
        const destCY = geo.finalCY(row);
        const srcCX  = geo.stackCX;
        const srcCY  = geo.stackCY;

        const local = prog <= start ? 0 : prog >= end ? 1 : (prog - start) / (end - start);
        const ease  = easeOutQuart(local);

        const cx = lerp(srcCX, destCX, ease);
        const cy = lerp(srcCY, destCY, ease);

        // Subtle arc rotation — peaks mid-travel, zero at rest
        const maxRot = col === 0 ? -2 : 2;
        const rot = maxRot * ease * (1 - ease) * 4; // bell curve, 0 at start and end

        // z-index: stack is 01(top)→04(bottom) initially.
        // Cards that have started moving go above those still in stack.
        const baseZ     = CARDS.length - i;  // card 01 = 4, 02 = 3, 03 = 2, 04 = 1
        const departedZ = 10 + i;
        const zIndex    = local > 0 ? departedZ : baseZ;

        // ── CRITICAL CHANGE: position absolute, not fixed ──────────────
        el.style.position    = 'absolute';
        el.style.width       = `${geo.cardW}px`;
        el.style.height      = `${geo.cardH}px`;
        // Translate from center coords to top-left for absolute positioning
        el.style.left        = `${cx - geo.cardW / 2}px`;
        el.style.top         = `${cy - geo.cardH / 2}px`;
        el.style.transform   = `rotate(${rot}deg)`;
        el.style.zIndex      = String(zIndex);
        el.style.opacity     = '1';
        el.style.margin      = '0';
        el.style.pointerEvents = local >= 1 ? 'auto' : 'none';
      });
    };

    /* ── scroll / resize handler ─────────────────────────────────────── */
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        if (titleTrackRef.current) {
          const p = trackProgress(titleTrackRef.current);
          applyWordStyle(word1Ref.current, 0.00, 0.25, p);
          applyWordStyle(word2Ref.current, 0.25, 0.50, p);
          applyWordStyle(word3Ref.current, 0.50, 0.75, p);
        }
        applyCardStyles();
      });
    };

    // Reduced-motion: show everything immediately
    if (prefersReduced) {
      [word1Ref.current, word2Ref.current, word3Ref.current].forEach((el) => {
        if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
      });
    }

    // Initial paint
    applyCardStyles();
    onScroll();

    window.addEventListener('scroll', onScroll,         { passive: true });
    window.addEventListener('resize', applyCardStyles,  { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', applyCardStyles);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="hww-editorial-section" id="how-we-work" aria-labelledby="hww-heading">

      {/* ── 1. TITLE TRACK ─────────────────────────────────────────────── */}
      <div className="hww-title-track" ref={titleTrackRef}>
        <div className="hww-title-sticky">
          <h2 className="hww-headline" id="hww-heading">
            <span className="hww-word" ref={word1Ref}>HOW</span>
            <span className="hww-word" ref={word2Ref}>WE</span>
            <span className="hww-word" ref={word3Ref}>WORK</span>
          </h2>
        </div>
      </div>

      {/* ── 2. CARD DECK TRACK ─────────────────────────────────────────── */}
      {/*
        Cards live INSIDE .hww-deck-stage, which is absolute inside
        .hww-deck-sticky.  The sticky element handles "keep in view".
        When it un-sticks at the end of the track, it scrolls away
        with the cards — they never paint over the next section.
      */}
      <div className="hww-deck-track" ref={deckTrackRef}>
        <div className="hww-deck-sticky">
          {/* Full-viewport canvas for absolute card placement */}
          <div className="hww-deck-stage" ref={stageRef}>
            {CARDS.map((card, i) => (
              <div
                key={card.id}
                id={card.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="hww-card"
                aria-label={`Principle ${card.num}: ${card.title}`}
              >
                <div className="hww-card__image-wrap">
                  <img src={card.image} alt={`How We Work — ${card.title}`} className="hww-card__image" />
                </div>
                <div className="hww-card__content">
                  <span className="hww-card__num">{card.num}</span>
                  <h3 className="hww-card__title">{card.title}</h3>
                  <hr className="hww-card__rule" />
                  <p className="hww-card__body">{card.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Subtle bottom label */}
          <span className="hww-deck-eyebrow" aria-hidden="true">Our four principles</span>
        </div>
      </div>

      {/* ── 3. REDUCED-MOTION FALLBACK ─────────────────────────────────── */}
      {/*
        Displayed only under prefers-reduced-motion: reduce.
        aria-hidden because the real cards above still carry the content.
      */}
      <div className="hww-static-fallback" aria-hidden="true">
        {CARDS.map((card) => (
          <div key={`static-${card.id}`} className="hww-static-card">
            <div className="hww-card__image-wrap">
              <img src={card.image} alt="" className="hww-card__image" />
            </div>
            <div className="hww-card__content">
              <span className="hww-card__num">{card.num}</span>
              <h3 className="hww-card__title">{card.title}</h3>
              <hr className="hww-card__rule" />
              <p className="hww-card__body">{card.body}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default HowWeWork;
