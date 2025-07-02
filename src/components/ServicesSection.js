// ✅ components/ServicesSection.js
import React from 'react';

export default function ServicesSection() {
  return (
    <section className="services section-divider" id="services" data-aos="fade-up">
      <h2>Our Services</h2>
      <p className="section-subtitle">What we do best</p>
      <div className="card-grid">
        {[ 
          { title: 'App development', img: 'dev.jpg', desc: 'Mobile and web app solutions tailored to your business.' },
          { title: 'Automation', img: 'automation.jpg', desc: 'Automate routine workflows and reduce operational drag.' },
          { title: 'AI solutions', img: 'ai.jpg', desc: 'Use analytics to gain insights and make smarter decisions.' }
        ].map((service, i) => (
          <div className="card hover-3d" key={i} data-aos="zoom-in">
            <img src={`/images/${service.img}`} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <a className="btn-outline" href="#about">Learn more</a>
          </div>
        ))}
      </div>
    </section>
  );
}
