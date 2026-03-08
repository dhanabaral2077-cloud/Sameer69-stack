import ServicePageLayout from '../components/ServicePageLayout';
import { Stethoscope, Car, FileText } from 'lucide-react';

export default function VetVisits() {
  return (
    <ServicePageLayout
      pageId="vetVisits"
      title=""
      subtitle=""
      heroImage="/assets/TopHeroBanner.png"
      features={[]}
      benefits={[
        { title: "", description: "", icon: <Car className="w-6 h-6" /> },
        { title: "", description: "", icon: <Stethoscope className="w-6 h-6" /> },
        { title: "", description: "", icon: <FileText className="w-6 h-6" /> }
      ]}
      pricing={[]}
    />
  );
}
