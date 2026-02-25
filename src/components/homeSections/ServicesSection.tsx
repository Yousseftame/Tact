import React, { useRef } from "react";
import { Reveal } from "../../utils/Reveal";
import SplitText from "../SplitText";

const services = [
  {
    id: "01",
    title: "Facility Management",
    desc: "End-to-end management of your built environment — ensuring every system, surface, and space operates at peak performance with seamless continuity.",
    detail: "Operations · Maintenance · Lifecycle Planning",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect
          x="4"
          y="4"
          width="12"
          height="12"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <rect
          x="20"
          y="4"
          width="12"
          height="12"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <rect
          x="4"
          y="20"
          width="12"
          height="12"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <rect
          x="20"
          y="20"
          width="12"
          height="12"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <circle cx="18" cy="18" r="2.5" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Designs",
    desc: "From concept to construction documents — we craft visionary architectural designs that balance aesthetic ambition with engineering precision and human experience.",
    detail: "Concept · Schematics · Construction Docs",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M4 32 L18 4 L32 32" stroke="currentColor" strokeWidth="0.8" />
        <path d="M9 22 L27 22" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="18" cy="4" r="2" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Fit-Out",
    desc: "Transforming raw shells into extraordinary inhabited spaces — our fit-out mastery covers every finish, fixture, and detail with uncompromising craft and material intelligence.",
    detail: "Interior · MEP · Finishing · FF&E",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M4 28 L4 12 L18 4 L32 12 L32 28"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path
          d="M13 28 L13 18 L23 18 L23 28"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path d="M4 28 L32 28" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Transport & Supplies",
    desc: "Comprehensive logistics and procurement solutions — ensuring the right materials, equipment, and resources arrive precisely on schedule, every time, without compromise.",
    detail: "Procurement · Logistics · Supply Chain",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M4 24 L4 14 L22 14 L22 24"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path
          d="M22 18 L28 18 L32 22 L32 24 L22 24"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <circle
          cx="9"
          cy="26.5"
          r="2.5"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <circle
          cx="27"
          cy="26.5"
          r="2.5"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path d="M4 24 L32 24" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    ),
  },
];

