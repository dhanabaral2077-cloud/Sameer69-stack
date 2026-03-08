import ServicePageLayout from '../components/ServicePageLayout';
import { Scissors, Sparkles, Bath } from 'lucide-react';

export default function PetGrooming() {
  return (
    <ServicePageLayout
      pageId="petGrooming"
      title=""
      subtitle=""
      heroImage="/assets/TopHeroBanner.png"
      features={[]}
      benefits={[
        { title: "", description: "", icon: <Scissors className="w-6 h-6" /> },
        { title: "", description: "", icon: <Sparkles className="w-6 h-6" /> },
        { title: "", description: "", icon: <Bath className="w-6 h-6" /> }
      ]}
      pricing={[]}
    />
  );
}
