import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const styles = `
  /* ── NAVBAR ── */
  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    padding: 32px 60px;
    transition: padding 0.6s cubic-bezier(0.16,1,0.3,1),
                background 0.6s ease,
                backdrop-filter 0.6s ease,
                border-color 0.6s ease;
    border-bottom: 1px solid transparent;
  }
  .navbar.scrolled {
    padding: 18px 60px;
    background: rgba(3,5,7,0.92);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom-color: rgba(184,151,90,0.1);
  }

  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1380px;
    margin: 0 auto;
  }

  /* ── LOGO ── */
  .navbar-logo {
    display: flex;
    align-items: center;
    gap: 14px;
    text-decoration: none;
    flex-shrink: 0;
  }
  .navbar-logo img {
    height: 40px;
    width: auto;
    filter: brightness(0) invert(1);
    opacity: 0.88;
    transition: height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.3s;
  }
  .navbar.scrolled .navbar-logo img { height: 32px; }
  .navbar-logo:hover img { opacity: 1; }

  .navbar-logo-sep {
    width: 1px;
    height: 28px;
    background: linear-gradient(to bottom, transparent, rgba(184,151,90,0.4), transparent);
    flex-shrink: 0;
    transition: height 0.5s;
  }
  .navbar.scrolled .navbar-logo-sep { height: 22px; }

  .navbar-logo-text {
    font-family: 'Raleway', sans-serif;
    font-size: 8px;
    font-weight: 400;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(184,151,90,0.55);
    line-height: 1.7;
    transition: opacity 0.3s;
  }
  .navbar-logo:hover .navbar-logo-text { color: rgba(184,151,90,0.8); }

  /* ── DESKTOP LINKS ── */
  .navbar-links {
    display: flex;
    align-items: center;
    gap: 10px;
    list-style: none;
    margin: 0; padding: 0;
  }

  .navbar-links li a {
    font-family: '', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(240,234,224,0.65);
    text-decoration: none;
    padding: 8px 16px;
    position: relative;
    transition: color 0.35s ease;
    display: block;
  }

  /* Slim underline slides in from left */
  .navbar-links li a::after {
    content: '';
    position: absolute;
    bottom: 2px; left: 16px;
    width: calc(100% - 32px);
    height: 1px;
    background: #B8975A;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
  }

  .navbar-links li a:hover,
  .navbar-links li a.active {
    color: #C4A464;
  }
  .navbar-links li a:hover::after,
  .navbar-links li a.active::after {
    transform: scaleX(1);
  }

  /* ── CTA BUTTON ── */
  .navbar-cta {
    font-family: 'Cormorant SC', sans-serif;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #05080A;
    text-decoration: none;
    padding: 12px 28px;
    background: #B8975A;
    flex-shrink: 0;
    transition: opacity 0.25s ease;
  }
  .navbar-cta:hover {
    opacity: 0.82;
  }

  /* ── HAMBURGER ── */
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 7px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 6px;
  }
  .hamburger span {
    display: block;
    height: 1px;
    background: rgba(184,151,90,0.7);
    transition: width 0.3s ease, transform 0.35s ease, opacity 0.3s ease;
    transform-origin: left center;
  }
  .hamburger span:nth-child(1) { width: 28px; }
  .hamburger span:nth-child(2) { width: 20px; }
  .hamburger span:nth-child(3) { width: 24px; }
  .hamburger.open span:nth-child(1) { transform: rotate(38deg) translateY(-1px); width: 28px; }
  .hamburger.open span:nth-child(2) { opacity: 0; transform: translateX(8px); }
  .hamburger.open span:nth-child(3) { transform: rotate(-38deg) translateY(1px); width: 28px; }

  /* ── MOBILE MENU ── */
  .mobile-menu {
    position: fixed;
    inset: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    overflow: hidden;
  }

  /* Animated overlay panels */
  .mobile-menu-bg {
    position: absolute;
    inset: 0;
    background: #030507;
    transform: translateY(-100%);
    transition: transform 0.65s cubic-bezier(0.16,1,0.3,1);
  }
  .mobile-menu.open .mobile-menu-bg { transform: translateY(0); }
  .mobile-menu.open { pointer-events: all; }

  /* Grain overlay */
  .mobile-menu-noise {
    position: absolute;
    inset: 0;
    opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  /* Decorative vertical lines */
  .mobile-menu-lines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .mobile-menu-vline {
    position: absolute;
    top: 0; bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(184,151,90,0.08), transparent);
  }
  .mobile-menu-vline:nth-child(1) { left: 25%; }
  .mobile-menu-vline:nth-child(2) { left: 50%; background: linear-gradient(to bottom, transparent, rgba(184,151,90,0.12), transparent); }
  .mobile-menu-vline:nth-child(3) { left: 75%; }

  .mobile-menu-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    width: 100%;
    padding: 0 40px;
  }

  /* Label above links */
  .mobile-menu-label {
    font-family: 'Raleway', sans-serif;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: rgba(184,151,90,0.35);
    margin-bottom: 40px;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.4s ease 0.3s, transform 0.4s ease 0.3s;
  }
  .mobile-menu.open .mobile-menu-label { opacity: 1; transform: translateY(0); }

  .mobile-menu-link {
    font-family: 'Raleway', sans-serif;
    font-size: clamp(22px, 5vw, 32px);
    font-weight: 300;
    color: rgba(240,234,224,0.6);
    text-decoration: none;
    letter-spacing: 4px;
    text-transform: uppercase;
    padding: 20px 0;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgba(184,151,90,0.07);
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1), color 0.3s;
  }
  .mobile-menu-link:first-of-type { border-top: 1px solid rgba(184,151,90,0.07); }

  .mobile-menu-link::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 0;
    background: linear-gradient(90deg, rgba(184,151,90,0.06), transparent);
    transition: width 0.4s ease;
  }
  .mobile-menu-link:hover::before { width: 100%; }
  .mobile-menu-link:hover { color: #C4A464; }

  .mobile-menu.open .mobile-menu-link:nth-child(2) { opacity:1; transform:translateY(0); transition-delay: 0.35s; }
  .mobile-menu.open .mobile-menu-link:nth-child(3) { opacity:1; transform:translateY(0); transition-delay: 0.42s; }
  .mobile-menu.open .mobile-menu-link:nth-child(4) { opacity:1; transform:translateY(0); transition-delay: 0.49s; }

  /* Close hint */
  .mobile-menu-close-hint {
    margin-top: 48px;
    font-family: 'Raleway', sans-serif;
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(184,151,90,0.25);
    opacity: 0;
    transition: opacity 0.4s ease 0.55s;
  }
  .mobile-menu.open .mobile-menu-close-hint { opacity: 1; }

  @media (max-width: 900px) {
    .navbar, .navbar.scrolled { padding: 20px 24px; }
    .navbar-links { display: none; }
    .navbar-cta { display: none; }
    .hamburger { display: flex; }
    .navbar-logo-text { display: none; }
    .navbar-logo-sep { display: none; }
  }
`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { label: "3D Projects", path: "/ThreeDprojects" },
    { label: "On Ground Projects", path: "/OnGroundProejcts" },
    { label: "Transportation & Supplies", path: "/Transportation" },
  ];

  return (
    <>
      <style>{styles}</style>

      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <img src="/tact.png" alt="Tact Innovations" />
            <div className="navbar-logo-sep" />
            <div className="navbar-logo-text">
              Design &amp; General
              <br />
              Contracting
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="navbar-links">
            {links.map((l) => (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className={location.pathname === l.path ? "active" : ""}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a href="tel:01559193996" target="_blank"  className="navbar-cta">
            Contact Us
          </a>

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <div className="mobile-menu-bg" />
        <div className="mobile-menu-noise" />
        <div className="mobile-menu-lines">
          <div className="mobile-menu-vline" />
          <div className="mobile-menu-vline" />
          <div className="mobile-menu-vline" />
        </div>

        <div className="mobile-menu-content">
          <p className="mobile-menu-label">Navigation</p>
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className="mobile-menu-link"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <p className="mobile-menu-close-hint">Tap to close</p>
        </div>
      </div>
    </>
  );
}
