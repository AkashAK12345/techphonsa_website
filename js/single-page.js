document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Navigation Close on Click
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];
    const hamburger = document.querySelector('.nav-hamburger');

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('is-active')) {
                mobileNav.classList.remove('is-active');
                if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // 2. Active Navigation State on Scroll
    const sections = document.querySelectorAll('section[id], main[id="main-content"] > div[id="home"]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 3. Globe Interaction (Intersection Observer)
    const contactSection = document.getElementById('contact');
    const globeContainer = document.getElementById('globe-container');
    const canvas = document.getElementById('globe-canvas');
    let globeInitialized = false;

    if (contactSection && globeContainer && canvas) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !globeInitialized) {
                    globeInitialized = true;
                    initGlobe(canvas, globeContainer, prefersReducedMotion);
                }
            });
        }, { threshold: 0.2 });

        contactObserver.observe(contactSection);
    }

    // 4. Cinematic View Transitions
    const viewTransitionLinks = document.querySelectorAll('a[href^="#"]');
    let isTransitioning = false;

    viewTransitionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            // Check API support and reduced motion
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!document.startViewTransition || prefersReducedMotion) {
                // Fallback: let native smooth scrolling handle it
                return;
            }

            e.preventDefault();

            if (isTransitioning) return;
            
            const currentScrollY = window.scrollY;
            const targetRect = targetSection.getBoundingClientRect();
            
            // Determine spatial direction
            const isTargetBelow = targetRect.top > 10; 
            const direction = isTargetBelow ? 'down' : 'up';
            
            // If already at target, do nothing
            if (Math.abs(targetRect.top) < 10 && targetId !== '#home') return;
            if (targetId === '#home' && currentScrollY < 10) return;

            isTransitioning = true;
            document.documentElement.setAttribute('data-transition-dir', direction);
            
            // Lock interaction
            document.body.style.pointerEvents = 'none';

            // Push state for URL (wrap in try/catch for file:/// origins)
            try {
                history.pushState(null, '', targetId);
            } catch (err) {
                console.warn('history.pushState failed, likely due to file:/// origin');
            }

            const targetScrollY = targetId === '#home' ? 0 : targetSection.getBoundingClientRect().top + window.scrollY;

            try {
                const transition = document.startViewTransition(() => {
                    // Temporarily disable CSS smooth scrolling to guarantee instant scroll
                    const html = document.documentElement;
                    const originalScrollBehavior = html.style.scrollBehavior;
                    html.style.scrollBehavior = 'auto';
                    
                    window.scrollTo({ top: targetScrollY, behavior: 'instant' });
                    
                    // Restore original behavior
                    html.style.scrollBehavior = originalScrollBehavior;
                });

                // Cleanup after transition
                transition.finished.finally(() => {
                    isTransitioning = false;
                    document.body.style.pointerEvents = '';
                    document.documentElement.removeAttribute('data-transition-dir');
                });
            } catch (e) {
                isTransitioning = false;
                document.body.style.pointerEvents = '';
                document.documentElement.removeAttribute('data-transition-dir');
                window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
            }
        });
    });
});

function initGlobe(canvas, container, reducedMotion) {
    const ctx = canvas.getContext('2d');
    let width, height;
    
    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    container.style.opacity = '1';

    const radius = Math.min(width, height) * 0.4;
    const numLatitudes = 12;
    const numLongitudes = 24;
    let points = [];
    
    // Generate points
    for (let i = 0; i <= numLatitudes; i++) {
        const phi = Math.PI * i / numLatitudes;
        for (let j = 0; j < numLongitudes; j++) {
            const theta = 2 * Math.PI * j / numLongitudes;
            const x = Math.sin(phi) * Math.cos(theta);
            const y = Math.cos(phi);
            const z = Math.sin(phi) * Math.sin(theta);
            points.push({ ox: x, oy: y, oz: z, currentScale: 0 }); // start scale 0 for unfold
        }
    }

    let time = 0;
    const startTime = performance.now();
    const unfoldDuration = reducedMotion ? 0 : 2000;

    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        const now = performance.now();
        const elapsed = now - startTime;
        let progress = Math.min(elapsed / unfoldDuration, 1);
        if (reducedMotion) progress = 1;
        
        // Easing function for unfold (easeOutQuart)
        const ease = 1 - Math.pow(1 - progress, 4);

        time += reducedMotion ? 0.001 : 0.005;
        const rotationX = time * 0.5;
        const rotationY = time;

        const cx = width / 2;
        const cy = height / 2;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;

        // Project and draw
        const projected = [];
        points.forEach((p, index) => {
            // Update scale for unfold animation
            p.currentScale = ease;
            
            let x = p.ox * p.currentScale;
            let y = p.oy * p.currentScale;
            let z = p.oz * p.currentScale;

            // Rotate X
            let tempY = y * Math.cos(rotationX) - z * Math.sin(rotationX);
            let tempZ = y * Math.sin(rotationX) + z * Math.cos(rotationX);
            y = tempY; z = tempZ;

            // Rotate Y
            let tempX = x * Math.cos(rotationY) + z * Math.sin(rotationY);
            tempZ = -x * Math.sin(rotationY) + z * Math.cos(rotationY);
            x = tempX; z = tempZ;

            // Simple orthographic projection
            const scale = radius;
            projected.push({
                x: cx + x * scale,
                y: cy + y * scale,
                z: z
            });
        });

        // Draw latitudes
        for (let i = 0; i <= numLatitudes; i++) {
            ctx.beginPath();
            for (let j = 0; j < numLongitudes; j++) {
                const idx = i * numLongitudes + j;
                if (j === 0) ctx.moveTo(projected[idx].x, projected[idx].y);
                else ctx.lineTo(projected[idx].x, projected[idx].y);
            }
            ctx.closePath();
            ctx.stroke();
        }

        // Draw longitudes
        for (let j = 0; j < numLongitudes; j++) {
            ctx.beginPath();
            for (let i = 0; i <= numLatitudes; i++) {
                const idx = i * numLongitudes + j;
                if (i === 0) ctx.moveTo(projected[idx].x, projected[idx].y);
                else ctx.lineTo(projected[idx].x, projected[idx].y);
            }
            ctx.stroke();
        }

        requestAnimationFrame(draw);
    }
    
    draw();
}
