import { useEffect, useRef } from 'react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // If prefers-reduced-motion is requested, reveal all elements immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const allAnimElements = sectionRef.current?.querySelectorAll('.about-anim');
      allAnimElements?.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      const allAnimElements = sectionRef.current?.querySelectorAll('.about-anim');
      allAnimElements?.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Animate once during scroll into view
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animElements = sectionRef.current?.querySelectorAll('.about-anim');
    animElements?.forEach((el) => observer.observe(el));

    // Safety timeout: ensure visible content is never permanently hidden if observer stalls
    const timer = setTimeout(() => {
      const pendingElements = sectionRef.current?.querySelectorAll('.about-anim:not(.is-revealed)');
      pendingElements?.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('is-revealed');
        }
      });
    }, 4000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section section" aria-labelledby="about-title">
      <div className="container about-container">

        {/* 1. OPENING: EDITORIAL HEADING & INTRODUCTION */}
        <header className="about-header">
          <h2 id="about-title" className="about-editorial-heading about-anim">
            About Techphonsa
          </h2>

          <div className="about-intro about-anim">
            <h3 className="about-intro__title">
              <span className="about-line"><span className="about-line__inner">A technology studio</span></span>
              <span className="about-line"><span className="about-line__inner">for practical problems.</span></span>
            </h3>
            <p className="about-intro__lead">
              Techphonsa is a technology studio that helps small businesses get online, work more efficiently, and make practical use of AI.
            </p>
          </div>
        </header>

        <hr className="about-divider about-anim" aria-hidden="true" />

        {/* 2. OUR STORY */}
        <div className="about-block about-story">
          <div className="about-block__left">
            <span className="section-label about-anim">OUR STORY</span>
          </div>
          <div className="about-block__right">
            <div className="about-prose">
              <p className="about-anim">
                Techphonsa started with a simple observation: most small businesses either don’t have a website that works for them, or they’re stuck doing repetitive work manually, from following up on leads to answering the same questions to updating spreadsheets. The tools that could fix that are built for enterprises with entire IT teams, not a five-person shop.
              </p>
              <p className="about-anim">
                We build the practical version. A real, working website first. Then automation that quietly handles the busywork in the background. And once it makes sense for your business, AI that solves a specific problem instead of being AI for the sake of it.
              </p>
            </div>
          </div>
        </div>

        <hr className="about-divider about-anim" aria-hidden="true" />

        {/* 3. OUR APPROACH */}
        <div className="about-block about-approach">
          <div className="about-block__left">
            <span className="section-label about-anim">OUR APPROACH</span>
          </div>
          <div className="about-block__right">
            <div className="about-prose">
              <p className="about-anim">
                We’re a young technical studio with hands-on experience across IT, including AI/ML: retrieval-augmented generation, vector search, and speech and transcription systems. We apply that experience to practical problems, like getting a small business online and making sure no lead slips through the cracks.
              </p>
              <p className="about-anim">
                We’re early and intentionally small. Every project is scoped, overseen, and delivered directly by our team, with trusted collaborators brought in for specialized work, so quality stays consistent as we grow.
              </p>
            </div>
          </div>
        </div>

        <hr className="about-divider about-anim" aria-hidden="true" />

        {/* 4. TECHNICAL EXPERTISE */}
        <div className="about-block about-expertise">
          <div className="about-block__left">
            <span className="section-label about-anim">TECHNICAL EXPERTISE</span>
          </div>
          <div className="about-block__right">
            <ul className="expertise-list" role="list">
              <li className="expertise-item about-anim">
                <span className="expertise-item__num">01</span>
                <div className="expertise-item__content">
                  <h3 className="expertise-item__title">AI-powered search and retrieval (RAG)</h3>
                  <p className="expertise-item__desc">smart document and FAQ assistants</p>
                </div>
              </li>
              <li className="expertise-item about-anim">
                <span className="expertise-item__num">02</span>
                <div className="expertise-item__content">
                  <h3 className="expertise-item__title">Workflow automation (n8n)</h3>
                  <p className="expertise-item__desc">lead routing and back-office tasks</p>
                </div>
              </li>
              <li className="expertise-item about-anim">
                <span className="expertise-item__num">03</span>
                <div className="expertise-item__content">
                  <h3 className="expertise-item__title">Vector search and semantic matching</h3>
                  <p className="expertise-item__desc">accurate, AI-driven recommendations</p>
                </div>
              </li>
              <li className="expertise-item about-anim">
                <span className="expertise-item__num">04</span>
                <div className="expertise-item__content">
                  <h3 className="expertise-item__title">Applied machine learning</h3>
                  <p className="expertise-item__desc">lead scoring and data classification</p>
                </div>
              </li>
              <li className="expertise-item about-anim">
                <span className="expertise-item__num">05</span>
                <div className="expertise-item__content">
                  <h3 className="expertise-item__title">Full-stack web development</h3>
                  <p className="expertise-item__desc">the websites we build</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <hr className="about-divider about-anim" aria-hidden="true" />

        {/* 5. WHAT THIS MEANS FOR YOU */}
        <div className="about-benefits-section">
          <div className="about-benefits-header">
            <span className="section-label about-anim">WHAT THIS MEANS FOR YOU</span>
          </div>
          <div className="about-benefits">
            <div className="benefit-item about-anim" tabIndex={0} aria-label="01 Direct access">
              <span className="benefit-item__num">01</span>
              <h3 className="benefit-item__title">Direct access.</h3>
              <p className="benefit-item__desc">You work with the team building your system, not an account manager.</p>
            </div>
            <div className="benefit-item about-anim" tabIndex={0} aria-label="02 Informed execution">
              <span className="benefit-item__num">02</span>
              <h3 className="benefit-item__title">Informed execution.</h3>
              <p className="benefit-item__desc">Your project is built by people who understand the technology, not just the pitch.</p>
            </div>
            <div className="benefit-item about-anim" tabIndex={0} aria-label="03 Honest scoping">
              <span className="benefit-item__num">03</span>
              <h3 className="benefit-item__title">Honest scoping.</h3>
              <p className="benefit-item__desc">We tell you plainly what AI can and can’t do for your business today.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
