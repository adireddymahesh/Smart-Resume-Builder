"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import Image from "next/image";

const teamMembers = [
    {
        name: "Nikhilesh",
        role: "Lead Developer & Founder",
        bio: "Passionate about AI and building intuitive tools for career growth.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nikhilesh&backgroundColor=b6e3f4",
        github: "#",
        linkedin: "#",
        hoverGlow: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.2)]",
    },
    {
        name: "Harish",
        role: "UI/UX Designer",
        bio: "Crafting beautiful, user-centric experiences that feel like magic.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harish&backgroundColor=c0aede",
        github: "#",
        linkedin: "#",
        hoverGlow: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_40px_-15px_rgba(168,85,247,0.2)]",
    },
    {
        name: "Ramesh",
        role: "AI Engineer",
        bio: "Specializing in NLP and making our resume scorer as smart as possible.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh&backgroundColor=ffdfbf",
        github: "#",
        linkedin: "#",
        hoverGlow: "group-hover:border-orange-500/50 group-hover:shadow-[0_0_40px_-15px_rgba(249,115,22,0.2)]",
    },
    {
        name: "Suresh",
        role: "Backend Architecture",
        bio: "Ensuring our systems are fast, reliable, and secure 24/7.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh&backgroundColor=d1d4f9",
        github: "#",
        linkedin: "#",
        hoverGlow: "group-hover:border-indigo-500/50 group-hover:shadow-[0_0_40px_-15px_rgba(99,102,241,0.2)]",
    }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            {/* Minimal Background Gradients matching the theme */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gradient-to-r from-primary/30 to-purple-500/30 blur-3xl rounded-full opacity-50 pointer-events-none" />

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 dark:from-white dark:via-zinc-200 dark:to-zinc-500 drop-shadow-sm">
                        Meet the brilliant minds behind{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                            ResumeAI
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed relative z-10">
                        We are a team of passionate developers, designers, and AI enthusiasts dedicated to leveling the playing field in the modern job market. Our mission is to give everyone the tools they need to land their dream role.
                    </p>
                </motion.div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                            className="group relative"
                        >
                            <div className={`relative bg-card/40 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-3xl p-6 h-full flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 ${member.hoverGlow}`}>
                                {/* Image Container */}
                                <div className="relative w-32 h-32 mb-6">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-purple-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                                    <div className="relative w-full h-full rounded-full border-4 border-background overflow-hidden bg-muted">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                                <p className="text-sm font-medium text-primary mb-4">{member.role}</p>
                                <p className="text-muted-foreground text-sm flex-1 leading-relaxed">
                                    "{member.bio}"
                                </p>

                                {/* Social Links */}
                                <div className="flex gap-4 mt-8 pt-6 border-t border-border/50 w-full justify-center">
                                    <SocialIcon href={member.github} icon={<Github className="w-4 h-4" />} />
                                    <SocialIcon href={member.linkedin} icon={<Linkedin className="w-4 h-4" />} />
                                    <SocialIcon href="#" icon={<Mail className="w-4 h-4" />} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mission / Bottom Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-32 max-w-4xl mx-auto relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-purple-500/30 to-pink-500/30 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-black/40 dark:bg-black/60 backdrop-blur-3xl rounded-[2rem] p-10 md:p-16 text-center border border-white/10 dark:border-white/5 overflow-hidden">
                        {/* Inner Gradient Spot */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-primary/20 to-transparent blur-2xl pointer-events-none" />

                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                            Crafted with precision & care
                        </h2>
                        <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                            This project was built from the ground up to empower job seekers using the latest in Next.js, Tailwind CSS, and Google's Gemini Pro AI model.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 relative z-10">
                            <span className="px-5 py-2.5 bg-white/5 hover:bg-white/10 hover:border-foreground/50 transition-all duration-300 rounded-full text-sm font-medium border border-white/10 text-white/90 backdrop-blur-md cursor-default">Next.js 14</span>
                            <span className="px-5 py-2.5 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 rounded-full text-sm font-medium border border-white/10 text-white/90 backdrop-blur-md cursor-default">Tailwind CSS</span>
                            <span className="px-5 py-2.5 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300 rounded-full text-sm font-medium border border-white/10 text-white/90 backdrop-blur-md cursor-default">Gemini AI</span>
                            <span className="px-5 py-2.5 bg-white/5 hover:bg-white/10 hover:border-purple-500/50 hover:text-purple-400 transition-all duration-300 rounded-full text-sm font-medium border border-white/10 text-white/90 backdrop-blur-md cursor-default">Aceternity UI</span>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all shrink-0 hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
        >
            {icon}
        </a>
    );
}
