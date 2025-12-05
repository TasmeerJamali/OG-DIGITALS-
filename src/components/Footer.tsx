"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
    return (
        <footer id="contact" className="relative bg-black border-t border-white/5">
            {/* CTA Section */}
            <div className="py-24 px-8 md:px-16">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6"
                    >
                        Let&apos;s see if we are a good fit
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Link
                            href="mailto:hello@theogdigitals.com"
                            className="inline-block text-4xl md:text-6xl lg:text-7xl font-bold text-white hover:text-primary transition-colors duration-500"
                        >
                            Let&apos;s collaborate
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Marquee */}
            <div className="overflow-hidden border-y border-white/5 py-6">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {Array(10).fill(0).map((_, i) => (
                        <span key={i} className="text-xl md:text-2xl font-light text-white/20 mx-8">
                            Let&apos;s collaborate ·
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Footer Bottom */}
            <div className="py-12 px-8 md:px-16">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(57,255,20,0.5)]" />
                        <span className="text-sm font-medium tracking-widest text-white uppercase">
                            OG Digitals
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {["Work", "Services", "Culture", "Contact"].map((link) => (
                            <Link
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="text-sm text-white/40 hover:text-white transition-colors uppercase tracking-wider"
                            >
                                {link}
                            </Link>
                        ))}
                    </div>

                    {/* Email */}
                    <Link
                        href="mailto:hello@theogdigitals.com"
                        className="text-sm text-white/40 hover:text-primary transition-colors"
                    >
                        hello@theogdigitals.com
                    </Link>
                </div>

                {/* Copyright */}
                <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 text-center">
                    <p className="text-xs text-white/30">
                        © {new Date().getFullYear()} The OG Digitals. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
