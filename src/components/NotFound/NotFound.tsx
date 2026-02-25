import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cormorant+SC:wght@300;400&family=EB+Garamond:ital,wght@0,400;1,400&display=swap');

  /* ─── Page shell ─── */
  .nf-page {
    background: #03050A;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    font-family: 'Cormorant Garamond', serif;
  }

  /* ── Noise grain ── */
  .nf-noise {
    position: absolute; inset: 0;
    opacity: 0.022;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0;
  }

  /* ── Cinematic horizontal lines ── */
  .nf-hline {
    position: absolute;
    left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(184,151,90,0.08) 30%, rgba(184,151,90,0.14) 50%, rgba(184,151,90,0.08) 70%, transparent 100%);
    opacity: 0;
    transition: opacity 1.2s ease;
  }
  .nf-hline.top    { top: 18%; }
  .nf-hline.bottom { bottom: 18%; }
  .nf-hline.visible { opacity: 1; }

  /* ── Vertical side rules ── */
  .nf-vrule {
    position: absolute;
    top: 50%; transform: translateY(-50%);
    width: 1px; height: 0;
    background: linear-gradient(to bottom, transparent, rgba(184,151,90,0.2), transparent);
    transition: height 1.6s cubic-bezier(0.16,1,0.3,1) 0.3s;
    z-index: 1;
  }
  .nf-vrule.left  { left: 52px; }
  .nf-vrule.right { right: 52px; }
  .nf-vrule.visible { height: 260px; }

  /* ── Corner brackets ── */
  .nf-bracket {
    position: absolute;
    width: 44px; height: 44px;
    opacity: 0;
    transition: opacity 0.9s ease 0.6s;
    z-index: 1;
  }
  .nf-bracket.tl { top: 36px; left: 44px; border-top: 1px solid rgba(184,151,90,0.28); border-left: 1px solid rgba(184,151,90,0.28); }
  .nf-bracket.tr { top: 36px; right: 44px; border-top: 1px solid rgba(184,151,90,0.28); border-right: 1px solid rgba(184,151,90,0.28); }
  .nf-bracket.bl { bottom: 36px; left: 44px; border-bottom: 1px solid rgba(184,151,90,0.28); border-left: 1px solid rgba(184,151,90,0.28); }
  .nf-bracket.br { bottom: 36px; right: 44px; border-bottom: 1px solid rgba(184,151,90,0.28); border-right: 1px solid rgba(184,151,90,0.28); }
  .nf-bracket.visible { opacity: 1; }

  /* ── Ambient glow ── */
  .nf-glow {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 800px; height: 600px;
    background: radial-gradient(ellipse, rgba(184,151,90,0.055) 0%, transparent 65%);
    pointer-events: none; z-index: 0;
  }

  /* ── Enormous ghost text ── */
  .nf-ghost-wrap {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none; user-select: none;
    z-index: 0;
    overflow: hidden;
  }
  .nf-ghost {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(240px, 38vw, 520px);
    font-weight: 300;
    font-style: italic;
    color: transparent;
    -webkit-text-stroke: 1px rgba(184,151,90,0.055);
    line-height: 0.85;
    letter-spacing: -16px;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(30px) scale(0.97);
    transition: opacity 2s ease 0.1s, transform 2.4s cubic-bezier(0.16,1,0.3,1) 0.1s;
  }
  .nf-ghost.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  /* ── Main content ── */
  .nf-content {
    position: relative; z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 32px;
    max-width: 680px;
  }

  /* ── Eyebrow ── */
  .nf-eyebrow {
    font-family: 'Cormorant SC', serif;
    font-size: 9px;
    letter-spacing: 10px;
    text-transform: uppercase;
    color: rgba(184,151,90,0.6);
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 48px;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.9s ease 0.5s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s;
  }
  .nf-eyebrow::before,
  .nf-eyebrow::after {
    content: '';
    display: block;
    height: 1px;
    width: 40px;
    background: linear-gradient(90deg, transparent, rgba(184,151,90,0.5));
    flex-shrink: 0;
  }
  .nf-eyebrow::after {
    background: linear-gradient(90deg, rgba(184,151,90,0.5), transparent);
  }
  .nf-eyebrow.visible { opacity: 1; transform: translateY(0); }

  /* ── 404 numerals — staggered ── */
  .nf-numerals {
    display: flex;
    align-items: baseline;
    gap: 0;
    margin: 0 0 0 0;
    line-height: 1;
  }

  .nf-digit {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(90px, 16vw, 200px);
    font-weight: 300;
    line-height: 0.9;
    letter-spacing: -6px;
    color: #F0EAE0;
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1);
  }
  .nf-digit.gold {
    font-style: italic;
    color: transparent;
    -webkit-text-stroke: 1px #C4A464;
  }
  .nf-digit.d1 { transition-delay: 0.6s; }
  .nf-digit.d2 { transition-delay: 0.75s; }
  .nf-digit.d3 { transition-delay: 0.9s; }
  .nf-digit.visible { opacity: 1; transform: translateY(0); }

  /* ── Ornament ── */
  .nf-ornament {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 40px 0 36px;
    opacity: 0;
    transition: opacity 0.9s ease 1.05s;
  }
  .nf-orn-line {
    width: 60px; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,151,90,0.45));
  }
  .nf-orn-line.r {
    background: linear-gradient(90deg, rgba(184,151,90,0.45), transparent);
  }
  .nf-orn-diamond {
    width: 5px; height: 5px;
    background: #B8975A;
    transform: rotate(45deg);
    flex-shrink: 0;
  }
  .nf-ornament.visible { opacity: 1; }

  /* ── Headline ── */
  .nf-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(26px, 3.5vw, 44px);
    font-weight: 300;
    color: #F0EAE0;
    line-height: 1.15;
    margin: 0 0 20px;
    letter-spacing: -0.3px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.9s ease 1.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 1.1s;
  }
  .nf-headline em { font-style: italic; color: #C4A464; }
  .nf-headline.visible { opacity: 1; transform: translateY(0); }

  /* ── Subtext ── */
  .nf-sub {
    font-family: 'EB Garamond', serif;
    font-size: clamp(15px, 1.3vw, 17.5px);
    font-style: italic;
    line-height: 2;
    color: rgba(240,234,224,0.38);
    max-width: 400px;
    margin: 0 0 56px;
    opacity: 0;
    transition: opacity 0.9s ease 1.25s;
  }
  .nf-sub.visible { opacity: 1; }

  /* ── Actions ── */
  .nf-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  /* Primary CTA */
  .nf-cta {
    font-family: '', serif;
    font-size: 9.5px;
    font-weight: 400;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #05080A;
    text-decoration: none;
    padding: 16px 44px;
    background: linear-gradient(135deg, #C4A464 0%, #B8975A 100%);
    display: inline-flex;
    align-items: center;
    gap: 14px;
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(12px);
    transition:
      opacity 0.8s ease 1.35s,
      transform 0.8s cubic-bezier(0.16,1,0.3,1) 1.35s,
      filter 0.3s ease;
  }
  .nf-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .nf-cta:hover::before { opacity: 1; }
  .nf-cta:hover { filter: brightness(1.08); }
  .nf-cta.visible { opacity: 1; transform: translateY(0); }

  .nf-cta-line {
    width: 20px; height: 1px;
    background: rgba(5,8,10,0.5);
    transition: width 0.35s ease;
  }
  .nf-cta:hover .nf-cta-line { width: 32px; }

  /* Secondary back link */
  .nf-back {
    font-family: '', serif;
    font-size: 8.5px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: rgba(184,151,90,0.4);
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 4px 0;
    position: relative;
    opacity: 0;
    transition: opacity 0.8s ease 1.5s, color 0.3s ease;
  }
  .nf-back::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1px;
    background: rgba(184,151,90,0.4);
    transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .nf-back:hover::after { width: 100%; }
  .nf-back:hover { color: rgba(184,151,90,0.7); }
  .nf-back.visible { opacity: 1; }

  .nf-back-arrow {
    display: block;
    width: 18px; height: 1px;
    background: currentColor;
    position: relative;
    transition: transform 0.3s ease;
  }
  .nf-back-arrow::before {
    content: '';
    position: absolute;
    left: 0; top: -3px;
    width: 6px; height: 6px;
    border-left: 1px solid currentColor;
    border-bottom: 1px solid currentColor;
    transform: rotate(45deg);
  }
  .nf-back:hover .nf-back-arrow { transform: translateX(-5px); }

  /* ── Tact branding watermark bottom center ── */
  .nf-brand {
    position: absolute;
    bottom: 36px; left: 50%;
    transform: translateX(-50%);
    font-family: 'Cormorant SC', serif;
    font-size: 8px;
    letter-spacing: 8px;
    color: rgba(184,151,90,0.18);
    text-transform: uppercase;
    white-space: nowrap;
    z-index: 2;
    opacity: 0;
    transition: opacity 1s ease 1.6s;
  }
  .nf-brand.visible { opacity: 1; }

  @media (max-width: 640px) {
    .nf-vrule,
    .nf-bracket.tr,
    .nf-bracket.bl { display: none; }
    .nf-digit { letter-spacing: -3px; }
    .nf-ghost { letter-spacing: -8px; }
    .nf-actions { width: 100%; }
    .nf-cta { justify-content: center; width: 100%; max-width: 280px; }
  }
`;

export default function NotFound() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const v = visible ? "visible" : "";

  return (
    <>
      <style>{styles}</style>
      <div className="nf-page">
        {/* Atmosphere */}
        <div className="nf-noise" />
        <div className="nf-glow" />

        {/* Horizontal cinematic lines */}
        <div className={`nf-hline top ${v}`} />
        <div className={`nf-hline bottom ${v}`} />

        {/* Vertical rules */}
        <div className={`nf-vrule left ${v}`} />
        <div className={`nf-vrule right ${v}`} />

        {/* Corner brackets */}
        <div className={`nf-bracket tl ${v}`} />
        <div className={`nf-bracket tr ${v}`} />
        <div className={`nf-bracket bl ${v}`} />
        <div className={`nf-bracket br ${v}`} />

        {/* Giant ghost numerals */}
        <div className="nf-ghost-wrap">
          <div className={`nf-ghost ${v}`} aria-hidden="true">
            404
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="nf-content">
          <p className={`nf-eyebrow ${v}`}>Tact Innovations</p>

          {/* Staggered 404 digits */}
          <div className="nf-numerals" role="heading" aria-label="404">
            <span className={`nf-digit d1 ${v}`}>4</span>
            <span className={`nf-digit gold d2 ${v}`}>0</span>
            <span className={`nf-digit d3 ${v}`}>4</span>
          </div>

          {/* Ornament */}
          <div className={`nf-ornament ${v}`}>
            <div className="nf-orn-line" />
            <div className="nf-orn-diamond" />
            <div className="nf-orn-line r" />
          </div>

          {/* Headline */}
          <h1 className={`nf-headline ${v}`}>
            This Page <em>Does Not Exist</em>
          </h1>

          {/* Subtext */}
          <p className={`nf-sub ${v}`}>
            The page you are seeking may have been moved, renamed, or perhaps it
            never existed. Allow us to guide you back.
          </p>

          {/* Actions */}
          <div className="nf-actions">
            <Link to="/" className={`nf-cta ${v}`}>
              <div className="nf-cta-line" />
              Return Home
              <div className="nf-cta-line" />
            </Link>

            <button
              className={`nf-back ${v}`}
              onClick={() => window.history.back()}
            >
              <span className="nf-back-arrow" />
              Go Back
            </button>
          </div>
        </div>

        {/* Brand watermark */}
        <div className={`nf-brand ${v}`}>
          Design &amp; General Contracting · Cairo
        </div>
      </div>
    </>
  );
}
