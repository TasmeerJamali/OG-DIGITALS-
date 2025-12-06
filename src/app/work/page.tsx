"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Project data
const projects = [
    {
        id: 1,
        title: "Organimo",
        category: "E-Commerce",
        year: "2024",
        link: "https://organimo.com",
        color: "#4ADE80",
    },
    {
        id: 2,
        title: "Pak Soorty Dates",
        category: "Corporate",
        year: "2024",
        link: "https://paksoortydates.com",
        color: "#F59E0B",
    },
    {
        id: 3,
        title: "Universal Book Store",
        category: "E-Commerce",
        year: "2024",
        link: "https://universalbookstore.pk",
        color: "#3B82F6",
    },
    {
        id: 4,
        title: "DHA City Karachi",
        category: "Real Estate",
        year: "2024",
        link: "https://indushills.dhacitykarachi.org.pk",
        color: "#8B5CF6",
    },
];

// Custom cursor that follows mouse
function CustomCursor({ isHovering, color }: { isHovering: boolean; color: string }) {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference hidden lg:flex items-center justify-center"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%",
                translateY: "-50%",
            }}
        >
            <motion.div
                className="rounded-full flex items-center justify-center"
                animate={{
                    width: isHovering ? 120 : 20,
                    height: isHovering ? 120 : 20,
                    backgroundColor: isHovering ? color : "#ffffff",
                }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            >
                <motion.span
                    className="text-black text-sm font-medium uppercase tracking-wider"
                    animate={{ opacity: isHovering ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    View
                </motion.span>
            </motion.div>
        </motion.div>
    );
}

// Project item with dramatic hover
function ProjectItem({
    project,
    index,
    isActive,
    onHover,
    onLeave,
}: {
    project: typeof projects[0];
    index: number;
    isActive: boolean;
    onHover: () => void;
    onLeave: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
        >
            <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
                className="group block py-8 md:py-12 border-b border-white/10 transition-colors duration-500"
                style={{
                    borderColor: isActive ? `${project.color}40` : "rgba(255,255,255,0.1)",
                }}
            >
                <div className="flex items-center justify-between">
                    {/* Left side - Number and Title */}
                    <div className="flex items-baseline gap-6 md:gap-12">
                        {/* Number */}
                        <motion.span
                            className="text-sm font-medium tabular-nums"
                            animate={{
                                color: isActive ? project.color : "rgba(255,255,255,0.3)",
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {String(index + 1).padStart(2, "0")}
                        </motion.span>

                        {/* Title */}
                        <div className="relative overflow-hidden">
                            <motion.h2
                                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight"
                                animate={{
                                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.4)",
                                    x: isActive ? 20 : 0,
                                }}
                                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                            >
                                {project.title}
                            </motion.h2>

                            {/* Underline */}
                            <motion.div
                                className="absolute bottom-0 left-0 h-[3px] rounded-full"
                                style={{ background: project.color }}
                                initial={{ width: 0 }}
                                animate={{ width: isActive ? "100%" : 0 }}
                                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                            />
                        </div>
                    </div>

                    {/* Right side - Category and Year */}
                    <motion.div
                        className="hidden md:flex items-center gap-12"
                        animate={{
                            opacity: isActive ? 1 : 0.3,
                            x: isActive ? 0 : 20,
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="text-sm uppercase tracking-widest text-white/50">
                            {project.category}
                        </span>
                        <span className="text-sm tabular-nums text-white/30">
                            {project.year}
                        </span>

                        {/* Arrow */}
                        <motion.div
                            className="w-12 h-12 rounded-full border flex items-center justify-center"
                            animate={{
                                borderColor: isActive ? project.color : "rgba(255,255,255,0.1)",
                                scale: isActive ? 1 : 0.8,
                                rotate: isActive ? 0 : -45,
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <svg
                                className="w-5 h-5 transition-colors duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke={isActive ? project.color : "rgba(255,255,255,0.3)"}
                                strokeWidth={1.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>
            </Link>
        </motion.div>
    );
}

// Floating image preview that follows cursor
function ImagePreview({
    project,
    isVisible,
    mousePos,
}: {
    project: typeof projects[0] | null;
    isVisible: boolean;
    mousePos: { x: number; y: number };
}) {
    const x = useSpring(mousePos.x, { damping: 20, stiffness: 200 });
    const y = useSpring(mousePos.y, { damping: 20, stiffness: 200 });

    useEffect(() => {
        x.set(mousePos.x);
        y.set(mousePos.y);
    }, [mousePos, x, y]);

    return (
        <AnimatePresence>
            {isVisible && project && (
                <motion.div
                    className="fixed pointer-events-none z-40 hidden lg:block"
                    style={{
                        x: x,
                        y: y,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                    <div
                        className="w-[400px] h-[280px] rounded-2xl overflow-hidden shadow-2xl"
                        style={{
                            background: `linear-gradient(135deg, ${project.color}30 0%, #000 100%)`,
                            border: `1px solid ${project.color}40`,
                            boxShadow: `0 25px 80px ${project.color}30`,
                        }}
                    >
                        {/* Placeholder with animated gradient */}
                        <motion.div
                            className="w-full h-full flex items-center justify-center"
                            animate={{
                                background: [
                                    `linear-gradient(45deg, ${project.color}20 0%, transparent 50%)`,
                                    `linear-gradient(225deg, ${project.color}20 0%, transparent 50%)`,
                                    `linear-gradient(45deg, ${project.color}20 0%, transparent 50%)`,
                                ],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <motion.span
                                className="text-6xl font-bold"
                                style={{ color: project.color }}
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {project.title.charAt(0)}
                            </motion.span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function WorkPage() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    }, []);

    const hoveredProject = hoveredIndex !== null ? projects[hoveredIndex] : null;

    return (
        <main
            ref={containerRef}
            className="relative min-h-screen bg-black cursor-none lg:cursor-none"
            onMouseMove={handleMouseMove}
        >
            {/* Custom cursor */}
            <CustomCursor
                isHovering={hoveredIndex !== null}
                color={hoveredProject?.color || "#a8ffc4"}
            />

            {/* Floating image preview */}
            <ImagePreview
                project={hoveredProject}
                isVisible={hoveredIndex !== null}
                mousePos={mousePos}
            />

            {/* Background gradient */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute top-0 right-0 w-1/2 h-full opacity-20"
                    style={{
                        background: hoveredProject
                            ? `radial-gradient(ellipse at 80% 50%, ${hoveredProject.color}20 0%, transparent 60%)`
                            : "radial-gradient(ellipse at 80% 50%, rgba(168,255,196,0.1) 0%, transparent 60%)",
                        transition: "background 0.5s ease",
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 px-6 md:px-16 lg:px-24">
                {/* Header */}
                <header className="pt-40 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-4 mb-8">
                            <Link href="/" className="text-sm text-white/40 hover:text-white transition-colors">
                                Home
                            </Link>
                            <span className="text-white/20">/</span>
                            <span className="text-sm" style={{ color: "#a8ffc4" }}>Work</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
                            Selected
                            <span
                                className="block mt-2"
                                style={{
                                    background: "linear-gradient(135deg, #a8ffc4 0%, #7affb8 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Projects
                            </span>
                        </h1>
                    </motion.div>
                </header>

                {/* Projects List */}
                <section className="pb-32">
                    <div className="border-t border-white/10">
                        {projects.map((project, index) => (
                            <ProjectItem
                                key={project.id}
                                project={project}
                                index={index}
                                isActive={hoveredIndex === index}
                                onHover={() => setHoveredIndex(index)}
                                onLeave={() => setHoveredIndex(null)}
                            />
                        ))}
                    </div>
                </section>

                {/* Stats */}
                <motion.section
                    className="pb-32"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {[
                            { value: "04", label: "Projects" },
                            { value: "100%", label: "Satisfaction" },
                            { value: "2024", label: "Year" },
                            { value: "∞", label: "Possibilities" },
                        ].map((stat, i) => (
                            <div key={stat.label} className="text-center">
                                <div
                                    className="text-4xl md:text-6xl font-bold mb-2"
                                    style={{ color: "#a8ffc4" }}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-sm uppercase tracking-widest text-white/40">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* CTA */}
                <motion.section
                    className="pb-32 text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                        Want to be next?
                    </h2>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        style={{
                            background: "linear-gradient(135deg, #a8ffc4 0%, #7affb8 100%)",
                            color: "#000",
                            boxShadow: "0 10px 40px rgba(168,255,196,0.3)",
                        }}
                    >
                        Start a Project
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </Link>
                </motion.section>
            </div>
        </main>
    );
}
