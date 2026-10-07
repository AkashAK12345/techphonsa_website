import React from 'react';
import WebsitesSection from './WebsitesSection';
import BusinessSystemsSection from './BusinessSystemsSection';
import AutomationSection from './AutomationSection';
import AIIntegrationSection from './AIIntegrationSection';
import { useWwbHeadingScroll } from '../hooks/useWwbHeadingScroll';
import { useWwbCardsScroll } from '../hooks/useWwbCardsScroll';

const ServicesOverview = () => {
  const { sectionRef, headingRef } = useWwbHeadingScroll();
  const activeIndex = useWwbCardsScroll(sectionRef as React.RefObject<HTMLElement>, 4);

  return (
    <section 
      id="services" 
      className="wwb-section section wwb-scroll-track" 
      ref={sectionRef as React.RefObject<HTMLElement>}
      aria-labelledby="wwb-heading"
    >
      <div className="container">
        <div className="wwb-grid">
          
          <div className="wwb-left">
            <div className="wwb-sticky-container">
              <h2 id="wwb-heading" className="wwb-heading" ref={headingRef as React.RefObject<HTMLHeadingElement>}>
                WHAT WE BUILD
              </h2>
            </div>
          </div>
          
          <div className="wwb-right">
            <div className="wwb-card-stage">
              <div className={`wwb-card-slot ${activeIndex === 0 ? 'is-active' : activeIndex > 0 ? 'is-past' : 'is-future'}`}>
                <WebsitesSection />
              </div>
              <div className={`wwb-card-slot ${activeIndex === 1 ? 'is-active' : activeIndex > 1 ? 'is-past' : 'is-future'}`}>
                <BusinessSystemsSection />
              </div>
              <div className={`wwb-card-slot ${activeIndex === 2 ? 'is-active' : activeIndex > 2 ? 'is-past' : 'is-future'}`}>
                <AutomationSection />
              </div>
              <div className={`wwb-card-slot ${activeIndex === 3 ? 'is-active' : activeIndex > 3 ? 'is-past' : 'is-future'}`}>
                <AIIntegrationSection />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
