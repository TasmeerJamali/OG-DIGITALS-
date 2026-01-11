"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Globe, Rocket } from "lucide-react";
import Link from "next/link";

const cards = [
    {
        title: "Strategic Vision",
        description: "We don't just design; we engineer digital dominance. Our process starts with deep market analysis to position you ahead of the curve.",
        icon: <Globe className="w-8 h-8 text-[#a8ffc4]" />,
        link: "Our Strategy",
        delay: 0
    },
    {
        title: "Agile Development",
        description: "Built for speed and scale. Our rapid iteration workflow ensures your product hits the market faster without compromising on quality.",
        icon: <Cpu className="w-8 h-8 text-[#a8ffc4]" />,
        link: "How we build",
        delay: 0.1
    },
    {
        title: "Scalable Growth",
        description: "Launch is just the beginning. We integrate data-driven feedback loops to act as your long-term growth partner.",
        icon: <Rocket className="w-8 h-8 text-[#a8ffc4]" />,
        link: "See results",
        delay: 0.2
    }
];

export default function ValueProps() {
    return (
        <section className="relative py-32 px-6 md:px-12 bg-black overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#a8ffc4]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-24"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-6">
                        Code your way <span className="text-[#a8ffc4]">to success.</span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl">
                        With multiple ways to interact, we adapt to your workflow. Whether you need a full-scale platform or a strategic pivot, we have the tools.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: card.delay, duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-colors duration-500"
                        >
                            {/* Hover Gradient Bloom */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#a8ffc4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Icon */}
                            <div className="relative z-10 w-16 h-16 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-10 group-hover:border-[#a8ffc4]/50 transition-colors duration-500">
                                {card.icon}
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col">
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#a8ffc4] transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-white/50 mb-8 leading-relaxed">
                                    {card.description}
                                </p>

                                <div className="mt-auto pt-8 border-t border-white/10 group-hover:border-[#a8ffc4]/30 transition-colors">
                                    <Link href="/services" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white group-hover:text-[#a8ffc4] transition-colors">
                                        {card.link}
                                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
