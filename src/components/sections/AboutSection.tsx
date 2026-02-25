import React from "react";
import { Reveal } from "../../utils/Reveal";
import SplitText from "../../components/SplitText";
import CountUp from "../../components/CountUp";

const styles = `

  .about-section {
    background: #05080A;
    padding: 160px 60px;
    position: relative;
    overflow: hidden;
  }

  /* Ambient background glow */
  .about-section::before {
    content: '';
    position: absolute;
    top: -200px; left: -200px;
    width: 700px; height: 700px;
    background: radial-gradient(ellipse, rgba(184,151,90,0.04) 0%, transparent 70%);
    pointer-events: none;
  }
  .about-section::after {
    content: '';
    position: absolute;
    bottom: -100px; right: -100px;
    width: 500px; height: 500px;
    background: radial-gradient(ellipse, rgba(184,151,90,0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  .about-inner {
    max-width: 1380px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 110px;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  /* ── IMAGE SIDE ── */
  .about-image-wrap {
    position: relative;
  }

  /* Gold corner brackets */
  .about-image-wrap::before,
  .about-image-wrap::after {
    content: '';
    position: absolute;
    width: 38px; height: 38px;
    border-color: rgba(184,151,90,0.55);
    border-style: solid;
    z-index: 3;
    pointer-events: none;
  }
  .about-image-wrap::before {
    top: -10px; left: -10px;
    border-width: 1px 0 0 1px;
  }
  .about-image-wrap::after {
    bottom: 32px; right: -32px;
    border-width: 0 1px 1px 0;
  }

  .about-image-inner {
    position: relative;
    z-index: 1;
  }

  .about-image {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    display: block;
    filter: grayscale(12%) contrast(1.07) brightness(0.93);
  }

  /* Offset decorative frame behind image */
  .about-frame {
    position: absolute;
    top: 28px; left: 28px;
    right: -28px; bottom: -28px;
    border: 1px solid rgba(184,151,90,0.18);
    z-index: -1;
    pointer-events: none;
  }

  /* Gold ribbon on left edge of image */
  .about-image-ribbon {
    position: absolute;
    left: -1px; top: 60px; bottom: 60px;
    width: 2px;
    background: linear-gradient(to bottom, transparent, #B8975A 30%, #B8975A 70%, transparent);
    z-index: 2;
  }

  /* Year badge overlaid on image */
  .about-image-badge {
    position: absolute;
    bottom: -20px;
    right: -44px;
    z-index: 4;
    background: #05080A;
    border: 1px solid rgba(184,151,90,0.25);
    padding: 22px 28px;
    text-align: center;
  }
  .about-image-badge-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px;
    font-weight: 300;
    color: #C4A464;
    line-height: 1;
    display: block;
    letter-spacing: -1px;
  }
  .about-image-badge-lbl {
    font-family: 'Cormorant SC', serif;
    font-size: 8px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: rgba(184,151,90,0.5);
    display: block;
    margin-top: 8px;
  }

  /* ── TEXT SIDE ── */
  .about-text {
    padding-top: 20px;
  }

  /* Section label */
  .about-label {
    font-family: 'Cormorant SC', serif;
    font-size: 9px;
    letter-spacing: 8px;
    text-transform: uppercase;
    color: #B8975A;
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 28px;
  }
  .about-label::before {
    content: '';
    display: block;
    width: 32px; height: 1px;
    background: #B8975A;
    flex-shrink: 0;
  }

  /* Headline */
  .about-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(38px, 4.5vw, 64px);
    font-weight: 300;
    line-height: 1.07;
    color: #F0EAE0;
    letter-spacing: -0.5px;
    margin: 0 0 32px 0;
  }
  .about-title em {
    font-style: italic;
    color: #C4A464;
  }

  /* Ornament */
  .about-ornament {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 38px;
  }
  .about-ornament-line {
    width: 44px; height: 1px;
    background: linear-gradient(90deg, #B8975A, rgba(184,151,90,0.12));
  }
  .about-ornament-diamond {
    width: 5px; height: 5px;
    background: #B8975A;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* Body text */
  .about-body {
    font-family: 'EB Garamond', serif;
    font-size: clamp(15px, 1.2vw, 17px);
    font-style: italic;
    font-weight: 400;
    line-height: 2.1;
    color: rgba(240,234,224,0.52);
    max-width: 520px;
  }
  .about-body + .about-body {
    margin-top: 22px;
    font-style: normal;
    color: rgba(240,234,224,0.42);
  }

  /* Stats row */
  .about-stats {
    display: flex;
    gap: 0;
    margin-top: 56px;
    padding-top: 0;
    border-top: none;
  }

  .about-stat {
    flex: 1;
    position: relative;
    padding: 28px 0 28px 28px;
    border-left: 1px solid rgba(184,151,90,0.2);
  }
  .about-stat::before {
    content: '';
    position: absolute;
    top: 0; left: -1px;
    width: 1px; height: 0;
    background: #B8975A;
    transition: height 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .about-stat:hover::before { height: 100%; }

  .about-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(38px, 4vw, 54px);
    font-weight: 300;
    color: #C4A464;
    line-height: 1;
    margin-bottom: 10px;
    letter-spacing: -1px;
    display: block;
  }
  .about-stat-lbl {
    font-family: 'Cormorant SC', serif;
    font-size: 8.5px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(240,234,224,0.35);
    display: block;
    font-weight: 300;
  }
  .count-up-text {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    color: #C4A464;
  }

  /* Top border above stats */
  .about-stats-rule {
    height: 1px;
    background: linear-gradient(90deg, rgba(184,151,90,0.25), transparent);
    margin-bottom: 0;
    margin-top: 52px;
  }

  @media (max-width: 1024px) {
    .about-inner {
      grid-template-columns: 1fr;
      gap: 70px;
    }
    .about-section { padding: 100px 40px; }
    .about-image-badge { right: 0; }
  }
  @media (max-width: 640px) {
    .about-section { padding: 80px 24px; }
    .about-stats { gap: 0; }
    .about-image-badge { display: none; }
    .about-image-wrap::after { display: none; }
  }
`;

