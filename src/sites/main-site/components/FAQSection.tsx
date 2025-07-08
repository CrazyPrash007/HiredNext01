import React, { useState } from 'react';
import './FAQSection.css';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What services does HiredNext provide?",
    answer: "HiredNext provides a comprehensive range of professional development and recruitment services including resume optimization, interview coaching, professional transition guidance, executive coaching, and talent acquisition solutions for businesses."
  },
  {
    id: 2,
    question: "How does your recruitment process work?",
    answer: "Our recruitment process begins with understanding your business needs and company culture. We then leverage our network and advanced tools to identify qualified candidates, conduct initial screenings, and present you with a curated selection of top talent that matches your requirements."
  },
  {
    id: 3,
    question: "Do you work with specific industries or roles?",
    answer: "While we have expertise across multiple industries, we specialize in technology, finance, healthcare, and marketing sectors. We work with positions ranging from entry level to C-suite executives, tailoring our approach to each specific role and industry."
  },
  {
    id: 4,
    question: "How long does the recruitment process typically take?",
    answer: "The timeline varies depending on the complexity of the role and specific requirements. On average, our clients see qualified candidates within 2-3 weeks, with placements often completed within 4-6 weeks. We prioritize finding the right fit over rushing the process."
  },
  {
    id: 5,
    question: "What makes HiredNext different from other recruitment agencies?",
    answer: "Our approach combines human expertise with data driven insights. We focus on long term success rather than quick placements, ensuring cultural and skill alignment. We also provide ongoing support after placement to ensure both employers and candidates are satisfied with the match."
  },
  {
    id: 6,
    question: "What industries do you specialize in?",
    answer: "We specialize in Information Technology (IT), Banking & Financial Services (BFSI), Retail, Apparel & Textiles, Engineering, and Manufacturing sectors. Our expertise spans across these industries with dedicated teams for each sector."
  }
];

const FAQSection: React.FC = () => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="section-header">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p>Find answers to common questions about our recruitment services and processes</p>
      </div>
      <div className="faq-container">
        {faqData.map((item) => (
          <div className="faq-item" key={item.id}>
            <div 
              className={`faq-question ${openItemId === item.id ? 'active' : ''}`}
              onClick={() => toggleItem(item.id)}
            >
              <h3>{item.question}</h3>
              <div className="faq-icon"></div>
            </div>
            <div className={`faq-answer ${openItemId === item.id ? 'active' : ''}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection; 
