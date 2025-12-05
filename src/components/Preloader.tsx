"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");

    useEffect(() => {
        // Phase 1: Show the organic blob animation (3 seconds)
        const loadingTimer = setTimeout(() => {
            setPhase("reveal");
        }, 3000);

        return () => clearTimeout(loadingTimer);
    }, []);

    useEffect(() => {
        if (phase === "reveal") {
            // Phase 2: Curtain reveal animation (1 second)
            const revealTimer = setTimeout(() => {
                setPhase("done");
                onComplete();
            }, 1000);
            return () => clearTimeout(revealTimer);
        }
    }, [phase, onComplete]);

    return (
        <AnimatePresence>
            {phase !== "done" && (
                <>
                    {/* Top Curtain */}
                    <motion.div
                        className="fixed top-0 left-0 right-0 h-1/2 bg-black z-[100]"
                        initial={{ y: 0 }}
                        animate={phase === "reveal" ? { y: "-100%" } : { y: 0 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    />
                    {/* Bottom Curtain */}
                    <motion.div
                        className="fixed bottom-0 left-0 right-0 h-1/2 bg-black z-[100]"
                        initial={{ y: 0 }}
                        animate={phase === "reveal" ? { y: "100%" } : { y: 0 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    />

                    {/* Center Content */}
                    <motion.div
                        className="fixed inset-0 z-[101] flex flex-col items-center justify-center bg-black"
                        initial={{ opacity: 1 }}
                        animate={phase === "reveal" ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Organic Blob */}
                        <motion.div
                            className="relative w-32 h-32 mb-8"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                                <defs>
                                    <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#39ff14" />
                                        <stop offset="100%" stopColor="#00ff88" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <motion.path
                                    fill="url(#blobGradient)"
                                    filter="url(#glow)"
                                    animate={{
                                        d: [
                                            "M47.5,-57.2C59.9,-46.8,67.3,-30.5,70.1,-13.3C72.9,3.9,71.1,22,62.4,35.8C53.7,49.6,38.1,59.1,21.3,65.1C4.5,71.1,-13.5,73.6,-29.7,68.4C-45.9,63.2,-60.3,50.3,-68.4,34.1C-76.5,17.9,-78.3,-1.6,-73.1,-18.8C-67.9,-36,-55.7,-50.9,-41.4,-60.8C-27.1,-70.7,-10.7,-75.6,3.8,-80.1C18.3,-84.6,35.1,-67.6,47.5,-57.2Z",
                                            "M44.7,-52.8C57.4,-42.9,66.7,-28.3,70.3,-12C73.9,4.3,71.8,22.3,62.8,36.1C53.8,49.9,37.9,59.5,20.7,65.5C3.5,71.5,-15,73.9,-30.8,68.1C-46.6,62.3,-59.7,48.3,-67.2,32C-74.7,15.7,-76.6,-2.9,-71.4,-19.2C-66.2,-35.5,-53.9,-49.5,-39.7,-59.1C-25.5,-68.7,-9.4,-73.9,3.9,-78.5C17.2,-83.1,32,-62.7,44.7,-52.8Z",
                                            "M47.5,-57.2C59.9,-46.8,67.3,-30.5,70.1,-13.3C72.9,3.9,71.1,22,62.4,35.8C53.7,49.6,38.1,59.1,21.3,65.1C4.5,71.1,-13.5,73.6,-29.7,68.4C-45.9,63.2,-60.3,50.3,-68.4,34.1C-76.5,17.9,-78.3,-1.6,-73.1,-18.8C-67.9,-36,-55.7,-50.9,-41.4,-60.8C-27.1,-70.7,-10.7,-75.6,3.8,-80.1C18.3,-84.6,35.1,-67.6,47.5,-57.2Z",
                                        ],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    transform="translate(100 100)"
                                />
                            </svg>
                        </motion.div>

                        {/* Text */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <h1 className="text-2xl md:text-3xl font-light tracking-[0.5em] text-white/90 uppercase">
                                The OG Digitals
                            </h1>
                        </motion.div>

                        {/* Loading indicator */}
                        <motion.div
                            className="absolute bottom-20 left-1/2 -translate-x-1/2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <motion.div
                                className="w-24 h-[2px] bg-white/20 rounded-full overflow-hidden"
                            >
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2.5, ease: "easeInOut" }}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
