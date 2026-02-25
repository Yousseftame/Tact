import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  ogStyles,
  type OGProject,
} from "@/components/onGroundSections/Ogshared";
import OGHero from "@/components/onGroundSections/Oghero";
import OGSection from "@/components/onGroundSections/Ogsection";

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS DATA
// Replace Unsplash URLs with your real image paths:
// e.g. "/images/projects/imce-2023/01.jpg"
// ─────────────────────────────────────────────────────────────────────────────

const U = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&fit=crop`;

const projects: OGProject[] = [
  {
    title: "IMCE Expo 2023 Ebda Booth",
    label: "Exhibition · Live Build",
    description:
      "Implemented for maximum impact at IMCE, the Ebda Booth featured a functional industrial aesthetic. We optimized space with clean lines and open layouts, creating a dynamic and engaging environment for visitors to explore Ebda's latest innovations.",
    status: [
      { label: "Booth Style: Industrial" },
      { label: "Location: New Cairo" },
      { label: "Year: 2023" },
      { label: "Status: Delivered" },
    ],
    images: [
      U("photo-1540575467063-178a50c2df87"),
      U("photo-1505373877841-8d25f7d46678"),
      U("photo-1511578314322-379afb476865"),
      U("photo-1587825140708-dfaf72ae4b04"),
      U("photo-1475721027785-f74eccf877e2"),
      U("photo-1492684223066-81342ee5ff30"),
    ],
  },
  {
    title: "Hayah Karima",
    label: "Public · Community Initiative",
    status: [
      { label: "Sector: Workspace" },
      { label: "Style: Modern Office" },
      { label: "Status: Delivered" },
    ],
    images: [
      U("photo-1497366216548-37526070297c"),
      U("photo-1497366811353-6870744d04b2"),
      U("photo-1524758631624-e2822e304c36"),
    ],
  },
  {
    title: "Administrative Villa Think",
    label: "Commercial · Office Interior",
    description:
      "We transformed an administrative villa into a modern and inspiring workspace for Think. The design prioritizes collaboration and creativity, with open-plan layouts, flexible workspaces, and designated areas for brainstorming and teamwork.",
    status: [
      { label: "Type: Administrative Villa" },
      { label: "Style: Modern Office" },
      { label: "Location: New Cairo" },
      { label: "Status: Delivered" },
    ],
    images: [
      U("photo-1497366754035-f200581a6a4b"),
      U("photo-1497366216548-37526070297c"),
      U("photo-1524758631624-e2822e304c36"),
      U("photo-1556761175-b413da4baf72"),
    ],
  },
  {
    title: "Administrative Villa Media-Magnet",
    label: "Commercial · Creative Office",
    description:
      "We created a modern and inspiring workspace for Media Magnet that prioritizes both comfort and functionality. The design incorporates comfortable seating, natural light, and a focus on employee well-being, creating a space where creativity can flourish.",
    status: [
      { label: "Type: Workspace" },
      { label: "Style: Modern Office" },
      { label: "Location: New Cairo" },
      { label: "Status: Delivered" },
    ],
    images: [
      U("photo-1497366811353-6870744d04b2"),
      U("photo-1552664730-d307ca884978"),
      U("photo-1604328698692-f76ea9498e76"),
      U("photo-1568992687947-868a62a9f521"),
    ],
  },
  {
    title: "Administrative Villa Tact-Innovations",
    label: "Commercial · Flagship HQ",
    description:
      "As a leading interior design and engineering firm, Tact Innovations -our site- required a workspace that reflected their innovative spirit. We designed a modern style for our administrative site that is both inspiring and functional, showcasing our expertise and creativity to clients and employees alike.",
    status: [
      { label: "Type: Workspace" },
      { label: "Style: Modern Office" },
      { label: "Location: New Cairo" },
      { label: "Status: Delivered" },
    ],
    images: [
      U("photo-1600585154526-990dced4db0d"),
      U("photo-1600607687939-ce8a6c25118c"),
      U("photo-1600566753190-17f0baa2a6c3"),
      U("photo-1600573472591-ee6b68d14c68"),
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function OnGroundProjects() {
  return (
    <>
      <style>{ogStyles}</style>
      <div className="og-page">
       
        <OGHero />
        {projects.map((proj, i) => (
          <OGSection key={proj.title} project={proj} index={i + 1} />
        ))}
        
      </div>
    </>
  );
}
