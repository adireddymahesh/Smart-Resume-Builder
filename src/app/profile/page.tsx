"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Loader2, User, Lock, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [displayName, setDisplayName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const [isSendingReset, setIsSendingReset] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
        if (user?.displayName) {
            setDisplayName(user.displayName);
        }
    }, [user, loading, router]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsUpdating(true);
        setError("");
        setUpdateSuccess(false);

        try {
            await updateProfile(user, { displayName });
            setUpdateSuccess(true);
            setTimeout(() => setUpdateSuccess(false), 3000);
        } catch (err: any) {
            setError(err.message || "Failed to update profile");
        } finally {
            setIsUpdating(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!user || !user.email) return;

        setIsSendingReset(true);
        // setError(""); // Don't clear error from other form

        try {
            await sendPasswordResetEmail(auth, user.email);
            setResetSent(true);
            setTimeout(() => setResetSent(false), 5000);
        } catch (err: any) {
            alert("Failed to send reset email: " + err.message);
        } finally {
            setIsSendingReset(false);
        }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-6 md:p-12">
            <div className="max-w-2xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
                    <p className="text-muted-foreground">Manage your account information and security.</p>
                </div>

                <div className="grid gap-6">
                    {/* Public Profile */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" />
                                Public Profile
                            </CardTitle>
                            <CardDescription>
                                Update how your name appears to other users.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="displayName">Display Name</Label>
                                    <Input
                                        id="displayName"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Button type="submit" disabled={isUpdating}>
                                        {isUpdating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                        Save Changes
                                    </Button>
                                    {updateSuccess && (
                                        <p className="text-sm text-green-500 flex items-center">
                                            <Check className="w-4 h-4 mr-1" /> Saved
                                        </p>
                                    )}
                                </div>
                                {error && <p className="text-sm text-destructive">{error}</p>}
                            </form>
                        </CardContent>
                    </Card>

                    {/* Security */}
                    <Card border-l-red-500>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="w-5 h-5 text-primary" />
                                Security
                            </CardTitle>
                            <CardDescription>
                                Manage your password and account access.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Email Address</Label>
                                <Input value={user.email || ""} disabled className="bg-muted" />
                                <p className="text-xs text-muted-foreground">Email cannot be changed directly.</p>
                            </div>

                            <div className="pt-4 border-t">
                                <h4 className="text-sm font-medium mb-2">Password Reset</h4>
                                <div className="flex items-center gap-4">
                                    <Button variant="outline" onClick={handlePasswordReset} disabled={isSendingReset}>
                                        {isSendingReset && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                        Send Reset Email
                                    </Button>
                                    {resetSent && (
                                        <p className="text-sm text-green-500 flex items-center">
                                            <Check className="w-4 h-4 mr-1" /> Email sent
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
