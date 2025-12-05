"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const services = [
    {
        id: "01",
        title: "Web Development",
        subtitle: "UX/UI Design · Development",
        description: "Architecting digital organisms that live and breathe in the modern web ecosystem.",
        video: "/assets/videos/web-dev.mp4",
    },
    {
        id: "02",
        title: "SEO Strategy",
        subtitle: "Analytics · Optimization",
        description: "Dominating the neural pathways of search engines with data-driven precision.",
        video: "/assets/videos/seo.mp4",
    },
    {
        id: "03",
        title: "Brand Identity",
        subtitle: "Visual Design · Strategy",
        description: "Forging visual legacies that burn into the collective consciousness.",
        video: "/assets/videos/brand.mp4",
    },
    {
        id: "04",
        title: "UI/UX Design",
        subtitle: "Research · Prototyping",
        description: "Crafting intuitive interfaces for seamless human-digital interaction.",
        video: "/assets/videos/uiux.mp4",
    },
];

// Service Card Component with hover video
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
        </motion.div>
    );
}

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["5%", "-60%"]);

    return (
        <section id="services" ref={containerRef} className="relative h-[350vh] bg-black">
            {/* Section Header */}
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                {/* Title with animated underline */}
                <motion.div
                    className="absolute top-20 left-8 md:left-16 z-10"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                >
                    <motion.span
                        className="text-xs tracking-[0.4em] uppercase font-medium"
                        style={{ color: "rgba(168,255,196,0.7)" }}
                    >
                        What we do
                    </motion.span>
                    <div className="relative mt-4">
                        <h2
                            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                            style={{
                                background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Services
                        </h2>
                        {/* Static decorative line */}
                        <div
                            className="h-1 w-20 mt-4 rounded-full"
                            style={{ background: "linear-gradient(90deg, #a8ffc4, transparent)" }}
                        />
                    </div>
                </motion.div>

                {/* Horizontal Scroll Container */}
                <motion.div
                    style={{ x }}
                    className="flex gap-8 pl-8 md:pl-16 pt-44"
                >
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}

                    {/* Final CTA Card */}
                    <motion.div
                        className="flex-shrink-0 w-[70vw] md:w-[40vw] lg:w-[30vw] h-[50vh] md:h-[55vh] rounded-[2rem] overflow-hidden flex items-center justify-center cursor-pointer group"
                        style={{
                            background: "linear-gradient(135deg, rgba(168,255,196,0.05) 0%, rgba(168,255,196,0.02) 100%)",
                            border: "1px dashed rgba(168,255,196,0.3)",
                        }}
                        whileHover={{
                            background: "linear-gradient(135deg, rgba(168,255,196,0.1) 0%, rgba(168,255,196,0.05) 100%)",
                            borderColor: "rgba(168,255,196,0.5)",
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="text-center px-8">
                            <motion.div
                                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                                style={{
                                    border: "2px solid rgba(168,255,196,0.4)",
                                    background: "rgba(168,255,196,0.05)",
                                }}
                                whileHover={{ scale: 1.1, background: "rgba(168,255,196,0.15)" }}
                            >
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#a8ffc4"
                                    strokeWidth={1.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </motion.div>
                            <h3
                                className="text-2xl md:text-3xl font-bold mb-3"
                                style={{ color: "#a8ffc4" }}
                            >
                                Have a project?
                            </h3>
                            <p className="text-white/50 text-base">
                                Let&apos;s create something extraordinary together.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
