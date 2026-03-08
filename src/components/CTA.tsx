import { motion } from 'motion/react';
import { Download, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { BrandedContent } from './BrandedContent';

export default function CTA() {
  const { content } = useContent();
  return (
    <section className="py-24 bg-[#13EC13] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight"
        >
          <BrandedContent text={content.cta.title} logoClassName="h-[0.9em] w-auto inline-block align-middle mb-1.5" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <button className="flex items-center justify-center gap-3 bg-white text-[#13EC13] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-xl group">
            <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            <BrandedContent text={content.cta.primaryButton} />
          </button>
          <button className="flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl group">
            <BrandedContent text={content.cta.secondaryButton} invert />
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
