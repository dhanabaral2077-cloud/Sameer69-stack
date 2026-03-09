import React from 'react';
import { motion } from 'motion/react';
import { Download, ArrowRight, Star } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Footprints, Moon } from './Icons.tsx';
import { BrandedContent } from './BrandedContent';
import AppDemoExperience from './AppDemoExperience';

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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-40 overflow-hidden bg-white">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#13EC13]/5 -skew-x-12 transform translate-x-1/4 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#13EC13]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
          <motion.div
            className="lg:col-span-5"
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
              className="text-5xl md:text-7xl font-display font-bold text-slate-900 leading-[1.05] mb-8"
            >
              <BrandedContent text={content.hero.headline} logoClassName="h-[0.9em] w-auto inline-block align-middle mb-2 md:mb-4" />
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl"
            >
              <BrandedContent text={content.hero.subheadline} />
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
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
              className="grid grid-cols-2 gap-4"
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

          {/* Right Content - Real App Demo */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <AppDemoExperience />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
