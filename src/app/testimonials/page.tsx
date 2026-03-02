"use client";

import { useState } from "react";
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
        name: "TED",
        role: "Client of OG Digitals",
        company: "OG Digitals",
        thumbnail: "/testimonials/thumb-1.jpg",
        duration: "2:34",
        quote: "The OG Digitals transformed our entire digital presence and helped us 3x our revenue.",
        views: "2.4k",
        video: "/assets/IMG_2207.MOV",
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
        video: null,
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
        video: null,
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
        video: null,
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
        <div className="flex overflow-hidden relative z-10">
            {/* Gradient masks for smooth fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

            <motion.div
                className="flex shrink-0"
                style={{ gap: "3rem", paddingTop: "1rem", paddingBottom: "1rem" }}
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

// PREMIUM Marquee Card
function MarqueeCard({ testimonial }: { testimonial: typeof testimonialRowOne[0] }) {
    return (
        <div className="flex-shrink-0 w-[420px] p-8 rounded-[2rem] border border-white/5 bg-[#0a0a0a] hover:bg-[#111] transition-all duration-500 group relative overflow-hidden">
            {/* Glow effect on hover */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#a8ffc4]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Quote Icon */}
            <div className="absolute top-8 right-8 text-white/5 group-hover:text-[#a8ffc4]/10 transition-colors duration-500">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="space-y-6">
                    {/* Stars */}
                    <div className="flex gap-1.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.svg
                                key={i}
                                className="w-5 h-5 text-[#a8ffc4]"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </motion.svg>
                        ))}
                    </div>

                    <p className="text-white/90 text-xl font-light leading-relaxed font-sans tracking-wide">
                        &quot;{testimonial.quote}&quot;
                    </p>
                </div>

                <div className="mt-6 flex items-center gap-4 border-t border-white/5 pt-5">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#111] to-[#222] border border-white/10 flex items-center justify-center text-[#a8ffc4] font-bold text-xl ring-2 ring-black">
                        {testimonial.name[0]}
                    </div>
                    <div>
                        <div className="text-white font-medium text-lg tracking-wide">{testimonial.name}</div>
                        <div className="text-[#a8ffc4] text-sm uppercase tracking-widest opacity-80">{testimonial.company}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// PREMIUM Video Card
