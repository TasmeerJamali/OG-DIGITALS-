"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Plus, X, ArrowUpRight } from "lucide-react";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import Link from "next/link";

// ----------------------------------------------------------------------
// 1. CONFIGURATION
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

const faqData = [
    {
        id: "01",
        question: "What is the OG Digitals architecture?",
        answer: "We maximize digital performance by blending high-end aesthetics with technical precision. Our architecture is built on a 'modular-first' principle, meaning every component—from the navigation to the database—is designed to be scalable, reusable, and infinitely adaptable."
    },
    {
        id: "02",
        question: "Are your platforms truly SEO optimized?",
        answer: "Optimization is in our DNA. We go beyond basic meta tags. We implement semantic HTML5, rigorous structured data (Schema.org), and achieve sub-second Core Web Vitals scores. Our 'data-first' rendering strategy ensures that search engines can crawl, index, and rank your content effectively."
    },
    {
        id: "03",
        question: "Do projects require ongoing maintenance?",
        answer: "Unlike fragile templates that break with every plugin update, our bespoke builds are engineered for stability. However, we offer comprehensive maintenance suites (Security, Performance, Content) to ensure your platform remains at the bleeding edge."
    },
    {
        id: "04",
        question: "How long does a typical delivery take?",
        answer: "Precision takes time, but we move fast. A standard corporate identity platform is typically delivered in 4–6 weeks. Complex web applications, SaaS dashboards, or immersive 3D experiences generally range from 8–12 weeks."
    },
    {
        id: "05",
        question: "What is your payment structure?",
        answer: "We value partnership and transparency. Our standard engagement model operates on a 50/50 or 40/30/30 milestone basis. This shared commitment ensures project velocity and aligns our incentives with your successful launch."
    },
    {
        id: "06",
        question: "What technology stack do you use?",
        answer: "We deploy on the Vercel Edge Network using Next.js 14, React, and Tailwind CSS for the frontend, with robust Node.js or Python backends. This 'Jamstack' approach guarantees your platform is secure and scales globally."
    },
    {
        id: "07",
        question: "Can I customize the design later?",
        answer: "Absolutely. We build with a 'Headless' philosophy. Your content is decoupled from the design, allowing you to refresh the frontend visuals or add new feature sets without rebuilding the entire backend engine."
    },
    {
        id: "08",
        question: "Is there a warranty or support period?",
        answer: "Every project launches with a dedicated 30-day Hypercare period. We monitor logs, fix any immediate anomalies, and ensure your team is fully trained. Beyond that, our support retainers act as your dedicated DevOps team."
    },
    {
        id: "09",
        question: "Do you collaborate with international teams?",
        answer: "We are a decentralized, remote-first collective. We currently serve clients in 7 different countries and our async-first workflow ensures seamless collaboration across time zones."
    },
    {
        id: "10",
        question: "What do I own at the end?",
        answer: "You own everything. The code, the design assets, the deployment configurations, and the IP. We believe in empowering our clients, not locking them in."
    }
];

// ----------------------------------------------------------------------
// 3. MAIN PAGE COMPONENT
// ----------------------------------------------------------------------

