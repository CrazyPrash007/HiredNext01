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

// Embed component to display Realm within an iframe while keeping URL
const RealmEmbed: React.FC = () => {
  useEffect(() => {
    // Prevent double scrollbars
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
  
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        title="HiredNext Realm"
        src={getRealmUrl()}
        style={{ border: 'none', width: '100%', height: '100%' }}
        allow="fullscreen; clipboard-read; clipboard-write"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
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
          {/* Show the Realm site at /realm without changing the URL */}
          <Route path="/realm" element={<RealmEmbed />} />
          <Route path="/*" element={<MainSite />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
