"use client";

import { useRef, useState, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
    AnimatePresence,
    useInView
} from "framer-motion";
import Book3D from "@/components/Book3D";

// --- SHARED COMPONENTS ---

function SectionHeader({ title, subtitle, align = "center" }: { title: string, subtitle?: string, align?: "center" | "left" }) {
    return (
        <div className={`mb-20 ${align === "center" ? "text-center" : "text-left"}`}>
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: "100px" }}
                    viewport={{ once: true }}
                    className={`h-1 bg-[#a8ffc4] mb-8 ${align === "center" ? "mx-auto" : ""}`}
                />
            )}
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    viewport={{ once: true }}
                    className={`text-xl text-white/60 max-w-2xl font-light leading-relaxed ${align === "center" ? "mx-auto" : ""}`}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}

function MagneticButton({ children, className, variant = "primary" }: { children: React.ReactNode; className?: string, variant?: "primary" | "secondary" }) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.35);
        y.set((clientY - centerY) * 0.35);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    const baseStyles = "relative overflow-hidden rounded-full font-bold transition-all duration-300 active:scale-95";
    const variants = {
        primary: "bg-[#a8ffc4] text-black hover:bg-white hover:shadow-[0_0_40px_rgba(168,255,196,0.4)]",
        secondary: "bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/50"
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}

