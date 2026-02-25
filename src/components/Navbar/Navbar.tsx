import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const styles = `
  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    padding: 28px 60px;
  }
  .navbar.scrolled {
    background: rgba(8, 8, 8, 0.96);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    padding: 18px 60px;
   
  }
  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
  }
  .navbar-logo img {
    height: 44px;
    width: auto;
    filter: brightness(0) invert(1);
    transition: height 0.4s ease;
  }
  .navbar.scrolled .navbar-logo img { height: 36px; }
  .navbar-links {
    display: flex;
    align-items: center;
    gap: 44px;
    list-style: none;
  }
  .navbar-links a {
    font-family: 'Raleway', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(242, 237, 228, 0.70);
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease;
  }
  .navbar-links a::after {
    content: '';
    position: absolute;
    bottom: -5px; left: 0;
    width: 0; height: 2px;
    background: linear-gradient(90deg, #C09A5B, #DDB96E);
    transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .navbar-links a:hover, .navbar-links a.active { color: #DDB96E; }
  .navbar-links a:hover::after, .navbar-links a.active::after { width: 100%; }
  .hamburger {
    display: none; flex-direction: column; gap: 6px;
    cursor: pointer; background: none; border: none; padding: 4px;
  }
  .hamburger span {
    width: 26px; height: 1px; background: #DDB96E;
    transition: all 0.3s; display: block;
  }
  .mobile-menu {
    position: fixed; inset: 0;
    background: rgba(6,6,6,0.98);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 44px; z-index: 999;
    opacity: 0; pointer-events: none;
    transition: opacity 0.4s ease;
  }
  .mobile-menu.open { opacity: 1; pointer-events: all; }
  .mobile-menu a {
    font-family: 'Playfair Display', serif;
    font-size: 30px; font-weight: 400;
    color: rgba(242,237,228,0.80);
    text-decoration: none; letter-spacing: 2px; transition: color 0.3s;
  }
  .mobile-menu a:hover { color: #DDB96E; }
  @media (max-width: 900px) {
    .navbar, .navbar.scrolled { padding: 20px 24px; }
    .navbar-links { display: none; }
    .hamburger { display: flex; }
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
          <Link to="/" className="navbar-logo">
            <img src="/tact.png" alt="Tact Innovations" />
          </Link>
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
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {links.map((l) => (
          <Link key={l.path} to={l.path} onClick={() => setMenuOpen(false)}>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
