"use client";

import { motion } from "framer-motion";

export default function HexDomeLogo() {
    // Generate hexagons positioned on a hemisphere surface
    const hexagons: { x: number; y: number; z: number; rotateX: number; rotateY: number }[] = [];

    const numRings = 6;
    const radius = 60;

    // Create concentric rings of hexagons on hemisphere (phi from 0 to PI/2)
    for (let ring = 0; ring < numRings; ring++) {
        const phi = ((ring + 1) / numRings) * (Math.PI / 2); // 0 to 90 degrees
        const ringRadius = Math.sin(phi);
        const y = Math.cos(phi) * radius;

        // Number of hexagons in this ring (more at equator, fewer at pole)
        const numInRing = Math.max(4, Math.round(12 * ringRadius));

        for (let i = 0; i < numInRing; i++) {
            const theta = (i / numInRing) * Math.PI * 2;
            const x = Math.cos(theta) * ringRadius * radius;
            const z = Math.sin(theta) * ringRadius * radius;

            hexagons.push({
                x,
                y: -y, // Flip so dome faces up
                z,
                rotateX: (phi * 180) / Math.PI - 90,
                rotateY: (theta * 180) / Math.PI,
            });
        }
    }

    // Add top hexagon
    hexagons.push({ x: 0, y: -radius, z: 0, rotateX: -90, rotateY: 0 });

    return (
        <div className="relative w-[200px] h-[200px]" style={{ perspective: "600px" }}>
            {/* Spinning container */}
            <motion.div
                className="w-full h-full relative"
                style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                    transform: "rotateX(-25deg) rotateZ(15deg)" // Tilt to the right like logo
                }}
                animate={{ rotateY: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
                {/* Hexagons */}
                {hexagons.map((hex, i) => (
                    <div
                        key={i}
                        className="absolute left-1/2 top-1/2"
                        style={{
                            transform: `translate(-50%, -50%) translate3d(${hex.x}px, ${hex.y}px, ${hex.z}px) rotateY(${hex.rotateY}deg) rotateX(${hex.rotateX}deg)`,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 100 100">
                            <polygon
                                points="50 0 93 25 93 75 50 100 7 75 7 25"
                                fill="rgba(0, 255, 65, 0.3)"
                                stroke="#00FF41"
                                strokeWidth="4"
                                style={{
                                    filter: "drop-shadow(0 0 6px #00FF41)",
                                }}
                            />
                        </svg>
                    </div>
                ))}

                {/* Center glow */}
                <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(0,255,65,0.4) 0%, transparent 70%)",
                        filter: "blur(10px)",
                    }}
                />
            </motion.div>
        </div>
    );
}
