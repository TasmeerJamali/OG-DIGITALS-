"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const cards = [
    {
        title: "Strategic Brand Voice",
        description: "We don't guess; we engineer your online persona. Our deep-dive audit frames your brand to dominate the feed.",
        link: "Our Strategy",
        visual: (
            <div className="relative w-full h-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                {/* Visual: Cursor Switching Tabs */}
                <div className="relative w-64 h-40 bg-[#1a1a1a] rounded-lg border border-white/10 overflow-hidden flex flex-col p-4 shadow-2xl">
                    {/* Fake Browser Tabs */}
                    <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="h-6 w-16 bg-white/5 rounded-t-md relative"
                                animate={{
                                    backgroundColor: ["rgba(255,255,255,0.05)", "rgba(168,255,196,0.1)", "rgba(255,255,255,0.05)"],
                                }}
                                transition={{
                                    duration: 3,
                                    times: [0, 0.2, 1],
                                    delay: i * 2,
                                    repeat: Infinity
                                }}
                            >
                                <motion.div
                                    className="absolute inset-x-0 bottom-0 h-0.5 bg-[#a8ffc4]"
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 3, delay: i * 2, repeat: Infinity, times: [0, 0.1, 0.9] }}
                                />
                            </motion.div>
                        ))}
                    </div>
                    {/* Content Placeholder */}
                    <div className="space-y-2">
                        <motion.div
                            className="h-2 w-3/4 bg-white/10 rounded-full"
                            animate={{ width: ["75%", "90%", "75%"] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                    </div>

                    {/* Animated Cursor */}
                    <motion.div
                        className="absolute z-20"
                        animate={{
                            x: [20, 90, 160, 20],
                            y: [10, 10, 10, 10],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="#a8ffc4" stroke="black" strokeWidth="2" />
                        </svg>
                    </motion.div>
                </div>
            </div>
        )
    },
    {
        title: "Viral Content Engine",
        description: "Built for speed and engagement. Our rapid-production workflow ensures you catch every trend without compromising quality.",
        link: "How we create",
        visual: (
            <div className="relative w-full h-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                {/* Visual: Moving Cards + Popping Dollars */}
                <div className="relative w-full h-full flex items-center justify-center">

                    {/* Moving Ribbon */}
                    <motion.div
                        className="flex gap-4 absolute"
                        animate={{ x: [-100, -300] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-32 h-48 bg-white/5 border border-white/10 rounded-lg flex flex-col p-3 gap-2">
                                <div className="w-full aspect-video bg-white/5 rounded" />
                                <div className="h-2 w-3/4 bg-white/5 rounded" />
                            </div>
                        ))}
                    </motion.div>

                    {/* Floating Dollars */}
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute z-10 text-[#a8ffc4] font-bold text-xl"
                            initial={{ opacity: 0, y: 50, scale: 0.5 }}
                            animate={{ opacity: [0, 1, 0], y: -50, scale: 1.2 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.7,
                                ease: "easeOut"
                            }}
                            style={{ left: `${40 + i * 10}%` }}
                        >
                            $
                        </motion.div>
                    ))}
                </div>
            </div>
        )
    },
    {
        title: "Community Growth",
        description: "Followers are vanity; community is sanity. We integrate data-driven loops to turn viewers into loyal advocates.",
        link: "See results",
        visual: (
            <div className="relative w-full h-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                {/* Visual: Solar System */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                    {/* Sun */}
                    <motion.div
                        className="absolute w-12 h-12 bg-[#a8ffc4] rounded-full shadow-[0_0_40px_rgba(168,255,196,0.5)] z-10"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Orbit 1 */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute w-32 h-32 border border-white/10 rounded-full"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
                    </motion.div>

                    {/* Orbit 2 */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute w-48 h-48 border border-white/10 rounded-full"
                    >
                        <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-4 h-4 bg-purple-400 rounded-full shadow-lg" />
                    </motion.div>

                    {/* Orbit 3 */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute w-64 h-64 border border-white/5 rounded-full"
                    >
                        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg" />
                    </motion.div>
                </div>
            </div>
        )
    }
];

export default function ValueProps() {
    return (
        <section className="relative py-32 px-6 md:px-12 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 flex flex-col items-center text-center w-full"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Dominate the <span className="text-[#a8ffc4]">Feed.</span>
                    </h2>
                    <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-2xl">
                        With multiple ways to interact, we adapt to your workflow. Whether you need a full-scale platform or a strategic pivot, we have the tools.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group relative h-[520px] rounded-3xl bg-[#0F0F0F] border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#a8ffc4]/30"
                        >
                            {/* Spotlight Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-b from-[#a8ffc4]/5 to-transparent" />
                            </div>

                            {/* Visual Area (Top 60%) */}
                            <div className="h-[60%] w-full border-b border-white/5 relative group-hover:bg-white/[0.02] transition-colors overflow-hidden">
                                {card.visual}
                                {/* Top Gradient Overlay */}
                                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0F0F0F] via-[#0F0F0F]/50 to-transparent opacity-80" />
                            </div>

                            {/* Content Area (Bottom 40%) */}
                            <div className="h-[40%] p-8 flex flex-col items-center text-center justify-between bg-[#0F0F0F] relative z-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-[#a8ffc4] transition-colors">
                                        {card.title}
                                    </h3>
                                    <p className="text-white/50 text-sm leading-relaxed line-clamp-3 font-light">
                                        {card.description}
                                    </p>
                                </div>

                                <Link
                                    href="/services"
                                    className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-[#a8ffc4] transition-colors mt-4"
                                >
                                    {card.link}
                                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
