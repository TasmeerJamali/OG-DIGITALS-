"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        id: "01",
        question: "What services do you specifically offer?",
        answer: "We are a full-cycle digital agency. Our core pillars are Web Development (Next.js, 3D WebGL), SEO Strategy (Data-driven ranking), Brand Identity, and Performance Marketing. We also offer specialized AI Automation services to streamline your business operations."
    },
    {
        id: "02",
        question: "How long does a typical web project take?",
        answer: "Timelines vary by complexity. A standard corporate website typically takes 4-6 weeks from design to deployment. Complex web applications or 3D-heavy sites may range from 8-12 weeks. We prioritize quality and performance over rushing."
    },
    {
        id: "03",
        question: "Do you work with startups or only established brands?",
        answer: "We partner with visionaries at any stage. Whether you are a Series A startup looking to disrupt the market or a Fortune 500 company needing a digital refresh, our approach scales to match your ambition."
    },
    {
        id: "04",
        question: "What is your pricing model?",
        answer: "We primarily work on a project-based fixed pricing model to ensure transparency. For long-term partners, we offer retainer packages for SEO, content, and continuous development support."
    },
    {
        id: "05",
        question: "Will my website be mobile-optimized?",
        answer: "Absolutely. Mobile-first is not just a buzzword for us; it’s a standard. We ensure pixel-perfect responsiveness across all devices, from large desktop monitors to tablets and smartphones."
    },
    {
        id: "06",
        question: "can you help with ongoing maintenance?",
        answer: "Yes. Digital products are living organisms. We offer comprehensive maintenance packages that include security updates, content changes, performance monitoring, and server management."
    }
];

export default function FAQ() {
    const [openId, setOpenId] = useState<string | null>("01");

    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#a8ffc4] selection:text-black">
            <Navigation />

            {/* Header Section */}
            <section className="pt-40 pb-20 px-6 md:px-20 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[#a8ffc4]/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6"
                    >
                        Common Queries
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
                    >
                        Everything you need to know about our process, pricing, and philosophy.
                    </motion.p>
                </div>
            </section>

            {/* FAQ List */}
            <section className="pb-40 px-6 md:px-20">
                <div className="max-w-3xl mx-auto flex flex-col gap-6">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors duration-300"
                        >
                            <button
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                            >
                                <div className="flex items-center gap-6">
                                    <span className="text-[#a8ffc4] font-mono text-sm tracking-widest opacity-60">
                                        {faq.id}
                                    </span>
                                    <h3 className={`text-lg md:text-xl font-medium transition-colors duration-300 ${openId === faq.id ? 'text-white' : 'text-white/80'}`}>
                                        {faq.question}
                                    </h3>
                                </div>
                                <span className={`p-2 rounded-full border border-white/10 transition-all duration-300 ${openId === faq.id ? 'bg-[#a8ffc4] text-black rotate-180' : 'text-white'}`}>
                                    {openId === faq.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openId === faq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    >
                                        <div className="px-6 md:px-8 pb-8 pl-[4.5rem] md:pl-[6rem]">
                                            <p className="text-white/60 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
