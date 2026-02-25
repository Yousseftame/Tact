
import ProjectsHero from "../../components/threeDSections/Projectshero";
import ProjectSection, {
  projectSectionStyles,
} from "../../components/threeDSections/Projectsection";

// ─────────────────────────────────────────────
// PLACEHOLDER IMAGES
// Replace src values with your real project images
// Format: /images/projects/<folder>/<file>.jpg
// ─────────────────────────────────────────────

const UNSPLASH = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&fit=crop`;

const projects = [
  {
    title: "Compound Apartment",
    label: "Residential",
    description:
      "This modern apartment exemplifies our  com mitment to creating elegant and functional living spaces. We seamlessly integrated clean lines, natural light, and a neutral color palette with vibrant accents to achieve a sophisticated yet inviting atmosphere.",
    images: [
      UNSPLASH("photo-1600566753190-17f0baa2a6c3"),
      UNSPLASH("photo-1600585154340-be6161a56a0c"),
      UNSPLASH("photo-1600585154340-be6161a56a0c"),
      UNSPLASH("photo-1600585154340-be6161a56a0c"),
      UNSPLASH("photo-1600585154340-be6161a56a0c"),
    ],
  },
  {
    title: "Mivida Living Space",
    label: "Residential · Interior",
    
    description:
      "In keeping with the Mivida lifestyle, this modern bathroom design emphasizes comfort and relaxation. We incorporated natural light, soothing color palettes, and luxurious textures to create a spa-like atmosphere.",
    images: [
      UNSPLASH("photo-1600607687939-ce8a6c25118c"),
      UNSPLASH("photo-1600566752355-35792bedcfea"),
      UNSPLASH("photo-1600566753086-00f18fb6b3ea"),
      UNSPLASH("photo-1600585154526-990dced4db0d"),
      UNSPLASH("photo-1600573472591-ee6b68d14c68"),
      UNSPLASH("photo-1600047509807-ba8f99d2cdde"),
    ],
  },
  {
    title: "Hayah Karima & Ketabak",
    label: "Public · Community",
    images: [
      UNSPLASH("photo-1497366216548-37526070297c"),
      UNSPLASH("photo-1497366811353-6870744d04b2"),
    ],
  },
  {
    title: "DS+ Roof",
    label: "Commercial · Rooftop",
    description:
      "This rooftop design reflects the dynamic and creative spirit of DS+. We incorporated bold colors, unique textures, and playful elements to create a space that is both inspiring and representative of the agency's brand identity.",
    images: [
      UNSPLASH("photo-1516455590571-18256e5bb9ff"),
      UNSPLASH("photo-1534536281715-e28d76689b4d"),
      UNSPLASH("photo-1501183638710-841dd1904471"),
      UNSPLASH("photo-1555041469-a586c61ea9bc"),
      UNSPLASH("photo-1512917774080-9991f1c4c750"),
      UNSPLASH("photo-1613490493576-7fde63acd811"),
    ],
  },
  {
    title: "IMCE Expo 2023 Ebda Booth",
    label: "Exhibition · Brand",
    description:
      "Designed for maximum impact at IMCE, the Ebda Booth featured a functional industrial aesthetic. We optimized space with clean lines and open layouts, creating a dynamic and engaging environment for visitors to explore Ebda's latest innovations.",
    images: [
      UNSPLASH("photo-1540575467063-178a50c2df87"),
      UNSPLASH("photo-1505373877841-8d25f7d46678"),
      UNSPLASH("photo-1511578314322-379afb476865"),
      UNSPLASH("photo-1587825140708-dfaf72ae4b04"),
      UNSPLASH("photo-1475721027785-f74eccf877e2"),
      UNSPLASH("photo-1492684223066-81342ee5ff30"),
    ],
  },
  {
    title: "IMCE Expo 2024 Ebda Booth",
    label: "Exhibition · Brand",
    description:
      "Building upon the success of our 2023 booth, we further refined our industrial design approach for Ebda's presence at IMCE 2024. We incorporated new interactive elements and cutting-edge technology to showcase Ebda's continued evolution as a leader in manufacturing innovation.",
    images: [
      UNSPLASH("photo-1519167758481-83f550bb49b3"),
      UNSPLASH("photo-1524178232363-1fb2b075b655"),
      UNSPLASH("photo-1559136555-9303baea8ebd"),
      UNSPLASH("photo-1563986768609-322da13575f3"),
      UNSPLASH("photo-1531058020387-3be344556be6"),
      UNSPLASH("photo-1504384308090-c894fdcc538d"),
    ],
  },
  {
    title: "Administrative Villa Think",
    label: "Commercial · Office",
    description:
      "We transformed an administrative villa into a modern and inspiring workspace for Think. The design prioritizes collaboration and creativity, with open-plan layouts, flexible workspaces, and designated areas for brainstorming and teamwork.",
    images: [
      UNSPLASH("photo-1497366754035-f200581a6a4b"),
      UNSPLASH("photo-1497366216548-37526070297c"),
      UNSPLASH("photo-1524758631624-e2822e304c36"),
      UNSPLASH("photo-1556761175-b413da4baf72"),
    ],
  },
  {
    title: "Administrative Villa Media-Magnet",
    label: "Commercial · Office",
    description:
      "We created a modern and inspiring workspace for Media Magnet that prioritizes both comfort and functionality. The design incorporates comfortable seating, natural light, and a focus on employee well-being, creating a space where creativity can flourish.",
    images: [
      UNSPLASH("photo-1497366811353-6870744d04b2"),
      UNSPLASH("photo-1552664730-d307ca884978"),
      UNSPLASH("photo-1604328698692-f76ea9498e76"),
      UNSPLASH("photo-1568992687947-868a62a9f521"),
    ],
  },
  {
    title: "Administrative Villa Tact  Innovations ",
    label: "Commercial · Flagship",
    description:
      "As a leading interior design and engineering firm, Tact Innovations -our site- required a workspace that reflected their innovative spirit. We designed a modern style for our administra tive site that is both inspiring and functional, showcasing our expertise and creativity to clients and employees alike.",
    images: [
      UNSPLASH("photo-1600585154526-990dced4db0d"),
      UNSPLASH("photo-1600607687939-ce8a6c25118c"),
      UNSPLASH("photo-1600566753190-17f0baa2a6c3"),
      UNSPLASH("photo-1600573472591-ee6b68d14c68"),
    ],
  },
];

const pageStyles = `
  .projects-page {
    background: #05080A;
    min-height: 100vh;
  }
  /* Thin gold divider between sections */
  .projects-divider {
    max-width: 1380px;
    margin: 0 auto;
    padding: 0 60px;
  }
  .projects-divider-line {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,151,90,0.12), transparent);
  }
`;

export default function ThreeDProjects() {
  return (
    <>
      <style>{pageStyles}</style>
      <style>{projectSectionStyles}</style>

      <div className="projects-page">

        <ProjectsHero />

        {projects.map((proj, i) => (
          <ProjectSection
            key={proj.title}
            index={i + 1}
            title={proj.title}
            label={proj.label}
            description={proj.description}
            images={proj.images}
          />
        ))}

      </div>
    </>
  );
}
