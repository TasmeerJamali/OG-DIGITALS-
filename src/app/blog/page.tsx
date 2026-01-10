"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Placeholder data for the blog page
const articles = [
    {
        id: 1,
        title: "The Future of AI Marketing",
        category: "Artificial Intelligence",
        date: "Oct 12, 2024",
        excerpt: "How generative AI is reshaping the landscape of digital advertising and content creation.",
        image: "/assets/web-dev.mp4", // Using existing asset as placeholder or I should use a gradient
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Why SEO is Non-Negotiable",
        category: "SEO Strategy",
        date: "Sep 28, 2024",
        excerpt: "In a world of infinite content, visibility is the only currency that matters. Here is why.",
        image: "/assets/seo.mp4",
        readTime: "7 min read"
    },
    {
        id: 3,
        title: "The Power of Branding",
        category: "Brand Identity",
        date: "Sep 15, 2024",
        excerpt: "Your brand is not just a logo. It’s the silent ambassador of your business.",
        image: "/assets/uiux-design.mp4",
        readTime: "4 min read"
    },
    {
        id: 4,
        title: "Web 3.0: The Next Frontier",
        category: "Technology",
        date: "Aug 05, 2024",
        excerpt: "Decentralized web experiences are coming. Are you ready for the shift?",
        image: "/assets/video.mp4",
        readTime: "6 min read"
    }
];

export default function Blog() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#a8ffc4] selection:text-black">
            <Navigation />

            {/* Header Section */}
            <section className="pt-40 pb-20 px-6 md:px-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,255,196,0.1),transparent_50%)]" />

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6"
                    >
                        Insights & Thoughts
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
                    >
                        Exploring the intersections of design, technology, and culture.
                    </motion.p>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="pb-32 px-6 md:px-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#a8ffc4]/50 transition-colors duration-300"
                        >
                            {/* Image Area - Simulated with Gradient or Video */}
                            <div className="h-64 md:h-72 w-full relative overflow-hidden bg-[#111]">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                {/* Video/Image Placeholder */}
                                <video
                                    src={article.image}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                />

                                <div className="absolute top-4 left-4 z-20">
                                    <span className="px-3 py-1 text-xs font-semibold bg-[#a8ffc4] text-black rounded-full uppercase tracking-wider">
                                        {article.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="flex items-center gap-4 text-xs text-white/40 mb-4 uppercase tracking-widest font-medium">
                                    <span>{article.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/40" />
                                    <span>{article.readTime}</span>
                                </div>

                                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#a8ffc4] transition-colors duration-300">
                                    {article.title}
                                </h3>
                                <p className="text-white/60 line-clamp-3 mb-6">
                                    {article.excerpt}
                                </p>

                                <Link
                                    href="#"
                                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider hover:gap-3 transition-all duration-300"
                                >
                                    Read Article
                                    <span className="text-[#a8ffc4]">→</span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
