"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Link from "next/link";

// Services data
const services = [
    {
        id: 1,
        number: "01",
        title: "Web Development",
        subtitle: "Digital Experiences",
        description: "We craft immersive digital experiences that captivate users and drive conversions. From lightning-fast React apps to robust e-commerce platforms.",
        features: ["Custom Web Apps", "E-Commerce", "CMS Development", "API Integration"],
        color: "#4ADE80",
        bgGradient: "radial-gradient(ellipse at 50% 50%, rgba(74,222,128,0.15) 0%, transparent 70%)",
    },
    {
        id: 2,
        number: "02",
        title: "Brand Identity",
        subtitle: "Visual Storytelling",
        description: "We create memorable brand identities that resonate with your audience. Logo design, visual systems, and complete brand guidelines.",
        features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Packaging"],
        color: "#F59E0B",
        bgGradient: "radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.15) 0%, transparent 70%)",
    },
    {
        id: 3,
        number: "03",
        title: "UI/UX Design",
        subtitle: "Human-Centered",
        description: "We design intuitive interfaces that users love. Research-driven design that balances aesthetics with functionality.",
        features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
        color: "#3B82F6",
        bgGradient: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 70%)",
    },
    {
        id: 4,
        number: "04",
        title: "SEO & Marketing",
        subtitle: "Growth Engine",
        description: "We optimize your digital presence for maximum visibility. Data-driven strategies that deliver measurable results.",
        features: ["Technical SEO", "Content Strategy", "Analytics", "Performance"],
        color: "#8B5CF6",
        bgGradient: "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)",
    },
];

