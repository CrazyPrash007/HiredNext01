import React from 'react';
import { Link } from 'react-router-dom';
import './ServicesSection.css';
import realmImage from '../../../assets/images/StockImages/realm.jpg';
import avronImage from '../../../assets/images/StockImages/ascend.jpeg';
import permanentImage from '../../../assets/images/StockImages/permanent_hiring.jpeg';
import rpoServiceImage from '../../../assets/images/StockImages/rpo.jpg';


interface ServiceData {
  id: number;
  title: string;
  description: string;
  image: string;
  route?: string;
}

const serviceData: ServiceData[] = [
  {
    id: 1,
    title: 'Permanent Hiring',
    description: 'Our permanent hiring solutions connect you with exceptional talent for long term strategic roles. We handle the entire recruitment lifecycle, ensuring the perfect fit for your organization\'s culture and needs.',
    image: permanentImage
  },
  {
    id: 2,
    title: 'RPO (Recruitment Process Outsourcing)',
    description: 'Our RPO services deliver significant scale and cost benefits by managing your entire recruitment function. Streamline hiring processes, reduce time to fill, and decrease recruitment costs while maintaining quality.',
    image: rpoServiceImage
  },
  {
    id: 3,
    title: 'HiredNext Realm (Executive Search)',
    description: 'Connecting businesses with top talent to drive growth and innovation. Our capital services provide companies with access to pre-vetted professionals ready to make an immediate impact.',
    image: realmImage,
    route: '/services#realm'
  },
  {
    id: 4,
    title: 'HiredNext Avron (Candidate Upskilling)',
    description: 'Empowering professionals to elevate their careers through personalized coaching, skill development, and exclusive opportunity connections in leading companies.',
    image: avronImage,
    route: '/services#avron'
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section className="services-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">How We Can Help</h2>
          <p className="section-description">
            HiredNext offers specialized services designed to meet the needs of both businesses 
            and professionals in today's competitive market.
          </p>
        </div>
        
        <div className="services-grid">
          {serviceData.map(service => (
            <div className="service-card" key={service.id}>
              <div className="service-image">
                <img src={service.image} alt={service.title} loading="lazy" />
              </div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                {service.route && (
                  <Link to={service.route} className="service-link">
                    Learn More <i className="fas fa-arrow-right"></i>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 
