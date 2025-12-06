"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";

// Contact methods
const contactMethods = [
    {
        icon: "✉",
        title: "Email Us",
        value: "hello@theogdigitals.com",
        href: "mailto:hello@theogdigitals.com",
        description: "For project inquiries and collaborations",
    },
    {
        icon: "📞",
        title: "Call Us",
        value: "+92 XXX XXXXXXX",
        href: "tel:+92XXXXXXXXXX",
        description: "Available Mon-Fri, 9am-6pm",
    },
    {
        icon: "📍",
        title: "Visit Us",
        value: "Karachi, Pakistan",
        href: "#",
        description: "By appointment only",
    },
];

// Social links
const socials = [
    { name: "Instagram", url: "#", icon: "IG" },
    { name: "LinkedIn", url: "#", icon: "LI" },
    { name: "Twitter", url: "#", icon: "X" },
    { name: "Behance", url: "#", icon: "Be" },
];

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

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setSubmitted(true);
    };

    const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

    return (
        <main ref={containerRef} className="relative bg-black">
            {/* ===== HERO SECTION WITH VIDEO ===== */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
                    <div className="absolute inset-0 bg-black/60" />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 text-center">
                    {/* Breadcrumb */}
                    <motion.div
                        className="flex items-center justify-center gap-4 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link href="/" className="text-sm text-white/40 hover:text-white transition-colors">
                            Home
                        </Link>
                        <span className="text-white/20">/</span>
                        <span className="text-sm text-[#a8ffc4]">Contact</span>
                    </motion.div>

                    {/* Big Headline */}
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-white leading-[0.85] tracking-tight mb-8"
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                    >
                        Let&apos;s <span className="text-[#a8ffc4]">Talk</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Have a project in mind? We&apos;d love to hear from you.
                        Let&apos;s create something extraordinary together.
                    </motion.p>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-12 left-1/2 -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#a8ffc4] to-transparent" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ===== CONTACT FORM SECTION ===== */}
            <section className="py-32 relative">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Left - Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-xs uppercase tracking-[0.3em] text-[#a8ffc4] block mb-6">
                                Get in Touch
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                                Start a<br />conversation
                            </h2>
                            <p className="text-lg text-white/50 mb-12 max-w-md">
                                Whether you have a question about our services, pricing, or anything else,
                                our team is ready to answer all your questions.
                            </p>

                            {/* Contact Methods */}
                            <div className="space-y-8 mb-12">
                                {contactMethods.map((method, i) => (
                                    <motion.a
                                        key={method.title}
                                        href={method.href}
                                        className="group flex items-start gap-6 p-6 rounded-xl border border-white/5 hover:border-[#a8ffc4]/30 transition-all duration-500"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 10 }}
                                    >
                                        <span className="text-3xl">{method.icon}</span>
                                        <div>
                                            <div className="text-sm text-white/40 mb-1">{method.title}</div>
                                            <div className="text-xl text-white group-hover:text-[#a8ffc4] transition-colors">
                                                {method.value}
                                            </div>
                                            <div className="text-sm text-white/30 mt-1">{method.description}</div>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div>
                                <div className="text-sm text-white/40 mb-4">Follow us</div>
                                <div className="flex gap-4">
                                    {socials.map((social) => (
                                        <motion.a
                                            key={social.name}
                                            href={social.url}
                                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-[#a8ffc4] hover:text-[#a8ffc4] transition-all"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                        >
                                            {social.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right - Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {submitted ? (
                                <motion.div
                                    className="h-full flex flex-col items-center justify-center text-center p-12 rounded-2xl border border-[#a8ffc4]/30 bg-[#a8ffc4]/5"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <motion.div
                                        className="text-6xl mb-6"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: 0.2 }}
                                    >
                                        ✓
                                    </motion.div>
                                    <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                                    <p className="text-white/50">
                                        Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                                    </p>
                                </motion.div>
                            ) : (
                                <form
                                    ref={formRef}
                                    onSubmit={handleSubmit}
                                    className="space-y-6 p-8 md:p-12 rounded-2xl border border-white/5 bg-white/[0.02]"
                                >
                                    {/* Name & Email Row */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm text-white/40 mb-3">Your Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formState.name}
                                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-white text-lg focus:border-[#a8ffc4] focus:outline-none transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-white/40 mb-3">Email Address *</label>
                                            <input
                                                type="email"
                                                required
                                                value={formState.email}
                                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-white text-lg focus:border-[#a8ffc4] focus:outline-none transition-colors"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Company & Budget Row */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm text-white/40 mb-3">Company</label>
                                            <input
                                                type="text"
                                                value={formState.company}
                                                onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                                                className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-white text-lg focus:border-[#a8ffc4] focus:outline-none transition-colors"
                                                placeholder="Company name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-white/40 mb-3">Budget Range</label>
                                            <select
                                                value={formState.budget}
                                                onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                                                className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-white text-lg focus:border-[#a8ffc4] focus:outline-none transition-colors cursor-pointer"
                                            >
                                                <option value="" className="bg-black">Select budget</option>
                                                <option value="<5k" className="bg-black">Less than $5,000</option>
                                                <option value="5k-10k" className="bg-black">$5,000 - $10,000</option>
                                                <option value="10k-25k" className="bg-black">$10,000 - $25,000</option>
                                                <option value="25k-50k" className="bg-black">$25,000 - $50,000</option>
                                                <option value="50k+" className="bg-black">$50,000+</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm text-white/40 mb-3">Project Details *</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-white text-lg focus:border-[#a8ffc4] focus:outline-none transition-colors resize-none"
                                            placeholder="Tell us about your project..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group relative w-full mt-8 px-12 py-6 rounded-full overflow-hidden"
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
                                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                                            }}
                                            animate={{ x: ["-100%", "100%"] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                        />

                                        <span className="relative flex items-center justify-center gap-4 text-black font-bold text-lg">
                                            {isSubmitting ? (
                                                <>
                                                    <motion.span
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        ⟳
                                                    </motion.span>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </>
                                            )}
                                        </span>
                                    </motion.button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== FAQ TEASER ===== */}
            <section className="py-24 border-t border-white/5">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Have questions?
                            </h3>
                            <p className="text-white/50">
                                Check out our FAQ section or reach out directly.
                            </p>
                        </div>
                        <Link href="/#faq" className="group inline-flex items-center gap-4 text-[#a8ffc4] font-medium">
                            View FAQ
                            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== MAP/LOCATION SECTION ===== */}
            <section className="relative h-[50vh] overflow-hidden">
                {/* Stylized map background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]">
                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(168,255,196,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(168,255,196,0.1) 1px, transparent 1px)
                            `,
                            backgroundSize: "50px 50px",
                        }}
                    />

                    {/* Location marker */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            {/* Pulse rings */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-[#a8ffc4]"
                                animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{ width: 60, height: 60, marginLeft: -30, marginTop: -30 }}
                            />
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-[#a8ffc4]"
                                animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                style={{ width: 60, height: 60, marginLeft: -30, marginTop: -30 }}
                            />

                            {/* Center dot */}
                            <div className="w-4 h-4 rounded-full bg-[#a8ffc4] shadow-[0_0_30px_rgba(168,255,196,0.5)]" />
                        </div>
                    </motion.div>
                </div>

                {/* Location label */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="text-sm text-[#a8ffc4] mb-2">📍 Our Location</div>
                    <div className="text-2xl font-bold text-white">Karachi, Pakistan</div>
                </motion.div>
            </section>
        </main>
    );
}
