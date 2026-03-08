import { motion } from 'motion/react';
import { MapPin, MessageSquare, Calendar } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { BrandedContent } from './BrandedContent';

export default function AppShowcase() {
  const { content } = useContent();
  return (
    <section id="app-showcase" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-display font-bold mb-4 text-slate-900">
            <BrandedContent text={content.appShowcase.title} logoClassName="h-[0.85em] w-auto inline-block align-middle mb-1" />
          </h2>
          <p className="text-lg text-slate-600 flex items-center justify-center gap-2">
            <BrandedContent text={content.appShowcase.description} />
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center lg:text-right space-y-4"
          >
            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto lg:ml-auto lg:mr-0 text-[#3B82F6]">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {content.appShowcase.features[0].title}
            </h3>
            <p className="text-slate-600">
              {content.appShowcase.features[0].description}
            </p>
          </motion.div>

          {/* Center Phone Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-[#13EC13]/20 blur-[100px] rounded-full"></div>
            <div className="relative w-[280px] h-[580px] bg-slate-900 rounded-[40px] border-[8px] border-slate-800 shadow-2xl overflow-hidden z-10">
              {/* App UI Placeholder - Radar View */}
              <div className="absolute inset-0 bg-white flex flex-col">
                <div className="h-full w-full relative">
                  {/* Branded App Illustration */}
                  <img
                    src="/assets/illustrations/searching_caregivers.png"
                    className="w-full h-full object-cover opacity-90"
                    alt="App Interface"
                  />

                  {/* User Dot (Keep for interactivity feel) */}
                  <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#3B82F6] rounded-full border-4 border-white shadow-xl z-20 animate-pulse"></div>

                  {/* Bottom Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50">
                    <div className="flex items-center gap-3">
                      <img src="/assets/CaregiverPlaceholder.png" className="w-10 h-10 rounded-full object-cover border border-slate-100" alt="Sarah" />
                      <div>
                        <h4 className="font-bold text-[13px] text-slate-900">Sarah K.</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Pet Sitter • 0.5km away</p>
                      </div>
                      <button className="ml-auto bg-[#13EC13] text-black px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-sm">Book</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 2 & 3 */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="text-center lg:text-left space-y-4"
            >
              <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 text-[#13EC13]">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {content.appShowcase.features[1].title}
              </h3>
              <p className="text-slate-600">
                {content.appShowcase.features[1].description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 }}
              className="text-center lg:text-left space-y-4"
            >
              <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 text-purple-600">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {content.appShowcase.features[2].title}
              </h3>
              <p className="text-slate-600">
                {content.appShowcase.features[2].description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
