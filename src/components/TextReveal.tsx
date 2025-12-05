"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextRevealProps {
    children: string;
    className?: string;
}

export default function TextReveal({ children, className = "" }: TextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.9", "start 0.25"],
    });

    const words = children.split(" ");

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <p className="flex flex-wrap">
                {words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + 1 / words.length;
                    return (
                        <Word key={i} progress={scrollYProgress} range={[start, end]}>
                            {word}
                        </Word>
                    );
                })}
            </p>
        </div>
    );
}

interface WordProps {
    children: string;
    progress: ReturnType<typeof useScroll>["scrollYProgress"];
    range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
    const opacity = useTransform(progress, range, [0.2, 1]);
    const y = useTransform(progress, range, [20, 0]);

    return (
        <span className="relative mr-3 mt-1">
            <motion.span
                style={{ opacity, y }}
                className="inline-block"
            >
                {children}
            </motion.span>
        </span>
    );
}
