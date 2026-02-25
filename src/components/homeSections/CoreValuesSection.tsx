import React, { useRef } from "react";
import { Reveal } from "../../utils/Reveal";
import SplitText from "../SplitText";
import imag1 from "../../assets/image1.png"
import imag2 from "../../assets/image2.png"
import imag3 from "../../assets/image3.png";

const values = [
  {
    id: "01",
    image: imag1, // replace with your actual image path
    title: "Sustainability First",
    desc: "We prioritize sustainable design, reducing environmental impact and enhancing quality of life through green building, energy efficiency, and renewable technologies.",
    keyword: "Green Future",
  },
  {
    id: "02",
    image: imag2,
    title: "Innovative Design",
    desc: "Creativity fuels our designs. We push boundaries, delivering unique and functional spaces — from modern minimalism to culturally inspired architectural marvels.",
    keyword: "Bold Vision",
  },
  {
    id: "03",
    image: imag3,
    title: "Client-Centric Approach",
    desc: "We value your vision. We collaborate closely throughout the design process, making your dreams and aspirations our mission — every project reflects your unique personality.",
    keyword: "Your Story",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cormorant+SC:wght@300;400&family=EB+Garamond:ital,wght@0,400;1,400&display=swap');

  /* ─── Section Shell ─── */
  .cv2-section {
    background: #05080A;
    padding: 150px 60px 160px;
    position: relative;
    overflow: hidden;
  }

  /* Ambient glow top-right */
  .cv2-section::before {
    content: '';
    position: absolute;
    top: -180px; right: -180px;
    width: 680px; height: 680px;
    background: radial-gradient(ellipse, rgba(184,151,90,0.045) 0%, transparent 68%);
    pointer-events: none;
    z-index: 0;
  }
  /* Bottom-left glow */
  .cv2-section::after {
    content: '';
    position: absolute;
    bottom: -120px; left: -80px;
    width: 500px; height: 500px;
    background: radial-gradient(ellipse, rgba(184,151,90,0.03) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* ─── Inner wrapper ─── */
  .cv2-inner {
    max-width: 1380px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ─── Section header ─── */
  .cv2-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 88px;
  }

  .cv2-label {
    font-family: 'Cormorant SC', serif;
    font-size: 9px;
    letter-spacing: 9px;
    text-transform: uppercase;
    color: #B8975A;
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 28px;
  }
  .cv2-label::before,
  .cv2-label::after {
    content: '';
    display: block;
    width: 36px; height: 1px;
    background: linear-gradient(90deg, transparent, #B8975A, transparent);
    flex-shrink: 0;
  }

  .cv2-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(38px, 4.5vw, 66px);
    font-weight: 300;
    line-height: 1.05;
    color: #F0EAE0;
    letter-spacing: -0.5px;
    margin: 0 0 28px 0;
  }
  .cv2-title em {
    font-style: italic;
    color: #C4A464;
  }

  /* ornament below title */
  .cv2-ornament {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .cv2-orn-line {
    width: 52px; height: 1px;
    background: linear-gradient(90deg, transparent, #B8975A);
  }
  .cv2-orn-line.rev {
    background: linear-gradient(90deg, #B8975A, transparent);
  }
  .cv2-orn-diamond {
    width: 5px; height: 5px;
    background: #B8975A;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* ─── Cards grid ─── */
  .cv2-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
  }

  /* ─── Single Card ─── */
  .cv2-card {
    position: relative;
    display: flex;
    flex-direction: column;
    background: #080C0F;
    border: 1px solid rgba(184,151,90,0.10);
    overflow: hidden;
    cursor: default;
    transition: border-color 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1);
  }
  .cv2-card:hover {
    border-color: rgba(184,151,90,0.28);
    transform: translateY(-6px);
  }

  /* top gold line reveal on hover */
  .cv2-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #C4A464 40%, #C4A464 60%, transparent);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
    z-index: 5;
  }
  .cv2-card:hover::before { transform: scaleX(1); }

  /* ─── Image container ─── */
  .cv2-img-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 4/3;
    overflow: hidden;
  }

  .cv2-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(8%) contrast(1.05) brightness(0.88);
    transition: transform 0.85s cubic-bezier(0.16,1,0.3,1), filter 0.85s ease;
  }
  .cv2-card:hover .cv2-img {
    transform: scale(1.06);
    filter: grayscale(0%) contrast(1.04) brightness(0.92);
  }

  /* gradient overlay on image bottom */
  .cv2-img-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 40%,
      rgba(8,12,15,0.65) 100%
    );
    z-index: 1;
    pointer-events: none;
  }

  /* floating index number on image */
  .cv2-img-num {
  position: absolute;
  top: 18px;
  right: 20px;
  z-index: 2;

  font-family: 'Cormorant SC', serif;
  font-size: 11px;
  letter-spacing: 4px;

  color: #C6A75E;

  padding: 6px 14px;

  background: rgba(10, 14, 18, 0.75);
  backdrop-filter: blur(8px);

  border: 1px solid rgba(198, 167, 94, 0.35);
  border-radius: 30px;

  box-shadow: 
    0 0 12px rgba(198, 167, 94, 0.15),
    inset 0 0 6px rgba(198, 167, 94, 0.08);

  transition: all 0.35s ease;
}
.cv2-img-num:hover {
  background: rgba(15, 20, 25, 0.9);
  border-color: rgba(198, 167, 94, 0.6);
  box-shadow: 
    0 0 18px rgba(198, 167, 94, 0.3),
    inset 0 0 8px rgba(198, 167, 94, 0.15);
  transform: translateY(-2px);
}


  /* keyword tag bottom of image */
  .cv2-img-tag {
    position: absolute;
    bottom: 16px; left: 20px;
    z-index: 2;
    font-family: 'Cormorant SC', serif;
    font-size: 8px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: rgba(196,164,100,0.7);
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
  }
  .cv2-card:hover .cv2-img-tag {
    opacity: 1;
    transform: translateY(0);
  }

  /* ─── Card body ─── */
  .cv2-body {
    padding: 38px 36px 42px;
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
  }

  /* thin gold vertical rule left of body */
  .cv2-body::before {
    content: '';
    position: absolute;
    top: 38px; left: 0;
    width: 1px; height: 0;
    background: linear-gradient(to bottom, #B8975A, rgba(184,151,90,0));
    transition: height 0.65s cubic-bezier(0.16,1,0.3,1);
  }
  .cv2-card:hover .cv2-body::before { height: calc(100% - 38px); }

  .cv2-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(22px, 2vw, 28px);
    font-weight: 300;
    color: #F0EAE0;
    line-height: 1.2;
    margin: 0 0 18px 0;
    letter-spacing: -0.3px;
    transition: color 0.35s ease;
  }
  .cv2-card:hover .cv2-card-title { color: #C4A464; }

  /* thin divider */
  .cv2-card-divider {
    width: 32px; height: 1px;
    background: rgba(184,151,90,0.3);
    margin-bottom: 20px;
    transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  .cv2-card:hover .cv2-card-divider { width: 52px; background: rgba(184,151,90,0.6); }

  .cv2-card-desc {
    font-family: 'EB Garamond', serif;
    font-size: clamp(14px, 1.1vw, 15.5px);
    font-weight: 400;
    line-height: 2;
    color: rgba(240,234,224,0.44);
    margin: 0;
    transition: color 0.35s ease;
  }
  .cv2-card:hover .cv2-card-desc { color: rgba(240,234,224,0.58); }

  /* arrow indicator bottom-right */
  .cv2-card-arrow {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 28px;
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s;
  }
  .cv2-card:hover .cv2-card-arrow {
    opacity: 1;
    transform: translateX(0);
  }
  .cv2-card-arrow-line {
    width: 24px; height: 1px;
    background: #B8975A;
  }
  .cv2-card-arrow-text {
    font-family: 'Cormorant SC', serif;
    font-size: 8px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #B8975A;
  }

  /* ─── bottom rule ─── */
  .cv2-footer {
    margin-top: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    opacity: 0.4;
  }
  .cv2-footer-line {
    flex: 1;
    max-width: 180px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,151,90,0.5));
  }
  .cv2-footer-line.rev {
    background: linear-gradient(90deg, rgba(184,151,90,0.5), transparent);
  }
  .cv2-footer-mark {
    font-family: 'Cormorant SC', serif;
    font-size: 8px;
    letter-spacing: 6px;
    color: rgba(184,151,90,0.7);
    text-transform: uppercase;
  }

  /* ─── Responsive ─── */
  @media (max-width: 1024px) {
    .cv2-grid { grid-template-columns: 1fr 1fr; gap: 20px; }
    .cv2-section { padding: 110px 40px 120px; }
  }
  @media (max-width: 640px) {
    .cv2-grid { grid-template-columns: 1fr; }
    .cv2-section { padding: 80px 24px 90px; }
    .cv2-body { padding: 30px 28px 34px; }
    .cv2-header { margin-bottom: 60px; }
  }
`;

export default function CoreValuesSection() {
  return (
    <>
      <style>{styles}</style>
      <section className="cv2-section">
        <div className="cv2-inner">
          {/* ── Header ── */}
          <Reveal>
            <div className="cv2-header">
              <p className="cv2-label">What We Stand For</p>

              <h2 className="cv2-title">
                <SplitText
                  text="Our Core Values"
                  delay={45}
                  duration={1.2}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 38 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-60px"
                  textAlign="center"
                  tag="span"
                />
                <br />
                <em>
                  <SplitText
                    text="& Commitments"
                    delay={55}
                    duration={1.2}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 38 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-60px"
                    textAlign="center"
                    tag="span"
                  />
                </em>
              </h2>

              <div className="cv2-ornament">
                <div className="cv2-orn-line rev" />
                <div className="cv2-orn-diamond" />
                <div className="cv2-orn-line" />
              </div>
            </div>
          </Reveal>

          {/* ── Cards ── */}
          <div className="cv2-grid">
            {values.map((v, i) => (
              <Reveal key={v.id} delay={i * 120}>
                <div className="cv2-card">
                  {/* Image */}
                  <div className="cv2-img-wrap">
                    <img className="cv2-img" src={v.image} alt={v.title} />
                    <div className="cv2-img-gradient" />
                    <span className="cv2-img-num">{v.id}</span>
                    <span className="cv2-img-tag">{v.keyword}</span>
                  </div>

                  {/* Body */}
                  <div className="cv2-body">
                    <h3 className="cv2-card-title">{v.title}</h3>
                    <div className="cv2-card-divider" />
                    <p className="cv2-card-desc">{v.desc}</p>
                    <div className="cv2-card-arrow">
                      <div className="cv2-card-arrow-line" />
                      <span className="cv2-card-arrow-text">Learn More</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ── Footer ornament ── */}
          <Reveal delay={300}>
            <div className="cv2-footer">
              <div className="cv2-footer-line rev" />
              <span className="cv2-footer-mark">Tact Innovations</span>
              <div className="cv2-footer-line" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
