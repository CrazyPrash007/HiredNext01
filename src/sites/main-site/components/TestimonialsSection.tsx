import React, { useEffect, useRef, useState } from 'react';
import './TestimonialsSection.css';
import manojImage from '../../../assets/images/Testimonials/Manoj D.png';
import bharatImage from '../../../assets/images/Testimonials/Bharat Ahuja.png';
import jpImage from '../../../assets/images/Testimonials/JP Mohanty.png';
import jadhavImage from '../../../assets/images/Testimonials/Jadhav Prashant Kumar.png';
import nazimImage from '../../../assets/images/Testimonials/Nazim Khan.png';
import pinkyImage from '../../../assets/images/Testimonials/Pinky Kotecha.png';

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Manoj D.",
    position: "CEO",
    company: "GoodEarth Apparels Ltd",
    text: "HiredNext is an efficient and reliable recruitment agency. Their deep industry knowledge, personalised approach, and commitment to quality hires set them apart. The team understands both employer needs and candidate aspirations, ensuring the right fit every time. Highly recommend them as a trusted recruitment partner!",
    photo: manojImage,
    linkedin: "https://www.linkedin.com/in/manoj-d-319a0a27"
  },
  {
    id: 2,
    name: "Bharat Ahuja",
    position: "Creative Director",
    company: "Mix Nouveau",
    text: "It's been an absolutely pleasure interacting with Taru Shikha. I have yet to come across another recruitment firm that delves as deep as Taru Shikha's does when it comes to understanding candidates, their innate personalities and guiding them through the intricate world of matching suitable organizations with worthy candidates. Her commitment and sense of integrity to both, the organization as well as the candidate; is praiseworthy. Taru Shikha is highly perceptive and has an instinctive affinity towards empathetically dealing with human capital.I'd highly recommend both, organizations as well as individuals to work with Taru Shikha!",
    photo: bharatImage,
    linkedin: "https://www.linkedin.com/in/bharat-ahuja-006b08234"
  },
  {
    id: 3,
    name: "JP Mohanty",
    position: "Senior Director",
    company: "Marriott International",
    text: "I had the chance to work closely with Taru and HIREDNEXT as we were trying to fill a a large gap in manpower in Marriott's Revenue Strategy work force right after COVID. We were trying to attract enterprising non-hospitality talent to join Marriott, and we had some very specific criteria that had to be met. We reached out to several HR consultants for this, and of the lot, Taru and her team were the most responsive, proactive, and gave us the widest base of potential candidates. In fact, of all the candidates that we ended up hiring, all except one, were referred to us through Taru. We were highly impressed with her ability to meet our needs (including salary range!) to the T, and also the quality of her candidates overall. I would say she definitely had the best hit rate by far. All this, whilst meeting short turnaround times, and being extremely organized at that. It was an absolute pleasure to work with her!!",
    photo: jpImage,
    linkedin: "https://www.linkedin.com/in/mohantyjp"
  },
  {
    id: 4,
    name: "Jadhav Prashant Kumar",
    position: "HR Leader",
    company: "DTICI",
    text: "I've had the pleasure of collaborating with the exceptional recruitment consultants 'HiredNext,' consistently achieving remarkable outcomes. Their profound grasp of our needs and efficient teamwork ensured a seamless delivery of talents. Under Taru's visionary leadership, they consistently delivered impressive results. Working with them was truly valuable and productive.",
    photo: jadhavImage,
    linkedin: "https://www.linkedin.com/in/jphr"
  },
  {
    id: 5,
    name: "Nazim Khan",
    position: "CEO",
    company: "Style Craft Apparel",
    text: "Hired next gives you a good solution and options for all levels of manpower requirements for your organisation, keep up the good work.",
    photo: nazimImage,
    linkedin: "https://www.linkedin.com/in/nazim-khan-59178537"
  },
  {
    id: 6,
    name: "Pinky Kotecha",
    position: "HR Manager",
    company: "InnovateCorp",
    text: "HiredNext founder Taru Shikha is one of the business world's great person to work with. she completely understand your need for talent. Her expert evaluation before presenting a suitable candidate is so through it just makes hirer's life easier to identify suitable talent for a organisation.",
    photo: pinkyImage,
    linkedin: "https://www.linkedin.com/in/pinky-kotecha-0b615157"
  }
];

const TestimonialsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    // Clone testimonials for seamless infinite scroll
    const cloneItems = () => {
      const items = scrollContainer.querySelectorAll('.testimonial-card');
      items.forEach(item => {
        const clone = item.cloneNode(true);
        scrollContainer.appendChild(clone);
      });
    };
    
    cloneItems();
    
    // Set animation duration based on content length
    scrollContainer.style.animationDuration = `${testimonials.length * 10}s`;
    
    // Reset animation when it completes
    const handleAnimationEnd = () => {
      scrollContainer.style.animation = 'none';
      void scrollContainer.offsetWidth; // Trigger reflow
      scrollContainer.style.animation = `scrollLeft ${testimonials.length * 10}s linear infinite`;
      
      // If it was paused before, keep it paused
      if (isPaused) {
        scrollContainer.style.animationPlayState = 'paused';
      }
    };
    
    scrollContainer.addEventListener('animationend', handleAnimationEnd);
    
    return () => {
      scrollContainer.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [isPaused]);

  // Update animation state when expanded state changes
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    if (expandedIndex !== null) {
      scrollContainer.style.animationPlayState = 'paused';
      setIsPaused(true);
    } else {
      scrollContainer.style.animationPlayState = 'running';
      setIsPaused(false);
    }
  }, [expandedIndex]);

  const toggleTextExpansion = (index: number, event: React.MouseEvent) => {
    // Prevent clicking on links from toggling expansion
    if ((event.target as HTMLElement).closest('.linkedin-link')) {
      return;
    }
    
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const closeExpanded = (event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedIndex(null);
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="section-header">
        <h2 className="section-title">What Our Clients Say</h2>
      </div>
      <div className="testimonials-outer">
        <div className="testimonials-container" ref={scrollRef}>
          {testimonials.map((testimonial, index) => (
            <div 
              className={`testimonial-card ${expandedIndex === index ? 'expanded' : ''}`} 
              key={testimonial.id}
              onClick={(e) => toggleTextExpansion(index, e)}
            >
              <div className="testimonial-content">
                <div className="testimonial-text">
                  "{testimonial.text}"
                  <div className="read-more-indicator">
                    Read more <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
                {expandedIndex === index && (
                  <div className="testimonial-text-full">
                    "{testimonial.text}"
                    <div className="close-expanded" onClick={closeExpanded}>
                      <i className="fas fa-times"></i>
                    </div>
                  </div>
                )}
                <div className="testimonial-author">
                  <div className="author-profile">
                    <div className="author-image">
                      <img src={testimonial.photo} alt={testimonial.name} />
                    </div>
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.position}, {testimonial.company}</p>
                    </div>
                  </div>
                  <a 
                    href={testimonial.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="linkedin-link"
                    aria-label={`Connect with ${testimonial.name} on LinkedIn`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 
