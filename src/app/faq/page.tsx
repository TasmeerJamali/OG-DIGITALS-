"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Plus, X, ArrowUpRight } from "lucide-react";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import Link from "next/link";

// Fonts
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

// Scraped Data from QuietCubes
const faqData = [
    {
        id: "01",
        question: "What is the OG Digitals approach?",
        answer: "We are a premium digital agency that blends high-end aesthetics with technical precision. We offer modular, scalable web solutions that are beautifully designed and built for performance. We serve startups, enterprises, and visionaries across the globe."
    },
    {
        id: "02",
        question: "Are your websites really SEO optimized?",
        answer: "Yes. All our digital products are built with a 'data-first' architecture. We ensure semantic HTML, fast load times (Core Web Vitals), and structured data to maximize your visibility on search engines."
    },
    {
        id: "03",
        question: "Do projects require ongoing maintenance?",
        answer: "Nope! Our builds are designed for stability. However, for dynamic businesses, we offer comprehensive maintenance packages to handle content updates, security patches, and feature expansions."
    },
    {
        id: "04",
        question: "How long does delivery take?",
        answer: "Typical lead time is 4–8 weeks for a standard corporate site, depending on customization. Complex web applications or 3D experiences may take 10–14 weeks."
    },
    {
        id: "05",
        question: "What’s the payment structure?",
        answer: "We typically operate on a 50/50 or 40/30/30 milestone basis. This ensures mutual commitment and keeps the project moving smoothly from design to deployment."
    },
    {
        id: "06",
        question: "What tech stack is required?",
        answer: "We build on modern stacks: Next.js, React, and Node.js. This ensures your platform is future-proof, secure, and infinitely scalable compared to legacy CMS builders."
    },
    {
        id: "07",
        question: "Can I customize my project later?",
        answer: "Yes! We build with modular components. You can easily add new pages, features, or integrations as your business grows without rebuilding the foundation."
    },
    {
        id: "08",
        question: "Is there a warranty or support period?",
        answer: "Yes, all projects come with a 30-day post-launch support window to handle any immediate tweaks or bugs. Extended support is available via retainer."
    },
    {
        id: "09",
        question: "Do you work with international clients?",
        answer: "Yes! We work with clients globally, from New York to Dubai. Our remote-first workflow ensures seamless communication regardless of time zones."
    },
    {
        id: "10",
        question: "What is included with the handover?",
        answer: "You receive full source code ownership, documentation, and a training session on how to manage your new platform. We don't believe in vendor lock-in."
    }
];

export default function FAQ() {
    return (
        <main className={`min-h-screen bg-[#0a0a0a] text-white selection:bg-[#a8ffc4] selection:text-black ${spaceGrotesk.className}`}>
            <Navigation />

            {/* 1. Spacer for Navbar */}
            <div className="h-[20vh] bg-[#0a0a0a]" />

            {/* 2. "Let's Break It Down" Transition Section */}
            <BreakdownSection />

            {/* 3. Main FAQ Section */}
            <section className="relative px-6 md:px-12 py-40 min-h-screen bg-[#0a0a0a] z-20">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">

                    {/* LEFT COLUMN - Sticky Info */}
                    <div className="lg:col-span-5 lg:sticky lg:top-40 h-fit">
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className={`${playfair.className} text-[20vw] lg:text-[15vw] leading-[0.8] tracking-tight mb-12 text-[#a8ffc4] opacity-90`}
                        >
                            FAQ
                        </motion.h1>

                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-2xl md:text-3xl font-medium mb-8 text-white"
                        >
                            Got questions? We’ve gathered the most common ones here — along with simple, helpful answers to guide you through.
                        </motion.h2>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 mt-12"
                        >
                            <Link href="/contact" className="px-8 py-4 bg-[#a8ffc4] text-black font-bold text-lg rounded-full hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2">
                                Contact Us <ArrowUpRight className="w-5 h-5" />
                            </Link>
                            <Link href="/services" className="px-8 py-4 border border-white/20 text-white font-medium text-lg rounded-full hover:bg-white/5 transition-colors duration-300 flex items-center justify-center">
                                View Services
                            </Link>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN - Question List */}
                    <div className="lg:col-span-7 lg:col-start-7 mt-12 lg:mt-32">
                        <div className="flex flex-col border-t border-white/10">
                            {faqData.map((item, index) => (
                                <FAQItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

// "Break It Down" Scroll Transition Component
function BreakdownSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Create a diagonal clip path reveal
    // Start: a small slit. End: Full open.
    const clipPath = useTransform(scrollYProgress, [0.2, 0.8], ["polygon(0 40%, 100% 0, 100% 60%, 0% 100%)", "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section ref={containerRef} className="relative h-[80vh] flex items-center justify-center overflow-hidden py-20">
            {/* Background Shape */}
            <motion.div
                style={{ clipPath, scale, opacity }}
                className="absolute inset-0 bg-[#a8ffc4] z-0 flex items-center justify-center"
            >
                <div className="w-full max-w-[1800px] px-12 flex justify-between items-end text-black">
                    <h2 className={`${playfair.className} text-[6vw] font-bold leading-none`}>
                        Let&#39;s Break It Down.
                    </h2>
                    <h3 className={`${spaceGrotesk.className} text-xl md:text-2xl font-medium mb-4`}>
                        ( THE DETAILS )
                    </h3>
                </div>
            </motion.div>
        </section>
    )
}

function FAQItem({ item }: { item: any }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10 group">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-12 flex items-start justify-between text-left group-hover:bg-white/5 px-6 -mx-6 rounded-xl transition-colors duration-300"
            >
                <div className="pr-12 max-w-xl">
                    <h3 className={`text-2xl md:text-3xl font-light transition-colors duration-300 ${isOpen ? "text-[#a8ffc4]" : "text-white group-hover:text-white/80"}`}>
                        {item.question}
                    </h3>
                </div>

                {/* Icon Circle */}
                <div className={`shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 ${isOpen ? "bg-[#a8ffc4] border-[#a8ffc4] rotate-180" : "bg-transparent group-hover:border-white"}`}>
                    {isOpen ? (
                        <X className="w-5 h-5 text-black transition-transform duration-300" />
                    ) : (
                        <Plus className="w-5 h-5 text-white transition-transform duration-300" />
                    )}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-12 pl-0 md:pl-0 max-w-2xl">
                            <p className="text-xl text-white/60 leading-relaxed font-light">
                                {item.answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
