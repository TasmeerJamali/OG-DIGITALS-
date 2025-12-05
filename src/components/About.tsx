"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import HexagonGrid from "./HexagonGrid";

// Animated counter component
function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const incrementTime = (duration * 1000) / end;

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start >= end) {
                    clearInterval(timer);
                }
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {count}{suffix}
        </span>
    );
}

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
        hidden: {
            opacity: 0,
            y: 40,
            rotateX: 90,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 1, 0.5, 1] as const,
            },
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

// Stats data
const stats = [
    { value: 50, suffix: "+", label: "Projects Delivered", description: "Successful digital transformations" },
    { value: 98, suffix: "%", label: "Client Satisfaction", description: "Happy clients worldwide" },
    { value: 5, suffix: "+", label: "Years Experience", description: "Crafting digital excellence" },
    { value: 24, suffix: "/7", label: "Support Available", description: "Always here for you" },
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
                {/* Floating gradient orbs */}
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

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            {/* Interactive Hexagon Grid on right side */}
            <HexagonGrid />

            <motion.div
                className="max-w-7xl mx-auto relative z-10"
                style={{ opacity, scale }}
            >
                {/* Section Header with animated line */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
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

                {/* Main Text with Word-by-Word Reveal */}
                <div className="mb-20 md:mb-32">
                    <WordReveal className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
                        In a world of digital noise, we create signal.
                    </WordReveal>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="mt-8 md:mt-12 max-w-4xl"
                    >
                        <p
                            className="text-lg md:text-xl lg:text-2xl leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                            Our work cuts through the chaos with{" "}
                            <span style={{ color: "#a8ffc4", fontWeight: 500 }}>strategic clarity</span>{" "}
                            and{" "}
                            <span style={{ color: "#a8ffc4", fontWeight: 500 }}>creative courage</span>,
                            transforming passive viewers into active participants in your brand&apos;s{" "}
                            <motion.span
                                className="inline-block italic"
                                style={{
                                    background: "linear-gradient(135deg, #a8ffc4 0%, #7affb8 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    fontWeight: 600,
                                }}
                                whileHover={{ scale: 1.05 }}
                            >
                                journey.
                            </motion.span>
                        </p>
                    </motion.div>
                </div>

                {/* Stats Grid - Premium Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: [0.25, 1, 0.5, 1]
                            }}
                            viewport={{ once: true }}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3 }
                            }}
                            className="group relative p-6 md:p-8 rounded-2xl cursor-pointer overflow-hidden text-center"
                            style={{
                                background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                                border: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            {/* Hover glow effect */}
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: "radial-gradient(circle at 50% 50%, rgba(168,255,196,0.08) 0%, transparent 70%)",
                                }}
                            />

                            {/* Top accent line */}
                            <motion.div
                                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#a8ffc4] to-transparent"
                                initial={{ width: 0, left: "50%" }}
                                whileHover={{ width: "100%", left: 0 }}
                                transition={{ duration: 0.4 }}
                            />

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Number */}
                                <div
                                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3"
                                    style={{
                                        background: "linear-gradient(135deg, #a8ffc4 0%, #7affb8 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    <AnimatedCounter
                                        value={stat.value}
                                        suffix={stat.suffix}
                                        duration={1.5}
                                    />
                                </div>

                                {/* Label */}
                                <div
                                    className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium mb-2"
                                    style={{ color: "rgba(255,255,255,0.7)" }}
                                >
                                    {stat.label}
                                </div>

                                {/* Description - shows on hover */}
                                <motion.div
                                    className="text-xs md:text-sm overflow-hidden"
                                    style={{ color: "rgba(255,255,255,0.4)" }}
                                    initial={{ height: 0, opacity: 0 }}
                                    whileHover={{ height: "auto", opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {stat.description}
                                </motion.div>
                            </div>

                            {/* Decorative corner */}
                            <div
                                className="absolute bottom-4 right-4 w-8 h-8 opacity-10 group-hover:opacity-30 transition-opacity duration-300"
                                style={{
                                    borderRight: "2px solid #a8ffc4",
                                    borderBottom: "2px solid #a8ffc4",
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="mt-20 md:mt-32 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <motion.a
                        href="#contact"
                        className="inline-flex items-center gap-4 text-lg md:text-xl font-medium group"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                        whileHover={{ color: "#a8ffc4" }}
                    >
                        <span>Let&apos;s create something extraordinary</span>
                        <motion.span
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{
                                border: "1px solid rgba(168,255,196,0.3)",
                                background: "rgba(168,255,196,0.05)",
                            }}
                            whileHover={{
                                scale: 1.1,
                                background: "rgba(168,255,196,0.15)",
                                borderColor: "rgba(168,255,196,0.6)",
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <svg
                                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </motion.span>
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
}
