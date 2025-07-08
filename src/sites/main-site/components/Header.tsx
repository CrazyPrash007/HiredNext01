import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
//import { getRealmUrl } from '../../../config/urls';
import './Header.css';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effect to scroll to top when the location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false);
    
    if (!isHomePage) {
      // If not on home page, navigate to home with hash
      navigate(`/#${sectionId}`);
    } else {
      // If on home page, just scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80; // Height of your fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleNavigation = (path: string, e: React.MouseEvent) => {
    setMenuOpen(false);
    
    // If we're already on the page being navigated to, just scroll to top
    if (location.pathname === path) {
      e.preventDefault(); // Prevent default link behavior
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Otherwise let normal navigation happen (React Router)
    // The useEffect with dependency on location.pathname will scroll to top
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/" onClick={(e) => handleNavigation('/', e)}>
            <div className="text-logo">
              <span className="text-logo-hired">HIRED</span>
              <span className="text-logo-next">NEXT</span>
              <span className="text-logo-recruitment">RECRUITMENT</span>
            </div>
          </Link>
        </div>
        
        <div className={`mobile-menu-btn ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={(e) => handleNavigation('/', e)}>Home</Link></li>
            <li><Link to="/services" onClick={(e) => handleNavigation('/services', e)}>Services</Link></li>
            <li><a href="/#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
            {/* <li><a href="/#team" onClick={(e) => { e.preventDefault(); scrollToSection('team'); }}>Founder</a></li> */}
            {/* <li><a href={getRealmUrl()} target="_blank" rel="noopener noreferrer">Realm</a></li> */}
            <li><a href="/#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}>Testimonials</a></li>
            <li><a href="/#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li> 
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 
