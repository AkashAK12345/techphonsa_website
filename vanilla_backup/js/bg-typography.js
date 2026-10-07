/**
 * bg-typography.js
 * Controls the oversized, kinetic typographic background effect in the HOW WE WORK section.
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const section = document.querySelector('.home-trust');
  const container = document.querySelector('.trust-typography-container');
  const trackTop = document.querySelector('.trust-typography-track--top');
  const trackBottom = document.querySelector('.trust-typography-track--bottom');

  if (!section || !container || !trackTop || !trackBottom) return;

  let isVisible = false;
  let targetProgress = 0;
  let currentProgress = 0;
  let animationFrameId = null;

  // Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '100px 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible = true;
        container.style.opacity = '1';
        startAnimationLoop();
      } else {
        isVisible = false;
        container.style.opacity = '0';
        stopAnimationLoop();
      }
    });
  }, observerOptions);

  observer.observe(section);

  function updateTargetProgress() {
    if (!isVisible) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const totalTravel = rect.height + windowHeight;
    const distanceTraveled = windowHeight - rect.top;
    
    let progress = distanceTraveled / totalTravel;
    progress = Math.max(0, Math.min(1, progress));
    
    targetProgress = progress;
  }

  window.addEventListener('scroll', updateTargetProgress, { passive: true });
  window.addEventListener('resize', updateTargetProgress, { passive: true });
  
  updateTargetProgress();
  currentProgress = targetProgress;

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function startAnimationLoop() {
    if (!animationFrameId) {
      render();
    }
  }

  function stopAnimationLoop() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  function render() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }

    currentProgress = lerp(currentProgress, targetProgress, 0.05);

    if (Math.abs(targetProgress - currentProgress) > 0.001) {
      applyTransforms(currentProgress);
    }

    animationFrameId = requestAnimationFrame(render);
  }

  function applyTransforms(progress) {
    // We want the text to translate leftwards as we scroll down.
    // The viewport is our mask. We need to move enough to feel kinetic but not run out of text.
    // The track contains 8 repetitions, which is huge.
    // Let's translate from 0 to -30% of its own width. (Or -100vw).
    // Using percentages of the element itself:
    
    // Top track moves linearly
    const topTranslateX = lerp(0, -30, progress); 
    
    // Bottom track moves slightly faster or offsets to create the "sliced" geometric offset effect.
    // We start it offset slightly left (e.g. -2%), and let it move slightly further.
    const bottomTranslateX = lerp(-2, -35, progress); 

    // Note: since the tracks have transform: translateY(-50%) in CSS to center them vertically,
    // we must preserve that.
    trackTop.style.transform = `translate3d(${topTranslateX}%, -50%, 0)`;
    trackBottom.style.transform = `translate3d(${bottomTranslateX}%, -50%, 0)`;
  }

  applyTransforms(currentProgress);
});
