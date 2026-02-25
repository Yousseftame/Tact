import React, { useState, useEffect } from "react";

export default function TransHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);
  const cls = loaded ? "loaded" : "loading";

  return (
    <div className="trans-hero">
      <div className={`trans-hero-bg ${cls}`} />
      <div className="trans-hero-noise" />
      <div className={`trans-hero-hrule ${cls}`} />

      <div className={`trans-hero-content ${cls}`}>
        {/* Left: title */}
        <div>
          <p className="trans-hero-eyebrow">Portfolio · Logistics</p>
          <h1 className="trans-hero-title">
            Transportation
            <em>&amp; Supplies</em>
          </h1>
        </div>

        {/* Right: vertical badge */}
        <div className={`trans-hero-badge ${cls}`}>
          <div className="trans-hero-badge-line" />
          <span className="trans-hero-badge-text">Tact Innovations</span>
          <div className="trans-hero-badge-line-b" />
        </div>
      </div>

      <div className="trans-hero-fade" />
    </div>
  );
}
