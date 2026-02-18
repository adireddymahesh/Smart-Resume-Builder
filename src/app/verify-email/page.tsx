"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle2, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";

export default function VerifyEmailPage() {
    const { user, verifyEmail } = useAuth();
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
            return;
        }

        if (user.emailVerified) {
            router.push("/");
        }

        // Periodically check if verified (optional, but good UX if they verified in another tab)
        const interval = setInterval(async () => {
            await user.reload();
            if (auth.currentUser?.emailVerified) {
                router.push("/");
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [user, router]);

    const handleResend = async () => {
        if (!user) return;
        setSending(true);
        setMessage("");
        try {
            await verifyEmail(user);
            setMessage("Verification email sent! Please check your inbox.");
        } catch (error: any) {
            if (error.code === 'auth/too-many-requests') {
                setMessage("Please wait a moment before trying again.");
            } else {
                setMessage("Failed to send email. please try again.");
            }
        } finally {
            setSending(false);
        }
    };

    const handleManualCheck = async () => {
        if (!user) return;
        await user.reload();
        if (auth.currentUser?.emailVerified) {
            router.push("/");
        } else {
            setMessage("Email not verified yet. Please check your inbox.");
        }
    }

    if (!user) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

            <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                        <Mail className="w-8 h-8 text-blue-500" />
                    </div>
                    <CardTitle className="text-2xl">Verify your email</CardTitle>
                    <CardDescription>
                        We've sent a verification link to <span className="font-medium text-foreground">{user.email}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-sm text-center text-muted-foreground">
                        Please click the link in the email to verify your account and access all features.
                    </div>

                    {message && (
                        <div className={`p-3 rounded-lg text-sm text-center ${message.includes("sent") ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}>
                            {message}
                        </div>
                    )}

                    <div className="space-y-3">
                        <Button
                            className="w-full"
                            onClick={handleManualCheck}
                        >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            I have verified my email
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleResend}
                            disabled={sending}
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${sending ? "animate-spin" : ""}`} />
                            Resend verification email
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
