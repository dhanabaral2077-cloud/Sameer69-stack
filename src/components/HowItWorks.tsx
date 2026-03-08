import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, CalendarCheck, MessageCircle, Heart, ShieldCheck, DollarSign } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function HowItWorks() {
  const { content } = useContent();
  const [activeTab, setActiveTab] = useState<'parents' | 'caregivers'>('parents');

  const icons = {
    parents: [
      <Search className="w-6 h-6" />,
      <CalendarCheck className="w-6 h-6" />,
      <MessageCircle className="w-6 h-6" />
    ],
    caregivers: [
      <ShieldCheck className="w-6 h-6" />,
      <Heart className="w-6 h-6" />,
      <DollarSign className="w-6 h-6" />
    ]
  };

  const images = {
    parents: [
      "/assets/illustrations/searching_caregivers.png",
      "/assets/illustrations/caregiver_found.png",
      "/assets/illustrations/request_incoming.png"
    ],
    caregivers: [
      "/assets/IamaPetcarer.png",
      "/assets/illustrations/offline_idle.png",
      "/assets/CaregiverEarningsEmpty.png"
    ]
  };

  const activeSteps = activeTab === 'parents' ? content.howItWorks.parentsSteps : content.howItWorks.caregiversSteps;
  const activeIconPath = activeTab === 'parents' ? 'parentsSteps' : 'caregiversSteps';

  return (
    <section id="how-it-works" className="py-24 bg-[#F6F8F6]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-8 text-slate-900">
            {content.howItWorks.title}
          </h2>

          <div className="inline-flex bg-white p-1.5 rounded-full shadow-sm border border-slate-200">
            <button
              onClick={() => setActiveTab('parents')}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'parents'
                ? 'bg-[#13EC13] text-white shadow-md'
                : 'text-slate-500 hover:text-slate-900'
                }`}
            >
              For Pet Parents
            </button>
            <button
              onClick={() => setActiveTab('caregivers')}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'caregivers'
                ? 'bg-[#3B82F6] text-white shadow-md'
                : 'text-slate-500 hover:text-slate-900'
                }`}
            >
              For Caregivers
            </button>
          </div>
        </div>

        <div className="mt-16">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {activeSteps.map((step: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={images[activeTab][index]}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${activeTab === 'parents' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                      {icons[activeTab][index]}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
