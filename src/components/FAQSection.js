// ✅ components/FAQSection.js
import React, { useState } from 'react';

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = index => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqList = [
    ['What services do you provide?', 'We offer app and web development, automation, AI tools, and IT consulting.'],
    ['How can I begin a project?', 'Send us your project details. We\'ll guide you from start to finish.'],
    ['Can your solutions scale with us?', 'Yes, everything we build is scalable and designed to grow with you.'],
    ['How long does a project take?', 'Most projects finish in a few weeks with clear timelines and feedback loops.']
  ];

  return (
    <section className="faq section-divider" id="faq" data-aos="fade-left">
      <h2>FAQs</h2>
      <p className="section-subtitle">Your questions, answered fast</p>
      {faqList.map(([q, a], idx) => (
        <div className={`faq-item ${openFAQ === idx ? 'open' : ''}`} key={idx}>
          <div className="faq-header" onClick={() => toggleFAQ(idx)}>
            <h3>{q}</h3>
            <span className="faq-icon">{openFAQ === idx ? '−' : '+'}</span>
          </div>
          <div className="faq-body"><p>{a}</p></div>
        </div>
      ))}
    </section>
  );
}