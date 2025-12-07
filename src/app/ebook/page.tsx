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
    AnimatePresence
} from "framer-motion";
import Book3D from "@/components/Book3D";

// --- CUSTOM CURSOR ---
function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

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

// --- FLEXIBLE MARQUEE (BELT) ---
function MarqueeBelt({
    children,
    baseVelocity = 5,
    className = "",
    style = {}
}: {
    children: React.ReactNode;
    baseVelocity: number;
    className?: string;
    style?: any;
}) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

    // Wrap the content to prevent gaps
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
        <div className={`overflow-hidden whitespace-nowrap flex flex-nowrap ${className}`} style={style}>
            <motion.div className="flex flex-nowrap items-center" style={{ x }}>
                {Array.from({ length: 8 }).map((_, i) => (
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
            <span className="absolute inset-0 translate-y-[100%] bg-black group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
            <span className="relative z-10 group-hover:text-[#a8ffc4] transition-colors duration-300">{children}</span>
        </motion.button>
    );
}

// --- CHAPTER LIST ITEM ---
function ChapterListItem({ index, title, description, color, setActiveChapter }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setActiveChapter(index)}
            className="group relative border-b border-white/10 py-12 md:py-16 hover:bg-white/[0.02] transition-colors cursor-pointer"
        >
            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-baseline gap-8 md:gap-16">
                <span className="text-[#a8ffc4] font-mono text-lg tracking-widest">0{index + 1}</span>
                <div className="flex-1">
                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-4 group-hover:text-[#a8ffc4] transition-colors tracking-tight">
                        {title}
                    </h3>
                    <p className="text-white/40 text-lg max-w-xl group-hover:text-white/60 transition-colors">
                        {description}
                    </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:bg-[#a8ffc4] group-hover:text-black group-hover:border-transparent transition-all transform group-hover:-rotate-45">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
}

// --- MAIN PAGE COMPONENT ---
export default function EbookPage() {
    const containerRef = useRef(null);
    const [activeChapter, setActiveChapter] = useState(0);

    const chapters = [
        { title: "Digital Gravity", desc: "How to build a brand presence that pulls customers in with irresistible force.", belt: "ATTRACTION • PULL • FORCE •" },
        { title: "Visual Alchemy", desc: "Transforming boring corporate identities into gold-standard design systems.", belt: "GOLD • TRANSFORM • MAGIC •" },
        { title: "Growth Physics", desc: "Applying the laws of momentum to scale your revenue exponentially.", belt: "SCALE • VELOCITY • SPEED •" },
        { title: "Mind Reading", desc: "Psychological frameworks to understand what your customers want before they do.", belt: "PSYCHOLOGY • DESIRE • WANT •" },
    ];

    return (
        <main ref={containerRef} className="bg-black min-h-screen selection:bg-[#a8ffc4] selection:text-black overflow-x-hidden cursor-none">
            <CustomCursor />

            {/* --- CINEMA HERO --- */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000">
                <div className="relative z-20 flex flex-col md:flex-row items-center w-full max-w-[90vw] mx-auto gap-12 md:gap-32">
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
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
                </div>
            </section>

            {/* --- CROSSING BELTS SECTION --- */}
            <section className="relative py-32 bg-[#050505] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Belt 1 - Angled Down */}
                    <div className="absolute w-[120%] rotate-6 bg-[#a8ffc4] text-black py-4 z-10 border-y-4 border-black">
                        <MarqueeBelt baseVelocity={3}>
                            <span className="text-4xl font-black italic uppercase tracking-tighter mx-8">
                                LIMITED TIME FREE ACCESS • DOWNLOAD NOW •
                            </span>
                        </MarqueeBelt>
                    </div>
                    {/* Belt 2 - Angled Up */}
                    <div className="absolute w-[120%] -rotate-3 bg-white text-black py-6 z-0 border-y-4 border-black box-content opacity-50 blur-[1px]">
                        <MarqueeBelt baseVelocity={-3}>
                            <span className="text-6xl font-black outline-text uppercase tracking-tighter mx-8 opacity-20">
                                STRATEGY • DESIGN • GROWTH • IMPACT •
                            </span>
                        </MarqueeBelt>
                    </div>
                </div>
                <div className="h-[40vh]" /> {/* Spacer for belts */}
            </section>

            {/* --- THE INDEX (CHAPTERS) --- */}
            <section className="relative py-32 min-h-screen flex items-center" onMouseLeave={() => setActiveChapter(-1)}>
                {/* Background Dynamic Marquee */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeChapter}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 flex flex-col justify-center gap-12"
                        >
                            {[...Array(5)].map((_, i) => (
                                <MarqueeBelt key={i} baseVelocity={i % 2 === 0 ? 1 : -1} className="opacity-30">
                                    <span className="text-8xl md:text-9xl font-black text-transparent stroke-white stroke-2 uppercase tracking-tighter">
                                        {activeChapter !== -1 ? chapters[activeChapter].belt : "THE PLAYBOOK •"}
                                    </span>
                                </MarqueeBelt>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="w-full relative z-10">
                    <div className="container mx-auto px-6 mb-20 text-center">
                        <h2 className="text-4xl md:text-7xl font-bold text-white mb-6">Inside the Black Box.</h2>
                        <div className="w-24 h-1 bg-[#a8ffc4] mx-auto" />
                    </div>

                    <div>
                        {chapters.map((chapter, i) => (
                            <ChapterListItem
                                key={i}
                                index={i}
                                title={chapter.title}
                                description={chapter.desc}
                                setActiveChapter={setActiveChapter}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FINAL BELT + CTA --- */}
            <section className="relative py-20 bg-[#a8ffc4] overflow-hidden">
                <MarqueeBelt baseVelocity={2} className="text-black mb-12">
                    <span className="text-[10vw] font-black leading-none uppercase tracking-tighter mx-8">
                        GET THE UNFAIR ADVANTAGE •
                    </span>
                </MarqueeBelt>

                <div className="container mx-auto px-6 text-center">
                    <MagneticButton className="px-16 py-8 bg-black text-[#a8ffc4] text-2xl font-bold rounded-full hover:bg-white hover:text-black transition-all shadow-2xl">
                        Download Playbook Now
                    </MagneticButton>
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
