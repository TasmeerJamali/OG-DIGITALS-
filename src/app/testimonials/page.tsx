"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";

// Sample testimonials data - video testimonials
const videoTestimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "CEO",
        company: "TechStart Inc.",
        thumbnail: "/testimonials/video-thumb-1.jpg",
        videoUrl: "#", // Replace with actual video URL
        quote: "The OG Digitals transformed our entire digital presence. The results exceeded our expectations.",
        color: "#a8ffc4",
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Founder",
        company: "InnovateLab",
        thumbnail: "/testimonials/video-thumb-2.jpg",
        videoUrl: "#",
        quote: "Working with them was a game-changer for our brand. Highly recommend!",
        color: "#60a5fa",
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Marketing Director",
        company: "GrowthCo",
        thumbnail: "/testimonials/video-thumb-3.jpg",
        videoUrl: "#",
        quote: "Their creative approach helped us stand out in a crowded market.",
        color: "#c084fc",
    },
];

// Sample testimonials data - text testimonials
const textTestimonials = [
    {
        id: 1,
        name: "David Park",
        role: "CTO",
        company: "CloudNine Solutions",
        quote: "The team at OG Digitals delivered exceptional work. Their attention to detail and creative vision transformed our platform into something truly remarkable. The user engagement increased by 300% after the redesign.",
        rating: 5,
        image: "/testimonials/avatar-1.jpg",
    },
    {
        id: 2,
        name: "Lisa Thompson",
        role: "Brand Manager",
        company: "Luxe Lifestyle",
        quote: "From concept to execution, every step was handled with professionalism and creativity. They didn't just meet our expectations—they exceeded them in every way possible.",
        rating: 5,
        image: "/testimonials/avatar-2.jpg",
    },
    {
        id: 3,
        name: "James Wilson",
        role: "Startup Founder",
        company: "NextGen Apps",
        quote: "Best investment we ever made for our brand. The ROI has been incredible, and the design speaks for itself. Our clients can't stop complimenting our new website.",
        rating: 5,
        image: "/testimonials/avatar-3.jpg",
    },
    {
        id: 4,
        name: "Amanda Foster",
        role: "E-commerce Director",
        company: "StyleHub",
        quote: "They understood our vision from day one. The new e-commerce platform they built has increased our conversion rate by 150%. Absolutely phenomenal work.",
        rating: 5,
        image: "/testimonials/avatar-4.jpg",
    },
    {
        id: 5,
        name: "Robert Kim",
        role: "Product Lead",
        company: "FinTech Pro",
        quote: "The OG Digitals team brought fresh perspectives and innovative solutions to our project. Their expertise in UX design completely changed how our users interact with our app.",
        rating: 5,
        image: "/testimonials/avatar-5.jpg",
    },
    {
        id: 6,
        name: "Jennifer Martinez",
        role: "CEO",
        company: "HealthTech Solutions",
        quote: "Exceptional creativity, seamless communication, and results that speak volumes. They're not just developers—they're partners in growth.",
        rating: 5,
        image: "/testimonials/avatar-6.jpg",
    },
];

// Stats
const stats = [
    { number: "50+", label: "Happy Clients" },
    { number: "100%", label: "Satisfaction Rate" },
    { number: "5.0", label: "Average Rating" },
];

