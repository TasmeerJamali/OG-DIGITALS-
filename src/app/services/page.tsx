"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";

// Services as planets
const planets = [
    {
        id: 1,
        title: "Web Development",
        subtitle: "Digital Experiences",
        description: "We craft immersive digital experiences that captivate users and drive conversions.",
        features: ["Custom Web Apps", "E-Commerce", "CMS Development", "API Integration"],
        color: "#4ADE80",
        gradient: "radial-gradient(circle, #4ADE80 0%, #166534 50%, #052e16 100%)",
        glow: "0 0 100px 20px rgba(74,222,128,0.4)",
        orbitColor: "rgba(74,222,128,0.3)",
    },
    {
        id: 2,
        title: "Brand Identity",
        subtitle: "Visual Storytelling",
        description: "We create memorable brand identities that resonate with your audience.",
        features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Packaging"],
        color: "#F59E0B",
        gradient: "radial-gradient(circle, #FBBF24 0%, #B45309 50%, #451a03 100%)",
        glow: "0 0 100px 20px rgba(245,158,11,0.4)",
        orbitColor: "rgba(245,158,11,0.3)",
    },
    {
        id: 3,
        title: "UI/UX Design",
        subtitle: "Human-Centered",
        description: "We design intuitive interfaces that users love. Research-driven design.",
        features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
        color: "#3B82F6",
        gradient: "radial-gradient(circle, #60A5FA 0%, #1D4ED8 50%, #1e1b4b 100%)",
        glow: "0 0 100px 20px rgba(59,130,246,0.4)",
        orbitColor: "rgba(59,130,246,0.3)",
    },
    {
        id: 4,
        title: "SEO & Marketing",
        subtitle: "Growth Engine",
        description: "We optimize your digital presence for maximum visibility and growth.",
        features: ["Technical SEO", "Content Strategy", "Analytics", "Performance"],
        color: "#8B5CF6",
        gradient: "radial-gradient(circle, #A78BFA 0%, #6D28D9 50%, #2e1065 100%)",
        glow: "0 0 100px 20px rgba(139,92,246,0.4)",
        orbitColor: "rgba(139,92,246,0.3)",
    },
];

// Starfield background
function Starfield() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Static stars */}
            {[...Array(150)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: Math.random() * 2 + 1,
                        height: Math.random() * 2 + 1,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.8 + 0.2,
                    }}
                />
            ))}

            {/* Twinkling stars */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={`twinkle-${i}`}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: Math.random() * 3 + 2,
                        height: Math.random() * 3 + 2,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                />
            ))}
        </div>
    );
}

