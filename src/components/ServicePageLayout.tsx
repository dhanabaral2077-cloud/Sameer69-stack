import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { BrandedContent } from './BrandedContent';

interface ServicePageProps {
  pageId: string;
  title: string;
  subtitle: string;
  heroImage: string;
  features: string[];
  benefits: { title: string; description: string; icon: any }[];
  pricing: { title: string; price: string; features: string[] }[];
}

export default function ServicePageLayout({ pageId, title, subtitle, heroImage, features, benefits, pricing }: ServicePageProps) {
  const { content } = useContent();
  const pageContent = content.pages?.[pageId];

  if (!pageContent) return <div>Page not found</div>;

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden mb-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-2 rounded-full mb-6">
                <Star className="w-4 h-4 text-[#13EC13] fill-[#13EC13]" />
                <span className="text-sm font-bold text-green-800 tracking-wide uppercase">Premium Service</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-slate-900 leading-[1.1] mb-6">
                {pageContent.title}
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                <BrandedContent text={pageContent.subtitle} />
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#13EC13] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#0fd60f] transition-all shadow-lg shadow-green-200 hover:shadow-green-300 flex items-center justify-center gap-2 group">
                  Book Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link to="/" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center">
                  Back to Home
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img src={heroImage} alt={title} className="w-full h-[500px] object-cover" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#13EC13]/10 rounded-full blur-[100px] -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold mb-4 text-slate-900">
              Why Choose Our {pageContent.title}?
            </h2>
            <p className="text-slate-600">We go above and beyond to ensure your pet receives the best care possible.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-[#13EC13]">
                  {benefits[index].icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  {pageContent.benefits[index].title}
                </h3>
                <p className="text-slate-600">
                  {pageContent.benefits[index].description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-8 text-slate-900">What's Included</h2>
              <div className="space-y-4">
                {pageContent.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-[#13EC13] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-slate-700">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] bg-slate-100 rounded-[40px] overflow-hidden">
              <img src="/assets/OnboardingHero.png" alt="Service Detail" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold mb-4 text-slate-900">Simple, Transparent Pricing</h2>
            <p className="text-slate-600">Choose the plan that best fits your pet's needs. No hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pageContent.pricing.map((plan: any, index: number) => (
              <div key={index} className="flex flex-col p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-[#13EC13]/30 hover:bg-white hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {plan.title}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-slate-500 text-sm">/visit</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-[#13EC13]" />
                      <span>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-[#13EC13] transition-colors">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-12 border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <Star className="w-8 h-8 text-[#13EC13] mx-auto mb-6 fill-[#13EC13]/10" />
            <p className="text-2xl font-display font-medium text-slate-800 italic mb-4">
              "
              <BrandedContent text="We treat your pets like they're our own. That's the PawPal promise." logoClassName="h-7 w-auto inline-block align-middle mx-1 mb-1" />
              "
            </p>
            <div className="flex items-center justify-center gap-3">
              <img src="/assets/CaregiverPlaceholder.png" className="w-12 h-12 rounded-full object-cover border-2 border-green-100 shadow-sm" alt="Founder" />
              <div className="text-left">
                <p className="font-bold text-slate-900 leading-none">Aayush Shrestha</p>
                <p className="text-sm text-slate-500">Founder, Pet Care Nepal</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
