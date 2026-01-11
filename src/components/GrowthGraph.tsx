"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GrowthGraph() {
    // Data points simulating growth
    const bars = [
        { label: "SEO", height: 150, delay: 0.2, color: "rgba(255,255,255,0.2)" },
        { label: "PPC", height: 220, delay: 0.4, color: "rgba(255,255,255,0.2)" },
        { label: "Content", height: 180, delay: 0.6, color: "rgba(255,255,255,0.2)" },
        { label: "Social", height: 350, delay: 0.8, color: "#a8ffc4" }, // Highlighted core service
        { label: "Brand", height: 280, delay: 1.0, color: "rgba(255,255,255,0.2)" },
    ];

    const [activeTick, setActiveTick] = useState(0);

    // Simulate a "scanning" or "processing" effect
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveTick((prev) => (prev + 1) % 20);
        }, 200);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto h-[400px] relative flex items-end justify-center gap-8 md:gap-16 px-4 my-20">
            {/* Background horizontal grid lines removed */}

            {/* Bars */}
            {bars.map((bar, index) => (
                <div key={index} className="relative flex flex-col items-center justify-end h-full z-10 group">
                    {/* The Bar */}
                    <div className="relative w-2 md:w-3 h-full flex items-end">
                        {/* Track/Rail */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/10" />

                        {/* Animated Line */}
                        <motion.div
                            className="w-full relative"
                            style={{ background: bar.color }}
                            initial={{ height: 0 }}
                            whileInView={{ height: bar.height }}
                            transition={{
                                duration: 1.5,
                                delay: bar.delay,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            viewport={{ once: true }}
                        >
                            {/* Glowing Tip */}
                            <motion.div
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 -mt-2 opacity-0"
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    duration: 2,
                                    delay: bar.delay + 1.5,
                                    repeat: Infinity
                                }}
                                style={{
                                    background: `radial-gradient(circle, ${bar.color} 0%, transparent 70%)`
                                }}
                            />

                            {/* Arrow at top */}
                            <div
                                className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent"
                                style={{ borderBottomColor: bar.color }}
                            />
                        </motion.div>
                    </div>

                    {/* Label */}
                    <div className="mt-6 text-center">
                        <span
                            className="text-xs uppercase tracking-widest font-mono block"
                            style={{
                                color: bar.label === "Social" ? "#a8ffc4" : "rgba(255,255,255,0.4)",
                                opacity: 0.7
                            }}
                        >
                            {bar.label}
                        </span>

                        {/* Percentage Mockup */}
                        <motion.span
                            className="text-[10px] text-white/20 font-mono block mt-1"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: bar.delay + 0.5 }}
                        >
                            +{Math.floor(bar.height / 3)}%
                        </motion.span>
                    </div>

                    {/* Dotted connection line to top */}
                    <motion.div
                        className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-t from-white/0 via-white/20 to-white/0"
                        style={{ height: "100%" }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: bar.delay }}
                    />
                </div>
            ))}

            {/* Overlay Text removed */}

        </div>
    );
}
