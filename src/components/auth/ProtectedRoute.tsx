"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lock } from "lucide-react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            // Optional: Redirect automatically
            // router.push("/login");
        } else if (!loading && user && !user.emailVerified) {
            router.push("/verify-email");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background text-foreground">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground p-4 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-card/30 p-8 rounded-3xl border border-white/10 backdrop-blur-xl max-w-md w-full text-center space-y-6 shadow-2xl relative z-10"
                >
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-20 h-20 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5 shadow-inner"
                    >
                        <Lock className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                    </motion.div>

                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Access Restricted</h2>
                        <p className="text-muted-foreground text-lg">
                            Please sign in to access your dashboard and saved resumes.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <Link href="/login" className="w-full">
                            <Button variant="outline" className="w-full h-12 text-base border-white/10 hover:bg-white/5 hover:text-white transition-all">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/signup" className="w-full">
                            <Button className="w-full h-12 text-base bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all">
                                Sign Up
                            </Button>
                        </Link>
                    </div>

                    <Link href="/" className="inline-block mt-4 text-sm text-muted-foreground hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-0.5">
                        Return to Home Page
                    </Link>
                </motion.div>
            </div>
        );
    }

    return <>{children}</>;
}