export default function FAQ() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // SCROLL PHYSICS (400vh total)
    // 0.0 - 0.6 : Unzip (Horizontal)
    // 0.6 - 1.0 : Vertical Separation

    // TYPE FIX: Output numbers [0, 100] instead of strings ["0%", "100%"]
    const unzipProgress = useTransform(scrollYProgress, [0, 0.55], [0, 100]);

    // TYPE FIX: Output numbers [0, 1] instead of strings ["0%", "100%"]
    // We create a "V" shape opening or just simple vertical opening AFTER unzip
    const verticalOpen = useTransform(scrollYProgress, [0.5, 0.9], [0, 1]);

    // Now this works because verticalOpen is a number
    const topY = useTransform(verticalOpen, [0, 1], ["0%", "-105%"]);
    const bottomY = useTransform(verticalOpen, [0, 1], ["0%", "105%"]);

    // The Green Line visibility
    const lineOpacity = useTransform(scrollYProgress, [0, 0.05, 0.55, 0.6], [0, 1, 1, 0]);

    // Green Reveal Layer Visuals
    const greenOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
    const greenScale = useTransform(scrollYProgress, [0, 0.9], [0.98, 1]);

    return (
        <main className={`min-h-screen bg-[#050505] text-white selection:bg-[#a8ffc4] selection:text-black ${spaceGrotesk.className}`}>
            <Navigation />

            {/* 1. SCROLL TRIGGER CONTAINER (400vh) */}
            <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">

                {/* 2. STICKY VIEWPORT (100vh) */}
                <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">

                    {/* A. REVEAL LAYER (Green) */}
                    {/* Revealed by the clip-path of the black shutters? 
                         OR we can mask THIS layer to reveal L->R?
                         It's better to mask this layer so it appears "inside" the cut.
                     */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#a8ffc4] overflow-hidden">

                        <div className="absolute inset-0 opacity-[0.12] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                        {/* Progressive Reveal Mask (TYPE FIX: Removed parseFloat) */}
                        {/* This ensures the green content is only visible where we have 'unzipped' */}
                        <motion.div
                            style={{
                                scale: greenScale,
                                opacity: greenOpacity,
                                clipPath: useTransform(unzipProgress, (val) => `inset(0 ${100 - val}% 0 0)`)
                            }}
                            className="relative z-10 w-full max-w-[1800px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                        >
                            {/* Left Content */}
                            <div className="flex flex-col items-start text-left">
                                <h2 className={`${playfair.className} text-[12vw] md:text-[8vw] leading-[0.85] font-black text-black tracking-tighter mix-blend-multiply`}>
                                    Let&#39;s Break<br />It Down.
                                </h2>
                                <div className="mt-8 flex items-center gap-4 mix-blend-multiply opacity-80">
                                    <div className="h-[2px] w-20 bg-black" />
                                    <span className={`${spaceGrotesk.className} text-black font-bold uppercase tracking-[0.2em] text-sm`}>
                                        Detail Oriented
                                    </span>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="flex flex-col items-end text-right">
                                <h2 className={`${playfair.className} text-[10vw] md:text-[6vw] leading-[0.9] font-bold text-black/80 tracking-tighter mix-blend-multiply`}>
                                    Got<br />Questions?
                                </h2>
                                <p className="mt-6 max-w-md text-black/70 font-medium text-lg leading-relaxed mix-blend-multiply">
                                    We believe in radical transparency. Here is everything you need to know about how we work, build, and deliver.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* B. SHUTTERS (Black) */}
                    {/* TOP SHUTTER */}
                    <motion.div
                        style={{ y: topY }}
                        className="absolute top-0 left-0 w-full h-[50%] bg-[#050505] z-20 flex items-end justify-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                    >
                        <div className="absolute top-0 inset-x-0 h-full flex flex-col items-center justify-center pb-20 pointer-events-none">
                            <h1 className={`${playfair.className} text-[8vw] text-white/5 font-black tracking-tighter`}>
                                OG DIGITALS
                            </h1>
                        </div>

                        {/* LIGHT-UP LAYER tied to Zipper */}
                        <div className="absolute top-0 inset-x-0 h-full flex flex-col items-center justify-center pb-20 pointer-events-none">
                            <motion.h1
                                style={{
                                    clipPath: useTransform(unzipProgress, (val) => `inset(0 ${100 - val}% 0 0)`)
                                }}
                                className={`${playfair.className} text-[8vw] text-[#a8ffc4] font-black tracking-tighter drop-shadow-[0_0_10px_rgba(168,255,196,0.3)]`}
                            >
                                OG DIGITALS
                            </motion.h1>
                        </div>

                        {/* SVG TEETH (Pointing DOWN) */}
                        {/* We position this to hang BELOW the 50% line */}
                        <div className="absolute bottom-0 left-0 w-full h-[60px] translate-y-[99%] z-30">
                            <svg
                                viewBox="0 0 100 20"
                                className="w-full h-full text-[#050505] fill-current"
                                preserveAspectRatio="none"
                            >
                                {/* 
                                     A simple sawtooth pattern repeating.
                                     0,0 -> 10,20 -> 20,0 -> 30,20 ...
                                 */}
                                <path d="M0,0 L10,20 L20,0 L30,20 L40,0 L50,20 L60,0 L70,20 L80,0 L90,20 L100,0 L100,0 L0,0 Z" vectorEffect="non-scaling-stroke" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* BOTTOM SHUTTER */}
                    <motion.div
                        style={{ y: bottomY }}
                        className="absolute bottom-0 left-0 w-full h-[50%] bg-[#050505] z-20 flex items-start justify-center drop-shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
                    >
                        <div className="absolute bottom-0 inset-x-0 h-full flex flex-col items-center justify-center pt-20 pointer-events-none">
                            <p className="text-white/20 text-sm uppercase tracking-[0.4em] animate-pulse">
                                Scroll to Tear
                            </p>
                        </div>

                        {/* SVG TEETH (Pointing UP) */}
                        {/* We position this to stand ABOVE the 50% line */}
                        {/* It must perfectly INTERLOCK with the Top Teeth (which are 10,20 points) */}
                        <div className="absolute top-0 left-0 w-full h-[60px] -translate-y-[99%] z-30">
                            <svg
                                viewBox="0 0 100 20"
                                className="w-full h-full text-[#050505] fill-current"
                                preserveAspectRatio="none"
                            >
                                {/* Block with V-notches at top matching Top Shutter's V-spikes */}
                                {/* Line: 0,0 -> 10,20 -> 20,0 ... */}
                                {/* We want to fill BELOW this line. */}
                                {/* So: M0,0 L10,20 L20,0 ... L100,0 L100,20 L0,20 Z */}
                                <path d="M0,0 L10,20 L20,0 L30,20 L40,0 L50,20 L60,0 L70,20 L80,0 L90,20 L100,0 L100,20 L0,20 Z" vectorEffect="non-scaling-stroke" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* ZIPPER LINE */}
                    <motion.div
                        style={{
                            left: useTransform(unzipProgress, (val) => `${val}%`),
                            opacity: lineOpacity
                        }}
                        className="absolute h-full w-[2px] bg-[#a8ffc4] z-40 top-0 shadow-[0_0_20px_#a8ffc4] mix-blend-screen"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[20vh] bg-gradient-to-b from-transparent via-[#a8ffc4] to-transparent opacity-50 blur-md" />
                    </motion.div>

                </div>
            </div>

            {/* 3. MAIN CONTENT (FAQs) */}
            <div className="relative z-30 bg-[#050505] min-h-screen">
                <section className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 py-40">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                        <div className="lg:col-span-5 relative">
                            <div className="sticky top-32 h-fit flex flex-col justify-start">
                                <FAQHeader />
                            </div>
                        </div>
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
// 3. HELPER COMPONENTS
// ----------------------------------------------------------------------

function FAQHeader() {
    return (
        <div className="flex flex-col gap-8">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-3 h-3 bg-[#a8ffc4] rounded-full animate-ping" />
                    <span className="text-[#a8ffc4] font-mono text-xs uppercase tracking-widest">
                        Knowledge Base
                    </span>
                </div>
                <h1 className={`${playfair.className} text-[20vw] lg:text-[14vw] leading-[0.8] text-white tracking-tighter`}>
                    FAQ
                </h1>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-md"
            >
                <div className="w-12 h-1 bg-[#a8ffc4] mb-8" />
                <h3 className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                    Got questions? We&#39;ve gathered the most common ones here — along with simple, helpful answers to guide you through.
                </h3>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap gap-4 mt-8"
            >
                <Link href="/contact" className="px-8 py-4 bg-[#a8ffc4] rounded-full text-black font-bold flex items-center gap-2 hover:bg-white hover:scale-105 transition-all duration-300">
                    Contact Us <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link href="/services" className="px-8 py-4 border border-white/20 rounded-full text-white hover:bg-white/5 hover:border-white/40 transition-all duration-300">
                    Our Services
                </Link>
            </motion.div>
        </div>
    )
}

function FAQList() {
    const [openId, setOpenId] = useState<string | null>(null);
    return (
        <div className="flex flex-col relative w-full">
            {faqData.map((item, index) => (
                <AccordionItem
                    key={item.id}
                    item={item}
                    isOpen={openId === item.id}
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    index={index}
                />
            ))}
        </div>
    );
}

function AccordionItem({
    item,
    isOpen,
    onClick,
    index
}: {
    item: typeof faqData[0],
    isOpen: boolean,
    onClick: () => void,
    index: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="border-b border-white/10 group"
        >
            <button
                onClick={onClick}
                className="w-full py-10 md:py-14 flex items-start text-left relative z-10"
            >
                <span className="absolute -top-6 -left-6 text-[100px] font-black text-white/[0.02] pointer-events-none select-none">
                    {item.id}
                </span>
                <div className="hidden md:flex flex-col w-24 shrink-0 pt-3">
                    <span className={`font-mono text-xs tracking-widest transition-colors ${isOpen ? "text-[#a8ffc4]" : "text-white/40"}`}>
                        /{item.id}
                    </span>
                </div>
                <div className="flex-1 pr-12">
                    <h3 className={`text-2xl md:text-3xl font-light transition-all duration-300 ${isOpen ? "text-[#a8ffc4] translate-x-2" : "text-white group-hover:text-white/80"}`}>
                        {item.question}
                    </h3>
                </div>
                <div className={`shrink-0 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 overflow-hidden relative ${isOpen ? "border-[#a8ffc4]" : "border-white/20 group-hover:border-white"}`}>
                    <div className={`absolute inset-0 bg-[#a8ffc4] transition-transform duration-500 origin-center ${isOpen ? "scale-100" : "scale-0"}`} />
                    <div className="relative z-10">
                        {isOpen ? (
                            <X className="text-black w-5 h-5 transition-transform duration-500 rotate-90" />
                        ) : (
                            <Plus className="text-white w-5 h-5 transition-transform duration-500" />
                        )}
                    </div>
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
                        <div className="pl-0 md:pl-24 pr-8 md:pr-24 pb-14">
                            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                                {item.answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
