import { motion } from 'motion/react';
import { Shield, Clock, CreditCard, CheckCircle, Search, UserCheck, ShieldCheck, Heart } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const icons = [
  <Search className="w-6 h-6" />,
  <UserCheck className="w-6 h-6" />,
  <ShieldCheck className="w-6 h-6" />,
  <Heart className="w-6 h-6" />
];

export default function Safety() {
  const { content } = useContent();
  return (
    <section id="safety" className="py-32 bg-slate-900 text-white relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#13EC13_1px,transparent_1px)] [background-size:32px_32px]"></div>
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#13EC13]/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#3B82F6]/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 mb-6"
          >
            <Shield className="w-4 h-4 text-[#13EC13]" />
            <span className="text-sm font-bold text-[#13EC13] uppercase tracking-widest leading-none">
              {content.safety.badge}
            </span>
          </motion.div>
          <h2 className="text-4xl lg:text-7xl font-display font-bold mb-8 tracking-tight">
            {content.safety.title}
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed">
            {content.safety.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Trust Timeline */}
          <div className="space-y-12">
            <h3 className="text-2xl font-display font-bold flex items-center gap-4 text-white/90">
              <span className="w-12 h-0.5 bg-[#13EC13] rounded-full"></span>
              {content.safety.pipelineTitle}
            </h3>

            <div className="relative space-y-8 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {content.safety.verificationSteps.map((step: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-16 group"
                >
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-[#13EC13] group-hover:scale-110 group-hover:bg-[#13EC13] group-hover:text-black transition-all duration-300 shadow-lg">
                    {icons[index]}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 group-hover:text-[#13EC13] transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual Evidence Section */}
          <div className="sticky top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-2 bg-white/5 rounded-[48px] border border-white/10 backdrop-blur-2xl"
            >
              <div className="relative rounded-[40px] overflow-hidden aspect-[4/5]">
                <img
                  src="/assets/welcomeillustration.png"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  alt="Certified Caretaker"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                {/* Overlay Cards */}
                <div className="absolute bottom-8 left-8 right-8 space-y-4">
                  <GlassCard
                    icon={<Clock className="w-5 h-5 text-[#13EC13]" />}
                    title={content.safety.monitoringTitle}
                    desc={content.safety.monitoringDesc}
                  />
                  <GlassCard
                    icon={<Shield className="w-5 h-5 text-[#3B82F6]" />}
                    title={content.safety.insuranceTitle}
                    desc={content.safety.insuranceDesc}
                  />
                </div>
              </div>

              {/* Verified Badge */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-12 -right-12 w-32 h-32 hidden lg:block"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full fill-[#13EC13]">
                  <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <text className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    <textPath xlinkHref="#curve">
                      {content.safety.verifiedBadgeText}
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[#13EC13]" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlassCard({ icon, title, desc }: { icon: React.ReactNode; title: React.ReactNode; desc: React.ReactNode }) {
  return (
    <div className="glass-morphism-dark p-4 rounded-2xl border-white/10">
      <div className="flex gap-4 items-center">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
          {icon}
        </div>
        <div>
          <h5 className="font-bold text-sm text-white">{title}</h5>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
      </div>
    </div>
  );
}
