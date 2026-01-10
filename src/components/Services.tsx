/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const services = [
    {
        id: "01",
        title: "Web Development",
        subtitle: "UX/UI Design · Development",
        description: "Architecting digital organisms that live and breathe in the modern web ecosystem.",
        video: "/assets/web-dev.mp4",
    },
    {
        id: "02",
        title: "SEO Strategy",
        subtitle: "Analytics · Optimization",
        description: "Dominating the neural pathways of search engines with data-driven precision.",
        video: "/assets/seo.mp4",
    },
    {
        id: "03",
        title: "Brand Identity",
        subtitle: "Visual Design · Strategy",
        description: "Forging visual legacies that burn into the collective consciousness.",
        video: "/assets/brand-identity.mp4",
    },
    {
        id: "04",
        title: "UI/UX Design",
        subtitle: "Research · Prototyping",
        description: "Crafting intuitive interfaces for seamless human-digital interaction.",
        video: "/assets/uiux-design.mp4",
    },
    {
        id: "05",
        title: "Content Creation",
        subtitle: "Copywriting · Storytelling",
        description: "Narratives that resonate on a molecular level with your audience.",
        video: "/assets/web-dev.mp4", // Placeholder reuse
    },
];

// Service Card Component
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="group relative flex-shrink-0 w-[85vw] md:w-[600px] h-[600px] rounded-[3rem] overflow-hidden cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Video Background */}
            <motion.div
                className="absolute inset-0 z-0"
                animate={{ scale: isHovered ? 1.1 : 1, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.8 }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                >
                    <source src={service.video} type="video/mp4" />
                </video>
            </motion.div>

            {/* Default Dark Background */}
            <div className={`absolute inset-0 bg-[#0a0a0a] transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 z-10" />
            <motion.div 
                className="absolute inset-0 bg-[#a8ffc4]/10 mix-blend-overlay z-10"
                animate={{ opacity: isHovered ? 1 : 0 }}
            />

            {/* Borders */}
            <div className="absolute inset-0 rounded-[3rem] border border-white/10 z-20 transition-colors duration-500 group-hover:border-[#a8ffc4]/30" />

            {/* Content */}
            <div className="relative z-30 h-full flex flex-col justify-between p-10 md:p-12">
                <div className="flex justify-between items-start">
                    <span className="text-8xl font-bold text-white/5 group-hover:text-[#a8ffc4]/20 transition-colors duration-500">
                        {service.id}
                    </span>
                    <motion.div 
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#a8ffc4] group-hover:border-[#a8ffc4] transition-all duration-300"
                        whileHover={{ rotate: 45 }}
                    >
                         <svg className="w-5 h-5 text-white group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </motion.div>
                </div>

                <div>
                    <span className="text-[#a8ffc4] text-xs font-mono tracking-[0.2em] uppercase mb-4 block">
                        {service.subtitle}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 group-hover:translate-x-2 transition-transform duration-500">
                        {service.title}
                    </h3>
                    <p className="text-white/50 text-lg leading-relaxed max-w-sm group-hover:text-white/80 transition-colors duration-500">
                         {service.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default function Services() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    // Auto-scroll logic (The "Belt" Effect)
    useEffect(() => {
        let animationFrameId: number;
        
        const scroll = () => {
            if (scrollContainerRef.current && isAutoScrolling) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
                
                // Slow consistent speed
                if (scrollLeft + clientWidth >= scrollWidth - 1) {
                    // Reset to start seamlessly (requires duplicated content for true seamless, but minimal jump is okay for now)
                    // For true seamless, we'd need duplicated children. Let's stick to loop reset for robustness.
                    scrollContainerRef.current.scrollLeft = 0; 
                } else {
                    scrollContainerRef.current.scrollLeft += 1; // Speed of the belt
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        if (isAutoScrolling) {
            animationFrameId = requestAnimationFrame(scroll);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [isAutoScrolling]);

    // Manual Navigation
    const scroll = (direction: 'left' | 'right') => {
        setIsAutoScrolling(false); // Pause auto-scroll on interaction
        if (scrollContainerRef.current) {
            const scrollAmount = 600; // Card width approx
            const targetScroll = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            
            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });

            // Resume auto-scroll after delay
            setTimeout(() => setIsAutoScrolling(true), 3000);
        }
    };

    return (
        <section className="py-32 bg-black relative overflow-hidden">
             {/* Header */}
             <div className="container mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-10">
                <div>
                     <span className="inline-block px-4 py-2 mb-6 text-sm font-mono text-[#a8ffc4] bg-[#a8ffc4]/10 rounded-full border border-[#a8ffc4]/20">
                        WHAT WE DO
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
                        Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8ffc4] to-emerald-600">Evolution</span>
                    </h2>
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex gap-4">
                    <button 
                        onClick={() => scroll('left')}
                        className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#a8ffc4] hover:text-black hover:border-[#a8ffc4] transition-all duration-300"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#a8ffc4] hover:text-black hover:border-[#a8ffc4] transition-all duration-300"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
             </div>

             {/* Slider Belt */}
             <div 
                ref={scrollContainerRef}
                className="flex gap-8 overflow-x-auto pb-12 pl-6 md:pl-20 no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseEnter={() => setIsAutoScrolling(false)}
                onMouseLeave={() => setIsAutoScrolling(true)}
             >
                {services.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={index} />
                ))}
                {/* Duplicate for length/feeling of belt */}
                 {services.map((service, index) => (
                    <ServiceCard key={`${service.id}-duplicate`} service={service} index={index + services.length} />
                ))}
             </div>
        </section>
    );
}
