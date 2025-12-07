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

// --- FIRE TEXT COMPONENT ---
function FireText({ text, className }: { text: React.ReactNode; className?: string }) {
    return (
        <span className={`relative inline-block ${className}`}>
            <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-text-shimmer select-none blur-[2px] opacity-50">
                {text}
            </span>
            <span className="relative bg-gradient-to-r from-orange-400 via-yellow-300 to-red-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-text-shimmer">
                {text}
            </span>
            <style jsx global>{`
                @keyframes text-shimmer {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-text-shimmer {
                    animation: text-shimmer 3s linear infinite;
                }
            `}</style>
        </span>
    );
}

function Typewriter({ text }: { text: string }) {
    const [display, setDisplay] = useState("");
    
    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplay(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 50); // Speed
        return () => clearInterval(timer);
    }, [text]);

    return (
        <span>
            {display}
            <span className="animate-pulse">_</span>
        </span>
    );
}

// --- AI AGENT COMPONENT ---
function AiAgent3D() {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000">
             {/* Speech Interface - Floating above */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute top-10 md:-top-10 left-1/2 -translate-x-1/2 z-50 w-64 md:w-80"
            >
                <div className="bg-black/80 backdrop-blur-xl border border-[#a8ffc4]/30 rounded-2xl p-4 shadow-[0_0_30px_rgba(168,255,196,0.1)] relative">
                    {/* Chat Tail */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-black border-b border-r border-[#a8ffc4]/30" />
                    
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#a8ffc4] animate-pulse" />
                        <span className="text-white/40 text-[10px] uppercase tracking-widest font-mono">OG INTELLIGENCE</span>
                    </div>
                    <div className="text-lg md:text-xl font-medium text-white leading-tight font-mono">
                         <Typewriter text="We build the world's best books." />
                    </div>
                </div>
            </motion.div>

            {/* Core Assembly */}
            <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                className="relative w-64 h-64 transform-style-3d"
            >
                {/* Central Core */}
                <div className="absolute inset-0 m-auto w-32 h-32 bg-[#a8ffc4] rounded-full blur-[40px] opacity-40 animate-pulse" />
                <div className="absolute inset-0 m-auto w-24 h-24 bg-gradient-to-br from-white to-[#a8ffc4] rounded-full shadow-[0_0_50px_#a8ffc4] z-10" />

                {/* Ring 1 - Horizontal */}
                <motion.div 
                    animate={{ rotateX: 360, rotateY: 180 }}
                    transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                    className="absolute inset-[-40px] rounded-full border border-[#a8ffc4]/40 border-dashed"
                />
                
                {/* Ring 2 - Vertical */}
                <motion.div 
                    animate={{ rotateY: 360, rotateZ: 90 }}
                    transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                    className="absolute inset-[-80px] rounded-full border-[2px] border-white/10"
                >
                     <div className="absolute top-0 left-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]" />
                </motion.div>

                 {/* Ring 3 - Tilted */}
                 <motion.div 
                    animate={{ rotateX: 360, rotateZ: 45 }}
                    transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                    className="absolute inset-[-20px] rounded-full border border-[#a8ffc4]/20"
                />

                {/* Floating Particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-[#a8ffc4] rounded-full"
                        animate={{
                            x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                            y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                            scale: [0, 1, 0],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}

// 1. HERO
function Hero() {
    return (
         <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,255,196,0.05),transparent_40%)]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-4 py-2 rounded-full border border-[#a8ffc4]/30 bg-[#a8ffc4]/5 text-[#a8ffc4] text-xs font-mono uppercase tracking-widest mb-8"
                        >
                            • Premium Ebook Services
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight mb-8">
                            Professional <br />
                            <FireText text="eBook Creation" className="py-2" /> <br />
                            & Design.
                        </h1>
                        <p className="text-xl text-white/50 max-w-xl leading-relaxed mb-10 mx-auto lg:mx-0">
                            Turn your ideas into stunning, ready-to-sell eBooks with our world-class writing, design, and publishing solutions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                            <MagneticButton className="px-10 py-5 text-lg">Get a Free Quote</MagneticButton>
                            <MagneticButton variant="secondary" className="px-10 py-5 text-lg">View Samples</MagneticButton>
                        </div>
                    </div>
                    
                    <div className="flex-1 w-full flex justify-center perspective-1000">
                        {/* 3D Agent Replacement */}
                        <AiAgent3D />
                    </div>
                </div>
            </div>
            
             {/* Scrolling Mouse Icon */}
            <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
            >
                <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-current rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}

// 2. WHY CHOOSE US
function WhyChooseComponents() {
    const features = [
        { title: "High-Quality Content", desc: "Deeply researched, authority-building writing.", icon: "✍️" },
        { title: "Premium Design", desc: "Award-winning layouts and cover art.", icon: "🎨" },
        { title: "Fast Delivery", desc: "Rapid turnarounds with unlimited revisions.", icon: "⚡" },
        { title: "Multi-Platform", desc: "Optimized for Amazon KDP, PDF, EPUB.", icon: "📱" },
        { title: "Full Ownership", desc: "You keep 100% of the copyright & profits.", icon: "🔐" },
        { title: "Marketing Ready", desc: "Includes social assets to launch big.", icon: "🚀" }
    ];

    return (
        <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <SectionHeader
                    title="Why Choose Our Ebook Services?"
                    subtitle="We don't just write books. We craft digital assets that build authority."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <GlassCard key={i} delay={i * 0.1} className="h-full flex flex-col items-start gap-4 hover:border-[#a8ffc4]/30">
                            <span className="text-4xl mb-2 grayscale group-hover:grayscale-0 transition-all">{f.icon}</span>
                            <h3 className="text-2xl font-bold text-white mb-2">{f.title}</h3>
                            <p className="text-white/50 leading-relaxed">{f.desc}</p>
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
