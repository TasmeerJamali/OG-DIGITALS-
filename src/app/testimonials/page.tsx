"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// More text testimonials for marquee
const testimonialRowOne = [
    { name: "Sarah J.", company: "TechStart", quote: "Absolutely phenomenal work. They transformed our entire digital presence.", rating: 5 },
    { name: "Michael C.", company: "InnovateLab", quote: "The best investment we ever made for our brand. ROI exceeded all expectations.", rating: 5 },
    { name: "Emily R.", company: "GrowthCo", quote: "Their creative approach helped us stand out in a crowded market. Highly recommend!", rating: 5 },
    { name: "David P.", company: "CloudNine", quote: "Attention to detail is unmatched. Every pixel was perfect.", rating: 5 },
    { name: "Lisa T.", company: "Luxe Brand", quote: "From concept to execution, pure excellence. Our clients love the new design.", rating: 5 },
    { name: "James W.", company: "NextGen", quote: "Increased our conversion rate by 200%. The results speak for themselves.", rating: 5 },
];

const testimonialRowTwo = [
    { name: "Amanda F.", company: "StyleHub", quote: "They understood our vision from day one. Exceptional communication throughout.", rating: 5 },
    { name: "Robert K.", company: "FinTech Pro", quote: "Fresh perspectives and innovative solutions. They're true partners in growth.", rating: 5 },
    { name: "Jennifer M.", company: "HealthTech", quote: "Seamless process, stunning results. Couldn't ask for more.", rating: 5 },
    { name: "Chris B.", company: "EduLearn", quote: "Our user engagement tripled after the redesign. Absolutely worth it.", rating: 5 },
    { name: "Nicole S.", company: "FoodieApp", quote: "The team went above and beyond. Truly impressed with their dedication.", rating: 5 },
    { name: "Andrew L.", company: "TravelNow", quote: "World-class design, world-class team. They deliver on every promise.", rating: 5 },
];

