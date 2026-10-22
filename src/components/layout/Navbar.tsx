import { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const sectionIds = ['home', 'services', 'about', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveLink(visible.target.id);
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: [0.01, 0.25, 0.5] },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const getNavHeight = (): number => {
    const nav = document.querySelector('.nav');
    if (nav) {
      const h = nav.getBoundingClientRect().height;
      if (h > 0) return h;
    }
    const navHVar = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '80',
      10,
    );
    return Number.isNaN(navHVar) ? 80 : navHVar;
  };

  const scrollToSection = (id: string, updateHash = true) => {
    setActiveLink(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (updateHash && window.location.hash !== '#home') {
        window.history.pushState(null, '', '#home');
      }
      return;
    }

    const section = document.getElementById(id);
    if (section) {
      const navH = getNavHeight();
      const top = section.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
      if (updateHash && window.location.hash !== `#${id}`) {
        window.history.pushState(null, '', `#${id}`);
      }
    }
  };

  // Handle direct loads with hash and back/forward navigation
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        scrollToSection(hash, false);
      }
    };

    if (window.location.hash) {
      const timer = setTimeout(handleHashNavigation, 80);
      return () => clearTimeout(timer);
    }

    window.addEventListener('hashchange', handleHashNavigation);
    return () => window.removeEventListener('hashchange', handleHashNavigation);
  }, []);

  const selectLink = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToSection(id, true);
  };

  return (
    <>
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <a href="#home" className="nav-brand" aria-label="Techphonsa home" onClick={(e) => selectLink(e, 'home')}>
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
          <li><a href="#home" className={activeLink === 'home' ? 'active' : ''} onClick={(e) => selectLink(e, 'home')}>Home</a></li>
          <li><a href="#about" className={activeLink === 'about' ? 'active' : ''} onClick={(e) => selectLink(e, 'about')}>About</a></li>
          <li><a href="#services" className={activeLink === 'services' ? 'active' : ''} onClick={(e) => selectLink(e, 'services')}>Services</a></li>
          <li><a href="#contact" className={activeLink === 'contact' ? 'active' : ''} onClick={(e) => selectLink(e, 'contact')}>Contact</a></li>
          <li><a href="#contact" className="nav-cta" onClick={(e) => selectLink(e, 'contact')}>Let's talk</a></li>
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
        <a href="#home" className={activeLink === 'home' ? 'active' : ''} onClick={(e) => selectLink(e, 'home')}>Home</a>
        <a href="#about" className={activeLink === 'about' ? 'active' : ''} onClick={(e) => selectLink(e, 'about')}>About</a>
        <a href="#services" className={activeLink === 'services' ? 'active' : ''} onClick={(e) => selectLink(e, 'services')}>Services</a>
        <a href="#contact" className={activeLink === 'contact' ? 'active' : ''} onClick={(e) => selectLink(e, 'contact')}>Contact</a>
        <a href="#contact" className="nav-cta" onClick={(e) => selectLink(e, 'contact')}>Let's talk</a>
      </div>
    </>
  );
};

export default Navbar;
