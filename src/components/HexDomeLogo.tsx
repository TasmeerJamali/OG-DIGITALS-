"use client";

import { motion } from "framer-motion";

// Hexagon component
function Hexagon({
    x,
    y,
    size,
    delay,
    glowIntensity = 1
}: {
    x: number;
    y: number;
    size: number;
    delay: number;
    glowIntensity?: number;
}) {
    // Hexagon points calculation
    const points = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const px = size / 2 + (size / 2) * Math.cos(angle);
        const py = size / 2 + (size / 2) * Math.sin(angle);
        return `${px},${py}`;
    }).join(" ");

    return (
        <motion.svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={{
                position: "absolute",
                left: x - size / 2,
                top: y - size / 2,
                filter: `drop-shadow(0 0 ${4 * glowIntensity}px #00FF41) drop-shadow(0 0 ${8 * glowIntensity}px #00FF41)`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                duration: 0.4,
                delay: delay,
                ease: [0.34, 1.56, 0.64, 1] // Bouncy overshoot
            }}
        >
            <polygon
                points={points}
                fill="rgba(0, 255, 65, 0.15)"
                stroke="#00FF41"
                strokeWidth="2"
            />
        </motion.svg>
    );
}

// Generate hex positions for a dome/half-sphere pattern
function generateDomeHexagons(centerX: number, centerY: number, radius: number, hexSize: number) {
    const hexagons: { x: number; y: number; delay: number; glow: number }[] = [];

    // Create rows of hexagons in a dome pattern
    const rows = 5;
    const hexWidth = hexSize * 0.9;
    const hexHeight = hexSize * 0.8;

    for (let row = 0; row < rows; row++) {
        // Calculate arc position for this row (dome curve)
        const rowProgress = row / (rows - 1);
        const arcAngle = Math.PI * rowProgress; // 0 to PI for half circle
        const rowRadius = radius * Math.sin(arcAngle);
        const rowY = centerY - radius * Math.cos(arcAngle) * 0.6 + row * hexHeight * 0.6;

        // Number of hexagons in this row (more in middle, fewer at edges)
        const hexCount = Math.max(1, Math.round(rowRadius / hexWidth * 2));

        for (let i = 0; i < hexCount; i++) {
            const offsetX = (i - (hexCount - 1) / 2) * hexWidth;
            const x = centerX + offsetX;

            // Stagger delay based on distance from center
            const distFromCenter = Math.abs(offsetX) / rowRadius;
            const delay = row * 0.05 + distFromCenter * 0.1;

            // Glow intensity - brighter in center
            const glow = 1 - distFromCenter * 0.5;

            hexagons.push({ x, y: rowY, delay, glow });
        }
    }

    return hexagons;
}

export default function HexDomeLogo() {
    const containerSize = 280;
    const centerX = containerSize / 2;
    const centerY = containerSize / 2 + 20;
    const radius = 100;
    const hexSize = 32;

    const hexagons = generateDomeHexagons(centerX, centerY, radius, hexSize);

    return (
        <div
            className="relative"
            style={{
                width: containerSize,
                height: containerSize,
            }}
        >
            {/* Central glow */}
            <motion.div
                className="absolute rounded-full bg-[#00FF41]"
                style={{
                    width: 60,
                    height: 60,
                    left: centerX - 30,
                    top: centerY - 30,
                    filter: "blur(30px)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ duration: 0.5 }}
            />

            {/* Hexagons */}
            {hexagons.map((hex, i) => (
                <Hexagon
                    key={i}
                    x={hex.x}
                    y={hex.y}
                    size={hexSize}
                    delay={hex.delay}
                    glowIntensity={hex.glow}
                />
            ))}

            {/* Outer glow ring */}
            <motion.div
                className="absolute border-2 border-[#00FF41]/30 rounded-full"
                style={{
                    width: containerSize - 40,
                    height: containerSize - 40,
                    left: 20,
                    top: 20,
                    boxShadow: "0 0 20px rgba(0, 255, 65, 0.2), inset 0 0 20px rgba(0, 255, 65, 0.1)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            />
        </div>
    );
}
