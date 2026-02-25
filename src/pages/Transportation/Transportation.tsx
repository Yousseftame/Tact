import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import TransHero from "@/components/transportationSections/Transhero";
import TransSection from "@/components/transportationSections/Transsection";
import { transStyles, type TransProject } from "@/components/transportationSections/Transshared";

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS DATA
// Replace Unsplash URLs with your real image paths:
// e.g. "/images/transportation/hayah-karima/01.jpg"
// ─────────────────────────────────────────────────────────────────────────────

const U = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&fit=crop`;

const projects: TransProject[] = [
  {
    title: "Hayah Karima Caravans",
    label: "Transportation · Social Initiative",
    description:
      "We proudly have played a role in the Hayah Karima initiative by supplying caravans across numerous Egyptian cities. Our commitment to social responsibility drives us to provide high-quality, sustainable solutions that improve the lives of communities in need.",
    status: [
      { label: "Caravans Hayah Karima" },
      { label: "Location: Different Cities" },
    ],
    images: [
      U("photo-1558618666-fcd25c85cd64"),
      U("photo-1601584115197-04ecc0da31d7"),
      U("photo-1519003722824-194d4455a60c"),
      U("photo-1544620347-c4fd4a3d5957"),
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Transportation() {
  return (
    <>
      <style>{transStyles}</style>
      <div className="trans-page">
    
        <TransHero />
        {projects.map((proj, i) => (
          <TransSection key={proj.title} project={proj} index={i + 1} />
        ))}
       
      </div>
    </>
  );
}
