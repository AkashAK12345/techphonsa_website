document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const headline = document.getElementById('hero-headline');
    const subhead = document.querySelector('.hero__subhead');
    const cta = document.querySelector('.hero__cta');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Failsafe: if missing elements or reduced motion, skip entirely
    if (!splashScreen || !headline || prefersReducedMotion) {
        skipIntro();
        return;
    }

    // 1. Lock navigation and scroll
    document.body.classList.add('is-intro-sequence');
    document.body.style.pointerEvents = 'none';

    // 2. Safely split the headline into words
    // We must preserve existing <br> and spaces.
    const splitHeadline = () => {
        const newNodes = [];
        headline.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const words = node.textContent.split(/(\s+)/); // split keeping spaces
                words.forEach(word => {
                    if (word.trim().length > 0) {
                        const wordOuter = document.createElement('span');
                        wordOuter.className = 'word';
                        const wordInner = document.createElement('span');
                        wordInner.className = 'word-inner';
                        wordInner.textContent = word;
                        wordOuter.appendChild(wordInner);
                        newNodes.push(wordOuter);
                    } else if (word.length > 0) {
                        // It's just whitespace, keep it as a text node to preserve layout
                        newNodes.push(document.createTextNode(word));
                    }
                });
            } else {
                newNodes.push(node.cloneNode(true));
            }
        });
        
        headline.innerHTML = '';
        newNodes.forEach(n => headline.appendChild(n));
        
        // Apply staggered animation delays to the word-inners
        const wordInners = headline.querySelectorAll('.word-inner');
        wordInners.forEach((inner, index) => {
            // 80ms stagger between words
            inner.style.animationDelay = `${index * 0.08}s`; 
        });
    };

    splitHeadline();

    // 3. Choreograph the sequence
    
    // Splash logo settles for ~1.8s. Then transition it out.
    setTimeout(() => {
        splashScreen.classList.add('is-hidden');
        
        // Wait 400ms for splash to partially clear, then start headline
        setTimeout(() => {
            headline.classList.add('intro-play');
            
            // Wait 1200ms for headline words to assemble, then show supporting copy
            setTimeout(() => {
                document.documentElement.classList.add('hero-elements-play');
                
                // Wait for all transitions to settle, then cleanup
                setTimeout(() => {
                    completeIntro();
                }, 1200);

            }, 1200);

        }, 400);

    }, 1800);

    function completeIntro() {
        document.body.classList.remove('is-intro-sequence');
        document.body.style.pointerEvents = '';
        document.body.classList.add('intro-complete');
        // Remove splash from DOM entirely so it doesn't block clicks if clip-path fails
        if (splashScreen.parentNode) {
            splashScreen.remove();
        }
    }

    function skipIntro() {
        document.body.classList.add('intro-complete');
        if (splashScreen) {
            splashScreen.remove();
        }
    }
});
