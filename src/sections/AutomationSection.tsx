import automationImg from '../../assets/automation.jpg';

const AutomationSection = () => {
  return (
    <article className="flow-card" id="flow-card-2" aria-labelledby="svc-automation-title">
      <div className="service-card__image-wrap">
        <img 
          src={automationImg} 
          alt="Automation" 
          className="service-card__image service-card__image--automation" 
        />
      </div>
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

    </article>
  );
};

export default AutomationSection;
