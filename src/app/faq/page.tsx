"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Plus, X, ArrowUpRight } from "lucide-react";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import Link from "next/link";

// ----------------------------------------------------------------------
// 1. FONTS & DATA
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
// 2. MAIN PAGE LAYOUT
// ----------------------------------------------------------------------

export default function FAQ() {
    return (
        <main className={`min-h-screen bg-[#050505] text-white selection:bg-[#a8ffc4] selection:text-black ${spaceGrotesk.className} overflow-x-hidden`}>
            <Navigation />

            {/* A. Hero / Scroll Prompt */}
            <div className="h-[50vh] flex flex-col items-center justify-end pb-20 relative z-10 bg-[#050505]">
                <p className="text-white/40 text-xs tracking-[0.3em] uppercase animate-pulse">
                    Scroll to Break
                </p>
                <div className="h-12 w-[1px] bg-white/20 mt-4" />
            </div>

            {/* B. The "Vertical Tear" Transition */}
            <TearingReveal />

            {/* C. The Main FAQ Content (Sticky Left + Scroll Right) */}
            <div className="relative z-20 bg-[#050505] min-h-screen">
                <section className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                        {/* Sticky Header Column */}
                        <div className="lg:col-span-5 relative">
                            <div className="sticky top-32 h-fit flex flex-col justify-start">
                                <FAQHeader />
                            </div>
                        </div>

                        {/* Scrollable Questions Column */}
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
// 3. TEARING / BREAKING TRANSITION
// ----------------------------------------------------------------------
// Implements the "Cut in Half" effect revealing the green section behind.

function TearingReveal() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    // We pin the container for a moment to let the tear happen
    // The "Tear" splits the black screen into Top and Bottom halves

    // Smooth progress
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Top Half moves UP (-100%)
    const topY = useTransform(smoothProgress, [0, 1], ["0%", "-100%"]);

    // Bottom Half moves DOWN (100%)
    const bottomY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    // Opacity fade for the black shutters as they exit, to blend smoother
    // const shutterOpacity = useTransform(smoothProgress, [0.8, 1], [1, 0]);

    return (
        <section ref={targetRef} className="relative h-[200vh]">

            {/* The Sticky Container that holds the animation layers */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* LAYER 1: The REVEALED Content (Green Background) */}
                {/* This stays fixed at the back. As the shutters open, we see this. */}
                <div className="absolute inset-0 bg-[#a8ffc4] flex items-center justify-center z-0">
                    <div className="flex flex-col items-center justify-center text-center px-6">
                        {/* "Let's Break It Down" Text */}
                        <motion.h2
                            style={{
                                scale: useTransform(smoothProgress, [0.2, 0.8], [0.8, 1]),
                                opacity: useTransform(smoothProgress, [0.1, 0.4], [0, 1])
                            }}
                            className={`${playfair.className} text-[15vw] lg:text-[12vw] leading-none font-bold text-black tracking-tighter`}
                        >
                            Let&#39;s Break<br />It Down.
                        </motion.h2>

                        <motion.div
                            style={{ opacity: useTransform(smoothProgress, [0.4, 0.8], [0, 1]) }}
                            className="mt-8 flex items-center gap-4"
                        >
                            <span className="h-[1px] w-20 bg-black" />
                            <span className="text-black font-mono uppercase tracking-widest text-sm font-medium">The Details</span>
                            <span className="h-[1px] w-20 bg-black" />
                        </motion.div>
                    </div>
                </div>

                {/* LAYER 2: The TEARING Shutters (Black Foreground) */}
                {/* Top Half */}
                <motion.div
                    style={{ y: topY }}
                    className="absolute top-0 left-0 w-full h-[50vh] bg-[#050505] z-10 flex items-end justify-center"
                >
                    {/* Jagged Edge Bottom */}
                    <div
                        className="absolute bottom-[-1px] left-0 w-full h-[40px] bg-[#050505] translate-y-full"
                        style={{
                            clipPath: "polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)"
                        }}
                    />
                </motion.div>

                {/* Bottom Half */}
                <motion.div
                    style={{ y: bottomY }}
                    className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#050505] z-10 flex items-start justify-center"
                >
                    {/* Jagged Edge Top */}
                    <div
                        className="absolute top-[-1px] left-0 w-full h-[40px] bg-[#050505] -translate-y-full"
                        style={{
                            clipPath: "polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)"
                        }}
                    />
                </motion.div>

            </div>
        </section>
    );
}


// ----------------------------------------------------------------------
// 4. HEADER CONTENT (Left Column)
// ----------------------------------------------------------------------

function FAQHeader() {
    return (
        <div className="flex flex-col gap-8">
            <motion.h1
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`${playfair.className} text-[20vw] lg:text-[14vw] leading-[0.8] text-white tracking-tighter`}
            >
                FAQ
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-md"
            >
                <div className="w-12 h-1 bg-[#a8ffc4] mb-8" />
                <h3 className="text-2xl md:text-3xl text-white/90 font-light leading-snug">
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
                <Link href="/contact" className="px-8 py-4 bg-[#a8ffc4] rounded-full text-black font-bold flex items-center gap-2 hover:bg-white transition-colors">
                    Contact Us <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link href="/services" className="px-8 py-4 border border-white/20 rounded-full text-white hover:bg-white/5 transition-colors">
                    Our Services
                </Link>
            </motion.div>
        </div>
    )
}

// ----------------------------------------------------------------------
// 5. ACCORDION LIST (Right Column)
// ----------------------------------------------------------------------

function FAQList() {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <div>
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="border-b border-white/10"
        >
            <button
                onClick={onClick}
                className="w-full py-10 md:py-12 flex items-start text-left group"
            >
                {/* Number */}
                <span className={`font-mono text-sm tracking-widest w-16 pt-2 transition-colors ${isOpen ? "text-[#a8ffc4]" : "text-white/30"}`}>
                    /{item.id}
                </span>

                {/* Question */}
                <h3 className={`flex-1 text-2xl md:text-3xl font-light pr-8 transition-colors duration-300 ${isOpen ? "text-[#a8ffc4]" : "text-white group-hover:text-white/80"}`}>
                    {item.question}
                </h3>

                {/* Icon */}
                <div className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? "border-[#a8ffc4] bg-[#a8ffc4]" : "border-white/20 bg-transparent group-hover:border-white"}`}>
                    <div className={`transition-transform duration-500 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                        {isOpen ? <X className="text-black w-5 h-5" /> : <Plus className="text-white w-5 h-5" />}
                    </div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="pl-16 pr-12 pb-12">
                            <p className="text-lg text-white/60 leading-relaxed font-light">
                                {item.answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
