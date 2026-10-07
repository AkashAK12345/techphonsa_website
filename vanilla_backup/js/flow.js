/**
 * Continuous Spatial Flow & Scroll-Driven Cards
 */

class SpatialFlow {
    constructor() {
        this.track = document.querySelector('.services-scroll-track');
        this.viewport = document.querySelector('.services-viewport');
        this.flowGroup = document.querySelector('.flow-paths');
        this.paths = document.querySelectorAll('.flow-path');
        this.cards = document.querySelectorAll('.flow-card');
        
        if (!this.track || !this.viewport || this.cards.length === 0) return;

        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.scrollY = window.scrollY;
        
        // Progress tracking
        this.targetProgress = 0;
        this.currentProgress = 0;
        this.smoothing = 0.06;
        
        // Mouse influence
        this.targetMouseX = 0;
        this.targetMouseY = 0;
        this.currentMouseX = 0;
        this.currentMouseY = 0;

        this.running = false;
        this.bounds = { top: 0, height: 0 };
        this.isDesktop = window.innerWidth >= 768;
        
        this.init();
    }

    init() {
        // Setup initial SVG paths to be long enough for stroke animation
        this.paths.forEach((path, i) => {
            const length = path.getTotalLength() || 2000;
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
        });

        this.updateBounds();
        
        window.addEventListener('resize', () => {
            this.isDesktop = window.innerWidth >= 768;
            this.updateBounds();
            if (!this.isDesktop) {
                // Reset transforms on mobile where sticky might not apply
                this.flowGroup.style.transform = '';
                this.cards.forEach(c => {
                    c.style.transform = '';
                    c.style.opacity = '';
                    c.classList.remove('active');
                });
            }
        }, { passive: true });
        
        window.addEventListener('scroll', () => {
            if (!this.isDesktop && !this.prefersReducedMotion) return;
            this.scrollY = window.scrollY;
            if (!this.running) {
                this.running = true;
                this.loop();
            }
        }, { passive: true });

        window.addEventListener('mousemove', (e) => {
            if (!this.isDesktop || this.prefersReducedMotion) return;
            // Normalize mouse -1 to 1
            this.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
            this.targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
        }, { passive: true });

        if (this.isDesktop) {
            this.running = true;
            this.loop();
        }
    }

    updateBounds() {
        if (!this.isDesktop) return;
        const rect = this.track.getBoundingClientRect();
        this.bounds.top = rect.top + window.scrollY;
        this.bounds.height = rect.height;
    }

    loop() {
        if (!this.running || !this.isDesktop) return;

        const viewportHeight = window.innerHeight;
        const scrollDistance = this.scrollY - this.bounds.top;
        const maxScroll = this.bounds.height - viewportHeight;
        
        let p = 0;
        if (maxScroll > 0) {
            p = scrollDistance / maxScroll;
        }
        
        // Clamp 0 to 1
        this.targetProgress = Math.max(0, Math.min(1, p));

        // Lerp progress
        if (this.prefersReducedMotion) {
            this.currentProgress = this.targetProgress;
            this.currentMouseX = 0;
            this.currentMouseY = 0;
        } else {
            this.currentProgress += (this.targetProgress - this.currentProgress) * this.smoothing;
            this.currentMouseX += (this.targetMouseX - this.currentMouseX) * 0.05;
            this.currentMouseY += (this.targetMouseY - this.currentMouseY) * 0.05;
        }

        this.render();

        const resting = Math.abs(this.targetProgress - this.currentProgress) < 0.001 &&
                        Math.abs(this.targetMouseX - this.currentMouseX) < 0.01;
        
        if (resting && (p < 0 || p > 1)) {
            this.running = false; // Pause outside bounds
        } else {
            requestAnimationFrame(() => this.loop());
        }
    }

    render() {
        const p = this.currentProgress;

        // 1. Render Cards
        // We have N cards mapping across 0 to 1 progress.
        const numCards = this.cards.length;
        const scale = numCards - 1; // 0 to 3
        
        this.cards.forEach((card, index) => {
            // Local progress relative to this card.
            // 0 = centered, negative = in future (incoming), positive = in past (outgoing)
            const localProgress = (p * scale) - index;
            
            // Opacity: fade out completely if abs(localProgress) > ~0.8
            let opacity = 1 - Math.abs(localProgress) * 1.5;
            opacity = Math.max(0, Math.min(1, opacity));
            
            // TranslateY: 
            // Incoming (future) starts below (e.g. +30px). 
            // Outgoing (past) exits above (e.g. -20px).
            // When localProgress is -1 (future), Y = +30. When 0, Y = 0. When +1 (past), Y = -20.
            let translateY = 0;
            if (localProgress < 0) {
                // Incoming
                translateY = localProgress * -30;
            } else {
                // Outgoing
                translateY = localProgress * -20;
            }

            card.style.opacity = opacity;
            
            if (this.prefersReducedMotion) {
                card.style.transform = `translateY(0)`;
            } else {
                card.style.transform = `translateY(${translateY}px)`;
            }

            // Pointer events only on active card
            if (opacity > 0.8) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // 2. Render SVG Flow
        if (!this.prefersReducedMotion && this.flowGroup) {
            // As p goes 0->1, move forward in Z, rotate around Z to simulate flow
            const zMove = p * 400; // push into screen
            const rotateZ = p * -45; // gentle rotation
            
            // Mouse influence
            const rotX = this.currentMouseY * 5; 
            const rotY = this.currentMouseX * -5;
            
            this.flowGroup.style.transform = `translateZ(${zMove}px) rotateZ(${rotateZ}deg) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            
            // Path dashed flowing
            this.paths.forEach((path, i) => {
                const length = parseFloat(path.style.strokeDasharray) || 2000;
                // Move dash offset based on progress and slightly offset each path
                const offset = length - (p * length * 0.5) - (i * length * 0.1);
                path.style.strokeDashoffset = offset;
            });
        }
    }
}

function initFlow() {
    new SpatialFlow();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFlow);
} else {
    initFlow();
}
