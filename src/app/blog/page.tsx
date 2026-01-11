"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import FooterCTA from "@/components/FooterCTA"; // Using the new premium footer
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

// Fonts
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500"] });

// Mock Data
const articles = [
    {
        id: 1,
        title: "The Silent Revolution: AI in Creative Workflows",
        category: "( ARTIFICIAL INTELLIGENCE )",
        date: "OCT 12, 2024",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
        excerpt: "Generative AI isn't replacing creativity; it's expanding the canvas. We explore how agencies are adapting to the new era of synthetic media."
    },
    {
        id: 2,
        title: "Minimalism is Dead. Long Live Maximalism.",
        category: "( DESIGN TRENDS )",
        date: "SEP 28, 2024",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
        excerpt: "Why the era of 'clean corporate memphis' is ending, and why chaotic, raw, and text-heavy designs are taking over the digital landscape."
    },
    {
        id: 3,
        title: "Web 3.0: A Ghost Town or a Sleeping Giant?",
        category: "( TECHNOLOGY )",
        date: "AUG 05, 2024",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
        excerpt: "Decentralization promised freedom, but delivered complexity. Is there still a future for the blockchain in consumer applications?"
    },
    {
        id: 4,
        title: "The Psychology of Dark Mode",
        category: "( UX RESEARCH )",
        date: "JUL 15, 2024",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        excerpt: "It's not just an aesthetic choice. It's a physiological preference. How contrasting interfaces affect retention and readability."
    }
];

export default function Blog() {
    return (
        <main className={`min-h-screen bg-[#0a0a0a] text-white selection:bg-[#a8ffc4] selection:text-black ${spaceGrotesk.className}`}>
            <Navigation />

            {/* 1. HERO SECTION (Editorial Style) */}
            <section className="relative pt-[35vh] pb-20 px-6 md:px-12 border-b border-white/5">
                <div className="max-w-[1800px] mx-auto">

                    {/* Tiny Label */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mb-8 overflow-hidden"
                    >
                        <span className="text-xs font-medium tracking-[0.3em] text-[#a8ffc4] uppercase">
                            ( The Journal )
                        </span>
                    </motion.div>

                    {/* Massive Title */}
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className={`${playfair.className} text-[15vw] leading-[0.8] text-white mix-blend-difference opacity-90`}
                        >
                            INSIGHTS.
                        </motion.h1>
                    </div>

                    {/* Subtext Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 mt-12 md:mt-24 gap-8">
                        <div className="md:col-span-4 md:col-start-9">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.8 }}
                                className="text-xl md:text-2xl font-light text-white/50 leading-relaxed"
                            >
                                Exploring the bleeding edge of <span className="text-white">design</span>, <span className="text-white">code</span>, and <span className="text-white">digital culture</span>.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. ARTICLE LIST (Magazine Layout) */}
            <section className="px-6 md:px-12 py-20 bg-black">
                <div className="max-w-[1800px] mx-auto flex flex-col gap-20 md:gap-40">
                    {articles.map((article, index) => (
                        <ArticleRow key={article.id} article={article} index={index} />
                    ))}
                </div>
            </section>

            <FooterCTA />
        </main>
    );
}

// Sub-component for animation logic per row
function ArticleRow({ article, index }: { article: any, index: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end center"]
    });

    // Parallax Effect for Image
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            style={{ opacity }}
            className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-20 items-center group cursor-pointer ${!isEven ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Text Side */}
            <div className={`md:col-span-5 flex flex-col justify-center relative ${!isEven ? 'md:col-start-8' : ''}`}>

                {/* Decorative Abstract Image (Floating) */}
                <div className={`absolute -z-10 opacity-40 blur-3xl pointer-events-none ${!isEven ? '-right-20 top-0' : '-left-20 bottom-0'} w-[300px] h-[300px]`}>
                    <Image
                        src={index % 2 === 0 ? "/assets/blog-decoration-1.png" : "/assets/blog-decoration-2.png"}
                        alt="Abstract Decoration"
                        fill
                        className="object-contain" // Changed to contain to preserve shape
                    />
                </div>

                <div className="mb-6 flex items-center gap-4">
                    <span className="text-xs font-medium tracking-[0.2em] text-[#a8ffc4] uppercase">
                        {article.category}
                    </span>
                    <span className="w-8 h-[1px] bg-white/20" />
                    <span className="text-xs font-medium tracking-[0.1em] text-white/40 uppercase">
                        {article.date}
                    </span>
                </div>

                <h2 className={`${playfair.className} text-4xl md:text-6xl text-white mb-6 leading-[1.1] transition-colors duration-500 group-hover:text-[#a8ffc4]`}>
                    {article.title}
                </h2>

                <p className="text-lg text-white/40 font-light leading-relaxed mb-8 max-w-md">
                    {article.excerpt}
                </p>

                <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-white group-hover:gap-4 transition-all duration-300">
                    Read Story <ArrowUpRight className="w-4 h-4 text-[#a8ffc4]" />
                </div>
            </div>

            {/* Image Side (Parallax) */}
            <div className={`md:col-span-6 ${!isEven ? 'md:col-start-1 md:row-start-1' : 'md:col-start-7'}`}>
                <div className="relative overflow-hidden aspect-[4/3] w-full">
                    {/* Curtain Reveal Mask */}
                    <motion.div
                        initial={{ scaleY: 1 }}
                        whileInView={{ scaleY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }} // Heavy editorial ease
                        className="absolute inset-0 bg-[#a8ffc4] z-20 origin-bottom"
                    />

                    {/* Dark Overlay for Text Readability if needed, though this is side-by-side */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />

                    <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
                        {/* Using standard img with motion to ensure immediate loading without config restart */}
                        <motion.img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
