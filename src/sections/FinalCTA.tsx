const FinalCTA = () => {
  return (
    <section className="home-cta section" aria-labelledby="about-cta-heading" style={{ textAlign: 'center', paddingBlock: 'var(--s-16) !important', borderTop: '1px solid var(--border-dim)' }}>
      <div className="container">
        <div className="home-cta__inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--s-6)', width: '100%' }}>
          <h2 className="home-cta__title" id="about-cta-heading" style={{ marginBottom: 0 }}>Work with us.</h2>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', maxWidth: '480px', textAlign: 'center', lineHeight: 1.7 }}>
            If you're a small business that needs a real website or a way to stop doing repetitive work by hand, we should talk.
          </p>
          <a href="/contact" className="btn-primary btn-primary--primary">
            Let's talk about what you need
            <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
