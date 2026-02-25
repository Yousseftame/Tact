import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/homeSections/HeroSection";
import AboutSection from "../../components/homeSections/AboutSection";
import VisionMissionSection from "../../components/homeSections/VisionMissionSection";
import CoreValuesSection from "../../components/homeSections/CoreValuesSection";
import WhyUsSection from "../../components/homeSections/WhyUsSection";
import ServicesSection from "../../components/homeSections/ServicesSection";
import ClientsSection from "../../components/homeSections/ClientsSection";
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
