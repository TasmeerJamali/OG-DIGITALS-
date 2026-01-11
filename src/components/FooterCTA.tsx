"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function FooterCTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    // 1. Magnetic Button Logic
    const buttonRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for the magnetic effect
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Limit the pull distance
        x.set(distanceX * 0.3);
        y.set(distanceY * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // 2. Parallax / Scroll Animations
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    return (
        <section
            ref={containerRef}
            className="relative w-full py-40 px-6 overflow-hidden flex flex-col items-center justify-center bg-transparent"
        >
            {/* Background Gradient Mesh (Subtle) */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto text-center">

                {/* 3. Kinetic Typography Header */}
                <motion.div
                    style={{ y: yText, opacity: opacityText }}
                    className="mb-20"
                >
                    <h2 className="text-[12vw] md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter uppercase mix-blend-difference">
                        <span className="block overflow-hidden">
                            <motion.span
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="block"
                            >
                                Let's Build
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden text-[#a8ffc4]">
                            <motion.span
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="block"
                            >
                                The Future
                            </motion.span>
                        </span>
                    </h2>
                </motion.div>

                {/* 4. Giant Magnetic Interaction Button */}
                <Link href="/#contact" className="inline-block relative group">
                    <motion.div
                        ref={buttonRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ x: springX, y: springY }}
                        className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-[#111] border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden transition-colors duration-500 group-hover:bg-[#a8ffc4]"
                    >
                        {/* Default Content: Arrow */}
                        <div className="relative z-10 transition-all duration-500 group-hover:opacity-0 group-hover:scale-50">
                            <ArrowUpRight className="w-24 h-24 text-white/50" strokeWidth={1} />
                            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-sm uppercase tracking-[0.3em] text-white/30 whitespace-nowrap">
                                Start Project
                            </span>
                        </div>

                        {/* Hover Content: Revealing Marquee/Text */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-150 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                            <span className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter mix-blend-multiply">
                                Let's Talk <br /> Now
                            </span>
                        </div>

                        {/* Magnetic Glow Effect */}
                        <motion.div
                            className="absolute -inset-20 bg-gradient-to-br from-white/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                                x: useTransform(springX, (val) => val * -0.5),
                                y: useTransform(springY, (val) => val * -0.5),
                            }}
                        />
                    </motion.div>

                    {/* Floating Label */}
                    <motion.div
                        style={{ x: springX, y: springY }}
                        className="absolute top-0 right-0 -mt-4 -mr-4 md:mr-0 pointer-events-none"
                    >
                        <div className="bg-[#a8ffc4] text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest animate-bounce">
                            Click Me
                        </div>
                    </motion.div>
                </Link>

                {/* 5. Minimal Footer Info */}
                <div className="mt-32 flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8 text-white/30 uppercase text-xs tracking-widest">
                    <div className="flex flex-col gap-2 text-left">
                        <span>Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</span>
                        <span>Karachi, Pakistan</span>
                    </div>
                    <div className="flex gap-8 mt-8 md:mt-0">
                        <a href="#" className="hover:text-[#a8ffc4] transition-colors">Instagram</a>
                        <a href="#" className="hover:text-[#a8ffc4] transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-[#a8ffc4] transition-colors">Twitter</a>
                    </div>
                </div>

            </div>
        </section>
    );
}
