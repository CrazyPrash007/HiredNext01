import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
//import { getRealmUrl } from '../../../config/urls';
import './Services.css';

// Import images with type assertions
const realmImage = require('../../../assets/images/StockImages/realm.jpg') as string;
const realmImage2 = require('../../../assets/images/StockImages/realm2.jpg') as string;
const realmImage3 = require('../../../assets/images/StockImages/realm3.jpg') as string;
const flexImage = require('../../../assets/images/StockImages/capital.jpeg') as string;
const flexImage2 = require('../../../assets/images/StockImages/pic1.png') as string;
const avronImage = require('../../../assets/images/StockImages/ascend.jpeg') as string;
const avronImage2 = require('../../../assets/images/StockImages/avron2.jpg') as string;
const avronImage3 = require('../../../assets/images/StockImages/avron3.jpg') as string;
const permanentImage = require('../../../assets/images/StockImages/permanent_hiring.jpeg') as string;
const permanentImage2 = require('../../../assets/images/StockImages/permanent_hiring2.png') as string;
const rpoImage = require('../../../assets/images/StockImages/rpo.jpg') as string;
const rpoImage2 = require('../../../assets/images/StockImages/rpo2.jpg') as string;

interface ServiceDetail {
  id: string;
  title: string;
  headline: string;
  description: string;
  features: string[];
  benefits?: string;
  ctaText?: string;
  images: string[];
  flexService?: {
    title: string;
    headline: string;
    description: string;
    subDescription: string;
    vision: string;
    mission: string;
    tagline: string;
    images: string[];
  };
  bridgeService?: {
    title: string;
    headline: string;
    description: string;
    mission: string;
    vision: string;
    tagline: string;
  };
}

