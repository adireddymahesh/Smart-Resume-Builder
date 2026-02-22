"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProfileDropdown } from "@/components/ui/ProfileDropdown";
import { FileText } from "lucide-react";

export function Header() {
    const { user, loading } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-purple-500/20 bg-background/40 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center space-x-2 transition-opacity hover:opacity-80"
                >
                    {/* <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                    </div> */}
                    <span className="font-bold text-xl tracking-tight hidden sm:flex items-center gap-1.5">
                        AI Powered Resume World <span className="text-2xl">🌍</span>
                    </span>
                </Link>

                <nav className="flex items-center space-x-2 md:space-x-4">
                    <ThemeToggle />

                    {!loading && (
                        <>
                            {user ? (
                                <ProfileDropdown />
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Button variant="ghost" asChild>
                                        <Link href="/login">Log in</Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href="/signup">Sign up</Link>
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
