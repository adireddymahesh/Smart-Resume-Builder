"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import BharthImg from "../../../public/images/Bharth.jpeg";
import SalomiImg from "../../../public/images/Salomi.jpeg";
import MaheshImg from "../../../public/images/Mahesh.jpeg";
import NaiduImg from "../../../public/images/Naidu.jpeg";
import PavithraImg from "../../../public/images/pavithra.jpeg";

const teamMembers = [
    {
        name: "N.Bharath Adithya",
        image: BharthImg,
        github: "https://github.com/bharathadithya03",
        linkedin: "http://www.linkedin.com/in/nakka-bharath-adithya",
        email: "bharathadithya.nakka@gmail.com",
        hoverGlow: "group-hover:border-blue-500/50 group-hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.5)] dark:group-hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.2)]",
    },
    {
        name: "Mahesh",
        image: MaheshImg,
        github: "https://github.com/adireddymahesh/",
        email: "adireddymahesh1@gmail.com",
        linkedin: "https://www.linkedin.com/in/mahesh-adireddy-abb139318?trk=contact-info",
        hoverGlow: "group-hover:border-orange-500/50 group-hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.5)] dark:group-hover:shadow-[0_0_40px_-15px_rgba(249,115,22,0.2)]",
    },
    {
        name: "D. Papayya Naidu",
        image: NaiduImg,
        github: "https://github.com/papayyanaidu",
        email: "pavandulam169@gmail.com",
        linkedin: "https://www.linkedin.com/in/papayya-naidu-dulam-91a904361/",
        hoverGlow: "group-hover:border-indigo-500/50 group-hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.5)] dark:group-hover:shadow-[0_0_40px_-15px_rgba(99,102,241,0.2)]",
    },
    {
        name: "Koppisetti Salomi",
        image: SalomiImg,
        github: "https://github.com/Salomi8866",
        email: "koppisettisalomi8888@gmail.com",
        linkedin: "https://www.linkedin.com/in/salomi-koppisetti-8ba6b7301",
        hoverGlow: "group-hover:border-purple-500/50 group-hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.5)] dark:group-hover:shadow-[0_0_40px_-15px_rgba(168,85,247,0.2)]",
    },
    {
        name: "G. Pavithra",
        image: PavithraImg,
        github: "#",
        email: "geetapavithra2005@gmail.com",
        linkedin: "https://www.linkedin.com/in/geeta-pavithra-malathi-180975316/",
        hoverGlow: "group-hover:border-pink-500/50 group-hover:shadow-[0_20px_40px_-15px_rgba(236,72,153,0.5)] dark:group-hover:shadow-[0_0_40px_-15px_rgba(236,72,153,0.2)]",
    }
];

