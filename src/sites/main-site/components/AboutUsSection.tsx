import React from 'react';
import './AboutUsSection.css';
import MapComponent from './MapComponent';
import DomainBox from './DomainBox';
import AboutCarousel from './AboutCarousel';

const AboutUsSection: React.FC = () => {
  const domains = [
    { name: "Retail", icon: "fas fa-store" },
    { name: "Apparel", icon: "fas fa-tshirt" },
    { name: "Textile", icon: "fas fa-mitten" },
    { name: "Semiconductor Industries", icon: "fas fa-microchip" },
    
    { name: "BFSI", icon: "fas fa-university" },
    { name: "NBFC", icon: "fas fa-money-check-alt" },
    { name: "IT", icon: "fas fa-laptop-code" },
    { name: "Engineering", icon: "fas fa-cogs" }
  ];
  
  return (
    <section id="about" className="about-us-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Us</h2>
        </div>
        
        <div className="about-us-content">
          {/* Introduction */}
          <div className="about-intro">
            <p className="highlight-text">
              With over 9 years of experience in the employment industry, HIREDNEXT has built a reputation for excellence in recruitment.
            </p>
          </div>

          {/* About Carousel */}
          <AboutCarousel />

          {/* About Description */}
          <div className="about-description">
            <div className="about-text">
              <p>
                HiredNext is a global recruitment consultancy specializing in mid to senior level hiring across Apparel, Textiles & Retail, IT, BFSI, and Engineering industries. With a presence in India, Southeast Asia, and the Middle East, we help businesses hire the right talent to fuel innovation and growth.
              </p>
              <p>
                Founded in 2016, HiredNext has emerged as a trusted global recruitment partner for organizations across multiple industries and geographies. We are not just a hiring agency; we are strategic talent advisors dedicated to connecting businesses with high-performing professionals who help drive transformation, innovation, and growth.
              </p>
              <p>
                Our core specialization lies in mid to senior-level recruitment, catering to a wide spectrum of roles in Information Technology (IT), Banking & Financial Services (BFSI), Apparel & Textiles, Engineering, Manufacturing, and Retail sectors.
              </p>
            </div>
            
            {/* Stats */}
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">1500+</span>
                <span className="stat-label">Successful Placements</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">120+</span>
                <span className="stat-label">Partner Companies</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
          
          {/* Our Vision */}
          <div className="vision-mission-container">
            <div className="vision-box">
              <div className="vision-icon">
                <i className="fas fa-eye"></i>
              </div>
              <h3>Our Vision</h3>
              <p>To become the most respected and reliable recruitment partner in the regions we serve, known for our deep industry knowledge, consultative approach, and consistent delivery.</p>
            </div>
            
            <div className="mission-box">
              <div className="mission-icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3>Our Mission</h3>
              <p>To empower organizations by delivering quality talent that fits both the role and the culture. Building teams that thrive, scale, and lead with purpose.</p>
            </div>
          </div>
          
          
          
          
          {/* Services Overview */}
          <div className="services-overview">
            <h3 className="services-title">
              <i className="fas fa-cogs"></i> Our Process
            </h3>
            <div className="services-grid">
              <div className="service-box">
                <i className="fas fa-users-cog"></i>
                <h4>Industry Aligned Recruiters</h4>
                <p>Our recruiters are specialists in their sectors, bringing deep domain expertise to understand your unique hiring needs and candidate requirements.</p>
              </div>
              
              <div className="service-box">
                <i className="fas fa-project-diagram"></i>
                <h4>End to End Solutions</h4>
                <p>From role analysis to onboarding support, we manage the complete recruitment lifecycle with precision and professionalism.</p>
              </div>
              
              <div className="service-box">
                <i className="fas fa-globe-americas"></i>
                <h4>Global Talent Reach</h4>
                <p>Access top talent across borders through our extensive network and presence in multiple countries for niche and specialized roles.</p>
              </div>

              <div className="service-box">
                <i className="fas fa-handshake"></i>
                <h4>Culture First Hiring</h4>
                <p>Beyond skills matching, we ensure candidates align with your company's values and culture for long term success and retention.</p>
              </div>
            </div>
          </div>
          
          {/* Global Presence */}
          <div className="global-presence">
            <h3>
              <i className="fas fa-globe-americas"></i> Global Presence
            </h3>
            <p>We are currently working with companies across multiple continents including:</p>
            
            {/* Leaflet Map */}
            <div className="global-map-container">
              <MapComponent />
            </div>
            
            <h3>
              <i className="fas fa-briefcase"></i> Our Main Domains
            </h3>
            
            {/* Domain Boxes */}
            <div className="domain-boxes">
              {domains.map((domain, index) => (
                <DomainBox 
                  key={index} 
                  name={domain.name} 
                  icon={domain.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection; 
