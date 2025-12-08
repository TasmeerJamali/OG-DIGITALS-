"use client";

import { useRef, useState, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
    AnimatePresence,
    useInView
} from "framer-motion";
import Book3D from "@/components/Book3D";

// --- SHARED COMPONENTS ---

function SectionHeader({ title, subtitle, align = "center" }: { title: string, subtitle?: string, align?: "center" | "left" }) {
    return (
        <div className={`mb-20 ${align === "center" ? "text-center" : "text-left"}`}>
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: "100px" }}
                    viewport={{ once: true }}
                    className={`h-1 bg-[#a8ffc4] mb-8 ${align === "center" ? "mx-auto" : ""}`}
                />
            )}
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    viewport={{ once: true }}
                    className={`text-xl text-white/60 max-w-2xl font-light leading-relaxed ${align === "center" ? "mx-auto" : ""}`}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}

function MagneticButton({ children, className, variant = "primary" }: { children: React.ReactNode; className?: string, variant?: "primary" | "secondary" }) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.35);
        y.set((clientY - centerY) * 0.35);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    const baseStyles = "relative overflow-hidden rounded-full font-bold transition-all duration-300 active:scale-95";
    const variants = {
        primary: "bg-[#a8ffc4] text-black hover:bg-white hover:shadow-[0_0_40px_rgba(168,255,196,0.4)]",
        secondary: "bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/50"
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}

