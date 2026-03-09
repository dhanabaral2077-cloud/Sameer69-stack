import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MapPin, Bell, Menu, TrendingUp, Briefcase, DollarSign, CheckCircle2, X } from 'lucide-react';

export default function CaregiverDemo() {
    const [isOnline, setIsOnline] = React.useState(true);
    const [showRequest, setShowRequest] = React.useState(false);

    // Simulate a request appearing after 2 seconds
    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (isOnline) setShowRequest(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, [isOnline]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    return (
        <motion.div
            className="relative flex flex-col h-full bg-slate-100 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Simulated Map Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://api.baato.io/api/v1/static?key=baato_778c1a7d6&center=27.7172,85.3240&zoom=15&size=600x800&style=retro"
                    className="w-full h-full object-cover grayscale-[0.3]"
                    alt="Map"
                />
                {/* Animated Radar Pulse for Caregiver Location */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-[#13EC13] opacity-20 animate-ping" style={{ animationDuration: '3s' }} />
                        <div className="w-4 h-4 bg-[#13EC13] rounded-full border-2 border-white shadow-lg relative z-10" />
                    </div>
                </div>
            </div>

            {/* Floating Header */}
            <div className="absolute top-10 left-0 right-0 px-5 z-20">
                <div className="bg-white rounded-2xl p-3 shadow-lg border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                            <img src="https://i.pravatar.cc/150?u=caregiver" className="w-full h-full object-cover" alt="Profile" />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-slate-800">Sameer B.</h4>
                            <div className="flex items-center gap-1">
                                <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                                <span className="text-[10px] font-bold text-slate-500">5.0 (42 reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <Bell className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Online/Offline Toggle */}
            <div className="absolute top-40 left-1/2 -translate-x-1/2 z-20">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOnline(!isOnline)}
                    className={`px-6 py-2.5 rounded-full shadow-lg font-bold text-xs flex items-center gap-2 transition-colors duration-500 ${isOnline ? 'bg-[#13EC13] text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                >
                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white animate-pulse' : 'bg-slate-500'}`} />
                    {isOnline ? 'YOU ARE ONLINE' : 'YOU ARE OFFLINE'}
                </motion.button>
            </div>

            {/* Bottom Stats Sheet */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
                <div className="bg-white rounded-t-[40px] shadow-2xl p-6 pb-10 border-t border-slate-100">
                    <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-6" />

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 bg-green-100 rounded-lg">
                                    <DollarSign className="w-4 h-4 text-green-600" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Earnings</span>
                            </div>
                            <p className="text-xl font-black text-slate-900 leading-none">₨ 8,450</p>
                            <span className="text-[10px] font-medium text-green-500">+12% this week</span>
                        </div>

                        <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 bg-blue-100 rounded-lg">
                                    <Briefcase className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Jobs</span>
                            </div>
                            <p className="text-xl font-black text-slate-900 leading-none">12</p>
                            <span className="text-[10px] font-medium text-slate-400">Completed</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Active Job</h5>
                        <div className="bg-[#13EC13]/5 rounded-3xl p-4 border border-[#13EC13]/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white p-1 border border-slate-100">
                                    <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" className="w-full h-full object-contain" alt="Pet" />
                                </div>
                                <div>
                                    <h6 className="text-xs font-bold text-slate-900">Bruno (Golden Retriever)</h6>
                                    <p className="text-[10px] text-slate-500">Dog Walking • Ends in 15m</p>
                                </div>
                            </div>
                            <CheckCircle2 className="w-6 h-6 text-[#13EC13]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Incoming Request Overlay */}
            <AnimatePresence>
                {showRequest && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 200, opacity: 0 }}
                        className="absolute inset-0 z-30 bg-black/20 backdrop-blur-sm flex items-end justify-center p-5"
                    >
                        <motion.div
                            className="w-full bg-white rounded-[32px] overflow-hidden shadow-2xl relative"
                            layoutId="request-card"
                        >
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={() => setShowRequest(false)}
                                    className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full">
                                        <span className="text-[10px] font-black tracking-widest uppercase">New Job Request</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                        <TrendingUp className="w-3 h-3" />
                                        High Demand
                                    </div>
                                </div>

                                <div className="flex gap-4 mb-6">
                                    <div className="w-20 h-20 rounded-2xl bg-slate-50 p-2 border border-slate-100 overflow-hidden">
                                        <img src="https://cdn-icons-png.flaticon.com/512/616/616430.png" className="w-full h-full object-contain" alt="Pet" />
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="text-lg font-bold text-slate-900 leading-tight mb-1">Luna (Siamese Cat)</h5>
                                        <div className="flex items-center gap-1 text-slate-500 mb-2">
                                            <MapPin className="w-3 h-3" />
                                            <span className="text-xs font-medium">Baluwatar, 1.2 km away</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-black text-[#13EC13]">₨ 1,200</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">2 Hour Sitting</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setShowRequest(false)}
                                        className="py-3.5 rounded-2xl bg-slate-100 text-slate-500 font-bold text-sm"
                                    >
                                        Decline
                                    </button>
                                    <button
                                        onClick={() => setShowRequest(false)}
                                        className="py-3.5 rounded-2xl bg-[#13EC13] text-white font-bold text-sm shadow-lg shadow-[#13EC13]/20"
                                    >
                                        Accept Job
                                    </button>
                                </div>
                            </div>

                            {/* Countdown Progress Bar */}
                            <motion.div
                                initial={{ width: '100%' }}
                                animate={{ width: '0%' }}
                                transition={{ duration: 15, ease: 'linear' }}
                                onAnimationComplete={() => setShowRequest(false)}
                                className="h-1.5 bg-orange-400"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
