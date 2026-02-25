import React, { useRef, useEffect, useState } from "react";

// ─── STYLES ───────────────────────────────────────────────────────────────────

export const ogStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cormorant+SC:wght@300;400&family=EB+Garamond:ital,wght@0,400;1,400&family=Raleway:wght@300;400;500;600;700&display=swap');

  /* ── PAGE ── */
  .og-page {
    background: #04070A;
    min-height: 100vh;
  }

  /* ── HERO ── */
  .og-hero {
    position: relative;
    height: 60vh;
    min-height: 460px;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    background: #030507;
  }
  .og-hero-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, rgba(3,5,7,0.97) 0%, rgba(3,5,7,0.6) 55%, rgba(3,5,7,0.25) 100%),
      linear-gradient(to bottom, rgba(3,5,7,0.3) 0%, transparent 40%, rgba(3,5,7,0.95) 100%),
      url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1900&q=88&fit=crop&crop=center');
    background-size: cover;
    background-position: center 35%;
    transition: transform 2.4s cubic-bezier(0.16,1,0.3,1), opacity 2s ease;
  }
  .og-hero-bg.loading { transform: scale(1.08); opacity: 0; }
  .og-hero-bg.loaded  { transform: scale(1);   opacity: 1; }

  .og-hero-noise {
    position: absolute; inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  .og-hero-vrule {
    position: absolute;
    right: 80px; top: 50%;
    transform: translateY(-50%);
    width: 1px; height: 0;
    background: linear-gradient(to bottom, transparent, #B8975A, transparent);
    transition: height 1.4s cubic-bezier(0.16,1,0.3,1) 0.9s;
    z-index: 3;
  }
  .og-hero-vrule.loaded { height: 200px; }

  .og-hero-content {
    position: relative; z-index: 2;
    max-width: 1380px; margin: 0 auto;
    width: 100%;
    padding: 0 60px 80px;
    opacity: 0; transform: translateY(24px);
    transition: opacity 1s ease 0.6s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.6s;
  }
  .og-hero-content.loaded { opacity: 1; transform: translateY(0); }

  .og-hero-eyebrow {
    font-family: 'Raleway', sans-serif;
    font-size: 9px; font-weight: 600;
    letter-spacing: 7px; text-transform: uppercase;
    color: #B8975A;
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 20px;
  }
  .og-hero-eyebrow::before {
    content: ''; width: 32px; height: 1px;
    background: #B8975A; flex-shrink: 0;
  }

  .og-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 5.5vw, 76px);
    font-weight: 300;
    color: #F0EAE0;
    line-height: 1.02;
    letter-spacing: -1px;
    margin: 0 0 24px 0;
  }
  .og-hero-title em { font-style: italic; color: #C4A464; }

  .og-hero-sub {
    font-family: 'EB Garamond', serif;
    font-size: clamp(14px, 1.2vw, 16px);
    font-style: italic;
    color: rgba(240,234,224,0.4);
    letter-spacing: 0.5px;
  }

  .og-hero-fade {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 80px;
    background: linear-gradient(to bottom, transparent, #04070A);
    pointer-events: none; z-index: 2;
  }

  /* ── PROJECT SECTIONS ── */
  .og-section {
    padding: 100px 60px;
    border-bottom: 1px solid rgba(184,151,90,0.06);
    position: relative;
    overflow: hidden;
  }
  .og-section:last-of-type { border-bottom: none; }

  .og-section:nth-child(even)::after {
    content: '';
    position: absolute;
    top: 50%; right: -100px;
    transform: translateY(-50%);
    width: 500px; height: 500px;
    background: radial-gradient(ellipse, rgba(184,151,90,0.04) 0%, transparent 70%);
    pointer-events: none;
  }
  .og-section:nth-child(odd)::before {
    content: '';
    position: absolute;
    top: 50%; left: -100px;
    transform: translateY(-50%);
    width: 400px; height: 400px;
    background: radial-gradient(ellipse, rgba(184,151,90,0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  .og-inner {
    max-width: 1380px; margin: 0 auto;
    position: relative; z-index: 1;
  }

  .og-section-header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: start;
    gap: 40px;
    margin-bottom: 52px;
  }

  .og-index-badge {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    padding-top: 6px;
    flex-shrink: 0;
  }
  .og-index-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(48px, 6vw, 80px);
    font-weight: 300;
    color: rgba(184,151,90,0.07);
    line-height: 1;
    letter-spacing: -3px;
    transition: color 0.4s;
  }
  .og-section:hover .og-index-num { color: rgba(184,151,90,0.14); }
  .og-index-line {
    width: 40px; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,151,90,0.3));
  }

  .og-label {
    font-family: 'Raleway', sans-serif;
    font-size: 9px; font-weight: 600;
    letter-spacing: 7px; text-transform: uppercase;
    color: #B8975A;
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 14px;
  }
  .og-label::before {
    content: ''; width: 24px; height: 1px;
    background: #B8975A; flex-shrink: 0;
  }

  .og-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(26px, 3.2vw, 48px);
    font-weight: 400;
    color: #F0EAE0;
    line-height: 1.1;
    margin: 0 0 22px 0;
    letter-spacing: -0.3px;
  }
  .og-title em { font-style: italic; color: #C4A464; }

  .og-status-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 22px;
  }
  .og-status-tag {
    font-family: 'Raleway', sans-serif;
    font-size: 8px;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(184,151,90,0.7);
    border: 1px solid rgba(184,151,90,0.2);
    padding: 6px 14px;
    display: flex; align-items: center; gap: 7px;
    transition: border-color 0.3s, color 0.3s;
  }
  .og-status-tag:hover { border-color: rgba(184,151,90,0.5); color: #C4A464; }
  .og-status-tag::before {
    content: ''; width: 4px; height: 4px;
    border-radius: 50%; background: #B8975A;
    flex-shrink: 0;
  }

  .og-ornament {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 18px;
  }
  .og-ornament-line { width: 32px; height: 1px; background: linear-gradient(90deg, #B8975A, transparent); }
  .og-ornament-dot { width: 4px; height: 4px; background: rgba(184,151,90,0.45); transform: rotate(45deg); flex-shrink: 0; }

  .og-desc {
    font-family: 'EB Garamond', serif;
    font-size: clamp(15px, 1.15vw, 17px);
    font-style: italic;
    line-height: 2.05;
    color: rgba(240,234,224,0.46);
    max-width: 640px;
  }

  /* ── GALLERY LAYOUTS ── */
  .og-gallery-3 {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 14px;
  }
  .og-gallery-3 .og-img-wrap:first-child { grid-row: 1 / 3; }

  .og-gallery-4 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 14px;
  }
  .og-gallery-4 .og-img-wrap:last-child { grid-column: 1 / 4; }

  .og-gallery-6 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  /* Image wrapper */
  .og-img-wrap {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: #0c1015;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
  }
  .og-img-wrap.visible { opacity: 1; transform: translateY(0); }

  .og-img-wrap::after {
    content: '';
    position: absolute; inset: 0;
    background: rgba(3,5,7,0.28);
    transition: background 0.45s ease;
    z-index: 1;
  }
  .og-img-wrap:hover::after { background: rgba(3,5,7,0.0); }

  .og-img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transform: scale(1.05);
    transition: transform 0.75s cubic-bezier(0.16,1,0.3,1);
    min-height: 200px;
  }
  .og-gallery-3 .og-img-wrap:first-child .og-img { min-height: 400px; }
  .og-gallery-3 .og-img { min-height: 190px; }
  .og-gallery-4 .og-img { min-height: 240px; aspect-ratio: 4/3; }
  .og-gallery-4 .og-img-wrap:last-child .og-img { min-height: 200px; aspect-ratio: 21/9; }
  .og-gallery-6 .og-img { min-height: 220px; aspect-ratio: 4/3; }

  .og-img-wrap:hover .og-img { transform: scale(1); }

  .og-img-sweep {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #B8975A, transparent);
    transform: scaleX(0);
    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
    z-index: 2;
  }
  .og-img-wrap:hover .og-img-sweep { transform: scaleX(1); }

  .og-img-expand {
    position: absolute;
    top: 14px; right: 14px;
    z-index: 3;
    width: 32px; height: 32px;
    background: rgba(3,5,7,0.65);
    border: 1px solid rgba(184,151,90,0.4);
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
    opacity: 0; transform: scale(0.6) rotate(-45deg);
    transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .og-img-expand svg { width: 12px; height: 12px; stroke: #B8975A; stroke-width: 1.5; fill: none; }
  .og-img-wrap:hover .og-img-expand { opacity: 1; transform: scale(1) rotate(0deg); }

  /* ── LIGHTBOX ── */
  .og-lightbox {
    position: fixed; inset: 0;
    z-index: 9999;
    background: rgba(2,4,6,0.97);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    opacity: 0; pointer-events: none;
    transition: opacity 0.35s ease;
  }
  .og-lightbox.open { opacity: 1; pointer-events: all; }

  .og-lightbox-img-wrap {
    position: relative;
    display: flex; align-items: center; justify-content: center;
    max-width: 88vw; max-height: 80vh;
  }
  .og-lightbox-img { max-width: 88vw; max-height: 80vh; object-fit: contain; display: block; }

  .og-lightbox-img-wrap::before,
  .og-lightbox-img-wrap::after {
    content: '';
    position: absolute;
    width: 28px; height: 28px;
    border-color: rgba(184,151,90,0.4);
    border-style: solid;
    pointer-events: none;
  }
  .og-lightbox-img-wrap::before { top: -10px; left: -10px; border-width: 1px 0 0 1px; }
  .og-lightbox-img-wrap::after  { bottom: -10px; right: -10px; border-width: 0 1px 1px 0; }

  .og-lightbox-bar {
    display: flex; align-items: center; gap: 20px;
    margin-top: 28px;
  }
  .og-lightbox-btn {
    background: none;
    border: 1px solid rgba(184,151,90,0.25);
    width: 44px; height: 44px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.3s, background 0.3s;
  }
  .og-lightbox-btn:hover { border-color: #B8975A; background: rgba(184,151,90,0.08); }
  .og-lightbox-btn svg { width: 16px; height: 16px; stroke: #B8975A; stroke-width: 1.5; fill: none; }
  .og-lightbox-counter {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px; font-weight: 300;
    color: rgba(184,151,90,0.5);
    min-width: 60px; text-align: center;
    letter-spacing: 2px;
  }
  .og-lightbox-close {
    position: absolute;
    top: 24px; right: 32px;
    background: none;
    border: 1px solid rgba(184,151,90,0.25);
    width: 42px; height: 42px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.3s, background 0.3s;
  }
  .og-lightbox-close:hover { border-color: #B8975A; background: rgba(184,151,90,0.08); }
  .og-lightbox-close svg { width: 14px; height: 14px; stroke: #B8975A; stroke-width: 1.5; fill: none; }

  /* ── SCROLL REVEAL ── */
  .og-reveal {
    opacity: 0; transform: translateY(28px);
    transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.16,1,0.3,1);
  }
  .og-reveal.visible { opacity: 1; transform: translateY(0); }

  @media (max-width: 1024px) {
    .og-section { padding: 80px 40px; }
    .og-gallery-4 { grid-template-columns: 1fr 1fr; }
    .og-gallery-4 .og-img-wrap:last-child { grid-column: 1 / 3; }
    .og-gallery-6 { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 640px) {
    .og-section { padding: 64px 20px; }
    .og-hero-content { padding: 0 24px 60px; }
    .og-section-header { grid-template-columns: 1fr; }
    .og-index-badge { display: none; }
    .og-gallery-3,
    .og-gallery-4,
    .og-gallery-6 { grid-template-columns: 1fr; }
    .og-gallery-3 .og-img-wrap:first-child { grid-row: auto; }
    .og-gallery-4 .og-img-wrap:last-child { grid-column: 1; }
    .og-lightbox-btn { width: 36px; height: 36px; }
    .og-hero-vrule { display: none; }
  }
`;

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface StatusTag {
  label: string;
}
export interface OGProject {
  title: string;
  label: string;
  description?: string;
  status: StatusTag[];
  images: string[];
}

// ─── HOOKS ────────────────────────────────────────────────────────────────────

export function useReveal(delay = 0) {
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

export function useGalleryReveal(count: number) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add("visible"), i * 80);
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

interface LightboxProps {
  images: string[];
  current: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function OGLightbox({
  images,
  current,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
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
      className={`og-lightbox${current !== null ? " open" : ""}`}
      onClick={onClose}
    >
      <button className="og-lightbox-close" onClick={onClose}>
        <svg viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      {current !== null && (
        <div
          className="og-lightbox-img-wrap"
          onClick={(e) => e.stopPropagation()}
        >
          <img className="og-lightbox-img" src={images[current]} alt="" />
        </div>
      )}
      <div className="og-lightbox-bar" onClick={(e) => e.stopPropagation()}>
        <button className="og-lightbox-btn" onClick={onPrev}>
          <svg viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="og-lightbox-counter">
          {current !== null
            ? `${String(current + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`
            : ""}
        </span>
        <button className="og-lightbox-btn" onClick={onNext}>
          <svg viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────

interface GalleryProps {
  images: string[];
  onOpen: (i: number) => void;
}

export function OGGallery({ images, onOpen }: GalleryProps) {
  const count = images.length;
  const galleryRefs = useGalleryReveal(count);
  const cls =
    count === 3
      ? "og-gallery-3"
      : count === 4
        ? "og-gallery-4"
        : "og-gallery-6";

  return (
    <div className={cls}>
      {images.map((src, i) => (
        <div
          key={i}
          className="og-img-wrap"
          ref={(el) => {
            galleryRefs.current[i] = el;
          }}
          onClick={() => onOpen(i)}
        >
          <img className="og-img" src={src} alt="" loading="lazy" />
          <div className="og-img-sweep" />
          <div className="og-img-expand">
            <svg viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
