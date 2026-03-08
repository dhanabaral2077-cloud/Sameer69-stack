import { motion } from 'motion/react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { BrandedContent } from './BrandedContent';

const testimonials = [
    {
        id: 1,
        name: "Aayush Sharma",
        role: "Golden Retriever Parent",
        content: "PawPal has been a lifesaver for my dog Rocky. The caregivers are professional and I love the live updates. Highly recommended for anyone in Kathmandu!",
        rating: 5,
        image: "/assets/CaregiverPlaceholder.png",
        verified: true
    },
    {
        id: 2,
        name: "Sita Thapa",
        role: "Cat Owner",
        content: "The best pet grooming service in Pokhara. Luna looked so happy and well-groomed. The price is worth the quality and care they provide.",
        rating: 5,
        image: "/assets/PhotoPlaceholder.png",
        verified: true
    },
    {
        id: 3,
        name: "Rajesh Khatri",
        role: "Business Traveler",
        content: "Finding reliable pet boarding was always a struggle until I found PawPal. Now I can travel for work knowing my pets are in safe hands.",
        rating: 5,
        image: "/assets/PhotoPlaceholder.png",
        verified: true
    }
];

export default function Testimonials() {
    const { content } = useContent();
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-[#13EC13]/10 px-4 py-2 rounded-full mb-6 border border-[#13EC13]/20"
                    >
                        <Star className="w-4 h-4 text-[#13EC13] fill-current" />
                        <span className="text-sm font-bold text-[#13EC13] uppercase tracking-widest">Real Stories</span>
                    </motion.div>
                    <h2 className="text-4xl lg:text-6xl font-display font-bold text-slate-900 mb-6">
                        {content.testimonials.title}
                    </h2>
                    <p className="text-xl text-slate-500 leading-relaxed">
                        {content.testimonials.description}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {content.testimonials.items.map((testimonial: any, index: number) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-morphism p-8 rounded-[40px] border-slate-100 group hover:border-[#13EC13]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#13EC13]/5 focus-within:ring-2 focus-within:ring-[#13EC13]"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex gap-1 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                                <Quote className="w-8 h-8 text-slate-100 group-hover:text-[#13EC13]/20 transition-colors" />
                            </div>

                            <div className="text-lg text-slate-600 mb-8 leading-relaxed italic cursor-text">
                                "
                                <BrandedContent text={testimonial.content} />
                                "
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img
                                        src={testimonials[index]?.image || "/assets/CaregiverPlaceholder.png"}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                                        alt={testimonial.name}
                                    />
                                    <div className="absolute -right-1 -bottom-1 bg-white rounded-full p-0.5 shadow-sm">
                                        <CheckCircle className="w-4 h-4 text-[#13EC13] fill-current" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Dynamic Counter Section */}
                <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-y border-slate-100">
                    {content.stats.map((stat: any, index: number) => (
                        <StatItem
                            key={index}
                            label={stat.label}
                            value={stat.value}
                            id={`stats[${index}]`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function StatItem({ label, value, id }: { label: string; value: string; id: string }) {
    return (
        <div className="text-center group">
            <div className="text-3xl lg:text-5xl font-display font-bold text-slate-900 mb-2 group-hover:text-[#13EC13] transition-colors cursor-text">
                {value}
            </div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-none cursor-text">
                {label}
            </div>
        </div>
    );
}
