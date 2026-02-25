import React, { useState, useRef, useEffect } from "react";

export const projectSectionStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cormorant+SC:wght@300;400&family=EB+Garamond:ital,wght@0,400;1,400&family=Raleway:wght@300;400;500;600;700&display=swap');

  /* ── PROJECT SECTION ── */
  .proj-section {
    background: #05080A;
    padding: 120px 60px;
    border-bottom: 1px solid rgba(184,151,90,0.07);
    position: relative;
    overflow: hidden;
  }
  .proj-section:last-child { border-bottom: none; }

  .proj-inner {
    max-width: 1380px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* Ambient glow per section */
  .proj-section::before {
    content: '';
    position: absolute;
    top: -100px; left: -100px;
    width: 500px; height: 400px;
    background: radial-gradient(ellipse, rgba(184,151,90,0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── Section number track ── */
  .proj-header {
    display: flex;
    align-items: flex-start;
    gap: 40px;
    margin-bottom: 56px;
  }

  .proj-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(60px, 8vw, 100px);
    font-weight: 300;
    color: rgba(184,151,90,0.08);
    line-height: 0.85;
    letter-spacing: -4px;
    flex-shrink: 0;
    user-select: none;
    transition: color 0.4s ease;
  }
  .proj-section:hover .proj-num {
    color: rgba(184,151,90,0.13);
  }

  .proj-header-content { flex: 1; padding-top: 8px; }

  .proj-label {
    font-family: 'Raleway', sans-serif;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 7px;
    text-transform: uppercase;
    color: #B8975A;
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 16px;
  }
  .proj-label::before {
    content: '';
    width: 28px; height: 1px;
    background: #B8975A;
    flex-shrink: 0;
  }

  .proj-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 3.5vw, 52px);
    font-weight: 400;
    color: #F0EAE0;
    line-height: 1.1;
    letter-spacing: -0.3px;
    margin: 0 0 20px 0;
  }
  .proj-title em {
    font-style: italic;
    color: #C4A464;
  }

  .proj-ornament {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  .proj-ornament-line {
    width: 36px; height: 1px;
    background: linear-gradient(90deg, #B8975A, transparent);
  }
  .proj-ornament-diamond {
    width: 4px; height: 4px;
    background: rgba(184,151,90,0.5);
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  .proj-desc {
    font-family: 'EB Garamond', serif;
    font-size: clamp(15px, 1.2vw, 17px);
    font-style: italic;
    line-height: 2;
    color: rgba(240,234,224,0.48);
    max-width: 680px;
  }

  /* ── GALLERY LAYOUTS ── */

  /* 2-image: side by side, 2:3 ratio */
  .proj-gallery-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  /* 4-image: 2x2 */
  .proj-gallery-4 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  /* 6-image: featured first (large) + 5 smaller */
  .proj-gallery-6 {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 16px;
  }
  .proj-gallery-6 .proj-img-wrap:first-child {
    grid-row: 1 / 3;
  }

  /* Image wrapper */
  .proj-img-wrap {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: #0d1014;
  }

  .proj-img-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(3,5,7,0.3);
    transition: background 0.4s ease;
    z-index: 1;
  }
  .proj-img-wrap:hover::after {
    background: rgba(3,5,7,0.0);
  }

  .proj-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transform: scale(1.04);
    transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
    min-height: 220px;
  }
  .proj-gallery-2 .proj-img { min-height: 360px; aspect-ratio: 2/3; }
  .proj-gallery-4 .proj-img { min-height: 260px; }
  .proj-gallery-6 .proj-img-wrap:first-child .proj-img { min-height: 500px; aspect-ratio: auto; }
  .proj-gallery-6 .proj-img { min-height: 220px; }

  .proj-img-wrap:hover .proj-img {
    transform: scale(1);
  }

  /* Gold border reveal on hover */
  .proj-img-border {
    position: absolute;
    inset: 0;
    border: 1px solid rgba(184,151,90,0);
    transition: border-color 0.4s ease;
    z-index: 2;
    pointer-events: none;
  }
  .proj-img-wrap:hover .proj-img-border {
    border-color: rgba(184,151,90,0.3);
  }

  /* Expand icon */
  .proj-img-expand {
    position: absolute;
    bottom: 16px; right: 16px;
    z-index: 3;
    width: 36px; height: 36px;
    border: 1px solid rgba(184,151,90,0.5);
    display: flex; align-items: center; justify-content: center;
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.3s ease, transform 0.3s ease;
    background: rgba(3,5,7,0.6);
  }
  .proj-img-expand svg {
    width: 14px; height: 14px;
    stroke: #B8975A;
    stroke-width: 1.5;
    fill: none;
  }
  .proj-img-wrap:hover .proj-img-expand {
    opacity: 1;
    transform: scale(1);
  }

  /* ── LIGHTBOX ── */
  .proj-lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(3,5,7,0.97);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s ease;
  }
  .proj-lightbox.open {
    opacity: 1;
    pointer-events: all;
  }
  .proj-lightbox-img {
    max-width: 90vw;
    max-height: 88vh;
    object-fit: contain;
    display: block;
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .proj-lightbox-close {
    position: absolute;
    top: 28px; right: 36px;
    background: none;
    border: 1px solid rgba(184,151,90,0.3);
    width: 44px; height: 44px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.3s, background 0.3s;
  }
  .proj-lightbox-close:hover {
    border-color: #B8975A;
    background: rgba(184,151,90,0.08);
  }
  .proj-lightbox-close svg {
    width: 16px; height: 16px;
    stroke: #B8975A; stroke-width: 1.5; fill: none;
  }
  .proj-lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: 1px solid rgba(184,151,90,0.25);
    width: 50px; height: 50px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.3s, background 0.3s;
  }
  .proj-lightbox-nav:hover {
    border-color: #B8975A;
    background: rgba(184,151,90,0.08);
  }
  .proj-lightbox-nav svg {
    width: 18px; height: 18px;
    stroke: #B8975A; stroke-width: 1.5; fill: none;
  }
  .proj-lightbox-prev { left: 28px; }
  .proj-lightbox-next { right: 28px; }
  .proj-lightbox-counter {
    position: absolute;
    bottom: 28px; left: 50%;
    transform: translateX(-50%);
    font-family: 'Raleway', sans-serif;
    font-size: 10px;
    letter-spacing: 4px;
    color: rgba(184,151,90,0.5);
  }

  /* ── SCROLL REVEAL ── */
  .proj-reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1);
  }
  .proj-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 1024px) {
    .proj-section { padding: 90px 40px; }
    .proj-gallery-6 {
      grid-template-columns: 1fr 1fr;
    }
    .proj-gallery-6 .proj-img-wrap:first-child {
      grid-column: 1 / 3;
      grid-row: 1;
    }
  }
  @media (max-width: 640px) {
    .proj-section { padding: 70px 20px; }
    .proj-header { gap: 20px; }
    .proj-gallery-2,
    .proj-gallery-4,
    .proj-gallery-6 {
      grid-template-columns: 1fr;
    }
    .proj-gallery-6 .proj-img-wrap:first-child {
      grid-column: 1;
    }
    .proj-num { font-size: 52px; }
    .proj-lightbox-prev { left: 10px; }
    .proj-lightbox-next { right: 10px; }
  }