function GlassCard({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay, ease: "easeOut" }}
            className={`group relative p-8 md:p-10 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden hover:bg-white/[0.05] transition-colors duration-500 ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#a8ffc4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative z-10 h-full">{children}</div>
        </motion.div>
    );
}

function CheckList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-4">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70">
                    <span className="text-[#a8ffc4] mt-1">✔</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

// 1. HERO (Refined)
function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center pt-48 pb-20 overflow-hidden bg-[#050505]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/ebookbg.png"
                    alt="Ebook Background"
                    className="w-full h-full object-cover opacity-100"
                />
                {/* Darker Gradient Overlay for text readability - Increased to 60% based on feedback */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center mt-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    {/* HIGH-TECH BADGE COMPONENT */}
                    <div className="relative mb-12 group inline-block cursor-default">
                        {/* Outer Glow/Pulse Layer */}
                        <div className="absolute inset-0 bg-[#00FF41] rounded-full blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse-slow"></div>

                        {/* Main Container */}
                        <div className="relative overflow-hidden rounded-full border border-[#00FF41]/80 bg-black/90 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,65,0.4),inset_0_0_20px_rgba(0,255,65,0.1)]">

                            {/* Animated Background Grid & Scanlines */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none z-0 mix-blend-screen">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: "linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)",
                                        backgroundSize: "20px 20px"
                                    }}
                                />
                                <div className="absolute inset-0 animate-scanline bg-gradient-to-b from-transparent via-[#00FF41]/10 to-transparent h-[200%] w-full" />
                            </div>

                            {/* Content Wrapper */}
                            <div className="relative z-10 py-3 px-10 flex items-center gap-4">
                                {/* Left Tech Indicator */}
                                <div className="w-1.5 h-1.5 bg-[#00FF41] rounded-full shadow-[0_0_10px_#00FF41] animate-ping" />

                                <span className="text-[#00FF41] font-mono font-bold text-sm tracking-[0.3em] uppercase drop-shadow-[0_0_5px_rgba(0,255,65,1)] group-hover:tracking-[0.4em] transition-all duration-300">
                                    Publish. Print. Prosper.
                                </span>

                                {/* Right Tech Indicator */}
                                <div className="w-1.5 h-1.5 bg-[#00FF41] rounded-full shadow-[0_0_10px_#00FF41] animate-ping delay-75" />
                            </div>

                            {/* Glitch Overlay Effect on Hover */}
                            <div className="absolute inset-0 bg-[#00FF41] opacity-0 group-hover:opacity-10 transition-opacity duration-100 mix-blend-overlay" />
                        </div>
                    </div>

                    {/* Headline - Tuned to fit in one line on large screens */}
                    {/* Headline - 3D Metallic Gradient & Depth */}
                    <h1
                        className="text-4xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-serif font-black mb-8 leading-none tracking-tight w-full max-w-[95vw] mx-auto bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-100 to-gray-400 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]"
                        style={{ textShadow: "0px 4px 10px rgba(255,255,255,0.1), 0px 10px 20px rgba(0,0,0,0.5)" }}
                    >
                        Professional eBook Creation & Design Services
                    </h1>

                    <p className="text-xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-16 font-medium drop-shadow-lg drop-shadow-black">
                        Turn your ideas into stunning, ready-to-sell eBooks with our writing, design, and publishing solutions.
                    </p>

                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-16 w-full">
                        {/* Primary Button - 3D Green Gloss */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group px-12 py-5 bg-gradient-to-b from-[#a8ffc4] to-[#00b359] rounded-full text-black text-2xl font-bold tracking-tight shadow-[0_6px_0_#008f47,0_15px_20px_rgba(0,255,100,0.3)] hover:shadow-[0_8px_0_#008f47,0_20px_30px_rgba(0,255,100,0.4)] active:translate-y-[6px] active:shadow-none transition-all duration-150 border-t border-white/50"
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                            <span className="relative z-10 flex items-center gap-3">
                                Get a Free Quote
                                <span className="text-3xl leading-[0] mb-1">→</span>
                            </span>
                        </motion.button>

                        {/* Secondary Button - 3D Frost Glass */}
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-5 text-2xl font-bold text-white rounded-full bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_6px_0_rgba(255,255,255,0.2),0_15px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_0_rgba(255,255,255,0.3),0_20px_30px_rgba(255,255,255,0.1)] active:translate-y-[6px] active:shadow-none transition-all duration-150"
                        >
                            View Samples
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Curve/Wave integration with next section */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />

            <style jsx>{`
                .animate-pulse-slow {
                    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                .transform-style-3d {
                    transform-style: preserve-3d;
                }
                .backface-visible {
                    backface-visibility: visible;
                }
                .animate-float-slow {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes tilt {
                    0%, 50%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(1deg); }
                    75% { transform: rotate(-1deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.02); }
                }
            `}</style>
        </section >
    );
}

// 2. WHY CHOOSE US - Premium Bento Grid
import { PenTool, Palette, Zap, TabletSmartphone, Lock, Rocket, CheckCircle2 } from "lucide-react";

function WhyChooseComponents() {
    const features = [
        { title: "High-Quality Content", desc: "Deeply researched, authority-building writing that positions you as an expert.", icon: <PenTool className="w-7 h-7" />, bullets: ["SEO-optimized structure", "Industry research included", "Plagiarism-free guarantee"], stat: "500+", statLabel: "Books Written" },
        { title: "Premium Design", desc: "Award-winning layouts that make your book impossible to ignore.", icon: <Palette className="w-7 h-7" />, bullets: ["Custom cover art", "Professional typography", "Print & digital formats"], stat: "98%", statLabel: "Client Satisfaction" },
        { title: "Fast Delivery", desc: "Rapid turnarounds without compromising on quality or detail.", icon: <Zap className="w-7 h-7" />, bullets: ["2-4 week delivery", "Unlimited revisions", "Rush options available"], stat: "14", statLabel: "Days Average" },
        { title: "Multi-Platform", desc: "Your book, everywhere. Optimized for every major reading platform.", icon: <TabletSmartphone className="w-7 h-7" />, bullets: ["Amazon KDP ready", "Apple Books format", "PDF for print"], stat: "12+", statLabel: "Platforms" },
        { title: "Full Ownership", desc: "You keep 100% of the copyright, royalties, and creative control.", icon: <Lock className="w-7 h-7" />, bullets: ["No hidden fees", "Full source files", "Lifetime license"], stat: "100%", statLabel: "Yours Forever" },
        { title: "Marketing Ready", desc: "Launch with everything you need to make sales from day one.", icon: <Rocket className="w-7 h-7" />, bullets: ["Social media assets", "Email templates", "Ad creatives"], stat: "25+", statLabel: "Assets Included" }
    ];

    return (
        <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(168,255,196,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,255,196,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <motion.div animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#a8ffc4] rounded-full blur-[200px] opacity-10" />
                <motion.div animate={{ opacity: [0.05, 0.15, 0.05], scale: [1, 1.2, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600 rounded-full blur-[180px] opacity-10" />
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
                    <span className="inline-block px-4 py-2 mb-6 text-sm font-mono text-[#a8ffc4] bg-[#a8ffc4]/10 rounded-full border border-[#a8ffc4]/20">WHY CHOOSE US</span>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">Everything You Need to <span className="text-[#a8ffc4]">Publish</span></h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">From concept to bestseller, we handle every detail so you can focus on your message.</p>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }} whileHover={{ y: -8, transition: { duration: 0.3 } }} className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-[#a8ffc4]/40 transition-all duration-500 overflow-hidden">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"><div className="absolute inset-0 bg-gradient-to-br from-[#a8ffc4]/10 via-transparent to-transparent" /><div className="absolute top-0 left-0 w-32 h-32 bg-[#a8ffc4]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" /></div>
                            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#a8ffc4]/40 group-hover:bg-[#a8ffc4] group-hover:shadow-[0_0_10px_#a8ffc4] transition-all duration-300" />
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-[#a8ffc4]/10 border border-[#a8ffc4]/20 flex items-center justify-center text-[#a8ffc4] group-hover:bg-[#a8ffc4] group-hover:text-black group-hover:border-transparent transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(168,255,196,0.5)]">{f.icon}</div>
                                    <div className="text-right"><div className="text-3xl font-black text-white group-hover:text-[#a8ffc4] transition-colors">{f.stat}</div><div className="text-xs text-white/40 font-medium uppercase tracking-wider">{f.statLabel}</div></div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#a8ffc4] transition-colors">{f.title}</h3>
                                <p className="text-white/50 mb-6 leading-relaxed group-hover:text-white/70 transition-colors">{f.desc}</p>
                                <ul className="space-y-2">{f.bullets.map((bullet, bi) => (<li key={bi} className="flex items-center gap-2 text-sm text-white/40 group-hover:text-white/60 transition-colors"><CheckCircle2 className="w-4 h-4 text-[#a8ffc4]/60 group-hover:text-[#a8ffc4] transition-colors flex-shrink-0" />{bullet}</li>))}</ul>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#a8ffc4]/0 to-transparent group-hover:via-[#a8ffc4]/50 transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// WORLD-CLASS INFINITE MARQUEE - Multi-layer velocity-based cross-crossing
function InfiniteMarquee() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

    // Velocity transforms - create parallax movement based on scroll
    const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
    const x2 = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
    const x3 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

    const words = ["PUBLISH", "DESIGN", "WRITE", "CREATE", "LAUNCH", "INSPIRE", "BUILD", "TRANSFORM"];

    return (
        <section ref={containerRef} className="py-20 bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#a8ffc4] rounded-full blur-[200px] opacity-[0.07]" />
            </div>

            {/* Layer 1 - Large text, moves right on scroll */}
            <motion.div style={{ x: x1 }} className="flex items-center gap-8 mb-8 whitespace-nowrap">
                {[...Array(3)].map((_, setIndex) => (
                    <div key={setIndex} className="flex items-center gap-8 animate-marquee-slow">
                        {words.map((word, i) => (
                            <div key={i} className="flex items-center gap-8">
                                <span className="text-[8rem] md:text-[12rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 opacity-20 select-none" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}>
                                    {word}
                                </span>
                                <span className="text-[#a8ffc4] text-4xl opacity-30">✦</span>
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>

            {/* Layer 2 - Medium text, moves left on scroll (CROSS-CROSSING) */}
            <motion.div style={{ x: x2 }} className="flex items-center gap-6 mb-8 whitespace-nowrap -mt-16">
                {[...Array(3)].map((_, setIndex) => (
                    <div key={setIndex} className="flex items-center gap-6 animate-marquee-fast">
                        {words.reverse().map((word, i) => (
                            <div key={i} className="flex items-center gap-6">
                                <span className="text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#a8ffc4] via-emerald-400 to-[#00ffff] drop-shadow-[0_0_30px_rgba(168,255,196,0.5)] select-none">
                                    {word}
                                </span>
                                <span className="text-white/20 text-2xl">◆</span>
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>

            {/* Layer 3 - Small text with outline, moves right */}
            <motion.div style={{ x: x3 }} className="flex items-center gap-4 whitespace-nowrap -mt-8">
                {[...Array(4)].map((_, setIndex) => (
                    <div key={setIndex} className="flex items-center gap-4 animate-marquee-medium">
                        {["BESTSELLER", "AUTHORITY", "IMPACT", "SUCCESS", "LEGACY", "VISION"].map((word, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <span className="text-4xl md:text-6xl font-bold tracking-widest text-transparent select-none" style={{ WebkitTextStroke: "2px rgba(168,255,196,0.3)" }}>
                                    {word}
                                </span>
                                <span className="text-[#a8ffc4]/40 text-xl">★</span>
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>

            {/* Gradient overlays for fade effect */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

            <style jsx>{`
                @keyframes marquee-slow {
                    from { transform: translateX(0); }
                    to { transform: translateX(-33.33%); }
                }
                @keyframes marquee-fast {
                    from { transform: translateX(-33.33%); }
                    to { transform: translateX(0); }
                }
                @keyframes marquee-medium {
                    from { transform: translateX(0); }
                    to { transform: translateX(-25%); }
                }
                .animate-marquee-slow {
                    animation: marquee-slow 40s linear infinite;
                }
                .animate-marquee-fast {
                    animation: marquee-fast 25s linear infinite;
                }
                .animate-marquee-medium {
                    animation: marquee-medium 35s linear infinite;
                }
            `}</style>
        </section>
    );
}

// --- PLACEHOLDER: Sections below will be added one by one ---

// --- MAIN PAGE ---
export default function EbookServicesPage() {
    return (
        <main className="bg-black min-h-screen selection:bg-[#a8ffc4] selection:text-black">
            <Hero />
            <WhyChooseComponents />
            <InfiniteMarquee />

            {/* More sections to be added by user */}

            <footer className="py-12 bg-black text-center border-t border-white/5">
                <p className="text-white/20 text-sm font-mono">
                    THE OG DIGITALS © 2024
                </p>
            </footer>
        </main>
    );
}
