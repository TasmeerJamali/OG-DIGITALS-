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
                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-16">
                                    {/* Form fields */}
                                    {formFields.map((field, i) => (
                                        <motion.div
                                            key={field.name}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <label className="block text-3xl md:text-4xl font-bold text-white mb-6">
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type}
                                                required={field.required}
                                                value={formState[field.name as keyof typeof formState]}
                                                onChange={(e) => setFormState({ ...formState, [field.name]: e.target.value })}
                                                onFocus={() => setFocusedField(field.name)}
                                                onBlur={() => setFocusedField(null)}
                                                className="w-full bg-transparent border-b-2 border-white/10 py-4 text-2xl text-white focus:border-[#a8ffc4] focus:outline-none transition-colors placeholder:text-white/20"
                                                placeholder={field.placeholder}
                                            />
                                            <motion.div
                                                className="h-[2px] bg-[#a8ffc4] origin-left"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: focusedField === field.name ? 1 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </motion.div>
                                    ))}

                                    {/* Budget dropdown */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        viewport={{ once: true }}
                                    >
                                        <label className="block text-3xl md:text-4xl font-bold text-white mb-6">
                                            Project budget?
                                        </label>
                                        <select
                                            value={formState.budget}
                                            onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                                            className="w-full bg-transparent border-b-2 border-white/10 py-4 text-2xl text-white focus:border-[#a8ffc4] focus:outline-none transition-colors cursor-pointer appearance-none"
                                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a8ffc4'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: "right center", backgroundRepeat: "no-repeat", backgroundSize: "24px" }}
                                        >
                                            <option value="" className="bg-black text-white/50">Select a range</option>
                                            <option value="<5k" className="bg-black">Less than $5,000</option>
                                            <option value="5k-10k" className="bg-black">$5,000 - $10,000</option>
                                            <option value="10k-25k" className="bg-black">$10,000 - $25,000</option>
                                            <option value="25k-50k" className="bg-black">$25,000 - $50,000</option>
                                            <option value="50k+" className="bg-black">$50,000+</option>
                                        </select>
                                    </motion.div>

                                    {/* Message */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                        viewport={{ once: true }}
                                    >
                                        <label className="block text-3xl md:text-4xl font-bold text-white mb-6">
                                            Tell us about your project.
                                        </label>
                                        <textarea
                                            required
                                            rows={3}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            onFocus={() => setFocusedField("message")}
                                            onBlur={() => setFocusedField(null)}
                                            className="w-full bg-transparent border-b-2 border-white/10 py-4 text-xl text-white focus:border-[#a8ffc4] focus:outline-none transition-colors resize-none placeholder:text-white/20"
                                            placeholder="I need help with..."
                                        />
                                    </motion.div>

                                    {/* Submit Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.5 }}
                                        viewport={{ once: true }}
                                        className="pt-8"
                                    >
                                        <MagneticButton>
                                            <motion.button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="group relative px-16 py-8 rounded-full overflow-hidden"
                                                style={{
                                                    background: "linear-gradient(135deg, #a8ffc4 0%, #7dd3a8 100%)",
                                                }}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {/* Shimmer */}
                                                <motion.div
                                                    className="absolute inset-0"
                                                    style={{
                                                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                                                    }}
                                                    animate={{ x: ["-100%", "200%"] }}
                                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                                                />

                                                <span className="relative flex items-center justify-center gap-4 text-black font-bold text-xl">
                                                    {isSubmitting ? (
                                                        <>
                                                            <motion.div
                                                                className="w-6 h-6 border-2 border-black border-t-transparent rounded-full"
                                                                animate={{ rotate: 360 }}
                                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            />
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Send Message
                                                            <motion.svg
                                                                className="w-6 h-6"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2.5}
                                                                animate={{ x: [0, 5, 0] }}
                                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                            </motion.svg>
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
