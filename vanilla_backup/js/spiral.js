/**
 * Scroll-Driven 3D Card Carousel
 */

class ScrollSpiral {
    constructor() {
        this.track = document.querySelector('.spiral-scroll-track');
        this.carousel = document.querySelector('.spiral-carousel');
        this.cards = document.querySelectorAll('.spiral-card');
        
        if (!this.track || !this.carousel || this.cards.length === 0) return;

        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.scrollY = window.scrollY;
        this.targetRotation = 0;
        this.currentRotation = 0;
        
        this.smoothing = 0.05;
        this.running = false;
        
        this.bounds = { top: 0, height: 0 };
        this.isDesktop = window.innerWidth >= 768;
        
        this.init();
    }

    init() {
        if (this.prefersReducedMotion) return;

        this.updateBounds();
        
        window.addEventListener('resize', () => {
            this.isDesktop = window.innerWidth >= 768;
            this.updateBounds();
            if (!this.isDesktop) {
                // Reset transforms on mobile
                this.carousel.style.transform = '';
                this.cards.forEach(c => c.style.transform = '');
            }
        }, { passive: true });
        
        window.addEventListener('scroll', () => {
            if (!this.isDesktop) return;
            this.scrollY = window.scrollY;
            if (!this.running) {
                this.running = true;
                this.loop();
            }
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
        // height includes the sticky scroll distance
        this.bounds.height = rect.height;
    }

    loop() {
        if (!this.running || !this.isDesktop) return;

        const viewportHeight = window.innerHeight;
        // track distance relative to viewport top
        const scrollDistance = this.scrollY - this.bounds.top;
        // available scroll space (total height minus the viewport sticky hold)
        const maxScroll = this.bounds.height - viewportHeight;
        
        let progress = 0;
        if (maxScroll > 0) {
            progress = scrollDistance / maxScroll;
        }
        
        progress = Math.max(0, Math.min(1, progress));

        // progress 0 -> 0 deg (card 1)
        const totalRotation = (this.cards.length - 1) * -90;
        if (scrollDistance > -viewportHeight && scrollDistance < this.bounds.height + viewportHeight) {
            this.targetRotation = progress * totalRotation;
        }

        this.currentRotation += (this.targetRotation - this.currentRotation) * this.smoothing;

        this.carousel.style.transform = `translateZ(-600px) rotateY(${this.currentRotation}deg)`;
        
        // Update opacity/scale of individual cards based on their relative rotation to the camera
        this.cards.forEach((card, i) => {
            // Card angles: 0, 90, 180, 270
            const cardAngle = i * 90;
            // The card's global angle relative to camera
            const relativeAngle = (this.currentRotation + cardAngle) % 360;
            
            // Normalize angle to -180 to 180 for distance calculation
            let normalizedAngle = relativeAngle;
            if (normalizedAngle > 180) normalizedAngle -= 360;
            if (normalizedAngle < -180) normalizedAngle += 360;
            
            const distFromCenter = Math.abs(normalizedAngle);
            
            // If facing camera (dist ~ 0), opacity 1. If looking away (dist > 60), opacity dims.
            let op = 1 - (distFromCenter / 120);
            op = Math.max(0.1, Math.min(1, op));
            
            card.style.opacity = op;
            // add pointer-events none if facing away so user can't click back cards
            card.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
        });

        const resting = Math.abs(this.targetRotation - this.currentRotation) < 0.1;
        
        if (resting && (progress <= 0 || progress >= 1)) {
            this.running = false;
        } else {
            requestAnimationFrame(() => this.loop());
        }
    }
}

function initSpiral() {
    new ScrollSpiral();
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpiral);
} else {
    initSpiral();
}
