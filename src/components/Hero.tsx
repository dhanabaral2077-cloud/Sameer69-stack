import React from 'react';
import { motion } from 'motion/react';
import { Download, ArrowRight, Star, PawPrint, Search, MapPin, Calendar, ClipboardList } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Footprints, Moon } from './Icons.tsx';
import { BrandedContent } from './BrandedContent';

export default function Hero() {
  const { content } = useContent();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" as any }
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#13EC13]/5 -skew-x-12 transform translate-x-1/4 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#13EC13]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            className="w-full lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#13EC13]/10 text-[#13EC13] font-bold text-sm mb-6 border border-[#13EC13]/20"
            >
              <Star className="w-4 h-4 fill-[#13EC13]" />
              <span>{content.hero.badge}</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-display font-bold text-slate-900 leading-[1.1] mb-8"
            >
              <BrandedContent text={content.hero.headline} logoClassName="h-[0.9em] w-auto inline-block align-middle mb-2 md:mb-4" />
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl"
            >
              <BrandedContent text={content.hero.subheadline} />
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-[#13EC13] hover:text-white transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-[#13EC13]/30 flex items-center justify-center gap-2 group">
                {content.hero.ctaPrimary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-slate-900 border-2 border-slate-100 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                {content.hero.ctaSecondary}
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-2 gap-4"
            >
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white shadow-sm border border-slate-50">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Footprints className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">
                    <BrandedContent text={content.hero.secondaryFeatures?.[0]?.title || "Verified Sitters"} />
                  </p>
                  <p className="text-xs text-slate-500">
                    <BrandedContent text={content.hero.secondaryFeatures?.[0]?.description || "100% Background checked"} />
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Moon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">
                    <BrandedContent text={content.hero.secondaryFeatures?.[1]?.title || "GPS Tracking"} />
                  </p>
                  <p className="text-xs text-slate-500">
                    <BrandedContent text={content.hero.secondaryFeatures?.[1]?.description || "Real-time walk updates"} />
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - App UI Teaser */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <div className="bg-slate-900 rounded-[3rem] p-4 shadow-2xl relative overflow-hidden group">
                {/* Simulated App UI */}
                <div className="bg-white rounded-[2.5rem] h-[600px] overflow-hidden relative flex flex-col">
                  {/* App Header */}
                  <div className="p-6 pb-2">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                        <PawPrint className="w-6 h-6 text-[#13EC13]" />
                      </div>
                      <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Find a Sitter</h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Kathmandu, Nepal"
                        className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#13EC13]"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* App Content - Map View */}
                  <div className="flex-1 bg-slate-200 relative m-4 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=27.7172,85.3240&zoom=14&size=600x600&sensor=false')] bg-cover bg-center opacity-80" />
                    {/* Floating Avatar Pins */}
                    <div className="absolute top-1/4 left-1/3 w-12 h-12 rounded-full border-4 border-white shadow-xl overflow-hidden transform hover:scale-110 transition-transform">
                      <img src="https://i.pravatar.cc/150?u=1" alt="Sitter" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute top-1/2 right-1/4 w-12 h-12 rounded-full border-4 border-white shadow-xl overflow-hidden transform hover:scale-110 transition-transform">
                      <img src="https://i.pravatar.cc/150?u=2" alt="Sitter" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-1/4 left-1/2 w-12 h-12 rounded-full border-4 border-[#13EC13] shadow-xl overflow-hidden transform hover:scale-110 transition-transform bg-white p-1">
                      <img src="/assets/icon.png" alt="Pet" className="w-full h-full object-contain" />
                    </div>
                  </div>

                  {/* App Navigation */}
                  <div className="p-6 bg-white border-t border-slate-50 grid grid-cols-4 gap-4">
                    <div className="flex flex-col items-center gap-1 text-[#13EC13]">
                      <Search className="w-6 h-6" />
                      <span className="text-[10px] font-bold">Search</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-300">
                      <Calendar className="w-6 h-6" />
                      <span className="text-[10px] font-bold">Book</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-300">
                      <ClipboardList className="w-6 h-6" />
                      <span className="text-[10px] font-bold">Inbox</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-300">
                      <div className="w-6 h-6 rounded-full bg-slate-100" />
                      <span className="text-[10px] font-bold">Profile</span>
                    </div>
                  </div>
                </div>

                {/* Floating Notification Cards */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute -right-6 top-20 bg-white p-4 rounded-2xl shadow-2xl border border-slate-50 max-w-[180px]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">TRACKING</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">Bruno is having a great walk in Patan!</p>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#13EC13]/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
