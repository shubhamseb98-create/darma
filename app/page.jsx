import HeroSection from "../components/sections/HeroSection";
import BrandPhilosophy from "../components/sections/BrandPhilosophy";
import ServicesGallery from "../components/sections/ServicesGallery";
import TechnologyShowcase from "../components/sections/TechnologyShowcase";
import BeforeAfterSlider from "../components/sections/BeforeAfterSlider";
import DoctorBio from "../components/sections/DoctorBio";
import TestimonialsMarquee from "../components/sections/TestimonialsMarquee";
import CTABanner from "../components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandPhilosophy />
      <ServicesGallery />
      <TechnologyShowcase />
      <BeforeAfterSlider />
      <DoctorBio />
      <TestimonialsMarquee />
      <CTABanner />
    </>
  );
}
