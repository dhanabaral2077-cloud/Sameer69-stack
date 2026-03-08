import ServicePageLayout from '../components/ServicePageLayout';
import { Footprints, Map, Activity } from 'lucide-react';

export default function DogWalking() {
  return (
    <ServicePageLayout
      pageId="dogWalking"
      title=""
      subtitle=""
      heroImage="/assets/TopHeroBanner.png"
      features={[]}
      benefits={[
        { title: "", description: "", icon: <Map className="w-6 h-6" /> },
        { title: "", description: "", icon: <Activity className="w-6 h-6" /> },
        { title: "", description: "", icon: <Footprints className="w-6 h-6" /> }
      ]}
      pricing={[]}
    />
  );
}
