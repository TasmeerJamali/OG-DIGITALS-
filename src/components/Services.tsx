/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
    {
        id: "01",
        title: "Social Media Marketing",
        subtitle: "Community · Growth",
        description: "Strategic content that turns passive followers into loyal brand advocates.",
        video: "/assets/seo.mp4",
        href: "/contact"
    },
    {
        id: "02",
        title: "Performance Marketing",
        subtitle: "Ads · ROI",
        description: "Data-driven campaigns. We dominate neural pathways with precision targeting.",
        video: "/assets/seo.mp4", // Placeholder
        href: "/contact"
    },
    {
        id: "03",
        title: "Web Development",
        subtitle: "Architecture · Scale",
        description: "Lightning-fast, scalable web apps. From complex e-commerce to custom SaaS solutions.",
        video: "/assets/web-dev.mp4",
        href: "/contact"
    },
    {
        id: "04",
        title: "Brand Identity",
        subtitle: "Strategy · Visuals",
        description: "Distinctive identities that capture essence. Every touchpoint considered.",
        video: "/assets/brand-identity.mp4",
        href: "/contact"
    },
    {
        id: "05",
        title: "AI Automation",
        subtitle: "Efficiency · Scale",
        description: "Intelligent agents and custom AI solutions that work autonomously.",
        video: "/assets/web-dev.mp4", // Placeholder
        href: "/contact"
    },
    {
        id: "06",
        title: "E-book Writing",
        subtitle: "Authority · Content",
        description: "Authoritative, long-form content that establishes industry thought leadership.",
        video: "/assets/video.mp4", // Placeholder
        href: "/ebook"
    },
];

