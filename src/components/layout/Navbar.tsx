import { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <a href="/" className="nav-brand" aria-label="Techphonsa home">
          <svg className="nav-logo" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <polygon points="13,2 27,2 38,13 38,27 27,38 13,38 2,27 2,13" stroke="#334155" strokeWidth="1.5" fill="none" opacity="0.9"/>
            <circle cx="20" cy="20" r="10" stroke="#334155" strokeWidth="0.75" opacity="0.3"/>
            <line x1="20" y1="2" x2="20" y2="7" stroke="#334155" strokeWidth="1.5" opacity="0.7"/>
            <line x1="20" y1="33" x2="20" y2="38" stroke="#334155" strokeWidth="1.5" opacity="0.7"/>
            <line x1="2" y1="20" x2="7" y2="20" stroke="#334155" strokeWidth="1.5" opacity="0.7"/>
            <line x1="33" y1="20" x2="38" y2="20" stroke="#334155" strokeWidth="1.5" opacity="0.7"/>
            <rect x="11" y="15" width="18" height="2.5" fill="#F5F7FA" rx="0.5"/>
            <rect x="18" y="17.5" width="4" height="9" fill="#F5F7FA" rx="0.5"/>
            <rect x="12.5" y="3.5" width="2.5" height="2.5" fill="#334155" opacity="0.5"/>
            <rect x="25" y="3.5" width="2.5" height="2.5" fill="#334155" opacity="0.5"/>
            <rect x="12.5" y="34" width="2.5" height="2.5" fill="#334155" opacity="0.5"/>
            <rect x="25" y="34" width="2.5" height="2.5" fill="#334155" opacity="0.5"/>
          </svg>
          <span className="nav-name" style={{ textTransform: 'lowercase' }}>techphonsa</span>
        </a>

        <ul className="nav-links" role="list">
          <li><a href="#home" className="active">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#contact" className="nav-cta">Let's talk</a></li>
        </ul>

        <button 
          className={`nav-hamburger ${isOpen ? 'open' : ''}`} 
          aria-label="Open navigation" 
          aria-expanded={isOpen} 
          aria-controls="mobile-nav"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`nav-mobile-overlay ${isOpen ? 'open' : ''}`} id="mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation">
        <button className="nav-mobile-close" aria-label="Close navigation" onClick={() => setIsOpen(false)}>ESC / CLOSE</button>
        <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
        <a href="#about" onClick={() => setIsOpen(false)}>About</a>
        <a href="#services" onClick={() => setIsOpen(false)}>Services</a>
        <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
      </div>
    </>
  );
};

export default Navbar;
