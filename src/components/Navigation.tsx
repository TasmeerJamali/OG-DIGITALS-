"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import HexDomeLogo from "@/components/HexDomeLogo";

type NavItem = {
    name: string;
    href: string;
    dropdown?: { name: string; href: string }[];
};

const navLinks: NavItem[] = [
    { name: "Work", href: "/work" },
    { name: "Services", href: "/services" },
    { name: "E-Book", href: "/ebook" },
    {
        name: "Case Studies",
        href: "#",
        dropdown: [
            { name: "Testimonials", href: "/testimonials" },
            { name: "Blogs", href: "/blog" },
            { name: "FAQs", href: "/faq" },
        ]
    },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
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
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
                    onMouseLeave={() => {
                        setIsHovered(false);
                        setActiveDropdown(null);
                    }}
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
                        className="flex items-center rounded-full relative overflow-visible"
                        style={{
                            background:
                                "linear-gradient(145deg, rgba(60,70,80,0.65) 0%, rgba(40,50,60,0.55) 50%, rgba(50,60,70,0.6) 100%)",
                            backdropFilter: "blur(20px) saturate(180%)",
                            WebkitBackdropFilter: "blur(20px) saturate(180%)",
                            padding: "6px 8px", // Reduced padding slightly to accommodate larger logo
                            height: "64px", // Fixed height for consistent alignment
                            boxShadow:
                                "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.2), 0 10px 40px rgba(0,0,0,0.3)",
                        }}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        {/* Top glossy highlight - creates the glass shine */}
                        <div
                            className="absolute inset-0 pointer-events-none rounded-full overflow-hidden"
                            style={{
                                background:
                                    "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 20%, transparent 45%)",
                            }}
                        />

                        {/* Bottom subtle shadow for depth */}
                        <div
                            className="absolute inset-0 pointer-events-none rounded-full overflow-hidden"
                            style={{
                                background:
                                    "linear-gradient(0deg, rgba(0,0,0,0.15) 0%, transparent 30%)",
                            }}
                        />

                        {/* Left/Right prism edge highlights */}
                        <div
                            className="absolute inset-0 pointer-events-none rounded-full overflow-hidden"
                            style={{
                                background:
                                    "linear-gradient(90deg, rgba(180,220,255,0.08) 0%, transparent 8%, transparent 92%, rgba(255,200,180,0.08) 100%)",
                            }}
                        />

                        {/* Logo - BIGGER & SPINNING */}
                        <div className="relative group/logo ml-1">
                            <Link
                                href="/"
                                className="relative flex items-center justify-center rounded-full transition-all duration-300"
                                style={{
                                    width: "55px", // Increased size
                                    height: "55px", // Increased size
                                    flexShrink: 0,
                                    zIndex: 1,
                                    background: "rgba(0,0,0,0.8)",
                                    border: "1px solid rgba(168,255,196,0.3)",
                                    boxShadow: "0 2px 8px rgba(168,255,196,0.3)",
                                    overflow: "hidden",
                                }}
                            >
                                <div className="scale-[0.3] pointer-events-none group-hover/logo:scale-[0.35] transition-transform duration-500">
                                    <HexDomeLogo />
                                </div>

                                {/* Inner Glow on Hover */}
                                <div className="absolute inset-0 bg-[#a8ffc4]/0 group-hover/logo:bg-[#a8ffc4]/10 transition-colors duration-300 rounded-full pointer-events-none" />
                            </Link>

                            {/* Home Indication Tooltip */}
                            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/90 border border-[#a8ffc4]/30 text-[#a8ffc4] text-[10px] font-mono tracking-widest rounded-md opacity-0 -translate-x-2 group-hover/logo:opacity-100 group-hover/logo:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-[0_0_15px_rgba(168,255,196,0.2)]">
                                HOME
                            </div>
                        </div>

                        {/* Nav Links */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                marginLeft: "16px",
                                marginRight: "16px",
                                position: "relative",
                                zIndex: 1,
                                height: "100%", // Full height for alignment
                            }}
                        >
                            {navLinks.map((link) => (
                                <div
                                    key={link.name}
                                    className="relative h-full flex items-center" // Centering container
                                    onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                                >
                                    {link.dropdown ? (
                                        <button
                                            className="text-white/75 hover:text-white transition-colors duration-200 flex items-center gap-1.5 h-full"
                                            style={{
                                                padding: "0 18px",
                                                fontSize: "14px",
                                                fontWeight: 500,
                                                whiteSpace: "nowrap",
                                                letterSpacing: "0.01em",
                                            }}
                                        >
                                            <span className="relative top-[1px]"><RollingText>{link.name}</RollingText></span>
                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === link.name ? "rotate-180" : ""}`} />
                                        </button>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="text-white/75 hover:text-white transition-colors duration-200 flex items-center h-full"
                                            style={{
                                                padding: "0 18px",
                                                fontSize: "14px",
                                                fontWeight: 500,
                                                whiteSpace: "nowrap",
                                                letterSpacing: "0.01em",
                                            }}
                                            onMouseEnter={() => setActiveDropdown(null)}
                                        >
                                            <span className="relative top-[1px]"><RollingText>{link.name}</RollingText></span>
                                        </Link>
                                    )}

                                    {/* Dropdown Menu - ENHANCED ANIMATION */}
                                    {/* Dropdown Menu - REFINED & SUPER CLEAN */}
                                    <AnimatePresence>
                                        {activeDropdown === link.name && link.dropdown && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                className="absolute top-[120%] left-[-20px] min-w-[240px] rounded-2xl overflow-hidden"
                                                style={{
                                                    background: "#0a0a0a",
                                                    border: "1px solid rgba(255,255,255,0.1)",
                                                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8)",
                                                    padding: "8px"
                                                }}
                                            >
                                                {/* Connecting bridge */}
                                                <div className="absolute top-[-20px] left-0 w-full h-[20px] bg-transparent" />

                                                <div className="flex flex-col gap-1">
                                                    {link.dropdown.map((item, i) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            className="relative flex items-center px-4 py-3 rounded-lg group overflow-hidden"
                                                        >
                                                            {/* Hover Background - Subtle Mint */}
                                                            <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                            {/* Text */}
                                                            <span className="relative z-10 text-sm font-medium text-white/60 group-hover:text-white transition-colors duration-300">
                                                                {item.name}
                                                            </span>

                                                            {/* Micro-Arrow on Hover */}
                                                            <motion.span
                                                                className="absolute right-3 text-[#a8ffc4] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                                                            >
                                                                →
                                                            </motion.span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button - Mint Green Arrow */}
                        <Link
                            href="/contact"
                            className="relative flex items-center justify-center rounded-full hover:scale-110 active:scale-95 transition-all duration-300 group"
                            style={{
                                width: "48px", // Match logo size
                                height: "48px", // Match logo size
                                flexShrink: 0,
                                zIndex: 1,
                                background: "rgba(0,0,0,0.6)",
                                border: "1px solid rgba(168,255,196,0.3)",
                                boxShadow: "0 2px 12px rgba(168,255,196,0.15)",
                                marginRight: "4px"
                            }}
                        >
                            <div className="absolute inset-0 rounded-full bg-[#a8ffc4] opacity-0 group-hover:opacity-10 transition-opacity" />
                            <svg
                                className="w-5 h-5 text-[#a8ffc4] group-hover:rotate-45 transition-transform duration-300"
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

            {/* Mobile Header - Deconstructed / Floating */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="fixed top-6 left-6 right-6 z-50 lg:hidden flex justify-between items-start pointer-events-none"
            >
                {/* Floating Logo - Left */}
                <Link
                    href="/"
                    className="pointer-events-auto relative flex items-center justify-center rounded-full transition-transform active:scale-95"
                    style={{
                        width: "48px",
                        height: "48px",
                        background: "rgba(10,10,10,0.6)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    }}
                >
                    <div className="scale-[0.25]">
                        <HexDomeLogo />
                    </div>
                </Link>

                {/* Floating Menu Trigger - Right */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="pointer-events-auto relative flex flex-col justify-center items-center rounded-full transition-all active:scale-95 group"
                    style={{
                        width: "48px",
                        height: "48px",
                        gap: "5px",
                        background: isMenuOpen ? "transparent" : "rgba(10,10,10,0.6)",
                        backdropFilter: isMenuOpen ? "none" : "blur(12px)",
                        border: isMenuOpen ? "none" : "1px solid rgba(255,255,255,0.1)",
                        boxShadow: isMenuOpen ? "none" : "0 4px 20px rgba(0,0,0,0.2)",
                    }}
                >
                    <motion.span
                        style={{
                            width: "20px",
                            height: "2px",
                            background: "white",
                            borderRadius: "2px",
                            originX: 0.5,
                        }}
                        animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    />
                    <motion.span
                        style={{
                            width: "20px",
                            height: "2px",
                            background: "white",
                            borderRadius: "2px",
                        }}
                        animate={isMenuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                    />
                    <motion.span
                        style={{
                            width: "20px",
                            height: "2px",
                            background: "white",
                            borderRadius: "2px",
                            originX: 0.5,
                        }}
                        animate={
                            isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                        }
                    />
                </button>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 lg:hidden overflow-y-auto"
                        style={{
                            background: "rgba(0,0,0,0.95)",
                            backdropFilter: "blur(20px)",
                            paddingTop: "100px",
                            paddingBottom: "40px"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                minHeight: "100%",
                                gap: "32px",
                            }}
                        >
                            {navLinks.map((link, index) => (
                                <div key={link.name} className="flex flex-col items-center gap-4">
                                    {link.dropdown ? (
                                        <>
                                            <motion.button
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                className="text-white font-semibold text-2xl flex items-center gap-2"
                                                onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                                            >
                                                {link.name}
                                                <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                                            </motion.button>

                                            <AnimatePresence>
                                                {activeDropdown === link.name && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="flex flex-col items-center gap-4 overflow-hidden"
                                                    >
                                                        {link.dropdown.map((item) => (
                                                            <Link
                                                                key={item.name}
                                                                href={item.href}
                                                                onClick={() => setIsMenuOpen(false)}
                                                                className="text-white/60 hover:text-[#a8ffc4] text-xl"
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        <motion.div
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
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
