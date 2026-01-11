"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Plus, X, ArrowUpRight } from "lucide-react";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

// ----------------------------------------------------------------------
// 1. CONFIGURATION & ASSETS
// ----------------------------------------------------------------------

const playfair = Playfair_Display({ 
    subsets: ["latin"], 
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-playfair"
});

const spaceGrotesk = Space_Grotesk({ 
    subsets: ["latin"], 
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-space"
});

// Full FAQ Data Set (10 Items as requested)
const faqData = [
    {
        id: "01",
        question: "What is the OG Digitals architecture?",
        answer: "We maximize digital performance by blending high-end aesthetics with technical precision. Our architecture is built on a 'modular-first' principle, meaning every component—from the navigation to the database—is designed to be scalable, reusable, and infinitely adaptable. We don't just build websites; we engineer digital ecosystems."
    },
    {
        id: "02",
        question: "Are your platforms truly SEO optimized?",
        answer: "Optimization is in our DNA. We go beyond basic meta tags. We implement semantic HTML5, rigorous structured data (Schema.org), and achieve sub-second Core Web Vitals scores. Our 'data-first' rendering strategy ensures that search engines can crawl, index, and rank your content more effectively than your competitors."
    },
    {
        id: "03",
        question: "Do projects require ongoing maintenance?",
        answer: "Unlike fragile templates that break with every plugin update, our bespoke builds are engineered for stability. However, digital landscapes evolve using new browser standards and security protocols. We offer comprehensive maintenance suites (Security, Performance, Content) to ensure your platform remains at the bleeding edge."
    },
    {
        id: "04",
        question: "How long does a typical delivery take?",
        answer: "Precision takes time, but we move fast. A standard corporate identity platform is typically delivered in 4–6 weeks. Complex web applications, SaaS dashboards, or immersive 3D experiences generally range from 8–12 weeks. We provide a granular timeline during onboarding so you never have to guess."
    },
    {
        id: "05",
        question: "What is your payment structure?",
        answer: "We value partnership and transparency. Our standard engagement model operates on a 50/50 or 40/30/30 milestone basis. This shared commitment ensures project velocity and aligns our incentives with your successful launch."
    },
    {
        id: "06",
        question: "What technology stack do you use?",
        answer: "We deploy on the Vercel Edge Network using Next.js 14, React, and Tailwind CSS for the frontend, with robust Node.js or Python backends. This 'Jamstack' approach guarantees your platform is secure, practically un-hackable, and scales globally without expensive server management."
    },
    {
        id: "07",
        question: "Can I customize the design later?",
        answer: "Absolutely. We build with a 'Headless' philosophy. Your content is decoupled from the design, allowing you to refresh the frontend visuals or add new feature sets without rebuilding the entire backend engine. It's future-proofing by design."
    },
    {
        id: "08",
        question: "Is there a warranty or support period?",
        answer: "Every project launches with a dedicated 30-day Hypercare period. We monitor logs, fix any immediate anomalies, and ensure your team is fully trained. Beyond that, our support retainers act as your dedicated DevOps team on call."
    },
    {
        id: "09",
        question: "Do you collaborate with international teams?",
        answer: "We are a decentralized, remote-first collective. Whether you are in New York, London, or Dubai, our async-first workflow and transparent documentation ensure seamless collaboration across time zones. We currently serve clients in 7 different countries."
    },
    {
        id: "10",
        question: "What do I own at the end?",
        answer: "You own everything. The code, the design assets, the deployment configurations, and the IP. We believe in empowering our clients, not locking them in. You will receive a full handover repository and credentials upon completion."
    }
];

// ----------------------------------------------------------------------
// 2. MAIN PAGE COMPONENT
// ----------------------------------------------------------------------

