import { Link } from "react-router-dom";

const styles = `
  .footer {
    background: #030507;
    border-top: 1px solid rgba(184,151,90,0.1);
    position: relative;
    overflow: hidden;
  }

  /* Ambient top glow */
  .footer-glow {
    position: absolute;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
    width: 900px; height: 300px;
    background: radial-gradient(ellipse, rgba(184,151,90,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Noise grain overlay */
  .footer-noise {
    position: absolute;
    inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  .footer-inner {
    max-width: 1380px;
    margin: 0 auto;
    padding: 0 60px;
    position: relative;
    z-index: 1;
  }

  /* ── TOP BRAND BAND ── */
  .footer-brand-band {
    padding: 72px 0 56px;
    border-bottom: 1px solid rgba(184,151,90,0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
  }

  .footer-logo-wrap {
    display: flex;
    align-items: center;
    gap: 22px;
  }
  .footer-logo {
    height: 36px;
    filter: brightness(0) invert(1);
    opacity: 0.82;
    display: block;
  }
  .footer-logo-divider {
    width: 1px;
    height: 36px;
    background: linear-gradient(to bottom, transparent, rgba(184,151,90,0.4), transparent);
  }
  .footer-logo-sub {
    font-family: '', serif;
    font-size: 8.5px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: rgba(184,151,90,0.5);
    line-height: 1.7;
  }

  /* Decorative center ornament */
  .footer-band-ornament {
    display: flex;
    align-items: center;
    gap: 14px;
    flex: 1;
    justify-content: center;
  }
  .footer-band-line {
    height: 1px;
    width: 80px;
    background: linear-gradient(90deg, transparent, rgba(184,151,90,0.25));
  }
  .footer-band-line-r {
    height: 1px;
    width: 80px;
    background: linear-gradient(90deg, rgba(184,151,90,0.25), transparent);
  }
  .footer-band-diamond {
    width: 5px; height: 5px;
    background: rgba(184,151,90,0.4);
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* Social icons */
  .footer-socials {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .footer-social-link {
    width: 36px; height: 36px;
    border: 1px solid rgba(184,151,90,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: border-color 0.3s, background 0.3s;
    position: relative;
    overflow: hidden;
  }
  .footer-social-link::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(184,151,90,0.08);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .footer-social-link:hover::before { opacity: 1; }
  .footer-social-link:hover { border-color: rgba(184,151,90,0.45); }
  .footer-social-link svg {
    width: 13px; height: 13px;
    fill: rgba(184,151,90,0.5);
    transition: fill 0.3s;
    position: relative;
    z-index: 1;
  }
  .footer-social-link:hover svg { fill: #C4A464; }

  /* ── MAIN GRID ── */
  .footer-main {
    display: grid;
    grid-template-columns: 1.8fr 1fr 1fr 1fr;
    gap: 64px;
    padding: 64px 0 60px;
    border-bottom: 1px solid rgba(184,151,90,0.07);
  }

  /* About column */
  .footer-tagline {
    font-family: , serif;
    font-size: 15px;
    font-style: italic;
    line-height: 2;
    color: rgba(240,234,224,0.38);
    max-width: 300px;
    margin-bottom: 32px;
  }

  /* Gold divider above tagline */
  .footer-col-rule {
    width: 36px; height: 1px;
    background: linear-gradient(90deg, #B8975A, transparent);
    margin-bottom: 20px;
  }

  /* Column title */
  .footer-col-title {
    font-family: '', serif;
    font-size: 8.5px;
    font-weight: 400;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: #B8975A;
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .footer-col-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(184,151,90,0.15);
  }

  /* Nav links */
  .footer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .footer-links li a {
    font-family: '', serif;
    font-size: 16px;
    font-weight: 300;
    color: rgba(240,234,224,0.42);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0;
    padding: 9px 0;
    border-bottom: 1px solid rgba(184,151,90,0.05);
    transition: color 0.3s, gap 0.35s;
    overflow: hidden;
  }
  .footer-links li:last-child a { border-bottom: none; }
  .footer-links li a::before {
    content: '—';
    font-size: 10px;
    color: #B8975A;
    opacity: 0;
    max-width: 0;
    transition: opacity 0.3s, max-width 0.35s;
    white-space: nowrap;
    overflow: hidden;
  }
  .footer-links li a:hover { color: #F0EAE0; gap: 10px; }
  .footer-links li a:hover::before { opacity: 1; max-width: 20px; }

  /* Contact lines */
  .footer-contact-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(184,151,90,0.05);
  }
  .footer-contact-item:last-child { border-bottom: none; }
  .footer-contact-label {
    font-family: '', serif;
    font-size: 7.5px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(184,151,90,0.4);
  }
  .footer-contact-value {
    font-family: '', serif;
    font-size: 15px;
    font-weight: 300;
    color: rgba(240,234,224,0.5);
    transition: color 0.3s;
    text-decoration: none;
  }
  .footer-contact-value:hover { color: #F0EAE0; }

  /* ── BOTTOM BAR ── */
  .footer-bottom {
    padding: 28px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .footer-copy {
    font-family: '', serif;
    font-size: 8px;
    letter-spacing: 3px;
    color: rgba(240,234,224,0.2);
  }

  .footer-bottom-ornament {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .footer-bottom-line {
    width: 40px; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,151,90,0.3));
  }
  .footer-bottom-dot {
    width: 3px; height: 3px;
    background: rgba(184,151,90,0.35);
    transform: rotate(45deg);
  }

  .footer-legal {
    font-family: '', serif;
    font-size: 8px;
    letter-spacing: 3px;
    color: rgba(240,234,224,0.15);
  }

  @media (max-width: 1100px) {
    .footer-main { grid-template-columns: 1fr 1fr; gap: 48px; }
    .footer-band-ornament { display: none; }
  }
  @media (max-width: 900px) {
    .footer-inner { padding: 0 40px; }
    .footer-brand-band { flex-wrap: wrap; }
  }
  @media (max-width: 640px) {
    .footer-inner { padding: 0 24px; }
    .footer-main { grid-template-columns: 1fr; gap: 40px; }
    .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
    .footer-socials { display: none; }
  }
`;

