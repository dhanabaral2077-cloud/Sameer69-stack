import { motion } from 'motion/react';
import {
  Map, Database, Cloud, ShieldCheck, Stethoscope,
  CreditCard, Smartphone, Globe, Tv, Laptop,
  Heart, Zap, Calendar, Award
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

const partners = [
  { name: "Baato Maps", icon: <Map className="w-5 h-5" />, category: "Tech" },
  { name: "Supabase", icon: <Database className="w-5 h-5" />, category: "Tech" },
  { name: "Firebase", icon: <Cloud className="w-5 h-5" />, category: "Tech" },
  { name: "Animal Welfare", icon: <ShieldCheck className="w-5 h-5" />, category: "Trust" },
  { name: "Premier Vets", icon: <Stethoscope className="w-5 h-5" />, category: "Trust" },
  { name: "eSewa Pay", icon: <CreditCard className="w-5 h-5" />, category: "Payment" },
  { name: "Khalti", icon: <CreditCard className="w-5 h-5" />, category: "Payment" },
  { name: "IME Pay", icon: <Smartphone className="w-5 h-5" />, category: "Payment" },
  { name: "Global Bank", icon: <Globe className="w-5 h-5" />, category: "Payment" },
  { name: "NTV Plus", icon: <Tv className="w-5 h-5" />, category: "Media" },
  { name: "Kantipur", icon: <Tv className="w-5 h-5" />, category: "Media" },
  { name: "Tech Nepal", icon: <Laptop className="w-5 h-5" />, category: "Tech" },
  { name: "Pet Care Intl", icon: <Heart className="w-5 h-5" />, category: "Brand" },
  { name: "Fast Track", icon: <Zap className="w-5 h-5" />, category: "Service" },
  { name: "Event Nepal", icon: <Calendar className="w-5 h-5" />, category: "Event" },
  { name: "Award Winning", icon: <Award className="w-5 h-5" />, category: "Trust" },
];

const row1 = partners.slice(0, 8);
const row2 = partners.slice(8);

export default function LogoWall() {
  const { content } = useContent();
  return (
    <section className="py-20 bg-white overflow-hidden border-y border-slate-100">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">
              {content.logoWall?.title || "Powering Nepal's Pet Economy"}
            </h3>
            <p className="text-slate-500 font-medium">
              {content.logoWall?.description || "Trusted by leading technology and veterinary partners"}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100">
                  <img src="/assets/CaregiverPlaceholder.png" alt="Partner" className="w-full h-full rounded-full" />
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-slate-400">
              {content.logoWall?.partnerCountText || "50+ Partners"}
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col gap-6">
        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

        {/* Row 1 */}
        <div className="flex w-max animate-scroll pause-on-hover">
          {[...row1, ...row1, ...row1, ...row1].map((partner, index) => (
            <div key={`${partner.name}-${index}`} className="mx-3">
              <LogoCapsule partner={partner} />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex w-max animate-scroll-reverse pause-on-hover">
          {[...row2, ...row2, ...row2, ...row2].map((partner, index) => (
            <div key={`${partner.name}-${index}`} className="mx-3">
              <LogoCapsule partner={partner} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoCapsule({ partner }: { partner: { name: string; icon: React.ReactNode; category: string } }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
    >
      <div className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-[#3B82F6]/30 hover:shadow-xl hover:shadow-[#3B82F6]/5 transition-all duration-500">
        <div className="text-slate-400 group-hover:text-[#3B82F6] transition-colors duration-300 transform group-hover:scale-110">
          {partner.icon}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1 group-hover:text-[#3B82F6]/60">
            {partner.category}
          </span>
          <span className="font-bold text-slate-600 whitespace-nowrap group-hover:text-slate-900 transition-colors">
            {partner.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