export default function FAQ() {
    return (
        <main className={`min-h-screen bg-[#050505] text-white selection:bg-[#a8ffc4] selection:text-black ${spaceGrotesk.className}`}>
            <Navigation />
            
            {/* Smooth Scroll Wrapper Effect could go here if using Lenis, but native scroll is safer for now */}
            
            {/* A. Spacer to mimic the scroll depth before the reveal */}
            <div className="h-[25vh] md:h-[40vh] w-full bg-[#050505] relative z-0 flex items-end justify-center pb-20">
                <p className="text-white/20 text-sm uppercase tracking-[0.2em] font-light animate-pulse">
                    ( Scroll to Reveal )
                </p>
            </div>

            {/* B. The "Tearing/Breaking" Transition Section */}
            <BreakdownTransition />

            {/* C. The Core Layout (Sticky Left + Scrollable Right) */}
            <div className="relative z-10 bg-[#050505]">
                <section className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-40">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                        
                        {/* sticky wrapper */}
                        <div className="lg:col-span-5 relative">
                             <div className="sticky top-32 lg:h-[calc(100vh-8rem)] flex flex-col justify-start">
                                 <StickyHeader />
                             </div>
                        </div>

                        {/* scrollable list */}
                        <div className="lg:col-span-7 pt-12 lg:pt-32">
                             <FAQList />
                        </div>

                    </div>
                </section>

                <Footer />
            </div>
        </main>
    );
}

// ----------------------------------------------------------------------
// 3. TEARING / BREAKDOWN TRANSITION COMPONENT
// ----------------------------------------------------------------------
// This component implements the "glitch/cut" effect where the page splits.

