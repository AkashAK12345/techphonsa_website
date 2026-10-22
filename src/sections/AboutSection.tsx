import { useRef } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef, '.about-anim');

  return (
    <section ref={sectionRef} id="about" className="about-section section" aria-labelledby="about-heading">
      {/* Ambient background glow orb */}
      <div className="about-ambient-glow" aria-hidden="true" />

      <div className="container about-container">

        {/* 1. OPENING: EDITORIAL HEADING & INTRODUCTION */}
        <header className="about-header">
          <div className="about-header-wrap about-anim">
            <h2 className="about-editorial-heading" id="about-heading">
              <span className="about-editorial-heading__word">About</span>{' '}
              <span className="about-editorial-heading__word">Techphonsa</span>
            </h2>
          </div>

          <div className="about-intro about-anim">
            <h3 className="about-intro__title" id="about-title">
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
            <div className="section-label-wrap about-anim">
              <span className="section-label">OUR STORY</span>
            </div>
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

        {/* Animated divider with node */}
        <div className="about-divider-wrap about-anim" aria-hidden="true">
          <hr className="about-divider" />
          <div className="about-divider-node" />
        </div>

        {/* 3. OUR APPROACH */}
        <div className="about-block about-approach">
          <div className="about-block__left">
            <div className="section-label-wrap about-anim">
              <span className="section-label">OUR APPROACH</span>
            </div>
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
            <div className="section-label-wrap about-anim">
              <span className="section-label">TECHNICAL EXPERTISE</span>
            </div>
          </div>
          <div className="about-block__right">
            <ul className="expertise-list" role="list">
              <li className="expertise-item about-anim">
                <div className="expertise-item__bar" aria-hidden="true" />
                <div className="expertise-item__content">
                  <div className="expertise-item__header">
                    <h3 className="expertise-item__title">AI-powered search and retrieval (RAG)</h3>
                    <span className="expertise-item__tag">RAG + VECTOR DB</span>
                  </div>
                  <p className="expertise-item__desc">smart document and FAQ assistants</p>
                </div>
              </li>
              <li className="expertise-item about-anim">
                <div className="expertise-item__bar" aria-hidden="true" />
                <div className="expertise-item__content">
                  <div className="expertise-item__header">
                    <h3 className="expertise-item__title">Workflow automation (n8n)</h3>
                    <span className="expertise-item__tag">AUTOMATION + API</span>
                  </div>
                  <p className="expertise-item__desc">lead routing and back-office tasks</p>
                </div>
              </li>
              <li className="expertise-item about-anim">
                <div className="expertise-item__bar" aria-hidden="true" />
                <div className="expertise-item__content">
                  <div className="expertise-item__header">
                    <h3 className="expertise-item__title">Vector search and semantic matching</h3>
                    <span className="expertise-item__tag">SEMANTIC EMBEDDINGS</span>
                  </div>
                  <p className="expertise-item__desc">accurate, AI-driven recommendations</p>
                </div>
              </li>
              <li className="expertise-item about-anim">
                <div className="expertise-item__bar" aria-hidden="true" />
                <div className="expertise-item__content">
                  <div className="expertise-item__header">
                    <h3 className="expertise-item__title">Applied machine learning</h3>
                    <span className="expertise-item__tag">PREDICTIVE ML</span>
                  </div>
                  <p className="expertise-item__desc">lead scoring and data classification</p>
                </div>
              </li>
              <li className="expertise-item about-anim">
                <div className="expertise-item__bar" aria-hidden="true" />
                <div className="expertise-item__content">
                  <div className="expertise-item__header">
                    <h3 className="expertise-item__title">Full-stack web development</h3>
                    <span className="expertise-item__tag">MODERN WEB STACK</span>
                  </div>
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
            <div className="section-label-wrap about-anim">
              <span className="section-label">WHAT THIS MEANS FOR YOU</span>
            </div>
          </div>
          <div className="about-benefits">
            <div className="benefit-item benefit-card about-anim" tabIndex={0} aria-label="01 Direct access">
              <div className="benefit-card__bar" aria-hidden="true" />
              <div className="benefit-card__shine" aria-hidden="true" />
              <div className="benefit-card__glow" aria-hidden="true" />
              <div className="benefit-card__top">
                <span className="benefit-card__tag">ZERO MIDDLEMEN</span>
                <div className="benefit-card__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <polyline points="16 11 18 13 22 9"></polyline>
                  </svg>
                </div>
              </div>
              <div className="benefit-card__body">
                <h3 className="benefit-item__title">Direct access.</h3>
                <p className="benefit-item__desc">You work with the team building your system, not an account manager.</p>
                <div className="benefit-card__badge">
                  <span className="benefit-card__badge-dot" aria-hidden="true" />
                  <span>100% Engineer Contact</span>
                </div>
              </div>
              <div className="benefit-card__footer">
                <span className="benefit-card__link">Direct communication</span>
              </div>
            </div>

            <div className="benefit-item benefit-card about-anim" tabIndex={0} aria-label="02 Informed execution">
              <div className="benefit-card__bar" aria-hidden="true" />
              <div className="benefit-card__shine" aria-hidden="true" />
              <div className="benefit-card__glow" aria-hidden="true" />
              <div className="benefit-card__top">
                <span className="benefit-card__tag">ARCHITECT-LED</span>
                <div className="benefit-card__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                    <rect x="9" y="9" width="6" height="6"></rect>
                    <line x1="9" y1="1" x2="9" y2="4"></line>
                    <line x1="15" y1="1" x2="15" y2="4"></line>
                    <line x1="9" y1="20" x2="9" y2="23"></line>
                    <line x1="15" y1="20" x2="15" y2="23"></line>
                    <line x1="20" y1="9" x2="23" y2="9"></line>
                    <line x1="20" y1="14" x2="23" y2="14"></line>
                    <line x1="1" y1="9" x2="4" y2="9"></line>
                    <line x1="1" y1="14" x2="4" y2="14"></line>
                  </svg>
                </div>
              </div>
              <div className="benefit-card__body">
                <h3 className="benefit-item__title">Informed execution.</h3>
                <p className="benefit-item__desc">Your project is built by people who understand the technology, not just the pitch.</p>
                <div className="benefit-card__badge">
                  <span className="benefit-card__badge-dot" aria-hidden="true" />
                  <span>Hands-on AI/ML Stack</span>
                </div>
              </div>
              <div className="benefit-card__footer">
                <span className="benefit-card__link">Engineered to scale</span>
              </div>
            </div>

            <div className="benefit-item benefit-card about-anim" tabIndex={0} aria-label="03 Honest scoping">
              <div className="benefit-card__bar" aria-hidden="true" />
              <div className="benefit-card__shine" aria-hidden="true" />
              <div className="benefit-card__glow" aria-hidden="true" />
              <div className="benefit-card__top">
                <span className="benefit-card__tag">REALISTIC SCOPE</span>
                <div className="benefit-card__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                  </svg>
                </div>
              </div>
              <div className="benefit-card__body">
                <h3 className="benefit-item__title">Honest scoping.</h3>
                <p className="benefit-item__desc">We tell you plainly what AI can and can’t do for your business today.</p>
                <div className="benefit-card__badge">
                  <span className="benefit-card__badge-dot" aria-hidden="true" />
                  <span>Zero Hype Promises</span>
                </div>
              </div>
              <div className="benefit-card__footer">
                <span className="benefit-card__link">Transparent feasibility</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
