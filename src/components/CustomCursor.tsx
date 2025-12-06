"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [mounted, setMounted] = useState(false);
    const [isPointer, setIsPointer] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Only run on client
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handlePointerCheck = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target) {
                const computedStyle = window.getComputedStyle(target);
                setIsPointer(
                    computedStyle.cursor === "pointer" ||
                    target.tagName === "A" ||
                    target.tagName === "BUTTON" ||
                    target.closest("a") !== null ||
                    target.closest("button") !== null
                );
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handlePointerCheck);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handlePointerCheck);
        };
    }, [mounted, cursorX, cursorY]);

    // Don't render anything on server or before mount
    if (!mounted) return null;

    return (
        <>
            {/* Main cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                {/* Outer ring */}
                <motion.div
                    className="absolute rounded-full border-2"
                    style={{ borderColor: "#a8ffc4" }}
                    animate={{
                        width: isPointer ? 50 : 40,
                        height: isPointer ? 50 : 40,
                        borderWidth: isPointer ? 2 : 1,
                        opacity: isPointer ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                />

                {/* Inner dot */}
                <motion.div
                    className="rounded-full"
                    style={{ backgroundColor: "#a8ffc4" }}
                    animate={{
                        width: isPointer ? 8 : 6,
                        height: isPointer ? 8 : 6,
                        scale: isPointer ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.15 }}
                />
            </motion.div>

            {/* Trail effect */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:block"
                style={{
                    x: useSpring(cursorX, { damping: 50, stiffness: 200 }),
                    y: useSpring(cursorY, { damping: 50, stiffness: 200 }),
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    className="rounded-full"
                    style={{ backgroundColor: "rgba(168, 255, 196, 0.1)" }}
                    animate={{
                        width: isPointer ? 80 : 60,
                        height: isPointer ? 80 : 60,
                    }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </>
    );
}
