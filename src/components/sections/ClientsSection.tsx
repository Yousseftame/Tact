import React from "react";
import { Reveal } from "../../utils/Reveal";
import SplitText from "../../components/SplitText";
import icon1 from "../../assets/1-removebg-preview.png";
import icon2 from "../../assets/2-removebg-preview.png";
import icon3 from "../../assets/3-removebg-preview.png";
import icon4 from "../../assets/4-removebg-preview.png";
import icon5 from "../../assets/eleite.png";
import icon6 from "../../assets/6-removebg-preview.png";
import icon7 from "../../assets/7-removebg-preview.png";
import icon8 from "../../assets/8-removebg-preview.png";
import icon9 from "../../assets/9.png";
import icon10 from "../../assets/10.png";
import icon11 from "../../assets/11.png";


// Replace these paths with your actual image paths in /public or /assets
const clients = [
  { id: 1, name: "Ibda", src: icon1 },
  { id: 2, name: "Hayah Karima", src: icon2 },
  { id: 3, name: "DS+", src: icon3 },
  { id: 4, name: "ECSS", src: icon4 },
  { id: 5, name: "Elite Law Firm", src: icon5 },
  { id: 6, name: "Nova Industries", src: icon6 },
  { id: 7, name: "TMG", src: icon7 },
  { id: 8, name: "Residential Fit Outs", src: icon8 },
  { id: 9, name: "Kemet News", src: icon9 },
  { id: 10, name: "Egypt Casting", src: icon10 },
  { id: 10, name: "Egypt Casting", src: icon11 },
];