function GlassCard({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay, ease: "easeOut" }}
            className={`group relative p-8 md:p-10 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden hover:bg-white/[0.05] transition-colors duration-500 ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#a8ffc4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative z-10 h-full">{children}</div>
        </motion.div>
    );
}

function CheckList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-4">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70">
                    <span className="text-[#a8ffc4] mt-1">✔</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

// 1. HERO (Refined)
function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center pt-48 pb-20 overflow-hidden bg-[#050505]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/ebookbg.png"
                    alt="Ebook Background"
                    className="w-full h-full object-cover opacity-100"
                />
                {/* Darker Gradient Overlay for text readability - Increased to 60% based on feedback */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center mt-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    {/* HIGH-TECH BADGE COMPONENT */}
                    <div className="relative mb-12 group inline-block cursor-default">
                        {/* Outer Glow/Pulse Layer */}
                        <div className="absolute inset-0 bg-[#00FF41] rounded-full blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse-slow"></div>

                        {/* Main Container */}
                        <div className="relative overflow-hidden rounded-full border border-[#00FF41]/80 bg-black/90 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,65,0.4),inset_0_0_20px_rgba(0,255,65,0.1)]">

                            {/* Animated Background Grid & Scanlines */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none z-0 mix-blend-screen">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: "linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)",
                                        backgroundSize: "20px 20px"
                                    }}
                                />
                                <div className="absolute inset-0 animate-scanline bg-gradient-to-b from-transparent via-[#00FF41]/10 to-transparent h-[200%] w-full" />
                            </div>

                            {/* Content Wrapper */}
                            <div className="relative z-10 py-3 px-10 flex items-center gap-4">
                                {/* Left Tech Indicator */}
                                <div className="w-1.5 h-1.5 bg-[#00FF41] rounded-full shadow-[0_0_10px_#00FF41] animate-ping" />

                                <span className="text-[#00FF41] font-mono font-bold text-sm tracking-[0.3em] uppercase drop-shadow-[0_0_5px_rgba(0,255,65,1)] group-hover:tracking-[0.4em] transition-all duration-300">
                                    Publish. Print. Prosper.
                                </span>

                                {/* Right Tech Indicator */}
                                <div className="w-1.5 h-1.5 bg-[#00FF41] rounded-full shadow-[0_0_10px_#00FF41] animate-ping delay-75" />
                            </div>

                            {/* Glitch Overlay Effect on Hover */}
                            <div className="absolute inset-0 bg-[#00FF41] opacity-0 group-hover:opacity-10 transition-opacity duration-100 mix-blend-overlay" />
                        </div>
                    </div>

                    {/* Headline - Tuned to fit in one line on large screens */}
                    {/* Headline - 3D Metallic Gradient & Depth */}
                    <h1
                        className="text-4xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-serif font-black mb-8 leading-none tracking-tight w-full max-w-[95vw] mx-auto bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-100 to-gray-400 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]"
                        style={{ textShadow: "0px 4px 10px rgba(255,255,255,0.1), 0px 10px 20px rgba(0,0,0,0.5)" }}
                    >
                        Professional eBook Creation & Design Services
                    </h1>

                    <p className="text-xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-16 font-medium drop-shadow-lg drop-shadow-black">
                        Turn your ideas into stunning, ready-to-sell eBooks with our writing, design, and publishing solutions.
                    </p>

                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-16 w-full">
                        {/* Primary Button - 3D Green Gloss */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group px-12 py-5 bg-gradient-to-b from-[#a8ffc4] to-[#00b359] rounded-full text-black text-2xl font-bold tracking-tight shadow-[0_6px_0_#008f47,0_15px_20px_rgba(0,255,100,0.3)] hover:shadow-[0_8px_0_#008f47,0_20px_30px_rgba(0,255,100,0.4)] active:translate-y-[6px] active:shadow-none transition-all duration-150 border-t border-white/50"
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                            <span className="relative z-10 flex items-center gap-3">
                                Get a Free Quote
                                <span className="text-3xl leading-[0] mb-1">→</span>
                            </span>
                        </motion.button>

                        {/* Secondary Button - 3D Frost Glass */}
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-5 text-2xl font-bold text-white rounded-full bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_6px_0_rgba(255,255,255,0.2),0_15px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_0_rgba(255,255,255,0.3),0_20px_30px_rgba(255,255,255,0.1)] active:translate-y-[6px] active:shadow-none transition-all duration-150"
                        >
                            View Samples
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Curve/Wave integration with next section */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />

            <style jsx>{`
                .animate-pulse-slow {
                    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes tilt {
                    0%, 50%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(1deg); }
                    75% { transform: rotate(-1deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.02); }
                }
            `}</style>
        </section >
    );
}

// 2. WHY CHOOSE US
// 2. WHY CHOOSE US
import { PenTool, Palette, Zap, TabletSmartphone, Lock, Rocket } from "lucide-react";

function WhyChooseComponents() {
    const features = [
        { title: "High-Quality Content", desc: "Deeply researched, authority-building writing.", icon: <PenTool className="w-8 h-8" /> },
        { title: "Premium Design", desc: "Award-winning layouts and cover art.", icon: <Palette className="w-8 h-8" /> },
        { title: "Fast Delivery", desc: "Rapid turnarounds with unlimited revisions.", icon: <Zap className="w-8 h-8" /> },
        { title: "Multi-Platform", desc: "Optimized for Amazon KDP, PDF, EPUB.", icon: <TabletSmartphone className="w-8 h-8" /> },
        { title: "Full Ownership", desc: "You keep 100% of the copyright & profits.", icon: <Lock className="w-8 h-8" /> },
        { title: "Marketing Ready", desc: "Includes social assets to launch big.", icon: <Rocket className="w-8 h-8" /> }
    ];

    return (
        <section className="py-48 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Animated Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#a8ffc4] rounded-full blur-[120px] opacity-10"
                />
                <motion.div
                    animate={{ x: [0, -100, 0], y: [0, 50, 0], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900 rounded-full blur-[150px] opacity-10"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <SectionHeader
                    title="Why Choose Our Ebook Services?"
                    subtitle="We don't just write books. We craft digital assets that build authority."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <GlassCard
                            key={i}
                            delay={i * 0.1}
                            className="h-full min-h-[350px] flex flex-col justify-between p-10 rounded-[2.5rem] bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/10 hover:border-[#a8ffc4]/50 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(168,255,196,0.1)] relative overflow-hidden"
                        >
                            {/* Inner Gloss Shine */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10 w-full">
                                <div className="w-16 h-16 mb-8 rounded-2xl bg-[#a8ffc4]/10 flex items-center justify-center text-[#a8ffc4] group-hover:bg-[#a8ffc4] group-hover:text-black transition-all duration-300 shadow-[inset_0_0_20px_rgba(168,255,196,0.1)] group-hover:shadow-[0_0_30px_rgba(168,255,196,0.4)]">
                                    {f.icon}
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-[#a8ffc4] transition-colors">{f.title}</h3>
                                <p className="text-lg text-white/60 leading-relaxed font-light group-hover:text-white/80 transition-colors">{f.desc}</p>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 3. SERVICES PACKAGES
function ServicePackages() {
    const packages = [
        {
            title: "Ghostwriting Grade A",
            items: ["Research-based writing", "SEO-friendly structure", "Brand voice alignment", "100% Original Content"],
            color: "from-blue-500"
        },
        {
            title: "Design & Layout",
            items: ["Custom Cover Design", "Aesthetic Formatting", "Brand Colors & Fonts", "Professional Typography"],
            color: "from-purple-500"
        },
        {
            title: "Marketing Kit",
            items: ["Promotional Social Posts", "Ad Creatives", "Landing Page Banners", "Email Swipe Copy"],
            color: "from-pink-500"
        }
    ];

    const { scrollYProgress } = useScroll();
    const x = useTransform(scrollYProgress, [0.2, 0.45], ["0%", "-50%"]); // Subtle horizontal shift effect

    return (
        <section className="py-32 relative border-y border-white/5 bg-black">
            <div className="container mx-auto px-6">
                <SectionHeader title="Our Complete Packages" subtitle="Everything you need to go from concept to bestseller." />

                <div className="grid lg:grid-cols-3 gap-8">
                    {packages.map((pkg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="relative group h-full"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-b ${pkg.color} to-transparent opacity-5 group-hover:opacity-20 transition-opacity duration-500 rounded-[2.5rem]`} />

                            <div className="relative h-full p-10 rounded-[2.5rem] border border-white/10 bg-black/50 backdrop-blur-md flex flex-col">
                                <h3 className="text-3xl font-bold text-white mb-8">{pkg.title}</h3>
                                <div className="flex-1">
                                    <CheckList items={pkg.items} />
                                </div>
                                <div className="mt-10 pt-10 border-t border-white/10">
                                    <button className="w-full py-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 4. PROCESS
