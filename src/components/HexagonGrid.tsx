"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Hexagon {
    x: number;
    y: number;
    opacity: number;
    scale: number;
    targetOpacity: number;
    targetScale: number;
}

export default function HexagonGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hexagons, setHexagons] = useState<Hexagon[]>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const animationRef = useRef<number>();

    // Generate hexagon grid
    useEffect(() => {
        const hexSize = 40;
        const rows = 12;
        const cols = 10;
        const newHexagons: Hexagon[] = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const offset = row % 2 === 0 ? 0 : hexSize * 0.866;
                newHexagons.push({
                    x: col * hexSize * 1.732 + offset,
                    y: row * hexSize * 1.5,
                    opacity: 0.03 + Math.random() * 0.05,
                    scale: 1,
                    targetOpacity: 0.03 + Math.random() * 0.05,
                    targetScale: 1,
                });
            }
        }
        setHexagons(newHexagons);
    }, []);

    // Handle mouse move
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    // Animate hexagons based on mouse position
    useEffect(() => {
        if (!isHovering) return;

        const animate = () => {
            setHexagons(prev => prev.map(hex => {
                const dx = mousePos.x - hex.x;
                const dy = mousePos.y - hex.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                let targetOpacity = 0.03;
                let targetScale = 1;

                if (distance < maxDistance) {
                    const intensity = 1 - distance / maxDistance;
                    targetOpacity = 0.1 + intensity * 0.9;
                    targetScale = 1 + intensity * 0.3;
                }

                // Smooth interpolation
                const newOpacity = hex.opacity + (targetOpacity - hex.opacity) * 0.15;
                const newScale = hex.scale + (targetScale - hex.scale) * 0.15;

                return {
                    ...hex,
                    opacity: newOpacity,
                    scale: newScale,
                    targetOpacity,
                    targetScale,
                };
            }));

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [mousePos, isHovering]);

    // Reset hexagons when mouse leaves
    useEffect(() => {
        if (isHovering) return;

        const reset = () => {
            setHexagons(prev => {
                let needsUpdate = false;
                const updated = prev.map(hex => {
                    const baseOpacity = 0.03 + Math.random() * 0.02;
                    if (Math.abs(hex.opacity - baseOpacity) > 0.01 || Math.abs(hex.scale - 1) > 0.01) {
                        needsUpdate = true;
                        return {
                            ...hex,
                            opacity: hex.opacity + (baseOpacity - hex.opacity) * 0.08,
                            scale: hex.scale + (1 - hex.scale) * 0.08,
                        };
                    }
                    return hex;
                });

                if (needsUpdate) {
                    animationRef.current = requestAnimationFrame(reset);
                }
                return updated;
            });
        };

        animationRef.current = requestAnimationFrame(reset);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isHovering]);

    return (
        <div
            ref={containerRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[600px] hidden lg:block"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ cursor: "crosshair" }}
        >
            {/* Glow effect behind hexagons */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                    opacity: isHovering ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                style={{
                    background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(168,255,196,0.15) 0%, transparent 40%)`,
                }}
            />

            {/* Hexagon grid */}
            <svg
                className="w-full h-full"
                viewBox="0 0 600 700"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    {/* Hexagon shape */}
                    <polygon
                        id="hexagon"
                        points="30,0 60,17.32 60,51.96 30,69.28 0,51.96 0,17.32"
                    />
                    {/* Glow filter */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {hexagons.map((hex, index) => (
                    <g
                        key={index}
                        transform={`translate(${hex.x}, ${hex.y}) scale(${hex.scale})`}
                        style={{ transformOrigin: "30px 34.64px" }}
                    >
                        <use
                            href="#hexagon"
                            fill="none"
                            stroke="#a8ffc4"
                            strokeWidth="1.5"
                            opacity={hex.opacity}
                            filter={hex.opacity > 0.3 ? "url(#glow)" : undefined}
                        />
                    </g>
                ))}

                {/* Center "G" shape - larger hexagons forming the logo */}
                <g opacity={isHovering ? 0.6 : 0.15} style={{ transition: "opacity 0.5s" }}>
                    {/* G shape made of filled hexagons */}
                    {[
                        // Top arc
                        { x: 280, y: 120 }, { x: 320, y: 120 }, { x: 360, y: 140 },
                        // Left side
                        { x: 240, y: 160 }, { x: 220, y: 210 }, { x: 220, y: 260 },
                        { x: 220, y: 310 }, { x: 240, y: 360 },
                        // Bottom arc
                        { x: 280, y: 400 }, { x: 320, y: 400 }, { x: 360, y: 380 },
                        // Right side (lower)
                        { x: 380, y: 330 }, { x: 380, y: 280 },
                        // Middle bar
                        { x: 320, y: 280 }, { x: 360, y: 280 },
                    ].map((pos, i) => (
                        <use
                            key={`g-${i}`}
                            href="#hexagon"
                            transform={`translate(${pos.x}, ${pos.y}) scale(0.5)`}
                            fill="#a8ffc4"
                            opacity={0.8}
                            filter="url(#glow)"
                        />
                    ))}
                </g>
            </svg>

            {/* Interactive hint */}
            <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase"
                style={{ color: "rgba(168,255,196,0.4)" }}
                animate={{ opacity: isHovering ? 0 : 1 }}
                transition={{ duration: 0.3 }}
            >
                Move cursor
            </motion.div>
        </div>
    );
}
