import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Info, Briefcase, BookOpen, Newspaper, Mail } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { BrandedContent } from '../components/BrandedContent';

export default function CompanyPage() {
    const { pageId } = useParams<{ pageId: string }>();
    const { content } = useContent();

    const pageData = content.company?.[pageId || ''];

    if (!pageData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h1>
                    <Link to="/" className="text-[#13EC13] hover:underline flex items-center gap-2 justify-center">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const getIcon = () => {
        switch (pageId) {
            case 'about-us': return <Info className="w-8 h-8 text-[#13EC13]" />;
            case 'careers': return <Briefcase className="w-8 h-8 text-blue-500" />;
            case 'blog': return <BookOpen className="w-8 h-8 text-purple-500" />;
            case 'press': return <Newspaper className="w-8 h-8 text-orange-500" />;
            default: return <Info className="w-8 h-8 text-[#13EC13]" />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-20">
            <div className="container mx-auto px-6">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Overview</span>
                </Link>

                <div className="grid lg:grid-cols-[1fr_3fr] gap-12">
                    {/* Sidebar */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-32">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Sections</h3>
                            <nav className="space-y-4">
                                {pageData.sections?.map((section: any, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            const el = document.getElementById(`section-${idx}`);
                                            el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }}
                                        className="block text-slate-600 hover:text-[#13EC13] transition-colors text-sm font-medium text-left"
                                    >
                                        {idx + 1}. {section.title}
                                    </button>
                                ))}
                            </nav>

                            <div className="mt-12 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-slate-50 rounded-lg">
                                        <Mail className="w-5 h-5 text-[#13EC13]" />
                                    </div>
                                    <h4 className="font-bold text-slate-900">Get in touch</h4>
                                </div>
                                <p className="text-sm text-slate-500 mb-4">
                                    Have questions about {pageData.title}?
                                </p>
                                <a
                                    href={`mailto:${content.footer.contact.email}`}
                                    className="block w-full py-3 bg-slate-900 text-white text-center rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
                                >
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 md:p-12 lg:p-16">
                            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                                    {getIcon()}
                                </div>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
                                        <BrandedContent text={pageData.title} />
                                    </h1>
                                    <p className="text-xl text-slate-500 font-medium">{pageData.subtitle}</p>
                                </div>
                            </div>

                            <div className="prose prose-slate max-w-none">
                                {pageData.sections?.map((section: any, idx: number) => (
                                    <section key={idx} id={`section-${idx}`} className="mb-12 last:mb-0">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-[#13EC13] font-black text-xl">§</span>
                                            <h2 className="text-2xl font-bold text-slate-900 m-0">{section.title}</h2>
                                        </div>
                                        <div className="text-slate-600 leading-relaxed text-lg">
                                            <BrandedContent text={section.content} />
                                        </div>
                                    </section>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
