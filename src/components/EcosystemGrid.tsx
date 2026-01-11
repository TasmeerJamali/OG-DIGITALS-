"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Terminal, Cpu, Activity, Zap } from "lucide-react";

const partners = [
    {
        name: "MIP",
        fullname: "Made in Pakistan",
        url: "https://mip.com.pk/",
        color: "#00ff88", // Matrix Green
        type: "binary",
        message: "INITIATE COMMERCE PROTOCOL"
    },
    {
        name: "JAC",
        fullname: "JAC Motors",
        url: "https://jac.com.cn/",
        color: "#ff3333", // Red Alert
        type: "radar",
        message: "ENGAGE AUTOMOTIVE SYSTEMS"
    },
    {
        name: "Gandhara",
        fullname: "Gandhara Auto",
        url: "https://ghandharaautomobiles.com.pk/",
        color: "#33ccff", // Cyan Future
        type: "flow",
        message: "ACCELERATE TRANSPORT"
    },
    {
        name: "Prince",
        fullname: "Prince Automine",
        url: "http://www.regalautomobiles.com/",
        color: "#ff00ff", // Neon Purple
        type: "glitch",
        message: "DEPLOY INNOVATION"
    }
];

export default function EcosystemGrid() {
    return (
        <section className="pt-6 pb-0 relative z-10 px-6 w-full flex flex-col items-center">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-widest uppercase mb-4 opacity-50">
                    &lt; SYSTEM_ALLIANCE /&gt;
                </h2>
                <div className="w-full max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">
                {partners.map((partner, index) => (
                    <Link
                        key={partner.name}
                        href={partner.url}
                        target="_blank"
                        className="group relative h-[280px] w-full max-w-[400px] block overflow-hidden rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] mx-auto"
                    >
                        {/* 1. BACKGROUND CODING ANIMATIONS */}
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity duration-500">

                            {/* BINARY RAIN (MIP) */}
                            {partner.type === "binary" && (
                                <div className="absolute inset-0 flex flex-col font-mono text-xs overflow-hidden leading-none text-[#00ff88]">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ y: [0, 400] }}
                                            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "linear" }}
                                            className="opacity-50 whitespace-nowrap"
                                            style={{ marginLeft: `${i * 5}%` }}
                                        >
                                            {Array.from({ length: 30 }).map(() => Math.random() > 0.5 ? "1" : "0").join(" ")}
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* RADAR SCAN (JAC) */}
                            {partner.type === "radar" && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="w-[500px] h-[500px] border-[2px] border-red-500/60 rounded-full border-dashed"
                                    />
                                    <motion.div
                                        animate={{ scale: [0.8, 1.2], opacity: [0.8, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute w-40 h-40 bg-red-500/20 rounded-full blur-xl"
                                    />
                                </div>
                            )}

                            {/* FLOW LINES (Gandhara) */}
                            {partner.type === "flow" && (
                                <div className="absolute inset-0">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute h-[2px] w-full bg-cyan-500/50"
                                            style={{ top: `${20 + i * 15}%` }}
                                            animate={{ x: [-1000, 1000] }}
                                            transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* GLITCH GRID (Prince) */}
                            {partner.type === "glitch" && (
                                <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1 p-4">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="bg-purple-500/40"
                                            style={{
                                                gridColumn: Math.floor(Math.random() * 10) + 1,
                                                gridRow: Math.floor(Math.random() * 10) + 1
                                            }}
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 2 }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 2. BASE CONTENT (IDLE) */}
                        <div className="absolute top-6 left-6 z-20 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`w-2 h-2 rounded-full shadow-[0_0_10px_${partner.color}]`} style={{ backgroundColor: partner.color }} />
                                <span className="font-mono text-xs text-white/50 tracking-[0.2em]">{partner.fullname}</span>
                            </div>
                            <h3 className="text-4xl font-bold text-white tracking-tighter">{partner.name}</h3>
                        </div>

                        {/* 3. HYPER MESSAGE (HOVER) */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                            <div
                                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                                style={{ border: `1px solid ${partner.color}` }}
                            />
                            <div className="relative z-10 text-center">
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 0.1, repeat: Infinity }}
                                    className="text-xs font-mono mb-2"
                                    style={{ color: partner.color }}
                                >
                                    &gt;&gt; ACCESS_GRANTED
                                </motion.div>
                                <h4 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
                                    {partner.message}
                                </h4>
                                <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 rounded-full border border-white/20">
                                    <span className="text-sm font-bold text-white">VISIT EXTERNAL NODE</span>
                                    <ArrowUpRight className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </div>

                    </Link>
                ))}
            </div>
        </section>
    );
}
