const WebsitesSection = () => {
  return (
    <article className="flow-card" id="flow-card-0" aria-labelledby="svc-websites-title">
      <span className="service-card__number">01</span>
      <h3 className="service-card__title" id="svc-websites-title">Websites</h3>
      <p className="service-card__body">
        A clean, fast, mobile-first website built to represent your business accurately — not a generic template with your logo dropped in. Every site includes on-page SEO fundamentals and a working lead capture form from day one, with an optional CMS if you'd like to manage content updates yourself going forward.
      </p>
      <div className="service-card__tags">
        <span className="service-card__pill">Responsive design</span>
        <span className="service-card__pill">Basic SEO setup</span>
        <span className="service-card__pill">Lead capture forms</span>
        <span className="service-card__pill">Optional CMS</span>
      </div>
      <a href="/services#websites" className="btn-primary btn-primary--secondary" style={{ width: 'fit-content', marginTop: 'auto' }}>
        Learn more <span className="btn-arrow" aria-hidden="true">&#8594;</span>
      </a>
    </article>
  );
};

export default WebsitesSection;