export default function AboutPage() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350; // card width + gap
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            {/* Inject Marquee Animation */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                /* Hide scrollbar for Chrome, Safari and Opera */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                /* Hide scrollbar for IE, Edge and Firefox */
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}} />

            {/* Background Gradients */}
            <div className="absolute top-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/40 dark:bg-primary/20 hover:bg-primary/50 dark:hover:bg-primary/30 transition-colors duration-1000 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-500/40 dark:bg-purple-500/20 hover:bg-purple-500/50 dark:hover:bg-purple-500/30 transition-colors duration-1000 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-pink-500/30 dark:bg-pink-500/10 hover:bg-pink-500/40 dark:hover:bg-pink-500/20 transition-colors duration-1000 rounded-full blur-[130px]" />
            </div>
            <main className="container mx-auto px-6 py-20 lg:py-32 flex-1 flex flex-col">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto mb-20 relative"
                >
                    {/* Glowing Backlight behind Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gradient-to-r dark:from-primary/30 dark:to-purple-500/30 blur-3xl rounded-full opacity-0 dark:opacity-50 pointer-events-none transition-opacity duration-500" />

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-600 dark:from-white dark:via-zinc-200 dark:to-zinc-500 drop-shadow-sm">
                        Meet the brilliant minds behind{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                            ResumeAI
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed relative z-10">
                        We are a team of passionate developers, designers, and AI enthusiasts dedicated to leveling the playing field in the modern job market. Our mission is to give everyone the tools they need to land their dream role.
                    </p>
                </motion.div>

                {/* Team Grid (Tiles) */}
                <div className="relative w-full mt-40 px-4 sm:px-0 z-10 max-w-[1400px] mx-auto">
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-36 xl:gap-x-16">
                        {teamMembers.map((member, index) => (
                            <div
                                key={`${member.name}-${index}`}
                                className="group/card relative w-[320px] md:w-[360px] xl:w-[400px] shrink-0"
                            >
                                <div className={`relative bg-white/80 dark:bg-card/40 backdrop-blur-xl border border-zinc-200/80 dark:border-white/5 shadow-2xl dark:shadow-none transition-transform duration-500 hover:-translate-y-2 rounded-[3.5rem] pt-36 pb-12 px-8 flex flex-col items-center justify-center text-center ${member.hoverGlow}`}>
                                    {/* Image Container */}
                                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-56 h-56">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-purple-500/60 dark:from-primary/30 dark:to-purple-500/30 rounded-[2.5rem] blur-2xl transition-opacity duration-500 opacity-0 group-hover/card:opacity-100" />
                                        <div className="relative w-full h-full rounded-[2.5rem] border-[8px] border-background shadow-2xl overflow-hidden bg-muted transition-transform duration-300 group-hover/card:scale-[1.05]">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex items-center justify-center mt-2">
                                        <h3 className="text-xl md:text-2xl font-bold text-foreground">{member.name}</h3>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex gap-3 mt-8 pt-6 border-t border-border/50 w-full justify-center">
                                        <SocialIcon href={member.github} icon={<Github className="w-5 h-5" />} className="bg-zinc-800/10 text-zinc-800 dark:bg-white/10 dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-white dark:hover:text-black w-10 h-10" />
                                        <SocialIcon href={member.linkedin} icon={<Linkedin className="w-5 h-5" />} className="bg-[#0077b5]/10 text-[#0077b5] dark:bg-[#0077b5]/20 dark:text-[#0077b5] hover:bg-[#0077b5] hover:text-white dark:hover:bg-[#0077b5] dark:hover:text-white w-10 h-10" />
                                        <SocialIcon href={member.email ? `https://mail.google.com/mail/?view=cm&fs=1&to=${member.email}` : "#"} icon={<Mail className="w-5 h-5" />} className="bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white w-10 h-10" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission / Bottom Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-32 max-w-4xl mx-auto relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-purple-500/30 to-pink-500/30 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-white/60 dark:bg-black/60 backdrop-blur-3xl rounded-[2rem] p-10 md:p-16 text-center border border-zinc-200/50 dark:border-white/5 shadow-xl dark:shadow-none overflow-hidden">
                        {/* Inner Gradient Spot */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-primary/20 to-transparent blur-2xl pointer-events-none" />

                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-white/70">
                            Crafted with precision & care
                        </h2>
                        <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                            This project was built from the ground up to empower job seekers using the latest in Next.js, Tailwind CSS, and Google's Gemini Pro AI model.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 relative z-10">
                            <span className="px-5 py-2.5 bg-zinc-100/80 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 hover:border-foreground/50 transition-all duration-300 rounded-full text-sm font-medium border border-zinc-200/50 dark:border-white/10 text-zinc-900 dark:text-white/90 backdrop-blur-md cursor-default">Next.js 14</span>
                            <span className="px-5 py-2.5 bg-zinc-100/80 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 rounded-full text-sm font-medium border border-zinc-200/50 dark:border-white/10 text-zinc-900 dark:text-white/90 backdrop-blur-md cursor-default">Tailwind CSS</span>
                            <span className="px-5 py-2.5 bg-zinc-100/80 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 rounded-full text-sm font-medium border border-zinc-200/50 dark:border-white/10 text-zinc-900 dark:text-white/90 backdrop-blur-md cursor-default">Gemini AI</span>
                            <span className="px-5 py-2.5 bg-zinc-100/80 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 hover:border-purple-500/50 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-full text-sm font-medium border border-zinc-200/50 dark:border-white/10 text-zinc-900 dark:text-white/90 backdrop-blur-md cursor-default">Aceternity UI</span>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

function SocialIcon({ href, icon, className }: { href: string; icon: React.ReactNode; className?: string }) {
    return (
        <a
            href={href}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 hover:scale-110 shadow-sm ${className || "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            {icon}
        </a>
    );
}
