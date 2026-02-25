import React, { useEffect, useState } from "react";

const styles = `
  .projects-hero {
    position: relative;
    height: 52vh;
    min-height: 420px;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    background: #030507;
  }
  .projects-hero-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to bottom, rgba(3,5,7,0.3) 0%, rgba(3,5,7,0.75) 70%, rgba(3,5,7,1) 100%),
      url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1900&q=85&fit=crop');
    background-size: cover;
    background-position: center 40%;
    transition: transform 2.2s cubic-bezier(0.16,1,0.3,1), opacity 1.8s ease;
  }
  .projects-hero-bg.loading { transform: scale(1.07); opacity: 0; }
  .projects-hero-bg.loaded  { transform: scale(1); opacity: 1; }

  .projects-hero-noise {
    position: absolute;
    inset: 0;
    opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  .projects-hero-content {
    position: relative;
    z-index: 2;
    max-width: 1380px;
    margin: 0 auto;
    width: 100%;
    padding: 0 60px 70px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1s ease 0.5s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.5s;
  }
  .projects-hero-content.loaded {
    opacity: 1;
    transform: translateY(0);
  }

  .projects-hero-label {
    font-family: 'Raleway', sans-serif;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 7px;
    text-transform: uppercase;
    color: #B8975A;
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 18px;
  }
  .projects-hero-label::before {
    content: '';
    width: 32px; height: 1px;
    background: #B8975A;
  }

  .projects-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(40px, 6vw, 80px);
    font-weight: 300;
    color: #F0EAE0;
    line-height: 1;
    letter-spacing: -1px;
    margin: 0;
  }
  .projects-hero-title em {
    font-style: italic;
    color: #C4A464;
  }

  .projects-hero-rule {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,151,90,0.25), transparent);
  }

  @media (max-width: 640px) {
    .projects-hero-content { padding: 0 24px 50px; }
  }
`;

export default function ProjectsHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);
  const cls = loaded ? "loaded" : "loading";

  return (
    <>
      <style>{styles}</style>
      <div className="projects-hero">
        <div className={`projects-hero-bg ${cls}`} />
        <div className="projects-hero-noise" />
        <div className={`projects-hero-content ${cls}`}>
          <p className="projects-hero-label">Portfolio</p>
          <h1 className="projects-hero-title">
            Innovative <em>3D Projects</em>
          </h1>
        </div>
        <div className="projects-hero-rule" />
      </div>
    </>
  );
}
