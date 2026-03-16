"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ParticleNet from "@/components/ParticleNet";

// Formatting helper for glitch effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GlitchText = ({ text }: { text: string }) => {
    const [display, setDisplay] = useState(text);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!active) {
            setDisplay(text);
            return;
        }

        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [active, text]);

    return (
        <span
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            className="font-mono cursor-default"
        >
            {display}
        </span>
    );
};

// Team Data
const team: {
    name: string;
    role: string;
    id: string;
    keywords: string[];
    desc: string;
    color: string;
    warning: string;
    success: string;
    image?: string;
    imagePosition?: string;
}[] = [
    {
        name: "OSAMA",
        role: "FOUNDER & CEO",
        id: "01",
        keywords: ["VISION", "LEADERSHIP", "FUTURE"],
        desc: "Driving the digital evolution with uncompromising vision.",
        color: "#a8ffc4",
        warning: "WARNING: EGO OVERLOAD DETECTED. DO NOT FEED THE VISIONARY.",
        success: "ALERT: SALARIES DISPENSED 2 WEEKS EARLY. MORALE OVERLOAD.",
        image: "/assets/team/osama.jpeg",
        imagePosition: "center 30%",
    },
    {
        name: "SUHAIB",
        role: "DIR. OPERATIONS & CLIENT RELATIONS",
        id: "02",
        keywords: ["STRATEGY", "CLIENTS", "OPERATIONS"],
        desc: "Orchestrating seamless operations and client success at scale.",
        color: "#60a5fa",
        warning: "WARNING: INBOX OVERLOAD. 47 CLIENTS ALL MARKED PRIORITY.",
        success: "STATUS: CLIENT SATISFACTION AT 100%. RETENTION RATE: INFINITE.",
        image: "/assets/team/suhaib.jpeg",
        imagePosition: "center 25%",
    },
    {
        name: "MAZHAR",
        role: "HEAD OF CONTENT & BRANDING",
        id: "03",
        keywords: ["AESTHETICS", "DESIGN", "SOUL"],
        desc: "Crafting visual narratives that defy convention.",
        color: "#c084fc",
        warning: "WARNING: REALITY DISTORTION FIELD ACTIVE. PIXELS MAY BITE.",
        success: "VISUALS: PIXEL PERFECTION REACHED. CLIENT IS CRYING TEARS OF JOY.",
        image: "/assets/team/mazhar.jpeg",
        imagePosition: "center 15%",
    },
    {
        name: "WALEED",
        role: "HEAD OF MARKETING",
        id: "04",
        keywords: ["GROWTH", "DATA", "IMPACT"],
        desc: "Turning abstract data into concrete success.",
        color: "#fbbf24",
        warning: "WARNING: DATA SINGULARITY IMMINENT. YOUR ROI IS BELONG TO US.",
        success: "METRICS: ROI EXCEEDED 500%. MONEY PRINTER GO BRRR.",
    }
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
                <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%" }}
                        animate={isInView ? { y: 0 } : {}}
                        transition={{
                            duration: 0.8,
                            delay: i * 0.03,
                            ease: [0.25, 1, 0.5, 1],
                        }}
                    >
                        {word}{i < words.length - 1 ? "\u00A0" : ""}
                    </motion.span>
                </span>
            ))}
        </div>
    );
}

// Custom hook for aggressive random character generation
function useCorruption(active: boolean, speed = 30) {
    const [text, setText] = useState("");

    useEffect(() => {
        if (!active) {
            setText("");
            return;
        }

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&[]{}<>";
        const interval = setInterval(() => {
            setText(Array(10).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join(""));
        }, speed);

        return () => clearInterval(interval);
    }, [active, speed]);

    return text;
}

