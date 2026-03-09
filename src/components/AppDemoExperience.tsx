import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ParentDemo from './ParentDemo';
import CaregiverDemo from './CaregiverDemo';

type Role = 'parent' | 'caregiver';

export default function AppDemoExperience() {
    const [activeRole, setActiveRole] = React.useState<Role>('parent');

    return (
        <div className="w-full max-w-[340px] mx-auto group perspective-1000">
            {/* Device Frame */}
            <div className="relative aspect-[9/19] bg-slate-900 rounded-[3rem] p-3 shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_40px_100px_-20px_rgba(0,0,0,0.5)] border-[8px] border-slate-900 ring-1 ring-slate-800">

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center gap-1.5">
                    <div className="w-10 h-1.5 bg-slate-800 rounded-full" />
                    <div className="w-2 h-2 bg-slate-800 rounded-full" />
                </div>

                {/* Demo Content Container */}
                <div className="relative w-full h-full bg-white rounded-[2.2rem] overflow-hidden">
                    <AnimatePresence mode="wait">
                        {activeRole === 'parent' ? (
                            <motion.div
                                key="parent"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 20, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                                className="h-full"
                            >
                                <ParentDemo />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="caregiver"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 20, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                                className="h-full"
                            >
                                <CaregiverDemo />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Floating Role Toggle - Native Style */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full flex justify-center">
                    <div className="bg-white/10 backdrop-blur-xl p-1 rounded-2xl border border-white/20 flex gap-1 shadow-2xl">
                        {(['parent', 'caregiver'] as const).map((role) => (
                            <button
                                key={role}
                                onClick={() => setActiveRole(role)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeRole === role
                                        ? 'bg-[#13EC13] text-white shadow-lg'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {role === 'parent' ? 'Pet Parent' : 'Caregiver'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Side Decorative Elements */}
            <div className="absolute -z-10 -inset-8 bg-[#13EC13]/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>
    );
}
