"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const partners = [
    {
        name: "MIP",
        fullName: "Made in Pakistan",
        url: "https://mip.com.pk/",
        logo: "https://madeinpakistan.online/MIP-LOGO.png",
        color: "#006600",
        description: "Global B2B Platform connecting Pakistani businesses."
    },
    {
        name: "JAC",
        fullName: "JAC Motors",
        url: "https://jac.com.cn/", // Or local ghandhara link
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Jac-motors.png/800px-Jac-motors.png",
        color: "#E31D1A",
        description: "Leading authentic automotive manufacturing."
    },
    {
        name: "Gandhara",
        fullName: "Gandhara Automobiles",
        url: "https://ghandharaautomobiles.com.pk/",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Isuzu_Motors_Ltd._Logo.svg", // Using Isuzu parent/partner logo as backup for clean svg, or text
        // Actually, let's use a text fallback or the specific GAL logo if accessible. 
        // For the sake of "authentic", I will try a generic car placeholder style if the direct hotlink is risky, 
        // BUT the user asked for web images. I'll stick to text-based reveal if image fails? 
        // No, I'll use a reliable Isuzu/JAC related image or the GAL one if I can construct the wikimedia link.
        // Let's use a safe placeholder for now that looks premium.
        // Re-using JAC for Gandhara context or finding a specific one.
        // Let's use the 'Isuzu' logo for Gandhara since they are 'Isuzu Pakistan'.
        // logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Jac-motors.png/800px-Jac-motors.png" 
        color: "#D7000F",
        description: "Pioneering the future of transportation in Pakistan."
    },
    {
        name: "Prince",
        fullName: "Prince Automotive",
        url: "http://www.regalautomobiles.com/",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Dongfeng_Sokon_%28DFSK%29_logo.svg/800px-Dongfeng_Sokon_%28DFSK%29_logo.svg.png",
        color: "#C7000B",
        description: "Innovative engineering meets modern design."
    }
];

export default function InteractivePartners() {
    const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="py-32 bg-black relative overflow-hidden cursor-none" // Hiding default cursor for immersion
        >
            <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
                <div className="mb-20">
                    <span className="text-[#a8ffc4] font-mono text-xs tracking-[0.2em] opacity-60 uppercase mb-4 block">
                        Our Network
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                        Trusted by Giants.
                    </h2>
                </div>

                <div className="flex flex-col">
                    {partners.map((partner, index) => (
                        <Link
                            key={partner.name}
                            href={partner.url}
                            target="_blank"
                            onMouseEnter={() => setHoveredPartner(index)}
                            onMouseLeave={() => setHoveredPartner(null)}
                            className="group relative border-t border-white/10 py-12 flex justify-between items-center transition-all duration-300 hover:px-8 hover:bg-white/5"
                        >
                            <div className="flex flex-col">
                                <span className="text-4xl md:text-7xl font-bold text-white/40 group-hover:text-white transition-colors duration-500">
                                    {partner.name}
                                </span>
                                <span className="text-sm font-mono text-white/40 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    {partner.description}
                                </span>
                            </div>

                            <ArrowUpRight className="w-8 h-8 text-[#a8ffc4] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0" />
                        </Link>
                    ))}
                    <div className="border-t border-white/10" />
                </div>
            </div>

            {/* CURSOR FOLLOWER / IMAGE REVEAL */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-50 w-[300px] h-[300px] rounded-full overflow-hidden mix-blend-normal pointer-events-none hidden md:flex items-center justify-center p-8 bg-black/80 backdrop-blur-md border border-white/10"
                style={{
                    x: mousePosition.x - 150, // Center the follower
                    y: mousePosition.y - 150,
                    // Use fixed positioning relative to viewport or absolute relative to container?
                    // "fixed" is tricky with scroll. "absolute" is better if container is relative.
                    // But mousePosition is clientX relative to container.
                    position: "absolute"
                }}
                animate={{
                    scale: hoveredPartner !== null ? 1 : 0,
                    opacity: hoveredPartner !== null ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.8 }}
            >
                <AnimatePresence mode="wait">
                    {hoveredPartner !== null && (
                        <motion.img
                            key={partners[hoveredPartner].logo}
                            src={partners[hoveredPartner].logo}
                            alt={partners[hoveredPartner].name}
                            className="w-full h-full object-contain filter brightness-0 invert" // Making logos white for aesthetic if they are black
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        />
                    )}
                </AnimatePresence>

                {/* Glowing ring matching partner color */}
                <motion.div
                    className="absolute inset-0 rounded-full opacity-20"
                    animate={{
                        boxShadow: hoveredPartner !== null
                            ? `0 0 60px ${partners[hoveredPartner].color}`
                            : "none"
                    }}
                />
            </motion.div>

        </section>
    );
}
