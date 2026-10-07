/**
 * ribbon.js
 * Controls the subtle, flowing 3D scroll-driven ribbon effect in the HOW WE WORK section.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const section = document.querySelector('.home-trust');
  const container = document.querySelector('.trust-ribbon-container');
  const ribbonGroup = document.querySelector('.trust-ribbon-group');
  const path1 = document.querySelector('.trust-ribbon-path--1');
  const path2 = document.querySelector('.trust-ribbon-path--2');

  if (!section || !container || !ribbonGroup || !path1 || !path2) return;

  let isVisible = false;
  let targetProgress = 0;
  let currentProgress = 0;
  let animationFrameId = null;

  // Intersection Observer to only run loop when section is near viewport
  const observerOptions = {
    root: null,
    rootMargin: '100px 0px', // Start slightly before it enters
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible = true;
        // Fade in
        container.style.opacity = '1';
        startAnimationLoop();
      } else {
        isVisible = false;
        // Fade out when leaving to prevent abrupt jumps if it somehow snaps
        container.style.opacity = '0';
        stopAnimationLoop();
      }
    });
  }, observerOptions);

  observer.observe(section);

  // Update target progress on scroll
  function updateTargetProgress() {
    if (!isVisible) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Total travel distance: viewport height + section height
    // Starts when top of section hits bottom of viewport
    // Ends when bottom of section hits top of viewport
    const totalTravel = rect.height + windowHeight;
    const distanceTraveled = windowHeight - rect.top;
    
    let progress = distanceTraveled / totalTravel;
    
    // Clamp between 0 and 1
    progress = Math.max(0, Math.min(1, progress));
    
    targetProgress = progress;
  }

  window.addEventListener('scroll', updateTargetProgress, { passive: true });
  window.addEventListener('resize', updateTargetProgress, { passive: true });
  
  // Initial calculation
  updateTargetProgress();
  // Set current progress immediately to target to avoid jumping on load
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

    // Smoothly interpolate current progress towards target progress
    currentProgress = lerp(currentProgress, targetProgress, 0.05);

    // Stop updating DOM if we are extremely close to the target to save CPU
    if (Math.abs(targetProgress - currentProgress) > 0.001) {
      applyTransforms(currentProgress);
    }

    animationFrameId = requestAnimationFrame(render);
  }

  function applyTransforms(progress) {
    // Progress goes from 0 (entering) to 1 (leaving)

    // Base movement ranges
    // We want a slow, continuous drift that feels like one large flowing structure.
    
    // The entire group moves and scales
    const groupTranslateY = lerp(50, -50, progress); // px roughly
    const groupScale = lerp(0.9, 1.1, progress);
    const groupRotate = lerp(-5, 5, progress); // degrees

    ribbonGroup.style.transform = `translateY(${groupTranslateY}px) scale(${groupScale}) rotate(${groupRotate}deg)`;

    // Path 1 (Front ribbon body)
    // Curves and flows slightly faster/wider to create depth separation
    const p1TranslateX = lerp(-20, 20, progress);
    const p1TranslateY = lerp(10, -10, progress);
    const p1ScaleX = lerp(0.8, 1.2, progress);
    const p1ScaleY = lerp(1, 1.1, progress);
    
    path1.style.transform = `translate(${p1TranslateX}px, ${p1TranslateY}px) scale(${p1ScaleX}, ${p1ScaleY})`;

    // Path 2 (Back ribbon body)
    // Moves slower, creating parallax against path 1
    const p2TranslateX = lerp(15, -15, progress);
    const p2TranslateY = lerp(-15, 15, progress);
    const p2ScaleX = lerp(1.1, 0.9, progress);
    
    path2.style.transform = `translate(${p2TranslateX}px, ${p2TranslateY}px) scale(${p2ScaleX}, 1)`;
  }

  // Ensure DOM is updated immediately on load
  applyTransforms(currentProgress);
});
