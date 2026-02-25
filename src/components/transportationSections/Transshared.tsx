import React, { useRef, useEffect, useState } from "react";

// ─── STYLES ───────────────────────────────────────────────────────────────────

export const transStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cormorant+SC:wght@300;400&family=EB+Garamond:ital,wght@0,400;1,400&family=Raleway:wght@300;400;500;600;700&display=swap');

  /* ── PAGE ── */
  .trans-page {
    background: #040608;
    min-height: 100vh;
  }

  /* ── HERO ── */
  .trans-hero {
    position: relative;
    height: 58vh;
    min-height: 440px;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: #030507;
  }
  .trans-hero-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(to bottom, rgba(3,5,7,0.55) 0%, rgba(3,5,7,0.4) 40%, rgba(3,5,7,0.92) 100%),
      linear-gradient(105deg, rgba(3,5,7,0.95) 0%, rgba(3,5,7,0.5) 50%, rgba(3,5,7,0.1) 100%),
      url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1900&q=88&fit=crop&crop=center');
    background-size: cover;
    background-position: center 55%;
    transition: transform 2.4s cubic-bezier(0.16,1,0.3,1), opacity 2s ease;
  }
  .trans-hero-bg.loading { transform: scale(1.08); opacity: 0; }
  .trans-hero-bg.loaded  { transform: scale(1);   opacity: 1; }

  .trans-hero-noise {
    position: absolute; inset: 0; opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  /* Horizontal gold rule — different from other pages */
  .trans-hero-hrule {
    position: absolute;
    bottom: 90px; left: 60px;
    right: 60px;
    height: 1px;
    background: linear-gradient(90deg, rgba(184,151,90,0), rgba(184,151,90,0.22), rgba(184,151,90,0));
    transform: scaleX(0);
    transition: transform 1.2s cubic-bezier(0.16,1,0.3,1) 1s;
    z-index: 3;
  }
  .trans-hero-hrule.loaded { transform: scaleX(1); }

  .trans-hero-content {
    position: relative; z-index: 2;
    max-width: 1380px; margin: 0 auto;
    width: 100%;
    padding: 0 60px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 60px;
    opacity: 0; transform: translateY(24px);
    transition: opacity 1s ease 0.5s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.5s;
  }
  .trans-hero-content.loaded { opacity: 1; transform: translateY(0); }

  .trans-hero-eyebrow {
    font-family: 'Raleway', sans-serif;
    font-size: 9px; font-weight: 600;
    letter-spacing: 7px; text-transform: uppercase;
    color: #B8975A;
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 20px;
  }
  .trans-hero-eyebrow::before {
    content: ''; width: 32px; height: 1px;
    background: #B8975A; flex-shrink: 0;
  }

  .trans-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(34px, 5vw, 70px);
    font-weight: 300;
    color: #F0EAE0;
    line-height: 1.05;
    letter-spacing: -1px;
    margin: 0;
  }
  .trans-hero-title em { font-style: italic; color: #C4A464; display: block; }

  /* Right side badge */
  .trans-hero-badge {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    opacity: 0;
    transition: opacity 0.8s ease 1.1s;
  }
  .trans-hero-badge.loaded { opacity: 1; }
  .trans-hero-badge-line {
    width: 1px; height: 60px;
    background: linear-gradient(to bottom, transparent, rgba(184,151,90,0.4));
  }
  .trans-hero-badge-text {
    font-family: 'Cormorant SC', serif;
    font-size: 8px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: rgba(184,151,90,0.4);
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }
  .trans-hero-badge-line-b {
    width: 1px; height: 60px;
    background: linear-gradient(to bottom, rgba(184,151,90,0.4), transparent);
  }

  .trans-hero-fade {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 100px;
    background: linear-gradient(to bottom, transparent, #040608);
    pointer-events: none; z-index: 2;
  }

  /* ── PROJECT SECTIONS ── */
  .trans-section {
    padding: 120px 60px;
    border-bottom: 1px solid rgba(184,151,90,0.06);
    position: relative;
    overflow: hidden;
  }
  .trans-section:last-of-type { border-bottom: none; }

  .trans-section::before {
    content: '';
    position: absolute;
    bottom: -80px; right: -80px;
    width: 600px; height: 600px;
    background: radial-gradient(ellipse, rgba(184,151,90,0.035) 0%, transparent 65%);
    pointer-events: none;
  }

  .trans-inner {
    max-width: 1380px; margin: 0 auto;
    position: relative; z-index: 1;
  }

  /* Two column layout — text left, index right — but with wider text column */
  .trans-section-header {
    display: grid;
    grid-template-columns: 1fr 160px;
    align-items: start;
    gap: 60px;
    margin-bottom: 60px;
  }

  /* Index — vertical number stack, right-aligned */
  .trans-index-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-top: 4px;
  }
  .trans-index-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 7vw, 96px);
    font-weight: 300;
    color: rgba(184,151,90,0.06);
    line-height: 1;
    letter-spacing: -4px;
    transition: color 0.5s ease;
  }
  .trans-section:hover .trans-index-num { color: rgba(184,151,90,0.12); }
  .trans-index-rule {
    width: 100%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,151,90,0.2));
    margin-top: 8px;
  }
  .trans-index-label {
    font-family: 'Raleway', sans-serif;
    font-size: 7px; font-weight: 600;
    letter-spacing: 4px; text-transform: uppercase;
    color: rgba(184,151,90,0.25);
    margin-top: 8px;
    text-align: right;
  }

  .trans-label {
    font-family: 'Raleway', sans-serif;
    font-size: 9px; font-weight: 600;
    letter-spacing: 7px; text-transform: uppercase;
    color: #B8975A;
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 16px;
  }
  .trans-label::before {
    content: ''; width: 24px; height: 1px;
    background: #B8975A; flex-shrink: 0;
  }

  .trans-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 3.5vw, 52px);
    font-weight: 400;
    color: #F0EAE0;
    line-height: 1.1;
    margin: 0 0 24px 0;
    letter-spacing: -0.5px;
  }
  .trans-title em { font-style: italic; color: #C4A464; }

  /* Status tags — pill style with left border accent */
  .trans-status-row {
    display: flex; flex-wrap: wrap;
    gap: 10px; margin-bottom: 28px;
  }
  .trans-status-tag {
    font-family: 'Raleway', sans-serif;
    font-size: 8px; font-weight: 600;
    letter-spacing: 4px; text-transform: uppercase;
    color: rgba(184,151,90,0.65);
    border: 1px solid rgba(184,151,90,0.18);
    border-left: 2px solid rgba(184,151,90,0.5);
    padding: 7px 14px 7px 12px;
    display: flex; align-items: center; gap: 8px;
    transition: border-color 0.3s, color 0.3s, border-left-color 0.3s;
  }
  .trans-status-tag:hover {
    border-color: rgba(184,151,90,0.35);
    border-left-color: #B8975A;
    color: #C4A464;
  }
  .trans-status-tag svg {
    width: 10px; height: 10px;
    stroke: rgba(184,151,90,0.5); stroke-width: 1.5; fill: none;
    flex-shrink: 0;
  }

  .trans-ornament {
    display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
  }
  .trans-ornament-line { width: 36px; height: 1px; background: linear-gradient(90deg, #B8975A, transparent); }
  .trans-ornament-diamond { width: 4px; height: 4px; background: rgba(184,151,90,0.45); transform: rotate(45deg); flex-shrink: 0; }

  .trans-desc {
    font-family: 'EB Garamond', serif;
    font-size: clamp(15px, 1.2vw, 17px);
    font-style: italic;
    line-height: 2.1;
    color: rgba(240,234,224,0.48);
    max-width: 700px;
  }

  /* ── GALLERY LAYOUTS ── */
  /* 4-image: masonry-style — 2 tall left + 2 right stacked */
  .trans-gallery-4 {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 14px;
  }
  .trans-gallery-4 .trans-img-wrap:first-child {
    grid-row: 1 / 3;
  }

  .trans-gallery-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .trans-gallery-6 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  /* Image wrapper */
  .trans-img-wrap {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: #0b0e12;
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.75s ease, transform 0.75s cubic-bezier(0.16,1,0.3,1);
  }
  .trans-img-wrap.visible { opacity: 1; transform: translateY(0); }

  .trans-img-wrap::after {
    content: '';
    position: absolute; inset: 0;
    background: rgba(3,5,7,0.3);
    transition: background 0.45s ease;
    z-index: 1;
  }
  .trans-img-wrap:hover::after { background: rgba(3,5,7,0); }

  .trans-img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transform: scale(1.05);
    transition: transform 0.75s cubic-bezier(0.16,1,0.3,1);
    min-height: 220px;
  }
  .trans-gallery-4 .trans-img-wrap:first-child .trans-img { min-height: 480px; }
  .trans-gallery-4 .trans-img { min-height: 220px; aspect-ratio: 4/3; }
  .trans-gallery-2 .trans-img { min-height: 360px; aspect-ratio: 3/4; }
  .trans-gallery-6 .trans-img { min-height: 220px; aspect-ratio: 4/3; }

  .trans-img-wrap:hover .trans-img { transform: scale(1); }

  /* Corner bracket hover — different from OG page's bottom sweep */
  .trans-img-corner {
    position: absolute;
    bottom: 12px; left: 12px;
    width: 22px; height: 22px;
    border-left: 1px solid rgba(184,151,90,0);
    border-bottom: 1px solid rgba(184,151,90,0);
    z-index: 2;
    transition: border-color 0.4s ease, width 0.4s ease, height 0.4s ease;
  }
  .trans-img-corner-tr {
    position: absolute;
    top: 12px; right: 12px;
    width: 22px; height: 22px;
    border-right: 1px solid rgba(184,151,90,0);
    border-top: 1px solid rgba(184,151,90,0);
    z-index: 2;
    transition: border-color 0.4s ease 0.08s, width 0.4s ease 0.08s, height 0.4s ease 0.08s;
  }
  .trans-img-wrap:hover .trans-img-corner,
  .trans-img-wrap:hover .trans-img-corner-tr {
    border-color: rgba(184,151,90,0.45);
    width: 30px; height: 30px;
  }

  /* Expand icon */
  .trans-img-expand {
    position: absolute;
    bottom: 14px; right: 14px;
    z-index: 3;
    width: 34px; height: 34px;
    background: rgba(3,5,7,0.7);
    border: 1px solid rgba(184,151,90,0.35);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transform: translateY(6px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .trans-img-expand svg { width: 13px; height: 13px; stroke: #B8975A; stroke-width: 1.5; fill: none; }
  .trans-img-wrap:hover .trans-img-expand { opacity: 1; transform: translateY(0); }

  /* ── LIGHTBOX ── */
  .trans-lightbox {
    position: fixed; inset: 0;
    z-index: 9999;
    background: rgba(2,3,5,0.97);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none;
    transition: opacity 0.35s ease;
  }
  .trans-lightbox.open { opacity: 1; pointer-events: all; }

  .trans-lightbox-stage {
    position: relative;
    display: flex; flex-direction: column;
    align-items: center; gap: 28px;
  }
  .trans-lightbox-img {
    max-width: 88vw; max-height: 78vh;
    object-fit: contain; display: block;
  }

  /* Nav arrows on sides */
  .trans-lightbox-prev,
  .trans-lightbox-next {
    position: absolute;
    top: 50%; transform: translateY(-50%);
    background: none;
    border: 1px solid rgba(184,151,90,0.22);
    width: 48px; height: 48px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.3s, background 0.3s;
  }
  .trans-lightbox-prev { left: -80px; }
  .trans-lightbox-next { right: -80px; }
  .trans-lightbox-prev:hover,
  .trans-lightbox-next:hover { border-color: #B8975A; background: rgba(184,151,90,0.08); }
  .trans-lightbox-prev svg,
  .trans-lightbox-next svg { width: 16px; height: 16px; stroke: #B8975A; stroke-width: 1.5; fill: none; }

  .trans-lightbox-footer {
    display: flex; align-items: center; gap: 16px;
  }
  .trans-lightbox-counter {
    font-family: 'Raleway', sans-serif;
    font-size: 9px; font-weight: 500; letter-spacing: 5px;
    color: rgba(184,151,90,0.45); text-transform: uppercase;
  }
  .trans-lightbox-dot {
    width: 3px; height: 3px; border-radius: 50%;
    background: rgba(184,151,90,0.3); flex-shrink: 0;
  }

  .trans-lightbox-close {
    position: absolute;
    top: 24px; right: 32px;
    background: none;
    border: 1px solid rgba(184,151,90,0.22);
    width: 42px; height: 42px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.3s, background 0.3s;
  }
  .trans-lightbox-close:hover { border-color: #B8975A; background: rgba(184,151,90,0.08); }
  .trans-lightbox-close svg { width: 14px; height: 14px; stroke: #B8975A; stroke-width: 1.5; fill: none; }

  /* ── SCROLL REVEAL ── */
  .trans-reveal {
    opacity: 0; transform: translateY(28px);
    transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.16,1,0.3,1);
  }
  .trans-reveal.visible { opacity: 1; transform: translateY(0); }

  @media (max-width: 1024px) {
    .trans-section { padding: 80px 40px; }
    .trans-section-header { grid-template-columns: 1fr; }
    .trans-index-wrap { display: none; }
    .trans-gallery-4 {
      grid-template-columns: 1fr 1fr;
    }
    .trans-gallery-4 .trans-img-wrap:first-child { grid-row: auto; grid-column: 1 / 3; }
    .trans-gallery-6 { grid-template-columns: 1fr 1fr; }
    .trans-lightbox-prev { left: -60px; }
    .trans-lightbox-next { right: -60px; }
  }
  @media (max-width: 640px) {
    .trans-section { padding: 64px 20px; }
    .trans-hero-content { padding: 0 24px; grid-template-columns: 1fr; }
    .trans-hero-badge { display: none; }
    .trans-gallery-4,
    .trans-gallery-2,
    .trans-gallery-6 { grid-template-columns: 1fr; }
    .trans-gallery-4 .trans-img-wrap:first-child { grid-column: 1; }
    .trans-hero-hrule { display: none; }
    .trans-lightbox-prev { left: 10px; }
    .trans-lightbox-next { right: 10px; }
  }
`;

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface TransStatusTag {
  label: string;
  icon?: string;
}
export interface TransProject {
  title: string;
  label: string;
  description?: string;
  status: TransStatusTag[];
  images: string[];
}

// ─── HOOKS ────────────────────────────────────────────────────────────────────

export function useTransReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "-40px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

export function useTransGalleryReveal(count: number) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add("visible"), i * 90);
            obs.disconnect();
          }
        },
        { threshold: 0.05, rootMargin: "-20px" },
      );
      obs.observe(el);
    });
  }, [count]);
  return refs;
}

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────

interface TransLightboxProps {
  images: string[];
  current: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function TransLightbox({
  images,
  current,
  onClose,
  onPrev,
  onNext,
}: TransLightboxProps) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className={`trans-lightbox${current !== null ? " open" : ""}`}
      onClick={onClose}
    >
      <button className="trans-lightbox-close" onClick={onClose}>
        <svg viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      {current !== null && (
        <div
          className="trans-lightbox-stage"
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ position: "relative" }}>
            <img className="trans-lightbox-img" src={images[current]} alt="" />
            <button className="trans-lightbox-prev" onClick={onPrev}>
              <svg viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className="trans-lightbox-next" onClick={onNext}>
              <svg viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
          <div className="trans-lightbox-footer">
            <span className="trans-lightbox-counter">Image</span>
            <div className="trans-lightbox-dot" />
            <span className="trans-lightbox-counter">
              {String(current + 1).padStart(2, "0")} of{" "}
              {String(images.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────

interface TransGalleryProps {
  images: string[];
  onOpen: (i: number) => void;
}

export function TransGallery({ images, onOpen }: TransGalleryProps) {
  const count = images.length;
  const galleryRefs = useTransGalleryReveal(count);
  const cls =
    count === 2
      ? "trans-gallery-2"
      : count === 4
        ? "trans-gallery-4"
        : "trans-gallery-6";

  return (
    <div className={cls}>
      {images.map((src, i) => (
        <div
          key={i}
          className="trans-img-wrap"
          ref={(el) => {
            galleryRefs.current[i] = el;
          }}
          onClick={() => onOpen(i)}
        >
          <img className="trans-img" src={src} alt="" loading="lazy" />
          <div className="trans-img-corner" />
          <div className="trans-img-corner-tr" />
          <div className="trans-img-expand">
            <svg viewBox="0 0 24 24">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
