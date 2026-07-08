import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const particlesRef = useRef(null);

  useEffect(() => {
    // Floating particles
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      speed: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.5 ? '#FFD700' : '#FF6700'
    }));

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y -= p.speed;
        p.x += Math.sin(p.y * 0.01) * 0.3;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="home">
      <canvas ref={particlesRef} className="particles-canvas" />

      {/* Decorative top border - Indian flag tricolor */}
      <div className="flag-stripe-top">
        <div className="stripe saffron-stripe" />
        <div className="stripe white-stripe">
          <div className="chakra-mini">⊕</div>
        </div>
        <div className="stripe green-stripe" />
      </div>

      {/* Main Hero */}
      <div className="hero-content">
        {/* Mandala decoration */}
        <div className="mandala-left">✦ ✧ ✦</div>
        <div className="mandala-right">✦ ✧ ✦</div>

        {/* Sanskrit greeting */}
        <div className="sanskrit-line" lang="sa">
          सत्यमेव जयते — Satyameva Jayate
        </div>

        {/* Main Title */}
        <div className="hero-emblem">🇮🇳</div>
        <h1 className="hero-title">
          <span className="hindi-title">भारत</span>
          <span className="hero-subtitle-text">INDIA</span>
        </h1>
        <p className="hero-tagline">Heritage · Culture · Civilisation</p>

        <div className="ornament-line">
          <span>❋</span>
          <div className="ornament-dash" />
          <span>🪔</span>
          <div className="ornament-dash" />
          <span>❋</span>
        </div>

        {/* Description */}
        <p className="hero-description">
          Embark on a journey through <strong>5,000 years</strong> of unbroken civilisation —
          where ancient wisdom meets living tradition, where every river carries a story,
          and every stone sings of a glorious past.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta">
          <button
            className="cta-btn cta-states"
            onClick={() => navigate('/states')}
          >
            <span className="cta-icon">🗺️</span>
            <div className="cta-text">
              <span className="cta-label">Explore</span>
              <span className="cta-title">States of India</span>
            </div>
          </button>

          <button
            className="cta-btn cta-blog"
            onClick={() => navigate('/blog')}
          >
            <span className="cta-icon">✍️</span>
            <div className="cta-text">
              <span className="cta-label">Read & Share</span>
              <span className="cta-title">Cultural Blog</span>
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">28</div>
            <div className="stat-label">States</div>
          </div>
          <div className="stat-divider">|</div>
          <div className="stat">
            <div className="stat-number">40+</div>
            <div className="stat-label">UNESCO Sites</div>
          </div>
          <div className="stat-divider">|</div>
          <div className="stat">
            <div className="stat-number">1600+</div>
            <div className="stat-label">Dialects</div>
          </div>
          <div className="stat-divider">|</div>
          <div className="stat">
            <div className="stat-number">5000+</div>
            <div className="stat-label">Years of History</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-dot" />
        <div className="scroll-line" />
      </div>

      {/* Featured section */}
      <div className="featured-section">
        <div className="featured-inner">
          <h2 className="featured-title">The Eternal Land</h2>
          <p className="featured-desc">
            India is not just a country — it is a civilisation. From the Himalayas to the Indian Ocean,
            from the Thar Desert to the rainforests of the Northeast, India holds within it more diversity
            than most continents. Explore sacred rivers, ancient temples, royal fortresses, classical arts,
            and the living traditions of a billion souls.
          </p>

          <div className="culture-grid">
            {[
              { icon: '🕌', title: 'Architecture', desc: 'Mughal, Dravidian, Rajput masterpieces' },
              { icon: '💃', title: 'Classical Dance', desc: '8 recognized classical dance forms' },
              { icon: '🎵', title: 'Music', desc: 'Hindustani & Carnatic traditions' },
              { icon: '🍛', title: 'Cuisine', desc: '7,500+ regional dishes and flavors' },
              { icon: '🎨', title: 'Visual Arts', desc: 'Pattachitra, Tanjore, Madhubani' },
              { icon: '🧘', title: 'Philosophy', desc: 'Yoga, Ayurveda, 6 Darshanas' },
            ].map((item, i) => (
              <div className="culture-card" key={i}>
                <div className="culture-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