// Aggressive Glitch Text that changes fonts and weights
const GlitchTextV2 = ({ text, active }: { text: string; active: boolean }) => {
    const [display, setDisplay] = useState(text);
    const fonts = ["font-mono", "font-sans", "font-serif"];
    const weights = ["font-light", "font-normal", "font-bold", "font-black"];
    const [currentFont, setCurrentFont] = useState("font-bold");

    useEffect(() => {
        if (!active) {
            setDisplay(text);
            setCurrentFont("font-bold");
            return;
        }

        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;':,./<>?";
        let iterations = 0;

        const interval = setInterval(() => {
            // Text Scramble
            setDisplay(
                text.split("").map((letter, index) => {
                    if (index < iterations) return text[index];
                    return letters[Math.floor(Math.random() * letters.length)];
                }).join("")
            );

            // Font Chaos
            if (Math.random() > 0.7) {
                setCurrentFont(`${fonts[Math.floor(Math.random() * fonts.length)]} ${weights[Math.floor(Math.random() * weights.length)]}`);
            }

            if (iterations >= text.length) {
                // Keep scrambling even after "done" for the virus effect
                // iterations = 0; 
            } else {
                iterations += 1 / 2;
            }
        }, 40);

        return () => clearInterval(interval);
    }, [active, text]);

    return (
        <span className={`${currentFont} transition-all duration-75 inline-block`}>
            {display}
        </span>
    );
};

// The Viral Overlay - heavy DOM manipulation for "Code Rain" effect
const ViralOverlay = ({ active, color }: { active: boolean; color: string }) => {
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        if (!active) {
            setLines([]);
            return;
        }

        const phrases = [
            "SYSTEM_FAILURE", "CORRUPTION_DETECTED", "OVERRIDE_AUTH",
            "CEO_IS_OUR_LOVE", "WORSHIP_THE_CODE", "DIGITAL_ASCENSION",
            "NO_ESCAPE", "JOIN_THE_HIVE", "PLAY_THE_GAME",
            "0x9A_ERROR", "STACK_OVERFLOW", "MEMORY_LEAK"
        ];

        const interval = setInterval(() => {
            setLines(prev => {
                const newLine = `${Math.random().toString(36).substring(7)} // ${phrases[Math.floor(Math.random() * phrases.length)]}`;
                const newLines = [...prev, newLine];
                if (newLines.length > 15) newLines.shift();
                return newLines;
            });
        }, 80);

        return () => clearInterval(interval);
    }, [active]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20 mix-blend-screen">
            {lines.map((line, i) => (
                <div
                    key={i}
                    className="text-[10px] font-mono leading-none opacity-70 whitespace-nowrap"
                    style={{
                        color: Math.random() > 0.8 ? "#ff003c" : color, // Random red sparks
                        marginLeft: `${Math.random() * 20}%`
                    }}
                >
                    {line}
                </div>
            ))}
        </div>
    );
};

