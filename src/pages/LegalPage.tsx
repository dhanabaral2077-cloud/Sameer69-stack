import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { ArrowLeft, ShieldCheck, Scale, FileText } from 'lucide-react';

const LegalPage: React.FC = () => {
    const { pageId } = useParams<{ pageId: string }>();
    const { content } = useContent();
    const legalData = content.legal?.[pageId as keyof typeof content.legal];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pageId]);

    if (!legalData) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 text-center">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Document Not Found</h1>
                    <p className="text-slate-600 mb-8">The requested legal document could not be located.</p>
                    <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-slate-900 rounded-full font-semibold hover:opacity-90 transition-opacity">
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const getIcon = () => {
        switch (pageId) {
            case 'terms-of-service': return <Scale size={48} className="text-secondary" />;
            case 'privacy-policy': return <FileText size={48} className="text-primary" />;
            case 'trust-and-safety': return <ShieldCheck size={48} className="text-accent" />;
            default: return <FileText size={48} className="text-slate-400" />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-colors mb-8 group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Overview
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
                        <div className="p-4 bg-white rounded-2xl shadow-sm w-fit">
                            {getIcon()}
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                                {legalData.title}
                            </h1>
                            {legalData.lastUpdated && (
                                <p className="text-slate-500 mt-2 font-medium">Last Updated: {legalData.lastUpdated}</p>
                            )}
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Navigation Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-1 border-r border-slate-200 pr-6 hidden lg:block"
                    >
                        <div className="sticky top-40 space-y-4">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Sections</h3>
                            {legalData.sections.map((section: any, idx: number) => (
                                <a
                                    key={idx}
                                    href={`#section-${idx}`}
                                    className="block text-sm font-semibold text-slate-600 hover:text-primary transition-colors py-1"
                                >
                                    {section.title}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-3 prose prose-slate max-w-none"
                    >
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                            {legalData.sections.map((section: any, idx: number) => (
                                <div key={idx} id={`section-${idx}`} className="mb-12 last:mb-0">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                        <span className="text-primary opacity-50 text-base">§</span>
                                        {section.title}
                                    </h2>
                                    <div className="text-slate-600 leading-relaxed space-y-4 text-lg">
                                        {section.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-8 bg-slate-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Have questions about our policies?</h3>
                                <p className="text-slate-400">Our legal team in Kathmandu is here to help.</p>
                            </div>
                            <a href="mailto:legal@pawpal.com.np" className="px-8 py-3 bg-primary text-slate-900 rounded-full font-bold hover:opacity-90 transition-opacity">
                                Contact Legal
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
