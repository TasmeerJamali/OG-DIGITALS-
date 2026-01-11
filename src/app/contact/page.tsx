"use client";

import { useRef, useState } from "react";
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

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        company: "",
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
                                        {["Instagram", "LinkedIn", "Twitter", "Behance"].map((social, i) => (
                                            <motion.a
                                                key={social}
                                                href="#"
                                                className="text-white/40 hover:text-[#a8ffc4] transition-colors text-sm font-medium"
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                viewport={{ once: true }}
                                                whileHover={{ y: -2 }}
                                            >
                                                {social}
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
                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-24">
                                    {/* 01. Name */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        viewport={{ once: true }}
                                        className="group"
                                    >
                                        <div className="flex items-baseline gap-4 mb-8">
                                            <span className="text-[#a8ffc4] font-mono text-sm tracking-widest">01</span>
                                            <label className="text-3xl md:text-5xl font-bold text-white">What&apos;s your name?</label>
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            onFocus={() => setFocusedField("name")}
                                            onBlur={() => setFocusedField(null)}
                                            className="w-full bg-transparent border-b border-white/20 py-6 text-2xl md:text-3xl text-white focus:border-[#a8ffc4] focus:outline-none transition-colors placeholder:text-white/10"
                                            placeholder="John Doe *"
                                        />
                                    </motion.div>

                                    {/* 02. Email */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        viewport={{ once: true }}
                                        className="group"
                                    >
                                        <div className="flex items-baseline gap-4 mb-8">
                                            <span className="text-[#a8ffc4] font-mono text-sm tracking-widest">02</span>
                                            <label className="text-3xl md:text-5xl font-bold text-white">What&apos;s your email?</label>
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            onFocus={() => setFocusedField("email")}
                                            onBlur={() => setFocusedField(null)}
                                            className="w-full bg-transparent border-b border-white/20 py-6 text-2xl md:text-3xl text-white focus:border-[#a8ffc4] focus:outline-none transition-colors placeholder:text-white/10"
                                            placeholder="john@company.com *"
                                        />
                                    </motion.div>

                                    {/* 03. Company */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        viewport={{ once: true }}
                                        className="group"
                                    >
                                        <div className="flex items-baseline gap-4 mb-8">
                                            <span className="text-[#a8ffc4] font-mono text-sm tracking-widest">03</span>
                                            <label className="text-3xl md:text-5xl font-bold text-white">What&apos;s the name of your organization?</label>
                                        </div>
                                        <input
                                            type="text"
                                            value={formState.company}
                                            onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                                            onFocus={() => setFocusedField("company")}
                                            onBlur={() => setFocusedField(null)}
                                            className="w-full bg-transparent border-b border-white/20 py-6 text-2xl md:text-3xl text-white focus:border-[#a8ffc4] focus:outline-none transition-colors placeholder:text-white/10"
                                            placeholder="Acme Inc."
                                        />
                                    </motion.div>

                                    {/* 04. Services (New) */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="flex items-baseline gap-4 mb-8">
                                            <span className="text-[#a8ffc4] font-mono text-sm tracking-widest">04</span>
                                            <label className="text-3xl md:text-5xl font-bold text-white">What services act you looking for?</label>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {["Web Design", "Development", "SEO", "Social Media", "Content", "Other"].map((service) => (
                                                <button
                                                    key={service}
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        // Toggle logic would go here, simplified for now
                                                    }}
                                                    className="px-6 py-3 rounded-full border border-white/20 text-white/60 hover:border-[#a8ffc4] hover:text-[#a8ffc4] transition-all text-lg"
                                                >
                                                    {service}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* 05. Budget Chips */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="flex items-baseline gap-4 mb-8">
                                            <span className="text-[#a8ffc4] font-mono text-sm tracking-widest">05</span>
                                            <label className="text-3xl md:text-5xl font-bold text-white">Your project budget?</label>
                                        </div>
                                        <div className="flex flex-wrap gap-4">
                                            {["< $10k", "$10k - 20k", "$20k - 50k", "$50k +"].map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => setFormState({ ...formState, budget: option })}
                                                    className={`px-8 py-4 rounded-full text-lg transition-all duration-300 border ${formState.budget === option
                                                            ? "bg-[#a8ffc4] text-black border-[#a8ffc4] font-medium"
                                                            : "bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white"
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* 06. Message */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="flex items-baseline gap-4 mb-8">
                                            <span className="text-[#a8ffc4] font-mono text-sm tracking-widest">06</span>
                                            <label className="text-3xl md:text-5xl font-bold text-white">Tell us about your project</label>
                                        </div>
                                        <textarea
                                            required
                                            rows={2}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            onFocus={() => setFocusedField("message")}
                                            onBlur={() => setFocusedField(null)}
                                            className="w-full bg-transparent border-b border-white/20 py-6 text-xl md:text-2xl text-white focus:border-[#a8ffc4] focus:outline-none transition-colors resize-none placeholder:text-white/10 leading-relaxed"
                                            placeholder="I need help with... *"
                                        />
                                    </motion.div>

                                    {/* Submit Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.6 }}
                                        viewport={{ once: true }}
                                        className="pt-12"
                                    >
                                        <MagneticButton className="w-full md:w-auto">
                                            <motion.button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="group relative w-full md:w-auto px-12 py-6 rounded-full overflow-hidden bg-[#a8ffc4] text-black"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <span className="relative flex items-center justify-center gap-4 font-bold text-xl tracking-wide uppercase">
                                                    {isSubmitting ? (
                                                        "Sending..."
                                                    ) : (
                                                        <>
                                                            Send Message
                                                            <motion.span
                                                                className="inline-block"
                                                                whileHover={{ x: 5 }}
                                                                transition={{ type: "spring", stiffness: 400 }}
                                                            >
                                                                →
                                                            </motion.span>
                                                        </>
                                                    )}
                                                </span>
                                            </motion.button>
                                        </MagneticButton>
                                    </motion.div>
                                </form>
                            )}
                        </motion.div>
                    </div>
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
        </main>
    );
}
