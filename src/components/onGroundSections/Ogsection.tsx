import React, { useState } from "react";
import { type OGProject, OGLightbox, OGGallery, useReveal } from "./Ogshared";

interface OGSectionProps {
  project: OGProject;
  index: number;
}

export default function OGSection({ project, index }: OGSectionProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const headerRef = useReveal(0);
  const galleryRef = useReveal(120);

  const numStr = String(index).padStart(2, "0");
  const words = project.title.split(" ");
  const mainWords = words.slice(0, -1).join(" ");
  const lastWord = words[words.length - 1];

  return (
    <>
      <section className="og-section">
        <div className="og-inner">
          {/* ── Header ── */}
          <div className="og-reveal" ref={headerRef}>
            <div className="og-section-header">
              <div>
                <p className="og-label">{project.label}</p>
                <h2 className="og-title">
                  {mainWords} <em>{lastWord}</em>
                </h2>
                <div className="og-status-row">
                  {project.status.map((s:any, i:any) => (
                    <span className="og-status-tag" key={i}>
                      {s.label}
                    </span>
                  ))}
                </div>
                {project.description && (
                  <>
                    <div className="og-ornament">
                      <div className="og-ornament-line" />
                      <div className="og-ornament-dot" />
                    </div>
                    <p className="og-desc">{project.description}</p>
                  </>
                )}
              </div>
              <div className="og-index-badge">
                <div className="og-index-num">{numStr}</div>
                <div className="og-index-line" />
              </div>
            </div>
          </div>

          {/* ── Gallery ── */}
          <div
            className="og-reveal"
            ref={galleryRef}
            style={{ transitionDelay: "0.15s" }}
          >
            <OGGallery images={project.images} onOpen={setLightboxIdx} />
          </div>
        </div>
      </section>

      <OGLightbox
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
