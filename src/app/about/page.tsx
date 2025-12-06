"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Link from "next/link";

// Team members
const team = [
    {
        name: "Tasmeer Jamali",
        role: "Founder & Creative Director",
        image: "/team/tasmeer.jpg",
        color: "#a8ffc4",
    },
    {
        name: "Creative Lead",
        role: "Head of Design",
        image: "/team/lead.jpg",
        color: "#60a5fa",
    },
    {
        name: "Tech Lead",
        role: "Lead Developer",
        image: "/team/tech.jpg",
        color: "#c084fc",
    },
    {
        name: "Strategy Lead",
        role: "Marketing Director",
        image: "/team/strategy.jpg",
        color: "#fbbf24",
    },
];

// Values
const values = [
    {
        number: "01",
        title: "Innovation",
        description: "We push boundaries and embrace new technologies to create experiences that haven't been seen before.",
    },
    {
        number: "02",
        title: "Excellence",
        description: "Every pixel matters. We obsess over details to deliver work that exceeds expectations.",
    },
    {
        number: "03",
        title: "Collaboration",
        description: "Great work comes from great partnerships. We work alongside our clients, not just for them.",
    },
    {
        number: "04",
        title: "Impact",
        description: "We measure success by the results we create. Beautiful design that doesn't convert is incomplete.",
    },
];

// Stats
const stats = [
    { number: 50, suffix: "+", label: "Projects Delivered" },
    { number: 25, suffix: "+", label: "Happy Clients" },
    { number: 3, suffix: "+", label: "Years Experience" },
    { number: 100, suffix: "%", label: "Client Satisfaction" },
];

// Animated counter
function Counter({ target, suffix }: { target: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    setCount(target);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(timer);
        }
    }, [isInView, target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

// 3D Tilt Card for team
function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const isInView = useInView(cardRef, { once: true });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        setRotateX(-mouseY / 10);
        setRotateY(mouseX / 10);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className="relative group"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
            }}
        >
            <motion.div
                className="relative h-[400px] rounded-2xl overflow-hidden"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {/* Background placeholder */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(135deg, ${member.color}20 0%, ${member.color}05 100%)`,
                    }}
                />

                {/* Glowing border on hover */}
                <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        boxShadow: `inset 0 0 30px ${member.color}30, 0 0 50px ${member.color}20`,
                    }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6" style={{ transform: "translateZ(50px)" }}>
                    {/* Role badge */}
                    <motion.span
                        className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-3 w-fit"
                        style={{
                            background: `${member.color}20`,
                            color: member.color,
                            border: `1px solid ${member.color}50`,
                        }}
                    >
                        {member.role}
                    </motion.span>

                    {/* Name */}
                    <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>

                    {/* Hover reveal line */}
                    <motion.div
                        className="h-[2px] origin-left"
                        style={{ background: member.color }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </div>

                {/* Floating particles */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            background: member.color,
                            left: `${20 + i * 15}%`,
                            bottom: `${20 + i * 10}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}

