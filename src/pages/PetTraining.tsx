import ServicePageLayout from '../components/ServicePageLayout';
import { GraduationCap, ShieldCheck, Heart, Zap } from 'lucide-react';

export default function PetTraining() {
    return (
        <ServicePageLayout
            pageId="petTraining"
            title=""
            subtitle=""
            heroImage="/assets/TopHeroBanner.png"
            features={[]}
            benefits={[
                { title: "", description: "", icon: <GraduationCap className="w-6 h-6" /> },
                { title: "", description: "", icon: <Zap className="w-6 h-6" /> },
                { title: "", description: "", icon: <Heart className="w-6 h-6" /> }
            ]}
            pricing={[]}
        />
    );
}
