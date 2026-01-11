"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, Linkedin, Twitter, Facebook } from "lucide-react";

const clients = [
    { name: "MIP", logo: "/assets/clients/mip.png" }, // Placeholder paths
    { name: "JAC", logo: "/assets/clients/jac.png" },
    { name: "Gandhara", logo: "/assets/clients/gandhara.png" },
    { name: "Prince Automotive", logo: "/assets/clients/prince.png" },
];

const socials = [
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/theogdigitals/", color: "#E1306C" },
    { name: "LinkedIn", icon: Linkedin, href: "https://pk.linkedin.com/company/the-og-digitals", color: "#0077B5" },
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/profile.php?id=61575381958438", color: "#4267B2" },
];

export default function Clients() {
    return (
        <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-20">

                {/* Section Title */}
                <div className="text-center mb-16">
                    <span className="text-[#a8ffc4] font-mono text-sm tracking-widest opacity-60 uppercase mb-4 block">
                        Trusted Partners
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                        Powering Industry Leaders
                    </h2>
                </div>

                {/* Clients Grid/Flex */}
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 mb-32 opacity-80">
                    {clients.map((client, index) => (
                        <motion.div
                            key={client.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            {/* Text Fallback for Logo */}
                            <h3 className="text-2xl md:text-4xl font-bold text-white/40 group-hover:text-white transition-colors duration-300 select-none">
                                {client.name}
                            </h3>
                        </motion.div>
                    ))}
                </div>

                {/* Socials Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />

                {/* Social Links */}
                <div className="text-center">
                    <h3 className="text-xl text-white/60 mb-8">Follow our digital footprint</h3>
                    <div className="flex justify-center gap-8">
                        {socials.map((social, index) => (
                            <Link
                                key={social.name}
                                href={social.href}
                                className="group relative p-4 rounded-full bg-white/5 border border-white/10 hover:border-[#a8ffc4]/50 transition-all duration-300"
                            >
                                <social.icon
                                    className="w-6 h-6 text-white group-hover:text-[#a8ffc4] transition-colors duration-300"
                                />
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-[#a8ffc4] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    {social.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