function VideoCard({ video, onClick, index }: { video: typeof videoTestimonials[0]; onClick: () => void; index: number }) {
    return (
        <motion.div
            className="group cursor-pointer relative"
            onClick={onClick}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
        >
            {/* Card Container */}
            <div className="relative rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/5 transition-all duration-500 hover:border-[#a8ffc4]/30 hover:shadow-[0_0_30px_rgba(168,255,196,0.1)]">

                {/* Thumbnail Area */}
                <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#a8ffc4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />

                    {/* Thumbnail - video preview or gradient */}
                    {video.video ? (
                        <video
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            src={video.video}
                            muted
                            playsInline
                            preload="metadata"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] group-hover:scale-105 transition-transform duration-700 ease-out" />
                    )}

                    {/* Play Button - Magnetic Style */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <motion.div
                            className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-500 group-hover:scale-125 group-hover:bg-[#a8ffc4] group-hover:text-black group-hover:border-transparent"
                            whileHover={{ scale: 1.1 }}
                        >
                            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Top Stats */}
                    <div className="absolute top-6 left-6 z-20 flex gap-3">
                        <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-xs font-medium uppercase tracking-wider flex items-center gap-1.5">
                            <svg className="w-3 h-3 text-[#a8ffc4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {video.views}
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-xs font-medium uppercase tracking-wider">
                            {video.duration}
                        </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                        <div className="text-[#a8ffc4] text-xs font-bold uppercase tracking-[0.2em] mb-2">{video.company}</div>
                        <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-[#a8ffc4] transition-colors duration-300">
                            {video.name}
                        </h3>
                        <p className="text-white/60 text-sm mt-1">{video.role}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function TestimonialsPage() {
    const [selectedVideo, setSelectedVideo] = useState<typeof videoTestimonials[0] | null>(null);

    return (
        <main className="relative bg-black min-h-screen selection:bg-[#a8ffc4] selection:text-black">
            {/* Background Texture/Grain can be added in global CSS ideally, here simulated with a fixed div */}

            {/* ===== HERO SECTION WITH BACKGROUND IMAGE ===== */}
            <section className="relative min-h-screen flex items-end pb-24 lg:pb-32 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/assets/testimonials-bg.png"
                        alt="Testimonials Background"
                        className="w-full h-full object-cover object-top opacity-80"
                    />
                    {/* Artistic gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />

                    {/* Floating ambient lights */}
                    <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#a8ffc4]/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full px-6 md:px-12 lg:px-24">
                    <motion.div
                        className="max-w-5xl"
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <motion.div
                            className="flex items-center gap-4 mb-8"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="h-[1px] w-12 bg-[#a8ffc4]" />
                            <span className="text-sm uppercase tracking-[0.3em] text-[#a8ffc4] font-medium">
                                Client Stories
                            </span>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] -ml-[0.05em] mb-10 tracking-tight">
                            Real results. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                                Real Impact.
                            </span>
                        </h1>
                        <motion.p
                            className="text-xl md:text-2xl text-white/50 max-w-xl leading-relaxed font-light"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            Don&apos;t just take our word for it. <br />
                            Hear from the visionaries we&apos;ve helped transform.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ===== MARQUEE TESTIMONIALS ===== */}
            <section className="pt-32 lg:pt-48 pb-20 lg:pb-28 overflow-hidden relative">
                {/* Background Accent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

                <div className="px-6 md:px-12 lg:px-24 text-center" style={{ marginBottom: "5rem" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-[#a8ffc4] block mb-6">
                            Words that inspire
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                            Trusted by industry leaders
                        </h2>
                    </motion.div>
                </div>

                {/* Row 1 - Left to Right */}
                <div style={{ marginBottom: "3rem" }}>
                    <Marquee direction="left" speed={60}>
                        {testimonialRowOne.map((t, i) => (
                            <MarqueeCard key={i} testimonial={t} />
                        ))}
                    </Marquee>
                </div>

                {/* Row 2 - Right to Left */}
                <div>
                    <Marquee direction="right" speed={70}>
                        {testimonialRowTwo.map((t, i) => (
                            <MarqueeCard key={i} testimonial={t} />
                        ))}
                    </Marquee>
                </div>
            </section>

            {/* ===== VIDEO TESTIMONIALS ===== */}
            <section className="py-16 lg:py-20 border-t border-white/5 bg-[#050505] relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-[#a8ffc4]/5 to-transparent blur-[120px] pointer-events-none opacity-50" />

                <div className="w-full px-6 md:px-12 lg:px-24 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
                        <motion.div
                            className="max-w-2xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-xs uppercase tracking-[0.3em] text-[#a8ffc4] block mb-6">
                                Video Stories
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                                Watch the journey.
                            </h2>
                            <p className="text-xl text-white/40 max-w-lg">
                                Unscripted summaries of our collaboration and the results we achieved together.
                            </p>
                        </motion.div>

                        <div className="hidden md:block">
                            <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow">
                                <svg className="w-full h-full text-white/20 p-4" viewBox="0 0 100 100">
                                    <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                                    <text>
                                        <textPath href="#curve" className="text-[14px] uppercase tracking-widest fill-current">
                                            • Watch Stories • Watch Stories
                                        </textPath>
                                    </text>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Video grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {videoTestimonials.map((video, i) => (
                            <VideoCard key={video.id} video={video} onClick={() => setSelectedVideo(video)} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section className="py-32 border-t border-white/5 bg-black relative overflow-hidden">
                <div className="w-full px-6 md:px-12 lg:px-24">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
                        {[
                            { number: "50+", label: "Projects Delivered", icon: "🚀" },
                            { number: "98%", label: "Retention Rate", icon: "💎" },
                            { number: "5.0", label: "Client Rating", icon: "⭐" },
                            { number: "3x", label: "Average ROI", icon: "📈" },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className="text-center group relative p-4"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10 blur-xl" />
                                <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-4 tracking-tighter group-hover:from-[#a8ffc4] group-hover:to-[#a8ffc4]/50 transition-all duration-500">
                                    {stat.number}
                                </div>
                                <div className="h-[1px] w-12 bg-white/10 mx-auto mb-4 group-hover:w-24 group-hover:bg-[#a8ffc4]/50 transition-all duration-500" />
                                <div className="text-sm md:text-base text-white/50 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-40 border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#a8ffc4]/5 to-transparent pointer-events-none" />

                <div className="w-full px-6 md:px-12 lg:px-24 relative z-10">
                    <motion.div
                        className="flex flex-col items-center text-center max-w-5xl mx-auto"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-12 leading-[0.9] tracking-tight">
                            Ready to write your <br />
                            <span className="text-[#a8ffc4]">success story?</span>
                        </h2>

                        <Link href="/contact" className="group inline-block">
                            <motion.div
                                className="relative px-12 py-8 md:px-16 md:py-10 rounded-full overflow-hidden bg-white text-black font-bold text-xl md:text-2xl tracking-wide transition-transform duration-300 group-hover:scale-105"
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-4">
                                    Start Your Project
                                    <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                            onClick={() => setSelectedVideo(null)}
                        />

                        {/* Modal content */}
                        <motion.div
                            className="relative w-full max-w-6xl aspect-video bg-black rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Video area */}
                            <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] relative group">
                                {selectedVideo.video ? (
                                    <video
                                        className="w-full h-full object-contain"
                                        controls
                                        autoPlay
                                        playsInline
                                        src={selectedVideo.video}
                                    />
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                        <div className="text-center relative z-10">
                                            <div className="w-24 h-24 rounded-full border border-[#a8ffc4] flex items-center justify-center mx-auto mb-6 text-[#a8ffc4] animate-pulse">
                                                <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{selectedVideo.name}</h3>
                                            <p className="text-white/50 text-lg">Coming soon</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
