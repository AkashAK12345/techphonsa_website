const HowWeWork = () => {
  return (
    <>
      <div className="hww-intro-track" aria-hidden="true">
        <div className="hww-intro-sticky">
          <div className="hww-intro-words">
            <div className="hww-word" id="hww-word-1">HOW</div>
            <div className="hww-word" id="hww-word-2">WE</div>
            <div className="hww-word" id="hww-word-3">WORK</div>
          </div>
        </div>
      </div>

      <section className="hww-pillars-static" aria-labelledby="trust-heading">
        <h2 id="trust-heading" className="sr-only">How We Work</h2>
        
        <div className="hww-static-container">
          <img src="/assets/columns-bg.jpg"
               alt="Four stone Ionic columns against a clear blue sky, each representing a pillar of how Techphonsa works"
               className="hww-static-photo" />

          <div className="hww-static-card" id="hww-sc-1">
            <span className="hww-static-card__num">01</span>
            <h3 className="hww-static-card__title">Quality you can rely on.</h3>
            <p className="hww-static-card__body">Every project is scoped, overseen, and delivered directly by our team, from first call to final handoff.</p>
          </div>

          <div className="hww-static-card" id="hww-sc-2">
            <span className="hww-static-card__num">02</span>
            <h3 className="hww-static-card__title">Real technical background.</h3>
            <p className="hww-static-card__body">Hands-on experience with RAG systems, vector databases, and applied machine learning — not marketing language borrowed from bigger companies.</p>
          </div>

          <div className="hww-static-card" id="hww-sc-3">
            <span className="hww-static-card__num">03</span>
            <h3 className="hww-static-card__title">Small by design, for now.</h3>
            <p className="hww-static-card__body">We take on a limited number of clients at a time, so every project gets real attention instead of a place in a queue.</p>
          </div>

          <div className="hww-static-card" id="hww-sc-4">
            <span className="hww-static-card__num">04</span>
            <h3 className="hww-static-card__title">Transparent pricing.</h3>
            <p className="hww-static-card__body">Setup costs and monthly retainers are explained upfront — no hidden fees, no vague "contact us for a quote" stalling.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowWeWork;
