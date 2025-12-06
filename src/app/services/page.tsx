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
    },
    {
        id: 2,
        number: "02",
        title: "Brand\nIdentity",
        description: "We create distinctive brand identities that capture your essence and resonate with your audience. Every touchpoint, considered.",
        capabilities: ["Logo Systems", "Visual Identity", "Brand Guidelines", "Packaging Design", "Brand Strategy"],
        accent: "#fbbf24",
    },
    {
        id: 3,
        number: "03",
        title: "UI/UX\nDesign",
        description: "We design intuitive digital experiences that users love. Research-driven, pixel-perfect interfaces that convert.",
        capabilities: ["User Research", "Interaction Design", "Design Systems", "Prototyping", "Usability Testing"],
        accent: "#60a5fa",
    },
    {
        id: 4,
        number: "04",
        title: "Digital\nMarketing",
        description: "We amplify your digital presence with data-driven strategies. From SEO to social, we make sure you're found.",
        capabilities: ["SEO Optimization", "Content Strategy", "Social Media", "Analytics & Insights", "Performance Marketing"],
        accent: "#c084fc",
    },
];

// Animated text reveal
function TextReveal({ children, delay = 0 }: { children: string; delay?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <span ref={ref} className="overflow-hidden inline-block">
            <motion.span
                className="inline-block"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
            >
                {children}
            </motion.span>
        </span>
    );
}

// Service card with reveal animation
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-150px" });
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            ref={cardRef}
            className="relative min-h-[90vh] flex items-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            {/* Background accent line */}
            <motion.div
                className="absolute left-0 top-0 bottom-0 w-[1px]"
                style={{ background: `linear-gradient(to bottom, transparent, ${service.accent}40, transparent)` }}
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
            />

            <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
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
                                className="h-[1px] flex-grow"
                                style={{ background: service.accent }}
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            />
                        </motion.div>

                        {/* Title */}
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight mb-8">
                            {service.title.split('\n').map((line, i) => (
                                <span key={i} className="block overflow-hidden">
                                    <motion.span
                                        className="block"
                                        initial={{ y: "100%" }}
                                        animate={isInView ? { y: 0 } : {}}
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
                                <span
                                    className="text-sm font-medium tracking-wider uppercase"
                                    style={{ color: service.accent }}
                                >
                                    Let&apos;s Talk
                                </span>
                                <motion.div
                                    className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
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
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right - Capabilities */}
                    <div className="lg:col-span-7">
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <span className="text-xs uppercase tracking-[0.3em] text-white/30 block mb-8">
                                Capabilities
                            </span>

                            {service.capabilities.map((capability, i) => (
                                <motion.div
                                    key={capability}
                                    className="group flex items-center justify-between py-5 border-b border-white/10 cursor-default"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                                    whileHover={{ x: 10 }}
                                >
                                    <span className="text-xl md:text-2xl text-white/70 group-hover:text-white transition-colors duration-300">
                                        {capability}
                                    </span>
                                    <motion.div
                                        className="w-2 h-2 rounded-full"
                                        style={{ background: service.accent }}
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : {}}
                                        transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                                    />
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
                {/* Subtle grid background */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />

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
                                We partner with ambitious brands to create digital experiences that drive growth and build lasting connections.
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
                                    className="w-1 h-2 rounded-full bg-white/40"
                                    animate={{ y: [0, 12, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Services */}
            <section className="py-32">
                {services.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={index} />
                ))}
            </section>

            {/* CTA Section */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0">
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
                        style={{
                            background: "radial-gradient(circle, #a8ffc4 0%, transparent 70%)",
                            filter: "blur(100px)",
                        }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-sm uppercase tracking-[0.3em] text-white/30 block mb-8">
                            Ready to Start?
                        </span>

                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight">
                            Let&apos;s build<br />
                            <span className="text-[#a8ffc4]">something great</span>
                        </h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
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
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </motion.svg>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
