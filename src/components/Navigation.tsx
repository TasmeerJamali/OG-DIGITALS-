"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "Culture", href: "#culture" },
    { name: "Contact Us", href: "#contact" },
];

// Rolling text animation component
function RollingText({ children }: { children: string }) {
    return (
        <span className="relative inline-block overflow-hidden group">
            <span className="inline-flex transition-transform duration-300 ease-out group-hover:-translate-y-full">
                {children.split("").map((char, i) => (
                    <span
                        key={i}
                        className="inline-block transition-transform duration-300"
                        style={{ transitionDelay: `${i * 20}ms` }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </span>
            <span className="absolute left-0 top-full inline-flex transition-transform duration-300 ease-out group-hover:-translate-y-full text-white">
                {children.split("").map((char, i) => (
                    <span
                        key={i}
                        className="inline-block transition-transform duration-300"
                        style={{ transitionDelay: `${i * 20}ms` }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </span>
        </span>
    );
}

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            {/* Desktop - Centered Glass Pill Navbar */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1, ease: [0.25, 1, 0.5, 1] }}
                className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden lg:block"
            >
                {/* Main wrapper */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Lightsaber border container */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            inset: "-1.5px",
                            overflow: "hidden",
                        }}
                    >
                        <motion.div
                            style={{
                                position: "absolute",
                                width: "150%",
                                height: "400%",
                                top: "-150%",
                                left: "-25%",
                                background:
                                    "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 320deg, rgba(180,255,200,0.8) 340deg, #a8ffc4 350deg, rgba(180,255,200,0.8) 360deg)",
                            }}
                            animate={{
                                rotate: isHovered ? 360 : 0,
                            }}
                            transition={{
                                duration: 2.5,
                                ease: "linear",
                                repeat: isHovered ? Infinity : 0,
                            }}
                        />
                    </div>

                    {/* Static border when not hovered */}
                    <div
                        className="absolute rounded-full pointer-events-none transition-opacity duration-300"
                        style={{
                            inset: "-1px",
                            background:
                                "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.25) 100%)",
                            opacity: isHovered ? 0 : 1,
                        }}
                    />

                    {/* Inner glass container - Premium Glossy Effect */}
                    <div
                        className="flex items-center rounded-full cursor-pointer relative overflow-hidden"
                        style={{
                            background:
                                "linear-gradient(145deg, rgba(60,70,80,0.65) 0%, rgba(40,50,60,0.55) 50%, rgba(50,60,70,0.6) 100%)",
                            backdropFilter: "blur(20px) saturate(180%)",
                            WebkitBackdropFilter: "blur(20px) saturate(180%)",
                            padding: "6px 10px",
                            boxShadow:
                                "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.2), 0 10px 40px rgba(0,0,0,0.3)",
                        }}
                    >
                        {/* Top glossy highlight - creates the glass shine */}
                        <div
                            className="absolute inset-0 pointer-events-none rounded-full"
                            style={{
                                background:
                                    "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 20%, transparent 45%)",
                            }}
                        />

                        {/* Bottom subtle shadow for depth */}
                        <div
                            className="absolute inset-0 pointer-events-none rounded-full"
                            style={{
                                background:
                                    "linear-gradient(0deg, rgba(0,0,0,0.15) 0%, transparent 30%)",
                            }}
                        />

                        {/* Left/Right prism edge highlights */}
                        <div
                            className="absolute inset-0 pointer-events-none rounded-full"
                            style={{
                                background:
                                    "linear-gradient(90deg, rgba(180,220,255,0.08) 0%, transparent 8%, transparent 92%, rgba(255,200,180,0.08) 100%)",
                            }}
                        />

                        {/* Logo - Mint Green */}
                        <Link
                            href="/"
                            className="relative flex items-center justify-center rounded-full hover:scale-105 transition-transform duration-300"
                            style={{
                                width: "34px",
                                height: "34px",
                                flexShrink: 0,
                                zIndex: 1,
                                background: "linear-gradient(135deg, #a8ffc4 0%, #7affb8 100%)",
                                boxShadow: "0 2px 8px rgba(168,255,196,0.3)",
                            }}
                        >
                            <svg
                                className="w-4 h-4 text-black"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </Link>

                        {/* Nav Links */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0px",
                                marginLeft: "12px",
                                marginRight: "12px",
                                position: "relative",
                                zIndex: 1,
                            }}
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-white/75 hover:text-white transition-colors duration-200"
                                    style={{
                                        padding: "10px 22px",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        whiteSpace: "nowrap",
                                        letterSpacing: "0.01em",
                                    }}
                                >
                                    <RollingText>{link.name}</RollingText>
                                </Link>
                            ))}
                        </div>

                        {/* CTA Button - Mint Green */}
                        <Link
                            href="#contact"
                            className="relative flex items-center justify-center rounded-full hover:scale-105 transition-transform duration-300"
                            style={{
                                width: "34px",
                                height: "34px",
                                flexShrink: 0,
                                zIndex: 1,
                                background: "linear-gradient(135deg, #a8ffc4 0%, #7affb8 100%)",
                                boxShadow: "0 2px 8px rgba(168,255,196,0.3)",
                            }}
                        >
                            <svg
                                className="w-4 h-4 text-black"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7 17L17 7M17 7H7M17 7V17"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Header */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="fixed top-4 left-4 right-4 z-50 lg:hidden"
            >
                <div className="relative rounded-full" style={{ padding: "1px" }}>
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.2) 100%)",
                        }}
                    />
                    <div
                        className="flex items-center justify-between rounded-full relative overflow-hidden"
                        style={{
                            background:
                                "linear-gradient(145deg, rgba(60,70,80,0.7) 0%, rgba(40,50,60,0.6) 50%, rgba(50,60,70,0.65) 100%)",
                            backdropFilter: "blur(20px) saturate(180%)",
                            WebkitBackdropFilter: "blur(20px) saturate(180%)",
                            padding: "6px 10px",
                            boxShadow:
                                "inset 0 1px 1px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.25)",
                        }}
                    >
                        <div
                            className="absolute inset-0 pointer-events-none rounded-full"
                            style={{
                                background:
                                    "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 40%)",
                            }}
                        />

                        <Link
                            href="/"
                            className="relative flex items-center justify-center rounded-full"
                            style={{
                                width: "32px",
                                height: "32px",
                                zIndex: 1,
                                background: "linear-gradient(135deg, #a8ffc4 0%, #7affb8 100%)",
                            }}
                        >
                            <svg
                                className="w-4 h-4 text-black"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </Link>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="relative flex flex-col justify-center items-center"
                            style={{ width: "32px", height: "32px", gap: "5px", zIndex: 1 }}
                        >
                            <motion.span
                                style={{
                                    width: "18px",
                                    height: "2px",
                                    background: "white",
                                    borderRadius: "2px",
                                }}
                                animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                            />
                            <motion.span
                                style={{
                                    width: "18px",
                                    height: "2px",
                                    background: "white",
                                    borderRadius: "2px",
                                }}
                                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            />
                            <motion.span
                                style={{
                                    width: "18px",
                                    height: "2px",
                                    background: "white",
                                    borderRadius: "2px",
                                }}
                                animate={
                                    isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                                }
                            />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 lg:hidden"
                        style={{
                            background: "rgba(0,0,0,0.95)",
                            backdropFilter: "blur(20px)",
                            paddingTop: "100px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                                gap: "32px",
                            }}
                        >
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        style={{ fontSize: "28px", fontWeight: 600, color: "white" }}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
