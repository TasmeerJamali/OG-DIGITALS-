"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const cards = [
    {
        title: "Strategic Brand Voice",
        description: "We don't guess; we engineer your online persona. Our deep-dive audit frames your brand to dominate the feed.",
        link: "Our Strategy",
        href: "/services",
        accent: "#c084fc",
        process: [
            { step: "01", title: "Brand Audit", desc: "Deep-dive into your current brand presence, competitors, and audience behavior." },
            { step: "02", title: "Persona Engineering", desc: "Craft a distinct voice, tone, and personality that resonates with your audience." },
            { step: "03", title: "Voice Guidelines", desc: "Build a comprehensive playbook for consistent brand communication." },
            { step: "04", title: "Content Framework", desc: "Design templates and pillars that align every post with your brand DNA." },
        ],
        visual: (
            <div className="relative w-full h-full bg-gradient-to-b from-[#1a1a1a] to-black flex items-center justify-center overflow-hidden group-hover:from-[#2a2a2a] group-hover:to-black transition-colors duration-500">
                <div className="relative w-64 h-40 bg-[#0F0F0F] rounded-lg border border-white/10 overflow-hidden flex flex-col p-4 shadow-2xl skew-x-1 group-hover:skew-x-0 transition-transform duration-500 scale-75 md:scale-100">
                    <div className="flex gap-2 mb-4 border-b border-white/5 pb-2 justify-center">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="h-6 w-16 bg-white/5 rounded-t-md relative flex items-center justify-center"
                                animate={{
                                    backgroundColor: ["rgba(255,255,255,0.05)", "rgba(192,132,252,0.1)", "rgba(255,255,255,0.05)"],
                                    y: [0, -2, 0]
                                }}
                                transition={{ duration: 4, times: [0, 0.1, 1], delay: i * 2, repeat: Infinity }}
                            >
                                <div className="w-8 h-1 bg-white/10 rounded-full" />
                                <motion.div
                                    className="absolute inset-x-0 bottom-0 h-0.5 bg-[#c084fc]"
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 4, delay: i * 2, repeat: Infinity, times: [0, 0.1, 0.9] }}
                                />
                            </motion.div>
                        ))}
                    </div>
                    <div className="space-y-3">
                        <motion.div
                            className="h-2 w-3/4 bg-white/10 rounded-full mx-auto"
                            animate={{ width: ["75%", "90%", "75%"] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <div className="flex gap-2 justify-center">
                            <div className="h-20 w-1/3 bg-white/5 rounded" />
                            <div className="h-20 w-1/2 bg-white/5 rounded relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-[#c084fc]/5"
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </div>
                    </div>
                    <motion.div
                        className="absolute z-20"
                        animate={{ x: [80, 120, 160, 80], y: [10, 10, 10, 10], scale: [1, 0.9, 1, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]">
                            <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="#c084fc" stroke="black" strokeWidth="2" />
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
        href: "/services",
        accent: "#a8ffc4",
        process: [
            { step: "01", title: "Trend Radar", desc: "Real-time monitoring of trending topics, sounds, and formats across platforms." },
            { step: "02", title: "Rapid Production", desc: "Our content team creates scroll-stopping pieces within hours, not weeks." },
            { step: "03", title: "Quality Control", desc: "Every piece is reviewed for brand alignment, engagement hooks, and platform fit." },
            { step: "04", title: "Deploy & Iterate", desc: "Strategic scheduling, A/B testing, and rapid iteration based on live data." },
        ],
        visual: (
            <div className="relative w-full h-full bg-gradient-to-b from-[#1a1a1a] to-black flex items-center justify-center overflow-hidden group-hover:from-[#2a2a2a] group-hover:to-black transition-colors duration-500">
                <div className="relative w-full h-full flex flex-col items-center justify-center scale-90 md:scale-100">
                    <div className="relative w-48 h-full overflow-hidden mask-linear-fade">
                        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#1a1a1a] z-10" />
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black z-10" />
                        <motion.div
                            className="flex flex-col gap-4 w-full"
                            animate={{ y: [-20, -200] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        >
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-full h-28 bg-[#0F0F0F] border border-white/5 rounded-xl flex items-center p-3 gap-3 shadow-xl group-hover:border-[#a8ffc4]/20 transition-colors">
                                    <div className="h-16 w-16 bg-white/5 rounded-lg flex-shrink-0" />
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="h-2 w-full bg-white/10 rounded-full" />
                                        <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute z-20"
                            initial={{ opacity: 0, scale: 0.5, y: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 1], y: -80 }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
                        >
                            <span className="text-[#a8ffc4] font-bold text-3xl drop-shadow-[0_0_15px_#a8ffc4]">$</span>
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
        href: "/work",
        accent: "#ff7171",
        process: [
            { step: "01", title: "Audience Mapping", desc: "Identify and segment your ideal community members across platforms." },
            { step: "02", title: "Engagement Loops", desc: "Design interaction systems — polls, Q&As, stories — that keep people coming back." },
            { step: "03", title: "Data Analysis", desc: "Track engagement metrics, sentiment, and growth patterns in real time." },
            { step: "04", title: "Scale & Optimize", desc: "Double down on what works. Refine, expand, and build a self-sustaining community." },
        ],
        visual: (
            <div className="relative w-full h-full bg-gradient-to-b from-[#1a1a1a] to-black flex items-center justify-center overflow-hidden group-hover:from-[#2a2a2a] group-hover:to-black transition-colors duration-500">
                <div className="relative w-64 h-64 flex items-center justify-center scale-75 md:scale-100">
                    <motion.div
                        className="absolute w-16 h-16 bg-gradient-to-br from-[#ff7171] to-[#ff4040] rounded-full shadow-[0_0_50px_rgba(255,113,113,0.5)] z-10"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute w-32 h-32 border border-white/10 rounded-full"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
                    </motion.div>
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute w-48 h-48 border border-white/5 rounded-full"
                    >
                        <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-4 h-4 bg-purple-400 rounded-full shadow-[0_0_10px_#a020f0]" />
                    </motion.div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute w-64 h-64 border border-white/5 rounded-full"
                    >
                        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#0000ff]" />
                    </motion.div>
                </div>
            </div>
        )
    }
];

function FlipCard({ card, index }: { card: typeof cards[0]; index: number }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="h-[520px]"
            style={{ perspective: "1200px" }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* FRONT FACE */}
                <div
                    className="w-full h-full rounded-3xl bg-[#0F0F0F] border border-white/5 overflow-hidden flex flex-col"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {/* Spotlight Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#a8ffc4]/5 to-transparent" />
                    </div>

                    {/* Visual Area */}
                    <div className="h-64 md:h-[60%] w-full border-b border-white/5 relative bg-[#0a0a0a] transition-colors overflow-hidden flex-shrink-0">
                        {card.visual}
                        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0F0F0F] via-transparent to-transparent opacity-80" />
                    </div>

                    {/* Content Area */}
                    <div className="flex-grow md:h-[40%] p-6 md:p-8 flex flex-col items-center text-center justify-between bg-gradient-to-b from-[#0F0F0F] to-[#050505] relative z-10">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                                {card.title}
                            </h3>
                            <p className="text-white/50 text-base leading-relaxed line-clamp-3 font-light">
                                {card.description}
                            </p>
                        </div>
                        <Link
                            href={card.href}
                            className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-white/40 hover:text-[#a8ffc4] transition-colors mt-4 w-full"
                        >
                            {card.link}
                            <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>

                {/* BACK FACE - Process Steps */}
                <div
                    className="absolute inset-0 rounded-3xl border overflow-hidden flex flex-col"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        borderColor: `${card.accent}30`,
                        background: `linear-gradient(160deg, #0F0F0F 0%, #050505 100%)`,
                    }}
                >
                    {/* Header */}
                    <div className="p-6 md:p-8 pb-4 border-b" style={{ borderColor: `${card.accent}15` }}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full" style={{ background: card.accent, boxShadow: `0 0 10px ${card.accent}` }} />
                            <span className="text-xs uppercase tracking-[0.3em] font-mono" style={{ color: `${card.accent}90` }}>
                                Our Process
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                            {card.title}
                        </h3>
                    </div>

                    {/* Process Steps */}
                    <div className="flex-grow p-6 md:p-8 pt-4 flex flex-col justify-center gap-4">
                        <AnimatePresence>
                            {isFlipped && card.process.map((item, i) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                                    className="flex gap-4 items-start"
                                >
                                    {/* Step number */}
                                    <div className="flex-shrink-0 flex flex-col items-center">
                                        <span
                                            className="text-sm font-bold font-mono"
                                            style={{ color: card.accent }}
                                        >
                                            {item.step}
                                        </span>
                                        {i < card.process.length - 1 && (
                                            <motion.div
                                                className="w-[1px] h-6 mt-1"
                                                style={{ background: `${card.accent}30` }}
                                                initial={{ scaleY: 0 }}
                                                animate={{ scaleY: 1 }}
                                                transition={{ duration: 0.3, delay: 0.5 + i * 0.15 }}
                                            />
                                        )}
                                    </div>

                                    {/* Step content */}
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-semibold text-white mb-0.5">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Bottom glow */}
                    <div
                        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
                        style={{
                            background: `radial-gradient(ellipse at 50% 100%, ${card.accent}10 0%, transparent 70%)`,
                        }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function ValueProps() {
    return (
        <section className="relative w-full left-0 right-0 mx-auto py-20 md:py-32 px-6 md:px-12 bg-black overflow-hidden flex flex-col items-center">
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
                        <FlipCard key={card.title} card={card} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
