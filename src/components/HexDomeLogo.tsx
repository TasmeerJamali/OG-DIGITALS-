"use client";

import { motion } from "framer-motion";

export default function HexDomeLogo() {
    return (
        <div className="relative w-48 h-48 perspective-[1000px] transform-style-3d group">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#00FF41] rounded-full blur-[60px] opacity-20 animate-pulse-slow"></div>

            <motion.div
                className="w-full h-full relative transform-style-3d"
                animate={{ rotateY: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
                {/* Generating Hexagons on a Hemisphere Surface */}
                {Array.from({ length: 32 }).map((_, i) => {
                    // Golden Angle / Fibonacci Hemisphere Algorithm
                    // To get a hemisphere, we adjust the range of phi or simply shift the points
                    const numPoints = 32;
                    const phi = Math.acos(1 - (i / numPoints)); // 0 to PI/2 approx for hemisphere (top half)
                    const theta = Math.sqrt(numPoints * Math.PI) * phi;
                    const r = 60; // Radius

                    // Convert to Cartesian
                    const x = r * Math.cos(theta) * Math.sin(phi);
                    const y = r * Math.sin(theta) * Math.sin(phi) - 20; // Shift up slightly
                    const z = r * Math.cos(phi);

                    return (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-6 h-6 -ml-3 -mt-3 transform-style-3d backface-visible"
                            style={{
                                transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${theta}rad) rotateX(${phi}rad)`,
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.6 + Math.random() * 0.4 }}
                            transition={{ delay: i * 0.05, duration: 0.5 }}
                        >
                            <div className="w-full h-full relative group/hex transition-transform duration-300">
                                {/* Hexagon Shape */}
                                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_2px_#00FF41]">
                                    <polygon
                                        points="50 0 93 25 93 75 50 100 7 75 7 25"
                                        className="fill-[#00FF41]/10 stroke-[#00FF41] stroke-[4] hover:fill-[#00FF41] transition-colors duration-300"
                                    />
                                </svg>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            <style jsx>{`
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-visible { backface-visibility: visible; }
                .perspective-\[1000px\] { perspective: 1000px; }
            `}</style>
        </div>
    );
}
