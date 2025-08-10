import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './sites/main-site/components/Header';
import Footer from './sites/main-site/components/Footer';
import Home from './sites/main-site/pages/Home';
import Services from './sites/main-site/pages/Services';
import './App.css';
import { getRealmUrl } from './config/urls';

// Helper component to handle scrolling to anchors
const ScrollToAnchor = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);
  
  return null;
};

// Redirect component to send users to external Realm site
const ExternalRedirect: React.FC<{ to: string }> = ({ to }) => {
  useEffect(() => {
    // Use replace so the back button doesn't return to the redirecting route
    window.location.replace(to);
  }, [to]);
  return null;
};

// MainSite component to wrap the original site content
const MainSite: React.FC = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

function App() {
  // Add scroll animation for sections
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section-container');
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
          section.classList.add('fade-in');
        }
      });
    };
    
    // Initialize animation on elements that are already in view
    setTimeout(() => {
      handleScroll();
    }, 100);
    
    // Create and attach event listeners
    const setupScrollListeners = () => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    };
    
    // Check if IntersectionObserver is available
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            // Once the animation is triggered, we can stop observing this element
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      
      document.querySelectorAll('.section-container').forEach(section => {
        observer.observe(section);
      });
      
      return () => {
        document.querySelectorAll('.section-container').forEach(section => {
          observer.unobserve(section);
        });
      };
    } 
    
    // Fallback for browsers that don't support Intersection Observer
    return setupScrollListeners();
  }, []);

  return (
    <Router>
      <div className="App">
        <ScrollToAnchor />
        <Routes>
          {/* Redirect /realm to the external Realm site */}
          <Route path="/realm" element={<ExternalRedirect to={getRealmUrl()} />} />
          <Route path="/*" element={<MainSite />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
