
const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <polygon points="13,2 27,2 38,13 38,27 27,38 13,38 2,27 2,13" stroke="#334155" strokeWidth="1.5" fill="none" opacity="0.7"/>
              <rect x="11" y="15" width="18" height="2.5" fill="#8B98A8" rx="0.5"/>
              <rect x="18" y="17.5" width="4" height="9" fill="#8B98A8" rx="0.5"/>
            </svg>
            Techphonsa
          </div>
          <nav className="footer__links" aria-label="Footer navigation">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
          <p className="footer__meta" aria-hidden="true">SYS.STATUS // OPERATIONAL</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
