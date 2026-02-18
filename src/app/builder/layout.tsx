"use client";

import { ResumeProvider } from "@/context/ResumeContext";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function BuilderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ResumeProvider>
            <ProtectedRoute>
                <div className="min-h-screen bg-background text-foreground">
                    {children}
                </div>
            </ProtectedRoute>
        </ResumeProvider>
    );
}
