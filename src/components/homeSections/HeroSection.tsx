import React, { useEffect, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cormorant+SC:wght@300;400&family=EB+Garamond:ital,wght@0,400;1,400&display=swap');

  .hero {
    position: relative;
    height: 100vh;
    min-height: 760px;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: #05080A;
  }

  /* Background photo */
  .hero-bg {
    position: absolute;
    inset: 0;
    background-image: url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1900&q=90&fit=crop&crop=center');
    background-size: cover;
    background-position: center 40%;
    transform-origin: center;
    transition: transform 2.4s cubic-bezier(0.16, 1, 0.3, 1),
                opacity 2s ease;
  }
  .hero-bg.loading { transform: scale(1.09); opacity: 0; }
  .hero-bg.loaded  { transform: scale(1);    opacity: 1; }

  /* Layered gradient overlays for depth */
  .hero-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(105deg,
        rgba(3,5,7,0.96) 0%,
        rgba(3,5,7,0.78) 40%,
        rgba(3,5,7,0.30) 70%,
        rgba(3,5,7,0.15) 100%),
      linear-gradient(to bottom,
        rgba(3,5,7,0.55) 0%,
        transparent 50%,
        rgba(3,5,7,0.85) 100%);
  }

  /* Subtle gold grain texture */
  .hero-noise {
    position: absolute;
    inset: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  /* Vertical gold rule on far left */
  .hero-side-rule {
    position: absolute;
    left: 56px;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 0;
    background: linear-gradient(to bottom, transparent, #B8975A, transparent);
    transition: height 1.4s cubic-bezier(0.16,1,0.3,1) 0.8s;
    z-index: 3;
  }
  .hero-side-rule.loaded { height: 220px; }

  /* Main content */
  .hero-content {
    position: relative;
    z-index: 4;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 100px 0 110px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 80px;
  }

  .hero-left {}
  .hero-right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 10px;
  }

  /* Eyebrow */
  .hero-eyebrow {
    font-family: 'Cormorant SC', serif;
    font-size: 9.5px;
    font-weight: 300;
    letter-spacing: 8px;
    text-transform: uppercase;
    color: #B8975A;
    margin-bottom: 28px;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.9s ease 0.6s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s;
  }
  .hero-eyebrow.loaded { opacity: 1; transform: translateY(0); }

  /* Main headline */
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 7vw, 100px);
    font-weight: 300;
    line-height: 0.95;
    color: #F0EAE0;
    letter-spacing: -1px;
    margin: 0 0 36px 0;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1.1s ease 0.75s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.75s;
  }
  .hero-title.loaded { opacity: 1; transform: translateY(0); }

  .hero-title .line-italic {
    font-style: italic;
    color: #C4A464;
    display: block;
    font-weight: 300;
  }
  .hero-title .line-normal {
    display: block;
  }

  /* Decorative ornament */
  .hero-ornament {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 40px;
    opacity: 0;
    transition: opacity 1s ease 1s;
  }
  .hero-ornament.loaded { opacity: 1; }
  .hero-ornament-line {
    height: 1px;
    width: 50px;
    background: linear-gradient(90deg, #B8975A, rgba(184,151,90,0.15));
  }
  .hero-ornament-diamond {
    width: 5px; height: 5px;
    background: #B8975A;
    transform: rotate(45deg);
    flex-shrink: 0;
  }
  .hero-ornament-line-right {
    height: 1px;
    width: 30px;
    background: linear-gradient(90deg, rgba(184,151,90,0.4), transparent);
  }

  /* Right column — established badge */
  .hero-badge {
    font-family: 'Cormorant SC', serif;
    font-size: 9px;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: rgba(184,151,90,0.55);
    border: 1px solid rgba(184,151,90,0.2);
    padding: 10px 20px;
    margin-bottom: 48px;
    opacity: 0;
    transition: opacity 1s ease 1.1s;
  }
  .hero-badge.loaded { opacity: 1; }

  /* Quote block on right */
  .hero-quote-block {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 1s ease 1.2s, transform 1s cubic-bezier(0.16,1,0.3,1) 1.2s;
  }
  .hero-quote-block.loaded { opacity: 1; transform: translateY(0); }

  .hero-quote-mark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 72px;
    line-height: 1;
    color: rgba(184,151,90,0.2);
    margin-bottom: -10px;
    display: block;
  }

  .hero-quote {
    font-family: 'EB Garamond', serif;
    font-size: clamp(15px, 1.3vw, 17px);
    font-style: italic;
    font-weight: 400;
    color: rgba(240,234,224,0.58);
    line-height: 2;
    max-width: 420px;
    margin: 0 0 30px 0;
  }

  .hero-cite {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .hero-cite-line {
    width: 28px; height: 1px;
    background: #B8975A;
    flex-shrink: 0;
  }
  .hero-cite-text {
    font-family: 'Cormorant SC', serif;
    font-size: 9px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #B8975A;
  }

  /* Scroll indicator bottom center */
  .hero-scroll {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    opacity: 0;
    animation: fadeInScroll 1s ease 2s forwards;
  }
  @keyframes fadeInScroll {
    to { opacity: 1; }
  }
  .hero-scroll-text {
    font-family: 'Cormorant SC', serif;
    font-size: 8px;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: rgba(184,151,90,0.5);
  }
  .hero-scroll-line {
    width: 1px;
    height: 52px;
    background: linear-gradient(to bottom, rgba(184,151,90,0.7), transparent);
    animation: scrollDrop 2s ease-in-out infinite;
  }
  @keyframes scrollDrop {
    0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
    60%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
    100% { transform: scaleY(1); transform-origin: top; opacity: 0; }
  }

  /* Corner accent */
  .hero-corner {
    position: absolute;
    top: 50px; right: 55px;
    z-index: 4;
    opacity: 0;
    transition: opacity 1s ease 1.5s;
  }
  .hero-corner.loaded { opacity: 1; }
  .hero-corner svg {
    width: 60px; height: 60px;
  }

  @media (max-width: 900px) {
    .hero-content {
      grid-template-columns: 1fr;
      padding: 0 32px;
      gap: 40px;
    }
    .hero-right { display: none; }
    .hero-side-rule { display: none; }
    .hero-title { font-size: clamp(48px, 11vw, 72px); }
  }
`;

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);
  const cls = loaded ? "loaded" : "loading";

  return (
    <>
      <style>{styles}</style>
      <section className="hero">
        {/* Backgrounds */}
        <div className={`hero-bg ${cls}`} />
        <div className="hero-overlay" />
        <div className="hero-noise" />

        {/* Left vertical rule */}
        <div className={`hero-side-rule ${cls}`} />

        {/* Corner ornament */}
        <div className={`hero-corner ${cls}`}>
          <svg viewBox="0 0 60 60" fill="none">
            <path
              d="M1 1 H30"
              stroke="#B8975A"
              strokeWidth="0.6"
              opacity="0.6"
            />
            <path
              d="M1 1 V30"
              stroke="#B8975A"
              strokeWidth="0.6"
              opacity="0.6"
            />
            <circle cx="1" cy="1" r="2" fill="#B8975A" opacity="0.5" />
          </svg>
        </div>

        {/* Main content grid */}
        <div className="hero-content">
          {/* LEFT: Brand + Title */}
          <div className="hero-left">
            <p className={`hero-eyebrow ${cls}`}>
              Est. 2025 &nbsp;·&nbsp; Cairo, Egypt
            </p>

            <h1 className={`hero-title ${cls}`}>
              <span className="line-normal">Tact</span>
              <span className="line-italic">Innovations</span>
            </h1>

            <div className={`hero-ornament ${cls}`}>
              <div className="hero-ornament-line" />
              <div className="hero-ornament-diamond" />
              <div className="hero-ornament-line-right" />
            </div>
          </div>

          {/* RIGHT: Quote */}
          <div className="hero-right">
            <div className={`hero-badge ${cls}`}>
              Design &amp; General Contracting
            </div>

            <div className={`hero-quote-block ${cls}`}>
              <span className="hero-quote-mark">"</span>
              <p className="hero-quote">
                We shape the future of living spaces through innovative,
                sustainable, and aesthetic architecture — delivering exceptional
                residential, commercial, and urban projects with creativity and
                precision. We don't just build structures; we create lasting
                legacies.
              </p>
              <div className="hero-cite">
                <div className="hero-cite-line" />
                <span className="hero-cite-text">
                  Chairman, Tact Innovations
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <span className="hero-scroll-text">Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>
    </>
  );
}
