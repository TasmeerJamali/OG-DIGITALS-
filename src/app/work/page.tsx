"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Project data
const projects = [
    {
        id: 1,
        title: "Organimo",
        client: "Organimo",
        year: "2024",
        category: "Website",
        description: "A fresh organic food delivery platform with modern e-commerce experience.",
        link: "https://organimo.com",
        image: "/assets/projects/organimo.jpg",
        color: "#4ADE80",
    },
    {
        id: 2,
        title: "Pak Soorty Dates",
        client: "Pak Soorty Dates",
        year: "2024",
        category: "Website",
        description: "Premium dates export company showcasing quality and heritage.",
        link: "https://paksoortydates.com",
        image: "/assets/projects/paksoorty.jpg",
        color: "#F59E0B",
    },
    {
        id: 3,
        title: "Universal Book Store",
        client: "Universal Book Store",
        year: "2024",
        category: "Website",
        description: "Pakistan's leading online bookstore with thousands of titles.",
        link: "https://universalbookstore.pk",
        image: "/assets/projects/bookstore.jpg",
        color: "#3B82F6",
    },
    {
        id: 4,
        title: "DHA City Karachi",
        client: "DHA City Karachi",
        year: "2024",
        category: "Website",
        description: "Indus Hills - Premium real estate development in DHA City.",
        link: "https://indushills.dhacitykarachi.org.pk",
        image: "/assets/projects/dha.jpg",
        color: "#8B5CF6",
    },
];

