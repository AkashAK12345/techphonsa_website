import { useEffect, useRef } from 'react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const editorialHeadingRef = useRef<HTMLHeadingElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const p3Ref = useRef<HTMLParagraphElement>(null);
  const p4Ref = useRef<HTMLParagraphElement>(null);
  const p5Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let ticking = false;

    const updateVisibility = () => {
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.8; // Trigger when element is 20% from the bottom

      const checkElement = (el: HTMLElement | null) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerPoint) {
          el.classList.add('is-revealed');
        } else {
          el.classList.remove('is-revealed');
        }
      };

      checkElement(editorialHeadingRef.current);
      checkElement(headingRef.current);
      checkElement(p1Ref.current);
      checkElement(p2Ref.current);
      checkElement(p3Ref.current);
      checkElement(p4Ref.current);
      checkElement(p5Ref.current);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    updateVisibility();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section section" aria-labelledby="about-title">
      <div className="container about-container">

        {/* EDITORIAL SECTION HEADING */}
        <h2 ref={editorialHeadingRef} className="about-editorial-heading about-heading-reveal" aria-hidden="true">
          About Techphonsa
        </h2>

        {/* 1. INTRODUCTION */}
        <div className="about-block about-intro">
          <div className="about-block__left">
            <span className="section-label">ABOUT TECHPHONSA</span>
          </div>
          <div className="about-block__right">
            <h2 ref={headingRef} className="about-intro__title about-heading-reveal" id="about-title">
              A technology studio<br />for practical problems.
            </h2>
            <p ref={p1Ref} className="about-intro__lead about-reveal">
              Techphonsa is a technology studio that helps small businesses get online, work more efficiently, and make practical use of AI.
            </p>
          </div>
        </div>

        {/* 2. OUR STORY */}
        <div className="about-block about-story">
          <div className="about-block__left">
            <span className="section-label">OUR STORY</span>
          </div>
          <div className="about-block__right">
            <div className="about-prose">
              <p ref={p2Ref} className="about-reveal">
                Techphonsa started with a simple observation: most small businesses either don’t have a website that works for them, or they’re stuck doing repetitive work manually, from following up on leads to answering the same questions to updating spreadsheets. The tools that could fix that are built for enterprises with entire IT teams, not a five-person shop.
              </p>
              <p ref={p3Ref} className="about-reveal">
                We build the practical version. A real, working website first. Then automation that quietly handles the busywork in the background. And once it makes sense for your business, AI that solves a specific problem instead of being AI for the sake of it.
              </p>
            </div>
          </div>
        </div>

        <hr className="about-divider anim-fade-up" aria-hidden="true" />

        {/* 3. OUR APPROACH */}
        <div className="about-block about-approach">
          <div className="about-block__left">
            <span className="section-label">OUR APPROACH</span>
          </div>
          <div className="about-block__right">
            <div className="about-prose">
              <p ref={p4Ref} className="about-reveal">
                We’re a young technical studio with hands-on experience across IT, including AI/ML: retrieval-augmented generation, vector search, and speech and transcription systems. We apply that experience to practical problems, like getting a small business online and making sure no lead slips through the cracks.
              </p>
              <p ref={p5Ref} className="about-reveal">
                We’re early and intentionally small. Every project is scoped, overseen, and delivered directly by our team, with trusted collaborators brought in for specialized work, so quality stays consistent as we grow.
              </p>
            </div>
          </div>
        </div>

        {/* 4. TECHNICAL EXPERTISE */}
        <div className="about-block about-expertise anim-fade-up">
          <div className="about-block__left">
            <span className="section-label">TECHNICAL EXPERTISE</span>
          </div>
          <div className="about-block__right">
            <ul className="expertise-list" role="list">
              <li className="expertise-item">
                <span className="expertise-item__num">01</span>
                <div className="expertise-item__content">
                  <h4 className="expertise-item__title">AI-powered search and retrieval (RAG)</h4>
                  <p className="expertise-item__desc">smart document and FAQ assistants</p>
                </div>
              </li>
              <li className="expertise-item">
                <span className="expertise-item__num">02</span>
                <div className="expertise-item__content">
                  <h4 className="expertise-item__title">Workflow automation (n8n)</h4>
                  <p className="expertise-item__desc">lead routing and back-office tasks</p>
                </div>
              </li>
              <li className="expertise-item">
                <span className="expertise-item__num">03</span>
                <div className="expertise-item__content">
                  <h4 className="expertise-item__title">Vector search and semantic matching</h4>
                  <p className="expertise-item__desc">accurate, AI-driven recommendations</p>
                </div>
              </li>
              <li className="expertise-item">
                <span className="expertise-item__num">04</span>
                <div className="expertise-item__content">
                  <h4 className="expertise-item__title">Applied machine learning</h4>
                  <p className="expertise-item__desc">lead scoring and data classification</p>
                </div>
              </li>
              <li className="expertise-item">
                <span className="expertise-item__num">05</span>
                <div className="expertise-item__content">
                  <h4 className="expertise-item__title">Full-stack web development</h4>
                  <p className="expertise-item__desc">the websites we build</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 5. WHAT THIS MEANS FOR YOU */}
        <div className="about-benefits-section anim-fade-up">
          <div className="about-benefits-header">
            <span className="section-label">WHAT THIS MEANS FOR YOU</span>
          </div>
          <div className="about-benefits">
            <div className="benefit-item">
              <span className="benefit-item__num">01</span>
              <h4 className="benefit-item__title">Direct access.</h4>
              <p className="benefit-item__desc">You work with the team building your system, not an account manager.</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-item__num">02</span>
              <h4 className="benefit-item__title">Informed execution.</h4>
              <p className="benefit-item__desc">Your project is built by people who understand the technology, not just the pitch.</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-item__num">03</span>
              <h4 className="benefit-item__title">Honest scoping.</h4>
              <p className="benefit-item__desc">We tell you plainly what AI can and can’t do for your business today.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
