import React from 'react';
import './TeamSection.css';

// Import founder image only
import taruImage from '../../../assets/images/Teams/founder.png';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  photo?: string;
  linkedIn: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Taru Shikha',
    title: 'Founder',
    photo: taruImage,
    linkedIn: 'https://www.linkedin.com/in/tarushikhaarora/',
  }
];

const TeamSection: React.FC = () => {
  const founder = teamMembers[0];
  
  // Function to generate placeholder URL with name
  const getPhotoUrl = (member: TeamMember) => {
    if (member.photo) {
      return member.photo;
    }
    // Create placeholder with name
    return `https://via.placeholder.com/300x300?text=${member.name.replace(' ', '+')}`;
  };
  
  return (
    <section id="team" className="team-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Meet the Founder</h2>
          <p className="section-description">Our visionary leader who brings years of industry experience to help connect the right talent with the right opportunities.</p>
        </div>
        
        {/* Founder Section */}
        <div className="founder-section">
          <div className="founder-photo">
            <img src={getPhotoUrl(founder)} alt={founder.name} />
          </div>
          <div className="founder-message">
            <h3 className="founder-name">{founder.name}</h3>
            <p className="founder-title">{founder.title}</p>
            <div className="founder-word">
              <h4>Word from Founder</h4>
              <p>At HiredNext, we don't just recruit we decode potential.
                With nearly a decade of experience across industries, we specialize in identifying high impact talent that can fuel business growth from day one. Whether it's mid management or senior leadership, we blend instinct, insight, and deep domain understanding to match the right people with the right organizations.

                Recruitment is not a transaction for us it's a transformation.
                Every CV is a story, and every hire is a strategic decision. At HiredNext, we work closely with clients and candidates to ensure that fit goes beyond skill into culture, vision, and ambition.</p>
            </div>
            <div className="member-social">
              <a href={founder.linkedIn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 
