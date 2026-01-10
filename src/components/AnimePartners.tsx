"use client";

import { useRef, useEffect, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const partners = [
    {
        name: "MIP",
        url: "https://mip.com.pk/",
        logo: "https://madeinpakistan.online/MIP-LOGO.png",
        color: "#006600",
        description: "Global B2B Platform",
        needsWhiteBg: false
    },
    {
        name: "JAC",
        url: "https://jac.com.cn/",
        logo: "https://seeklogo.com/images/J/jac-motors-logo-8F8D62C384-seeklogo.com.png",
        color: "#E31D1A",
        description: "Authentic Automotive",
        needsWhiteBg: false
    },
    {
        name: "Gandhara",
        url: "https://ghandharaautomobiles.com.pk/",
        logo: "/assets/clients/ghandhara.png",
        color: "#D7000F",
        description: "Future of Transport",
        needsWhiteBg: true
    },
    {
        name: "Prince",
        url: "http://www.regalautomobiles.com/",
        logo: "/assets/clients/prince.png",
        color: "#C7000B",
        description: "Modern Design",
        needsWhiteBg: true
    }
];

export default function AnimePartners() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initial Stagger Animation
    useEffect(() => {
        anime({
            targets: '.partner-item',
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            easing: 'spring(1, 80, 10, 0)'
        });
    }, []);

    // Handle Hover - The "Insane" Effect
    const handleMouseEnter = (index: number) => {
        setActiveIndex(index);

        // Animate the background reveal
        anime({
            targets: `.bg-reveal-${index}`,
            scale: [0, 1],
            opacity: [0, 1],
            rotate: '1turn',
            duration: 800,
            easing: 'easeInOutExpo'
        });

        // Animate the Logo Pop
        anime({
            targets: `.logo-${index}`,
            scale: [0.5, 1],
            rotateY: '360deg',
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutElastic(1, .5)'
        });
    };

    const handleMouseLeave = (index: number) => {
        setActiveIndex(null);
        anime({
            targets: `.bg-reveal-${index}`,
            scale: 0,
            opacity: 0,
            duration: 600,
            easing: 'easeOutExpo'
        });
    };

    return (
        <section className="relative py-40 bg-black overflow-hidden min-h-screen flex items-center justify-center">

            {/* Background Grid - Animated with Anime.js later if needed */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Centered */}
                <div className="text-center mb-32">
                    <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase mb-4 mix-blend-difference">
                        Our Alliance
                    </h2>
                    <div className="w-24 h-1 bg-[#a8ffc4] mx-auto" />
                </div>

                {/* Centered List */}
                <div className="flex flex-col items-center justify-center space-y-8">
                    {partners.map((partner, index) => (
                        <div
                            key={partner.name}
                            className="partner-item relative group w-full flex justify-center"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                        >
                            {/* The "Insane" Background Reveal for this item */}
                            <div
                                className={`bg-reveal-${index} absolute pointer-events-none rounded-full blur-3xl opacity-0`}
                                style={{
                                    width: '600px',
                                    height: '600px',
                                    background: `radial-gradient(circle, ${partner.color} 0%, transparent 70%)`,
                                    zIndex: -1,
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%) scale(0)'
                                }}
                            />

                            <Link
                                href={partner.url}
                                target="_blank"
                                className="relative z-10 text-center"
                            >
                                <span className="block text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 transition-all duration-500 group-hover:from-white group-hover:to-white group-hover:scale-110"
                                    style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                                    {partner.name}
                                </span>

                                <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-300">
                                    <p className="text-[#a8ffc4] font-mono text-lg mt-2 tracking-widest uppercase">
                                        {partner.description}
                                    </p>
                                </div>
                            </Link>

                            {/* Floating Logo - Centered and HUGE on hover */}
                            <div className={`logo-${index} fixed pointer-events-none opacity-0 z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] flex items-center justify-center drop-shadow-2xl`}>
                                <div className={`relative w-full h-full flex items-center justify-center p-8 transition-all duration-500 ${partner.needsWhiteBg ? 'bg-white rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.2)]' : ''}`}>
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className={`w-full h-full object-contain ${partner.needsWhiteBg ? '' : 'filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]'}`}
                                    />
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
