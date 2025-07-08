import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>HiredNext</h2>
          <p>Elevating professionals through strategic guidance and innovative solutions. We're committed to transforming professional journeys with our premium services.</p>
          <div className="newsletter">
            <h4>Stay Updated</h4>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><a href="/#about">About</a></li>
              <li><a href="/#team">Team</a></li>
              <li><a href="/#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li><Link to="/services#permanent">Permanent Hiring</Link></li>
              <li><Link to="/services#rpo">RPO</Link></li>
              <li><Link to="/services#realm">HiredNext Realm</Link></li>
              <li><Link to="/services#avron">HiredNext Avron</Link></li>            
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <ul className="contact-list">
              <li><i className="fas fa-envelope"></i> work@hirednext.info</li>
              <li><i className="fas fa-map-marker-alt"></i>Delhi NCR, Mumbai, Chennai & Bangalore</li>
              <li><i className="fas fa-clock"></i> Mon-Fri: 9am - 5pm</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HiredNext. All Rights Reserved.</p>
        <div className="social-links">
          <a href="https://www.linkedin.com/company/hirednext-recruitment-service/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          <a href="https://x.com/Hired_Next?t=XeB5aSALcB-NUNNS2TvxgA&s=09 " target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          <a href="https://www.instagram.com/hirednext?igsh=MXJxd2E2OGQ4ZDJ6bg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
