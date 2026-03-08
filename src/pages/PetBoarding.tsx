import ServicePageLayout from '../components/ServicePageLayout';
import { Moon, ShieldCheck, Heart, Camera } from 'lucide-react';

export default function PetBoarding() {
    return (
        <ServicePageLayout
            pageId="petBoarding"
            title=""
            subtitle=""
            heroImage="/assets/TopHeroBanner.png"
            features={[]}
            benefits={[
                { title: "", description: "", icon: <Moon className="w-6 h-6" /> },
                { title: "", description: "", icon: <ShieldCheck className="w-6 h-6" /> },
                { title: "", description: "", icon: <Camera className="w-6 h-6" /> }
            ]}
            pricing={[]}
        />
    );
}
