import React, { useState } from "react";
import { Reveal } from "../../utils/Reveal";
import SplitText from "../SplitText";

const reasons = [
  {
    num: "01",
    title: "Industry Leadership",
    desc: "We are a leading company in design and finishing, specializing in real estate management and investment — setting the benchmark others aspire to reach.",
  },
  {
    num: "02",
    title: "Vision for the Future",
    desc: "Shaping the future of real estate for a better world, we harness the latest technologies to create rewarding opportunities and sustainable solutions.",
  },
  {
    num: "03",
    title: "Innovative & Sustainable",
    desc: "We create extraordinary spaces and deliver sustainable real estate solutions for our clients, teams, and the communities we are privileged to serve.",
  },
  {
    num: "04",
    title: "Strategic Expansion",
    desc: "TACT expands across local and Arab markets, leveraging deep market intelligence and the abundant opportunities flourishing across Egypt and the region.",
  },
];

const styles = `
  .why-section {
    background: #05080A;
    position: relative;
    overflow: hidden;
    border-top: 1px solid rgba(184,151,90,0.07);
  }

  /* Large watermark numeral in background */
  .why-watermark {
    position: absolute;
    right: -60px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(280px, 30vw, 480px);
    font-weight: 300;
    color: rgba(184,151,90,0.025);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    transition: opacity 0.6s ease;
    letter-spacing: -20px;
  }

  /* Ambient glows */
  .why-glow-tl {
    position: absolute;
    top: -150px; left: -150px;
    width: 600px; height: 600px;
    background: radial-gradient(ellipse, rgba(184,151,90,0.04) 0%, transparent 70%);
    pointer-events: none;
  }
  .why-glow-br {
    position: absolute;
    bottom: -100px; right: 200px;
    width: 500px; height: 400px;
    background: radial-gradient(ellipse, rgba(184,151,90,0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  .why-inner {
    max-width: 1380px;
    margin: 0 auto;
    padding: 150px 60px;
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    gap: 120px;
    align-items: start;
    position: relative;
    z-index: 1;
  }

  /* ── LEFT STICKY ── */
  .why-sticky {
    position: sticky;
    top: 120px;
  }

  .why-label {
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
  .why-label::before {
    content: '';
    display: block;
    width: 32px; height: 1px;
    background: #B8975A;
    flex-shrink: 0;
  }

  .why-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(38px, 4.2vw, 60px);
    font-weight: 300;
    line-height: 1.07;
    color: #F0EAE0;
    letter-spacing: -0.5px;
    margin: 0 0 32px 0;
  }
  .why-heading em {
    font-style: italic;
    color: #C4A464;
  }

  .why-ornament {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 36px;
  }
  .why-ornament-line {
    width: 44px; height: 1px;
    background: linear-gradient(90deg, #B8975A, rgba(184,151,90,0.1));
  }
  .why-ornament-diamond {
    width: 5px; height: 5px;
    background: #B8975A;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  .why-body {
    font-family: 'EB Garamond', serif;
    font-size: clamp(15px, 1.2vw, 17px);
    font-style: italic;
    line-height: 2.1;
    color: rgba(240,234,224,0.48);
    max-width: 400px;
    margin-bottom: 52px;
  }

  /* Vertical progress line on left */
  .why-progress-wrap {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 8px;
  }
  .why-progress-track {
    width: 1px;
    height: 120px;
    background: rgba(184,151,90,0.15);
    position: relative;
    overflow: hidden;
  }
  .why-progress-fill {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    background: linear-gradient(to bottom, #B8975A, rgba(184,151,90,0.2));
    transition: height 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  .why-progress-dots {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .why-progress-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: rgba(184,151,90,0.2);
    border: 1px solid rgba(184,151,90,0.3);
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
  }
  .why-progress-dot.active {
    background: #B8975A;
    transform: scale(1.4);
  }

  /* ── RIGHT CARDS ── */
  .why-cards {
    display: flex;
    flex-direction: column;
    padding-top: 8px;
  }

  .why-card {
    position: relative;
    padding: 44px 0 44px 48px;
    border-bottom: 1px solid rgba(184,151,90,0.08);
    cursor: default;
    transition: padding-left 0.45s cubic-bezier(0.16,1,0.3,1);
    overflow: hidden;
  }
  .why-card:first-child { border-top: 1px solid rgba(184,151,90,0.08); }

  /* Hover fill shimmer */
  .why-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, rgba(184,151,90,0.04) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
  .why-card:hover::before { opacity: 1; }
  .why-card:hover { padding-left: 60px; }

  /* Animated left border accent */
  .why-card-accent {
    position: absolute;
    left: 0; top: 0;
    width: 2px;
    height: 0;
    background: linear-gradient(to bottom, #C4A464, rgba(184,151,90,0.1));
    transition: height 0.55s cubic-bezier(0.16,1,0.3,1);
  }
  .why-card:hover .why-card-accent { height: 100%; }

  /* Number */
  .why-num {
    font-family: '', serif;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 5px;
    color: rgba(184,151,90,0.4);
    text-transform: uppercase;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: color 0.3s;
  }
  .why-num::after {
    content: '';
    display: block;
    width: 20px; height: 1px;
    background: rgba(184,151,90,0.3);
    transition: width 0.4s ease, background 0.3s;
  }
  .why-card:hover .why-num { color: #C4A464; }
  .why-card:hover .why-num::after { width: 36px; background: #C4A464; }

  /* Title */
  .why-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(22px, 2.2vw, 30px);
    font-weight: 400;
    color: #F0EAE0;
    margin-bottom: 14px;
    line-height: 1.2;
    transition: color 0.3s;
  }
  .why-card:hover .why-title { color: #fff; }

  /* Description */
  .why-desc {
    font-family: 'EB Garamond', serif;
    font-size: clamp(14px, 1.1vw, 16px);
    line-height: 2;
    color: rgba(240,234,224,0.42);
    max-width: 500px;
    transition: color 0.3s;
  }
  .why-card:hover .why-desc { color: rgba(240,234,224,0.58); }

  /* Hover reveal tag */
  .why-card-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 18px;
    font-family: '', serif;
    font-size: 8px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #B8975A;
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s;
  }
  .why-card-tag::before {
    content: '';
    width: 16px; height: 1px;
    background: #B8975A;
  }
  .why-card:hover .why-card-tag { opacity: 1; transform: translateX(0); }

  @media (max-width: 1024px) {
    .why-inner { grid-template-columns: 1fr; gap: 70px; padding: 100px 40px; }
    .why-sticky { position: static; }
    .why-watermark { display: none; }
  }
  @media (max-width: 640px) {
    .why-inner { padding: 80px 24px; }
    .why-card { padding: 36px 0 36px 32px; }
  }
`;

