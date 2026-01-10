"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const partners = [
    {
        name: "MIP",
        id: "mip",
        url: "https://mip.com.pk/",
        logo: "https://madeinpakistan.online/MIP-LOGO.png",
        color: "#006600",
        description: "Global B2B Platform",
        fullname: "Made in Pakistan",
        needsWhiteBg: false
    },
    {
        name: "JAC",
        id: "jac",
        url: "https://jac.com.cn/",
        logo: "https://seeklogo.com/images/J/jac-motors-logo-8F8D62C384-seeklogo.com.png",
        color: "#E31D1A",
        description: "Authentic Automotive",
        fullname: "JAC Motors",
        needsWhiteBg: false
    },
    {
        name: "Gandhara",
        id: "gandhara",
        url: "https://ghandharaautomobiles.com.pk/",
        logo: "/assets/clients/ghandhara.png",
        color: "#D7000F",
        description: "Future of Transport",
        fullname: "Gandhara Automobiles",
        needsWhiteBg: true
    },
    {
        name: "Prince",
        id: "prince",
        url: "http://www.regalautomobiles.com/",
        logo: "/assets/clients/prince.png",
        color: "#C7000B",
        description: "Modern Design",
        fullname: "Prince Automotive",
        needsWhiteBg: true
    }
];

export default function EcosystemGrid() {
    return (
        <section className="py-32 relative z-10 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4"
                >
                    Our Ecosystem
                </motion.h2>
                <div className="w-16 h-1 bg-white/20 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {partners.map((partner, index) => (
                    <Link
                        key={partner.id}
                        href={partner.url}
                        target="_blank"
                        className="group relative h-[300px] md:h-[400px] w-full block perspective-1000"
                    >
                        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 group-hover:border-white/30 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]">

                            {/* HOVER GRADIENT BACKGROUND */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                                style={{ background: `radial-gradient(circle at center, ${partner.color}, transparent 80%)` }}
                            />

                            {/* CONTENT CONTAINER */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                                {/* TOP: Status & Name */}
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                                            {partner.name}
                                        </span>
                                        <span className="text-xs text-white/40 uppercase tracking-widest mt-1 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                                            {partner.fullname}
                                        </span>
                                    </div>
                                    <ArrowUpRight className="text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 w-6 h-6" />
                                </div>

                                {/* CENTER: Logo Reveal */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 delay-100">
                                    <div className={`relative w-48 h-48 flex items-center justify-center p-6 ${partner.needsWhiteBg ? "bg-white rounded-2xl shadow-2xl" : ""}`}>
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className={`w-full h-full object-contain ${partner.needsWhiteBg ? "" : "filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] brightness-125"}`}
                                        />
                                    </div>
                                </div>

                                {/* BOTTOM: Description */}
                                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                                    <p className="text-[#a8ffc4] font-mono text-sm tracking-wide border-l-2 border-[#a8ffc4] pl-3">
                                        {partner.description}
                                    </p>
                                </div>
                            </div>

                            {/* NOISE OVERLAY for Texture */}
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                                style={{ backgroundImage: 'url("/assets/noise.png")', backgroundSize: '100px' }}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
