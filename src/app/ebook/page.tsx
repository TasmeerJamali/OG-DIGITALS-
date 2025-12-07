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
    MotionValue,
    useInView
} from "framer-motion";
import Book3D from "@/components/Book3D";

// --- CUSTOM CURSOR ---
function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the cursor
    const springConfig = { damping: 25, stiffness: 300 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 w-8 h-8 bg-[#a8ffc4] rounded-full mix-blend-difference pointer-events-none z-[9999] hidden md:block"
            style={{ x: cursorX, y: cursorY }}
        />
    );
}

// --- VELOCITY TEXT MARQUEE ---
function VelocityMarquee({ baseVelocity = 5, children }: { baseVelocity: number; children: React.ReactNode }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

    const x = useTransform(baseX, (v) => `${(v % 100).toFixed(3)}%`);
    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        // Velocity effect
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
            <motion.div className="flex flex-nowrap text-9xl font-bold uppercase tracking-tighter opacity-10" style={{ x }}>
                {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i} className="block mr-12">{children}</span>
                ))}
            </motion.div>
        </div>
    );
}

// --- MAGNETIC BUTTON ---
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth return to center
    const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.35); // Magnetic strength
        y.set((clientY - centerY) * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className={`group relative overflow-hidden ${className}`}
            whileTap={{ scale: 0.9 }}
        >
            {/* Hover ripple effect */}
            <span className="absolute inset-0 translate-y-[100%] bg-black group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
            <span className="relative z-10 group-hover:text-[#a8ffc4] transition-colors duration-300">{children}</span>
        </motion.button>
    );
}

// --- STICKY CARD COMPONENT ---
function StickyCard({ index, title, description, color, total }: { index: number; title: string; description: string; color: string; total: number }) {
    return (
        <div className="sticky top-24 mb-12 last:mb-0">
            <motion.div
                initial={{ filter: "blur(20px)", scale: 0.9, y: 100, opacity: 0 }}
                whileInView={{ filter: "blur(0px)", scale: 1, y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="relative h-[400px] md:h-[500px] rounded-[3rem] p-10 md:p-14 border border-white/5 backdrop-blur-xl overflow-hidden shadow-2xl origin-top"
                style={{
                    backgroundColor: "#0a0a0a",
                    top: `calc(100px + ${index * 40}px)`,
                    zIndex: index
                }}
            >
                {/* Dynamic Gradient Background */}
                <div
                    className={`absolute inset-0 opacity-10 bg-gradient-to-br ${color} to-transparent`}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <span className="text-8xl md:text-9xl font-bold text-white/5 tracking-tighter">0{index + 1}</span>
                        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/20">
                            <svg className="w-6 h-6 rotate-45" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10z" /></svg>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tight leading-[0.9]">
                            {title}
                        </h3>
                        <p className="text-xl text-white/60 max-w-lg leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Noise texture overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
            </motion.div>
        </div>
    );
}

// --- MAIN PAGE COMPONENT ---
export default function EbookPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    const chapters = [
        { title: "Digital Gravity", desc: "How to build a brand presence that pulls customers in with irresistible force.", color: "from-[#a8ffc4]" },
        { title: "Visual Alchemy", desc: "Transforming boring corporate identities into gold-standard design systems.", color: "from-blue-500" },
        { title: "Growth Physics", desc: "Applying the laws of momentum to scale your revenue exponentially.", color: "from-purple-500" },
        { title: "Audience Mind Reading", desc: "Psychological frameworks to understand what your customers want before they do.", color: "from-orange-500" },
    ];

    return (
        <main ref={containerRef} className="bg-black min-h-screen selection:bg-[#a8ffc4] selection:text-black overflow-x-hidden cursor-none">
            <CustomCursor />

            {/* --- CINEMA HERO --- */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000">
                {/* Content Layer */}
                <div className="relative z-20 flex flex-col md:flex-row items-center w-full max-w-[90vw] mx-auto gap-12 md:gap-32">

                    {/* Left: Huge Text */}
                    <div className="flex-1 text-center md:text-left">
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="block text-[#a8ffc4] text-xs font-mono uppercase tracking-[0.5em] mb-8">
                                • The 2024 Playbook
                            </span>
                            <h1 className="text-[14vw] md:text-[8vw] font-black text-white leading-[0.8] tracking-tighter mb-8 mix-blend-exclusion">
                                DIGITAL <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                                    IMPACT.
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-white/50 max-w-md leading-relaxed mb-12">
                                Stop competing. Start dominating. The definitive guide to modern agency growth.
                            </p>

                            <MagneticButton className="px-10 py-5 bg-[#a8ffc4] text-black text-lg font-bold rounded-full uppercase tracking-widest inline-flex items-center gap-4">
                                Get The Guide <span className="text-xl">↓</span>
                            </MagneticButton>
                        </motion.div>
                    </div>

                    {/* Right: Floating 3D Object */}
                    <div className="flex-1 flex justify-center items-center relative z-30">
                        <motion.div
                            style={{ rotate: -15, scale: 1.2 }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 1, rotate: -15 }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-[#a8ffc4] blur-[100px] opacity-20 animate-pulse" />
                            <Book3D />
                        </motion.div>
                    </div>
                </div>

                {/* Ambient Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-white/5 blur-[120px] rounded-full mix-blend-soft-light" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#a8ffc4]/10 blur-[150px] rounded-full mix-blend-overlay" />
                    {/* Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
                </div>
            </section>

            {/* --- VELOCITY STRIP --- */}
            <section className="py-24 border-y border-white/5 bg-[#050505] overflow-hidden">
                <div className="-rotate-2 scale-110">
                    <VelocityMarquee baseVelocity={2}>
                        STRATEGY • DESIGN • GROWTH • IMPACT •
                    </VelocityMarquee>
                </div>
            </section>

            {/* --- STICKY CHAPTERS --- */}
            <section className="relative px-6 py-32 max-w-5xl mx-auto">
                <div className="mb-32 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Inside the Black Box.</h2>
                    <p className="text-white/40 text-xl">Six chapters. Zero fluff.</p>
                </div>

                {chapters.map((chapter, i) => (
                    <StickyCard
                        key={i}
                        index={i}
                        title={chapter.title}
                        description={chapter.desc}
                        color={chapter.color}
                        total={chapters.length}
                    />
                ))}
            </section>

            {/* --- DISTORTION CTA --- */}
            <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
                {/* Background "Hole" */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[60vw] h-[60vw] bg-gradient-to-tr from-[#a8ffc4]/10 to-blue-500/10 rounded-full blur-[150px] animate-spin-slow opacity-50" />
                </div>

                <div className="relative z-10 max-w-4xl">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[10vw] md:text-[6vw] font-black text-white leading-none tracking-tighter mb-12 mix-blend-overlay">
                            READ THE <br /> FUTURE.
                        </h2>

                        <div className="flex flex-col items-center gap-6">
                            <MagneticButton className="px-12 py-6 bg-white text-black text-xl font-bold rounded-full hover:bg-[#a8ffc4] transition-colors shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                                Download Playbook (Free)
                            </MagneticButton>
                            <span className="text-white/30 text-sm font-mono tracking-widest uppercase">
                                Limited Time Offer • PDF Format
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-12 border-t border-white/5 text-center">
                <p className="text-white/20 text-sm font-mono">
                    THE OG DIGITALS © 2024
                </p>
            </footer>
        </main>
    );
}
