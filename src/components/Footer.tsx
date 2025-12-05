"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

// Magnetic text component - text follows cursor
function MagneticText({ children }: { children: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Magnetic pull effect
        x.set((e.clientX - centerX) * 0.3);
        y.set((e.clientY - centerY) * 0.3);
    }, [x, y]);

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="relative cursor-pointer"
        >
            {/* Glitch layers */}
            <motion.span
                className="absolute inset-0 text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-bold"
                style={{
                    color: "#ff0040",
                    clipPath: isHovered ? "inset(10% 0 60% 0)" : "inset(0 0 100% 0)",
                    transform: isHovered ? "translateX(-4px)" : "translateX(0)",
                    transition: "all 0.1s ease",
                }}
                aria-hidden
            >
                {children}
            </motion.span>
            <motion.span
                className="absolute inset-0 text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-bold"
                style={{
                    color: "#00ffff",
                    clipPath: isHovered ? "inset(40% 0 20% 0)" : "inset(0 0 100% 0)",
                    transform: isHovered ? "translateX(4px)" : "translateX(0)",
                    transition: "all 0.1s ease",
                }}
                aria-hidden
            >
                {children}
            </motion.span>

            {/* Main text */}
            <motion.span
                className="relative text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-bold bg-clip-text text-transparent"
                style={{
                    backgroundImage: isHovered
                        ? "linear-gradient(135deg, #a8ffc4 0%, #ffffff 50%, #a8ffc4 100%)"
                        : "linear-gradient(135deg, #ffffff 0%, #ffffff 100%)",
                    backgroundSize: "200% 200%",
                    transition: "background-image 0.5s ease",
                }}
                animate={isHovered ? {
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            >
                {children}
            </motion.span>
        </motion.div>
    );
}

// Floating particles component
function AuroraParticles() {
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        background: "radial-gradient(circle, rgba(168,255,196,0.8) 0%, transparent 70%)",
                        boxShadow: "0 0 10px rgba(168,255,196,0.5)",
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 50 - 25, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

// 3D Tilt wrapper
function Tilt3D({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

    const springConfig = { damping: 20, stiffness: 100 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const xPos = (e.clientX - rect.left) / rect.width - 0.5;
        const yPos = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPos);
        y.set(yPos);
    }, [x, y]);

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
        >
            {children}
        </motion.div>
    );
}

