import React, { useState, useEffect } from "react";

export default function OGHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);
  const cls = loaded ? "loaded" : "loading";

  return (
    <div className="og-hero">
      <div className={`og-hero-bg ${cls}`} />
      <div className="og-hero-noise" />
      <div className={`og-hero-vrule ${cls}`} />
      <div className={`og-hero-content ${cls}`}>
        <p className="og-hero-eyebrow">Portfolio · Real World</p>
        <h1 className="og-hero-title">
          Projects <em>On Ground</em>
        </h1>
        <p className="og-hero-sub">
          From concept to construction — spaces realized with precision.
        </p>
      </div>
      <div className="og-hero-fade" />
    </div>
  );
}
