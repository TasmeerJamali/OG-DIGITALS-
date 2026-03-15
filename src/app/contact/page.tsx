"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// Animated text reveal component
function TextReveal({ children, delay = 0 }: { children: string; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="overflow-hidden">
            <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
}

// Magnetic button component
function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = (clientX - left - width / 2) * 0.15;
        const y = (clientY - top - height / 2) * 0.15;
        setPosition({ x, y });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Calendly inline widget component
function CalendlyEmbed({ url }: { url: string }) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-white">
            <div
                className="calendly-inline-widget"
                data-url={url + "?hide_gdpr_banner=1&background_color=ffffff&text_color=1a1a1a&primary_color=22c55e"}
                style={{ minWidth: "320px", height: "750px", width: "100%" }}
            />
        </div>
    );
}

// PREMIUM BROWSER WINDOW WRAPPER
function BrowserWindow({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-[0_0_100px_rgba(168,255,196,0.1)] border border-white/10 bg-black/40 backdrop-blur-2xl"
        >
            {/* Window Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a8ffc4]/30 to-transparent opacity-50" />

            {/* Window Header */}
            <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2">
                <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] border border-black/20" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#febc2e] border border-black/20" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#28c840] border border-black/20" />
                </div>
                {/* Fake URL Bar */}
                <div className="ml-6 flex-1 max-w-sm h-7 bg-black/20 rounded-md border border-white/5 flex items-center justify-center">
                    <div className="text-[10px] items-center gap-1.5 font-mono text-white/30 hidden md:flex">
                        <span className="opacity-50">🔒</span> the-og-digitals.com/contact
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-5 md:p-12 lg:p-16 md:max-h-[80vh] md:overflow-y-auto custom-scrollbar">
                {children}
            </div>
        </motion.div>
    );
}

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        company: "",
        services: "",
        budget: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setSubmitted(true);
    };

    const formFields = [
        { name: "name", label: "What's your name?", type: "text", placeholder: "John Doe", required: true },
        { name: "email", label: "Your email address?", type: "email", placeholder: "john@company.com", required: true },
        { name: "company", label: "Company name?", type: "text", placeholder: "Acme Inc.", required: false },
    ];

    return (
        <main ref={containerRef} className="relative bg-black min-h-screen">
            {/* Background gradient orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(168,255,196,0.08) 0%, transparent 60%)",
                        filter: "blur(80px)",
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 60%)",
                        filter: "blur(80px)",
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -30, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-screen flex items-center justify-center pt-24">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src="/assets/contact-us.mp4" type="video/mp4" />
                    </video>
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/70" />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
                </div>

                <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 py-20">
                    {/* Main headline - full width, dramatic */}
                    <div className="mb-24">
                        <motion.div
                            className="text-xs uppercase tracking-[0.4em] text-[#a8ffc4] mb-8"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Contact
                        </motion.div>

                        <h1 className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold leading-[0.85] tracking-tight">
                            <div className="overflow-hidden">
                                <motion.div
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                                    className="text-white"
                                >
                                    Let&apos;s create
                                </motion.div>
                            </div>
                            <div className="overflow-hidden">
                                <motion.div
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
                                    className="text-white"
                                >
                                    something
                                </motion.div>
                            </div>
                            <div className="overflow-hidden">
                                <motion.div
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
                                    className="text-[#a8ffc4]"
                                >
                                    together.
                                </motion.div>
                            </div>
                        </h1>
                    </div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-12 left-6 md:left-12 lg:left-24"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex items-center gap-4 text-white/30 text-sm"
                        >
                            <div className="w-[1px] h-16 bg-gradient-to-b from-[#a8ffc4] to-transparent" />
                            <span className="rotate-90 origin-left translate-x-2">Scroll</span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ===== FORM SECTION ===== */}
            <section className="relative py-32">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-8">
                        {/* Left side - Contact info */}
                        <motion.div
                            className="lg:col-span-4"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="sticky top-32">
                                <span className="text-xs uppercase tracking-[0.3em] text-[#a8ffc4] block mb-6">
                                    Get in Touch
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
                                    Drop us<br />a line.
                                </h2>
                                <p className="text-lg text-white/40 mb-12 leading-relaxed">
                                    We&apos;d love to hear about your project and how we can help bring your vision to life.
                                </p>

                                {/* Email - featured */}
                                <motion.a
                                    href="mailto:hello@theogdigitals.com"
                                    className="group block mb-12"
                                    whileHover={{ x: 10 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <div className="text-sm text-white/30 mb-2">Email</div>
                                    <div className="text-2xl md:text-3xl text-white font-medium group-hover:text-[#a8ffc4] transition-colors">
                                        hello@theogdigitals.com
                                    </div>
                                </motion.a>

                                {/* Social links */}
                                <div>
                                    <div className="text-sm text-white/30 mb-4">Follow us</div>
                                    <div className="flex gap-6">
                                        {[
                                            { name: "Instagram", href: "https://www.instagram.com/theogdigitals/" },
                                            { name: "LinkedIn", href: "https://pk.linkedin.com/company/the-og-digitals" },
                                            { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61575381958438" }
                                        ].map((social, i) => (
                                            <motion.a
                                                key={social.name}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white/40 hover:text-[#a8ffc4] transition-colors text-sm font-medium"
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                viewport={{ once: true }}
                                                whileHover={{ y: -2 }}
                                            >
                                                {social.name}
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right side - Form */}
                        <motion.div
                            className="lg:col-span-8"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {submitted ? (
                                <motion.div
                                    className="min-h-[60vh] flex flex-col items-center justify-center text-center"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <motion.div
                                        className="w-24 h-24 rounded-full bg-[#a8ffc4]/10 flex items-center justify-center mb-8"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: 0.2 }}
                                    >
                                        <motion.svg
                                            className="w-12 h-12 text-[#a8ffc4]"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <motion.path
                                                d="M5 13l4 4L19 7"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </motion.svg>
                                    </motion.div>
                                    <h3 className="text-4xl font-bold text-white mb-4">Message Sent!</h3>
                                    <p className="text-white/50 text-lg max-w-md">
                                        Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                                    </p>
                                </motion.div>
                            ) : (
                                <BrowserWindow>
                                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-12 font-mono text-sm md:text-base">
                                        {/* 01. Name */}
                                        <div className="flex gap-4 md:gap-8 group">
                                            <span className="text-white/20 shrink-0 select-none pt-4">01</span>
                                            <div className="flex-1 border-b border-white/10 group-focus-within:border-[#a8ffc4] transition-colors pb-8">
                                                <label className="block text-[#a8ffc4]/50 mb-2">// What&apos;s your name?</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formState.name}
                                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                    className="w-full bg-transparent text-xl md:text-3xl text-[#a8ffc4] focus:outline-none placeholder:text-white/10"
                                                    placeholder="John_Doe"
                                                />
                                            </div>
                                        </div>

                                        {/* 02. Email */}
                                        <div className="flex gap-4 md:gap-8 group">
                                            <span className="text-white/20 shrink-0 select-none pt-4">02</span>
                                            <div className="flex-1 border-b border-white/10 group-focus-within:border-[#a8ffc4] transition-colors pb-8">
                                                <label className="block text-[#a8ffc4]/50 mb-2">// Your email address</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formState.email}
                                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                    className="w-full bg-transparent text-xl md:text-3xl text-[#a8ffc4] focus:outline-none placeholder:text-white/10"
                                                    placeholder="john@company.com"
                                                />
                                            </div>
                                        </div>

                                        {/* 03. Company */}
                                        <div className="flex gap-4 md:gap-8 group">
                                            <span className="text-white/20 shrink-0 select-none pt-4">03</span>
                                            <div className="flex-1 border-b border-white/10 group-focus-within:border-[#a8ffc4] transition-colors pb-8">
                                                <label className="block text-[#a8ffc4]/50 mb-2">// Organization name</label>
                                                <input
                                                    type="text"
                                                    value={formState.company}
                                                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                                                    className="w-full bg-transparent text-xl md:text-3xl text-[#a8ffc4] focus:outline-none placeholder:text-white/10"
                                                    placeholder="Acme_Inc"
                                                />
                                            </div>
                                        </div>

                                        {/* 04. Services (Textarea) */}
                                        <div className="flex gap-4 md:gap-8 group">
                                            <span className="text-white/20 shrink-0 select-none pt-4">04</span>
                                            <div className="flex-1 border-b border-white/10 group-focus-within:border-[#a8ffc4] transition-colors pb-8">
                                                <label className="block text-[#a8ffc4]/50 mb-2">// What services do you need? (Explain locally)</label>
                                                <textarea
                                                    rows={3}
                                                    value={formState.services}
                                                    onChange={(e) => setFormState({ ...formState, services: e.target.value })}
                                                    className="w-full bg-transparent text-xl md:text-2xl text-[#a8ffc4] focus:outline-none placeholder:text-white/10 resize-none leading-relaxed"
                                                    placeholder="I need a website refresh and some SEO work..."
                                                />
                                            </div>
                                        </div>

                                        {/* 05. Budget Chips (Styled as Code Selection) */}
                                        <div className="flex gap-4 md:gap-8 group">
                                            <span className="text-white/20 shrink-0 select-none pt-4">05</span>
                                            <div className="flex-1 border-b border-white/10 group-focus-within:border-[#a8ffc4] transition-colors pb-8">
                                                <label className="block text-[#a8ffc4]/50 mb-2">// const budget = ...</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {["< 10k", "10k-20k", "20k-50k", "50k+"].map((option) => (
                                                        <button
                                                            key={option}
                                                            type="button"
                                                            onClick={() => setFormState({ ...formState, budget: option })}
                                                            className={`px-4 py-2 text-sm md:text-base transition-all duration-300 font-mono ${formState.budget === option
                                                                ? "bg-[#a8ffc4] text-black"
                                                                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                                                                }`}
                                                        >
                                                            {option}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 06. Message */}
                                        <div className="flex gap-4 md:gap-8 group">
                                            <span className="text-white/20 shrink-0 select-none pt-4">06</span>
                                            <div className="flex-1 border-b border-white/10 group-focus-within:border-[#a8ffc4] transition-colors pb-8">
                                                <label className="block text-[#a8ffc4]/50 mb-2">// Additional details</label>
                                                <textarea
                                                    required
                                                    rows={3}
                                                    value={formState.message}
                                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                                    className="w-full bg-transparent text-xl md:text-2xl text-[#a8ffc4] focus:outline-none placeholder:text-white/10 resize-none leading-relaxed"
                                                    placeholder="Tell us about your timeline and goals..."
                                                />
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pl-12 md:pl-16 pt-4">
                                            <MagneticButton className="w-full md:w-auto">
                                                <motion.button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="group relative w-full md:w-auto px-8 py-4 bg-[#a8ffc4] text-black hover:bg-white transition-colors"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <span className="flex items-center justify-center gap-3 font-bold font-mono uppercase tracking-widest text-sm">
                                                        {isSubmitting ? "Running..." : "Run_Project.exe"}
                                                        <span className="text-xs opacity-50 block md:hidden">↳</span>
                                                    </span>
                                                </motion.button>
                                            </MagneticButton>
                                        </div>
                                    </form>
                                </BrowserWindow>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== CALENDLY BOOKING ===== */}
            <section className="relative py-32 border-t border-white/5">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    <motion.div
                        className="max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-center mb-16">
                            <span className="text-xs uppercase tracking-[0.3em] text-[#a8ffc4] block mb-6">
                                Book a Meeting
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                                Schedule a call
                            </h2>
                            <p className="text-lg text-white/40 max-w-xl mx-auto">
                                Pick a time that works for you. Let&apos;s discuss your project over a quick 30-minute call.
                            </p>
                        </div>

                        {/* Calendly Inline Widget */}
                        <CalendlyEmbed url="https://calendly.com/suhaibahmed-og/30min" />
                    </motion.div>
                </div>
            </section>

            {/* ===== BOTTOM CTA ===== */}
            <section className="relative py-32 border-t border-white/5">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-white/30 text-lg mb-6">Prefer email?</p>
                        <motion.a
                            href="mailto:hello@theogdigitals.com"
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white hover:text-[#a8ffc4] transition-colors inline-block"
                            whileHover={{ scale: 1.02 }}
                        >
                            hello@theogdigitals.com
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </main >
    );
}
