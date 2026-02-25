import React, { useState } from "react";
import { Reveal } from "../../utils/Reveal";
import SplitText from "../SplitText";

const styles = `
  .vm-section {
    background: #05080A;
    padding: 160px 60px;
    position: relative;
    overflow: hidden;
    border-top: 1px solid rgba(184,151,90,0.07);
    border-bottom: 1px solid rgba(184,151,90,0.07);
  }

  /* Ambient glow */
  .vm-glow {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 800px; height: 500px;
    background: radial-gradient(ellipse, rgba(184,151,90,0.04) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Horizontal rule across full width */
  .vm-top-rule {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,151,90,0.3), transparent);
  }

  .vm-inner {
    max-width: 1380px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ── Header ── */
  .vm-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 80px;
    gap: 40px;
  }

  .vm-label {
    font-family: 'Raleway', sans-serif;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 7px;
    text-transform: uppercase;
    color: #B8975A;
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 24px;
  }
  .vm-label::before {
    content: '';
    width: 32px; height: 1px;
    background: #B8975A;
    flex-shrink: 0;
  }

  .vm-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(38px, 4.5vw, 64px);
    font-weight: 300;
    line-height: 1.07;
    color: #F0EAE0;
    letter-spacing: -0.5px;
    margin: 0;
  }
  .vm-heading em {
    font-style: italic;
    color: #C4A464;
  }

  .vm-header-right {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 14px;
    padding-bottom: 8px;
  }
  .vm-header-line {
    width: 60px; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,151,90,0.3));
  }
  .vm-header-tag {
    font-family: 'Raleway', sans-serif;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(184,151,90,0.4);
  }

  /* ── CARDS GRID ── */
  .vm-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: rgba(184,151,90,0.1);
  }

  .vm-card {
    background: #05080A;
    padding: 72px 60px;
    position: relative;
    overflow: hidden;
    cursor: default;
    transition: background 0.5s ease;
  }
  .vm-card:hover {
    background: rgba(184,151,90,0.025);
  }

  /* Animated top border */
  .vm-card-border {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, #C4A464, rgba(184,151,90,0.1));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.65s cubic-bezier(0.16,1,0.3,1);
  }
  .vm-card:hover .vm-card-border { transform: scaleX(1); }

  /* Animated left border */
  .vm-card-border-left {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, #C4A464, transparent);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.1s;
  }
  .vm-card:hover .vm-card-border-left { transform: scaleY(1); }

  /* Large ghost letter */
  .vm-watermark {
    position: absolute;
    bottom: -20px; right: 20px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 200px;
    font-style: italic;
    font-weight: 300;
    color: rgba(184,151,90,0.04);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    transition: color 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
  }
  .vm-card:hover .vm-watermark {
    color: rgba(184,151,90,0.07);
    transform: translateY(-8px);
  }

  /* Tag pill */
  .vm-tag {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'Raleway', sans-serif;
    font-size: 8.5px;
    font-weight: 600;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #B8975A;
    margin-bottom: 28px;
  }
  .vm-tag::before {
    content: '';
    width: 20px; height: 1px;
    background: #B8975A;
    flex-shrink: 0;
  }

  /* Card title */
  .vm-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(26px, 2.5vw, 36px);
    font-weight: 400;
    color: #F0EAE0;
    margin-bottom: 28px;
    line-height: 1.2;
    transition: color 0.3s;
  }
  .vm-card:hover .vm-title { color: #fff; }

  /* Ornament */
  .vm-ornament {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
  }
  .vm-ornament-line {
    width: 32px; height: 1px;
    background: linear-gradient(90deg, #B8975A, transparent);
  }
  .vm-ornament-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: rgba(184,151,90,0.4);
    flex-shrink: 0;
  }

  /* Card body */
  .vm-text {
    font-family: 'EB Garamond', serif;
    font-size: clamp(15px, 1.2vw, 17px);
    font-weight: 400;
    line-height: 2.1;
    color: rgba(240,234,224,0.46);
    max-width: 480px;
    transition: color 0.3s;
  }
  .vm-card:hover .vm-text { color: rgba(240,234,224,0.58); }

  /* Bottom corner bracket */
  .vm-card-corner {
    position: absolute;
    bottom: 24px; right: 24px;
    width: 28px; height: 28px;
    border-right: 1px solid rgba(184,151,90,0);
    border-bottom: 1px solid rgba(184,151,90,0);
    transition: border-color 0.4s ease 0.2s;
  }
  .vm-card:hover .vm-card-corner {
    border-color: rgba(184,151,90,0.35);
  }

  @media (max-width: 1024px) {
    .vm-grid { grid-template-columns: 1fr; }
    .vm-section { padding: 100px 40px; }
    .vm-header { flex-direction: column; align-items: flex-start; }
    .vm-header-right { display: none; }
  }
  @media (max-width: 640px) {
    .vm-section { padding: 80px 24px; }
    .vm-card { padding: 48px 28px; }
  }
`;

export default function VisionMissionSection() {
  return (
    <>
      <style>{styles}</style>
      <section className="vm-section">
        <div className="vm-glow" />

        <div className="vm-inner">
          {/* ── Header ── */}
          <Reveal>
            <div className="vm-header">
              <div>
                <p className="vm-label">Our Direction</p>
                <h2 className="vm-heading">
                  <SplitText
                    text="Vision &"
                    delay={40}
                    duration={1.2}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 30 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-60px"
                    textAlign="left"
                  />{" "}
                  <em>
                    <SplitText
                      text="Mission"
                      delay={55}
                      duration={1.2}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 30 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-60px"
                      textAlign="left"
                    />
                  </em>
                </h2>
              </div>
              <div className="vm-header-right">
                <div className="vm-header-line" />
                <span className="vm-header-tag">Tact Innovations</span>
              </div>
            </div>
          </Reveal>

          {/* ── Cards ── */}
          <div className="vm-grid">
            {/* Vision */}
            <Reveal delay={100}>
              <div className="vm-card">
                <div className="vm-card-border" />
                <div className="vm-card-border-left" />
                <span className="vm-watermark" aria-hidden="true">
                  V
                </span>

                <span className="vm-tag">Our Vision</span>
                <h3 className="vm-title">To Redefine the Built Environment</h3>
                <div className="vm-ornament">
                  <div className="vm-ornament-line" />
                  <div className="vm-ornament-dot" />
                </div>
                <p className="vm-text">
                  At Tact Innovations, we believe architecture is not merely
                  about structures — it is about creating environments that
                  inspire, enrich, and endure. We envision cities where design
                  harmonizes with nature, functionality meets elegance, and
                  communities thrive in beautiful, sustainable spaces.
                </p>
                <div className="vm-card-corner" />
              </div>
            </Reveal>

            {/* Mission */}
            <Reveal delay={200}>
              <div className="vm-card">
                <div className="vm-card-border" />
                <div className="vm-card-border-left" />
                <span className="vm-watermark" aria-hidden="true">
                  M
                </span>

                <span className="vm-tag">Our Mission</span>
                <h3 className="vm-title">
                  Delivering Excellence at Every Scale
                </h3>
                <div className="vm-ornament">
                  <div className="vm-ornament-line" />
                  <div className="vm-ornament-dot" />
                </div>
                <p className="vm-text">
                  Our mission is to transform the world through visionary
                  architecture and general contracting services. We are
                  dedicated to creating exceptional environments that inspire
                  and endure — bringing together the perfect balance of design,
                  functionality, and sustainability in every project we
                  undertake.
                </p>
                <div className="vm-card-corner" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
