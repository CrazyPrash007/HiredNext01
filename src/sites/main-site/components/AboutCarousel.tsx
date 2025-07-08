import React from 'react';
import './AboutCarousel.css';

// Import images
import permanent from '../../../assets/images/StockImages/permanent_hiring.jpeg';
import rpo from '../../../assets/images/StockImages/rpo.jpg';
import realm from '../../../assets/images/StockImages/realm.jpg';
import capital from '../../../assets/images/StockImages/capital.jpeg';

const images = [permanent, rpo, realm, capital];

const AboutCarousel: React.FC = () => {
  return (
    <div className="about-carousel">
      <div className="carousel-container">
        {/* Original set of images */}
        {images.map((image, index) => (
          <div key={`original-${index}`} className="carousel-slide">
            <div className="carousel-image">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          </div>
        ))}
        {/* Duplicate set of images for seamless loop */}
        {images.map((image, index) => (
          <div key={`duplicate-${index}`} className="carousel-slide">
            <div className="carousel-image">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutCarousel; 