// Morphing blob background
function MorphingBlob() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(168,255,196,0.3) 0%, transparent 60%)",
                    filter: "blur(80px)",
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute top-1/4 right-1/4 w-[400px] h-[400px] opacity-10"
                style={{
                    background: "radial-gradient(circle, rgba(168,255,196,0.5) 0%, transparent 60%)",
                    filter: "blur(60px)",
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}

export default function Footer() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLElement>(null);

    // Track mouse for spotlight effect
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    return (
        <footer
            id="contact"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative bg-black overflow-hidden"
        >
            {/* Aurora/Northern lights effect */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `
                        radial-gradient(ellipse at 20% 20%, rgba(168,255,196,0.15) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 80%, rgba(0,255,200,0.1) 0%, transparent 50%),
                        radial-gradient(ellipse at 50% 50%, rgba(168,255,196,0.05) 0%, transparent 70%)
                    `,
                }}
            />

            {/* Morphing blob */}
            <MorphingBlob />

            {/* Floating particles */}
            <AuroraParticles />

            {/* Mouse spotlight */}
            <div
                className="absolute pointer-events-none transition-opacity duration-300"
                style={{
                    left: mousePos.x - 200,
                    top: mousePos.y - 200,
                    width: 400,
                    height: 400,
                    background: "radial-gradient(circle, rgba(168,255,196,0.08) 0%, transparent 60%)",
                    filter: "blur(40px)",
                }}
            />

            {/* Main CTA Section */}
            <div className="relative z-10 py-32 md:py-48 px-8 md:px-16">
                <div className="max-w-7xl mx-auto text-center">
                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <span
                            className="inline-flex items-center gap-3 text-xs md:text-sm uppercase tracking-[0.4em]"
                            style={{ color: "rgba(168,255,196,0.6)" }}
                        >
                            <motion.span
                                className="w-8 h-[1px]"
                                style={{ background: "linear-gradient(90deg, transparent, #a8ffc4)" }}
                                animate={{ scaleX: [0, 1] }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                            Let&apos;s see if we are a good fit
                            <motion.span
                                className="w-8 h-[1px]"
                                style={{ background: "linear-gradient(90deg, #a8ffc4, transparent)" }}
                                animate={{ scaleX: [0, 1] }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </span>
                    </motion.div>

                    {/* Main magnetic text */}
                    <Tilt3D>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="flex justify-center"
                        >
                            <Link href="mailto:hello@theogdigitals.com">
                                <MagneticText>Let&apos;s collaborate</MagneticText>
                            </Link>
                        </motion.div>
                    </Tilt3D>

                    {/* Animated underline */}
                    <motion.div
                        className="flex justify-center mt-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="h-[2px] rounded-full"
                            style={{ background: "linear-gradient(90deg, transparent, #a8ffc4, transparent)" }}
                            initial={{ width: 0 }}
                            whileInView={{ width: 200 }}
                            transition={{ duration: 1.5, delay: 1 }}
                            viewport={{ once: true }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Infinite Marquee with hover pause */}
            <div className="relative border-y border-white/5 py-8 overflow-hidden group">
                {/* Gradient fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    whileHover={{ animationPlayState: "paused" }}
                    style={{ willChange: "transform" }}
                >
                    {Array(20).fill(0).map((_, i) => (
                        <span
                            key={i}
                            className="text-2xl md:text-4xl font-light mx-8 transition-all duration-300 hover:text-[#a8ffc4]"
                            style={{ color: "rgba(255,255,255,0.15)" }}
                        >
                            Let&apos;s collaborate
                            <span className="mx-8" style={{ color: "#a8ffc4" }}>✦</span>
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Footer Bottom */}
            <div className="relative z-10 py-16 px-8 md:px-16">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center gap-3 group cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="w-3 h-3 rounded-full"
                            style={{
                                background: "#a8ffc4",
                                boxShadow: "0 0 20px rgba(168,255,196,0.6)",
                            }}
                            animate={{
                                boxShadow: [
                                    "0 0 20px rgba(168,255,196,0.6)",
                                    "0 0 40px rgba(168,255,196,0.8)",
                                    "0 0 20px rgba(168,255,196,0.6)",
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm font-semibold tracking-[0.2em] text-white uppercase">
                            OG Digitals
                        </span>
                    </motion.div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-10">
                        {["Work", "Services", "Culture", "Contact"].map((link, i) => (
                            <motion.div
                                key={link}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    href={`#${link.toLowerCase()}`}
                                    className="relative text-sm uppercase tracking-[0.15em] transition-colors duration-300 group"
                                    style={{ color: "rgba(255,255,255,0.4)" }}
                                >
                                    <span className="relative z-10 group-hover:text-white transition-colors">
                                        {link}
                                    </span>
                                    <motion.span
                                        className="absolute -bottom-1 left-0 h-[1px] bg-[#a8ffc4]"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: "100%" }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Email with copy effect */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="group"
                    >
                        <Link
                            href="mailto:hello@theogdigitals.com"
                            className="text-sm transition-colors duration-300 flex items-center gap-2"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                            <span className="group-hover:text-[#a8ffc4]">hello@theogdigitals.com</span>
                            <motion.svg
                                className="w-4 h-4 opacity-0 group-hover:opacity-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#a8ffc4"
                                strokeWidth={2}
                                initial={{ x: -5 }}
                                whileHover={{ x: 0 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                            </motion.svg>
                        </Link>
                    </motion.div>
                </div>

                {/* Copyright with pulse */}
                <motion.div
                    className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                        © {new Date().getFullYear()} The OG Digitals. Crafted with{" "}
                        <motion.span
                            className="inline-block"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            style={{ color: "#a8ffc4" }}
                        >
                            ♥
                        </motion.span>
                        {" "}in the digital realm.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
