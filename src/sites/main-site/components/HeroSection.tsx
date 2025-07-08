import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="blur-background"></div>
      <div className="hero-content">
        <h2>Empowering futures.<br/>
          Connecting Leaders</h2>
        <p>HiredNext is a global recruitment services specializing in mid to senior level hiring across key industries including Information Technology (IT), Banking & Financial Services (BFSI), Retail, Apparel & Textiles, Engineering, and Manufacturing.</p>
        <div className="hero-buttons">
          <Link to="/services" className="primary-btn">Explore Services</Link>
          <a href="#contact" className="secondary-btn">Schedule Consultation</a>
        </div>
      </div>
      <div className="hero-image">
        <div className="image-container"></div>
      </div>
    </section>
  );
};

export default HeroSection; 
