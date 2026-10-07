const AIIntegrationSection = () => {
  return (
    <article className="flow-card" id="flow-card-3" aria-labelledby="svc-ai-title">
      <span className="service-card__number">04</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <h3 className="service-card__title" id="svc-ai-title">AI Integration</h3>
        <span className="service-card__tag">Early Access</span>
      </div>
      <p className="service-card__body">
        Support assistants trained on your documentation, automated document processing, or smart lead scoring — applied where it actually solves a problem.
      </p>
      <div className="service-card__tags">
        <span className="service-card__pill">RAG Systems</span>
        <span className="service-card__pill">Vector Search</span>
        <span className="service-card__pill">Case-by-case</span>
      </div>
      <a href="/services#ai" className="btn-primary btn-primary--secondary" style={{ width: 'fit-content', marginTop: 'auto' }}>
        Learn more <span className="btn-arrow" aria-hidden="true">&#8594;</span>
      </a>
    </article>
  );
};

export default AIIntegrationSection;
