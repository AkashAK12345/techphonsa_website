const AutomationSection = () => {
  return (
    <article className="flow-card" id="flow-card-2" aria-labelledby="svc-automation-title">
      <span className="service-card__number">03</span>
      <h3 className="service-card__title" id="svc-automation-title">Automation</h3>
      <p className="service-card__body">
        We build automated workflows that handle lead follow-up, routing, and record-keeping in the background — 24/7, without someone babysitting an inbox.
      </p>
      <div className="service-card__tags">
        <span className="service-card__pill">n8n Workflows</span>
        <span className="service-card__pill">Lead Routing</span>
        <span className="service-card__pill">24/7</span>
      </div>
      <a href="/services#automation" className="btn-primary btn-primary--secondary" style={{ width: 'fit-content', marginTop: 'auto' }}>
        Learn more <span className="btn-arrow" aria-hidden="true">&#8594;</span>
      </a>
    </article>
  );
};

export default AutomationSection;