function ProcessTimeline() {
    return (
        <section className="py-32 bg-[#050505] relative">
            <div className="container mx-auto px-6">
                <SectionHeader title="How It Works" subtitle="A simple, streamlined process to get your book published." />

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#a8ffc4] to-transparent opacity-20 md:-translate-x-1/2" />

                    {[
                        { step: "01", title: "Share Your Idea", desc: "Tell us your topic and goals." },
                        { step: "02", title: "We Write & Design", desc: "Our experts craft your content and visuals." },
                        { step: "03", title: "Review & Revisions", desc: "We refine until it's perfect." },
                        { step: "04", title: "Final Delivery", desc: "Receive ready-to-publish files (PDF, EPUB, KDP)." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className={`flex flex-col md:flex-row items-center gap-8 mb-20 last:mb-0 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
                        >
                            {/* Number Bubble */}
                            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#0a0a0a] border border-[#a8ffc4] text-[#a8ffc4] flex items-center justify-center font-bold text-xl relative z-10 shadow-[0_0_20px_rgba(168,255,196,0.2)]">
                                {item.step}
                            </div>

                            {/* Content Card */}
                            <div className={`flex-1 w-full md:w-auto p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-[#a8ffc4]/20 transition-colors ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-white/50">{item.desc}</p>
                            </div>

                            <div className="hidden md:block flex-1" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 5. PRICING (Optional per user, but looks good)
function Pricing() {
    return (
        <section className="py-32">
            <div className="container mx-auto px-6">
                <SectionHeader title="Investment Plans" align="center" />
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                        { name: "Basic", price: "Design Only", desc: "Perfect if you have the text ready.", feat: ["Custom Cover", "Internal Formatting", "PDF & EPUB Delivery"] },
                        { name: "Standard", price: "Writing + Design", desc: "Full service for busy founders.", feat: ["10,000 Words Ghostwriting", "Premium Design", "2 Rounds Revisions", "Proofreading"], highlight: true },
                        { name: "Premium", price: "Full Launch Kit", desc: "The ultimate authority package.", feat: ["25,000 Words Ghostwriting", "Deluxe Design", "Marketing Assets", "Landing Page", "Unlimted Revisions"] }
                    ].map((plan, i) => (
                        <div key={i} className={`relative p-8 rounded-3xl border ${plan.highlight ? "border-[#a8ffc4] bg-[#a8ffc4]/5" : "border-white/10 bg-black"} flex flex-col gap-6`}>
                            {plan.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[#a8ffc4] text-black text-xs font-bold uppercase tracking-widest rounded-full">
                                    Most Popular
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                                <div className="text-3xl font-black text-white mt-2 mb-1">{plan.price}</div>
                                <p className="text-white/40 text-sm">{plan.desc}</p>
                            </div>
                            <div className="h-[1px] w-full bg-white/10" />
                            <div className="flex-1">
                                <CheckList items={plan.feat} />
                            </div>
                            <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.highlight ? "bg-[#a8ffc4] text-black hover:bg-white" : "bg-white/10 text-white hover:bg-white/20"}`}>
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 6. FAQ
function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const items = [
        { q: "How long does an eBook take?", a: "Typically 2-4 weeks depending on length and complexity." },
        { q: "Do I get full copyright?", a: "Yes. You own 100% of the work once delivered." },
        { q: "What formats do you deliver?", a: "We provide print-ready PDF, EPUB for Kindle/Apple, and editable source files." },
        { q: "Do you provide cover designs?", a: "Absolutely. We create stunning 3D and 2D covers that pop." },
    ];

    return (
        <section className="py-24 max-w-3xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {items.map((item, i) => (
                    <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                        >
                            <span className="text-lg font-medium text-white">{item.q}</span>
                            <span className={`text-[#a8ffc4] transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}>+</span>
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-8 pb-6 text-white/50 leading-relaxed">
                                        {item.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}

// --- MAIN PAGE ---
export default function EbookServicesPage() {
    return (
        <main className="bg-black min-h-screen selection:bg-[#a8ffc4] selection:text-black">
            <Hero />
            <WhyChooseComponents />
            <ServicePackages />
            <ProcessTimeline />
            <Pricing />
            <FAQ />

            {/* BOTTOM CTA */}
            <section className="py-32 bg-[#a8ffc4] text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-black text-black mb-8 tracking-tighter uppercase leading-[0.9]">
                        Ready to Launch <br /> Your Authority?
                    </h2>
                    <p className="text-xl text-black/60 mb-12 max-w-2xl mx-auto font-medium">
                        Don't let your ideas gather dust. Turn them into a revenue-generating asset today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <MagneticButton className="px-12 py-6 bg-black text-white hover:bg-white hover:text-black shadow-2xl text-xl">
                            Start Your Project
                        </MagneticButton>
                        <MagneticButton variant="secondary" className="px-12 py-6 border-black text-black hover:bg-black hover:text-[#a8ffc4] text-xl border-2">
                            Get Free Sample
                        </MagneticButton>
                    </div>
                </div>
            </section>

            <footer className="py-12 bg-black text-center border-t border-white/5">
                <p className="text-white/20 text-sm font-mono">
                    THE OG DIGITALS © 2024
                </p>
            </footer>
        </main>
    );
}
