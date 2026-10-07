

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero section" aria-labelledby="hero-headline">
      <div className="container hero__container">
        
        <div className="hero__text-block anim-fade-up">
          <p className="hero__brand" aria-hidden="true">TECHPHONSA / DIGITAL SYSTEMS</p>
          <h1 className="hero__headline" id="hero-headline">
            Real systems for real<br />
            businesses &mdash;<br />
            built, not assembled.
          </h1>
          <p className="hero__subhead">
            Techphonsa is a small technology studio helping small businesses get a working website, automate the repetitive parts of running their business, and &mdash; eventually &mdash; bring AI into the mix, without the agency markup or the jargon.
          </p>
          <a href="#contact" className="hero__cta">
            Start a project
          </a>
        </div>
        
        <div className="hero__visual-block anim-fade-up anim-fade-up--delay-1">
          <div className="hero__image-wrapper">
            <img src="/assets/homepage.avif" alt="Techphonsa systems" className="hero__image" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