// Split text animation
function SplitText({ children, className = "" }: { children: string; className?: string }) {
    const words = children.split(" ");
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%" }}
                        animate={isInView ? { y: 0 } : {}}
                        transition={{
                            duration: 0.8,
                            delay: i * 0.05,
                            ease: [0.25, 1, 0.5, 1],
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </div>
    );
}

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const heroY = useTransform(heroProgress, [0, 1], [0, 300]);
    const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // Smooth spring
    const smoothProgress = useSpring(scrollYProgress, { damping: 50, stiffness: 100 });

    return (
        <main ref={containerRef} className="relative bg-black">
            {/* Progress bar */}
            <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/5">
                <motion.div
                    className="h-full bg-gradient-to-r from-[#a8ffc4] via-[#60a5fa] to-[#c084fc]"
                    style={{ width: progressWidth }}
                />
            </div>

            {/* ===== HERO SECTION ===== */}
            <section
                ref={heroRef}
                className="min-h-screen flex items-center justify-center relative overflow-hidden"
            >
                {/* Animated mesh gradient background */}
                <div className="absolute inset-0">
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(168,255,196,0.15) 0%, transparent 70%)",
                            filter: "blur(100px)",
                        }}
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 70%)",
                            filter: "blur(100px)",
                        }}
                        animate={{
                            x: [0, -80, 0],
                            y: [0, 60, 0],
                        }}
                        transition={{ duration: 15, repeat: Infinity }}
                    />
                </div>

                {/* Large OG watermark */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ y: heroY, opacity: heroOpacity }}
                >
                    <div
                        className="text-[25vw] font-bold leading-none select-none"
                        style={{
                            color: "transparent",
                            WebkitTextStroke: "1px rgba(168,255,196,0.08)",
                        }}
                    >
                        OG
                    </div>
                </motion.div>

                {/* Hero content */}
                <motion.div
                    className="relative z-10 max-w-6xl mx-auto px-6 text-center"
                    style={{ y: heroY, opacity: heroOpacity }}
                >
                    {/* Breadcrumb */}
                    <motion.div
                        className="flex items-center justify-center gap-4 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link href="/" className="text-sm text-white/40 hover:text-white transition-colors">
                            Home
                        </Link>
                        <span className="text-white/20">/</span>
                        <span className="text-sm text-[#a8ffc4]">About</span>
                    </motion.div>

                    {/* Main headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[0.9]">
                        <SplitText className="block">We are The OG</SplitText>
                        <span className="block overflow-hidden mt-2">
                            <motion.span
                                className="block text-[#a8ffc4]"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
                            >
                                Digitals
                            </motion.span>
                        </span>
                    </h1>

                    {/* Tagline */}
                    <motion.p
                        className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        A creative digital agency crafting extraordinary experiences that captivate, engage, and convert.
                    </motion.p>

                    {/* Scroll indicator */}
                    <motion.div
                        className="flex flex-col items-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <svg className="w-6 h-6 text-[#a8ffc4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </motion.div>
                        <span className="text-xs uppercase tracking-widest text-white/30">Scroll to explore</span>
                    </motion.div>
                </motion.div>
            </section>

            {/* ===== INTRO SECTION ===== */}
            <section className="min-h-screen flex flex-col justify-center relative py-32">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    {/* Full-width statement */}
                    <SplitText className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] max-w-none mb-24">
                        To put it simply: We are a design-driven digital agency. We do Product and Brand work that lives online and that people choose to use every day.
                    </SplitText>

                    {/* Right-aligned paragraphs */}
                    <div className="flex justify-end">
                        <motion.div
                            className="max-w-xl"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-sm text-white/40 mb-4 uppercase tracking-wider">
                                ++The OG Digitals
                            </p>
                            <p className="text-lg text-white/60 leading-relaxed mb-6">
                                The OG Digitals was born with the belief that beauty is essential in creating meaningful experiences, valuing details to craft attractive, enduring products.
                            </p>
                            <p className="text-lg text-white/60 leading-relaxed">
                                We integrate technology into people&apos;s lives aesthetically while forming meaningful relationships with our clients who share our vision and values.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== STATS SECTION ===== */}
            <section className="py-24 relative overflow-hidden">
                {/* Background line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5" />

                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#a8ffc4] mb-2">
                                    <Counter target={stat.number} suffix={stat.suffix} />
                                </div>
                                <div className="text-sm uppercase tracking-widest text-white/40">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== VALUES SECTION ===== */}
            <section className="py-32 relative">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Section header */}
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-[#a8ffc4] block mb-4">
                            Our Values
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                            What drives us
                        </h2>
                    </motion.div>

                    {/* Values grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {values.map((value, i) => (
                            <motion.div
                                key={value.title}
                                className="group relative p-8 rounded-2xl border border-white/5 hover:border-[#a8ffc4]/30 transition-all duration-500"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                            >
                                {/* Background glow on hover */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: "radial-gradient(circle at center, rgba(168,255,196,0.05) 0%, transparent 70%)",
                                    }}
                                />

                                {/* Number */}
                                <span className="text-6xl font-bold text-[#a8ffc4]/10 absolute top-4 right-8">
                                    {value.number}
                                </span>

                                {/* Content */}
                                <div className="relative">
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#a8ffc4] transition-colors">
                                        {value.title}
                                    </h3>
                                    <p className="text-white/50 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TEAM SECTION ===== */}
            <section className="py-32 relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(168,255,196,0.1) 0%, transparent 70%)",
                            filter: "blur(80px)",
                        }}
                        animate={{ y: [-50, 50, -50] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    {/* Section header */}
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-[#a8ffc4] block mb-4">
                            The Team
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                            Meet the minds behind
                        </h2>
                    </motion.div>

                    {/* Team grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, i) => (
                            <TeamCard key={member.name} member={member} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="py-32 relative overflow-hidden">
                {/* Animated gradient background */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(135deg, rgba(168,255,196,0.05) 0%, transparent 50%, rgba(96,165,250,0.05) 100%)",
                    }}
                />

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-white/30 block mb-6">
                            Ready to Create?
                        </span>

                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
                            Let&apos;s build something<br />
                            <span className="text-[#a8ffc4]">extraordinary</span>
                        </h2>

                        <p className="text-xl text-white/50 mb-12 max-w-xl mx-auto">
                            Have a project in mind? We&apos;d love to hear about it.
                            Let&apos;s discuss how we can help you achieve your goals.
                        </p>

                        {/* Animated CTA button */}
                        <motion.div className="relative inline-block">
                            <motion.div
                                className="absolute -inset-2 rounded-full opacity-50"
                                style={{
                                    background: "linear-gradient(90deg, #a8ffc4, #60a5fa, #c084fc, #a8ffc4)",
                                    backgroundSize: "300% 100%",
                                    filter: "blur(12px)",
                                }}
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />

                            <Link href="/#contact" className="relative block">
                                <motion.div
                                    className="relative px-12 py-6 rounded-full overflow-hidden cursor-pointer"
                                    style={{
                                        background: "linear-gradient(135deg, #a8ffc4 0%, #7dd3a8 100%)",
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <motion.div
                                        className="absolute inset-0"
                                        style={{
                                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                                        }}
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    />

                                    <div className="relative flex items-center gap-4 text-black font-bold text-lg">
                                        <span>Get in Touch</span>
                                        <motion.svg
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2.5}
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </motion.svg>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
