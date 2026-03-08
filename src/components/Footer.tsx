import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { BrandedContent } from './BrandedContent';

export default function Footer() {
  const { content } = useContent();
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <div className="bg-white p-3 rounded-xl inline-block mb-2">
                <img
                  src="/assets/icon.png"
                  alt="Pawpal"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div className="h-6">
                <img
                  src="/assets/4Kpawpal.png"
                  alt="PawPal"
                  className="h-full w-auto object-contain brightness-0 invert"
                />
              </div>
            </div>
            <div className="text-slate-400 mb-6">
              <span>
                <BrandedContent text={content.footer.description} invert logoClassName="h-3.5 w-auto inline-block align-middle mb-0.5" />
              </span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#13EC13] hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#13EC13] hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#13EC13] hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              {content.footer.companyLinks?.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link to={link.href} className="hover:text-[#13EC13] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4">
              {content.footer.legalLinks?.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link to={link.href} className="hover:text-[#13EC13] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#13EC13]" />
                <span>{content.footer.contact.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#13EC13]" />
                <span>{content.footer.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#13EC13]" />
                <span>{content.footer.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Pet Care Nepal. All rights reserved. Made with ❤️ for Pets in Nepal.
          </p>
        </div>
      </div>
    </footer>
  );
}
