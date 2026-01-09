"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HexDomeLogo from "@/components/HexDomeLogo";

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
                        {/* 3D Hex Dome Logo */}
                        <motion.div
                            className="relative mb-8"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <HexDomeLogo />
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
