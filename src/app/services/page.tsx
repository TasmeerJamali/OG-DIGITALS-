"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";

// Services data with unique visual identity
const services = [
    {
        id: 1,
        number: "01",
        title: "Web\nDevelopment",
        description: "We build lightning-fast, scalable web applications that drive business growth. From complex e-commerce platforms to custom SaaS solutions.",
        capabilities: ["React & Next.js", "E-Commerce Platforms", "Custom CMS", "API Development", "Performance Optimization"],
        accent: "#a8ffc4",
        bgElements: ["<div>", "</div>", "const", "function", "=>", "import", "export", "async", "await", "return", "{}", "[]", "npm", "git", "API", "fetch", "useState", "useEffect", "props", "component"],
    },
    {
        id: 2,
        number: "02",
        title: "Brand\nIdentity",
        description: "We create distinctive brand identities that capture your essence and resonate with your audience. Every touchpoint, considered.",
        capabilities: ["Logo Systems", "Visual Identity", "Brand Guidelines", "Packaging Design", "Brand Strategy"],
        accent: "#fbbf24",
        bgElements: ["✦", "◆", "○", "□", "△", "Aa", "Bb", "RGB", "CMYK", "#HEX", "Font", "Type", "Grid", "Logo", "Color", "Vision", "Brand", "Style", "Identity", "Design"],
    },
    {
        id: 3,
        number: "03",
        title: "UI/UX\nDesign",
        description: "We design intuitive digital experiences that users love. Research-driven, pixel-perfect interfaces that convert.",
        capabilities: ["User Research", "Interaction Design", "Design Systems", "Prototyping", "Usability Testing"],
        accent: "#60a5fa",
        bgElements: ["◻", "▣", "⊞", "≡", "⊟", "↗", "↖", "↙", "↘", "Figma", "Sketch", "Proto", "Wire", "Flow", "User", "Click", "Hover", "Touch", "Scroll", "Modal"],
    },
    {
        id: 4,
        number: "04",
        title: "Digital\nMarketing",
        description: "We amplify your digital presence with data-driven strategies. From SEO to social, we make sure you're found.",
        capabilities: ["SEO Optimization", "Content Strategy", "Social Media", "Analytics & Insights", "Performance Marketing"],
        accent: "#c084fc",
        bgElements: ["SEO", "CTR", "ROI", "KPI", "CPC", "↑", "↗", "📈", "★", "#1", "Top", "Rank", "Lead", "Click", "View", "Share", "Like", "Post", "Trend", "Viral"],
    },
];

