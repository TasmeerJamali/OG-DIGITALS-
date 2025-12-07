"use client";

import Book3D from "@/components/Book3D";
import { motion } from "framer-motion";

export default function EbookPage() {
    return (
        <main className="bg-black min-h-screen selection:bg-[#a8ffc4] selection:text-black overflow-x-hidden">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#a8ffc4]/5 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-500/5 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-24 pt-32 pb-20 gap-12 lg:gap-24">

                {/* Left Content */}
                <div className="flex-1 max-w-2xl relative z-10 order-2 md:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-[#a8ffc4]/10 border border-[#a8ffc4]/20 rounded-full text-[#a8ffc4] text-xs font-bold uppercase tracking-wider">
                                New Release 2024
                            </span>
                            <span className="text-white/40 text-xs uppercase tracking-wider">
                                Limited Time Free Access
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] mb-8 tracking-tighter">
                            Unlock Digital <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8ffc4] to-[#60a5fa]">
                                Dominance.
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed max-w-lg">
                            The ultimate playbook for scaling your brand in the modern age.
                            50+ pages of actionable strategies, design secrets, and growth hacks used by top agencies.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-[#a8ffc4] text-black font-bold rounded-full text-lg shadow-[0_0_20px_rgba(168,255,196,0.3)] hover:shadow-[0_0_40px_rgba(168,255,196,0.5)] transition-shadow"
                            >
                                Get Your Free Copy
                            </motion.button>
                            <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-colors">
                                Read Preview
                            </button>
                        </div>

                        <div className="mt-8 flex items-center gap-4 text-sm text-white/40">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-neutral-800 border border-black flex items-center justify-center text-[10px] text-white font-bold">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <p>Join 2,000+ founders reading this.</p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Content - 3D Book */}
                <div className="flex-1 flex justify-center items-center relative z-10 order-1 md:order-2 perspective-1000">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <Book3D />
                    </motion.div>

                    {/* Decorative Circle Behind Book */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full animate-spin-slow -z-10 pointer-events-none" />
                </div>
            </section>

            {/* ===== WHAT'S INSIDE (BENTO GRID) ===== */}
            <section className="py-32 border-t border-white/5 relative z-10">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="text-center mb-20">
                        <span className="text-[#a8ffc4] text-sm font-bold uppercase tracking-widest mb-4 block">Inside the Playbook</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">Everything you need to win.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-neutral-900/50 border border-white/10 backdrop-blur-sm md:col-span-2"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#a8ffc4]/10 flex items-center justify-center text-[#a8ffc4] mb-6">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">High-Velocity Growth Strategies</h3>
                            <p className="text-white/60">Learn the exact frameworks we use to scale brands from zero to hero. No fluff, just actionable tactics you can implement today.</p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-neutral-900/50 border border-white/10 backdrop-blur-sm bg-gradient-to-b from-[#a8ffc4]/10 to-transparent"
                        >
                            <h3 className="text-6xl font-bold text-[#a8ffc4] mb-2">3X</h3>
                            <p className="text-white font-medium mb-1">Revenue Increase</p>
                            <p className="text-white/40 text-sm">Average impact on client revenue within 90 days.</p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-neutral-900/50 border border-white/10 backdrop-blur-sm"
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Design Systems</h3>
                            <p className="text-white/60 text-sm">How to build a visual identity that commands attention.</p>
                        </motion.div>

                        {/* Card 4 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-neutral-900/50 border border-white/10 backdrop-blur-sm md:col-span-2"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-[#a8ffc4] rounded-full" />
                                </div>
                                <span className="text-[#a8ffc4] font-mono text-sm">75% Complete</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Content Optimization</h3>
                            <p className="text-white/60">Stop guessing what works. Use data-driven content structures that algorithmically guarantee engagement.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== FINAL CTA ===== */}
            <section className="py-32 border-t border-white/5 relative bg-gradient-to-b from-black to-[#050505]">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
                        Claim Your Competitive <br />
                        <span className="text-[#a8ffc4]">Advantage.</span>
                    </h2>
                    <div className="max-w-md mx-auto">
                        <form className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Enter your work email"
                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#a8ffc4] transition-colors"
                            />
                            <button className="w-full py-4 bg-[#a8ffc4] text-black font-bold rounded-xl hover:bg-[#8feaaf] transition-colors">
                                Send Me the Playbook
                            </button>
                        </form>
                        <p className="mt-4 text-white/30 text-xs">No spam. Unsubscribe anytime.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
