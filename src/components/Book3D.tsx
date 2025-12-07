"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function Book3D() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = event.clientX - rect.left;
        const mouseYVal = event.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            className="perspective-1000 relative w-[300px] h-[450px] md:w-[400px] md:h-[600px] cursor-grab active:cursor-grabbing"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d"
            }}
        >
            <motion.div
                className="w-full h-full relative"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Front Cover */}
                <div
                    className="absolute inset-0 bg-black rounded-r-xl rounded-l-md shadow-2xl overflow-hidden backface-hidden"
                    style={{ transform: "translateZ(25px)" }}
                >
                    <img
                        src="/assets/ebook-cover.png"
                        alt="Ebook Cover"
                        className="w-full h-full object-cover"
                    />

                    {/* Gloss Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50 mix-blend-overlay pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40 pointer-events-none" />
                </div>

                {/* Spine */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-[50px] bg-neutral-900 origin-left"
                    style={{
                        transform: "rotateY(-90deg) translateX(-25px)",
                        background: "linear-gradient(to right, #111, #333, #111)"
                    }}
                >
                    <div className="h-full flex items-center justify-center">
                        <span className="text-white/30 text-xs tracking-[0.5em] uppercase rotate-90 whitespace-nowrap">
                            The OG Digitals • Playbook
                        </span>
                    </div>
                </div>

                {/* Pages (Side View) */}
                <div
                    className="absolute right-0 top-[2px] bottom-[2px] w-[50px] bg-white transform origin-right"
                    style={{
                        transform: "rotateY(-90deg) translateX(25px)",
                        background: "linear-gradient(to right, #eee, #f5f5f5, #eee)"
                    }}
                />

                {/* Pages (Top View) */}
                <div
                    className="absolute top-0 left-[2px] right-[2px] h-[50px] bg-white origin-top"
                    style={{
                        transform: "rotateX(90deg) translateY(-25px)",
                        background: "linear-gradient(to bottom, #eee, #f5f5f5, #eee)"
                    }}
                />

                {/* Pages (Bottom View) */}
                <div
                    className="absolute bottom-0 left-[2px] right-[2px] h-[50px] bg-white origin-bottom"
                    style={{
                        transform: "rotateX(-90deg) translateY(25px)",
                        background: "linear-gradient(to top, #eee, #f5f5f5, #eee)"
                    }}
                />

                {/* Back Cover (basic) */}
                <div
                    className="absolute inset-0 bg-[#111] rounded-l-xl rounded-r-md"
                    style={{ transform: "translateZ(-25px) rotateY(180deg)" }}
                >
                    <div className="w-full h-full flex items-center justify-center p-8 border border-white/10">
                        <div className="text-center">
                            <div className="w-16 h-16 border border-[#a8ffc4] rounded-full mx-auto mb-4 flex items-center justify-center text-[#a8ffc4]">
                                OG
                            </div>
                            <p className="text-white/30 text-xs tracking-widest uppercase">The Digital Dominance Playbook</p>
                        </div>
                    </div>
                </div>

                {/* Shadow */}
                <div
                    className="absolute -bottom-20 left-10 right-10 h-10 bg-black/50 blur-2xl rounded-[50%]"
                    style={{ transform: "translateZ(-60px)" }}
                />
            </motion.div>
        </motion.div>
    );
}
