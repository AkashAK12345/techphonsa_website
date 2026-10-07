/* ================================================================
   TECHPHONSA CORE JS v1.0
   Mobile navigation · Active page state · Shared behavior
   ================================================================ */

(function () {
  'use strict';

  /* ── ACTIVE NAV STATE ─────────────────────────────────────── */
  function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Apply to top nav links
    document.querySelectorAll('.nav-links a, .nav-mobile-overlay a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;

      const linkPage = href.split('/').pop();
      const isHome = (currentPage === '' || currentPage === 'index.html') &&
                     (linkPage === 'index.html' || href === '/' || href === './');
      const isMatch = linkPage === currentPage;

      if (isHome || isMatch) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /* ── MOBILE NAVIGATION ────────────────────────────────────── */
  function initMobileNav() {
    const hamburger = document.querySelector('.nav-hamburger');
    const overlay   = document.querySelector('.nav-mobile-overlay');
    const closeBtn  = document.querySelector('.nav-mobile-close');

    if (!hamburger || !overlay) return;

    function openMenu() {
      overlay.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close navigation');
      document.body.style.overflow = 'hidden';
      // Focus first link for keyboard users
      const firstLink = overlay.querySelector('a');
      if (firstLink) firstLink.focus();
    }

    function closeMenu() {
      overlay.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open navigation');
      document.body.style.overflow = '';
      hamburger.focus();
    }

    hamburger.addEventListener('click', function () {
      const isOpen = overlay.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    // Close on overlay link click (navigation)
    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeMenu();
      }
    });

    // Close on backdrop click (outside links)
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeMenu();
    });
  }

  /* ── NAV SCROLL BEHAVIOR ──────────────────────────────────── */
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    // Nav is already semi-transparent; on scroll add stronger bg
    let lastY = 0;
    window.addEventListener('scroll', function () {
      const y = window.scrollY;
      if (y > 20) {
        nav.style.background = 'rgba(3, 5, 7, 0.96)';
      } else {
        nav.style.background = '';
      }
      lastY = y;
    }, { passive: true });
  }

  /* ── ENTRANCE ANIMATIONS ──────────────────────────────────── */
  function initEntranceAnimations() {
    // Use IntersectionObserver to trigger fade-up on scroll
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Observe elements with entrance animation classes
    document.querySelectorAll('.anim-fade-up').forEach(function (el) {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  }

  /* ── REDUCED MOTION DETECTION ────────────────────────────── */
  function checkReducedMotion() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      document.documentElement.classList.add('reduced-motion');
    }
  }

  /* ── INIT ─────────────────────────────────────────────────── */
  function init() {
    setActiveNav();
    initMobileNav();
    initNavScroll();
    initEntranceAnimations();
    checkReducedMotion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
