import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Moon, Footprints, Scissors, GraduationCap, Stethoscope, Heart, Shield, DollarSign, Clock, Award, Users } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const services = {
  parents: [
    {
      icon: <img src="/assets/Services Icons/Sitting.png" alt="Pet Sitting" className="w-12 h-12 object-contain" />,
      title: "Pet Sitting",
      description: "Professional care in your own home while you're away.",
      color: "bg-orange-100/50 text-orange-600",
      borderColor: "group-hover:border-orange-200"
    },
    {
      icon: <img src="/assets/Services Icons/Boarding1.png" alt="Pet Boarding" className="w-12 h-12 object-contain" />,
      title: "Pet Boarding",
      description: "A cozy overnight stay at a verified caregiver's home.",
      color: "bg-purple-100/50 text-purple-600",
      borderColor: "group-hover:border-purple-200"
    },
    {
      icon: <img src="/assets/Services Icons/Walking.png" alt="Dog Walking" className="w-12 h-12 object-contain" />,
      title: "Dog Walking",
      description: "Daily exercise and fun adventures for your active pups.",
      color: "bg-green-100/50 text-green-600",
      borderColor: "group-hover:border-green-200"
    },
    {
      icon: <img src="/assets/Services Icons/Grooming.png" alt="Grooming" className="w-12 h-12 object-contain" />,
      title: "Grooming",
      description: "Bath, trim, and style services right at your doorstep.",
      color: "bg-pink-100/50 text-pink-600",
      borderColor: "group-hover:border-pink-200"
    },
    {
      icon: <img src="/assets/Services Icons/TrainingIcon.png" alt="Training" className="w-12 h-12 object-contain" />,
      title: "Training",
      description: "Basic skills and obedience training from expert trainers.",
      color: "bg-blue-100/50 text-blue-600",
      borderColor: "group-hover:border-blue-200"
    },
    {
      icon: <img src="/assets/Services Icons/VetIcon.png" alt="Vet Visits" className="w-12 h-12 object-contain" />,
      title: "Vet Visits",
      description: "Stress-free assisted appointments for medical needs.",
      color: "bg-red-100/50 text-red-600",
      borderColor: "group-hover:border-red-200"
    }
  ],
  caregivers: [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Earn Money",
      description: "Turn your love for pets into a profitable income source.",
      color: "bg-emerald-100 text-emerald-600",
      borderColor: "group-hover:border-emerald-200"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Schedule",
      description: "Work when you want. You're the boss of your time.",
      color: "bg-blue-100 text-blue-600",
      borderColor: "group-hover:border-blue-200"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Insurance Cover",
      description: "Every job is insured so you can work with peace of mind.",
      color: "bg-indigo-100 text-indigo-600",
      borderColor: "group-hover:border-indigo-200"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Join a network of passionate pet lovers just like you.",
      color: "bg-rose-100 text-rose-600",
      borderColor: "group-hover:border-rose-200"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Build Reputation",
      description: "Get reviews and badges to attract more clients.",
      color: "bg-amber-100 text-amber-600",
      borderColor: "group-hover:border-amber-200"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Pet Love",
      description: "Get paid to do what you already love—caring for animals.",
      color: "bg-red-100 text-red-600",
      borderColor: "group-hover:border-red-200"
    }
  ]
};

export default function Services() {
  const { content } = useContent();
  const [viewMode, setViewMode] = useState<'parents' | 'caregivers'>('parents');

  const servicesData = content.services?.[viewMode] || [];

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-display font-bold mb-6 text-slate-900 leading-tight">
            {viewMode === 'parents'
              ? (content.services?.title || "Services for Every Pet's Needs")
              : (content.services?.caregiverTitle || "Earn More with PawPal")
            }
          </h2>

          {/* Toggle Switch */}
          <div className="inline-flex bg-slate-100 p-1.5 rounded-full mb-8 relative">
            <div
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-spring ${viewMode === 'parents' ? 'left-1.5' : 'left-[calc(50%+3px)]'
                }`}
            ></div>
            <button
              onClick={() => setViewMode('parents')}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${viewMode === 'parents' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              For Pet Parents
            </button>
            <button
              onClick={() => setViewMode('caregivers')}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${viewMode === 'caregivers' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              For Caregivers
            </button>
          </div>

          <p className="text-lg text-slate-600">
            {viewMode === 'parents'
              ? (content.services?.description || "Professional pet care services.")
              : (content.services?.caregiverDescription || "Career opportunities for pet lovers.")
            }
          </p>
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {servicesData.map((service: any, index: number) => {
                const icon = viewMode === 'parents'
                  ? services.parents[index]?.icon
                  : services.caregivers[index]?.icon;

                return (
                  <div
                    key={service.id}
                    className={`bg-[#F6F8F6] p-8 rounded-3xl border border-transparent hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 group cursor-pointer`}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-slate-100 text-slate-600 transition-transform group-hover:scale-110 duration-300 shadow-sm`}>
                      {icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