const styles = `
  /* ─── Section ─── */
  .svc2-section {
    background: #05080A;
    padding: 155px 60px 160px;
    position: relative;
    overflow: hidden;
  }

  /* Ambient glows */
  .svc2-section::before {
    content: '';
    position: absolute;
    top: -150px; left: 50%;
    transform: translateX(-50%);
    width: 900px; height: 600px;
    background: radial-gradient(ellipse, rgba(184,151,90,0.035) 0%, transparent 65%);
    pointer-events: none;
    z-index: 0;
  }

  /* Noise texture */
  .svc2-noise {
    position: absolute;
    inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  /* ─── Inner ─── */
  .svc2-inner {
    max-width: 1380px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ─── Header ─── */
  .svc2-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: flex-end;
    margin-bottom: 90px;
  }

  .svc2-header-left {}

  .svc2-label {
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
  .svc2-label::before {
    content: '';
    display: block;
    width: 32px; height: 1px;
    background: #B8975A;
    flex-shrink: 0;
  }

  .svc2-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(38px, 4.5vw, 66px);
    font-weight: 300;
    line-height: 1.05;
    color: #F0EAE0;
    letter-spacing: -0.5px;
    margin: 0;
  }
  .svc2-title em {
    font-style: italic;
    color: #C4A464;
  }

  /* Right: intro paragraph */
  .svc2-header-right {
    padding-bottom: 8px;
  }

  .svc2-intro-rule {
    width: 1px; height: 48px;
    background: linear-gradient(to bottom, #B8975A, rgba(184,151,90,0));
    margin-bottom: 24px;
  }

  .svc2-intro {
    font-family: 'EB Garamond', serif;
    font-size: clamp(15px, 1.2vw, 17px);
    font-style: italic;
    line-height: 2.1;
    color: rgba(240,234,224,0.48);
    margin: 0 0 20px;
  }
  .svc2-intro-sub {
    font-family: 'EB Garamond', serif;
    font-size: clamp(13.5px, 1vw, 15px);
    line-height: 2;
    color: rgba(240,234,224,0.32);
    margin: 0;
    font-style: normal;
  }

  /* ─── Cards ─── */
  .svc2-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    border: 1px solid rgba(184,151,90,0.1);
  }

  .svc2-card {
    position: relative;
    padding: 52px 40px 56px;
    border-right: 1px solid rgba(184,151,90,0.1);
    overflow: hidden;
    cursor: default;
    transition: background 0.5s ease;
    display: flex;
    flex-direction: column;
  }
  .svc2-card:last-child { border-right: none; }
  .svc2-card:hover { background: rgba(184,151,90,0.028); }

  /* top fill bar on hover */
  .svc2-card-bar {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #C4A464, transparent);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.65s cubic-bezier(0.16,1,0.3,1);
  }
  .svc2-card:hover .svc2-card-bar { transform: scaleX(1); }

  /* Large watermark number */
  .svc2-card-num {
    position: absolute;
    bottom: -10px; right: 16px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 96px;
    font-weight: 300;
    color: rgba(184,151,90,0.04);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    transition: color 0.5s ease;
    letter-spacing: -4px;
  }
  .svc2-card:hover .svc2-card-num { color: rgba(184,151,90,0.07); }

  /* Icon */
  .svc2-icon {
    color: rgba(196,164,100,0.4);
    margin-bottom: 36px;
    transition: color 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1);
    width: 36px;
    flex-shrink: 0;
  }
  .svc2-card:hover .svc2-icon {
    color: rgba(196,164,100,0.85);
    transform: scale(1.08) translateY(-3px);
  }

  /* Title */
  .svc2-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(20px, 1.7vw, 24px);
    font-weight: 300;
    color: #F0EAE0;
    line-height: 1.2;
    margin: 0 0 20px;
    letter-spacing: -0.2px;
    transition: color 0.35s ease;
  }
  .svc2-card:hover .svc2-card-title { color: #C4A464; }

  /* Divider */
  .svc2-card-div {
    width: 28px; height: 1px;
    background: rgba(184,151,90,0.25);
    margin-bottom: 20px;
    transition: width 0.55s cubic-bezier(0.16,1,0.3,1), background 0.35s;
    flex-shrink: 0;
  }
  .svc2-card:hover .svc2-card-div {
    width: 46px;
    background: rgba(184,151,90,0.55);
  }

  /* Desc */
  .svc2-card-desc {
    font-family: 'EB Garamond', serif;
    font-size: clamp(13.5px, 1.05vw, 15px);
    line-height: 2;
    color: rgba(240,234,224,0.38);
    margin: 0 0 auto;
    transition: color 0.35s ease;
  }
  .svc2-card:hover .svc2-card-desc { color: rgba(240,234,224,0.56); }

  /* Detail tag */
  .svc2-card-detail {
    display: block;
    margin-top: 32px;
    font-family: 'Cormorant SC', serif;
    font-size: 8px;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: rgba(184,151,90,0.0);
    transition: color 0.45s ease 0.05s, transform 0.45s ease 0.05s;
    transform: translateY(6px);
    flex-shrink: 0;
  }
  .svc2-card:hover .svc2-card-detail {
    color: rgba(184,151,90,0.5);
    transform: translateY(0);
  }

  /* ─── Bottom strip ─── */
  .svc2-bottom {
    margin-top: 0;
    border: 1px solid rgba(184,151,90,0.1);
    border-top: none;
    padding: 28px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .svc2-bottom-text {
    font-family: 'Cormorant SC', serif;
    font-size: 8.5px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: rgba(184,151,90,0.35);
  }

  .svc2-bottom-ornament {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    justify-content: center;
  }
  .svc2-bottom-line {
    flex: 1;
    max-width: 100px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,151,90,0.25));
  }
  .svc2-bottom-line.rev {
    background: linear-gradient(90deg, rgba(184,151,90,0.25), transparent);
  }
  .svc2-bottom-dot {
    width: 4px; height: 4px;
    background: rgba(184,151,90,0.4);
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* ─── Responsive ─── */
  @media (max-width: 1200px) {
    .svc2-cards { grid-template-columns: repeat(2, 1fr); }
    .svc2-card { border-bottom: 1px solid rgba(184,151,90,0.1); }
    .svc2-card:nth-child(2) { border-right: none; }
    .svc2-card:nth-child(3),
    .svc2-card:nth-child(4) { border-bottom: none; }
    .svc2-card:nth-child(4) { border-right: none; }
    .svc2-card:nth-child(3) { border-right: 1px solid rgba(184,151,90,0.1); }
  }
  @media (max-width: 1024px) {
    .svc2-header { grid-template-columns: 1fr; gap: 36px; }
    .svc2-section { padding: 110px 40px 120px; }
    .svc2-intro-rule { display: none; }
  }
  @media (max-width: 640px) {
    .svc2-cards { grid-template-columns: 1fr; }
    .svc2-card { border-right: none !important; border-bottom: 1px solid rgba(184,151,90,0.1) !important; }
    .svc2-card:last-child { border-bottom: none !important; }
    .svc2-section { padding: 80px 24px 90px; }
    .svc2-card { padding: 40px 28px 44px; }
    .svc2-bottom { flex-direction: column; gap: 16px; text-align: center; }
  }
`;

export default function ServicesSection() {
  return (
    <>
      <style>{styles}</style>
      <section className="svc2-section">
        <div className="svc2-noise" />

        <div className="svc2-inner">
          {/* ── Header ── */}
          <div className="svc2-header">
            <Reveal direction="left" delay={100}>
              <div className="svc2-header-left">
                <p className="svc2-label">What We Offer</p>
                <h2 className="svc2-title">
                  <SplitText
                    text="Our Services"
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
                      text="& Expertise"
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
              <div className="svc2-header-right">
                <div className="svc2-intro-rule" />
                <p className="svc2-intro">
                  Our services include concept design, construction documents,
                  and administration — crafted with meticulous attention to
                  every detail.
                </p>
                <p className="svc2-intro-sub">
                  We also offer feasibility studies, programming, and full
                  project management — a complete, integrated approach from
                  first sketch to final handover.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ── Cards ── */}
          <div className="svc2-cards">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 100}>
                <div className="svc2-card">
                  <div className="svc2-card-bar" />
                  <span className="svc2-card-num">{s.id}</span>

                  <div className="svc2-icon">{s.icon}</div>
                  <h3 className="svc2-card-title">{s.title}</h3>
                  <div className="svc2-card-div" />
                  <p className="svc2-card-desc">{s.desc}</p>
                  <span className="svc2-card-detail">{s.detail}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ── Bottom strip ── */}
          <Reveal delay={400}>
            <div className="svc2-bottom">
              <span className="svc2-bottom-text">Tact Innovations</span>
              <div className="svc2-bottom-ornament">
                <div className="svc2-bottom-line rev" />
                <div className="svc2-bottom-dot" />
                <div className="svc2-bottom-line" />
              </div>
              <span className="svc2-bottom-text">Cairo, Egypt</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
