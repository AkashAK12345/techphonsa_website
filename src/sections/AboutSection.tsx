const AboutSection = () => {
  return (
    <>
      <header id="about" className="about-header section" aria-labelledby="about-title">
        <div className="container">
          <span className="section-header__eyebrow">Our Origin</span>
          <h1 className="section-header__title section-header__title--large anim-fade-up" id="about-title">
            About the System
          </h1>
          <span className="section-header__rule" aria-hidden="true"></span>
        </div>
      </header>

      <section className="about-origin section" aria-labelledby="origin-heading">
        <div className="container">
          <div className="about-origin__layout">
            <div className="about-origin__prose">
              <h2 className="sr-only" id="origin-heading">Our story</h2>
              <p className="anim-fade-up">
                Techphonsa started with a simple observation: most small businesses either don't have a website that actually works for them, or they're stuck doing repetitive work manually — following up on leads, replying to the same questions, updating spreadsheets — because the tools that could fix that feel built for enterprises with entire IT teams, not a five-person shop.
              </p>
              <p className="anim-fade-up anim-fade-up--delay-1">
                We build the practical version of that: a real, working website first, then automation that quietly handles the busywork in the background, and — once it makes sense for your business — AI features that actually solve a specific problem instead of being AI for the sake of it.
              </p>
              <p className="anim-fade-up anim-fade-up--delay-2">
                Techphonsa is founded by Akash, an engineer with hands-on experience in AI/ML — retrieval-augmented generation, vector search, and automated transcription systems — applied here to solve practical problems: getting a small business online, and making sure leads don't fall through the cracks.
              </p>
              <p className="anim-fade-up anim-fade-up--delay-3">
                We're early, and intentionally small. Every project is scoped, overseen, and delivered directly by our team — occasionally supported by trusted collaborators for specialized work — so quality stays consistent even as we take on more.
              </p>
            </div>

            <aside className="about-origin__sidebar" aria-label="Technical background">
              <div className="about-operator hud-panel anim-fade-up">
                <div className="hud-panel__label">Operator</div>
                <p className="about-operator__name">Akash</p>
                <p className="about-operator__role">// FOUNDER &amp; ENGINEER</p>
                <div className="about-operator__status">
                  <span className="sys-status sys-status--ok" aria-label="Status: active">
                    <span className="sys-status__dot"></span>
                    ACTIVE
                  </span>
                </div>
              </div>

              <div className="about-sidebar-panel hud-panel anim-fade-up anim-fade-up--delay-1">
                <p className="about-sidebar-panel__title">Technical Background</p>
                <ul className="about-sidebar-panel__list" role="list">
                  <li className="about-sidebar-panel__item">AI-powered search &amp; retrieval (RAG) — for smart document/FAQ assistants</li>
                  <li className="about-sidebar-panel__item">Workflow automation (n8n) — for lead routing and back-office tasks</li>
                  <li className="about-sidebar-panel__item">Vector search &amp; semantic matching — for accurate AI-driven recommendations</li>
                  <li className="about-sidebar-panel__item">Applied machine learning — for lead scoring and data classification</li>
                  <li className="about-sidebar-panel__item">Full-stack web development — for the websites we build</li>
                </ul>
              </div>

              <div className="about-sidebar-panel hud-panel anim-fade-up anim-fade-up--delay-2">
                <p className="about-sidebar-panel__title">What this means for you</p>
                <ul className="about-sidebar-panel__list" role="list">
                  <li className="about-sidebar-panel__item">No middlemen — you work directly with the team building your system</li>
                  <li className="about-sidebar-panel__item">No guessing — we understand what we're building</li>
                  <li className="about-sidebar-panel__item">No pretending — we'll tell you what AI can and can't do for you right now</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
