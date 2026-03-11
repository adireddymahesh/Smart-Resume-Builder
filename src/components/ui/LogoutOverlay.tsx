"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface LogoutOverlayProps {
    isVisible: boolean;
}

export function LogoutOverlay({ isVisible }: LogoutOverlayProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ position: "fixed", inset: 0, zIndex: 99999 }}
                    className="flex flex-col items-center justify-center bg-background/90 backdrop-blur-xl"
                >
                    {/* Background ambient orbs */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-[400px] h-[400px] bg-purple-500/15 blur-[120px] rounded-full pointer-events-none"
                    />
                    <motion.div
                        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute w-[300px] h-[300px] bg-pink-500/10 blur-[100px] rounded-full pointer-events-none translate-x-24 translate-y-16"
                    />

                    {/* Main content */}
                    <motion.div
                        initial={{ scale: 0.85, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                        className="relative flex flex-col items-center gap-6"
                    >
                        {/* Spinning ring */}
                        <div className="relative w-20 h-20 flex items-center justify-center">
                            {/* Outer glow pulse */}
                            <motion.div
                                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-full bg-primary/30 blur-md"
                            />
                            {/* Spinning arc */}
                            <svg className="absolute inset-0 w-full h-full animate-spin" viewBox="0 0 80 80">
                                <circle
                                    cx="40" cy="40" r="34"
                                    strokeWidth="4"
                                    stroke="url(#logoutGrad)"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray="160"
                                    strokeDashoffset="60"
                                />
                                <defs>
                                    <linearGradient id="logoutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#a855f7" />
                                        <stop offset="100%" stopColor="#ec4899" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            {/* Center icon */}
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 relative z-10">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </div>
                        </div>

                        {/* Text */}
                        <div className="flex flex-col items-center gap-2">
                            <motion.h2
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.25 }}
                                className="text-2xl font-bold tracking-tight text-foreground"
                            >
                                Logging out
                            </motion.h2>
                            <motion.p
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.35 }}
                                className="text-muted-foreground text-sm"
                            >
                                See you soon! 👋
                            </motion.p>
                        </div>

                        {/* Animated dots */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex gap-2"
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                        ease: "easeInOut",
                                    }}
                                    className="w-2 h-2 rounded-full bg-linear-to-r from-purple-500 to-pink-500"
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
