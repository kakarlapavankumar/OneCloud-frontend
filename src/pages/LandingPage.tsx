import Navbar from "../components/landing-page/Navbar";
import HeroSection from "../components/landing-page/HeroSection";
//import ModuleSection from "../components/landing-page/ModuleSection";
import TechnologySection from "../components/landing-page/TechnologySection";
import FooterSection from "../components/landing-page/FooterSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      {/* <ModuleSection /> */}
      <TechnologySection />
      <FooterSection />
    </div>
  );
}