// THE TEAM CARD COMPONENT
function ViralTeamCard({ member, index }: { member: typeof team[0]; index: number }) {
    const [hovered, setHovered] = useState(false);
    const corruptionCheck = useCorruption(hovered);
    const hasImage = !!member.image;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative w-full cursor-pointer bg-black border border-white/10 overflow-hidden"
            style={{
                aspectRatio: "3 / 4",
                borderColor: hovered ? member.color : "rgba(255,255,255,0.1)",
                boxShadow: hovered ? `0 0 40px ${member.color}30` : "none",
                transition: "border-color 0.3s, box-shadow 0.3s",
            }}
        >
            {/* Background */}
            <div className="absolute inset-0 bg-[#050505]">
                {hasImage ? (
                    <Image
                        src={member.image!}
                        alt={member.name}
                        fill
                        className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                        style={{ objectPosition: member.imagePosition || "center center" }}
                    />
                ) : (
                    <>
                        <div
                            className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-300"
                            style={{
                                backgroundImage: `linear-gradient(${member.color} 1px, transparent 1px), linear-gradient(90deg, ${member.color} 1px, transparent 1px)`,
                                backgroundSize: hovered ? "20px 20px" : "40px 40px",
                            }}
                        />
                        <ViralOverlay active={hovered} color={member.color} />
                    </>
                )}
            </div>

            {/* Gradient overlay - stronger at bottom for text */}
            <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                    background: hasImage
                        ? "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.1) 60%, transparent 100%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)",
                }}
            />

            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 z-10 transition-colors duration-300" style={{ borderColor: hovered ? member.color : "rgba(255,255,255,0.15)" }} />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 z-10 transition-colors duration-300" style={{ borderColor: hovered ? member.color : "rgba(255,255,255,0.15)" }} />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 z-10 transition-colors duration-300" style={{ borderColor: hovered ? member.color : "rgba(255,255,255,0.15)" }} />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 z-10 transition-colors duration-300" style={{ borderColor: hovered ? member.color : "rgba(255,255,255,0.15)" }} />

            {/* Top - ID tag */}
            <div className="absolute top-6 left-6 z-20">
                <span className="text-[10px] font-mono text-white/30 block mb-1">ID_REF</span>
                <span className="text-lg font-bold font-mono text-white/60">
                    {hovered && !hasImage ? corruptionCheck.substring(0, 4) : member.id}
                </span>
            </div>

            {/* Top right - Status */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest" style={{ color: hovered ? member.color : "rgba(255,255,255,0.2)" }}>
                    {hasImage ? (hovered ? "ACTIVE" : "ONLINE") : (hovered ? "INFECTED" : "SECURE")}
                </span>
                <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: hovered ? member.color : "rgba(255,255,255,0.2)" }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: hovered && !hasImage ? 0.1 : 2, repeat: Infinity }}
                />
            </div>

            {/* Bottom content - Name, Role, Desc */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                {/* Name */}
                <motion.h3
                    className="text-3xl md:text-4xl font-black text-white leading-none mb-3"
                    style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
                    animate={hovered && !hasImage ? { x: [-1, 1, -1] } : { x: 0 }}
                    transition={{ duration: 0.1, repeat: hovered && !hasImage ? Infinity : 0 }}
                >
                    {!hasImage && hovered ? <GlitchTextV2 text={member.name} active={hovered} /> : member.name}
                </motion.h3>

                {/* Accent line */}
                <motion.div
                    className="h-[2px] mb-3 origin-left"
                    style={{ backgroundColor: member.color }}
                    initial={{ scaleX: 0.3 }}
                    animate={{ scaleX: hovered ? 1 : 0.3 }}
                    transition={{ duration: 0.4 }}
                />

                {/* Role */}
                <span
                    className="block text-xs font-mono tracking-[0.15em] uppercase mb-2"
                    style={{ color: member.color }}
                >
                    {member.role}
                </span>

                {/* Description - slides up on hover */}
                <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <p className="text-white/50 text-xs font-mono leading-relaxed pt-1">
                        {member.desc}
                    </p>
                </motion.div>
            </div>

            {/* Virus mask - only for no-photo cards */}
            {!hasImage && (
                <motion.div
                    className="absolute inset-0 z-[5] mix-blend-difference pointer-events-none"
                    style={{ backgroundColor: member.color }}
                    initial={{ clipPath: "circle(0% at 50% 50%)" }}
                    animate={{ clipPath: hovered ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)" }}
                    transition={{ duration: 0.8, ease: "circIn" }}
                />
            )}

            {/* Scanlines - very subtle */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.07]"
                style={{
                    backgroundImage: "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%)",
                    backgroundSize: "100% 4px"
                }}
            />
        </motion.div>
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

            {/* Interactive particle net background */}
            <ParticleNet />

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
                    className="relative z-10 w-full px-6 md:px-12 lg:px-24"
                    style={{ y: heroY, opacity: heroOpacity }}
                >
                    {/* Breadcrumb - left aligned */}
                    <motion.div
                        className="flex items-center gap-4 mb-12"
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

                    {/* Main content grid - spread across */}
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
                        {/* Left - Main headline */}
                        <div className="lg:col-span-8">
                            <h1 className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-white leading-[0.85] tracking-tight">
                                <span className="block overflow-hidden">
                                    <motion.span
                                        className="block"
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                                    >
                                        We are
                                    </motion.span>
                                </span>
                                <span className="block overflow-hidden">
                                    <motion.span
                                        className="block"
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                                    >
                                        The <span className="text-[#a8ffc4]">OG</span>
                                    </motion.span>
                                </span>
                                <span className="block overflow-hidden">
                                    <motion.span
                                        className="block text-[#a8ffc4]"
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 1, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
                                    >
                                        Digitals
                                    </motion.span>
                                </span>
                            </h1>
                        </div>

                        {/* Right - Tagline */}
                        <div className="lg:col-span-4 pb-4 lg:pb-8">
                            <motion.p
                                className="text-lg md:text-xl text-white/50 leading-relaxed mb-8"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                A creative digital agency crafting extraordinary experiences that captivate, engage, and convert.
                            </motion.p>

                            {/* Scroll indicator */}
                            <motion.div
                                className="flex items-center gap-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                            >
                                <motion.div
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <svg className="w-5 h-5 text-[#a8ffc4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </motion.div>
                                <span className="text-xs uppercase tracking-widest text-white/30">Scroll to explore</span>
                            </motion.div>
                        </div>
                    </div>
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



            {/* ===== VALUES SECTION ===== */}
            <section className="py-40 relative">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    {/* Section header - left aligned */}
                    <motion.div
                        className="mb-24 max-w-3xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-[#a8ffc4] block mb-6">
                            Our Values
                        </span>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                            What drives<br />everything we do
                        </h2>
                    </motion.div>

                    {/* Values - horizontal list */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {values.map((value, i) => (
                            <motion.div
                                key={value.title}
                                className="group relative"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {/* Number */}
                                <span className="text-8xl font-bold text-[#a8ffc4]/5 absolute -top-8 -left-4">
                                    {value.number}
                                </span>

                                {/* Content */}
                                <div className="relative pt-8 border-t border-white/10">
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#a8ffc4] transition-colors duration-300">
                                        {value.title}
                                    </h3>
                                    <p className="text-white/40 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TEAM SECTION ===== */}
            <section className="py-40 relative overflow-hidden" style={{ zIndex: 1 }}>
                <div className="w-full px-6 md:px-12 lg:px-24">
                    {/* Section header - RIGHT aligned for variety */}
                    <motion.div
                        className="text-right mb-24"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-[#a8ffc4] block mb-6">
                            The Team
                        </span>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                            The minds behind<br />the magic
                        </h2>
                    </motion.div>

                    {/* Team Grid - Portrait Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                        {team.map((member, index) => (
                            <ViralTeamCard key={member.id} member={member} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="min-h-[80vh] flex items-center relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(168,255,196,0.08) 0%, transparent 60%)",
                            filter: "blur(100px)",
                        }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>

                <div className="w-full px-6 md:px-12 lg:px-24 relative z-10">
                    {/* REVERSED LAYOUT - CTA on LEFT, headline on RIGHT */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left - CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-xs uppercase tracking-[0.3em] text-white/30 block mb-8">
                                Ready to Create?
                            </span>

                            <p className="text-xl md:text-2xl text-white/50 mb-12 leading-relaxed max-w-lg">
                                Have a project in mind? We&apos;d love to hear about it.
                                Let&apos;s discuss how we can help you achieve your goals.
                            </p>

                            {/* Button */}
                            <Link href="/contact" className="group inline-block">
                                <motion.div
                                    className="relative px-12 py-6 rounded-full overflow-hidden"
                                    style={{
                                        background: "linear-gradient(135deg, #a8ffc4 0%, #7dd3a8 100%)",
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Shimmer */}
                                    <motion.div
                                        className="absolute inset-0"
                                        style={{
                                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                                        }}
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    />

                                    <div className="relative flex items-center gap-4 text-black font-bold text-lg">
                                        <span>Get in Touch</span>
                                        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>

                        {/* Right - Headline */}
                        <motion.div
                            className="text-right"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95]">
                                Let&apos;s build<br />
                                something<br />
                                <span className="text-[#a8ffc4]">extraordinary</span>
                            </h2>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}