// Parallax section wrapper for each service
function ServiceSection({
    service,
    index,
    scrollYProgress
}: {
    service: typeof services[0];
    index: number;
    scrollYProgress: MotionValue<number>;
}) {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Calculate section-specific progress
    const sectionStart = index / services.length;
    const sectionEnd = (index + 1) / services.length;

    // Zoom and opacity transforms
    const scale = useTransform(
        scrollYProgress,
        [sectionStart - 0.1, sectionStart, sectionEnd - 0.1, sectionEnd],
        [0.8, 1, 1, 0.8]
    );

    const opacity = useTransform(
        scrollYProgress,
        [sectionStart - 0.1, sectionStart, sectionEnd - 0.1, sectionEnd],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [sectionStart - 0.1, sectionStart, sectionEnd - 0.05, sectionEnd],
        [100, 0, 0, -100]
    );

    // Spring for smooth animations
    const springScale = useSpring(scale, { damping: 30, stiffness: 100 });
    const springY = useSpring(y, { damping: 30, stiffness: 100 });

    return (
        <motion.section
            ref={sectionRef}
            className="h-screen w-full sticky top-0 flex items-center justify-center overflow-hidden"
            style={{
                scale: springScale,
                y: springY,
                opacity,
            }}
        >
            {/* Background gradient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: service.bgGradient }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: Math.random() * 6 + 2,
                            height: Math.random() * 6 + 2,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            background: service.color,
                            opacity: 0.2,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Text content */}
                    <div>
                        {/* Number */}
                        <motion.div
                            className="text-[150px] md:text-[200px] font-bold leading-none select-none mb-[-40px] md:mb-[-60px]"
                            style={{
                                color: "transparent",
                                WebkitTextStroke: `1px ${service.color}40`,
                            }}
                        >
                            {service.number}
                        </motion.div>

                        {/* Subtitle */}
                        <motion.span
                            className="text-xs uppercase tracking-[0.3em] font-medium mb-4 block"
                            style={{ color: service.color }}
                        >
                            {service.subtitle}
                        </motion.span>

                        {/* Title */}
                        <motion.h2
                            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
                        >
                            {service.title}
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            className="text-lg text-white/60 mb-8 max-w-lg"
                        >
                            {service.description}
                        </motion.p>

                        {/* CTA */}
                        <motion.div>
                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 group"
                                style={{
                                    background: `linear-gradient(135deg, ${service.color}20 0%, transparent 100%)`,
                                    border: `1px solid ${service.color}40`,
                                    color: service.color,
                                }}
                            >
                                Get Started
                                <svg
                                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right - Features grid */}
                    <div className="hidden lg:block">
                        <div className="grid grid-cols-2 gap-4">
                            {service.features.map((feature, i) => (
                                <motion.div
                                    key={feature}
                                    className="relative p-6 rounded-2xl overflow-hidden group cursor-pointer"
                                    style={{
                                        background: "rgba(255,255,255,0.02)",
                                        border: "1px solid rgba(255,255,255,0.05)",
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{
                                        borderColor: `${service.color}40`,
                                        background: `${service.color}08`,
                                    }}
                                >
                                    {/* Glow on hover */}
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(circle at center, ${service.color}10 0%, transparent 70%)`,
                                        }}
                                    />

                                    {/* Number */}
                                    <div
                                        className="text-3xl font-bold mb-2"
                                        style={{ color: `${service.color}40` }}
                                    >
                                        0{i + 1}
                                    </div>

                                    {/* Feature name */}
                                    <div className="text-white font-medium relative z-10">
                                        {feature}
                                    </div>

                                    {/* Arrow */}
                                    <motion.div
                                        className="absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                                        style={{
                                            background: `${service.color}20`,
                                        }}
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke={service.color}
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            {index < services.length - 1 && (
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <span className="text-xs uppercase tracking-widest text-white/30">
                        Scroll
                    </span>
                    <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
                        <motion.div
                            className="w-1 h-2 rounded-full bg-white/40"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            )}
        </motion.section>
    );
}

export default function ServicesPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Progress bar
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <main ref={containerRef} className="relative bg-black">
            {/* Progress bar */}
            <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/5">
                <motion.div
                    className="h-full"
                    style={{
                        width: progressWidth,
                        background: "linear-gradient(90deg, #a8ffc4, #4ADE80)",
                    }}
                />
            </div>

            {/* Hero section */}
            <section className="h-screen flex items-center justify-center relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0">
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
                        style={{
                            background: "radial-gradient(circle, #a8ffc4 0%, transparent 70%)",
                            filter: "blur(100px)",
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, 50, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity }}
                    />
                </div>

                <div className="relative z-10 text-center px-6">
                    {/* Breadcrumb */}
                    <motion.div
                        className="flex items-center justify-center gap-4 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link href="/" className="text-sm text-white/40 hover:text-white transition-colors">
                            Home
                        </Link>
                        <span className="text-white/20">/</span>
                        <span className="text-sm" style={{ color: "#a8ffc4" }}>Services</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tight"
                        initial={{ opacity: 0, y: 40, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        What We
                        <span
                            className="block"
                            style={{
                                background: "linear-gradient(135deg, #a8ffc4 0%, #4ADE80 50%, #a8ffc4 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Create
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-xl text-white/50 max-w-xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        We transform ideas into digital experiences that captivate, engage, and convert.
                    </motion.p>

                    {/* Services count */}
                    <motion.div
                        className="flex justify-center gap-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {services.map((service, i) => (
                            <div key={service.id} className="text-center">
                                <div
                                    className="text-3xl font-bold mb-1"
                                    style={{ color: service.color }}
                                >
                                    {service.number}
                                </div>
                                <div className="text-xs uppercase tracking-widest text-white/40">
                                    {service.title.split(" ")[0]}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Scroll hint */}
                    <motion.div
                        className="absolute bottom-12 left-1/2 -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <motion.div
                            className="flex flex-col items-center gap-3"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="text-xs uppercase tracking-widest text-white/30">
                                Scroll to explore
                            </span>
                            <svg
                                className="w-6 h-6 text-white/30"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Service sections - each takes full viewport */}
            <div className="relative" style={{ height: `${services.length * 100}vh` }}>
                {services.map((service, index) => (
                    <ServiceSection
                        key={service.id}
                        service={service}
                        index={index}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>

            {/* CTA Section */}
            <section className="h-screen flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0">
                    <motion.div
                        className="absolute inset-0 opacity-20"
                        style={{
                            background: "radial-gradient(ellipse at 50% 50%, #a8ffc4 0%, transparent 60%)",
                            filter: "blur(100px)",
                        }}
                    />
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.h2
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        Ready to start?
                    </motion.h2>

                    <motion.p
                        className="text-xl text-white/50 max-w-xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Let&apos;s create something extraordinary together.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/#contact"
                            className="inline-flex items-center gap-4 px-12 py-6 rounded-full font-medium text-xl transition-all duration-500 hover:scale-105"
                            style={{
                                background: "linear-gradient(135deg, #a8ffc4 0%, #4ADE80 100%)",
                                color: "#000",
                                boxShadow: "0 20px 60px rgba(168,255,196,0.3)",
                            }}
                        >
                            Start Your Project
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