function BreakdownTransition() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // We create Two layers to simulate the "Tear"
    // 1. The Top Layer (Black) that pulls away
    // 2. The Reveal Layer (Green) that expands
    
    // Parallax speed for the gltich effect
    const yMovement = useTransform(scrollYProgress, [0, 1], [0, -100]);
    
    // The "Cut" Clip Paths - Using Polygon to create a sharp diagonal tearing edge
    // Start: Closed (Top covers bottom)
    // End: Open (Top reveals bottom)
    
    // Primary Cut: Top Left to Bottom Right
    const cutProgress = useTransform(scrollYProgress, [0.3, 0.7], [0, 100]);
    
    // Using simple scaling for robustness, complex clip-paths can flicker on some browsers
    // We will use a mask-like approach with two overlapping divs
    
    const scaleY = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
    const originY = "bottom";

    return (
        <section ref={containerRef} className="relative h-[80vh] md:h-[100vh] w-full flex items-center justify-center overflow-hidden bg-[#050505]">
            
            {/* The Green "Inside" Layer */}
            <motion.div 
                style={{ scaleY, transformOrigin: "bottom" }}
                className="absolute inset-0 z-10 bg-[#a8ffc4] w-full h-full flex items-center justify-center origin-bottom"
            >
                <div className="relative w-full max-w-[1800px] px-6 lg:px-20 h-full flex flex-col justify-center items-start">
                    
                    {/* Visual noise/grain overlay for "glitch" feel */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    
                    {/* Floating Glitch Text */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative z-20 mix-blend-multiply"
                    >
                         <h2 className={`${playfair.className} text-black text-[12vw] md:text-[8vw] font-bold leading-[0.85] tracking-tighter`}>
                             Let&#39;s Break<br />It Down.
                         </h2>
                         <div className="h-2 w-40 bg-black mt-8" />
                         <p className="mt-6 text-black/80 font-mono text-sm tracking-widest uppercase">
                             / Transparency Protocol
                         </p>
                    </motion.div>

                    {/* Decorative Diagonal Line */}
                    <motion.div 
                        style={{ scaleX: scrollYProgress }}
                        className="absolute right-0 bottom-40 w-[60%] h-[1px] bg-black origin-right"
                    />
                </div>
            </motion.div>

            {/* The "Tear" Edge - A jagged SVG separator if we wanted, or just the sharp cut of the div above */}
            {/* Simulating a secondary "shard" for the glitch effect */}
            <motion.div 
                style={{ 
                    scaleY: useTransform(scrollYProgress, [0.25, 0.65], [0, 1]),
                    opacity: useTransform(scrollYProgress, [0.25, 0.3], [0, 0.5]) 
                }}
                className="absolute inset-0 z-0 bg-white/20 mix-blend-overlay origin-bottom pointer-events-none"
            />
            
        </section>
    );
}

// ----------------------------------------------------------------------
// 4. STICKY HEADER COMPONENT
// ----------------------------------------------------------------------

function StickyHeader() {
    return (
        <div className="flex flex-col h-full justify-between pb-10">
            <div>
                {/* Floating Label */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-8"
                >
                    <span className="h-2 w-2 rounded-full bg-[#a8ffc4] animate-pulse" />
                    <span className="text-[#a8ffc4] text-xs font-bold tracking-[0.2em] uppercase">
                        Knowledge Base
                    </span>
                </motion.div>

                {/* Massive Title */}
                <motion.h1 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`${playfair.className} text-[22vw] lg:text-[14vw] leading-[0.75] font-medium text-white tracking-tighter ml-[-0.05em]`}
                >
                    FAQ
                </motion.h1>

                {/* Subtitle */}
                <motion.h3 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-12 text-2xl md:text-3xl text-white/90 font-light leading-snug max-w-md"
                >
                    Got questions? We&#39;ve gathered the most common ones here — along with simple, helpful answers to guide you through.
                </motion.h3>
            </div>

            {/* CTA Actions */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-12 flex flex-col sm:flex-row gap-6"
            >
                <Link 
                    href="/contact" 
                    className="group relative px-8 py-4 bg-[#a8ffc4] rounded-full overflow-hidden flex items-center justify-center gap-3"
                >
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    <span className="relative z-10 text-black font-bold text-lg group-hover:tracking-wider transition-all duration-300">
                        Contact Us
                    </span>
                    <ArrowUpRight className="relative z-10 w-5 h-5 text-black group-hover:rotate-45 transition-transform duration-300" />
                </Link>

                <Link 
                    href="/services" 
                    className="group px-8 py-4 border border-white/20 rounded-full flex items-center justify-center gap-3 hover:bg-white/5 transition-colors duration-300"
                >
                    <span className="text-white font-medium text-lg">
                        View Services
                    </span>
                </Link>
            </motion.div>
        </div>
    );
}

// ----------------------------------------------------------------------
// 5. LIST & ACCORDION COMPONENT
// ----------------------------------------------------------------------

function FAQList() {
    // We explicitly type the state to allow singular open items (accordion style)
    const [openId, setOpenId] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setOpenId(prev => prev === id ? null : id);
    };

    return (
        <div className="flex flex-col w-full">
            {/* Top Border */}
            <div className="w-full h-[1px] bg-white/20 mb-0" />

            {faqData.map((item, index) => (
                <AccordionItem 
                    key={item.id} 
                    item={item} 
                    isOpen={openId === item.id} 
                    onToggle={() => handleToggle(item.id)}
                    index={index}
                />
            ))}
        </div>
    );
}

function AccordionItem({ 
    item, 
    isOpen, 
    onToggle,
    index 
}: { 
    item: typeof faqData[0], 
    isOpen: boolean, 
    onToggle: () => void,
    index: number 
}) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="border-b border-white/10"
        >
            <button 
                onClick={onToggle}
                className="group w-full py-10 md:py-12 flex items-start text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#a8ffc4]"
            >
                {/* ID Number */}
                <div className="hidden md:block w-24 pt-2 shrink-0">
                    <span className={`font-mono text-sm tracking-widest transition-colors duration-300 ${isOpen ? 'text-[#a8ffc4]' : 'text-white/40'}`}>
                        /{item.id}
                    </span>
                </div>

                {/* Question */}
                <div className="flex-grow pr-8 md:pr-12">
                    <h3 className={`text-2xl md:text-4xl font-light transition-all duration-300 ease-out ${isOpen ? 'text-[#a8ffc4] translate-x-4' : 'text-white group-hover:text-white/80'}`}>
                        {item.question}
                    </h3>
                </div>

                {/* Interactive Icon */}
                <div className="shrink-0 pt-2">
                    <div className={`relative w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 overflow-hidden ${isOpen ? 'bg-[#a8ffc4] border-[#a8ffc4]' : 'bg-transparent group-hover:border-white'}`}>
                        {/* Wrapper for the rotation */}
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            className="relative"
                        >
                            {isOpen ? (
                                <X className="w-5 h-5 text-black" />
                            ) : (
                                <Plus className="w-5 h-5 text-white" />
                            )}
                        </motion.div>
                    </div>
                </div>
            </button>

            {/* Answer Reveal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ 
                            height: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] },
                            opacity: { duration: 0.3, delay: 0.1 } 
                        }}
                        className="overflow-hidden"
                    >
                        <div className="pb-12 md:pl-24 max-w-4xl">
                            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
                                {item.answer}
                            </p>
                            
                            {/* Decorative tiny footer in answer */}
                            <div className="mt-8 flex items-center gap-2 opacity-30">
                                <div className="h-[1px] w-12 bg-white" />
                                <span className="text-[10px] uppercase tracking-widest">End of Answer</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
