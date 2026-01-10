"use client";

import { motion } from "framer-motion";

const team = [
    {
        name: "Osama",
        role: "Founder & CEO",
        image: "/assets/web-dev.mp4", // Placeholder - using existing assets or gradients
        desc: "Visionary leader driving the digital evolution."
    },
    {
        name: "Suhaib",
        role: "Head of Development",
        image: "/assets/seo.mp4",
        desc: "Architecting scalable systems and digital infrastructure."
    },
    {
        name: "Mazhar",
        role: "Creative Director",
        image: "/assets/uiux-design.mp4",
        desc: "Crafting visual narratives that define brands."
    },
    {
        name: "Waleed",
        role: "Lead Strategist",
        image: "/assets/video.mp4",
        desc: "Turning data into actionable growth strategies."
    }
];

export default function Team() {
    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#a8ffc4]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-20">
                {/* Section Header */}
                <div className="mb-20 md:mb-32">
                    <span className="text-[#a8ffc4] font-mono text-sm tracking-widest opacity-60 uppercase mb-4 block">
                        Our Squad
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight max-w-2xl">
                        The Minds Behind the Machine
                    </h2>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="group relative"
                        >
                            {/* Card Container */}
                            <div className="h-[400px] w-full relative rounded-2xl overflow-hidden mb-6 bg-[#111]">
                                {/* Image/Video Placeholder */}
                                <video
                                    src={member.image}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 grayscale group-hover:grayscale-0"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                {/* Floating Name (Bottom) */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#a8ffc4] transition-colors">
                                        {member.name}
                                    </h3>
                                    <span className="text-sm text-white/60 font-mono tracking-wider uppercase">
                                        {member.role}
                                    </span>
                                </div>
                            </div>

                            {/* Hover Description (Reveals below or replaces? Let's keep it clean below) */}
                            <p className="text-white/40 text-sm leading-relaxed max-w-[90%] group-hover:text-white/70 transition-colors duration-300">
                                {member.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