export default function AboutSection() {
  return (
    <>
      <style>{styles}</style>
      <section className="about-section">
        <div className="about-inner">

          {/* ── Left: Image ── */}
          <Reveal direction="left" delay={100}>
            <div className="about-image-wrap">
              <div className="about-image-inner">
                <div className="about-image-ribbon" />
                <img
                  className="about-image"
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=88&fit=crop&crop=center"
                  alt="Tact Innovations — Architecture"
                />
                <div className="about-frame" />
              </div>
              <div className="about-image-badge">
                <span className="about-image-badge-num">2010</span>
                <span className="about-image-badge-lbl">Established</span>
              </div>
            </div>
          </Reveal>

          {/* ── Right: Text ── */}
          <Reveal direction="right" delay={200}>
            <div className="about-text">
              <p className="about-label">Who We Are</p>

              <h2 className="about-title">
                <SplitText
                  text="Building the Future"
                  delay={40}
                  duration={1.2}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 36 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-80px"
                  textAlign="left"
                />
                <br />
                <em>
                  <SplitText
                    text="with Precision & Vision"
                    delay={55}
                    duration={1.2}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 36 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-80px"
                    textAlign="left"
                  />
                </em>
              </h2>

              <div className="about-ornament">
                <div className="about-ornament-line" />
                <div className="about-ornament-diamond" />
              </div>

              <p className="about-body">
                Tact Innovations Design &amp; General Contracting is a premier
                design and construction firm with a distinguished reputation for
                delivering extraordinary spaces. We blend visionary architecture
                with disciplined engineering, transforming ambitious ideas into
                enduring built reality.
              </p>
              <p className="about-body">
                Since our founding, we have been trusted by Egypt's most
                discerning clients — from landmark commercial towers to intimate
                residential masterpieces — each a testament to our unwavering
                commitment to excellence.
              </p>

              <div className="about-stats-rule" />
              <div className="about-stats">
                {[
                  { from: 0, to: 15,  suffix: "+", lbl: "Years of Excellence" },
                  { from: 0, to: 200, suffix: "+", lbl: "Projects Completed" },
                  { from: 0, to: 50,  suffix: "+", lbl: "Expert Team" },
                ].map((s) => (
                  <div className="about-stat" key={s.lbl}>
                    <span className="about-stat-num">
                      <CountUp
                        from={s.from}
                        to={s.to}
                        separator=","
                        direction="up"
                        duration={2}
                        className="count-up-text"
                      />
                      {s.suffix}
                    </span>
                    <span className="about-stat-lbl">{s.lbl}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
}