// Floating background element
function FloatingElement({
    text,
    color,
    delay
}: {
    text: string;
    color: string;
    delay: number;
}) {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const randomDuration = 8 + Math.random() * 12;
    const randomSize = 16 + Math.random() * 24;

    return (
        <motion.span
            className="absolute font-mono pointer-events-none select-none"
            style={{
                left: `${randomX}%`,
                top: `${randomY}%`,
                fontSize: randomSize,
                color: color,
            }}
            initial={{ opacity: 0 }}
            animate={{
                opacity: [0, 0.15, 0.25, 0.15, 0],
                y: [0, -30, -60],
                x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
                duration: randomDuration,
                delay: delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {text}
        </motion.span>
    );
}

// Background pattern for each service
function ServiceBackground({ service, isInView }: { service: typeof services[0]; isInView: boolean }) {
    return (
        <motion.div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 1 }}
        >
            {/* Radial gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at 70% 50%, ${service.accent}20 0%, transparent 60%)`,
                }}
            />

            {/* Floating elements */}
            {service.bgElements.map((element, i) => (
                <FloatingElement
                    key={`${service.id}-${i}`}
                    text={element}
                    color={service.accent}
                    delay={i * 0.5}
                />
            ))}

            {/* Large faded text in background */}
            <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 font-bold pointer-events-none select-none"
                style={{
                    fontSize: "clamp(200px, 30vw, 400px)",
                    color: `${service.accent}10`,
                    lineHeight: 0.8,
                    whiteSpace: "nowrap",
                }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: isInView ? 0 : 100, opacity: isInView ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                {service.number}
            </motion.div>
        </motion.div>
    );
}

// Service card with reveal animation
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: false, margin: "-40%" });
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            ref={cardRef}
            className="relative min-h-[100vh] flex items-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            {/* Contextual background */}
            <ServiceBackground service={service} isInView={isInView} />

            {/* Accent line on left */}
            <motion.div
                className="absolute left-0 top-0 bottom-0 w-[2px]"
                style={{ background: service.accent }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={isInView ? { scaleY: 1, opacity: 0.5 } : { scaleY: 0, opacity: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                    {/* Left - Number and Title */}
                    <div className="lg:col-span-5">
                        {/* Number */}
                        <motion.div
                            className="flex items-center gap-6 mb-8"
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span
                                className="text-sm font-medium tracking-wider"
                                style={{ color: service.accent }}
                            >
                                {service.number}
                            </span>
                            <motion.div
                                className="h-[1px] w-16"
                                style={{ background: service.accent }}
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            />
                            <span className="text-xs uppercase tracking-widest text-white/30">
                                Service
                            </span>
                        </motion.div>

                        {/* Title */}
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight mb-8">
                            {service.title.split('\n').map((line, i) => (
                                <span key={i} className="block overflow-hidden">
                                    <motion.span
                                        className="block"
                                        initial={{ y: "100%" }}
                                        animate={isInView ? { y: 0 } : { y: "100%" }}
                                        transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                                    >
                                        {line}
                                    </motion.span>
                                </span>
                            ))}
                        </h2>

                        {/* Description */}
                        <motion.p
                            className="text-lg text-white/50 leading-relaxed mb-8 max-w-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            {service.description}
                        </motion.p>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Link
                                href="/#contact"
                                className="group inline-flex items-center gap-4"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <motion.div
                                    className="w-14 h-14 rounded-full border-2 flex items-center justify-center"
                                    style={{ borderColor: service.accent }}
                                    animate={{
                                        scale: isHovered ? 1.1 : 1,
                                        backgroundColor: isHovered ? service.accent : "transparent",
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.svg
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke={isHovered ? "#000" : service.accent}
                                        strokeWidth={2}
                                        animate={{ x: isHovered ? 3 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </motion.svg>
                                </motion.div>
                                <span
                                    className="text-sm font-medium tracking-wider uppercase"
                                    style={{ color: service.accent }}
                                >
                                    Let&apos;s Talk
                                </span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right - Capabilities */}
                    <div className="lg:col-span-7">
                        <motion.div
                            className="space-y-1"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <span className="text-xs uppercase tracking-[0.3em] text-white/30 block mb-8">
                                What we deliver
                            </span>

                            {service.capabilities.map((capability, i) => (
                                <motion.div
                                    key={capability}
                                    className="group flex items-center justify-between py-5 border-b border-white/5 cursor-default"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                                    whileHover={{
                                        x: 12,
                                        borderColor: `${service.accent}30`,
                                    }}
                                >
                                    <div className="flex items-center gap-4">
                                        <motion.div
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ background: service.accent }}
                                            whileHover={{ scale: 1.5 }}
                                        />
                                        <span className="text-xl md:text-2xl text-white/60 group-hover:text-white transition-colors duration-300">
                                            {capability}
                                        </span>
                                    </div>
                                    <motion.svg
                                        className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke={service.accent}
                                        strokeWidth={1.5}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                                    </motion.svg>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function ServicesPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <main ref={containerRef} className="relative bg-black">
            {/* Progress bar */}
            <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/5">
                <motion.div
                    className="h-full bg-gradient-to-r from-[#a8ffc4] via-[#60a5fa] to-[#c084fc]"
                    style={{ width: progressWidth }}
                />
            </div>

            {/* Hero */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32">
                {/* Animated Hexagon Grid Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Hexagon pattern */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                                <polygon
                                    points="25,0 50,14.4 50,38.6 25,53 0,38.6 0,14.4"
                                    fill="none"
                                    stroke="#a8ffc4"
                                    strokeWidth="0.5"
                                />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hexagons)" />
                    </svg>

                    {/* Glowing hexagons */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${15 + i * 15}%`,
                                top: `${20 + (i % 3) * 25}%`,
                            }}
                            animate={{
                                opacity: [0.1, 0.3, 0.1],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 4 + i,
                                repeat: Infinity,
                                delay: i * 0.5,
                            }}
                        >
                            <svg width="80" height="92" viewBox="0 0 80 92">
                                <polygon
                                    points="40,2 78,24 78,68 40,90 2,68 2,24"
                                    fill="none"
                                    stroke="#a8ffc4"
                                    strokeWidth="1"
                                    style={{ filter: "drop-shadow(0 0 10px #a8ffc4)" }}
                                />
                            </svg>
                        </motion.div>
                    ))}

                    {/* Large "OG" watermark */}
                    <motion.div
                        className="absolute right-10 top-1/2 -translate-y-1/2 font-bold pointer-events-none select-none"
                        style={{
                            fontSize: "clamp(200px, 25vw, 350px)",
                            color: "transparent",
                            WebkitTextStroke: "1px rgba(168,255,196,0.1)",
                            lineHeight: 0.9,
                        }}
                        animate={{ opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    >
                        OG
                    </motion.div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 w-full">
                    <div className="grid lg:grid-cols-12 gap-12 items-end">
                        {/* Left */}
                        <div className="lg:col-span-8">
                            {/* Breadcrumb */}
                            <motion.div
                                className="flex items-center gap-4 mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Link href="/" className="text-sm text-white/40 hover:text-white transition-colors">
                                    Home
                                </Link>
                                <span className="text-white/20">/</span>
                                <span className="text-sm text-[#a8ffc4]">Services</span>
                            </motion.div>

                            {/* Title */}
                            <h1 className="text-6xl md:text-8xl lg:text-[140px] font-bold text-white leading-[0.85] tracking-tight mb-12">
                                <span className="block overflow-hidden">
                                    <motion.span
                                        className="block"
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                                    >
                                        What
                                    </motion.span>
                                </span>
                                <span className="block overflow-hidden">
                                    <motion.span
                                        className="block"
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                                    >
                                        We <span className="text-[#a8ffc4]">Do</span>
                                    </motion.span>
                                </span>
                            </h1>
                        </div>

                        {/* Right */}
                        <div className="lg:col-span-4 pb-8">
                            <motion.p
                                className="text-lg text-white/50 leading-relaxed mb-8"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                We partner with ambitious brands to create digital experiences that drive growth.
                            </motion.p>

                            <motion.div
                                className="flex items-center gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <span className="text-4xl font-bold text-[#a8ffc4]">04</span>
                                <span className="text-sm uppercase tracking-widest text-white/30">Core Services</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-12 left-1/2 -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <motion.div
                            className="flex flex-col items-center gap-3"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2">
                                <motion.div
                                    className="w-1 h-2 rounded-full bg-[#a8ffc4]"
                                    animate={{ y: [0, 12, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Services */}
            <section className="py-16">
                {services.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={index} />
                ))}
            </section>

            {/* CTA Section */}
            <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
                {/* Animated orbit rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Outer orbit */}
                    <motion.div
                        className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-white/5"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    >
                        {/* Orbiting dots */}
                        {services.map((service, i) => (
                            <motion.div
                                key={service.id}
                                className="absolute w-4 h-4 rounded-full"
                                style={{
                                    background: service.accent,
                                    boxShadow: `0 0 20px ${service.accent}`,
                                    top: "50%",
                                    left: "50%",
                                    transform: `rotate(${i * 90}deg) translateX(250px) md:translateX(350px)`,
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Inner orbit */}
                    <motion.div
                        className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-[#a8ffc4]/10"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Center glow */}
                    <motion.div
                        className="absolute w-[200px] h-[200px] rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(168,255,196,0.2) 0%, transparent 70%)",
                            filter: "blur(40px)",
                        }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                </div>

                {/* Constellation lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                    <motion.line
                        x1="20%" y1="30%" x2="40%" y2="50%"
                        stroke="#a8ffc4" strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.line
                        x1="60%" y1="70%" x2="80%" y2="40%"
                        stroke="#60a5fa" strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1, 0] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    />
                    <motion.line
                        x1="75%" y1="25%" x2="90%" y2="60%"
                        stroke="#c084fc" strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, delay: 2 }}
                    />
                    {/* Dots at line endpoints */}
                    {[["20%", "30%"], ["40%", "50%"], ["60%", "70%"], ["80%", "40%"], ["75%", "25%"], ["90%", "60%"]].map(([x, y], i) => (
                        <motion.circle
                            key={i}
                            cx={x} cy={y} r="3"
                            fill="#a8ffc4"
                            animate={{ opacity: [0.2, 0.6, 0.2], r: [2, 4, 2] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                        />
                    ))}
                </svg>

                {/* Floating particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-[#a8ffc4]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -50, 0],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                        }}
                    />
                ))}

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-white/30 block mb-6">
                            Ready to Start?
                        </span>

                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight">
                            Let&apos;s build<br />
                            <span className="text-[#a8ffc4]">something great</span>
                        </h2>

                        <Link
                            href="/#contact"
                            className="group inline-flex items-center gap-4 px-10 py-5 rounded-full text-lg font-medium transition-all duration-500 hover:scale-105"
                            style={{
                                background: "#a8ffc4",
                                color: "#000",
                                boxShadow: "0 20px 60px rgba(168,255,196,0.3)",
                            }}
                        >
                            Start a Project
                            <motion.svg
                                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </motion.svg>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
