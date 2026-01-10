"use client";

import { useRef, useState } from "react"; // Removed useEffect if not used, or keep
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
// Dynamic import for R3F to avoid SSR issues
import dynamic from 'next/dynamic';

const BackgroundParticles = dynamic(() => import('@/components/QuantumParticles').then(mod => mod.BackgroundParticles), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black" />
});

// Reliable URLs from Wikimedia/Official sources
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
        url: "https://jac.com.cn/",
        // Wikimedia transparent PNG
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Jac-motors.png/800px-Jac-motors.png",
        color: "#E31D1A",
        description: "Leading authentic automotive manufacturing."
    },
    {
        name: "Gandhara",
        fullName: "Gandhara Automobiles",
        url: "https://ghandharaautomobiles.com.pk/",
        // Using Isuzu logo as they are the main partner/assembler and Ghandhara logo is hard to find transparently hosted
        // But let's try the one found or Isuzu for authenticity "Powering Industry Leaders"
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Isuzu_sample_logo.svg/1024px-Isuzu_sample_logo.svg.png",
        color: "#D7000F",
        description: "Pioneering the future of transportation in Pakistan."
    },
    {
        name: "Prince",
        fullName: "Prince Automotive",
        url: "http://www.regalautomobiles.com/",
        // DFSK Logo
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Dongfeng_Sokon_%28DFSK%29_logo.svg/1200px-Dongfeng_Sokon_%28DFSK%29_logo.svg.png",
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
            className="py-40 bg-black relative overflow-hidden cursor-none" // Increased padding
        >
            {/* Background Texture/Grid for more pro look */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}
            />

            <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
                <div className="mb-24">
                    <span className="text-[#a8ffc4] font-mono text-xs tracking-[0.2em] opacity-60 uppercase mb-4 block">
                        Our Network
                    </span>
                    <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter">
                        Trusted by Giants.
                    </h2>
                </div>

                <div className="flex flex-col group/list hover:from-black/10">
                    {partners.map((partner, index) => (
                        <Link
                            key={partner.name}
                            href={partner.url}
                            target="_blank"
                            onMouseEnter={() => setHoveredPartner(index)}
                            onMouseLeave={() => setHoveredPartner(null)}
                            className="group relative border-t border-white/10 py-16 flex justify-between items-center transition-all duration-500 hover:px-10 hover:bg-white/5"
                        >
                            {/* Focus Effect: Dim others when hovering one */}
                            <div className={`flex flex-col transition-opacity duration-500 ${hoveredPartner !== null && hoveredPartner !== index ? "opacity-20 blur-[2px]" : "opacity-100"}`}>
                                <span className="text-5xl md:text-8xl font-black tracking-tight text-white/40 group-hover:text-white transition-colors duration-500">
                                    {partner.name}
                                </span>
                                <span className="text-base font-mono text-white/40 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    {partner.description}
                                </span>
                            </div>

                            <ArrowUpRight className={`w-10 h-10 text-[#a8ffc4] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 ${hoveredPartner !== null && hoveredPartner !== index ? "opacity-0" : ""}`} />
                        </Link>
                    ))}
                    <div className="border-t border-white/10" />
                </div>
            </div>

            {/* CURSOR FOLLOWER / IMAGE REVEAL */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-50 w-[350px] h-[350px] rounded-full overflow-hidden mix-blend-normal pointer-events-none hidden md:flex items-center justify-center p-10 bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl"
                style={{
                    x: mousePosition.x - 175,
                    y: mousePosition.y - 175,
                    position: "absolute"
                }}
                animate={{
                    scale: hoveredPartner !== null ? 1 : 0,
                    opacity: hoveredPartner !== null ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 15, mass: 0.5 }}
            >
                <AnimatePresence mode="wait">
                    {hoveredPartner !== null && (
                        <motion.div
                            key={partners[hoveredPartner].name}
                            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                            transition={{ duration: 0.3 }}
                            className={`w-full h-full flex items-center justify-center ${partners[hoveredPartner].needsWhiteBg ? "bg-white p-4 rounded-xl" : ""}`}
                        >
                            <img
                                src={partners[hoveredPartner].logo}
                                alt={partners[hoveredPartner].name}
                                className={`w-full h-full object-contain ${partners[hoveredPartner].needsWhiteBg ? "" : "filter brightness-0 invert"}`}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Glowing ring - AUTOMATING */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/5"
                    animate={{
                        borderColor: hoveredPartner !== null ? partners[hoveredPartner].color : "rgba(255,255,255,0.05)",
                        rotate: 360 // Continuous rotation
                    }}
                    transition={{
                        rotate: { duration: 8, ease: "linear", repeat: Infinity }, // Automate rotation
                        borderColor: { duration: 0.3 }
                    }}
                >
                    {/* Decorative blip on the ring */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
                </motion.div>

                {/* Second reverse ring for more complexity */}
                <motion.div
                    className="absolute inset-[20px] rounded-full border border-dashed border-white/10"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                />
            </motion.div>

        </section>
    );
}
