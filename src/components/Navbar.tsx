import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export default function Navbar() {
  const { content } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const services = [
    { name: 'Pet Sitting', href: '/services/pet-sitting', icon: <img src="/assets/Services Icons/Sitting.png" className="w-5 h-5 object-contain" /> },
    { name: 'Pet Boarding', href: '/services/pet-boarding', icon: <img src="/assets/Services Icons/Boarding1.png" className="w-5 h-5 object-contain" /> },
    { name: 'Dog Walking', href: '/services/dog-walking', icon: <img src="/assets/Services Icons/Walking.png" className="w-5 h-5 object-contain" /> },
    { name: 'Grooming', href: '/services/pet-grooming', icon: <img src="/assets/Services Icons/Grooming.png" className="w-5 h-5 object-contain" /> },
    { name: 'Training', href: '/services/pet-training', icon: <img src="/assets/Services Icons/TrainingIcon.png" className="w-5 h-5 object-contain" /> },
    { name: 'Vet Visits', href: '/services/vet-visits', icon: <img src="/assets/Services Icons/VetIcon.png" className="w-5 h-5 object-contain" /> },
  ];

  const navLinks = [
    { name: 'How It Works', href: isHome ? '#how-it-works' : '/#how-it-works' },
    { name: 'Safety', href: isHome ? '#safety' : '/#safety' },
    { name: 'App Features', href: isHome ? '#app-showcase' : '/#app-showcase' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
        ? 'glass-morphism border-b border-white/20 py-3 shadow-lg shadow-black/5'
        : 'bg-transparent py-6'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-black/5 overflow-hidden border border-slate-100">
            <img src="/assets/icon.png" alt="PawPal" className="w-8 h-8 object-contain" />
          </div>
          <div className="h-8 lg:h-10 ml-1">
            <img
              src="/assets/4Kpawpal.png"
              alt="PawPal"
              className="h-full w-auto object-contain"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          <div className="flex items-center bg-white/50 backdrop-blur-sm p-1.5 rounded-full border border-slate-200/50 mr-4">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className={`flex items-center gap-1 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isServicesOpen ? 'bg-[#13EC13] text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-white'}`}>
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 overflow-hidden"
                  >
                    {services.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#13EC13] group-hover:bg-[#13EC13] group-hover:text-white transition-colors">
                          {item.icon}
                        </div>
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                className="px-5 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white transition-all duration-300"
              >
                {content.navbar.links[idx]?.label || link.name}
              </a>
            ))}
          </div>

          <button className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#13EC13] hover:text-white transition-all duration-300 shadow-lg hover:shadow-[#13EC13]/30 flex items-center gap-2 group">
            {content.navbar.ctaText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-900 bg-slate-100 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 absolute w-full left-0 top-full shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Services</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {services.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 text-slate-600 hover:bg-[#13EC13]/10 hover:text-[#13EC13] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="text-[#13EC13]">{item.icon}</div>
                    <span className="text-xs font-bold">{item.name}</span>
                  </Link>
                ))}
              </div>
              <div className="h-px bg-slate-100 my-2"></div>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 font-bold text-lg py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="bg-[#13EC13] text-white w-full py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-200 mt-4">
                Download App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
