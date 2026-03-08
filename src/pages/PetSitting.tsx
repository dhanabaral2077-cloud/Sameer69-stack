import ServicePageLayout from '../components/ServicePageLayout';
import { Home, ShieldCheck, Heart, Clock } from 'lucide-react';

export default function PetSitting() {
  return (
    <ServicePageLayout
      pageId="petSitting"
      title=""
      subtitle=""
      heroImage="/assets/TopHeroBanner.png"
      features={[]}
      benefits={[
        { title: "", description: "", icon: <Home className="w-6 h-6" /> },
        { title: "", description: "", icon: <ShieldCheck className="w-6 h-6" /> },
        { title: "", description: "", icon: <Heart className="w-6 h-6" /> }
      ]}
      pricing={[]}
    />
  );
}
