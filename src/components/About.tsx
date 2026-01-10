"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import HexagonGrid from "./HexagonGrid";

// Formatting helper for glitch effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GlitchText = ({ text }: { text: string }) => {
    const [display, setDisplay] = useState(text);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!active) {
            setDisplay(text);
            return;
        }

        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [active, text]);

    return (
        <span
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            className="font-mono cursor-default"
        >
            {display}
        </span>
    );
};

// Word-by-word reveal component
function WordReveal({ children, className }: { children: string; className?: string }) {
    const words = children.split(" ");
    const ref = useRef<HTMLParagraphElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
                delayChildren: 0.1,
            },
        },
    };

    const wordAnimation = {
        hidden: { opacity: 0, y: 40, rotateX: 90 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] as const },
        },
    };

    return (
        <motion.p
            ref={ref}
            className={className}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ perspective: 1000 }}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={wordAnimation}
                    className="inline-block"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {word}{index < words.length - 1 ? "\u00A0" : ""}
                </motion.span>
            ))}
        </motion.p>
    );
}

// Team Data
const team = [
    {
        name: "OSAMA",
        role: "FOUNDER & CEO",
        id: "01",
        keywords: ["VISION", "LEADERSHIP", "FUTURE"],
        desc: "Driving the digital evolution with uncompromising vision."
    },
    {
        name: "SUHAIB",
        role: "HEAD OF DEV",
        id: "02",
        keywords: ["ARCHITECT", "SYSTEMS", "SCALE"],
        desc: "Building the impossible through code and logic."
    },
    {
        name: "MAZHAR",
        role: "CREATIVE DIR",
        id: "03",
        keywords: ["AESTHETICS", "DESIGN", "SOUL"],
        desc: "Crafting visual narratives that defy convention."
    },
    {
        name: "WALEED",
        role: "LEAD STRATEGIST",
        id: "04",
        keywords: ["GROWTH", "DATA", "IMPACT"],
        desc: "Turning abstract data into concrete success."
    }
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Parallax transformations
    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

    // Spring physics for smooth animations
    const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
    const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });

    return (
        <section
            id="culture"
            ref={containerRef}
            className="relative min-h-screen bg-black py-32 md:py-40 px-6 md:px-16 overflow-hidden"
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
                    style={{
                        y: springY1,
                        background: "radial-gradient(circle, rgba(168,255,196,0.15) 0%, transparent 70%)",
                        filter: "blur(60px)",
                    }}
                />
                <motion.div
                    className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full opacity-15"
                    style={{
                        y: springY2,
                        background: "radial-gradient(circle, rgba(168,255,196,0.2) 0%, transparent 70%)",
                        filter: "blur(80px)",
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <HexagonGrid />

            <motion.div
                className="max-w-7xl mx-auto relative z-10"
                style={{ opacity, scale }}
            >
                {/* About Label */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-12 md:mb-16 flex items-center justify-center gap-6"
                >
                    <motion.div
                        className="h-[1px] w-0"
                        style={{ background: "linear-gradient(90deg, #a8ffc4, transparent)" }}
                        whileInView={{ width: 60 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        viewport={{ once: true }}
                    />
                    <span
                        className="text-xs tracking-[0.4em] uppercase font-medium"
                        style={{ color: "rgba(168,255,196,0.8)" }}
                    >
                        About us
                    </span>
                </motion.div>

                {/* Main Text */}
                <div className="mb-24 text-center md:text-left">
                    <WordReveal className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                        The minds behind the magic.
                    </WordReveal>
                </div>

                {/* Creative Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="group relative h-[300px] md:h-[360px] bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-[#a8ffc4]/30 transition-all duration-500"
                        >
                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Top Right ID */}
                            <div className="absolute top-6 right-6 font-mono text-4xl font-bold text-white/5 group-hover:text-[#a8ffc4]/10 transition-colors duration-300 select-none">
                                {member.id}
                            </div>

                            {/* Corner Keywords (Animated) */}
                            {member.keywords.map((kw, i) => (
                                <motion.div
                                    key={kw}
                                    className="absolute text-[10px] tracking-[0.2em] text-[#a8ffc4]/40 font-mono"
                                    style={{
                                        top: i === 0 ? "20px" : "auto",
                                        bottom: i === 1 ? "20px" : i === 2 ? "20px" : "auto",
                                        left: i === 0 ? "20px" : i === 1 ? "20px" : "auto",
                                        right: i === 2 ? "20px" : "auto",
                                    }}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.5 + i * 0.2 }}
                                >
                                    {kw}
                                </motion.div>
                            ))}

                            {/* Content Centered */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                                <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tighter">
                                    <GlitchText text={member.name} />
                                </h3>
                                <div className="h-[2px] w-12 bg-[#a8ffc4] mb-4 group-hover:w-24 transition-all duration-500" />
                                <span className="text-sm md:text-base font-mono text-[#a8ffc4] tracking-widest uppercase mb-6">
                                    {member.role}
                                </span>
                                <p className="text-white/40 max-w-xs text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                    {member.desc}
                                </p>
                            </div>

                            {/* Scanline Effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[5] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="mt-32 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <a
                        href="#contact"
                        className="inline-flex flex-col items-center gap-2 group cursor-pointer"
                    >
                        <span className="text-white/60 text-sm tracking-widest uppercase group-hover:text-[#a8ffc4] transition-colors">
                            Join the ranks
                        </span>
                        <div className="h-px w-24 bg-white/20 group-hover:w-full group-hover:bg-[#a8ffc4] transition-all duration-500" />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