export default function Footer() {
  return (
    <>
      <style>{styles}</style>
      <footer className="footer">
        <div className="footer-glow" />
        <div className="footer-noise" />

        <div className="footer-inner">
          {/* ── Brand band ── */}
          <div className="footer-brand-band">
            <div className="footer-logo-wrap">
              <img
                src="/tact.png"
                alt="Tact Innovations"
                className="footer-logo"
                loading="lazy" // ← add this
                width="160"
                height="36"
              />
              <div className="footer-logo-divider" />
              <div className="footer-logo-sub">
                Design &amp; General
                <br />
                Contracting
              </div>
            </div>

            <div className="footer-band-ornament">
              <div className="footer-band-line" />
              <div className="footer-band-diamond" />
              <div className="footer-band-line-r" />
            </div>

            {/* Social icons */}
            <div className="footer-socials">
              {/* LinkedIn */}
              <a href="#" className="footer-social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line
                    x1="17.5"
                    y1="6.5"
                    x2="17.51"
                    y2="6.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="#" className="footer-social-link" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Main columns ── */}
          <div className="footer-main">
            {/* About */}
            <div>
              <div className="footer-col-rule" />
              <p className="footer-tagline">
                Crafting extraordinary spaces with precision, vision, and
                enduring quality — transforming architectural dreams into
                lasting legacies since 2025.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p className="footer-col-title">Navigation</p>
              <ul className="footer-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/ThreeDprojects">3D Projects</Link>
                </li>
                <li>
                  <Link to="/OnGroundProejcts">On Ground Projects</Link>
                </li>
                <li>
                  <Link to="/Transportation">
                    Transportation &amp; Supplies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <p className="footer-col-title">Services</p>
              <ul className="footer-links">
                <li>
                  <a href="#">Architecture Design</a>
                </li>
                <li>
                  <a href="#">Interior Finishing</a>
                </li>
                <li>
                  <a href="#">General Contracting</a>
                </li>
                <li>
                  <a href="#">Facilities Management</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="footer-col-title">Contact</p>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Location</span>
                <span className="footer-contact-value">
                  52, Street 6, 1st District, 5th Settlement, New cairo
                </span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Email</span>
                <a
                  href="mailto:Info@tactinnovations.com"
                  className="footer-contact-value"
                >
                  Info@tactinnovations.com
                </a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Phone</span>
                <a
                  href="tel:01559193996"
                  target="_blank"
                  className="footer-contact-value"
                >
                  +20 155 9193 996
                </a>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="footer-bottom">
            <p className="footer-copy">
              © {new Date().getFullYear()} Tact Innovations Design &amp; General
              Contracting
            </p>
            <div className="footer-bottom-ornament">
              <div className="footer-bottom-line" />
              <div className="footer-bottom-dot" />
            </div>
            <p className="footer-legal">All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
}