const serviceDetails: ServiceDetail[] = [
  {
    id: 'realm',
    title: 'HiredNext Realm',
    headline: 'Curating Culture Fit Leadership for Transformational Impact',
    description: 'HiredNext Realm is the premium executive search division of HiredNext, dedicated to identifying, assessing, and nurturing exceptional leadership. We specialize in serving the top echelons of leadership- CXOs, functional heads, board members, and strategic advisors.',
    features: [
      'Expertise in executive search for CXO, board, and leadership roles',
      'Trusted by growth stage ventures, MNCs, and private equity backed firms',
      'Personalized search built on business insight, industry knowledge, and cultural alignment',
      'Strategic leadership placements that drive long term business success',
      'Global hubs in India, Indonesia, Jordan, UAE, Ethiopia, Myanmar, and China'
    ],
    benefits: 'We deliver more than candidates, we deliver transformational leaders. By combining localized understanding with international reach, our tailored search processes ensure leaders who not only fit but elevate your company\'s vision and culture.',
    ctaText: 'Visit HiredNext Realm',
    images: [realmImage, realmImage2, realmImage3],
    flexService: {
      title: 'Introducing HiredNext Flex',
      headline: 'On Demand Leadership. Curated for Growth.',
      description: 'HiredNext Flex is India\'s premier platform for on demand, fractional leadership connecting ambitious startups and scaling businesses with elite, pre vetted CXOs and senior advisors across finance, marketing, technology, and operations.',
      subDescription: 'Built with the agility of startups in mind, HiredNext Flex combines the precision of curated executive search with the flexibility of fractional engagements. From interim CFOs to growth focused CMOs, we match businesses with the right leaders to scale faster, smarter.',
      vision: 'To power the next generation of startups by making world class leadership accessible and agile.',
      mission: 'We connect ambitious businesses with an elite, global network of fractional executives. Through meticulous curation, hands-on support, and a community driven approach, we accelerate growth and turn every inflection point into momentum.',
      tagline: 'At HiredNext Flex, we don\'t just fill roles we unlock potential. One leader at a time.',
      images: [flexImage, flexImage2]
    }
  },
  {
    id: 'avron',
    title: 'HiredNext Avron',
    headline: 'Elevate Your Professional Journey',
    description: 'HiredNext Avron is your AI-driven career companion, focused on recommending the right courses to unlock better job opportunities. By parsing your resume, Avron identifies your skill gaps and instantly suggests personalized courses to help you level up.',
    features: [
      'AI-powered resume parsing to identify skills and gaps',
      'Personalized course recommendations mapped to your career goals',
      'Smart job suggestions aligned with your upskilling path',
      'Financial support options for premium courses via EMI or loans',
      'Application tracking integrated with your learning progress'
    ],    
    benefits: 'HiredNext Avron is designed to empower professionals by bridging skill gaps through smart course recommendations, improving job readiness, and simplifying access to career opportunities all in one platform.',
    ctaText: 'Visit HiredNext Avron',
    images: [avronImage, avronImage2, avronImage3],
    bridgeService: {
      title: 'Introducing HiredNext Bridge',
      headline: "India's Comeback Careers Platform for Women and Senior Professionals",
      description: 'HiredNext Bridge is a dedicated platform designed to empower women returning from career breaks and experienced senior professionals seeking to re-enter the workforce. We provide personalized upskilling, mentorship, and access to hybrid and consulting opportunities bridging the gap between potential and placement.',
      mission: 'To empower professionals on career breaks to achieve excellence by reconnecting them with meaningful work, community, and confidence. We transform pauses into purposeful comebacks.',
      vision: 'To redefine career breaks as transformative journeys and make strong, successful returns the new normal fueling inclusion, innovation, and growth in India\'s workforce.',
      tagline: 'At HiredNext Bridge, we don\'t just help people get back to work—we help them come back stronger.'
    }
  },
  {
    id: 'permanent',
    title: 'Permanent Hiring Solutions',
    headline: 'Building Your Dream Team',
    description: 'Our permanent hiring solutions help organizations find and secure top tier talent for long-term success, ensuring perfect matches for crucial roles within your company.',
    features: [
      'Comprehensive candidate screening and assessment',
      'Industry specific talent pool access',
      'Detailed background and reference checks',
      'Salary benchmarking and negotiation support',
      'Extended placement guarantee'
    ],
    benefits: 'Our permanent hiring solutions have a 92% retention rate after one year, with clients reporting increased productivity and team satisfaction.',
    images: [permanentImage, permanentImage2]
  },
  {
    id: 'rpo',
    title: 'Recruitment Process Outsourcing (RPO)',
    headline: 'Transforming Your Recruitment Strategy',
    description: 'Our RPO service provides end-to-end recruitment solutions, managing your entire hiring process while reducing costs and improving quality of hires.',
    features: [
      'Complete recruitment process management',
      'Customized hiring strategies',
      'Advanced recruitment technology integration',
      'Regular performance metrics and reporting',
      'Scalable solutions for varying hiring needs'
    ],
    benefits: 'Companies using our RPO services see an average of 35% reduction in cost-per-hire and 45% faster time to fill positions.',
    images: [rpoImage, rpoImage2]
  }
];

