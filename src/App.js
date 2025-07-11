
import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import { useRef } from 'react';
import './style.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

useEffect(() => {
  AOS.init({ duration: 1000, once: false });

  const saved = localStorage.getItem('theme');
  if (saved === 'dark') setIsDarkMode(true);

  /* —— SCROLL HANDLER —— */
  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 300);

    // progress bar
    const total = document.body.scrollHeight - window.innerHeight;
    setScrollProgress((window.scrollY / total) * 100);

    // sections to watch (add hero if you like)
    const ids = ['services', 'about', 'faq', 'contact'];   // or ['hero', …]

    let found = '';              // default → none active
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (r.top <= 100 && r.bottom >= 100) {
        found = id;
        break;
      }
    }
    setActiveSection(found);     // '' when top of page
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleFAQ = index => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log('Attempting to send form:', formRef.current);

    emailjs.sendForm('service_v38tqyx', 'template_z8l19lb', formRef.current, 'nx1917tgrD-YS-7cl')
      .then((result) => {
        console.log('Success:', result.text);
        alert('Message sent successfully! We will revert back to you within 2-3 Business Days');
      }, (error) => {
        console.error('EmailJS Error:', error.text);
        alert('Failed to send message due to issues in the email service. Sorry for the inconvinience. You can send email directly to the inquiry@neuro-mesh.com else please try again later.');
      });

    e.target.reset();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main>
      <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }} />
          {/* ───────── Navbar ───────── */}
          <header className="navbar">
            <div className="navbar-inner">{/* NEW wrapper */} 
              {/* logo */}
              <div className="logo">
                <img
                 src={`${process.env.PUBLIC_URL}/${
                    isDarkMode ? 'images/Logo_Dark.png' : 'images/Logo_Light.png'
                  }`}
                  alt="NeuroMesh logo"
                />
              </div>

              {/* hamburger */}
              <button
                className={`hamburger ${isMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMenuOpen(o => !o)}
                aria-label="Toggle navigation"
              >
                <span className="bar" />
                <span className="bar" />
                <span className="bar" />
              </button>

              {/* nav links */}
              <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <a
                  href="#services"
                  className={activeSection === 'services' ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </a>
                <a
                  href="#about"
                  className={activeSection === 'about' ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#faq"
                  className={activeSection === 'faq' ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </a>

               
               {/* CTA pill */}
                <a
                  href="#contact"  
                 className={`btn-primary ${activeSection === 'contact' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get&nbsp;started
                </a>

                {/* icon‑only theme toggle */}
                <button
                  className="theme-toggle"
                  onClick={toggleDarkMode}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <FaSun /> : <FaMoon />}
                </button>
              </nav>

              {/* contained progress bar */}
              <div
                className="scroll-indicator"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </header>

      {/* Hero Slideshow */}
      <section className="hero-banner" id="hero">
        <div className="slider">
          {['hero1.jpg', 'hero2.jpg', 'hero3.jpg', 'hero4.jpg'].map((img, i) => (
            <img
              key={i}
              src={`${process.env.PUBLIC_URL}/images/${img}`} // ✅ Correct for GitHub Pages
              alt={`Slide ${i + 1}`}
              className={`slide ${i === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>
        <div className="hero-text" data-aos="fade-up">
          <h1>Digital solutions for small business growth</h1>
          <p>
            App, web, automation, and AI services for SMEs. Streamline workflows and
            scale with tailored technology built for your business.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="services section-divider" id="services" data-aos="fade-up">
        <h2>Our Services</h2>
        <p className="section-subtitle">What we do best</p>
        <div className="card-grid">
         {[
          { title: 'App development', img: 'dev.jpg', desc: 'Mobile and web app solutions tailored to your business.', details: 'We build robust mobile and web apps tailored to your business needs, supporting growth and scalability.' },
          { title: 'Automation', img: 'automation.jpg', desc: 'Automate routine workflows and reduce operational drag.', details: 'We design and implement automated workflows to streamline operations, boost productivity, and reduce errors.' },
          { title: 'AI solutions', img: 'ai.jpg', desc: 'Use analytics to gain insights and make smarter decisions.', details: 'From machine learning to data-driven decision-making, we help integrate AI into your tools and processes.' }
        ].map((service, i) => (
          <div className="card hover-3d" key={i} data-aos="zoom-in">
            <img src={`${process.env.PUBLIC_URL}/images/${service.img}`} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <button className="btn-outline" onClick={() => {
              setSelectedService(service);
              setModalOpen(true);
            }}>
              Learn more
            </button>
          </div>
        ))}
        </div>
      </section>
      {modalOpen && selectedService && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
            <h2>{selectedService.title}</h2>
            <p>{selectedService.details}</p>
          </div>
        </div>
      )}

     {/* Capabilities Section (Ticker Style & Centered) */}
      <section className="about-section section-divider" id="about" data-aos="fade-right">
        <h2>What We Offer</h2>
        <p className="section-subtitle">Solutions tailored for you</p>
        <div className="horizontal-scroll-wrapper">
          <div className="horizontal-scroll ticker">
            {[
              'Workflow automation',
              'App & web development',
              'AI-powered features',
              'IT strategy consulting'
            ].map((item, i) => (
              <div className="scroll-card hover-3d" key={i}>
                <div className="scroll-card-inner">
                  <h4>{item}</h4>
                  <p>High-quality tailored service to support your business goals.</p>
                </div>
              </div>
            ))}
            {/* Duplicate items to create seamless loop */}
            {[
              'Workflow automation',
              'App & web development',
              'AI-powered features',
              'IT strategy consulting'
            ].map((item, i) => (
              <div className="scroll-card hover-3d" key={`copy-${i}`}>
                <div className="scroll-card-inner">
                  <h4>{item}</h4>
                  <p>High-quality tailored service to support your business goals.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq section-divider" id="faq" data-aos="fade-left">
        <h2>FAQs</h2>
        <p className="section-subtitle">Your questions, answered fast</p>
        {[
          ['What services do you provide?', 'We offer app and web development, automation, AI tools, and IT consulting.'],
          ['How can I begin a project?', 'Send us your project details. We\'ll guide you from start to finish.'],
          ['Can your solutions scale with us?', 'Yes, everything we build is scalable and designed to grow with you.'],
          ['How long does a project take?', 'Most projects finish in a few weeks with clear timelines and feedback loops.']
        ].map(([q, a], idx) => (
          <div className={`faq-item ${openFAQ === idx ? 'open' : ''}`} key={idx}>
            <div className="faq-header" onClick={() => toggleFAQ(idx)}>
              <h3>{q}</h3>
              <span className="faq-icon">{openFAQ === idx ? '−' : '+'}</span>
            </div>
            <div className="faq-body"><p>{a}</p></div>
          </div>
        ))}
      </section>

   

      <footer className="footer section-divider" id="contact" data-aos="fade-up">
        <div className="footer-content">
          {/* Left Side - Contact Info + Social */}
          <div className="footer-left">
            <h2>Let’s Connect</h2>
            <p><strong>Email:</strong> inquiry@neuro-mesh.com</p>
            <p><strong>Phone:</strong> +91-7776994297</p>
            
            <div className="social-icons">
              <a href="#">Blogs</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
            </div>    
          </div>

          {/* Right Side - Contact Form */}
          <form ref={formRef} onSubmit={sendEmail} className="contact-form">
            <h3>Send us a message</h3>
            <input type="text" name="from_name" placeholder="Your Name" required />
            <input type="email" name="from_email" placeholder="Your Email" required />
            <input type="tel" name="phone" placeholder="Phone (optional)" />
            <select name="service" required>
              <option value="">Select a service</option>
              <option value="App Development">App Development</option>
              <option value="AI Solutions">AI Solutions</option>
              <option value="Consulting">Consulting</option>
              <option value="Other">Other</option>
            </select>
            <textarea name="message" placeholder="Your Message / Requirements" required></textarea>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} NeuroMesh Tech Labs. All rights reserved.</p>
        </div>
      </footer>


      {/* Scroll to Top */}
      {showScrollTop && (
        <button className="scroll-top" onClick={scrollToTop} aria-label="Back to top">↑</button>
      )}
    </main>
  );
}

export default App;


   {/* Footer
      <footer className="footer section-divider" id="contact" data-aos="fade-up">
        <h2>Let’s Connect</h2>
        <p><strong>Email:</strong> sumanyu.anand@neuro-mesh.com | <strong>Phone:</strong> +91-7776994297</p>
        <div className="socials">
          <a href="#">Blogs</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </div>
      </footer> */}

      {/* <footer className="footer section-divider" id="contact" data-aos="fade-up">
        <h2>Let’s Connect</h2>
        <p><strong>Email:</strong> sumanyu.anand@neuro-mesh.com | <strong>Phone:</strong> +91-7776994297</p>

        <form ref={formRef} onSubmit={sendEmail} className="contact-form">
          <input type="text" name="from_name" placeholder="Your Name" required />
          <input type="email" name="from_email" placeholder="Your Email" required />
          <input type="tel" name="phone" placeholder="Phone (optional)" />
          <select name="service" required>
            <option value="">Select a service</option>
            <option value="App Development">App Development</option>
            <option value="AI Solutions">AI Solutions</option>
            <option value="Consulting">Consulting</option>
            <option value="Other">Other</option>
          </select>
          <textarea name="message" placeholder="Your Message / Requirements" required></textarea>
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
         
        <div className="socials">
          <a href="#">Blogs</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </div>
      </footer> */}

// // import React, { useEffect, useState } from 'react';
// // import './style.css';
// // import AOS from 'aos';
// // import 'aos/dist/aos.css';

// // function App() {
// //   const [currentSlide, setCurrentSlide] = useState(0);
// //   const [openFAQ, setOpenFAQ] = useState(null);

// //   useEffect(() => {
// //     AOS.init({ duration: 1000, once: false });
// //   }, []);

// //   useEffect(() => {
// //     const slideCount = 4;
// //     const interval = setInterval(() => {
// //       setCurrentSlide((prev) => (prev + 1) % slideCount);
// //     }, 4000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const toggleFAQ = (index) => {
// //     setOpenFAQ(openFAQ === index ? null : index);
// //   };

// //   return (
// //     <main>
// //       {/* Navbar */}
// //       <header className="navbar">
// //         <div className="logo">
// //           <img src="/images/logo.png" alt="NeuroMesh Logo" />
// //         </div>
// //         <nav>
// //           <a href="#services">Services</a>
// //           <a href="#about">About</a>
// //           <a href="#faq">FAQ</a>
// //           <a href="#contact" className="btn-primary">Get started</a>
// //         </nav>
// //       </header>

// //       {/* Hero Banner Slideshow */}
// //       <section className="hero-banner" id="hero">
// //         <div className="slider">
// //           {['hero1.jpg', 'hero2.jpg', 'hero3.jpg', 'hero4.jpg'].map((img, i) => (
// //             <img
// //               key={i}
// //               src={`/images/${img}`}
// //               alt={`Slide ${i + 1}`}
// //               className={`slide ${i === currentSlide ? 'active' : ''}`}
// //             />
// //           ))}
// //         </div>
// //         <div className="hero-text" data-aos="fade-up">
// //           <h1>Digital solutions for small business growth</h1>
// //           <p>
// //             App, web, automation, and AI services for SMEs. Streamline workflows and
// //             scale with tailored technology built for your business.
// //           </p>
// //         </div>
// //       </section>

// //       {/* Services Section */}
// //       <section className="services section-divider" id="services" data-aos="fade-up">
// //         <h2>Our Services</h2>
// //         <p className="section-subtitle">What we do best</p>
// //         <div className="card-grid">
// //           {[
// //             { title: 'App development', img: 'dev.jpg', desc: 'Mobile and web app solutions tailored to your business.' },
// //             { title: 'Automation', img: 'automation.jpg', desc: 'Automate routine workflows and reduce operational drag.' },
// //             { title: 'AI solutions', img: 'ai.jpg', desc: 'Use analytics to gain insights and make smarter decisions.' }
// //           ].map((service, i) => (
// //             <div className="card hover-effect" key={i} data-aos="zoom-in">
// //               <img src={`/images/${service.img}`} alt={service.title} />
// //               <h3>{service.title}</h3>
// //               <p>{service.desc}</p>
// //               <a className="btn-outline" href="#">Learn more</a>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Capabilities Section */}
// //       <section className="grid-section section-divider" id="about" data-aos="fade-right">
// //         <h2>What We Offer</h2>
// //         <p className="section-subtitle">Solutions tailored for you</p>
// //         <div className="grid">
// //           {[
// //             'Workflow automation',
// //             'App & web development',
// //             'AI-powered features',
// //             'IT strategy consulting'
// //           ].map((item, i) => (
// //             <div className="grid-card" key={i} data-aos="fade-up">
// //               <h4>{item}</h4>
// //               <p>High-quality tailored service to support your business goals.</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* FAQ Section */}
// //       <section className="faq section-divider" id="faq" data-aos="fade-left">
// //         <h2>FAQs</h2>
// //         <p className="section-subtitle">Your questions, answered fast</p>
// //         {[
// //           ['What services do you provide?', 'We offer app and web development, automation, AI tools, and IT consulting.'],
// //           ['How can I begin a project?', 'Send us your project details. We\'ll guide you from start to finish.'],
// //           ['Can your solutions scale with us?', 'Yes, everything we build is scalable and designed to grow with you.'],
// //           ['How long does a project take?', 'Most projects finish in a few weeks with clear timelines and feedback loops.']
// //         ].map(([q, a], idx) => (
// //           <div className={`faq-item ${openFAQ === idx ? 'open' : ''}`} key={idx}>
// //             <div className="faq-header" onClick={() => toggleFAQ(idx)}>
// //               <h3>{q}</h3>
// //               <span className="faq-icon">{openFAQ === idx ? '−' : '+'}</span>
// //             </div>
// //             <div className="faq-body">
// //               <p>{a}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </section>

// //       {/* Footer */}
// //       <footer className="footer section-divider" id="contact" data-aos="fade-up">
// //         <h2>Let’s Connect</h2>
// //         <p><strong>Email:</strong> hello@neuromeshtechlab.com | <strong>Phone:</strong> +91-XXXXXXXXXX</p>
// //         <div className="socials">
// //           <a href="#">Blogs</a>
// //           <a href="#">Instagram</a>
// //           <a href="#">LinkedIn</a>
// //         </div>
// //       </footer>
// //     </main>
// //   );
// // }

// // export default App;
// import React, { useEffect, useState } from 'react';
// import './style.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { FaSun, FaMoon } from 'react-icons/fa';


// function App() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [openFAQ, setOpenFAQ] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);

//   useEffect(() => {
//     AOS.init({ duration: 1000, once: false });

//     // Set theme from localStorage
//     const theme = localStorage.getItem('theme');
//     if (theme === 'dark') setIsDarkMode(true);

//     // Scroll listener
//     const onScroll = () => {
//       setShowScrollTop(window.scrollY > 300);
//     };
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   useEffect(() => {
//     const slideCount = 4;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slideCount);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const toggleFAQ = (index) => {
//     setOpenFAQ(openFAQ === index ? null : index);
//   };

//   const toggleDarkMode = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     document.body.classList.toggle('dark-mode', newMode);
//     localStorage.setItem('theme', newMode ? 'dark' : 'light');
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <main>
//       {/* Navbar */}
//       <header className={`navbar ${isDarkMode ? 'dark' : ''}`}>
//         <div className="logo">
//           <img src="/images/logo.png" alt="NeuroMesh Logo" />
//         </div>
//         <nav>
//           <a href="#services">Services</a>
//           <a href="#about">About</a>
//           <a href="#faq">FAQ</a>
//           <a href="#contact" className="btn-primary">Get started</a>
//           <button className="toggle-theme" onClick={toggleDarkMode} title="Toggle Dark Mode">
//             {isDarkMode ? <FaSun /> : <FaMoon />}
//             <span className="theme-label">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
//           </button>
//         </nav>
//       </header>

//       {/* Hero Banner */}
//       <section className="hero-banner" id="hero">
//         <div className="slider">
//           {['hero1.jpg', 'hero2.jpg', 'hero3.jpg', 'hero4.jpg'].map((img, i) => (
//             <img
//               key={i}
//               src={`/images/${img}`}
//               alt={`Slide ${i + 1}`}
//               className={`slide ${i === currentSlide ? 'active' : ''}`}
//             />
//           ))}
//         </div>
//         <div className="hero-text" data-aos="fade-up">
//           <h1>Digital solutions for small business growth</h1>
//           <p>
//             App, web, automation, and AI services for SMEs. Streamline workflows and
//             scale with tailored technology built for your business.
//           </p>
//         </div>
//       </section>

//       {/* Services */}
//       <section className="services section-divider" id="services" data-aos="fade-up">
//         <h2>Our Services</h2>
//         <p className="section-subtitle">What we do best</p>
//         <div className="card-grid">
//           {[
//             { title: 'App development', img: 'dev.jpg', desc: 'Mobile and web app solutions tailored to your business.' },
//             { title: 'Automation', img: 'automation.jpg', desc: 'Automate routine workflows and reduce operational drag.' },
//             { title: 'AI solutions', img: 'ai.jpg', desc: 'Use analytics to gain insights and make smarter decisions.' }
//           ].map((service, i) => (
//             <div className="card hover-effect" key={i} data-aos="zoom-in">
//               <img src={`/images/${service.img}`} alt={service.title} />
//               <h3>{service.title}</h3>
//               <p>{service.desc}</p>
//               <a className="btn-outline" href="#">Learn more</a>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Capabilities */}
//       <section className="grid-section section-divider" id="about" data-aos="fade-right">
//         <h2>What We Offer</h2>
//         <p className="section-subtitle">Solutions tailored for you</p>
//         <div className="grid">
//           {[
//             'Workflow automation',
//             'App & web development',
//             'AI-powered features',
//             'IT strategy consulting'
//           ].map((item, i) => (
//             <div className="grid-card" key={i} data-aos="fade-up">
//               <h4>{item}</h4>
//               <p>High-quality tailored service to support your business goals.</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FAQ Accordion */}
//       <section className="faq section-divider" id="faq" data-aos="fade-left">
//         <h2>FAQs</h2>
//         <p className="section-subtitle">Your questions, answered fast</p>
//         {[
//           ['What services do you provide?', 'We offer app and web development, automation, AI tools, and IT consulting.'],
//           ['How can I begin a project?', 'Send us your project details. We\'ll guide you from start to finish.'],
//           ['Can your solutions scale with us?', 'Yes, everything we build is scalable and designed to grow with you.'],
//           ['How long does a project take?', 'Most projects finish in a few weeks with clear timelines and feedback loops.']
//         ].map(([q, a], idx) => (
//           <div className={`faq-item ${openFAQ === idx ? 'open' : ''}`} key={idx}>
//             <div className="faq-header" onClick={() => toggleFAQ(idx)}>
//               <h3>{q}</h3>
//               <span className="faq-icon">{openFAQ === idx ? '−' : '+'}</span>
//             </div>
//             <div className="faq-body"><p>{a}</p></div>
//           </div>
//         ))}
//       </section>

//       {/* Footer */}
//       <footer className="footer section-divider" id="contact" data-aos="fade-up">
//         <h2>Let’s Connect</h2>
//         <p><strong>Email:</strong> hello@neuromeshtechlab.com | <strong>Phone:</strong> +91-XXXXXXXXXX</p>
//         <div className="socials">
//           <a href="#">Blogs</a>
//           <a href="#">Instagram</a>
//           <a href="#">LinkedIn</a>
//         </div>
//       </footer>

//       {/* Back to Top Button */}
//       {showScrollTop && (
//         <button className="scroll-top" onClick={scrollToTop} aria-label="Back to top">↑</button>
//       )}
//     </main>
//   );
// }

// export default App;

// import React, { useEffect, useState } from 'react';
// import './style.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { FaSun, FaMoon } from 'react-icons/fa';

// function App() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [openFAQ, setOpenFAQ] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);

//   // Animation and scroll listeners
//   useEffect(() => {
//     AOS.init({ duration: 1000, once: false });

//     const theme = localStorage.getItem('theme');
//     if (theme === 'dark') setIsDarkMode(true);

//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 300);

//       const scrolled = window.scrollY;
//       const totalHeight = document.body.scrollHeight - window.innerHeight;
//       setScrollProgress((scrolled / totalHeight) * 100);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide(prev => (prev + 1) % 4);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const toggleFAQ = index => {
//     setOpenFAQ(openFAQ === index ? null : index);
//   };

//   const toggleDarkMode = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     document.body.classList.toggle('dark-mode', newMode);
//     localStorage.setItem('theme', newMode ? 'dark' : 'light');
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <main>
//       {/* Scroll Progress Bar */}
//       <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }} />

//       {/* Navbar */}
//       <header className={`navbar ${isDarkMode ? 'dark' : ''}`}>
//         <div className="logo">
//           <img src="/images/logo.png" alt="NeuroMesh Logo" />
//         </div>
//         <nav>
//           <a href="#services">Services</a>
//           <a href="#about">About</a>
//           <a href="#faq">FAQ</a>
//           <a href="#contact" className="btn-primary">Get started</a>
//           <button className="toggle-theme" onClick={toggleDarkMode}>
//             {isDarkMode ? <FaSun /> : <FaMoon />}
//           </button>
//         </nav>
//       </header>

//       {/* Hero Slideshow */}
//       <section className="hero-banner" id="hero">
//         <div className="slider">
//           {['hero1.jpg', 'hero2.jpg', 'hero3.jpg', 'hero4.jpg'].map((img, i) => (
//             <img
//               key={i}
//               src={`/images/${img}`}
//               alt={`Slide ${i + 1}`}
//               className={`slide ${i === currentSlide ? 'active' : ''}`}
//             />
//           ))}
//         </div>
//         <div className="hero-text" data-aos="fade-up">
//           <h1>Digital solutions for small business growth</h1>
//           <p>
//             App, web, automation, and AI services for SMEs. Streamline workflows and
//             scale with tailored technology built for your business.
//           </p>
//         </div>
//       </section>

//       {/* Services */}
//       <section className="services section-divider" id="services" data-aos="fade-up">
//         <h2>Our Services</h2>
//         <p className="section-subtitle">What we do best</p>
//         <div className="card-grid">
//           {[
//             { title: 'App development', img: 'dev.jpg', desc: 'Mobile and web app solutions tailored to your business.' },
//             { title: 'Automation', img: 'automation.jpg', desc: 'Automate routine workflows and reduce operational drag.' },
//             { title: 'AI solutions', img: 'ai.jpg', desc: 'Use analytics to gain insights and make smarter decisions.' }
//           ].map((service, i) => (
//             <div className="card hover-3d" key={i} data-aos="zoom-in">
//               <img src={`/images/${service.img}`} alt={service.title} />
//               <h3>{service.title}</h3>
//               <p>{service.desc}</p>
//               <a className="btn-outline" href="#">Learn more</a>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Capabilities */}
//       <section className="grid-section section-divider" id="about" data-aos="fade-right">
//         <h2>What We Offer</h2>
//         <p className="section-subtitle">Solutions tailored for you</p>
//         <div className="grid">
//           {[
//             'Workflow automation',
//             'App & web development',
//             'AI-powered features',
//             'IT strategy consulting'
//           ].map((item, i) => (
//             <div className="grid-card hover-3d" key={i} data-aos="fade-up">
//               <h4>{item}</h4>
//               <p>High-quality tailored service to support your business goals.</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FAQ Accordion */}
//       <section className="faq section-divider" id="faq" data-aos="fade-left">
//         <h2>FAQs</h2>
//         <p className="section-subtitle">Your questions, answered fast</p>
//         {[
//           ['What services do you provide?', 'We offer app and web development, automation, AI tools, and IT consulting.'],
//           ['How can I begin a project?', 'Send us your project details. We\'ll guide you from start to finish.'],
//           ['Can your solutions scale with us?', 'Yes, everything we build is scalable and designed to grow with you.'],
//           ['How long does a project take?', 'Most projects finish in a few weeks with clear timelines and feedback loops.']
//         ].map(([q, a], idx) => (
//           <div className={`faq-item ${openFAQ === idx ? 'open' : ''}`} key={idx}>
//             <div className="faq-header" onClick={() => toggleFAQ(idx)}>
//               <h3>{q}</h3>
//               <span className="faq-icon">{openFAQ === idx ? '−' : '+'}</span>
//             </div>
//             <div className="faq-body"><p>{a}</p></div>
//           </div>
//         ))}
//       </section>

//       {/* Footer */}
//       <footer className="footer section-divider" id="contact" data-aos="fade-up">
//         <h2>Let’s Connect</h2>
//         <p><strong>Email:</strong> hello@neuromeshtechlab.com | <strong>Phone:</strong> +91-XXXXXXXXXX</p>
//         <div className="socials">
//           <a href="#">Blogs</a>
//           <a href="#">Instagram</a>
//           <a href="#">LinkedIn</a>
//         </div>
//       </footer>

//       {/* Back to Top Button */}
//       {showScrollTop && (
//         <button className="scroll-top" onClick={scrollToTop} aria-label="Back to top">↑</button>
//       )}
//     </main>
//   );
// }

// export default App;
