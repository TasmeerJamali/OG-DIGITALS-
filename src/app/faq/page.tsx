"use client";

import { useState, useRef } from "react";
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
// 2. MAIN PAGE
// ----------------------------------------------------------------------

export default function FAQ() {
    return (
        <main className={`min-h-screen bg-[#050505] text-white selection:bg-[#a8ffc4] selection:text-black ${spaceGrotesk.className} overflow-x-hidden`}>
            <Navigation />

            {/* 1. PINNED SCROLL TRIGGER CONTAINER */}
            {/* Increased height to 300vh to give plenty of 'scroll time' for the effect */}
            {/* The content inside is 'sticky', so it stays pinned while the container scrolls. */}
            <div className="relative h-[300vh] bg-[#050505]">

                {/* The Sticky Viewport */}
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <TearingInterface />
                </div>

            </div>

            {/* 2. MAIN CONTENT (FAQs) */}
            {/* This naturally flows in ONLY after the 300vh container is fully scrolled past */}
            <div className="relative z-20 bg-[#050505] border-t border-white/10 -mt-[1px]">
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
// 3. TEARING INTERFACE (The Core Effect)
// ----------------------------------------------------------------------

function TearingInterface() {
    // We bind the scroll of the STICKY container to this animation
    // The trick: We are INSIDE a sticky container that is 100vh tall.
    // The PARENT is 300vh tall.
    // Framer Motion useScroll usually tracks the viewport or a ref.
    // Since we want to map the PARENT's scroll progress to this animation, we need a ref to the PARENT in a real app,
    // OR we can just use window scroll if this is the top of the page.
    // Given the structure, `useScroll` with a ref needs the ref to be the scrollable container (window).
    // But we want to track "how far through the 300vh section are we?"
    // The easiest way without complex context passing is using the ref on the sticky parent (which doesn't scroll) is tricky.
    // CORRECT APPROACH: We put the ref on the 300vh container in the main component, but let's try to infer it here 
    // by using a ref that captures the whole view. 

    // Actually, checking standard patterns: Use `useScroll` with target: containerRef of the TALL container.
    // Since TearingInterface is the child, we'll move the ref logic here but it needs to point to the parent.
    // For simplicity, we can just make `TearingInterface` accept the Ref or render the structure here.

    // Refactoring to keep it simple: We'll render the component assuming it's the full-screen view.
    // We'll rely on the fact that `sticky` elements stay in viewport while parent scrolls.
    // We need to track the Global Scroll Progress relative to this section.

    // Instead of complex ref passing, let's wrap the logic in one component above or use an absolute scroll tracker.
    // Let's use `document.documentElement` scroll or just a generic ref if possible.
    // Ideally, we move `TearingInterface` logic up into the parent `FAQ` function or pass the ref down.

    // Let's refactor slightly to ensure the Ref is correctly attached to the 300vh container.
    return (
        <TearingLogic />
    )
}

function TearingLogic() {
    // We need to find the parent container to track progress. 
    // Since we can't easily select "parent" in React, let's change the architecture:
    // The `TearingInterface` IS the visualization, but the scroll progress comes from elsewhere.
    // To solve "blank space", we make sure the Green Layer persists.

    // Workaround: We will use a ref attached to a div that spans the full 300vh in the parent.
    // But since I can't change the parent in this isolated component easily without prop drilling...
    // I will rewrite the export default `FAQ` to handle the ref and pass `scrollYProgress` down.

    // Wait, I am overwriting the whole file. I can do whatever I want.
    // REWRITE: FAQ component holds the ref.

    /* This is a placeholder to prevent error, real logic moved to FAQ component below */
    return null;
}


// RE-WRITING THE MAIN COMPONENT TO HANDLE THE REF CORRECTLY
/* 
   We define `FAQ` again properly below to replace the one above. 
   The one above was just to satisfy the structure of previous edits. 
*/

function RealFAQ() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 0.0 -> 0.8: The Tear Happens (Pinned)
    // 0.8 -> 1.0: The Scroll Release (Optional, usually just stays open)

    // Force the tear to complete by 80% of the scroll distance
    const tearProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

    const topY = useTransform(tearProgress, [0, 1], ["0%", "-100%"]);
    const bottomY = useTransform(tearProgress, [0, 1], ["0%", "100%"]);

    // The Green Layer Scale
    const greenScale = useTransform(tearProgress, [0, 1], [0.85, 1]);
    const greenOpacity = useTransform(tearProgress, [0, 0.2], [0, 1]);

    return (
        <main className={`min-h-screen bg-[#050505] text-white selection:bg-[#a8ffc4] selection:text-black ${spaceGrotesk.className} overflow-x-hidden`}>
            <Navigation />

            {/* 1. SCROLL TRIGGER CONTAINER (300vh) */}
            <div ref={containerRef} className="relative h-[300vh] bg-[#050505]">

                {/* 2. STICKY VIEWPORT (100vh) */}
                <div className="sticky top-0 h-screen w-full overflow-hidden">

                    {/* A. REVEAL LAYER (Green) */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#a8ffc4] overflow-hidden">

                        {/* Noise & Vigentte */}
                        <div className="absolute inset-0 opacity-[0.14] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.15)_100%)]" />

                        <motion.div
                            style={{ scale: greenScale, opacity: greenOpacity }}
                            className="relative z-10 text-center"
                        >
                            <h2 className={`${playfair.className} text-[15vw] md:text-[12vw] leading-[0.85] font-black text-black tracking-tighter mix-blend-multiply`}>
                                Let&#39;s Break<br />It Down.
                            </h2>
                            <div className="flex items-center justify-center gap-6 mt-12 mix-blend-multiply opacity-80">
                                <div className="h-[2px] w-12 md:w-32 bg-black" />
                                <span className={`${spaceGrotesk.className} text-black font-bold uppercase tracking-[0.3em] text-sm md:text-base`}>
                                    Transparency Protocol
                                </span>
                                <div className="h-[2px] w-12 md:w-32 bg-black" />
                            </div>
                        </motion.div>
                    </div>

                    {/* B. SHUTTERS (Black) */}

                    {/* TOP SHUTTER */}
                    <motion.div
                        style={{ y: topY }}
                        className="absolute top-0 left-0 w-full h-[50.5%] bg-[#050505] z-20 flex items-end justify-center drop-shadow-2xl"
                    >
                        {/* Intro Text */}
                        <div className="absolute top-0 inset-x-0 h-full flex flex-col items-center justify-center pb-20">
                            <h1 className={`${playfair.className} text-[8vw] text-white/5 font-black tracking-tighter`}>
                                OG DIGITALS
                            </h1>
                        </div>

                        {/* Jagged Edge (Bottom) */}
                        <div
                            className="absolute bottom-[-1px] left-0 w-full h-[8vh] bg-[#050505] translate-y-full origin-top"
                            style={{
                                clipPath: "polygon(0 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 100% 0)"
                            }}
                        />
                    </motion.div>

                    {/* BOTTOM SHUTTER */}
                    <motion.div
                        style={{ y: bottomY }}
                        className="absolute bottom-0 left-0 w-full h-[50.5%] bg-[#050505] z-20 flex items-start justify-center drop-shadow-2xl"
                    >
                        <div className="absolute bottom-0 inset-x-0 h-full flex flex-col items-center justify-center pt-20">
                            <p className="text-white/20 text-sm uppercase tracking-[0.4em] animate-pulse">
                                Scroll to Break
                            </p>
                        </div>

                        {/* Jagged Edge (Top) */}
                        <div
                            className="absolute top-[-1px] left-0 w-full h-[8vh] bg-[#050505] -translate-y-full origin-bottom"
                            style={{
                                clipPath: "polygon(0 100%, 5% 0, 10% 100%, 15% 0, 20% 100%, 25% 0, 30% 100%, 35% 0, 40% 100%, 45% 0, 50% 100%, 55% 0, 60% 100%, 65% 0, 70% 100%, 75% 0, 80% 100%, 85% 0, 90% 100%, 95% 0, 100% 100%)"
                            }}
                        />
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
// EXPORTING THE CORRECT COMPONENT
// ----------------------------------------------------------------------
/* We need to make sure we export `RealFAQ` as default */

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

// Export the Real Component
export default RealFAQ;