const styles = `
  /* ─── Section ─── */
  .cl2-section {
    background: #040709;
    padding: 155px 60px 160px;
    position: relative;
    overflow: hidden;
    border-top: 1px solid rgba(184,151,90,0.07);
  }

  /* Ambient center glow */
  .cl2-section::before {
    content: '';
    position: absolute;
    top: -100px; left: 50%;
    transform: translateX(-50%);
    width: 1000px; height: 500px;
    background: radial-gradient(ellipse, rgba(184,151,90,0.032) 0%, transparent 65%);
    pointer-events: none;
    z-index: 0;
  }

  /* Noise */
  .cl2-noise {
    position: absolute;
    inset: 0;
    opacity: 0.016;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  /* ─── Inner ─── */
  .cl2-inner {
    max-width: 1380px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ─── Header ─── */
  .cl2-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: flex-end;
    margin-bottom: 90px;
  }

  .cl2-label {
    font-family: 'Cormorant SC', serif;
    font-size: 9px;
    letter-spacing: 9px;
    text-transform: uppercase;
    color: #B8975A;
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 26px;
  }
  .cl2-label::before {
    content: '';
    display: block;
    width: 32px; height: 1px;
    background: #B8975A;
    flex-shrink: 0;
  }

  .cl2-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(38px, 4.5vw, 66px);
    font-weight: 300;
    line-height: 1.05;
    color: #F0EAE0;
    letter-spacing: -0.5px;
    margin: 0;
  }
  .cl2-title em {
    font-style: italic;
    color: #C4A464;
  }

  .cl2-header-right {
    padding-bottom: 6px;
  }
  .cl2-rule {
    width: 1px; height: 44px;
    background: linear-gradient(to bottom, #B8975A, transparent);
    margin-bottom: 22px;
  }
  .cl2-desc {
    font-family: 'EB Garamond', serif;
    font-size: clamp(15px, 1.15vw, 17px);
    font-style: italic;
    line-height: 2.1;
    color: rgba(240,234,224,0.44);
    margin: 0 0 16px;
  }
  .cl2-desc-sub {
    font-family: 'EB Garamond', serif;
    font-size: clamp(13.5px, 1vw, 15px);
    line-height: 2;
    color: rgba(240,234,224,0.28);
    margin: 0;
  }

  /* ─── Stat chips ─── */
  .cl2-stats {
    display: flex;
    gap: 0;
    margin-bottom: 72px;
    border: 1px solid rgba(184,151,90,0.1);
  }

  .cl2-stat {
    flex: 1;
    padding: 26px 32px;
    border-right: 1px solid rgba(184,151,90,0.1);
    position: relative;
    overflow: hidden;
    transition: background 0.4s ease;
  }
  .cl2-stat:last-child { border-right: none; }
  .cl2-stat:hover { background: rgba(184,151,90,0.025); }

  .cl2-stat::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #C4A464, transparent);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
  }
  .cl2-stat:hover::before { transform: scaleX(1); }

  .cl2-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 3vw, 40px);
    font-weight: 300;
    color: #C4A464;
    line-height: 1;
    display: block;
    letter-spacing: -1px;
    margin-bottom: 8px;
  }
  .cl2-stat-lbl {
    font-family: 'Cormorant SC', serif;
    font-size: 8px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(240,234,224,0.28);
  }

  /* ─── Marquee wrapper ─── */
  .cl2-marquee-outer {
    position: relative;
    border-top: 1px solid rgba(184,151,90,0.09);
    border-bottom: 1px solid rgba(184,151,90,0.09);
    overflow: hidden;
  }

  /* Fade masks */
  .cl2-marquee-outer::before,
  .cl2-marquee-outer::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    width: 180px;
    z-index: 3;
    pointer-events: none;
  }
  .cl2-marquee-outer::before {
    left: 0;
    background: linear-gradient(90deg, #040709 0%, transparent 100%);
  }
  .cl2-marquee-outer::after {
    right: 0;
    background: linear-gradient(-90deg, #040709 0%, transparent 100%);
  }

  /* Two rows of marquee */
  .cl2-marquee-row {
    display: flex;
    width: max-content;
    padding: 10px 0;
  }
  .cl2-marquee-row.row-1 {
    animation: cl2-scroll-left 35s linear infinite;
    border-bottom: 1px solid rgba(184,151,90,0.06);
  }
  .cl2-marquee-row.row-2 {
    animation: cl2-scroll-right 40s linear infinite;
  }
  .cl2-marquee-row:hover { animation-play-state: paused; }

  @keyframes cl2-scroll-left {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes cl2-scroll-right {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  /* ─── Logo pill ─── */
  .cl2-logo-pill {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 28px 52px;
    border-right: 1px solid rgba(184,151,90,0.07);
    position: relative;
    cursor: default;
    min-width: 200px;
    transition: background 0.4s ease;
  }
  .cl2-logo-pill:hover {
    background: rgba(184,151,90,0.025);
  }

  /* Separator diamond */
  .cl2-logo-pill::after {
    content: '◆';
    position: absolute;
    right: -7px;
    font-size: 5px;
    color: rgba(184,151,90,0.25);
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
  }

  .cl2-logo-img {
    max-height: 46px;
    max-width: 140px;
    width: auto;
    object-fit: contain;
    display: block;

    /* Grayscale + dim at rest */
    filter: grayscale(100%) brightness(0.55) contrast(1.1);
    opacity: 0.65;

    transition:
      filter 0.55s cubic-bezier(0.16,1,0.3,1),
      opacity 0.55s ease,
      transform 0.45s cubic-bezier(0.16,1,0.3,1);
  }

  /* Hover: full color, full brightness */
  .cl2-logo-pill:hover .cl2-logo-img {
    filter: grayscale(0%) brightness(1) contrast(1);
    opacity: 1;
    transform: scale(1.06);
  }

  /* ─── Bottom ornament ─── */
  .cl2-footer {
    margin-top: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .cl2-footer-line {
    flex: 1;
    max-width: 200px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,151,90,0.3));
  }
  .cl2-footer-line.rev {
    background: linear-gradient(90deg, rgba(184,151,90,0.3), transparent);
  }
  .cl2-footer-mark {
    font-family: 'Cormorant SC', serif;
    font-size: 8px;
    letter-spacing: 7px;
    color: rgba(184,151,90,0.35);
    text-transform: uppercase;
  }

  /* ─── Responsive ─── */
  @media (max-width: 1024px) {
    .cl2-header { grid-template-columns: 1fr; gap: 36px; }
    .cl2-section { padding: 110px 40px 120px; }
    .cl2-rule { display: none; }
    .cl2-stats { flex-wrap: wrap; }
    .cl2-stat { min-width: 50%; }
  }
  @media (max-width: 640px) {
    .cl2-section { padding: 80px 24px 90px; }
    .cl2-stat { min-width: 100%; border-right: none; border-bottom: 1px solid rgba(184,151,90,0.1); }
    .cl2-logo-pill { padding: 22px 32px; min-width: 150px; }
    .cl2-logo-img { max-height: 36px; max-width: 110px; }
  }
`;

