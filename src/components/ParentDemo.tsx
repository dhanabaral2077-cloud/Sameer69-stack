import React from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Search, Calendar, ClipboardList, MessageSquare, Plus } from 'lucide-react';

const SPECIES_ICONS: Record<string, string> = {
    dog: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    cat: "https://cdn-icons-png.flaticon.com/512/616/616430.png",
    bird: "https://cdn-icons-png.flaticon.com/512/616/616614.png",
    other: "https://cdn-icons-png.flaticon.com/512/616/616432.png",
};

export default function ParentDemo() {
    const [activeTab, setActiveTab] = React.useState('search');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            className="flex flex-col h-full bg-[#F8FAFC] relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* App Header */}
            <div className="bg-white px-5 pt-8 pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <p className="text-[11px] font-medium text-slate-400 leading-tight">Good Morning,</p>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">Sameer</h3>
                </div>
                <div className="relative w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full border border-slate-100">
                    <img src="/assets/Notifications.png" className="w-8 h-8 opacity-80" alt="Notifications" />
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">2</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pt-4 pb-20">
                {/* Hero CTA */}
                <motion.div variants={itemVariants} className="px-5 mb-6">
                    <div className="bg-[#13EC13] rounded-3xl p-5 relative overflow-hidden shadow-lg shadow-[#13EC13]/20 group cursor-pointer">
                        <div className="relative z-10 max-w-[60%]">
                            <h4 className="text-xl font-bold text-white mb-1">Find Care Now</h4>
                            <p className="text-[11px] text-white/90 leading-tight">Broadcast to caregivers near you instantly</p>
                        </div>
                        <div className="absolute -right-2 -bottom-4 w-28 h-28 transform group-hover:scale-110 transition-transform duration-500">
                            <img src="/assets/FindCare.png" className="w-full h-full object-contain" alt="Find Care" />
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div variants={itemVariants} className="px-5 mb-8 flex justify-between">
                    {[
                        { id: 'broadcast', label: 'Broadcast', icon: '/assets/broadcast.png' },
                        { id: 'bookings', label: 'Bookings', icon: '/assets/bookings.png' },
                        { id: 'messages', label: 'Messages', icon: '/assets/Messages.png' },
                    ].map((action) => (
                        <div key={action.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1">
                                <img src={action.icon} className="w-12 h-12 object-contain" alt={action.label} />
                            </div>
                            <span className="text-[11px] font-bold text-slate-700">{action.label}</span>
                        </div>
                    ))}
                </motion.div>

                {/* My Fur Babies */}
                <motion.div variants={itemVariants} className="mb-8">
                    <div className="px-5 flex justify-between items-center mb-4">
                        <h4 className="text-sm font-bold text-slate-900">My Fur Babies</h4>
                    </div>
                    <div className="flex gap-4 overflow-x-auto px-5 pb-2 no-scrollbar">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border-2 border-dashed border-slate-200">
                                <Plus className="w-6 h-6 text-slate-400" />
                            </div>
                            <span className="text-[11px] font-medium text-slate-500">Add Pet</span>
                        </div>
                        {[
                            { id: 1, name: 'Bruno', species: 'dog', photo: '/assets/icon.png' },
                            { id: 2, name: 'Luna', species: 'cat' },
                        ].map((pet) => (
                            <div key={pet.id} className="flex flex-col items-center gap-2">
                                <div className="w-14 h-14 bg-white rounded-full p-0.5 border-2 border-[#13EC13] flex items-center justify-center overflow-hidden">
                                    <img
                                        src={pet.photo || SPECIES_ICONS[pet.species] || SPECIES_ICONS.other}
                                        className="w-full h-full object-cover rounded-full"
                                        alt={pet.name}
                                    />
                                </div>
                                <span className="text-[11px] font-bold text-slate-900">{pet.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Top Caregivers */}
                <motion.div variants={itemVariants} className="px-5">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-bold text-slate-900">Top Caregivers Near You</h4>
                        <span className="text-[11px] font-bold text-[#13EC13] cursor-pointer">See All</span>
                    </div>
                    <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col gap-4">
                        <div className="flex gap-3">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden">
                                    <img src="https://i.pravatar.cc/150?u=sarah" className="w-full h-full object-cover" alt="Caregiver" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h5 className="text-sm font-bold text-slate-900">Sarah K.</h5>
                                    <div className="flex items-center gap-1 bg-[#13EC13]/10 px-2 py-0.5 rounded-full">
                                        <Star className="w-3 h-3 fill-[#13EC13] text-[#13EC13]" />
                                        <span className="text-[10px] font-bold text-[#13EC13]">4.9</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-slate-400 mb-2">
                                    <MapPin className="w-3 h-3" />
                                    <span className="text-[10px] font-medium">0.8 km away • Kathmandu</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-[9px] font-bold px-2 py-1 bg-slate-50 text-slate-500 rounded-lg">Dog Walking</span>
                                    <span className="text-[9px] font-bold px-2 py-1 bg-slate-50 text-slate-500 rounded-lg">Pet Sitting</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[1px] bg-slate-50 w-full" />
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1 text-xs">
                                <span className="text-slate-400 text-[10px]">from</span>
                                <span className="font-bold text-[#13EC13]">₨ 500</span>
                                <span className="text-slate-400 text-[10px]">/hr</span>
                            </div>
                            <button className="bg-[#13EC13]/10 text-[#13EC13] px-4 py-1.5 rounded-xl text-[11px] font-bold hover:bg-[#13EC13] hover:text-white transition-all">
                                View Profile
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* App Tab Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex justify-between items-center z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                {[
                    { id: 'search', icon: Search, label: 'Search' },
                    { id: 'bookings', icon: Calendar, label: 'Bookings' },
                    { id: 'inbox', icon: MessageSquare, label: 'Inbox' },
                    { id: 'profile', icon: Plus, label: 'Profile' },
                ].map((tab) => (
                    <div
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${activeTab === tab.id ? 'text-[#13EC13]' : 'text-slate-300'}`}
                    >
                        {tab.id === 'profile' ? (
                            <div className={`w-6 h-6 rounded-full bg-slate-100 border-2 ${activeTab === tab.id ? 'border-[#13EC13]' : 'border-transparent'}`} />
                        ) : (
                            <tab.icon className="w-5 h-5" />
                        )}
                        <span className="text-[9px] font-bold">{tab.label}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
