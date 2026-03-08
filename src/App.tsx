import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoWall from './components/LogoWall';
import LiveMap from './components/LiveMap';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Safety from './components/Safety';
import AppShowcase from './components/AppShowcase';
import Testimonials from './components/Testimonials';
import PriceEstimator from './components/PriceEstimator';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { ContentProvider, useContent } from './context/ContentContext';

// Pages
import PetSitting from './pages/PetSitting';
import DogWalking from './pages/DogWalking';
import PetGrooming from './pages/PetGrooming';
import VetVisits from './pages/VetVisits';
import PetBoarding from './pages/PetBoarding';
import PetTraining from './pages/PetTraining';
import LegalPage from './pages/LegalPage';
import CompanyPage from './pages/CompanyPage';

// Logic to render sections based on Schema order
function HomePage() {
  const { sections } = useContent();

  const componentMap: Record<string, React.ReactNode> = {
    hero: <Hero />,
    logoWall: <LogoWall />,
    liveMap: <LiveMap />,
    services: <Services />,
    priceEstimator: <PriceEstimator />,
    howItWorks: <HowItWorks />,
    testimonials: <Testimonials />,
    safety: <Safety />,
    appShowcase: <AppShowcase />,
    cta: <CTA />,
  };

  return (
    <main>
      {sections.map(sectionId => (
        <React.Fragment key={sectionId}>
          {componentMap[sectionId]}
        </React.Fragment>
      ))}
    </main>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-[#F6F8F6] font-sans text-slate-900 selection:bg-[#13EC13] selection:text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services/pet-sitting" element={<PetSitting />} />
            <Route path="/services/dog-walking" element={<DogWalking />} />
            <Route path="/services/pet-grooming" element={<PetGrooming />} />
            <Route path="/services/vet-visits" element={<VetVisits />} />
            <Route path="/services/pet-boarding" element={<PetBoarding />} />
            <Route path="/services/pet-training" element={<PetTraining />} />
            <Route path="/legal/:pageId" element={<LegalPage />} />
            <Route path="/company/:pageId" element={<CompanyPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ContentProvider>
  );
}