// Magnetic cursor effect for project cards
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        });
    }, []);

    return (
        <motion.div
            ref={cardRef}
            className="group relative"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={project.link} target="_blank" rel="noopener noreferrer">
                <motion.div
                    className="relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer"
                    style={{
                        transformStyle: "preserve-3d",
                        perspective: 1000,
                    }}
                    animate={{
                        rotateY: isHovered ? (mousePos.x - 0.5) * 10 : 0,
                        rotateX: isHovered ? (mousePos.y - 0.5) * -10 : 0,
                        scale: isHovered ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Background gradient placeholder */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}05 100%)`,
                        }}
                    />

                    {/* Project image placeholder with gradient */}
                    <div
                        className="absolute inset-0 opacity-60"
                        style={{
                            background: `linear-gradient(135deg, ${project.color}40 0%, #000 100%)`,
                        }}
                    />

                    {/* Spotlight effect following cursor */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
                        }}
                    />

                    {/* Border glow */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                        animate={{
                            borderColor: isHovered ? `${project.color}60` : "rgba(255,255,255,0.1)",
                            boxShadow: isHovered ? `0 0 60px ${project.color}20, inset 0 0 60px ${project.color}05` : "none",
                        }}
                        transition={{ duration: 0.4 }}
                    />

                    {/* Project number */}
                    <motion.div
                        className="absolute top-6 left-6 text-[120px] md:text-[180px] font-bold leading-none select-none pointer-events-none"
                        style={{ color: "rgba(255,255,255,0.03)" }}
                        animate={{
                            color: isHovered ? `${project.color}15` : "rgba(255,255,255,0.03)",
                            y: isHovered ? -10 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </motion.div>

                    {/* Content */}
                    <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                        {/* Meta info */}
                        <motion.div
                            className="flex items-center gap-4 mb-4"
                            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.7 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span
                                className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
                                style={{
                                    background: `${project.color}20`,
                                    color: project.color,
                                    border: `1px solid ${project.color}40`,
                                }}
                            >
                                {project.category}
                            </span>
                            <span className="text-white/40 text-sm">{project.year}</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h3
                            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3"
                            animate={{
                                color: isHovered ? project.color : "#ffffff",
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {project.title}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                            className="text-sm md:text-base max-w-lg"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                            animate={{
                                y: isHovered ? 0 : 10,
                                opacity: isHovered ? 1 : 0,
                            }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            {project.description}
                        </motion.p>

                        {/* Client info */}
                        <motion.div
                            className="mt-4 flex items-center gap-2"
                            animate={{
                                y: isHovered ? 0 : 10,
                                opacity: isHovered ? 1 : 0,
                            }}
                            transition={{ duration: 0.3, delay: 0.15 }}
                        >
                            <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
                                Client:
                            </span>
                            <span className="text-sm text-white/70">{project.client}</span>
                        </motion.div>
                    </div>

                    {/* Arrow button */}
                    <motion.div
                        className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 rounded-full flex items-center justify-center"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                        animate={{
                            background: isHovered ? `${project.color}20` : "rgba(255,255,255,0.05)",
                            borderColor: isHovered ? `${project.color}50` : "rgba(255,255,255,0.1)",
                            scale: isHovered ? 1.1 : 1,
                            rotate: isHovered ? 45 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke={isHovered ? project.color : "white"}
                            strokeWidth={1.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </motion.div>
                </motion.div>
            </Link>
        </motion.div>
    );
}

// Featured project (larger card)
function FeaturedProject({ project }: { project: typeof projects[0] }) {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        });
    }, []);

    return (
        <motion.div
            ref={cardRef}
            className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden cursor-pointer mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                {/* Background */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(135deg, ${project.color}30 0%, #000 60%)`,
                    }}
                />

                {/* Animated gradient orb */}
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full opacity-30"
                    style={{
                        background: `radial-gradient(circle, ${project.color}50 0%, transparent 60%)`,
                        filter: "blur(80px)",
                    }}
                    animate={{
                        x: mousePos.x * 200 - 100,
                        y: mousePos.y * 200 - 100,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />

                {/* Border */}
                <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                    animate={{
                        borderColor: isHovered ? `${project.color}50` : "rgba(255,255,255,0.1)",
                    }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 lg:p-16">
                    {/* Top */}
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <span
                                className="px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider"
                                style={{
                                    background: `${project.color}20`,
                                    color: project.color,
                                    border: `1px solid ${project.color}40`,
                                }}
                            >
                                Featured Project
                            </span>
                            <span className="text-white/40 text-sm">{project.year}</span>
                        </div>
                        <motion.div
                            className="w-16 h-16 rounded-full flex items-center justify-center"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                            }}
                            animate={{
                                background: isHovered ? `${project.color}20` : "rgba(255,255,255,0.05)",
                                rotate: isHovered ? 45 : 0,
                            }}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke={isHovered ? project.color : "white"}
                                strokeWidth={1.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Bottom */}
                    <div>
                        <motion.h2
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
                            animate={{ color: isHovered ? project.color : "#ffffff" }}
                        >
                            {project.title}
                        </motion.h2>
                        <p className="text-base md:text-lg text-white/50 max-w-xl">
                            {project.description}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function WorkPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const springY = useSpring(backgroundY, { stiffness: 100, damping: 30 });

    return (
        <main ref={containerRef} className="relative min-h-screen bg-black">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-0 right-0 w-[800px] h-[800px] opacity-20"
                    style={{
                        y: springY,
                        background: "radial-gradient(circle, rgba(168,255,196,0.1) 0%, transparent 60%)",
                        filter: "blur(100px)",
                    }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-15"
                    style={{
                        y: springY,
                        background: "radial-gradient(circle, rgba(168,255,196,0.15) 0%, transparent 60%)",
                        filter: "blur(80px)",
                    }}
                />
            </div>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 md:px-16">
                <div className="max-w-7xl mx-auto">
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
                        <span className="text-sm" style={{ color: "#a8ffc4" }}>Work</span>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span
                            className="text-xs tracking-[0.4em] uppercase font-medium"
                            style={{ color: "rgba(168,255,196,0.7)" }}
                        >
                            Our Portfolio
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mt-4 tracking-tight">
                            Selected
                            <span
                                className="block"
                                style={{
                                    background: "linear-gradient(135deg, #a8ffc4 0%, #7affb8 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Works
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        className="mt-8 text-lg md:text-xl max-w-2xl"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        A curated collection of our finest digital experiences. Each project represents
                        our commitment to excellence and innovation.
                    </motion.p>
                </div>
            </section>

            {/* Featured Project */}
            <section className="px-6 md:px-16 pb-8">
                <div className="max-w-7xl mx-auto">
                    <FeaturedProject project={projects[0]} />
                </div>
            </section>

            {/* Projects Grid */}
            <section className="px-6 md:px-16 pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {projects.slice(1).map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 md:px-16 pb-32">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
                        style={{
                            background: "linear-gradient(135deg, rgba(168,255,196,0.05) 0%, rgba(168,255,196,0.02) 100%)",
                            border: "1px solid rgba(168,255,196,0.1)",
                        }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Have a project in mind?
                        </h2>
                        <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
                            Let&apos;s collaborate and create something extraordinary together.
                        </p>
                        <Link
                            href="/#contact"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105"
                            style={{
                                background: "linear-gradient(135deg, #a8ffc4 0%, #7affb8 100%)",
                                color: "#000",
                            }}
                        >
                            Start a Project
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
