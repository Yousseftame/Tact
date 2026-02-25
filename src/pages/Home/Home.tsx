import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/sections/HeroSection";
import AboutSection from "../../components/sections/AboutSection";
import VisionMissionSection from "../../components/sections/VisionMissionSection";
import CoreValuesSection from "../../components/sections/CoreValuesSection";
import WhyUsSection from "../../components/sections/WhyUsSection";
import ServicesSection from "../../components/sections/ServicesSection";
import ClientsSection from "../../components/sections/ClientsSection";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <>
      
      <HeroSection />
      <AboutSection />
      <VisionMissionSection />
      <CoreValuesSection />
      <WhyUsSection />
      <ServicesSection />
      <ClientsSection />
    
    </>
  );
}
