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

// 3. SERVICE PACKAGES - Horizontal Scroll Belt
import { FileText, Brush, SpellCheck, FileCode, Megaphone } from "lucide-react";

function ServicePackages() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Transform vertical scroll to horizontal movement
    const x = useTransform(scrollYProgress, [0, 1], ["5%", "-75%"]);

    // Progress indicator
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const services = [
        {
            icon: <FileText className="w-10 h-10" />,
            title: "eBook Writing",
            subtitle: "Research-Based Content",
            features: ["SEO-friendly structure", "Tone/style alignment", "100% original content", "Industry research"],
            color: "from-emerald-500/20 to-emerald-600/5",
            accent: "#10b981"
        },
        {
            icon: <Brush className="w-10 h-10" />,
            title: "Design & Layout",
            subtitle: "Premium Visual Identity",
            features: ["Custom cover designs", "Aesthetic page formatting", "Brand-aligned colors", "Professional typography"],
            color: "from-violet-500/20 to-violet-600/5",
            accent: "#8b5cf6"
        },
        {
            icon: <SpellCheck className="w-10 h-10" />,
            title: "Editing & Proofreading",
            subtitle: "Polished Perfection",
            features: ["Grammar & clarity", "Flow improvements", "Consistency check", "Final polish"],
            color: "from-amber-500/20 to-amber-600/5",
            accent: "#f59e0b"
        },
        {
            icon: <FileCode className="w-10 h-10" />,
            title: "Multi-Platform Formatting",
            subtitle: "Publish Everywhere",
            features: ["Amazon KDP ready", "Apple Books format", "Kindle optimized", "PDF & EPUB"],
            color: "from-cyan-500/20 to-cyan-600/5",
            accent: "#06b6d4"
        },
        {
            icon: <Megaphone className="w-10 h-10" />,
            title: "Marketing Kit",
            subtitle: "Launch Ready",
            features: ["Social media assets", "Ad creatives", "Landing page banners", "Email templates"],
            color: "from-rose-500/20 to-rose-600/5",
            accent: "#f43f5e"
        }
    ];

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-[#050505]">
            {/* Sticky container */}
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#a8ffc4] rounded-full blur-[300px] opacity-[0.03]" />
                </div>

                {/* Header */}
                <div className="absolute top-16 left-0 right-0 z-20 text-center px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-2 mb-4 text-sm font-mono text-[#a8ffc4] bg-[#a8ffc4]/10 rounded-full border border-[#a8ffc4]/20"
                    >
                        OUR SERVICES
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-white tracking-tight"
                    >
                        Complete eBook <span className="text-[#a8ffc4]">Packages</span>
                    </motion.h2>
                </div>

                {/* Horizontal scrolling cards */}
                <motion.div
                    style={{ x }}
                    className="absolute top-1/2 -translate-y-1/2 left-0 flex gap-8 px-[10vw] pt-20"
                >
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative w-[420px] h-[500px] flex-shrink-0 cursor-pointer"
                        >
                            {/* Card Container */}
                            <div className="relative w-full h-full rounded-[32px] bg-[#111111] border border-white/5 overflow-hidden transition-all duration-700 group-hover:border-[#a8ffc4]/40 group-hover:shadow-[0_0_60px_rgba(168,255,196,0.15)]">

                                {/* Unique Animated Background per Card */}
                                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                    {/* Pattern 1: Circuit Board (eBook Writing) */}
                                    {i === 0 && (
                                        <>
                                            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] opacity-0 group-hover:opacity-100 transition-all duration-700">
                                                {/* Circuit lines from corner */}
                                                <svg className="w-full h-full" viewBox="0 0 200 200">
                                                    <g className="opacity-0 group-hover:opacity-60 transition-opacity duration-500">
                                                        <path d="M200 200 L200 100 L150 100 L150 50 L100 50" stroke="#a8ffc4" strokeWidth="1" fill="none" className="opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ strokeDasharray: 400, strokeDashoffset: 400 }} />
                                                        <path d="M200 150 L120 150 L120 80" stroke="#a8ffc4" strokeWidth="1" fill="none" />
                                                        <circle cx="150" cy="100" r="4" fill="#a8ffc4" className="opacity-0 group-hover:opacity-100 transition-opacity delay-200" />
                                                        <circle cx="120" cy="150" r="3" fill="#a8ffc4" className="opacity-0 group-hover:opacity-100 transition-opacity delay-300" />
                                                        <circle cx="100" cy="50" r="5" fill="#a8ffc4" className="opacity-0 group-hover:opacity-100 transition-opacity delay-400" />
                                                        <rect x="90" y="120" width="20" height="15" rx="2" stroke="#a8ffc4" fill="none" strokeWidth="1" className="opacity-0 group-hover:opacity-100 transition-opacity delay-200" />
                                                        <rect x="160" y="60" width="25" height="20" rx="2" stroke="#a8ffc4" fill="none" strokeWidth="1" className="opacity-0 group-hover:opacity-100 transition-opacity delay-300" />
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="absolute bottom-10 right-10 w-8 h-8 rotate-45 border border-[#a8ffc4]/40 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300" />
                                        </>
                                    )}

                                    {/* Pattern 2: Floating Hexagons (Design & Layout) */}
                                    {i === 1 && (
                                        <>
                                            {[
                                                { x: '70%', y: '20%', size: 40, delay: 0 },
                                                { x: '80%', y: '50%', size: 30, delay: 100 },
                                                { x: '60%', y: '70%', size: 50, delay: 200 },
                                                { x: '85%', y: '75%', size: 25, delay: 300 },
                                            ].map((hex, hi) => (
                                                <div key={hi} className="absolute opacity-0 group-hover:opacity-60 transition-all duration-700" style={{ left: hex.x, top: hex.y, transitionDelay: `${hex.delay}ms` }}>
                                                    <svg width={hex.size} height={hex.size} viewBox="0 0 24 24">
                                                        <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="none" stroke="#a8ffc4" strokeWidth="1" />
                                                    </svg>
                                                </div>
                                            ))}
                                        </>
                                    )}

                                    {/* Pattern 3: Crosshatch Lines (Editing) */}
                                    {i === 2 && (
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                                            {[...Array(8)].map((_, li) => (
                                                <div key={li} className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#a8ffc4] to-transparent"
                                                    style={{ top: `${20 + li * 10}%`, transform: `rotate(${li % 2 === 0 ? 15 : -15}deg)`, opacity: 0, animation: `fadeIn 0.5s forwards ${li * 0.1}s` }} />
                                            ))}
                                        </div>
                                    )}

                                    {/* Pattern 4: Stacked Layers (Multi-Platform) */}
                                    {i === 3 && (
                                        <div className="absolute bottom-20 right-10">
                                            {[0, 1, 2].map((layer) => (
                                                <div key={layer} className="absolute w-16 h-20 rounded-lg border border-[#a8ffc4]/40 bg-[#a8ffc4]/5 opacity-0 group-hover:opacity-100 transition-all duration-500"
                                                    style={{
                                                        transform: `translateX(${layer * -8}px) translateY(${layer * -8}px)`,
                                                        transitionDelay: `${layer * 100}ms`
                                                    }} />
                                            ))}
                                        </div>
                                    )}

                                    {/* Pattern 5: Sparkle Diamonds (Marketing Kit) */}
                                    {i === 4 && (
                                        <>
                                            {[
                                                { x: '75%', y: '25%', size: 20 },
                                                { x: '85%', y: '60%', size: 16 },
                                                { x: '65%', y: '80%', size: 24 },
                                                { x: '90%', y: '40%', size: 12 },
                                            ].map((spark, si) => (
                                                <div key={si} className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-100 scale-0"
                                                    style={{ left: spark.x, top: spark.y, transitionDelay: `${si * 100}ms` }}>
                                                    <div className="rotate-45 border border-[#a8ffc4] bg-[#a8ffc4]/10"
                                                        style={{ width: spark.size, height: spark.size }} />
                                                </div>
                                            ))}
                                        </>
                                    )}

                                    {/* Ambient glow for all */}
                                    <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-[#a8ffc4]/8 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000" />
                                </div>

                                {/* Main Icon - Top left */}
                                <div className="absolute top-10 left-10">
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#a8ffc4]/10 border border-[#a8ffc4]/20 text-[#a8ffc4] transition-all duration-500 group-hover:scale-125 group-hover:bg-[#a8ffc4]/20 group-hover:shadow-[0_0_40px_rgba(168,255,196,0.4)]">
                                        {service.icon}
                                    </div>
                                </div>

                                {/* Features - Revealed on hover */}
                                <div className="absolute top-32 left-10 right-10 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
                                    <ul className="space-y-4">
                                        {service.features.map((feature, fi) => (
                                            <li
                                                key={fi}
                                                className="flex items-center gap-4 text-white/80 text-lg"
                                            >
                                                <span className="w-2.5 h-2.5 rounded-full bg-[#a8ffc4] flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Bottom Content - Title and Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-[#111111] via-[#111111]/90 to-transparent">
                                    <p className="text-[#a8ffc4] text-sm font-semibold uppercase tracking-[0.15em] mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                        {service.subtitle}
                                    </p>
                                    <h3 className="text-[32px] font-bold text-white leading-tight mb-6 group-hover:text-[#a8ffc4] transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <div className="flex items-center gap-3 text-[#a8ffc4] font-semibold text-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
                                        <span>Explore</span>
                                        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Top right indicator */}
                                <div className="absolute top-10 right-10 w-3 h-3 rounded-full border border-white/20 group-hover:border-[#a8ffc4] group-hover:bg-[#a8ffc4] transition-all duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Progress indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[200px]">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            style={{ width: progressWidth }}
                            className="h-full bg-gradient-to-r from-[#a8ffc4] to-emerald-400 rounded-full"
                        />
                    </div>
                    <p className="text-center text-white/40 text-xs mt-3 font-mono">SCROLL TO EXPLORE</p>
                </div>
            </div>
        </section>
    );
}


// 4. HOW IT WORKS - Full-Screen Cinematic Experience
function HowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const steps = [
        {
            number: "01",
            title: "Share Your Vision",
            description: "Tell us about your book idea, target audience, and goals. We create a tailored plan that brings your vision to life.",
            gradient: "from-[#a8ffc4] to-[#10b981]"
        },
        {
            number: "02",
            title: "We Craft & Design",
            description: "Our expert writers and designers create compelling content and stunning visuals that captivate readers.",
            gradient: "from-[#c4b5fd] to-[#7c3aed]"
        },
        {
            number: "03",
            title: "Review & Refine",
            description: "You review every detail. We refine until perfect. Unlimited revisions ensure complete satisfaction.",
            gradient: "from-[#fcd34d] to-[#d97706]"
        },
        {
            number: "04",
            title: "Launch & Prosper",
            description: "Receive your polished eBook in all formats. You're set to publish and start earning.",
            gradient: "from-[#67e8f9] to-[#0ea5e9]"
        }
    ];

    // Overall progress
    const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="relative h-[500vh] bg-black">
            {/* Fixed container */}
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* Minimal elegant progress line - top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5">
                    <motion.div
                        style={{ width: lineProgress }}
                        className="h-full bg-[#a8ffc4]"
                    />
                </div>

                {/* Step counter - top right */}
                <div className="absolute top-8 right-12 z-50">
                    <div className="flex items-center gap-4 text-white/40 font-mono text-sm tracking-widest">
                        <span>STEP</span>
                        <motion.span className="text-[#a8ffc4] text-2xl font-bold">
                            {steps.map((_, i) => {
                                const stepActive = useTransform(
                                    scrollYProgress,
                                    [i / steps.length, (i + 0.5) / steps.length],
                                    [0, 1]
                                );
                                return (
                                    <motion.span
                                        key={i}
                                        style={{
                                            opacity: useTransform(
                                                scrollYProgress,
                                                [(i - 0.2) / steps.length, i / steps.length, (i + 0.8) / steps.length, (i + 1) / steps.length],
                                                [0, 1, 1, 0]
                                            ),
                                            display: 'inline-block',
                                            position: i === 0 ? 'relative' : 'absolute'
                                        }}
                                    >
                                        0{i + 1}
                                    </motion.span>
                                );
                            })}
                        </motion.span>
                        <span className="text-white/20">/ 04</span>
                    </div>
                </div>

                {/* Full-screen steps */}
                {steps.map((step, i) => {
                    const stepStart = i / steps.length;
                    const stepEnd = (i + 1) / steps.length;

                    const opacity = useTransform(
                        scrollYProgress,
                        [stepStart, stepStart + 0.05, stepEnd - 0.1, stepEnd],
                        [0, 1, 1, 0]
                    );
                    const scale = useTransform(
                        scrollYProgress,
                        [stepStart, stepStart + 0.1, stepEnd - 0.1, stepEnd],
                        [0.95, 1, 1, 1.05]
                    );
                    const y = useTransform(
                        scrollYProgress,
                        [stepStart, stepStart + 0.1],
                        [100, 0]
                    );
                    const numberX = useTransform(
                        scrollYProgress,
                        [stepStart, stepStart + 0.15],
                        [-200, 0]
                    );

                    return (
                        <motion.div
                            key={i}
                            style={{ opacity, scale }}
                            className="absolute inset-0 flex"
                        >
                            {/* Left side - Giant number */}
                            <div className="hidden lg:flex w-1/3 items-center justify-center relative overflow-hidden">
                                <motion.div
                                    style={{ x: numberX }}
                                    className="relative"
                                >
                                    {/* Massive step number */}
                                    <span
                                        className={`text-[35vw] font-black leading-[0.8] tracking-tighter select-none bg-gradient-to-b ${step.gradient} bg-clip-text text-transparent opacity-20`}
                                    >
                                        {step.number}
                                    </span>

                                    {/* Animated geometric shape behind number */}
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vw] h-[20vw]"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                    >
                                        {i === 0 && (
                                            <div className="w-full h-full rounded-full border border-[#a8ffc4]/20" />
                                        )}
                                        {i === 1 && (
                                            <div className="w-full h-full border border-[#a8ffc4]/20" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                                        )}
                                        {i === 2 && (
                                            <div className="w-full h-full border border-[#a8ffc4]/20" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />
                                        )}
                                        {i === 3 && (
                                            <div className="w-full h-full border border-[#a8ffc4]/20">
                                                <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#a8ffc4]/10 rotate-45" />
                                            </div>
                                        )}
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Right side - Content */}
                            <div className="flex-1 flex items-center px-8 lg:px-20">
                                <motion.div style={{ y }} className="max-w-3xl">
                                    {/* Step label */}
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: 'auto' }}
                                        className="inline-flex items-center gap-3 mb-8 overflow-hidden"
                                    >
                                        <div className="w-12 h-[1px] bg-[#a8ffc4]" />
                                        <span className="text-[#a8ffc4] text-sm font-mono tracking-[0.3em] uppercase">
                                            Step {step.number}
                                        </span>
                                    </motion.div>

                                    {/* Title - Massive */}
                                    <h3 className="text-[8vw] lg:text-[5vw] font-black text-white leading-[1] tracking-tight mb-10">
                                        {step.title.split(' ').map((word, wi) => (
                                            <motion.span
                                                key={wi}
                                                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                                transition={{
                                                    delay: wi * 0.15,
                                                    duration: 0.8,
                                                    ease: [0.16, 1, 0.3, 1]
                                                }}
                                                className="inline-block mr-[0.3em]"
                                                style={{ transformOrigin: 'bottom' }}
                                            >
                                                {word}
                                            </motion.span>
                                        ))}
                                    </h3>

                                    {/* Description */}
                                    <motion.p
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.8 }}
                                        className="text-2xl lg:text-3xl text-white/50 leading-relaxed font-light max-w-2xl"
                                    >
                                        {step.description}
                                    </motion.p>

                                    {/* Decorative line */}
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        transition={{ delay: 0.6, duration: 1 }}
                                        className="w-32 h-[1px] bg-gradient-to-r from-[#a8ffc4] to-transparent mt-16 origin-left"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Scroll indicator */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                >
                    <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-[1px] h-8 bg-gradient-to-b from-[#a8ffc4] to-transparent"
                    />
                </motion.div>
            </div>
        </section>
    );
}


