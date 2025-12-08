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

// 3. SERVICES PACKAGES - Premium Holographic 3D Cards
import { Sparkles, BookOpen, Paintbrush, Megaphone, ArrowRight } from "lucide-react";

function ServicePackages() {
    const packages = [
        {
            number: "01",
            title: "Ghostwriting",
            subtitle: "Grade A Content",
            items: ["Research-based writing", "SEO-friendly structure", "Brand voice alignment", "100% Original Content"],
            icon: <BookOpen className="w-8 h-8" />,
            gradient: "from-blue-500 via-cyan-400 to-teal-400",
            glowColor: "rgba(59,130,246,0.5)"
        },
        {
            number: "02",
            title: "Design & Layout",
            subtitle: "Visual Excellence",
            items: ["Custom Cover Design", "Aesthetic Formatting", "Brand Colors & Fonts", "Professional Typography"],
            icon: <Paintbrush className="w-8 h-8" />,
            gradient: "from-purple-500 via-pink-400 to-rose-400",
            glowColor: "rgba(168,85,247,0.5)",
            featured: true
        },
        {
            number: "03",
            title: "Marketing Kit",
            subtitle: "Launch Assets",
            items: ["Promotional Social Posts", "Ad Creatives", "Landing Page Banners", "Email Swipe Copy"],
            icon: <Megaphone className="w-8 h-8" />,
            gradient: "from-orange-500 via-amber-400 to-yellow-400",
            glowColor: "rgba(249,115,22,0.5)"
        }
    ];

    return (
        <section className="py-40 relative bg-[#050505] overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,255,196,0.05)_0%,transparent_70%)]" />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/[0.02] rounded-full" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.03] rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-mono text-[#a8ffc4] bg-[#a8ffc4]/10 rounded-full border border-[#a8ffc4]/20">
                        <Sparkles className="w-4 h-4" />
                        COMPLETE PACKAGES
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        Everything You <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8ffc4] via-emerald-400 to-cyan-400">Need</span>
                    </h2>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto">From concept to bestseller, our packages cover every step of your publishing journey.</p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid lg:grid-cols-3 gap-8 perspective-1000">
                    {packages.map((pkg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 60, rotateX: -10 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                            whileHover={{ y: -12, rotateY: 5, rotateX: 5, transition: { duration: 0.4 } }}
                            className={`group relative h-full ${pkg.featured ? "lg:-translate-y-6" : ""}`}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Animated Border */}
                            <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" style={{ background: `linear-gradient(90deg, ${pkg.glowColor}, transparent, ${pkg.glowColor})` }} />
                            <div className={`absolute -inset-[1px] rounded-[2rem] bg-gradient-to-r ${pkg.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

                            {/* Card Content */}
                            <div className="relative h-full p-10 rounded-[2rem] bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 flex flex-col overflow-hidden">
                                {/* Spotlight Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-32 bg-gradient-to-b from-white/10 to-transparent blur-2xl" />
                                </div>

                                {/* Featured Badge */}
                                {pkg.featured && (
                                    <div className="absolute top-6 right-6 px-3 py-1 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#a8ffc4] to-emerald-400 text-black rounded-full">
                                        Popular
                                    </div>
                                )}

                                {/* Number Badge */}
                                <div className={`absolute top-8 left-8 text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b ${pkg.gradient} opacity-10 select-none`}>
                                    {pkg.number}
                                </div>

                                {/* Icon */}
                                <div className={`relative z-10 w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center text-white shadow-lg`} style={{ boxShadow: `0 10px 40px ${pkg.glowColor}` }}>
                                    {pkg.icon}
                                </div>

                                {/* Title */}
                                <div className="relative z-10 mb-8">
                                    <h3 className="text-3xl font-black text-white mb-2">{pkg.title}</h3>
                                    <p className={`text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r ${pkg.gradient}`}>{pkg.subtitle}</p>
                                </div>

                                {/* Items */}
                                <ul className="relative z-10 space-y-4 flex-1">
                                    {pkg.items.map((item, itemIndex) => (
                                        <motion.li
                                            key={itemIndex}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 + itemIndex * 0.05 }}
                                            className="flex items-center gap-3 text-white/70 group-hover:text-white/90 transition-colors"
                                        >
                                            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${pkg.gradient} flex items-center justify-center flex-shrink-0`}>
                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="font-medium">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <div className="relative z-10 mt-10 pt-8 border-t border-white/10">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full py-4 px-6 rounded-xl bg-gradient-to-r ${pkg.gradient} text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-all duration-300 group/btn`}
                                        style={{ boxShadow: `0 8px 30px ${pkg.glowColor}` }}
                                    >
                                        Get Started
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 4. PROCESS - KINETIC TYPOGRAPHY MADNESS
function ProcessTimeline() {
    const steps = [
        { step: "01", title: "Share Your Idea", highlight: "Idea", desc: "Tell us your topic, vision, and goals." },
        { step: "02", title: "We Write & Design", highlight: "Design", desc: "Our experts craft your content and visuals." },
        { step: "03", title: "Review & Revisions", highlight: "Revisions", desc: "We refine until it's absolutely perfect." },
        { step: "04", title: "Final Delivery", highlight: "Delivery", desc: "Receive ready-to-publish files (PDF, EPUB, KDP)." }
    ];

    // Kinetic Text Component - letter by letter animation
    const KineticText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
        return (
            <span className={className}>
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 50, rotateX: -90 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.5,
                            delay: delay + i * 0.03,
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                        }}
                        className="inline-block"
                        style={{ transformOrigin: "bottom" }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </span>
        );
    };

    // Scramble Text Effect
    const ScrambleText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";
        const [displayText, setDisplayText] = useState(text.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join(""));
        const [isVisible, setIsVisible] = useState(false);

        useEffect(() => {
            if (!isVisible) return;
            let iteration = 0;
            const interval = setInterval(() => {
                setDisplayText(text.split("").map((char, i) => {
                    if (i < iteration) return char;
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join(""));
                iteration += 0.5;
                if (iteration >= text.length) clearInterval(interval);
            }, 30);
            return () => clearInterval(interval);
        }, [isVisible, text]);

        return (
            <motion.span
                onViewportEnter={() => setTimeout(() => setIsVisible(true), delay * 1000)}
                viewport={{ once: true }}
                className="font-mono"
            >
                {displayText}
            </motion.span>
        );
    };

    return (
        <section className="pt-48 pb-80 bg-black relative overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(168,255,196,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,255,196,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
                <motion.div animate={{ opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#a8ffc4] rounded-full blur-[300px] opacity-[0.05]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Kinetic Section Header */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-32">
                    <motion.div initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="inline-block px-6 py-3 mb-8 text-sm font-mono text-[#a8ffc4] bg-[#a8ffc4]/10 rounded-full border border-[#a8ffc4]/20">
                        <ScrambleText text="THE PROCESS" delay={0.3} />
                    </motion.div>
                    <h2 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                        <KineticText text="How It " delay={0.2} />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8ffc4] via-emerald-400 to-cyan-400">
                            <KineticText text="Works" delay={0.5} />
                        </span>
                    </h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1 }} className="text-xl text-white/50 max-w-2xl mx-auto">
                        Four simple steps to publishing excellence.
                    </motion.p>
                </motion.div>

                {/* Kinetic Steps */}
                <div className="relative max-w-5xl mx-auto">
                    {steps.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col lg:flex-row items-center gap-12 mb-32 last:mb-0 ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
                        >
                            {/* Giant Kinetic Number */}
                            <motion.div
                                initial={{ scale: 0, rotate: -45, opacity: 0 }}
                                whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 150, damping: 20, delay: i * 0.1 }}
                                className="relative flex-shrink-0"
                            >
                                {/* Background Glow */}
                                <div className="absolute inset-0 bg-[#a8ffc4] rounded-full blur-3xl opacity-20 scale-150" />

                                {/* Main Number */}
                                <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-[#a8ffc4] to-emerald-600 flex items-center justify-center shadow-[0_0_60px_rgba(168,255,196,0.4)]">
                                    <motion.span
                                        initial={{ scale: 1.5, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                                        className="text-5xl lg:text-6xl font-black text-black"
                                    >
                                        {item.step}
                                    </motion.span>
                                </div>

                                {/* Orbiting Ring */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border-2 border-dashed border-[#a8ffc4]/30 rounded-full scale-[1.3]"
                                />
                            </motion.div>

                            {/* Content Card with Kinetic Text */}
                            <div className={`flex-1 w-full lg:w-auto ${i % 2 === 0 ? "lg:text-left" : "lg:text-right"}`}>
                                {/* Kinetic Title */}
                                <div className="mb-4 overflow-hidden">
                                    <motion.h3
                                        initial={{ y: 100 }}
                                        whileInView={{ y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
                                        className="text-4xl lg:text-5xl font-black text-white"
                                    >
                                        {item.title.split(item.highlight).map((part, pi) => (
                                            <span key={pi}>
                                                {part}
                                                {pi === 0 && (
                                                    <motion.span
                                                        initial={{ backgroundPosition: "200% 0" }}
                                                        whileInView={{ backgroundPosition: "0% 0" }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                                        className="text-transparent bg-clip-text bg-[length:200%_100%] bg-gradient-to-r from-[#a8ffc4] via-cyan-400 to-[#a8ffc4]"
                                                    >
                                                        {item.highlight}
                                                    </motion.span>
                                                )}
                                            </span>
                                        ))}
                                    </motion.h3>
                                </div>

                                {/* Typing Description Effect */}
                                <motion.p
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="text-xl text-white/60 leading-relaxed"
                                >
                                    {item.desc}
                                </motion.p>

                                {/* Animated Underline */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                                    className={`mt-6 h-1 bg-gradient-to-r from-[#a8ffc4] to-transparent ${i % 2 === 0 ? "origin-left" : "origin-right"}`}
                                    style={{ maxWidth: "200px", marginLeft: i % 2 !== 0 ? "auto" : 0 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Connecting Line Animation */}
                <div className="absolute left-1/2 top-[300px] bottom-[200px] w-[2px] -translate-x-1/2 overflow-hidden hidden lg:block">
                    <motion.div
                        initial={{ height: "0%" }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="w-full bg-gradient-to-b from-[#a8ffc4] via-[#a8ffc4]/50 to-transparent"
                    />
                </div>
            </div>
        </section>
    );
}

// 5. PRICING (Optional per user, but looks good)
function Pricing() {
    return (
        <section className="py-48 mt-20 bg-[#050505] relative">
            <div className="container mx-auto px-6">
                <SectionHeader title="Investment Plans" align="center" />
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                        { name: "Basic", price: "Design Only", desc: "Perfect if you have the text ready.", feat: ["Custom Cover", "Internal Formatting", "PDF & EPUB Delivery"] },
                        { name: "Standard", price: "Writing + Design", desc: "Full service for busy founders.", feat: ["10,000 Words Ghostwriting", "Premium Design", "2 Rounds Revisions", "Proofreading"], highlight: true },
                        { name: "Premium", price: "Full Launch Kit", desc: "The ultimate authority package.", feat: ["25,000 Words Ghostwriting", "Deluxe Design", "Marketing Assets", "Landing Page", "Unlimted Revisions"] }
                    ].map((plan, i) => (
                        <div key={i} className={`relative p-8 rounded-3xl border ${plan.highlight ? "border-[#a8ffc4] bg-[#a8ffc4]/5" : "border-white/10 bg-black"} flex flex-col gap-6`}>
                            {plan.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[#a8ffc4] text-black text-xs font-bold uppercase tracking-widest rounded-full">
                                    Most Popular
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                                <div className="text-3xl font-black text-white mt-2 mb-1">{plan.price}</div>
                                <p className="text-white/40 text-sm">{plan.desc}</p>
                            </div>
                            <div className="h-[1px] w-full bg-white/10" />
                            <div className="flex-1">
                                <CheckList items={plan.feat} />
                            </div>
                            <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.highlight ? "bg-[#a8ffc4] text-black hover:bg-white" : "bg-white/10 text-white hover:bg-white/20"}`}>
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 6. FAQ
function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const items = [
        { q: "How long does an eBook take?", a: "Typically 2-4 weeks depending on length and complexity." },
        { q: "Do I get full copyright?", a: "Yes. You own 100% of the work once delivered." },
        { q: "What formats do you deliver?", a: "We provide print-ready PDF, EPUB for Kindle/Apple, and editable source files." },
        { q: "Do you provide cover designs?", a: "Absolutely. We create stunning 3D and 2D covers that pop." },
    ];

    return (
        <section className="py-24 max-w-3xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {items.map((item, i) => (
                    <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                        >
                            <span className="text-lg font-medium text-white">{item.q}</span>
                            <span className={`text-[#a8ffc4] transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}>+</span>
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-8 pb-6 text-white/50 leading-relaxed">
                                        {item.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}

// --- MAIN PAGE ---
export default function EbookServicesPage() {
    return (
        <main className="bg-black min-h-screen selection:bg-[#a8ffc4] selection:text-black">
            <Hero />
            <WhyChooseComponents />
            <InfiniteMarquee />
            <ServicePackages />
            <ProcessTimeline />
            <Pricing />
            <FAQ />

            {/* BOTTOM CTA */}
            <section className="py-32 bg-[#a8ffc4] text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-black text-black mb-8 tracking-tighter uppercase leading-[0.9]">
                        Ready to Launch <br /> Your Authority?
                    </h2>
                    <p className="text-xl text-black/60 mb-12 max-w-2xl mx-auto font-medium">
                        Don't let your ideas gather dust. Turn them into a revenue-generating asset today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <MagneticButton className="px-12 py-6 bg-black text-white hover:bg-white hover:text-black shadow-2xl text-xl">
                            Start Your Project
                        </MagneticButton>
                        <MagneticButton variant="secondary" className="px-12 py-6 border-black text-black hover:bg-black hover:text-[#a8ffc4] text-xl border-2">
                            Get Free Sample
                        </MagneticButton>
                    </div>
                </div>
            </section>

            <footer className="py-12 bg-black text-center border-t border-white/5">
                <p className="text-white/20 text-sm font-mono">
                    THE OG DIGITALS © 2024
                </p>
            </footer>
        </main>
    );
}
