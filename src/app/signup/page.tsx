"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Rocket, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { auth } from "@/lib/firebase";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { signup, googleLogin, verifyEmail, user } = useAuth();
    const router = useRouter();


    const handleGoogleLogin = async () => {
        setError("");
        setIsLoading(true);
        try {
            await googleLogin();
            router.push("/");
        } catch (err: any) {
            setError("Google signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }
        setError("");
        setIsLoading(true);
        try {
            await signup(email, password);
            if (auth.currentUser) {
                await verifyEmail(auth.currentUser);
                setSuccess("Account created! Verification email sent. Redirecting...");
            } else {
                setSuccess("Account created! Redirecting...");
            }
            setTimeout(() => router.push("/verify-email"), 2000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

            {/* Left Side - Art & Content */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative hidden lg:flex bg-white dark:bg-zinc-950 flex-col justify-between p-12 overflow-hidden border-r"
            >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-white dark:bg-zinc-950">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 dark:from-blue-500/20 via-transparent to-transparent" />
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-20 bg-[size:50px_50px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-12 group transition-colors">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm mb-6">
                        <Rocket className="w-4 h-4 mr-2" /> Start your journey
                    </div>
                    <h1 className="text-5xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
                        Join the  <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-500">
                            AI Revolution
                        </span>
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xl max-w-md">
                        Create an account to access premium templates, ATS scoring, and AI-powered career tools.
                    </p>
                </div>

                <div className="relative z-10 flex-1 flex items-center justify-center mt-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative w-full max-w-sm"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 blur-2xl rounded-3xl"></div>
                        <div className="relative bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 p-6 rounded-3xl shadow-2xl">
                            <h3 className="font-semibold text-lg text-zinc-900 dark:text-white mb-6">Premium AI Tools Included</h3>
                            <div className="space-y-4">
                                {[
                                    { text: "Smart Resume Parsing", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
                                    { text: "Cover Letter Generator", color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
                                    { text: "ATS Compatibility Score", color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
                                    { text: "Keyword Analysis", color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30" }
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full ${feature.bg} flex items-center justify-center flex-shrink-0`}>
                                            <CheckCircle2 className={`w-4 h-4 ${feature.color}`} />
                                        </div>
                                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 bg-background relative">
                <div className="absolute top-8 right-8 lg:hidden">
                    <Link href="/" className="text-sm font-medium hover:underline">Home</Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight">Create an account</h2>
                        <p className="text-muted-foreground mt-2">
                            Already have an account? <Link href="/login" className="text-primary hover:underline font-medium">Sign in</Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Email</label>
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-background/50 border-input h-12"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Password</label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-background/50 border-input h-12 pr-11"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Confirm Password</label>
                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="bg-background/50 border-input h-12 pr-11"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {error && <p className="text-destructive text-sm text-center bg-destructive/10 p-2 rounded">{error}</p>}
                        {success && <p className="text-green-500 text-sm text-center bg-green-500/10 p-2 rounded">{success}</p>}

                        <Button type="submit" className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-primary/25 transition-all" disabled={isLoading}>
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <Button variant="outline" type="button" className="w-full h-12 flex items-center gap-2" onClick={handleGoogleLogin} disabled={isLoading}>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Sign up with Google
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                            By clicking continue, you agree to our <Link href="#" className="underline hover:text-primary">Terms of Service</Link> and <Link href="#" className="underline hover:text-primary">Privacy Policy</Link>.
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
