import React, { useState } from "react";
import {
type  TransProject,
  TransLightbox,
  TransGallery,
  useTransReveal,
} from "./Transshared";

interface TransSectionProps {
  project: TransProject;
  index: number;
}

export default function TransSection({ project, index }: TransSectionProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const headerRef = useTransReveal(0);
  const galleryRef = useTransReveal(130);

  const numStr = String(index).padStart(2, "0");
  const words = project.title.split(" ");
  const mainWords = words.slice(0, -1).join(" ");
  const lastWord = words[words.length - 1];

  return (
    <>
      <section className="trans-section">
        <div className="trans-inner">
          {/* ── Header ── */}
          <div className="trans-reveal" ref={headerRef}>
            <div className="trans-section-header">
              {/* Left: content */}
              <div>
                <p className="trans-label">{project.label}</p>
                <h2 className="trans-title">
                  {mainWords} <em>{lastWord}</em>
                </h2>

                <div className="trans-status-row">
                  {project.status.map((s:any, i:any) => (
                    <span className="trans-status-tag" key={i}>
                      {/* Location pin icon */}
                      <svg viewBox="0 0 24 24">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {s.label}
                    </span>
                  ))}
                </div>

                {project.description && (
                  <>
                    <div className="trans-ornament">
                      <div className="trans-ornament-line" />
                      <div className="trans-ornament-diamond" />
                    </div>
                    <p className="trans-desc">{project.description}</p>
                  </>
                )}
              </div>

              {/* Right: index */}
              <div className="trans-index-wrap">
                <div className="trans-index-num">{numStr}</div>
                <div className="trans-index-rule" />
                <div className="trans-index-label">Project</div>
              </div>
            </div>
          </div>

          {/* ── Gallery ── */}
          <div
            className="trans-reveal"
            ref={galleryRef}
            style={{ transitionDelay: "0.15s" }}
          >
            <TransGallery images={project.images} onOpen={setLightboxIdx} />
          </div>
        </div>
      </section>

      <TransLightbox
        images={project.images}
        current={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onPrev={() =>
          setLightboxIdx((i) =>
            i !== null
              ? (i - 1 + project.images.length) % project.images.length
              : 0,
          )
        }
        onNext={() =>
          setLightboxIdx((i) =>
            i !== null ? (i + 1) % project.images.length : 0,
          )
        }
      />
    </>
  );
}
