"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center"
        >
            {/* Background Video with Parallax */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ scale: videoScale, opacity: videoOpacity }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/assets/video.mp4" type="video/mp4" />
                </video>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50" />
                {/* Vignette */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.8) 100%)",
                    }}
                />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                {/* Small Label */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 text-white/60"
                    style={{ letterSpacing: "0.3em" }}
                >
                    Digital Agency
                </motion.p>

                {/* Main Heading - Like Fundamental's "Creative Agency" */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.4, ease: [0.25, 1, 0.5, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tight"
                >
                    <span className="block text-white">We Build</span>
                    <span
                        className="block"
                        style={{
                            background: "linear-gradient(135deg, #a8ffc4 0%, #7affb8 50%, #5fffad 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Legacies
                    </span>
                </motion.h1>

                {/* Description - Refined Typography */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                    className="mt-10 md:mt-12 text-base md:text-lg lg:text-xl max-w-2xl mx-auto"
                    style={{
                        color: "rgba(255,255,255,0.8)",
                        lineHeight: 1.7,
                        letterSpacing: "0.01em",
                    }}
                >
                    <span style={{ color: "rgba(168,255,196,0.9)", fontWeight: 500 }}>The OG Digitals</span> crafts exceptional digital experiences that transform brands
                    and captivate audiences. We&apos;re the strategic partner that brings your vision to life.
                </motion.p>

                {/* CTA Button - Large & Bold with Rotating Border */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    style={{ marginTop: "40px" }}
                >
                    <Link
                        href="#contact"
                        className="group relative inline-flex items-center justify-center rounded-full"
                        style={{
                            padding: "14px 28px",
                            background: "linear-gradient(135deg, rgba(30,35,40,0.95) 0%, rgba(20,25,30,0.98) 100%)",
                            border: "1.5px solid rgba(168,255,196,0.4)",
                            boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
                        }}
                    >
                        {/* Glossy shine */}
                        <span
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{
                                background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
                            }}
                        />

                        {/* Glow effect on hover */}
                        <span
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                boxShadow: "0 0 40px rgba(168,255,196,0.35), 0 0 80px rgba(168,255,196,0.15)",
                            }}
                        />

                        {/* Button content */}
                        <span
                            className="relative z-10 flex items-center gap-5 text-base md:text-lg font-medium text-white"
                        >
                            Start a project
                            <span
                                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group-hover:translate-x-1"
                                style={{
                                    background: "linear-gradient(135deg, #a8ffc4 0%, #7affb8 100%)",
                                }}
                            >
                                <svg
                                    className="w-5 h-5 text-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7 17L17 7M17 7H7M17 7V17"
                                    />
                                </svg>
                            </span>
                        </span>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
                >
                    <div className="w-1 h-2 bg-white/50 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
