/* ================================================================
   TECHPHONSA MOTION & INTERACTION JS v1.0
   Spotlight Cursor, Magnetic CTAs, Scroll Reveals, Page Transitions
   ================================================================ */

(function () {
  'use strict';

  document.documentElement.classList.add('motion-ready');

  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── SPOTLIGHT CURSOR ──────────────────────────────────────── */
  function initSpotlight() {
    if (isTouchDevice || prefersReducedMotion) return;

    const spotlight = document.createElement('div');
    spotlight.id = 'motion-spotlight';
    spotlight.setAttribute('aria-hidden', 'true');
    document.body.appendChild(spotlight);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let ticking = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!ticking) {
        requestAnimationFrame(updateSpotlight);
        ticking = true;
      }
    }, { passive: true });

    function updateSpotlight() {
      // Very slight interpolation for smoothness
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      spotlight.style.transform = `translate(calc(${currentX}px - 50%), calc(${currentY}px - 50%))`;
      
      if (Math.abs(mouseX - currentX) > 0.1 || Math.abs(mouseY - currentY) > 0.1) {
        requestAnimationFrame(updateSpotlight);
      } else {
        ticking = false;
      }
    }
  }

  /* ── MAGNETIC ELEMENTS ─────────────────────────────────────── */
  function initMagnetic() {
    if (isTouchDevice || prefersReducedMotion) return;

    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Dampen the movement (max 4-6px)
        const moveX = x * 0.1;
        const moveY = y * 0.1;
        
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0px, 0px)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      });
      
      el.addEventListener('mouseenter', () => {
        el.style.transition = 'none';
      });
    });
  }

  /* ── SCROLL REVEAL SYSTEM ──────────────────────────────────── */
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length === 0) return;

    if (prefersReducedMotion) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-reveal-delay') || '0';
          
          if (delay !== '0') {
            el.style.transitionDelay = `${delay}ms`;
          }
          
          requestAnimationFrame(() => {
            el.classList.add('is-revealed');
          });
          observer.unobserve(el);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /* ── PAGE TRANSITIONS (View Transitions API & Fallback) ────── */
  function initPageTransitions() {
    if (prefersReducedMotion) return;

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const url = new URL(link.href);
      const isInternal = url.origin === window.location.origin;
      const isSamePage = url.pathname === window.location.pathname;
      const isBlank = link.target === '_blank';
      const isHash = link.getAttribute('href').startsWith('#');

      if (!isInternal || isSamePage || isBlank || isHash) return;

      e.preventDefault();

      const navigate = async () => {
        // Fallback or Native
        if (!document.startViewTransition) {
          // JS Fallback
          document.body.classList.add('page-transitioning');
          setTimeout(() => {
            window.location.href = url.href;
          }, 400); // match roughly CSS transition
          return;
        }

        // Native View Transition
        document.startViewTransition(() => {
          window.location.href = url.href;
        });
      };

      navigate();
    });
  }

  /* ── HERO SCROLL PARALLAX ──────────────────────────────────── */
  function initHeroParallax() {
    if (prefersReducedMotion) return;

    const heroInner = document.querySelector('.hero__inner');
    if (!heroInner) return;

    const hero = heroInner.closest('.hero');
    if (!hero) return;

    let ticking = false;

    function updateParallax() {
      const heroHeight = hero.offsetHeight;
      const scrollY = window.scrollY;

      // Progress 0 → 1 as hero scrolls out of view
      const progress = Math.min(1, Math.max(0, scrollY / heroHeight));

      // Restrained range: translateY 0 → -44px, opacity 1 → 0
      const translateY = progress * -44;
      const opacity    = 1 - progress * 1.1; // slightly faster fade

      heroInner.style.transform = `translateY(${translateY}px)`;
      heroInner.style.opacity   = Math.max(0, opacity);

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── SCROLL-DRIVEN PHRASE TRANSITION ───────────────────────── */
  function initScrollPhrase() {
    if (prefersReducedMotion) return;

    const strip  = document.querySelector('.ticker-strip');
    const track  = document.getElementById('ticker-track');
    const phrase = document.getElementById('ticker-phrase');
    if (!strip || !track || !phrase) return;

    let rafId = null;
    let currentTx = null;
    let targetTx = null;
    let isLerping = false;

    function render() {
      if (targetTx === null) return;
      
      if (currentTx === null) {
        currentTx = targetTx; // Snap on first frame
      } else {
        // Smooth interpolation (lerp)
        currentTx += (targetTx - currentTx) * 0.08;
      }

      track.style.transform = `translateX(${currentTx}px)`;

      // Continue animation loop if we haven't reached target
      if (Math.abs(targetTx - currentTx) > 0.5) {
        rafId = requestAnimationFrame(render);
      } else {
        rafId = null;
        isLerping = false;
      }
    }

    function updateScroll() {
      const scrollY = window.scrollY;

      // Strip's dimensions
      const stripTop    = strip.offsetTop;
      const stripHeight = strip.offsetHeight;
      const vp          = window.innerHeight;

      // To slow down the horizontal movement, we map it over a larger scroll distance.
      // We center this extended range around the point where the strip is vertically centered in the viewport.
      const centerScrollY  = stripTop + (stripHeight / 2) - (vp / 2);
      
      // Increased scroll distance by ~20% to slow down the ticker movement for readability.
      const scrollDistance = Math.max(1560, vp * 2.2);
      
      const rangeStart = centerScrollY - (scrollDistance / 2);
      const rangeEnd   = centerScrollY + (scrollDistance / 2);
      
      const raw      = (scrollY - rangeStart) / (rangeEnd - rangeStart);
      const progress = Math.min(1, Math.max(0, raw));

      const phraseW = phrase.offsetWidth;
      const vpW     = window.innerWidth;

      // Start: phrase left edge completely outside right of viewport
      // End:   phrase right edge completely outside left of viewport
      const startX = vpW + (vpW * 0.05);
      const endX   = -phraseW - (vpW * 0.05);

      targetTx = startX + (endX - startX) * progress;

      if (!isLerping) {
        isLerping = true;
        rafId = requestAnimationFrame(render);
      }
    }

    // Set initial position without waiting for scroll
    updateScroll();

    window.addEventListener('scroll', updateScroll, { passive: true });

    // Recalculate on resize (phrase width changes with font-size clamp)
    window.addEventListener('resize', () => {
      // Force instant snap on resize so it doesn't float weirdly
      currentTx = null;
      updateScroll();
    }, { passive: true });
  }

  /* ── HOW WE WORK INTRO ─────────────────────────────────────── */
  function initHowWeWorkIntro() {
    if (prefersReducedMotion) return;

    const track = document.querySelector('.hww-intro-track');
    const word1 = document.getElementById('hww-word-1');
    const word2 = document.getElementById('hww-word-2');
    const word3 = document.getElementById('hww-word-3');
    
    if (!track || !word1 || !word2 || !word3) return;

    let rafId = null;
    let isLerping = false;
    
    // Core state
    let state = 0; 
    let animationLocked = false;
    let gestureConsumed = false;
    
    const ANIMATION_DURATION_MS = 600;
    const WHEEL_IDLE_MS = 200;
    const SCROLL_THRESHOLD = 50; 
    
    let accumulatedDelta = 0;
    let wheelIdleTimeout = null;
    let touchStartY = 0;

    const targets = [null, null, null];
    const currents = [null, null, null];
    const startY = [-window.innerHeight, -window.innerHeight, -window.innerHeight];

    function updateTargets() {
      targets[0] = state >= 1 ? 0 : startY[0];
      targets[1] = state >= 2 ? 0 : startY[1];
      targets[2] = state >= 3 ? 0 : startY[2];

      if (!isLerping) {
        isLerping = true;
        rafId = requestAnimationFrame(render);
      }
    }

    function render() {
      let needsUpdate = false;
      for (let i = 0; i < 3; i++) {
        if (targets[i] === null) continue;
        if (currents[i] === null) {
          currents[i] = targets[i];
        } else {
          currents[i] += (targets[i] - currents[i]) * 0.08;
        }
        
        if (Math.abs(targets[i] - currents[i]) > 0.5) needsUpdate = true;
      }
      
      if (currents[0] !== null) word1.style.transform = `translateY(${currents[0]}px)`;
      if (currents[1] !== null) word2.style.transform = `translateY(${currents[1]}px)`;
      if (currents[2] !== null) word3.style.transform = `translateY(${currents[2]}px)`;
      
      if (needsUpdate) {
        rafId = requestAnimationFrame(render);
      } else {
        rafId = null;
        isLerping = false;
      }
    }

    function triggerStateTransition(newState) {
      if (newState === state) return;
      state = newState;
      updateTargets();
      
      gestureConsumed = true;
      animationLocked = true;
      
      if (state >= 1) {
        track.classList.add('hww-bg-active');
      } else {
        track.classList.remove('hww-bg-active');
      }

      setTimeout(() => {
        animationLocked = false;
      }, ANIMATION_DURATION_MS);
    }

    function isIntroActive() {
      // If we are mid-transition (states 1, 2, 3), the intro is definitively active 
      if (state > 0 && state < 4) return true;
      
      const rect = track.getBoundingClientRect();
      const trackTop = rect.top;
      const maxScroll = -(rect.height - window.innerHeight);
      
      return trackTop <= 5 && trackTop >= (maxScroll - 5);
    }

    function handleScrollGesture(deltaY, e) {
      if (!isIntroActive()) return;

      const isDown = deltaY > 0;
      const isUp = deltaY < 0;

      let shouldIntercept = false;

      if (isDown) {
        if (state < 3) {
          shouldIntercept = true;
        } else if (state === 3) {
          // At state 3, we only intercept if we are still absorbing the momentum from gesture 3
          // or if the WORK animation is still falling.
          if (animationLocked || gestureConsumed) {
            shouldIntercept = true;
          }
        }
      } else if (isUp) {
        if (state > 0 && state < 4) {
          shouldIntercept = true;
        } else if (state === 4) {
          // If they scroll up from the content back into the track, we intercept and lock!
          shouldIntercept = true;
        } else if (state === 0) {
          if (animationLocked || gestureConsumed) {
            shouldIntercept = true;
          }
        }
      }

      if (shouldIntercept) {
        if (e && e.cancelable) e.preventDefault();
      } else {
        // Safe to exit: this is the explicit 4th gesture downward, or the upward gesture from state 0
        if (isDown && state === 3) {
          state = 4;
        }
        return;
      }

      // Ignore input if we are locked
      if (animationLocked || gestureConsumed) {
        return;
      }

      accumulatedDelta += deltaY;

      if (accumulatedDelta > SCROLL_THRESHOLD && state < 4) {
        triggerStateTransition(state + 1);
        accumulatedDelta = 0;
      } else if (accumulatedDelta < -SCROLL_THRESHOLD && state > 0) {
        triggerStateTransition(state - 1);
        accumulatedDelta = 0;
      }
    }

    window.addEventListener('wheel', (e) => {
      // Re-arm gesture latch based on wheel idleness
      clearTimeout(wheelIdleTimeout);
      wheelIdleTimeout = setTimeout(() => { 
        gestureConsumed = false; 
        accumulatedDelta = 0;
      }, WHEEL_IDLE_MS);
      
      handleScrollGesture(e.deltaY, e);
    }, { passive: false });

    window.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
      accumulatedDelta = 0;
      gestureConsumed = false; // Fresh swipe
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY; 
      
      handleScrollGesture(deltaY, e);
    }, { passive: false });
    
    window.addEventListener('touchend', () => {
      setTimeout(() => {
        gestureConsumed = false;
        accumulatedDelta = 0;
      }, 50);
    }, { passive: true });

    // Guardrail: explicitly pin the scroll position if the browser naturally scrolls out
    // of the capture zone while a transition is locked inside.
    let isCorrectingScroll = false;
    window.addEventListener('scroll', () => {
      if (isCorrectingScroll) return;
      
      const scrollY = window.scrollY;
      const minScroll = track.offsetTop;
      const maxScroll = track.offsetTop + track.offsetHeight - window.innerHeight;

      if (state < 4 && scrollY > maxScroll) {
        isCorrectingScroll = true;
        window.scrollTo(0, maxScroll);
        setTimeout(() => { isCorrectingScroll = false; }, 50);
      } else if (state > 0 && scrollY < minScroll) {
        isCorrectingScroll = true;
        window.scrollTo(0, minScroll);
        setTimeout(() => { isCorrectingScroll = false; }, 50);
      }
    }, { passive: true });

    updateTargets();
    window.addEventListener('resize', () => {
      currents.fill(null);
      startY[0] = -window.innerHeight;
      startY[1] = -window.innerHeight;
      startY[2] = -window.innerHeight;
      updateTargets();
    }, { passive: true });
  }


  /* ── HOW WE WORK PILLARS (PHOTO + PRINCIPLES) ───────────────── */
  function initHowWeWorkPillars() {
    const section   = document.querySelector('.hww-pillars-section');
    const photoWrap = document.getElementById('hww-photo-wrap');
    const principles = [
      document.getElementById('hww-principle-1'),
      document.getElementById('hww-principle-2'),
      document.getElementById('hww-principle-3'),
      document.getElementById('hww-principle-4'),
    ];

    if (!section || !photoWrap || principles.some(p => !p)) return;

    // Reduced motion: show everything immediately, no scroll interplay
    if (prefersReducedMotion) {
      photoWrap.style.transform = 'translateY(0)';
      principles.forEach(p => p.classList.add('is-visible'));
      return;
    }

    // Scroll thresholds (as fraction of total scrollable distance)
    const PHOTO_RISE_END   = 0.18; // photo fully in place by 18%
    const PRINCIPLE_STARTS = [0.20, 0.40, 0.60, 0.78]; // each card reveals here

    let photoTarget  = window.innerHeight; // starts below viewport
    let photoCurrent = null;
    let isAnimating  = false;

    function getProgress() {
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return 0;
      const scrolled = Math.max(0, -section.getBoundingClientRect().top);
      return Math.min(1, scrolled / scrollable);
    }

    function updateFromScroll() {
      const progress = getProgress();

      // ── Photo rise ──────────────────────────────────────────────
      const photoP  = Math.max(0, Math.min(1, progress / PHOTO_RISE_END));
      photoTarget   = (1 - photoP) * window.innerHeight;

      // ── Principle reveals (CSS transition handles the animation) ─
      principles.forEach((el, i) => {
        if (progress >= PRINCIPLE_STARTS[i]) {
          el.classList.add('is-visible');
        } else {
          el.classList.remove('is-visible');
        }
      });

      // Kick off rAF loop for the smooth photo lerp
      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(renderPhoto);
      }
    }

    function renderPhoto() {
      if (photoCurrent === null) {
        photoCurrent = photoTarget;
      } else {
        photoCurrent += (photoTarget - photoCurrent) * 0.09;
      }
      photoWrap.style.transform = `translateY(${photoCurrent}px)`;

      if (Math.abs(photoTarget - photoCurrent) > 0.5) {
        requestAnimationFrame(renderPhoto);
      } else {
        photoCurrent = photoTarget; // snap to exact value
        photoWrap.style.transform = `translateY(${photoCurrent}px)`;
        isAnimating = false;
      }
    }

    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', () => {
      photoCurrent = null;
      updateFromScroll();
    }, { passive: true });

    updateFromScroll(); // initialise on load
  }

  /* ── INIT ────────────────────────────────────────────── */
  function init() {
    initSpotlight();
    initMagnetic();
    initScrollReveals();
    initPageTransitions();
    initHeroParallax();
    initScrollPhrase();
    initHowWeWorkIntro();
    initHowWeWorkPillars();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
