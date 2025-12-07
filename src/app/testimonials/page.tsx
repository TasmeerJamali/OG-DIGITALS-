"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// More text testimonials for marquee
const testimonialRowOne = [
    { name: "Sarah J.", company: "TechStart", quote: "Absolutely phenomenal work. They transformed our entire digital presence." },
    { name: "Michael C.", company: "InnovateLab", quote: "The best investment we ever made for our brand. ROI exceeded all expectations." },
    { name: "Emily R.", company: "GrowthCo", quote: "Their creative approach helped us stand out in a crowded market. Highly recommend!" },
    { name: "David P.", company: "CloudNine", quote: "Attention to detail is unmatched. Every pixel was perfect." },
    { name: "Lisa T.", company: "Luxe Brand", quote: "From concept to execution, pure excellence. Our clients love the new design." },
    { name: "James W.", company: "NextGen", quote: "Increased our conversion rate by 200%. The results speak for themselves." },
];

const testimonialRowTwo = [
    { name: "Amanda F.", company: "StyleHub", quote: "They understood our vision from day one. Exceptional communication throughout." },
    { name: "Robert K.", company: "FinTech Pro", quote: "Fresh perspectives and innovative solutions. They're true partners in growth." },
    { name: "Jennifer M.", company: "HealthTech", quote: "Seamless process, stunning results. Couldn't ask for more." },
    { name: "Chris B.", company: "EduLearn", quote: "Our user engagement tripled after the redesign. Absolutely worth it." },
    { name: "Nicole S.", company: "FoodieApp", quote: "The team went above and beyond. Truly impressed with their dedication." },
    { name: "Andrew L.", company: "TravelNow", quote: "World-class design, world-class team. They deliver on every promise." },
];

// Video testimonials
const videoTestimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "CEO, TechStart Inc.",
        thumbnail: "/testimonials/thumb-1.jpg",
        duration: "2:34",
        quote: "The OG Digitals transformed our entire digital presence.",
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Founder, InnovateLab",
        thumbnail: "/testimonials/thumb-2.jpg",
        duration: "1:45",
        quote: "Working with them was a game-changer for our brand.",
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Marketing Director, GrowthCo",
        thumbnail: "/testimonials/thumb-3.jpg",
        duration: "3:12",
        quote: "Their creative approach helped us stand out.",
    },
    {
        id: 4,
        name: "David Park",
        role: "CTO, CloudNine Solutions",
        thumbnail: "/testimonials/thumb-4.jpg",
        duration: "2:08",
        quote: "Attention to detail is absolutely unmatched.",
    },
];

// Marquee component for infinite scroll
function Marquee({
    children,
    direction = "left",
    speed = 30
}: {
    children: React.ReactNode;
    direction?: "left" | "right";
    speed?: number;
}) {
    return (
        <div className="flex overflow-hidden">
            <motion.div
                className="flex gap-8 shrink-0"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear",
                    },
                }}
            >
                {children}
                {children}
            </motion.div>
        </div>
    );
}

// Testimonial card for marquee
function MarqueeCard({ testimonial }: { testimonial: typeof testimonialRowOne[0] }) {
    return (
        <div className="flex-shrink-0 w-[400px] p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
            <p className="text-white/80 text-lg mb-6 leading-relaxed">
                &quot;{testimonial.quote}&quot;
            </p>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a8ffc4] to-[#60a5fa] flex items-center justify-center text-black font-bold text-sm">
                    {testimonial.name[0]}
                </div>
                <div>
                    <div className="text-white font-medium">{testimonial.name}</div>
                    <div className="text-white/40 text-sm">{testimonial.company}</div>
                </div>
            </div>
        </div>
    );
}

// Video card component
function VideoCard({ video, onClick }: { video: typeof videoTestimonials[0]; onClick: () => void }) {
    return (
        <motion.div
            className="group cursor-pointer"
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-[#a8ffc4]/20 to-[#60a5fa]/20" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-[#a8ffc4] transition-colors"
                        whileHover={{ scale: 1.1 }}
                    >
                        <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </motion.div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 text-white text-sm">
                    {video.duration}
                </div>
            </div>

            {/* Info */}
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#a8ffc4] transition-colors">
                {video.name}
            </h3>
            <p className="text-white/40 text-sm">{video.role}</p>
        </motion.div>
    );
}

export default function TestimonialsPage() {
    const [selectedVideo, setSelectedVideo] = useState<typeof videoTestimonials[0] | null>(null);

    return (
        <main className="relative bg-black min-h-screen">
            {/* ===== HERO SECTION WITH BACKGROUND IMAGE ===== */}
            <section className="relative min-h-screen flex items-end pb-20">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/assets/testimonials-bg.png"
                        alt=""
                        className="w-full h-full object-cover object-top"
                    />
                    {/* Gradient overlay - heavier at bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Content - positioned at bottom */}
                <div className="relative z-10 w-full px-6 md:px-12 lg:px-24">
                    <motion.div
                        className="max-w-4xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <span className="text-xs uppercase tracking-[0.4em] text-[#a8ffc4] block mb-6">
                            Client Stories
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] mb-8">
                            Real results.<br />
                            <span className="text-[#a8ffc4]">Real stories.</span>
                        </h1>
                        <p className="text-xl text-white/60 max-w-xl">
                            Don&apos;t just take our word for it. Hear from the brands
                            we&apos;ve helped transform.
                        </p>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-[1px] h-12 bg-gradient-to-b from-[#a8ffc4] to-transparent mx-auto"
                    />
                </motion.div>
            </section>

            {/* ===== MARQUEE TESTIMONIALS ===== */}
            <section className="py-32 overflow-hidden">
                {/* Row 1 - Left to Right */}
                <div className="mb-8">
                    <Marquee direction="left" speed={40}>
                        {testimonialRowOne.map((t, i) => (
                            <MarqueeCard key={i} testimonial={t} />
                        ))}
                    </Marquee>
                </div>

                {/* Row 2 - Right to Left */}
                <div>
                    <Marquee direction="right" speed={45}>
                        {testimonialRowTwo.map((t, i) => (
                            <MarqueeCard key={i} testimonial={t} />
                        ))}
                    </Marquee>
                </div>
            </section>

            {/* ===== VIDEO TESTIMONIALS ===== */}
            <section className="py-32 border-t border-white/5">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    {/* Section header */}
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-[#a8ffc4] block mb-4">
                            Video Stories
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                            Watch their journey
                        </h2>
                    </motion.div>

                    {/* Video grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {videoTestimonials.map((video, i) => (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <VideoCard video={video} onClick={() => setSelectedVideo(video)} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section className="py-24 border-t border-white/5">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: "50+", label: "Projects Completed" },
                            { number: "100%", label: "Client Satisfaction" },
                            { number: "5.0", label: "Average Rating" },
                            { number: "25+", label: "Happy Clients" },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl md:text-5xl font-bold text-[#a8ffc4] mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-white/40 uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
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
                            Ready to be our<br />
                            <span className="text-[#a8ffc4]">next success story?</span>
                        </h2>

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

            {/* ===== VIDEO MODAL ===== */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                            onClick={() => setSelectedVideo(null)}
                        />

                        {/* Modal content */}
                        <motion.div
                            className="relative w-full max-w-4xl aspect-video bg-black/50 rounded-2xl overflow-hidden border border-white/10"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Video placeholder */}
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center">
                                    <div className="w-20 h-20 rounded-full bg-[#a8ffc4] flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{selectedVideo.name}</h3>
                                    <p className="text-white/60">{selectedVideo.role}</p>
                                    <p className="text-white/40 text-sm mt-4">Video testimonial coming soon</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