// 5. PORTFOLIO SHOWCASE
import { ExternalLink } from "lucide-react";

function PortfolioShowcase() {
    const projects = [
        { title: "The Startup Playbook", category: "Business", image: "/assets/ebook-1.jpg" },
        { title: "Mindful Leadership", category: "Self-Help", image: "/assets/ebook-2.jpg" },
        { title: "Digital Marketing 101", category: "Marketing", image: "/assets/ebook-3.jpg" },
        { title: "Crypto Decoded", category: "Finance", image: "/assets/ebook-4.jpg" },
        { title: "Healthy Habits", category: "Health", image: "/assets/ebook-5.jpg" },
        { title: "AI Revolution", category: "Technology", image: "/assets/ebook-6.jpg" },
    ];

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-500 rounded-full blur-[300px] opacity-[0.05]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-[#a8ffc4] bg-[#a8ffc4]/10 rounded-full border border-[#a8ffc4]/20">
                        OUR WORK
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        Featured <span className="text-[#a8ffc4]">Projects</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 cursor-pointer"
                        >
                            {/* Placeholder gradient for book cover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/30 via-violet-600/20 to-cyan-600/30" />

                            {/* Book mockup placeholder */}
                            <div className="absolute inset-8 bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/20 shadow-2xl transform group-hover:rotate-[-2deg] transition-transform duration-500" />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-center">
                                    <ExternalLink className="w-8 h-8 text-[#a8ffc4] mx-auto mb-2" />
                                    <span className="text-white font-semibold">View Project</span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <span className="text-[#a8ffc4] text-xs font-mono uppercase tracking-wider">{project.category}</span>
                                <h3 className="text-white text-xl font-bold mt-1">{project.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 6. PRICING TIERS - Holographic Cards
import { Check, Star } from "lucide-react";

function PricingSection() {
    const plans = [
        {
            name: "Basic",
            subtitle: "Design Only",
            price: "$299",
            features: ["Custom cover design", "Basic page formatting", "PDF delivery", "1 revision round"],
            popular: false,
            accent: "#06b6d4"
        },
        {
            name: "Standard",
            subtitle: "Writing + Design",
            price: "$799",
            features: ["Full eBook writing (up to 10k words)", "Custom cover design", "Professional formatting", "PDF + EPUB", "3 revision rounds"],
            popular: true,
            accent: "#a8ffc4"
        },
        {
            name: "Premium",
            subtitle: "Full Service",
            price: "$1,499",
            features: ["Extended writing (up to 25k words)", "Premium cover + interior design", "All formats (PDF, EPUB, KDP)", "Marketing kit included", "Unlimited revisions", "Priority support"],
            popular: false,
            accent: "#8b5cf6"
        }
    ];

    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#a8ffc4] rounded-full blur-[300px] opacity-[0.05]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-[#a8ffc4] bg-[#a8ffc4]/10 rounded-full border border-[#a8ffc4]/20">
                        PRICING
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                        Simple, Transparent <span className="text-[#a8ffc4]">Pricing</span>
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">Choose the package that fits your needs. All plans include 100% copyright ownership.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={`group relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-500 ${plan.popular
                                ? "bg-gradient-to-br from-[#a8ffc4]/20 to-[#a8ffc4]/5 border-[#a8ffc4]/50 scale-105"
                                : "bg-white/5 border-white/10 hover:border-white/20"
                                }`}
                        >
                            {/* Popular badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#a8ffc4] text-black text-sm font-bold rounded-full flex items-center gap-1">
                                    <Star className="w-4 h-4" /> MOST POPULAR
                                </div>
                            )}

                            {/* Holographic shimmer effect */}
                            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                                <p className="text-white/50 text-sm mb-6">{plan.subtitle}</p>

                                <div className="mb-8">
                                    <span className="text-5xl font-black text-white">{plan.price}</span>
                                    <span className="text-white/50 ml-2">/ project</span>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, fi) => (
                                        <li key={fi} className="flex items-start gap-3 text-white/70">
                                            <Check className="w-5 h-5 text-[#a8ffc4] flex-shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-4 rounded-full font-bold transition-all duration-300 ${plan.popular
                                    ? "bg-[#a8ffc4] text-black hover:bg-white"
                                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                                    }`}>
                                    Get Started
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}


// 7. TESTIMONIALS - Auto-scroll carousel
import { Quote } from "lucide-react";

function TestimonialsSection() {
    const testimonials = [
        { name: "Sarah Chen", role: "Entrepreneur", quote: "The OG Digitals transformed my rough manuscript into a bestseller. Their attention to detail is unmatched.", rating: 5 },
        { name: "Marcus Johnson", role: "Coach", quote: "From concept to launch in just 3 weeks. The design blew my audience away!", rating: 5 },
        { name: "Emily Rodriguez", role: "Author", quote: "Finally found a team that understands both writing AND design. 10/10 recommend.", rating: 5 },
        { name: "David Kim", role: "Consultant", quote: "My eBook has generated over $50K in revenue. Best investment I've made for my business.", rating: 5 },
    ];

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald-500 rounded-full blur-[200px] opacity-[0.05]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-[#a8ffc4] bg-[#a8ffc4]/10 rounded-full border border-[#a8ffc4]/20">
                        TESTIMONIALS
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        What Our <span className="text-[#a8ffc4]">Clients Say</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#a8ffc4]/30 transition-all duration-300"
                        >
                            <Quote className="w-8 h-8 text-[#a8ffc4] mb-4" />
                            <p className="text-white/70 mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a8ffc4] to-emerald-600" />
                                <div>
                                    <p className="text-white font-semibold">{t.name}</p>
                                    <p className="text-white/50 text-sm">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 8. BOTTOM CTA - Gravity Pull Effect
function BottomCTA() {
    return (
        <section className="py-32 bg-gradient-to-b from-[#050505] to-black relative overflow-hidden">
            {/* Animated background glow */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a8ffc4] rounded-full blur-[200px] opacity-10"
            />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block px-4 py-2 mb-6 text-sm font-mono text-[#a8ffc4] bg-[#a8ffc4]/10 rounded-full border border-[#a8ffc4]/20">
                        GET STARTED
                    </span>
                    <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-6">
                        Ready to Launch Your<br /><span className="text-[#a8ffc4]">eBook?</span>
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
                        Join hundreds of authors who&apos;ve turned their ideas into income. Let&apos;s create something amazing together.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-[#a8ffc4] text-black font-bold text-lg rounded-full shadow-[0_0_40px_rgba(168,255,196,0.3)] hover:shadow-[0_0_60px_rgba(168,255,196,0.5)] transition-all"
                        >
                            Start Your Project →
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-transparent border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all"
                        >
                            Get Free Sample
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// 9. FAQ - Accordion with Depth
import { ChevronDown } from "lucide-react";

function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        { q: "How long does an eBook take to complete?", a: "Typically 2-4 weeks depending on the package. Rush delivery is available for urgent projects." },
        { q: "Do I get full copyright ownership?", a: "Absolutely! You retain 100% copyright and ownership of your eBook and all deliverables." },
        { q: "What formats do you deliver?", a: "We provide PDF, EPUB, and Amazon KDP-ready formats. Print-ready files are also available." },
        { q: "Do you provide cover designs?", a: "Yes! All packages include custom cover design. We also offer standalone cover design services." },
        { q: "Can you publish the eBook for me?", a: "We prepare everything for publishing. We can guide you through the process or handle it for an additional fee." },
    ];

    return (
        <section className="py-32 bg-[#0a0a0a] relative">
            <div className="container mx-auto px-6 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-[#a8ffc4] bg-[#a8ffc4]/10 rounded-full border border-[#a8ffc4]/20">
                        FAQ
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        Questions & <span className="text-[#a8ffc4]">Answers</span>
                    </h2>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === i ? "border-[#a8ffc4]/50 bg-[#a8ffc4]/5" : "border-white/10 bg-white/5"
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full p-6 flex items-center justify-between text-left"
                            >
                                <span className="text-white font-semibold text-lg">{faq.q}</span>
                                <ChevronDown className={`w-5 h-5 text-[#a8ffc4] transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-6 pb-6 text-white/60 leading-relaxed">{faq.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- ALL SECTIONS COMPLETE ---


// --- MAIN PAGE ---
export default function EbookServicesPage() {
    return (
        <main className="bg-black min-h-screen selection:bg-[#a8ffc4] selection:text-black">
            <Hero />
            <WhyChooseComponents />
            <InfiniteMarquee />
            <ServicePackages />
            <HowItWorks />
            <PortfolioShowcase />
            <PricingSection />
            <TestimonialsSection />
            <BottomCTA />
            <FAQSection />

            <footer className="py-12 bg-black text-center border-t border-white/5">
                <p className="text-white/20 text-sm font-mono">
                    THE OG DIGITALS © 2024
                </p>
            </footer>
        </main>
    );
}
