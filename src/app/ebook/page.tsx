"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Floating particles component
function FloatingParticles() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[#a8ffc4]/30 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 4,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

// Magnetic button component
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.3);
        y.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const springConfig = { stiffness: 150, damping: 15 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    return (
        <motion.button
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    );
}

// Reveal text animation
function RevealText({ children, delay = 0 }: { children: string; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <span ref={ref} className="inline-block overflow-hidden">
            <motion.span
                className="inline-block"
                initial={{ y: "100%", rotateX: -90 }}
                animate={isInView ? { y: 0, rotateX: 0 } : {}}
                transition={{
                    duration: 0.8,
                    delay,
                    ease: [0.25, 1, 0.5, 1]
                }}
            >
                {children}
            </motion.span>
        </span>
    );
}

// 3D Book with page flip effect
function Book3DAdvanced() {
    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

    const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
    const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            className="relative w-[280px] h-[400px] md:w-[350px] md:h-[500px] cursor-pointer"
            style={{ perspective: 1500 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
            <motion.div
                className="relative w-full h-full"
                style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Glow effect */}
                <motion.div
                    className="absolute -inset-10 rounded-3xl bg-[#a8ffc4]/20 blur-3xl"
                    animate={{ opacity: isHovered ? 0.4 : 0.15 }}
                    transition={{ duration: 0.5 }}
                />

                {/* Book cover */}
                <div
                    className="absolute inset-0 rounded-r-lg rounded-l-sm overflow-hidden shadow-2xl"
                    style={{
                        transform: "translateZ(20px)",
                        transformStyle: "preserve-3d"
                    }}
                >
                    {/* Cover image */}
                    <img
                        src="/assets/ebook-cover.png"
                        alt="Ebook Cover"
                        className="w-full h-full object-cover"
                    />

                    {/* Glossy overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent"
                        animate={{ opacity: isHovered ? 0.5 : 0.2 }}
                    />

                    {/* Shine effect on hover */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={{ x: isHovered ? "100%" : "-100%" }}
                        transition={{ duration: 0.6 }}
                    />
                </div>

                {/* Book spine */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-[40px] origin-left"
                    style={{
                        transform: "rotateY(-90deg) translateX(-20px)",
                        background: "linear-gradient(90deg, #0a0a0a, #1a1a1a, #0a0a0a)",
                    }}
                >
                    <div className="h-full flex items-center justify-center">
                        <span className="text-[#a8ffc4]/50 text-[10px] uppercase tracking-[0.3em] rotate-90 whitespace-nowrap font-medium">
                            Digital Guide
                        </span>
                    </div>
                </div>

                {/* Pages (visible from side) */}
                <div
                    className="absolute right-0 top-[3px] bottom-[3px] w-[40px]"
                    style={{
                        transform: "rotateY(90deg) translateX(20px)",
                        background: "repeating-linear-gradient(90deg, #f5f5f5 0px, #e8e8e8 1px, #f8f8f8 2px)",
                    }}
                />

                {/* Back cover */}
                <div
                    className="absolute inset-0 bg-[#0a0a0a] rounded-l-lg rounded-r-sm border border-white/5"
                    style={{ transform: "translateZ(-20px) rotateY(180deg)" }}
                />

                {/* Floating page preview on hover */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="absolute -right-8 top-1/2 w-[200px] h-[280px] bg-white rounded-lg shadow-2xl overflow-hidden"
                            initial={{ opacity: 0, x: -20, rotateY: -30, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, rotateY: -30, scale: 0.8 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                translateY: "-50%",
                                transformStyle: "preserve-3d",
                                transform: "translateZ(40px)"
                            }}
                        >
                            <div className="p-4 h-full bg-gradient-to-br from-white to-gray-100">
                                <div className="w-8 h-8 rounded bg-[#a8ffc4]/20 mb-3" />
                                <div className="h-2 w-3/4 bg-gray-200 rounded mb-2" />
                                <div className="h-2 w-full bg-gray-100 rounded mb-2" />
                                <div className="h-2 w-5/6 bg-gray-100 rounded mb-4" />
                                <div className="h-16 w-full bg-gradient-to-r from-[#a8ffc4]/10 to-blue-500/10 rounded mb-3" />
                                <div className="h-2 w-full bg-gray-100 rounded mb-2" />
                                <div className="h-2 w-4/5 bg-gray-100 rounded" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Shadow underneath */}
            <motion.div
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-[20px] bg-black/50 blur-xl rounded-[50%]"
                animate={{ scale: isHovered ? 1.1 : 1, opacity: isHovered ? 0.7 : 0.4 }}
            />
        </motion.div>
    );
}

// Chapter card with reveal animation
function ChapterCard({ chapter, index }: { chapter: { number: string; title: string; desc: string; color: string }; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, borderColor: "rgba(168,255,196,0.2)" }}
        >
            {/* Gradient background on hover */}
            <motion.div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${chapter.color}`}
            />

            {/* Content */}
            <div className="relative z-10">
                <span className="text-[#a8ffc4] text-sm font-mono mb-4 block">{chapter.number}</span>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#a8ffc4] transition-colors">
                    {chapter.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                    {chapter.desc}
                </p>
            </div>

            {/* Corner decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-white/5 rounded-bl-3xl group-hover:border-[#a8ffc4]/20 transition-colors" />
        </motion.div>
    );
}

export default function EbookPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
    const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

    const chapters = [
        { number: "01", title: "Brand Foundation", desc: "Discover the core principles that make brands unforgettable and timeless.", color: "bg-gradient-to-br from-[#a8ffc4]/5 to-transparent" },
        { number: "02", title: "Visual Identity", desc: "Master the art of creating visual systems that command attention.", color: "bg-gradient-to-br from-blue-500/5 to-transparent" },
        { number: "03", title: "Growth Hacking", desc: "Proven strategies to scale your digital presence exponentially.", color: "bg-gradient-to-br from-purple-500/5 to-transparent" },
        { number: "04", title: "Conversion Magic", desc: "Turn visitors into loyal customers with psychology-backed tactics.", color: "bg-gradient-to-br from-orange-500/5 to-transparent" },
        { number: "05", title: "Content Mastery", desc: "Create content that resonates, engages, and drives action.", color: "bg-gradient-to-br from-pink-500/5 to-transparent" },
        { number: "06", title: "Future Proofing", desc: "Stay ahead of trends and prepare for what's next in digital.", color: "bg-gradient-to-br from-cyan-500/5 to-transparent" },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    return (
        <main ref={containerRef} className="bg-black min-h-screen selection:bg-[#a8ffc4] selection:text-black overflow-x-hidden">
            <FloatingParticles />

            {/* ===== HERO SECTION ===== */}
            <motion.section
                ref={heroRef}
                className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 overflow-hidden"
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            >
                {/* Background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#a8ffc4]/5 rounded-full blur-[150px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />

                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: "100px 100px"
                        }}
                    />
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 max-w-7xl mx-auto pt-20">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#a8ffc4]/10 border border-[#a8ffc4]/20 rounded-full text-[#a8ffc4] text-sm font-medium">
                                <span className="w-2 h-2 bg-[#a8ffc4] rounded-full animate-pulse" />
                                Free Digital Guide
                            </span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] mb-8 tracking-tight">
                            <RevealText>Master</RevealText>{" "}
                            <RevealText delay={0.1}>Digital</RevealText>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8ffc4] via-[#7dd3a8] to-[#60a5fa]">
                                <RevealText delay={0.2}>Excellence.</RevealText>
                            </span>
                        </h1>

                        <motion.p
                            className="text-lg md:text-xl text-white/50 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            50+ pages of premium insights, frameworks, and strategies used by
                            leading agencies to dominate the digital landscape.
                        </motion.p>

                        {/* Email form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <>
                                        <motion.div className="relative flex-1">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                required
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-white/30 focus:outline-none focus:border-[#a8ffc4]/50 focus:bg-white/10 transition-all"
                                            />
                                            <motion.div
                                                className="absolute inset-0 rounded-full border border-[#a8ffc4]/50 pointer-events-none"
                                                initial={{ scale: 1, opacity: 0 }}
                                                whileFocus={{ scale: 1.02, opacity: 1 }}
                                            />
                                        </motion.div>
                                        <MagneticButton
                                            className="px-8 py-4 bg-[#a8ffc4] text-black font-bold rounded-full flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(168,255,196,0.3)] hover:shadow-[0_0_50px_rgba(168,255,196,0.5)] transition-shadow disabled:opacity-50"
                                        >
                                            {isSubmitting ? (
                                                <motion.div
                                                    className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                            ) : (
                                                <>
                                                    Get Free Access
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </>
                                            )}
                                        </MagneticButton>
                                    </>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex items-center gap-3 px-6 py-4 bg-[#a8ffc4]/10 border border-[#a8ffc4]/30 rounded-full text-[#a8ffc4]"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Check your inbox! Downloading...
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.form>

                        {/* Social proof */}
                        <motion.div
                            className="mt-10 flex items-center gap-4 justify-center lg:justify-start"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 border-2 border-black flex items-center justify-center text-xs text-white font-bold"
                                    >
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm text-white/40">
                                <span className="text-white font-medium">2,500+</span> founders reading
                            </div>
                        </motion.div>
                    </div>

                    {/* Right - 3D Book */}
                    <div className="flex-1 flex justify-center">
                        <Book3DAdvanced />
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-white/30 text-xs uppercase tracking-widest">Explore</span>
                        <div className="w-[1px] h-8 bg-gradient-to-b from-[#a8ffc4]/50 to-transparent" />
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* ===== CHAPTERS SECTION ===== */}
            <section className="py-32 lg:py-48 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#a8ffc4]/[0.02] to-transparent" />

                <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                    <div className="text-center mb-20">
                        <motion.span
                            className="text-[#a8ffc4] text-sm font-medium uppercase tracking-[0.3em] mb-4 block"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            What&apos;s Inside
                        </motion.span>
                        <motion.h2
                            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Six chapters of <span className="text-[#a8ffc4]">pure value.</span>
                        </motion.h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {chapters.map((chapter, i) => (
                            <ChapterCard key={chapter.number} chapter={chapter} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FEATURES STRIP ===== */}
            <section className="py-20 border-y border-white/5 bg-white/[0.01] overflow-hidden">
                <motion.div
                    className="flex gap-16 whitespace-nowrap"
                    animate={{ x: [0, "-50%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {[...Array(2)].map((_, setIndex) => (
                        <div key={setIndex} className="flex gap-16">
                            {["🎯 Actionable Strategies", "📊 Real Case Studies", "🚀 Growth Frameworks", "💡 Expert Insights", "✨ Bonus Resources"].map((item, i) => (
                                <span key={i} className="text-2xl text-white/20 font-medium">{item}</span>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* ===== FINAL CTA ===== */}
            <section className="py-32 lg:py-48 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#a8ffc4]/5 rounded-full blur-[200px]" />
                </div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[0.9]">
                            Start Your
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8ffc4] to-[#60a5fa]">
                                Transformation.
                            </span>
                        </h2>
                        <p className="text-xl text-white/40 mb-12 max-w-2xl mx-auto">
                            Join thousands of founders, marketers, and creatives who are already
                            leveraging these insights to dominate their markets.
                        </p>

                        <Link href="#" className="inline-block">
                            <motion.div
                                className="group relative px-12 py-6 bg-white text-black font-bold text-xl rounded-full overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-[#a8ffc4] to-[#60a5fa]"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <span className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors">
                                    Download Free Ebook
                                    <motion.svg
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </motion.svg>
                                </span>
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