export default function ClientsSection() {
  // Two separate rows with slightly different sets for visual variety
  const row1 = [...clients, ...clients];
  const row2 = [
    ...clients.slice(5),
    ...clients.slice(0, 5),
    ...clients.slice(5),
    ...clients.slice(0, 5),
  ];

  return (
    <>
      <style>{styles}</style>
      <section className="cl2-section">
        <div className="cl2-noise" />

        <div className="cl2-inner">
          {/* ── Header ── */}
          <div className="cl2-header">
            <Reveal direction="left" delay={100}>
              <div>
                <p className="cl2-label">Trusted By</p>
                <h2 className="cl2-title">
                  <SplitText
                    text="Our Clients"
                    delay={40}
                    duration={1.2}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 36 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-60px"
                    textAlign="left"
                    tag="span"
                  />
                  <br />
                  <em>
                    <SplitText
                      text="& Partners"
                      delay={52}
                      duration={1.2}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 36 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-60px"
                      textAlign="left"
                      tag="span"
                    />
                  </em>
                </h2>
              </div>
            </Reveal>

            <Reveal direction="right" delay={200}>
              <div className="cl2-header-right">
                <div className="cl2-rule" />
                <p className="cl2-desc">
                  We are honored to have partnered with some of Egypt's and the
                  region's most prestigious organizations.
                </p>
                <p className="cl2-desc-sub">
                  Each collaboration is a testament to the trust our clients
                  place in Tact Innovations — delivering projects that redefine
                  their industries and stand the test of time.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ── Stats strip ── */}
          <Reveal delay={200}>
            <div className="cl2-stats">
              {[
                { num: "10+", lbl: "Trusted Partners" },
                { num: "15+", lbl: "Years of Trust" },
                { num: "200+", lbl: "Projects Delivered" },
                { num: "100%", lbl: "Client Satisfaction" },
              ].map((s) => (
                <div className="cl2-stat" key={s.lbl}>
                  <span className="cl2-stat-num">{s.num}</span>
                  <span className="cl2-stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ── Marquee ── */}
          <Reveal delay={300}>
            <div className="cl2-marquee-outer">
              {/* Row 1 — scrolls left */}
              <div className="cl2-marquee-row row-1">
                {row1.map((c, i) => (
                  <div className="cl2-logo-pill" key={`r1-${i}`}>
                    <img
                      className="cl2-logo-img"
                      src={c.src}
                      alt={c.name}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>

              {/* Row 2 — scrolls right */}
              <div className="cl2-marquee-row row-2">
                {row2.map((c, i) => (
                  <div className="cl2-logo-pill" key={`r2-${i}`}>
                    <img
                      className="cl2-logo-img"
                      src={c.src}
                      alt={c.name}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── Footer ornament ── */}
          <Reveal delay={400}>
            <div className="cl2-footer">
              <div className="cl2-footer-line rev" />
              <span className="cl2-footer-mark">Tact Innovations</span>
              <div className="cl2-footer-line" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