// Original Service Card Component (Reverted Design)
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="group relative flex-shrink-0 w-[85vw] md:w-[50vw] lg:w-[40vw] h-[50vh] md:h-[55vh] rounded-[2rem] overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Video Background - plays on hover */}
            <motion.div
                className="absolute inset-0 z-0"
                animate={{
                    scale: isHovered ? 1.05 : 1,
                    opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.6 }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: "brightness(0.4)" }}
                >
                    <source src={service.video} type="video/mp4" />
                </video>
            </motion.div>

            {/* Gradient Background */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: isHovered
                        ? "linear-gradient(135deg, rgba(168,255,196,0.08) 0%, rgba(0,0,0,0.9) 100%)"
                        : "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)"
                }}
                transition={{ duration: 0.5 }}
            />

            {/* Glass layer */}
            <div
                className="absolute inset-0"
                style={{
                    backdropFilter: "blur(1px)",
                    WebkitBackdropFilter: "blur(1px)",
                }}
            />

            {/* Glossy top shine */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 30%)",
                }}
            />

            {/* Border with glow animation */}
            <motion.div
                className="absolute inset-0 rounded-[2rem] pointer-events-none"
                style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                }}
                animate={{
                    borderColor: isHovered ? "rgba(168,255,196,0.4)" : "rgba(255,255,255,0.08)",
                    boxShadow: isHovered
                        ? "0 0 60px rgba(168,255,196,0.15), inset 0 0 40px rgba(168,255,196,0.03)"
                        : "none"
                }}
                transition={{ duration: 0.5 }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
                {/* Top - Number */}
                <div className="flex justify-between items-start">
                    <motion.span
                        className="text-[8rem] md:text-[10rem] font-bold leading-none select-none"
                        style={{ color: "rgba(255,255,255,0.04)" }}
                        animate={{
                            color: isHovered ? "rgba(168,255,196,0.12)" : "rgba(255,255,255,0.04)",
                            y: isHovered ? -10 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        {service.id}
                    </motion.span>

                    {/* Indicator dot */}
                    <motion.div
                        className="w-3 h-3 rounded-full"
                        style={{ background: "rgba(255,255,255,0.15)" }}
                        animate={{
                            background: isHovered ? "#a8ffc4" : "rgba(255,255,255,0.15)",
                            boxShadow: isHovered ? "0 0 20px rgba(168,255,196,0.8)" : "none",
                            scale: isHovered ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Bottom - Text content */}
                <div>
                    {/* Subtitle */}
                    <motion.p
                        className="text-xs tracking-[0.3em] uppercase mb-4 font-medium"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                        animate={{
                            color: isHovered ? "rgba(168,255,196,0.7)" : "rgba(255,255,255,0.35)",
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        {service.subtitle}
                    </motion.p>

                    {/* Title with rolling underline */}
                    <div className="relative overflow-hidden mb-4">
                        <motion.h3
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight"
                            animate={{
                                color: isHovered ? "#a8ffc4" : "#ffffff",
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            {service.title}
                        </motion.h3>
                        {/* Animated underline */}
                        <motion.div
                            className="h-[2px] mt-2 rounded-full"
                            style={{ background: "linear-gradient(90deg, #a8ffc4, #7affb8)" }}
                            initial={{ width: 0 }}
                            animate={{ width: isHovered ? "100%" : 0 }}
                            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                        />
                    </div>

                    {/* Description */}
                    <motion.p
                        className="text-base md:text-lg max-w-md leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                        animate={{
                            color: isHovered ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.5)",
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        {service.description}
                    </motion.p>
                </div>
            </div>

            {/* Arrow button */}
            <Link href={service.href || "/contact"}>
                <motion.div
                    className="absolute bottom-8 right-8 md:bottom-10 md:right-10 w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.03)",
                    }}
                    animate={{
                        borderColor: isHovered ? "rgba(168,255,196,0.5)" : "rgba(255,255,255,0.1)",
                        background: isHovered ? "rgba(168,255,196,0.1)" : "rgba(255,255,255,0.03)",
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? 45 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={isHovered ? "#a8ffc4" : "white"}
                        strokeWidth={1.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </motion.div>
            </Link>
        </motion.div>
    );
}

export default function Services() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    // Auto-scroll logic (The "Belt" Effect)
    useEffect(() => {
        let animationFrameId: number;

        const scroll = () => {
            if (scrollContainerRef.current && isAutoScrolling) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

                // Slow consistent speed
                if (scrollLeft + clientWidth >= scrollWidth - 1) {
                    // Reset to start seamlessly (requires duplicated content for true seamless, but minimal jump is okay for now)
                    scrollContainerRef.current.scrollLeft = 0;
                } else {
                    scrollContainerRef.current.scrollLeft += 1; // Speed of the belt
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        if (isAutoScrolling) {
            animationFrameId = requestAnimationFrame(scroll);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [isAutoScrolling]);

    // Manual Navigation
    const scroll = (direction: 'left' | 'right') => {
        setIsAutoScrolling(false); // Pause auto-scroll on interaction
        if (scrollContainerRef.current) {
            const scrollAmount = 600; // Card width approx
            const targetScroll = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });

            // Resume auto-scroll after delay
            setTimeout(() => setIsAutoScrolling(true), 3000);
        }
    };

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Header */}
            <div className="container mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-10">
                <div>
                    <span className="inline-block px-4 py-2 mb-6 text-sm font-mono text-[#a8ffc4] bg-[#a8ffc4]/10 rounded-full border border-[#a8ffc4]/20">
                        WHAT WE DO
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
                        Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8ffc4] to-emerald-600">Evolution</span>
                    </h2>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={() => scroll('left')}
                        className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#a8ffc4] hover:text-black hover:border-[#a8ffc4] transition-all duration-300"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#a8ffc4] hover:text-black hover:border-[#a8ffc4] transition-all duration-300"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Slider Belt */}
            <div
                ref={scrollContainerRef}
                className="flex gap-8 overflow-x-auto pb-12 pl-6 md:pl-20 no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseEnter={() => setIsAutoScrolling(false)}
                onMouseLeave={() => setIsAutoScrolling(true)}
            >
                {services.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={index} />
                ))}
                {/* Duplicate for length/feeling of belt */}
                {services.map((service, index) => (
                    <ServiceCard key={`${service.id}-duplicate`} service={service} index={index + services.length} />
                ))}
            </div>
        </section>
    );
}