export default function WhyUsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const fillPct = ((activeIdx + 1) / reasons.length) * 100;

  return (
    <>
      <style>{styles}</style>
      <section className="why-section">
        <div className="why-glow-tl" />
        <div className="why-glow-br" />
        <div className="why-watermark" aria-hidden="true">
          {String(activeIdx + 1).padStart(2, "0")}
        </div>

        <div className="why-inner">
          {/* ── LEFT: Sticky header ── */}
          <Reveal direction="left" delay={100}>
            <div className="why-sticky">
              <p className="why-label">The Tact Advantage</p>

              <h2 className="why-heading">
                <SplitText
                  text="Why Choose"
                  delay={40}
                  duration={1.2}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 32 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-60px"
                  textAlign="left"
                />
                <br />
                <em>
                  <SplitText
                    text="Our Company?"
                    delay={55}
                    duration={1.2}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 32 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-60px"
                    textAlign="left"
                  />
                </em>
              </h2>

              <div className="why-ornament">
                <div className="why-ornament-line" />
                <div className="why-ornament-diamond" />
              </div>

              <p className="why-body">
                In a competitive real estate landscape, TACT stands out through
                innovation, strategic vision, and a deep commitment to
                delivering exceptional design, finishing, and investment
                solutions.
              </p>

              {/* Progress indicator */}
              <div className="why-progress-wrap">
                <div className="why-progress-track">
                  <div
                    className="why-progress-fill"
                    style={{ height: `${fillPct}%` }}
                  />
                </div>
                <div className="why-progress-dots">
                  {reasons.map((_, i) => (
                    <div
                      key={i}
                      className={`why-progress-dot${i === activeIdx ? " active" : ""}`}
                      onClick={() => setActiveIdx(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── RIGHT: Cards ── */}
          <div className="why-cards">
            {reasons.map((r, i) => (
              <Reveal key={r.num} delay={i * 80}>
                <div className="why-card" onMouseEnter={() => setActiveIdx(i)}>
                  <div className="why-card-accent" />
                  <div className="why-num">{r.num}</div>
                  <h3 className="why-title">{r.title}</h3>
                  <p className="why-desc">{r.desc}</p>
                  <span className="why-card-tag">Discover More</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
