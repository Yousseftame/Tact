import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cormorant+SC:wght@300;400&family=EB+Garamond:ital,wght@0,400;1,400&family=Raleway:wght@300;400;500;600;700&display=swap');

  .nf-page {
    background: #04070A;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  /* Noise grain */
  .nf-noise {
    position: absolute; inset: 0;
    opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  /* Giant ghost 404 */
  .nf-ghost {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(180px, 28vw, 380px);
    font-weight: 300;
    font-style: italic;
    color: rgba(184,151,90,0.04);
    line-height: 1;
    letter-spacing: -10px;
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 1.4s ease 0.2s;
  }
  .nf-ghost.visible { opacity: 1; }

  /* Ambient glow center */
  .nf-glow {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 700px; height: 500px;
    background: radial-gradient(ellipse, rgba(184,151,90,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Top-left corner bracket */
  .nf-corner-tl {
    position: absolute;
    top: 40px; left: 48px;
    width: 48px; height: 48px;
    border-top: 1px solid rgba(184,151,90,0.3);
    border-left: 1px solid rgba(184,151,90,0.3);
    opacity: 0;
    transition: opacity 0.8s ease 0.5s;
  }
  /* Bottom-right corner bracket */
  .nf-corner-br {
    position: absolute;
    bottom: 40px; right: 48px;
    width: 48px; height: 48px;
    border-bottom: 1px solid rgba(184,151,90,0.3);
    border-right: 1px solid rgba(184,151,90,0.3);
    opacity: 0;
    transition: opacity 0.8s ease 0.7s;
  }
  .nf-corner-tl.visible,
  .nf-corner-br.visible { opacity: 1; }

  /* Vertical rule left */
  .nf-vrule {
    position: absolute;
    left: 48px; top: 50%;
    transform: translateY(-50%);
    width: 1px; height: 0;
    background: linear-gradient(to bottom, transparent, rgba(184,151,90,0.25), transparent);
    transition: height 1.2s cubic-bezier(0.16,1,0.3,1) 0.6s;
  }
  .nf-vrule.visible { height: 200px; }

  /* Main content */
  .nf-content {
    position: relative; z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 24px;
  }

  /* Eyebrow */
  .nf-eyebrow {
    font-family: 'Raleway', sans-serif;
    font-size: 9px; font-weight: 600;
    letter-spacing: 8px; text-transform: uppercase;
    color: #B8975A;
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 32px;
    opacity: 0; transform: translateY(10px);
    transition: opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s;
  }
  .nf-eyebrow::before,
  .nf-eyebrow::after {
    content: ''; height: 1px; width: 28px;
    background: linear-gradient(90deg, transparent, #B8975A);
    flex-shrink: 0;
  }
  .nf-eyebrow::after {
    background: linear-gradient(90deg, #B8975A, transparent);
  }
  .nf-eyebrow.visible { opacity: 1; transform: translateY(0); }

  /* 404 number */
  .nf-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(80px, 14vw, 160px);
    font-weight: 300;
    line-height: 1;
    letter-spacing: -4px;
    margin: 0 0 8px 0;
    opacity: 0; transform: translateY(20px);
    transition: opacity 1s ease 0.55s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.55s;
  }
  .nf-number .nf-num-plain { color: #F0EAE0; }
  .nf-number .nf-num-gold  { font-style: italic; color: #C4A464; }
  .nf-number.visible { opacity: 1; transform: translateY(0); }

  /* Ornament */
  .nf-ornament {
    display: flex; align-items: center; gap: 14px;
    margin: 24px 0 28px;
    opacity: 0;
    transition: opacity 0.8s ease 0.75s;
  }
  .nf-ornament-line {
    width: 52px; height: 1px;
    background: linear-gradient(90deg, transparent, #B8975A);
  }
  .nf-ornament-line-r {
    width: 52px; height: 1px;
    background: linear-gradient(90deg, #B8975A, transparent);
  }
  .nf-ornament-diamond {
    width: 5px; height: 5px;
    background: #B8975A;
    transform: rotate(45deg); flex-shrink: 0;
  }
  .nf-ornament.visible { opacity: 1; }

  /* Headline */
  .nf-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(22px, 3vw, 38px);
    font-weight: 300;
    color: #F0EAE0;
    line-height: 1.2;
    margin: 0 0 16px 0;
    opacity: 0; transform: translateY(14px);
    transition: opacity 0.9s ease 0.85s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.85s;
  }
  .nf-headline em { font-style: italic; color: #C4A464; }
  .nf-headline.visible { opacity: 1; transform: translateY(0); }

  /* Subtitle */
  .nf-sub {
    font-family: 'EB Garamond', serif;
    font-size: clamp(15px, 1.3vw, 17px);
    font-style: italic;
    color: rgba(240,234,224,0.42);
    line-height: 1.9;
    max-width: 420px;
    margin: 0 0 48px 0;
    opacity: 0;
    transition: opacity 0.9s ease 1s;
  }
  .nf-sub.visible { opacity: 1; }

  /* CTA button — pill style matching navbar */
  .nf-cta {
    font-family: 'Raleway', sans-serif;
    font-size: 9px; font-weight: 700;
    letter-spacing: 3.5px; text-transform: uppercase;
    color: #05080A;
    text-decoration: none;
    padding: 14px 36px 14px 28px;
    background: #B8975A;
    border-radius: 100px;
    display: inline-flex; align-items: center; gap: 10px;
    opacity: 0; transform: translateY(10px);
    transition: opacity 0.8s ease 1.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 1.1s,
                background 0.25s ease;
  }
  .nf-cta.visible { opacity: 1; transform: translateY(0); }
  .nf-cta:hover { background: #C9A96E; }
  .nf-cta-icon {
    font-size: 14px; line-height: 1; flex-shrink: 0;
    transition: transform 0.3s ease;
  }
  .nf-cta:hover .nf-cta-icon { transform: rotate(15deg); }

  /* Secondary link */
  .nf-back {
    margin-top: 20px;
    font-family: 'Raleway', sans-serif;
    font-size: 9px; font-weight: 500;
    letter-spacing: 4px; text-transform: uppercase;
    color: rgba(184,151,90,0.45);
    text-decoration: none;
    display: inline-flex; align-items: center; gap: 8px;
    opacity: 0;
    transition: opacity 0.8s ease 1.25s, color 0.3s ease;
    cursor: pointer;
    background: none; border: none; padding: 0;
  }
  .nf-back.visible { opacity: 1; }
  .nf-back:hover { color: #B8975A; }
  .nf-back svg {
    width: 12px; height: 12px;
    stroke: currentColor; stroke-width: 1.5; fill: none;
    transition: transform 0.3s ease;
  }
  .nf-back:hover svg { transform: translateX(-3px); }

  @media (max-width: 640px) {
    .nf-corner-tl,
    .nf-corner-br,
    .nf-vrule { display: none; }
    .nf-number { letter-spacing: -2px; }
  }
`;

export default function NotFound() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const cls = visible ? "visible" : "";

  return (
    <>
      <style>{styles}</style>
      <div className="nf-page">
        <div className="nf-noise" />
        <div className="nf-glow" />

        {/* Ghost number background */}
        <div className={`nf-ghost ${cls}`} aria-hidden="true">
          404
        </div>

        {/* Corner accents */}
        <div className={`nf-corner-tl ${cls}`} />
        <div className={`nf-corner-br ${cls}`} />
        <div className={`nf-vrule ${cls}`} />

        {/* Content */}
        <div className="nf-content">
          <p className={`nf-eyebrow ${cls}`}>Error</p>

          <h1 className={`nf-number ${cls}`}>
            <span className="nf-num-plain">4</span>
            <span className="nf-num-gold">0</span>
            <span className="nf-num-plain">4</span>
          </h1>

          <div className={`nf-ornament ${cls}`}>
            <div className="nf-ornament-line" />
            <div className="nf-ornament-diamond" />
            <div className="nf-ornament-line-r" />
          </div>

          <h2 className={`nf-headline ${cls}`}>
            Page <em>Not Found</em>
          </h2>

          <p className={`nf-sub ${cls}`}>
            The page you are looking for may have been moved, renamed, or does
            not exist. Let us guide you back.
          </p>

          <Link to="/" className={`nf-cta ${cls}`}>
            <span className="nf-cta-icon">✦</span>
            Return Home
          </Link>

          <button
            className={`nf-back ${cls}`}
            onClick={() => window.history.back()}
          >
            <svg viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}
