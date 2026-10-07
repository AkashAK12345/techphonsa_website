const ContactSection = () => {
  return (
    <section id="contact" className="contact-minimal-layout section" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <div className="atmosphere atmosphere--globe" aria-hidden="true">
        <div className="atm-light atm-blue" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.5)' }}></div>
        <div className="atm-light atm-violet" style={{ top: '40%', left: '60%', transform: 'translate(-50%, -50%) scale(1.2)' }}></div>
      </div>
      <div id="globe-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
        <canvas id="globe-canvas" style={{ display: 'block', width: '100%', height: '100%', opacity: 0, transition: 'opacity 2s ease' }}></canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <header className="contact-header section" aria-labelledby="contact-title">
          <div className="container">
            <span className="section-header__eyebrow">// LET'S TALK ABOUT WHAT YOU NEED</span>
            <h1 className="section-header__title section-header__title--large anim-fade-up" id="contact-title">
              Open Channel
            </h1>
            <span className="section-header__rule" aria-hidden="true"></span>
          </div>
        </header>

        <section className="contact-section" aria-label="Contact form">
          <div className="container">
            <div className="contact-layout">
              <div className="contact-intro anim-fade-up">
                <h2 className="contact-intro__headline">Tell us what you're trying to solve.</h2>
                <p className="contact-intro__body">
                  We'll be straight with you about whether we can help and how. No obligation, no sales pitch — just a conversation about what you need.
                </p>

                <div className="contact-info-list" role="list">
                  <div className="contact-info-item" role="listitem">
                    <span className="contact-info-item__label">Response time</span>
                    <span className="contact-info-item__value">We aim to respond within one business day.</span>
                  </div>
                  <div className="contact-info-item" role="listitem">
                    <span className="contact-info-item__label">What to expect</span>
                    <span className="contact-info-item__value">A short conversation about what you need. We'll tell you honestly if we're the right fit.</span>
                  </div>
                  <div className="contact-info-item" role="listitem">
                    <span className="contact-info-item__label">No obligation</span>
                    <span className="contact-info-item__value">Getting in touch doesn't commit you to anything. We just want to understand your situation.</span>
                  </div>
                </div>
              </div>

              <div className="contact-form-panel anim-fade-up anim-fade-up--delay-1">
                <p className="contact-form-panel__label" aria-hidden="true">OPEN CHANNEL // FORM</p>

                <div id="form-body">
                  <form
                    id="contact-form"
                    className="contact-form"
                    action="https://formsubmit.co/techphonsa@gmail.com"
                    method="POST"
                    noValidate
                    aria-label="Contact form"
                  >
                    <input type="hidden" name="_next" value="http://localhost:8080/contact.html" />
                    <input type="hidden" name="_subject" value="New inquiry from Techphonsa Website!" />
                    <input type="hidden" name="_captcha" value="false" />
                    
                    <div className="contact-form__row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="field-name">Name <span aria-hidden="true">*</span></label>
                        <input className="form-input" type="text" id="field-name" name="name" placeholder="Your name" autoComplete="name" required aria-required="true" aria-describedby="error-name" />
                        <span className="form-error" id="error-name" role="alert" aria-live="polite"></span>
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="field-business">Business <span aria-hidden="true">*</span></label>
                        <input className="form-input" type="text" id="field-business" name="business" placeholder="Business name" autoComplete="organization" required aria-required="true" aria-describedby="error-business" />
                        <span className="form-error" id="error-business" role="alert" aria-live="polite"></span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="field-email">Email <span aria-hidden="true">*</span></label>
                      <input className="form-input" type="email" id="field-email" name="email" placeholder="your@email.com" autoComplete="email" required aria-required="true" aria-describedby="error-email" />
                      <span className="form-error" id="error-email" role="alert" aria-live="polite"></span>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="field-need">What do you need help with? <span aria-hidden="true">*</span></label>
                      <select className="form-select" id="field-need" name="need" required aria-required="true" aria-describedby="error-need" defaultValue="default">
                        <option value="default" disabled>Select one</option>
                        <option value="website">A website</option>
                        <option value="automation">Automation / workflow</option>
                        <option value="ai">AI integration</option>
                        <option value="unsure">Not sure yet — let's talk</option>
                      </select>
                      <span className="form-error" id="error-need" role="alert" aria-live="polite"></span>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="field-message">Anything else you'd like to share <span style={{ opacity: 0.5 }}>(optional)</span></label>
                      <textarea className="form-textarea" id="field-message" name="message" placeholder="Tell us more about your situation or what you're trying to solve..." rows={4}></textarea>
                    </div>

                    <div className="contact-form__submit-row">
                      <p className="contact-form__disclaimer">Your details are only used to respond to your enquiry.</p>
                      <button type="submit" className="hud-btn hud-btn--primary hud-btn--submit" id="form-submit">
                        Initialize conversation
                        <span className="btn-arrow" aria-hidden="true">→</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ContactSection;