// Planet component
function Planet({
    planet,
    index,
    scrollProgress,
}: {
    planet: typeof planets[0];
    index: number;
    scrollProgress: ReturnType<typeof useTransform<number, number>>;
}) {
    // Each planet occupies a segment of the scroll
    const segmentSize = 1 / (planets.length + 1);
    const planetStart = (index + 0.5) * segmentSize;
    const planetPeak = (index + 1) * segmentSize;
    const planetEnd = (index + 1.5) * segmentSize;

    // Planet zoom - starts small, grows huge as we approach, shrinks as we pass
    const scale = useTransform(
        scrollProgress,
        [planetStart - 0.1, planetPeak - 0.05, planetPeak, planetPeak + 0.05, planetEnd],
        [0.1, 0.5, 15, 30, 50]
    );

    // Opacity - fade in, stay, fade out as we zoom through
    const opacity = useTransform(
        scrollProgress,
        [planetStart - 0.1, planetStart, planetPeak - 0.1, planetPeak, planetPeak + 0.05],
        [0, 1, 1, 0.3, 0]
    );

    // Content opacity - only visible when we're "on" the planet
    const contentOpacity = useTransform(
        scrollProgress,
        [planetPeak - 0.08, planetPeak - 0.03, planetPeak + 0.02, planetPeak + 0.05],
        [0, 1, 1, 0]
    );

    // Y position for initial approach
    const y = useTransform(
        scrollProgress,
        [planetStart - 0.1, planetPeak],
        [200, 0]
    );

    const springScale = useSpring(scale, { damping: 30, stiffness: 100 });
    const springY = useSpring(y, { damping: 30, stiffness: 100 });

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity, zIndex: 10 + index }}
        >
            {/* Planet sphere */}
            <motion.div
                className="relative rounded-full"
                style={{
                    scale: springScale,
                    y: springY,
                    width: 200,
                    height: 200,
                    background: planet.gradient,
                    boxShadow: planet.glow,
                }}
            >
                {/* Planet surface texture */}
                <div
                    className="absolute inset-0 rounded-full opacity-30"
                    style={{
                        background: `radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                    }}
                />

                {/* Orbit ring */}
                <motion.div
                    className="absolute rounded-full border"
                    style={{
                        width: 280,
                        height: 280,
                        left: -40,
                        top: -40,
                        borderColor: planet.orbitColor,
                        transform: "rotateX(75deg)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>

            {/* Planet content - appears when zoomed in */}
            <motion.div
                className="fixed inset-0 flex items-center justify-center pointer-events-auto"
                style={{ opacity: contentOpacity }}
            >
                <div className="max-w-4xl mx-auto px-6 text-center">
                    {/* Planet number */}
                    <motion.div
                        className="text-[120px] md:text-[180px] font-bold leading-none mb-[-30px] md:mb-[-50px]"
                        style={{
                            color: "transparent",
                            WebkitTextStroke: `2px ${planet.color}50`,
                        }}
                    >
                        0{index + 1}
                    </motion.div>

                    {/* Subtitle */}
                    <motion.span
                        className="text-xs uppercase tracking-[0.3em] mb-4 block"
                        style={{ color: planet.color }}
                    >
                        {planet.subtitle}
                    </motion.span>

                    {/* Title */}
                    <motion.h2
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
                    >
                        {planet.title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p className="text-lg md:text-xl text-white/60 mb-8 max-w-2xl mx-auto">
                        {planet.description}
                    </motion.p>

                    {/* Features */}
                    <motion.div className="flex flex-wrap justify-center gap-3 mb-8">
                        {planet.features.map((feature, i) => (
                            <span
                                key={feature}
                                className="px-4 py-2 rounded-full text-sm"
                                style={{
                                    background: `${planet.color}15`,
                                    border: `1px solid ${planet.color}30`,
                                    color: planet.color,
                                }}
                            >
                                {feature}
                            </span>
                        ))}
                    </motion.div>

                    {/* CTA */}
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105"
                        style={{
                            background: planet.color,
                            color: "#000",
                            boxShadow: `0 10px 40px ${planet.color}40`,
                        }}
                    >
                        Explore This Service
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function ServicesPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth spring for scroll
    const smoothProgress = useSpring(scrollYProgress, { damping: 50, stiffness: 100 });

    // Hero transforms
    const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);

    // Final CTA transforms
    const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
    const ctaScale = useTransform(scrollYProgress, [0.85, 1], [0.8, 1]);

    // All planets converging for finale
    const convergeProgress = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

    return (
        <main
            ref={containerRef}
            className="relative bg-black"
            style={{ height: "600vh" }}
        >
            {/* Starfield background */}
            <Starfield />

            {/* Progress indicator - orbital path */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
                <div className="flex flex-col items-center gap-3">
                    {planets.map((planet, i) => {
                        const progress = (i + 1) / (planets.length + 1);
                        return (
                            <motion.div
                                key={planet.id}
                                className="w-3 h-3 rounded-full border-2 transition-all duration-300"
                                style={{
                                    borderColor: planet.color,
                                    background: useTransform(
                                        scrollYProgress,
                                        [progress - 0.1, progress, progress + 0.1],
                                        ["transparent", planet.color, planet.color]
                                    ),
                                }}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Hero - Starting point in space */}
            <motion.section
                className="fixed inset-0 flex items-center justify-center z-20"
                style={{ opacity: heroOpacity, scale: heroScale }}
            >
                <div className="text-center px-6">
                    {/* Breadcrumb */}
                    <motion.div
                        className="flex items-center justify-center gap-4 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link href="/" className="text-sm text-white/40 hover:text-white transition-colors">
                            Home
                        </Link>
                        <span className="text-white/20">/</span>
                        <span className="text-sm" style={{ color: "#a8ffc4" }}>Services</span>
                    </motion.div>

                    {/* Mini planets preview */}
                    <motion.div
                        className="flex justify-center gap-8 mb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {planets.map((planet, i) => (
                            <motion.div
                                key={planet.id}
                                className="w-12 h-12 rounded-full"
                                style={{
                                    background: planet.gradient,
                                    boxShadow: `0 0 20px ${planet.color}40`,
                                }}
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Explore Our
                        <span
                            className="block"
                            style={{
                                background: "linear-gradient(135deg, #4ADE80, #F59E0B, #3B82F6, #8B5CF6)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Universe
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-xl text-white/50 max-w-xl mx-auto mb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        Scroll to journey through our services
                    </motion.p>

                    {/* Scroll indicator */}
                    <motion.div
                        className="flex flex-col items-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <svg
                                className="w-8 h-8 text-white/40"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </motion.div>
                        <span className="text-xs uppercase tracking-widest text-white/30">
                            Begin Journey
                        </span>
                    </motion.div>
                </div>
            </motion.section>

            {/* Planets */}
            {planets.map((planet, index) => (
                <Planet
                    key={planet.id}
                    planet={planet}
                    index={index}
                    scrollProgress={smoothProgress}
                />
            ))}

            {/* Final CTA - All planets converge */}
            <motion.section
                className="fixed inset-0 flex items-center justify-center z-30"
                style={{ opacity: ctaOpacity, scale: ctaScale }}
            >
                {/* Converging planets */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {planets.map((planet, i) => {
                        const angle = (i / planets.length) * Math.PI * 2;
                        return (
                            <motion.div
                                key={planet.id}
                                className="absolute w-16 h-16 rounded-full"
                                style={{
                                    background: planet.gradient,
                                    boxShadow: `0 0 30px ${planet.color}60`,
                                    x: useTransform(convergeProgress, [0, 1], [Math.cos(angle) * 300, Math.cos(angle) * 100]),
                                    y: useTransform(convergeProgress, [0, 1], [Math.sin(angle) * 300, Math.sin(angle) * 100]),
                                }}
                            />
                        );
                    })}
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.h2
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
                    >
                        Ready to
                        <span
                            className="block"
                            style={{
                                background: "linear-gradient(135deg, #a8ffc4 0%, #4ADE80 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Launch?
                        </span>
                    </motion.h2>

                    <motion.p className="text-xl text-white/50 max-w-xl mx-auto mb-12">
                        Let&apos;s create something extraordinary together.
                    </motion.p>

                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-4 px-12 py-6 rounded-full font-medium text-xl transition-all duration-500 hover:scale-105"
                        style={{
                            background: "linear-gradient(135deg, #a8ffc4 0%, #4ADE80 100%)",
                            color: "#000",
                            boxShadow: "0 20px 60px rgba(168,255,196,0.4)",
                        }}
                    >
                        Start Your Mission
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </motion.section>
        </main>
    );
}