const Services: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});

  // Handle scroll to service section when page loads with hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          const yOffset = -80; // Adjust this value to control the scroll position
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  const toggleSection = useCallback((serviceId: string, section: 'flex' | 'bridge') => {
    setVisibleSections(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  }, []);

  const isVisible = useCallback((serviceId: string) => {
    return visibleSections[serviceId] || false;
  }, [visibleSections]);

  const handleServiceClick = useCallback((serviceId: string): void => {
    switch (serviceId) {
      case 'realm':
        // Keep URL on hirednext.co by navigating to the embedded route
        navigate('/realm');
        break;
      case 'avron':
        navigate('/avron');
        break;
      default:
        console.warn(`Unknown service ID: ${serviceId}`);
    }
  }, [navigate]);

  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="services-hero-content">
          <h1>Our Services</h1>
          <p>Tailored solutions for businesses and professionals</p>
        </div>
      </div>
      
      <div className="services-container">
        {serviceDetails.map((service: ServiceDetail, index: number) => {
          return (
            <div id={service.id} className="service-detailed" key={service.id}>
              <div className="service-detailed-content">
                <div className="service-detailed-info">
                  <h2>{service.title}</h2>
                  <h3>{service.headline}</h3>
                  <p className="service-detailed-description">{service.description}</p>
                  
                  <h4>Key Features</h4>
                  <ul>
                    {service.features.map((feature: string, idx: number) => (
                      <li key={`${service.id}-feature-${idx}`} className="feature-item">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {service.benefits && (
                    <div className="service-benefits">
                      <h4>Benefits</h4>
                      <p>{service.benefits}</p>
                    </div>
                  )}

                  {service.ctaText && (service.id === 'realm' || service.id === 'avron') && (
                    <button 
                      type="button"
                      className="service-cta-btn"
                      onClick={() => handleServiceClick(service.id)}
                      aria-label={`Visit ${service.title}`}
                    >
                      {service.ctaText}
                    </button>
                  )}
                </div>
                
                <div className="service-detailed-images">
                  <div className="service-image-wrapper">
                    <img 
                      src={service.images[0]} 
                      alt={`${service.title} - Primary`} 
                      className="service-image" 
                      loading="lazy"
                    />
                  </div>
                  <div className="service-image-wrapper">
                    <img 
                      src={service.images[1]} 
                      alt={`${service.title} - Secondary`} 
                      className="service-image" 
                      loading="lazy"
                    />
                  </div>
                  {(service.id === 'realm' || service.id === 'avron') && (
                    <div className="service-image-wrapper">
                      <img 
                        src={service.images[2]} 
                        alt={`${service.title} - Additional`} 
                        className="service-image" 
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>

              {service.id === 'realm' && service.flexService && (
                <div className="realm-flex-section">
                  <button 
                    type="button"
                    className="reveal-flex-btn"
                    onClick={() => toggleSection(service.id, 'flex')}
                    aria-expanded={isVisible(service.id)}
                    aria-controls="flex-content"
                  >
                    {isVisible(service.id) ? 'Hide Flex' : 'Discover Flex →'}
                  </button>
                  
                  {isVisible(service.id) && (
                    <div id="flex-content" className="flex-content">
                      <h3>{service.flexService.headline}</h3>
                      <p className="flex-description">{service.flexService.description}</p>
                      <p className="flex-description">{service.flexService.subDescription}</p>
                      
                      <div className="flex-mission-vision">
                        <div className="flex-section">
                          <h4>Vision</h4>
                          <p>{service.flexService.vision}</p>
                        </div>
                        
                        <div className="flex-section">
                          <h4>Mission</h4>
                          <p>{service.flexService.mission}</p>
                        </div>
                      </div>
                      
                      <p className="flex-tagline">{service.flexService.tagline}</p>
                    </div>
                  )}
                </div>
              )}
              
              {service.id === 'avron' && service.bridgeService && (
                <div className="realm-flex-section">
                  <button 
                    type="button"
                    className="reveal-flex-btn"
                    onClick={() => toggleSection(service.id, 'bridge')}
                    aria-expanded={isVisible(service.id)}
                    aria-controls="bridge-content"
                  >
                    {isVisible(service.id) ? 'Hide Bridge' : 'Discover Bridge →'}
                  </button>
                  
                  {isVisible(service.id) && (
                    <div id="bridge-content" className="flex-content">
                      <h3>{service.bridgeService.headline}</h3>
                      <p className="flex-description">{service.bridgeService.description}</p>
                      
                      <div className="bridge-mission-vision">
                        <div className="bridge-section">
                          <h4>Our Mission</h4>
                          <p>{service.bridgeService.mission}</p>
                        </div>
                        
                        <div className="bridge-section">
                          <h4>Our Vision</h4>
                          <p>{service.bridgeService.vision}</p>
                        </div>
                      </div>
                      
                      <p className="bridge-tagline">{service.bridgeService.tagline}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services; 
