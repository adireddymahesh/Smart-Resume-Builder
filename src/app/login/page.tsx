"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, CheckCircle2, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login, googleLogin, resetPassword } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);
        try {
            await login(email, password);
            router.push("/");
        } catch (err: any) {
            setError("Invalid email or password.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        setIsLoading(true);
        try {
            await googleLogin();
            router.push("/");
        } catch (err: any) {
            setError("Google login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please enter your email address to reset password.");
            return;
        }
        setError("");
        setSuccess("");
        setIsLoading(true);
        try {
            await resetPassword(email);
            setSuccess("Password reset email sent! Check your inbox.");
        } catch (err: any) {
            setError("Failed to send reset email. Ensure the email is correct.");
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
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 dark:from-primary/20 via-transparent to-transparent" />
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-20 bg-size-[50px_50px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-12 group transition-colors">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <h1 className="text-5xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
                        Welcome back to the <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-600">
                            Future of Work
                        </span>
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xl max-w-md">
                        Your career journey continues here. Build, analyze, and optimize your path to success.
                    </p>
                </div>

                <div className="relative z-10 flex-1 flex items-center justify-center mt-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative w-full max-w-sm"
                    >
                        <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-purple-500/20 blur-2xl rounded-3xl"></div>
                        <div className="relative bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 p-6 rounded-3xl shadow-2xl">
                            <div className="flex gap-4 items-center mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-zinc-900 dark:text-white">AI Resume Builder</h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Crafting your perfect story</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-600 dark:text-zinc-400">Industry Match</span>
                                        <span className="font-medium text-zinc-900 dark:text-white">94%</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[94%] rounded-full"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-600 dark:text-zinc-400">ATS Optimization</span>
                                        <span className="font-medium text-zinc-900 dark:text-white">98%</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[98%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-100/50 dark:bg-zinc-800/50 p-3 rounded-lg">
                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                <span>Found 12 matching keywords for your target role</span>
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
                        <h2 className="text-3xl font-bold tracking-tight">Sign in to your account</h2>
                        <p className="text-muted-foreground mt-2">
                            Don't have an account? <Link href="/signup" className="text-primary hover:underline font-medium">Create one</Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
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
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                                    <button type="button" onClick={handleForgotPassword} className="text-xs text-primary hover:underline">Forgot password?</button>
                                </div>
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
                        </div>

                        {error && <p className="text-destructive text-sm text-center bg-destructive/10 p-2 rounded">{error}</p>}
                        {success && <p className="text-green-500 text-sm text-center bg-green-500/10 p-2 rounded">{success}</p>}

                        <Button type="submit" className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-primary/25 transition-all" disabled={isLoading}>
                            {isLoading ? "Signing In..." : "Sign In"}
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
                            Continue with Google
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
