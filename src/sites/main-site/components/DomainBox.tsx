import React from 'react';
import './DomainBox.css';

interface DomainBoxProps {
  name: string;
  icon: string;
}

const DomainBox: React.FC<DomainBoxProps> = ({ name, icon }) => {
  return (
    <div className="domain-box">
      <div className="domain-icon">
        <i className={icon}></i>
      </div>
      <div className="domain-name">{name}</div>
    </div>
  );
};

export default DomainBox; 