// Video testimonial card component
function VideoTestimonialCard({ testimonial, index }: { testimonial: typeof videoTestimonials[0]; index: number }) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            {/* Video container */}
            <div
                className="relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer mb-6"
                onClick={() => setIsPlaying(true)}
            >
                {/* Placeholder/Thumbnail */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(135deg, ${testimonial.color}20 0%, ${testimonial.color}05 100%)`,
                    }}
                />

                {/* Play button */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                >
                    <motion.div
                        className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{ background: testimonial.color }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </motion.div>
                </motion.div>

                {/* Quote overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white/80 text-sm italic">&quot;{testimonial.quote}&quot;</p>
                </div>
            </div>

            {/* Info */}
            <div>
                <h3 className="text-xl font-bold text-white mb-1">{testimonial.name}</h3>
                <p className="text-white/40">
                    {testimonial.role}, <span style={{ color: testimonial.color }}>{testimonial.company}</span>
                </p>
            </div>
        </motion.div>
    );
}

// Text testimonial card component
function TextTestimonialCard({ testimonial, index }: { testimonial: typeof textTestimonials[0]; index: number }) {
    return (
        <motion.div
            className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[#a8ffc4]/30 transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
        >
            {/* Stars */}
            <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#a8ffc4]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>

            {/* Quote */}
            <p className="text-white/70 text-lg leading-relaxed mb-8">
                &quot;{testimonial.quote}&quot;
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{ background: "linear-gradient(135deg, #a8ffc4 0%, #60a5fa 100%)" }}
                >
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                    <div className="font-medium text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/40">{testimonial.role}, {testimonial.company}</div>
                </div>
            </div>
        </motion.div>
    );
}

export default function TestimonialsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState<"all" | "video" | "text">("all");

    return (
        <main ref={containerRef} className="relative bg-black min-h-screen">
            {/* Background gradient orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(168,255,196,0.06) 0%, transparent 60%)",
                        filter: "blur(80px)",
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 30, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[70vh] flex items-center pt-24">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    <div className="max-w-5xl">
                        {/* Breadcrumb */}
                        <motion.div
                            className="flex items-center gap-4 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Link href="/" className="text-sm text-white/40 hover:text-white transition-colors">
                                Home
                            </Link>
                            <span className="text-white/20">/</span>
                            <span className="text-sm text-[#a8ffc4]">Testimonials</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.div
                            className="mb-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="text-xs uppercase tracking-[0.3em] text-[#a8ffc4] block mb-6">
                                Client Stories
                            </span>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
                                <div className="overflow-hidden">
                                    <motion.div
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 1, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
                                        className="text-white"
                                    >
                                        What our clients
                                    </motion.div>
                                </div>
                                <div className="overflow-hidden">
                                    <motion.div
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 1, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
                                        className="text-[#a8ffc4]"
                                    >
                                        say about us.
                                    </motion.div>
                                </div>
                            </h1>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="flex flex-wrap gap-12 md:gap-20"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            {stats.map((stat, i) => (
                                <div key={stat.label}>
                                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                                    <div className="text-sm text-white/40 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== VIDEO TESTIMONIALS ===== */}
            <section className="py-32">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    {/* Section header */}
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-[#a8ffc4] block mb-4">
                            Video Stories
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Hear from our clients
                        </h2>
                    </motion.div>

                    {/* Video grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videoTestimonials.map((testimonial, i) => (
                            <VideoTestimonialCard key={testimonial.id} testimonial={testimonial} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TEXT TESTIMONIALS ===== */}
            <section className="py-32 border-t border-white/5">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    {/* Section header - right aligned for variety */}
                    <motion.div
                        className="mb-16 text-right"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-[#a8ffc4] block mb-4">
                            Written Reviews
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            More success stories
                        </h2>
                    </motion.div>

                    {/* Testimonials grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {textTestimonials.map((testimonial, i) => (
                            <TextTestimonialCard key={testimonial.id} testimonial={testimonial} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="py-32 border-t border-white/5">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    <motion.div
                        className="text-center max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                            Ready to become our<br />
                            <span className="text-[#a8ffc4]">next success story?</span>
                        </h2>
                        <p className="text-xl text-white/50 mb-12">
                            Join our growing list of satisfied clients and let&apos;s create something extraordinary together.
                        </p>

                        <Link href="/contact" className="group inline-block">
                            <motion.div
                                className="relative px-12 py-6 rounded-full overflow-hidden"
                                style={{
                                    background: "linear-gradient(135deg, #a8ffc4 0%, #7dd3a8 100%)",
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                                    }}
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                />
                                <span className="relative flex items-center gap-4 text-black font-bold text-lg">
                                    Start Your Project
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
