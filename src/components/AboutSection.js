// ✅ components/AboutSection.js
import React from 'react';

export default function AboutSection() {
  return (
    <section className="grid-section section-divider" id="about" data-aos="fade-right">
      <h2>What We Offer</h2>
      <p className="section-subtitle">Solutions tailored for you</p>
      <div className="horizontal-scroll-wrapper">
        <div className="horizontal-scroll">
          {[1, 2].flatMap(() => [
            'Workflow automation',
            'App & web development',
            'AI-powered features',
            'IT strategy consulting'
          ]).map((item, i) => (
            <div className="scroll-card hover-3d" key={i}>
              <div className="scroll-card-inner">
                <h4>{item}</h4>
                <p>High-quality tailored service to support your business goals.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