// Video testimonials
const videoTestimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "CEO",
        company: "TechStart Inc.",
        thumbnail: "/testimonials/thumb-1.jpg",
        duration: "2:34",
        quote: "The OG Digitals transformed our entire digital presence and helped us 3x our revenue.",
        views: "2.4k",
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Founder",
        company: "InnovateLab",
        thumbnail: "/testimonials/thumb-2.jpg",
        duration: "1:45",
        quote: "Working with them was a game-changer. Our brand has never looked better.",
        views: "1.8k",
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Marketing Director",
        company: "GrowthCo",
        thumbnail: "/testimonials/thumb-3.jpg",
        duration: "3:12",
        quote: "Their creative approach helped us stand out in a crowded market.",
        views: "3.1k",
    },
    {
        id: 4,
        name: "David Park",
        role: "CTO",
        company: "CloudNine Solutions",
        thumbnail: "/testimonials/thumb-4.jpg",
        duration: "2:08",
        quote: "Attention to detail is absolutely unmatched. Highly recommend!",
        views: "1.5k",
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
                className="flex gap-12 shrink-0"
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

// Enhanced testimonial card for marquee
function MarqueeCard({ testimonial }: { testimonial: typeof testimonialRowOne[0] }) {
    return (
        <div className="flex-shrink-0 w-[450px] p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-md hover:border-[#a8ffc4]/30 transition-all duration-500 group">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#a8ffc4]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>

            {/* Quote */}
            <p className="text-white/80 text-xl leading-relaxed mb-8 group-hover:text-white transition-colors">
                &quot;{testimonial.quote}&quot;
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#a8ffc4] to-[#60a5fa] flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-[#a8ffc4]/20">
                    {testimonial.name[0]}
                </div>
                <div>
                    <div className="text-white font-semibold text-lg">{testimonial.name}</div>
                    <div className="text-[#a8ffc4] text-sm">{testimonial.company}</div>
                </div>
            </div>
        </div>
    );
}

// Enhanced video card component
function VideoCard({ video, onClick, index }: { video: typeof videoTestimonials[0]; onClick: () => void; index: number }) {
    return (
        <motion.div
            className="group cursor-pointer"
            onClick={onClick}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
        >
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-[#a8ffc4]/50 transition-all duration-500">
                {/* Gradient bg */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#a8ffc4]/20 via-transparent to-[#60a5fa]/20" />

                {/* Quote preview on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                    <p className="text-white text-center text-sm leading-relaxed">
                        &quot;{video.quote}&quot;
                    </p>
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:bg-[#a8ffc4] group-hover:scale-110 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                    >
                        <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </motion.div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/80 text-white text-sm font-medium backdrop-blur-sm">
                    {video.duration}
                </div>

                {/* Views badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#a8ffc4]/20 text-[#a8ffc4] text-sm font-medium backdrop-blur-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    {video.views}
                </div>
            </div>

            {/* Info */}
            <div className="space-y-2">
                <h3 className="text-xl font-bold text-white group-hover:text-[#a8ffc4] transition-colors">
                    {video.name}
                </h3>
                <p className="text-white/60 text-sm">{video.role}</p>
                <p className="text-[#a8ffc4] text-sm font-medium">{video.company}</p>
            </div>
        </motion.div>
    );
}

export default function TestimonialsPage() {
    const [selectedVideo, setSelectedVideo] = useState<typeof videoTestimonials[0] | null>(null);

    return (
        <main className="relative bg-black min-h-screen">
            {/* ===== HERO SECTION WITH BACKGROUND IMAGE ===== */}
            <section className="relative min-h-screen flex items-end pb-32">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/assets/testimonials-bg.png"
                        alt=""
                        className="w-full h-full object-cover object-top"
                    />
                    {/* Gradient overlay - heavier at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                </div>

                {/* Content - positioned at bottom with more space */}
                <div className="relative z-10 w-full px-6 md:px-12 lg:px-24">
                    <motion.div
                        className="max-w-4xl"
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <motion.span
                            className="text-xs uppercase tracking-[0.4em] text-[#a8ffc4] block mb-8"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            Client Stories
                        </motion.span>
                        <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold text-white leading-[0.85] mb-10">
                            <div className="overflow-hidden">
                                <motion.div
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
                                >
                                    Real results.
                                </motion.div>
                            </div>
                            <div className="overflow-hidden">
                                <motion.div
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, delay: 0.7, ease: [0.25, 1, 0.5, 1] }}
                                    className="text-[#a8ffc4]"
                                >
                                    Real stories.
                                </motion.div>
                            </div>
                        </h1>
                        <motion.p
                            className="text-xl md:text-2xl text-white/60 max-w-xl leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            Don&apos;t just take our word for it. Hear from the brands
                            we&apos;ve helped transform.
                        </motion.p>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center gap-4"
                    >
                        <span className="text-white/30 text-sm uppercase tracking-widest">Scroll</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-[#a8ffc4] to-transparent" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ===== MARQUEE TESTIMONIALS ===== */}
            <section className="py-40 overflow-hidden">
                <div className="mb-20 px-6 md:px-12 lg:px-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-[#a8ffc4] block mb-4">
                            Client Feedback
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                            Words that inspire us
                        </h2>
                    </motion.div>
                </div>

                {/* Row 1 - Left to Right */}
                <div className="mb-12">
                    <Marquee direction="left" speed={50}>
                        {testimonialRowOne.map((t, i) => (
                            <MarqueeCard key={i} testimonial={t} />
                        ))}
                    </Marquee>
                </div>

                {/* Row 2 - Right to Left */}
                <div>
                    <Marquee direction="right" speed={55}>
                        {testimonialRowTwo.map((t, i) => (
                            <MarqueeCard key={i} testimonial={t} />
                        ))}
                    </Marquee>
                </div>
            </section>

            {/* ===== VIDEO TESTIMONIALS ===== */}
            <section className="py-40 border-t border-white/5">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    {/* Section header */}
                    <motion.div
                        className="text-center mb-24"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-[#a8ffc4] block mb-6">
                            Video Stories
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Watch their journey
                        </h2>
                        <p className="text-xl text-white/40 max-w-2xl mx-auto">
                            Real clients sharing their real experiences. Click to watch their full story.
                        </p>
                    </motion.div>

                    {/* Video grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {videoTestimonials.map((video, i) => (
                            <VideoCard key={video.id} video={video} onClick={() => setSelectedVideo(video)} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section className="py-32 border-t border-white/5 bg-gradient-to-b from-transparent to-[#a8ffc4]/5">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { number: "50+", label: "Projects Completed", icon: "🚀" },
                            { number: "100%", label: "Client Satisfaction", icon: "💯" },
                            { number: "5.0", label: "Average Rating", icon: "⭐" },
                            { number: "25+", label: "Happy Clients", icon: "🎉" },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, borderColor: "rgba(168,255,196,0.3)" }}
                            >
                                <div className="text-4xl mb-4">{stat.icon}</div>
                                <div className="text-4xl md:text-5xl font-bold text-[#a8ffc4] mb-3">
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
            <section className="py-40 border-t border-white/5">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    <motion.div
                        className="text-center max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-[#a8ffc4] block mb-8">
                            Your Turn
                        </span>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-10 leading-tight">
                            Ready to be our<br />
                            <span className="text-[#a8ffc4]">next success story?</span>
                        </h2>
                        <p className="text-xl text-white/50 mb-14 max-w-2xl mx-auto">
                            Join our growing list of satisfied clients and let&apos;s create something extraordinary together.
                        </p>

                        <Link href="/contact" className="group inline-block">
                            <motion.div
                                className="relative px-16 py-8 rounded-full overflow-hidden"
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
                                <span className="relative flex items-center gap-4 text-black font-bold text-xl">
                                    Start Your Project
                                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/95 backdrop-blur-md"
                            onClick={() => setSelectedVideo(null)}
                        />

                        {/* Modal content */}
                        <motion.div
                            className="relative w-full max-w-5xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl overflow-hidden border border-white/10"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#a8ffc4] hover:text-black transition-all group"
                            >
                                <svg className="w-6 h-6 text-white group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Video area */}
                            <div className="aspect-video bg-black/50 flex items-center justify-center">
                                <div className="text-center p-12">
                                    <motion.div
                                        className="w-24 h-24 rounded-full bg-[#a8ffc4] flex items-center justify-center mx-auto mb-8"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <svg className="w-10 h-10 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </motion.div>
                                    <p className="text-white/40 text-sm">Video testimonial coming soon</p>
                                </div>
                            </div>

                            {/* Info bar */}
                            <div className="p-8 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{selectedVideo.name}</h3>
                                        <p className="text-white/60">{selectedVideo.role}, <span className="text-[#a8ffc4]">{selectedVideo.company}</span></p>
                                    </div>
                                    <div className="flex items-center gap-4 text-white/40">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                            {selectedVideo.views} views
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                            {selectedVideo.duration}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-white/70 mt-6 text-lg italic">&quot;{selectedVideo.quote}&quot;</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
