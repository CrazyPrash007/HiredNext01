import React, { useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import TeamSection from '../components/TeamSection';
import ContactSection from '../components/ContactSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import AboutUsSection from '../components/AboutUsSection';
import './Home.css';

const Home: React.FC = () => {
  //const navigate = useNavigate();

  // Add scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section-container');
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
          section.classList.add('fade-in');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home-page">
      <HeroSection />
      <div className="services-wrapper"><ServicesSection /></div>
      <AboutUsSection />
      <div id="team"><TeamSection /></div>
      <TestimonialsSection />
      <div id="faq-section"><FAQSection /></div>
      <div id="contact"><ContactSection /></div>
    </div>
  );
};

export default Home; 