`;

// ── Types ──
export interface ProjectSectionProps {
  index: number;
  title: string;
  label?: string;
  description?: string;
  images: string[];
}

// ── Lightbox ──
function Lightbox({
  images,
  current,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  current: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className={`proj-lightbox${current !== null ? " open" : ""}`}
      onClick={onClose}
    >
      <button className="proj-lightbox-close" onClick={onClose}>
        <svg viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      {current !== null && (
        <img
          className="proj-lightbox-img"
          src={images[current]}
          alt=""
          onClick={(e) => e.stopPropagation()}
        />
      )}
      <button
        className="proj-lightbox-nav proj-lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        <svg viewBox="0 0 24 24">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="proj-lightbox-nav proj-lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        <svg viewBox="0 0 24 24">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <span className="proj-lightbox-counter">
        {current !== null ? `${current + 1} / ${images.length}` : ""}
      </span>
    </div>
  );
}

// ── Scroll reveal hook ──
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-60px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Image grid ──
function Gallery({
  images,
  onOpen,
}: {
  images: string[];
  onOpen: (i: number) => void;
}) {
  const count = images.length;
  const cls =
    count === 2
      ? "proj-gallery-2"
      : count === 4
        ? "proj-gallery-4"
        : "proj-gallery-6";

  return (
    <div className={cls}>
      {images.map((src, i) => (
        <div className="proj-img-wrap" key={i} onClick={() => onOpen(i)}>
          <img className="proj-img" src={src} alt="" loading="lazy" />
          <div className="proj-img-border" />
          <div className="proj-img-expand">
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

// ── Main exported component ──
export default function ProjectSection({
  index,
  title,
  label,
  description,
  images,
}: ProjectSectionProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const headerRef = useReveal();
  const galleryRef = useReveal();

  const numStr = String(index).padStart(2, "0");

  // Split title at last word for italic styling
  const words = title.split(" ");
  const mainTitle = words.slice(0, -1).join(" ");
  const lastWord = words[words.length - 1];

  return (
    <>
      <section className="proj-section">
        <div className="proj-inner">
          <div className="proj-reveal" ref={headerRef}>
            <div className="proj-header">
              <div className="proj-num" aria-hidden="true">
                {numStr}
              </div>
              <div className="proj-header-content">
                <p className="proj-label">{label || "3D Visualization"}</p>
                <h2 className="proj-title">
                  {mainTitle} <em>{lastWord}</em>
                </h2>
                {description && (
                  <>
                    <div className="proj-ornament">
                      <div className="proj-ornament-line" />
                      <div className="proj-ornament-diamond" />
                    </div>
                    <p className="proj-desc">{description}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            className="proj-reveal"
            ref={galleryRef}
            style={{ transitionDelay: "0.15s" }}
          >
            <Gallery images={images} onOpen={setLightboxIdx} />
          </div>
        </div>
      </section>

      <Lightbox
        images={images}
        current={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onPrev={() =>
          setLightboxIdx((i) =>
            i !== null ? (i - 1 + images.length) % images.length : 0,
          )
        }
        onNext={() =>
          setLightboxIdx((i) => (i !== null ? (i + 1) % images.length : 0))
        }
      />
    </>
  );
}
