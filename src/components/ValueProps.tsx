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
                {/* Abstract UI: Dashboard Stats */}
                <div className="absolute inset-x-8 top-12 bottom-0 border-t border-x border-white/10 rounded-t-lg bg-white/5 backdrop-blur-sm p-4">
                    <div className="flex gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                    <div className="space-y-3">
                        <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                        <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                        <div className="flex gap-2 mt-4">
                            <div className="h-16 w-full bg-[#a8ffc4]/10 rounded border border-[#a8ffc4]/20 relative overflow-hidden">
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 bg-[#a8ffc4]/20"
                                    initial={{ height: "20%" }}
                                    whileInView={{ height: "60%" }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                />
                            </div>
                            <div className="h-16 w-full bg-white/5 rounded border border-white/10" />
                        </div>
                    </div>
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
                {/* Abstract UI: Feed/Cards */}
                <div className="absolute inset-0 flex flex-col gap-3 p-6 opacity-80">
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="h-12 w-full bg-white/5 border border-white/10 rounded-lg flex items-center px-3 gap-3"
                    >
                        <div className="w-6 h-6 rounded bg-[#a8ffc4]/20" />
                        <div className="h-2 w-24 bg-white/10 rounded-full" />
                    </motion.div>
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="h-12 w-full bg-white/5 border border-white/10 rounded-lg flex items-center px-3 gap-3 ml-4"
                    >
                        <div className="w-6 h-6 rounded bg-purple-500/20" />
                        <div className="h-2 w-20 bg-white/10 rounded-full" />
                    </motion.div>
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="h-12 w-full bg-white/5 border border-white/10 rounded-lg flex items-center px-3 gap-3"
                    >
                        <div className="w-6 h-6 rounded bg-blue-500/20" />
                        <div className="h-2 w-16 bg-white/10 rounded-full" />
                    </motion.div>
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
                {/* Abstract UI: Nodes/Network */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="relative w-48 h-48 border border-dashed border-white/10 rounded-full flex items-center justify-center"
                >
                    <div className="absolute w-2 h-2 bg-[#a8ffc4] rounded-full top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#a8ffc4]" />
                    <div className="absolute w-2 h-2 bg-white/20 rounded-full bottom-0 left-1/2 -translate-x-1/2" />
                    <div className="absolute w-2 h-2 bg-white/20 rounded-full top-1/2 right-0 translate-x-1/2" />

                    <div className="w-32 h-32 border border-white/5 rounded-full flex items-center justify-center">
                        <div className="w-12 h-12 bg-[#a8ffc4]/10 rounded-full backdrop-blur-md border border-[#a8ffc4]/20" />
                    </div>
                </motion.div>
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
                    className="mb-16 md:mb-24 text-center md:text-left"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-6">
                        Dominate the <span className="text-[#a8ffc4]">Feed.</span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl">
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
                            className="group relative h-[480px] rounded-3xl bg-[#0F0F0F] border border-white/5 overflow-hidden hover:border-white/10 transition-colors duration-500 flex flex-col"
                        >
                            {/* Visual Area (Top 55%) */}
                            <div className="h-[55%] w-full border-b border-white/5 relative group-hover:bg-white/[0.02] transition-colors">
                                {card.visual}
                                {/* Top Gradient Overlay */}
                                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0F0F0F] to-transparent opacity-50" />
                            </div>

                            {/* Content Area (Bottom 45%) */}
                            <div className="h-[45%] p-8 flex flex-col items-start justify-between bg-gradient-to-b from-[#0F0F0F] to-black">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-3">
                                        {card.title}
                                    </h3>
                                    <p className="text-white/50 text-sm leading-relaxed line-clamp-3">
                                        {card.description}
                                    </p>
                                </div>

                                <Link
                                    href="/services"
                                    className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-[#a8ffc4] transition-colors mt-4"
                                >
                                    {card.link}
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
