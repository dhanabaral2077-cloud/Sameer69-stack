import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Calendar, Clock, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const SERVICES = [
    { id: 'sitting', name: 'Pet Sitting', rate: 2000, unit: 'hour' },
    { id: 'walking', name: 'Dog Walking', rate: 1300, unit: '30 min' },
    { id: 'boarding', name: 'Pet Boarding', rate: 4600, unit: 'night' },
    { id: 'grooming', name: 'Grooming', rate: 2600, unit: 'session' },
];

export default function PriceEstimator() {
    const { content } = useContent();
    const [service, setService] = useState(SERVICES[2]);
    const [quantity, setQuantity] = useState(1);
    const [addons, setAddons] = useState<string[]>([]);

    const toggleAddon = (id: string) => {
        setAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
    };

    const total = (service.rate * quantity) + (addons.length * 650);

    return (
        <section className="py-24 bg-[#F6F8F6]">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 bg-[#3B82F6]/10 px-4 py-2 rounded-full mb-6 border border-[#3B82F6]/20"
                        >
                            <Calculator className="w-4 h-4 text-[#3B82F6]" />
                            <span className="text-sm font-bold text-[#3B82F6] uppercase tracking-widest">
                                {content.priceEstimator.badge}
                            </span>
                        </motion.div>
                        <h2 className="text-4xl lg:text-6xl font-display font-bold text-slate-900 mb-8">
                            {content.priceEstimator.title}
                        </h2>
                        <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                            {content.priceEstimator.description}
                        </p>

                        <div className="space-y-6">
                            {content.priceEstimator.features.map((feature: any, index: number) => (
                                <FeatureItem
                                    key={index}
                                    title={feature.title}
                                    desc={feature.description}
                                />
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-morphism p-2 rounded-[48px] border-white shadow-2xl shadow-blue-500/10"
                    >
                        <div className="bg-white rounded-[40px] p-8 lg:p-12 shadow-sm border border-slate-100">
                            <div className="space-y-8">
                                {/* Service Selection */}
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">Select Service</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {SERVICES.map(s => (
                                            <button
                                                key={s.id}
                                                onClick={() => setService(s)}
                                                className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all border flex flex-col items-center gap-2 ${service.id === s.id
                                                    ? 'bg-[#3B82F6] text-white border-[#3B82F6] shadow-lg shadow-blue-500/20 scale-[1.02]'
                                                    : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-[#3B82F6]/30'
                                                    }`}
                                            >
                                                <img
                                                    src={`/assets/Services Icons/${s.id === 'sitting' ? 'Sitting' : s.id === 'walking' ? 'Walking' : s.id === 'boarding' ? 'Boarding1' : 'Grooming'}.png`}
                                                    alt={s.name}
                                                    className="w-10 h-10 object-contain"
                                                />
                                                {s.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Duration/Quantity */}
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">How Many {service.unit}s?</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="14"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
                                    />
                                    <div className="flex justify-between mt-2 text-sm font-bold text-slate-900">
                                        <span>1 {service.unit}</span>
                                        <span className="bg-[#3B82F6]/10 text-[#3B82F6] px-3 py-1 rounded-lg">{quantity} {service.unit}s</span>
                                        <span>14 {service.unit}s</span>
                                    </div>
                                </div>

                                {/* Add-ons */}
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">Optional Add-ons</label>
                                    <div className="space-y-3">
                                        <AddonItem
                                            id="photo"
                                            label="Photo Updates"
                                            selected={addons.includes('photo')}
                                            onToggle={toggleAddon}
                                        />
                                        <AddonItem
                                            id="admin"
                                            label="Medication Administration"
                                            selected={addons.includes('admin')}
                                            onToggle={toggleAddon}
                                        />
                                    </div>
                                </div>

                                {/* Total Display */}
                                <div className="pt-8 border-t border-slate-100">
                                    <div className="flex justify-between items-end mb-8">
                                        <div>
                                            <p className="text-slate-500 text-sm font-medium">Estimated Total</p>
                                            <h3 className="text-5xl font-display font-bold text-slate-900 tracking-tight">
                                                Rs {total.toLocaleString()}
                                            </h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[#13EC13] font-bold text-sm">Save 10%</p>
                                            <p className="text-slate-400 text-xs">on monthly plans</p>
                                        </div>
                                    </div>
                                    <button className="w-full bg-[#13EC13] text-black font-bold py-5 rounded-[24px] hover:bg-[#0fd60f] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#13EC13]/20 group">
                                        Schedule Your Service
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function FeatureItem({ title, desc }: { title: React.ReactNode, desc: React.ReactNode }) {
    return (
        <div className="flex gap-4">
            <CheckCircle2 className="w-6 h-6 text-[#13EC13] flex-shrink-0" />
            <div>
                <h4 className="font-bold text-slate-900 text-lg">{title}</h4>
                <p className="text-slate-500">{desc}</p>
            </div>
        </div>
    );
}

function AddonItem({ id, label, selected, onToggle }: { id: string, label: string, selected: boolean, onToggle: (id: string) => void }) {
    return (
        <button
            onClick={() => onToggle(id)}
            className={`w-full flex justify-between items-center p-4 rounded-2xl border transition-all ${selected ? 'bg-slate-50 border-[#3B82F6] shadow-sm' : 'border-slate-100 hover:border-slate-200'
                }`}
        >
            <span className={`font-bold text-sm ${selected ? 'text-slate-900' : 'text-slate-500'}`}>{label}</span>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selected ? 'bg-[#3B82F6] border-[#3B82F6]' : 'border-slate-200'
                }`}>
                {selected && <CheckCircle2 className="w-4 h-4 text-white" />}
            </div>
        </button>
    );
}
