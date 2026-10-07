const BusinessSystemsSection = () => {
  return (
    <article className="flow-card" id="flow-card-1" aria-labelledby="svc-custom-title">
      <span className="service-card__number">02</span>
      <h3 className="service-card__title" id="svc-custom-title">Business Systems</h3>
      <p className="service-card__body">
        A system built specifically around how your business actually runs — not a generic platform you have to bend your workflow to fit. Whether it's an ERP for operations, an HRMS for managing staff, or a POS for your counter, we build it as a single, focused tool shaped entirely around your business, not a one-size-fits-all product with your logo on it.
      </p>
      <div className="service-card__tags">
        <span className="service-card__pill">ERP</span>
        <span className="service-card__pill">HRMS</span>
        <span className="service-card__pill">POS</span>
        <span className="service-card__pill">Custom workflows</span>
      </div>
      <a href="/services#business-systems" className="btn-primary btn-primary--secondary" style={{ width: 'fit-content', marginTop: 'auto' }}>
        Learn more <span className="btn-arrow" aria-hidden="true">&#8594;</span>
      </a>
    </article>
  );
};

export default BusinessSystemsSection;
